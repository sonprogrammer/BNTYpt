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

    // TODO 카카오톡 엑세스 토큰 관리하기
    const kakaoOnSuccess = async (data: any) => {
        const accessToken = data.response.access_token
        if (!selectedRole) {
            alert('Please select your role')
            return
        }
        try {
            setLoading(true)
            const res = await axios.post(`${apiUrl}/api/user/login/kakao`, {
                accessToken,
                role: selectedRole
            },{withCredentials: true})
            if (res.data.success) {
                const newUser = ({
                    kakaoId: res.data.kakaoId,
                    name: res.data.name,
                    role: selectedRole,
                    token: accessToken,
                    objectId: res.data.objectId 
                });
                setUser(newUser)
                saveUserToLocalStorage(newUser)
                navigate('/browse')
            } else {
                console.error('login failed :', res.data.message)
            }
        } catch (error) {
            alert('❌❌check your Email or Password❌❌')

            console.error('error login : ', error)
        } finally {
            setLoading(false)
        }
    }

    const kakaoOnFailure = (error: any) => {
        console.log('카톡 로그인 오류', error);
    };


    const hanldeSignup = () => {
        setSignup(true)
    }

    const handleLogin = async () => {
        if (!email || !password) {
            alert('이메일과 비밀번호를 입력하세요.');
            return;
        }
        if(!selectedRole){
            alert('role을 선택하세요')
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
                    // token: res.data.user.token,
                    objectId: res.data.user.objectId,
                    ptCount: res.data.user.ptCount
                };
                const accessToken = res.data.user.token

                setUser(newUser);
                saveUserToLocalStorage(newUser);
                saveAccessToken(accessToken)
                navigate('/browse');
                
            } else {
                    alert(res.data.message);
    
            }
        } catch (error) {
            console.error('로그인 중 오류 발생:', error);
            if (axios.isAxiosError(error) && error.response) {
                alert(error.response.data.message || '로그인에 실패했습니다. 다시 시도해주세요.');
            } else {
                alert('로그인에 실패했습니다 시도해주세요.');
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
                        <input type="email" placeholder='ID' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <input type="password" placeholder='PASSWORD' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </StyledLoginInput>
                <StyledRadios>
                    <label style={{ color: selectedRole === 'trainer' ? 'red' : 'white' }}>
                        <input
                            type="radio"
                            name='role'
                            value='trainer'
                            checked={selectedRole === 'trainer'}
                            onChange={handleRadioChage}
                        />
                        Trainer
                    </label>
                    <label style={{ color: selectedRole === 'member' ? 'blue' : 'white' }}>
                        <input
                            type="radio"
                            name='role'
                            value='member'
                            checked={selectedRole === 'member'}
                            onChange={handleRadioChage}
                        />
                        Member
                    </label>
                </StyledRadios>
                <StyledLoginBtn onClick={handleLogin}>로그인</StyledLoginBtn>
                <KakaoLogin
                    token={kakaoClientId}
                    onSuccess={kakaoOnSuccess} 
                    onFail={kakaoOnFailure}
                    style={{
                        backgroundColor: 'rgb(153 27 27)',
                        color: 'white',
                        borderRadius: '5px',
                        padding: '10px 30px',
                    }}
                />
                <StyledSignUpBtn onClick={hanldeSignup}>가입하기</StyledSignUpBtn>
            </StyledBox>
                )
            }
        </StyledContainer>
    )
}

export default LandingComponent
