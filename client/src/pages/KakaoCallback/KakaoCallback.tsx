import { useNavigate } from "react-router-dom"
import { useSetRecoilState } from "recoil"
import { accessTokenState, userState } from "../../state/userState"
import { useEffect, useRef } from "react"
import toast from "react-hot-toast"
import axios from "axios"

const apiUrl = process.env.REACT_APP_API_URL;

export function KakaoCallbackPage() {
    const navigate = useNavigate()
    const setUser = useSetRecoilState(userState)
    const setAccessToken = useSetRecoilState(accessTokenState)

    const requested = useRef(false)


    useEffect(() => {
        if (requested.current) return
        requested.current = true

        const handleKakaoCallback = async () => {
            const params = new URLSearchParams(window.location.search)
            const code = params.get('code')

            const selectedRole = sessionStorage.getItem('login-role')
            if (!code || (selectedRole !== 'trainer' && selectedRole !== 'member')) {
                toast.error('로그인 화면에서 역할을 선택하고 다시 시도해 주세요.')
                navigate('/', { replace: true })
                return
            }

            try {
                const res = await axios.post(`${apiUrl}/api/user/login/kakao`, { code, selectedRole }, { withCredentials: true })
                if (res.status === 200 && res.data.success) {
                    const userData = res.data.user
                    setUser(userData)
                    setAccessToken(userData.token)
                    sessionStorage.removeItem('login-role')
                    toast.success('로그인 성공')
                    navigate('/browse', { replace: true })
                }
            } catch (error) {
                console.error('카카오로그인 실패', error)
                toast.error('로그인중 문제 발생. 다시 시도 해주세요')
                navigate('/', { replace: true })
            }
        }

        void handleKakaoCallback()
    }, [navigate, setAccessToken, setUser])



    return (
        <div role="status" className="flex min-h-screen flex-col items-center justify-center bg-[#111111] px-6">
            <div className="relative mb-7 flex h-20 w-20 items-center justify-center">
                <div className="absolute inset-0 animate-spin rounded-full border-2 border-white/5 border-t-red-500 motion-reduce:animate-none" />
            </div>
            <p className="text-lg font-bold tracking-tight text-gray-100">카카오 로그인 중이에요</p>
            <p className="mt-2 text-sm text-gray-500">곧 BNTY로 이동할게요.</p>
            <span className="mt-10 text-xs font-bold tracking-[0.3em] text-gray-600">BNTY</span>
        </div>
    )
}