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
                const res = await axios.post(`${apiUrl}/api/users/login/kakao`, { code, selectedRole }, { withCredentials: true })

                if (res.status === 200) {
                    const userData = res.data.user
                    setUser(userData)
                    setAccessToken(userData.data.token)
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

//TODO BNTY 배포할때 rest api랑 콜백 주소 넣어주면되 ㅁ


    return (
        <div>

        </div>
    )
}