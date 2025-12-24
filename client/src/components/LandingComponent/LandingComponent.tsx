import React, { useState } from 'react'
import KakaoLogin from 'react-kakao-login'
import { StyledBox, StyledContainer, StyledLoginBtn, StyledLoginInput, StyledRadios, StyledSignUpBtn } from './style'
import axios from 'axios'
import { useRecoilState } from 'recoil';
import { userState } from '../../utils/userState';
import { useNavigate } from 'react-router-dom';
import { saveUserToLocalStorage } from '../../utils/localStorage';
import SignupComponent from './SignupComponent';
import { saveAccessToken } from '../../utils/accessToken';
import { axiosInstance } from '../../utils/axiosInstance';
import toast from 'react-hot-toast'
const apiUrl = process.env.REACT_APP_API_URL;




const LandingComponent = () => {
    const [selectedRole, setSelectedRole] = useState<string>('')
    const [, setLoading] = useState<boolean>(false)
    const [, setUser] = useRecoilState(userState)
    const [signup, setSignup] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const navigate = useNavigate()

    const kakaoClientId = process.env.REACT_APP_KAKAO_CLIENT_ID || '';




    const handleRadioChage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedRole(e.target.value)
    }


    const kakaoOnSuccess = async (data: any) => {
        const kakaoaccessToken = data.response.access_token
        if (!selectedRole) {
            toast.error('역할을 선택해 해주세요!')
            return
        }
        try {
            setLoading(true)
            const res = await axiosInstance.post(`${apiUrl}/api/user/login/kakao`, {
                kakaoaccessToken,
                role: selectedRole
            })
            if (res.data.success) {
                const newUser = ({
                    kakaoId: res.data.kakaoId,
                    name: res.data.name,
                    role: selectedRole,
                    objectId: res.data.objectId
                });
                const accessToken = res.data.token
                setUser(newUser)
                saveUserToLocalStorage(newUser)
                saveAccessToken(accessToken)
                toast.success('로그인 성공!')
                navigate('/browse')
            } else {
                console.error('login failed :', res.data.message)
            }
        } catch (error) {
            toast.error('아이디 혹은 비밀번호를 확인해주세요!')

            console.error('error login : ', error)
        } finally {
            setLoading(false)
        }
    }

    const kakaoOnFailure = (error: any) => {
        console.log('카톡 로그인 오류', error);
        toast.error('카카오톡 로그인 오류 잠시후 다시 시도해주세요')
    };


    const hanldeSignup = () => {
        setSignup(true)
    }

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error('이메일과 비밀번호를 입력하세요.');
            return;
        }
        if (!selectedRole) {
            toast.error('역할을 선택하세요')
            return;
        }

        try {
            setLoading(true);
            const res = await axiosInstance.post(`${apiUrl}/api/user/login/regular`, {
                email,
                password,
                role: selectedRole
            });


            if (res.data.success) {
                const newUser = {
                    email: res.data.user.email,
                    name: res.data.user.name,
                    role: res.data.user.role,
                    objectId: res.data.user.objectId,
                    ptCount: res.data.user.ptCount
                };
                const accessToken = res.data.user.token

                setUser(newUser);
                saveUserToLocalStorage(newUser)
                saveAccessToken(accessToken)
                toast.success('로그인 성공!')
                navigate('/browse')

            } else {
                console.log(res.data.error)
                toast.error('에러 발생. 잠시후 시도해 주세요')

            }
        } catch (error) {
            console.error('로그인 중 오류 발생:', error);
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.message || '로그인에 실패했습니다. 다시 시도해주세요.');
            } else {
                toast.error('로그인에 실패했습니다 시도해주세요.');
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <StyledContainer>
            {
                signup ? (
                    <SignupComponent />
                )
                    : (

                        <StyledBox>
                            <h1>BNTY</h1>
                            <StyledLoginInput>
                                <input type="email" placeholder='ID' value={email} onChange={(e) => setEmail(e.target.value)} />
                                <input type="password" placeholder='PASSWORD' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </StyledLoginInput>
                            <StyledRadios>
                                <label style={{
                                    backgroundColor: selectedRole === 'trainer' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.05)',
                                    borderColor: selectedRole === 'trainer' ? '#ef4444' : 'rgba(255,255,255,0.1)',
                                    color: selectedRole === 'trainer' ? '#ef4444' : '#666'
                                }}>
                                    <input type="radio" name='role' value='trainer' onChange={handleRadioChage} />
                                    Trainer
                                </label>
                                <label style={{
                                    backgroundColor: selectedRole === 'member' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255,255,255,0.05)',
                                    borderColor: selectedRole === 'member' ? '#3b82f6' : 'rgba(255,255,255,0.1)',
                                    color: selectedRole === 'member' ? '#3b82f6' : '#666'
                                }}>
                                    <input type="radio" name='role' value='member' onChange={handleRadioChage} />
                                    Member
                                </label>
                            </StyledRadios>

                            <div className="flex flex-col gap-3 w-full items-center">

                                <StyledLoginBtn onClick={handleLogin}>로그인</StyledLoginBtn>
                                <KakaoLogin
                                    token={kakaoClientId}
                                    onSuccess={kakaoOnSuccess}
                                    onFail={kakaoOnFailure}
                                    style={{
                                        width: '100%',
                                        backgroundColor: '#FEE500',
                                        color: '#000',
                                        borderRadius: '10px',
                                        padding: '14px',
                                        border: 'none',
                                        fontWeight: 'bold',
                                        fontSize: '1rem',
                                        cursor: 'pointer'
                                    }}
                                />

                            </div>
                            <StyledSignUpBtn onClick={hanldeSignup}>신규 회원이신가요? 가입하기</StyledSignUpBtn>
                        </StyledBox>
                    )
            }
        </StyledContainer>
    )
}

export default LandingComponent
