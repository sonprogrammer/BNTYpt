import { useState } from 'react'
import { StyledBackBtn, StyledBox, StyledCheckBtn, StyledEmail, StyledLoginInput, StyledPassword, StyledRadios, StyledSignUp } from './style'
import { ArrowLeft, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import toast from 'react-hot-toast'
import { useCheckEmail } from '../../hooks/useCheckEmail';
import { useSignup } from '../../hooks/useSignup';



const SignupComponent = () => {
    const [selectedRole, setSelectedRole] = useState<string>('')
    const [email, setEmail] = useState<string>('')

    const [name, setName] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [passwordMismatch, setPasswordMismatch] = useState<boolean>(false);

    const { isLoading, emailChecked, isAvailable } = useCheckEmail(email)
    const { signup } = useSignup()

    const handleRefresh = () => {
        window.location.reload()
    }




    const handleSignup = async () => {
        if (password !== confirmPassword) {
            setPasswordMismatch(true)
            toast.error('비밀번호가 일치하지 않습니다.')
            return
        }
        if (!selectedRole) {
            toast.error('역할을 선택해주세요.')
            return
        }
        signup({ email, password, name, role: selectedRole })
    }

    return (
        <StyledBox>
            <StyledBackBtn onClick={handleRefresh}>
                <ArrowLeft size={20} />
            </StyledBackBtn>
            <h1>BNTY</h1>
            <StyledLoginInput>
                <StyledEmail>
                    <input type="email" placeholder='ID (Email)' onChange={(e) => setEmail(e.target.value)} />
                    <StyledCheckBtn>
                        {isLoading ? (
                            <Loader2
                                size={18}
                                className="animate-spin text-stone-500"
                            />
                        ) : emailChecked && isAvailable ? (
                            <CheckCircle2
                                size={18}
                                className="text-green-500"
                            />
                        ) : emailChecked && !isAvailable ? (
                            <XCircle
                                size={18}
                                className="text-red-500"
                            />
                        ) : null}
                    </StyledCheckBtn>

                </StyledEmail>

                <input type="text" placeholder='Name' onChange={(e) => setName(e.target.value)} />

                <StyledPassword>
                    <input type="password" placeholder='PASSWORD' onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordMismatch(e.target.value !== confirmPassword);
                    }} />
                    <input type="password" placeholder='PASSWORD Check' onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setPasswordMismatch(e.target.value !== password);
                    }} />
                    {passwordMismatch && confirmPassword && (
                        <p className='text-red-500 text-xs ml-1'>비밀번호가 일치하지 않습니다.</p>
                    )}
                </StyledPassword>
            </StyledLoginInput>

            <StyledRadios>
                <label style={{
                    borderColor: selectedRole === 'trainer' ? '#ef4444' : 'rgba(255,255,255,0.1)',
                    backgroundColor: selectedRole === 'trainer' ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
                    color: selectedRole === 'trainer' ? '#ef4444' : '#fff'
                }}>
                    <input type="radio" name='role' value='trainer' onChange={(e) => setSelectedRole(e.target.value)} />
                    Trainer
                </label>
                <label style={{
                    borderColor: selectedRole === 'member' ? '#3b82f6' : 'rgba(255,255,255,0.1)',
                    backgroundColor: selectedRole === 'member' ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                    color: selectedRole === 'member' ? '#3b82f6' : '#fff'
                }}>
                    <input type="radio" name='role' value='member' onChange={(e) => setSelectedRole(e.target.value)} />
                    Member
                </label>
            </StyledRadios>

            <StyledSignUp disabled={!isAvailable} onClick={handleSignup}>가입하기</StyledSignUp>
        </StyledBox>
    )
}

export default SignupComponent
