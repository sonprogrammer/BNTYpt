import React, { useState } from 'react'
import KakaoLogin from 'react-kakao-login'
import { StyledBox, StyledContainer, StyledLoginBtn, StyledLoginInput, StyledRadios, StyledSignUpBtn } from './style'
import SignupComponent from './SignupComponent';
import toast from 'react-hot-toast'
import { useKakaoLogin } from '../../hooks/useKakaoLogin';
import { useRegularLogin } from '../../hooks/useRegularLogin';

type KakaoDataType = {
    response: {
        access_token: string;
    }

}


const LandingComponent = () => {
    const [selectedRole, setSelectedRole] = useState<string>('')
    const [signup, setSignup] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');


    const { mutate: kakaoLogin } = useKakaoLogin()
    const { mutate: regularLogin} = useRegularLogin()

    const kakaoClientId = process.env.REACT_APP_KAKAO_CLIENT_ID || '';




    const handleRadioChage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedRole(e.target.value)
    }


    const kakaoOnSuccess = async (data: KakaoDataType) => {
        if(!selectedRole){
            toast.error('역할을 선택해주세요')
            return
        }
        kakaoLogin({
            kakaoaccessToken: data.response.access_token,
            role: selectedRole
        })
    }

    const kakaoOnFailure = (error: any) => {
        console.error('카톡 로그인 오류', error);
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
        regularLogin({
            email,
            password,
            role: selectedRole
        })
        
    }

    return (
        <StyledContainer className='con'>
            {
                signup ? (
                    <SignupComponent />
                )
                    : (

                        <StyledBox className='box'>
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
