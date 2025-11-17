import axios from "axios";
import { getAccessToken } from "./accessToken";



export const axiosInstance = axios.create({
    withCredentials: true
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getAccessToken()
        if (token) config.headers.Authorization = `Bearer ${token}`
        return config
    },
    (err) => Promise.reject(err)
)

axiosInstance.interceptors.response.use(
    (res) => res ,
    async (err) => {
        const originalRequest = err.config
        if ((err.response?.status === 401  || err.response?.status === 403) && !originalRequest._retry) {
            originalRequest._retry = true


            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/refresh`, {}, { withCredentials: true })
                const newAccessToken = res.data.accessToken
                localStorage.setItem('accessToken', newAccessToken)

                axiosInstance.defaults.headers.common['Authorization'] =
                    `Bearer ${newAccessToken}`
                return axiosInstance(originalRequest)

            } catch (error) {
                console.error('토큰 갱신 실패', error)
            }
        }
        return Promise.reject(err)
    }
)