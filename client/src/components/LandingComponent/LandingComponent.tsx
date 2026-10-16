import React, { useState } from 'react'
import { StyledBox, StyledContainer, StyledLoginBtn,StyledKakaoLoginBtn, StyledLoginInput, StyledRadios, StyledSignUpBtn } from './style'
import SignupComponent from './SignupComponent';
import toast from 'react-hot-toast'
import { useKakaoLogin } from '../../hooks/useKakaoLogin';
import { useRegularLogin } from '../../hooks/useRegularLogin';




const LandingComponent = () => {
    const [selectedRole, setSelectedRole] = useState<'trainer' | 'member' | null>(null)
    const [signup, setSignup] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');


    const { mutate: regularLogin} = useRegularLogin()
    const {handleKakaoLogin } = useKakaoLogin()



    const handleRadioChage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const role = e.target.value
        if(role==='trainer' || role ==='member'){
            setSelectedRole(role)
            sessionStorage.setItem('login-role', role) //로그인 완료되면 삭제 처리하기 카카오 콜백 땜에 그럼
        }
    }


    const hanldeSignup = () => {
        setSignup(true)
    }

    const handleKakao = () => {
        if(!selectedRole){
            toast.error('역할을 선택하세요')
            return
        }
        handleKakaoLogin()
        
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

                                <StyledLoginBtn disabled={!selectedRole} onClick={handleLogin}>로그인</StyledLoginBtn>
                                <StyledKakaoLoginBtn   onClick={handleKakao}>
                                    카카오 로그인
                                </StyledKakaoLoginBtn>
                                

                            </div>
                            <StyledSignUpBtn onClick={hanldeSignup}>신규 회원이신가요? 가입하기</StyledSignUpBtn>
                        </StyledBox>
                    )
            }
        </StyledContainer>
    )
}

export default LandingComponent
