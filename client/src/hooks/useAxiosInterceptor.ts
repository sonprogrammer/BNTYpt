import axios from "axios"
import { useEffect, useRef } from "react"
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil"
import { toast } from "react-hot-toast"
import { accessTokenState, isAuthLoadingState, UserState, userState } from "../state/userState"



const authApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  withCredentials: true
})

export const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`,
    withCredentials: true
})


let refreshPromise: Promise<string> | null = null
let restorePromise: Promise<{ accessToken: string, user: UserState }> | null = null

const refreshAccessToken = () => {
  if (!refreshPromise) {
    refreshPromise = authApi.post<{ accessToken: string }>('/user/refresh')
      .then(res => {
        if (!res.data.accessToken) throw new Error('액세스 토큰이 없습니다.')
        return res.data.accessToken
      })
      .finally(() => {
        refreshPromise = null
      })
  }
  return refreshPromise
}

const restoreSession = () => {
  if (!restorePromise) {
    restorePromise = refreshAccessToken()
      .then(async accessToken => {
        const res = await authApi.get<{ user: UserState }>('/user/me', {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
        if (!res.data.user?.objectId) throw new Error('회원 정보가 없습니다.')
        return { accessToken, user: res.data.user }
      })
      .finally(() => {
        restorePromise = null
      })
  }
  return restorePromise
}

const isAuthError = (error: unknown) => {
  return axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403) 
}

export const useAxiosInterceptor = () => {
  const accessToken = useRecoilValue(accessTokenState)
  const setAccessToken = useSetRecoilState(accessTokenState)
  const setUser = useSetRecoilState(userState)
  const resetUser = useResetRecoilState(userState)
  const setIsAuthLoading = useSetRecoilState(isAuthLoadingState)
  const tokenRef = useRef(accessToken)
  tokenRef.current = accessToken

  useEffect(() => {
    let active = true
    
    const clearAuth = () => {
      tokenRef.current = null
      setAccessToken(null)
      resetUser()
    }
    const requestInterceptor = axiosInstance.interceptors.request.use(config => {
      const token = tokenRef.current
      if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })
    const responseInterceptor = axiosInstance.interceptors.response.use(
      res => res,
      async error => {
        const originalRequest = error.config
        if (!originalRequest || error.response?.status !== 401 || originalRequest._retry) {
          return Promise.reject(error)
        }
        originalRequest._retry = true
        try {
          const token = await refreshAccessToken()

          if (!active) return Promise.reject(error)

          setAccessToken(token)
          originalRequest.headers.Authorization = `Bearer ${token}`
          return axiosInstance(originalRequest)
        } catch (refreshError) {
          if (active && isAuthError(refreshError)) {
            toast.error('세션 만료, 재로그인 해주세요')
            clearAuth()
            window.location.replace('/')
          }
          return Promise.reject(refreshError)
        }
      }
    )
    const initializeAuth = async () => {
      setIsAuthLoading(true)
      try {
        const data = await restoreSession()
        if (!active) return
        tokenRef.current = data.accessToken
        setAccessToken(data.accessToken)
        setUser(data.user)
      } catch (error) {
        if (!active) return
        clearAuth()
        if(!isAuthError(error)){
          console.error('복구 실패',error)
        }
      } finally {
        if (active) setIsAuthLoading(false)
      }
    }
    void initializeAuth()
    return () => {
      active = false
      axiosInstance.interceptors.request.eject(requestInterceptor)
      axiosInstance.interceptors.response.eject(responseInterceptor)
    }
  }, [setAccessToken, setUser, resetUser, setIsAuthLoading])
}