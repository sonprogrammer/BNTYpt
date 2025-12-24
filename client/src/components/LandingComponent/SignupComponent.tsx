import React, { useState } from 'react'
import { StyledBackBtn, StyledBox, StyledCheckBtn, StyledEmail, StyledLoginInput, StyledPassword, StyledRadios, StyledSignUp } from './style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import toast from 'react-hot-toast'
const apiUrl = process.env.REACT_APP_API_URL;



const SignupComponent = () => {
    const [selectedRole, setSelectedRole] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [passwordMismatch, setPasswordMismatch] = useState<boolean>(false);


    const handleEamil = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setEmail(e.target.value)
    }
    const handleName = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setName(e.target.value)
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
        setPasswordMismatch(false)
    }

    const handledConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const confirmPassword = e.target.value
        setConfirmPassword(confirmPassword)
        if(confirmPassword !== password){
            setPasswordMismatch(true)
        }else{
            setPasswordMismatch(false)
        }
    }
    
    const handleRadioChage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedRole(e.target.value)
    }

    const handleRefresh = () => {
        window.location.reload()
    }

    const checkEmail = async() => {
        try {
            const res = await axios.get(`${apiUrl}/api/user/check-email?email=${email}`)
            if(res.data.exists){
                toast.error('이미 사용 중인 이메일입니다.')
            }else{
                toast.success('사용 가능한 이메일입니다.')
            }
        } catch (error) {
            console.log(error)
            toast.error('이메일 중복 확인 중 오류가 발생했습니다.')
        }
    }



    const handleSignup = async() => {
        if(password !== confirmPassword){
            setPasswordMismatch(true)
            toast.error('비밀번호가 일치하지 않습니다.')
            return
        }
        if(!selectedRole){
            toast.error('역할을 선택해주세요.')
            return
        }
        try {
            const res = await axios.post(`${apiUrl}/api/user/signup`,{
                email,
                name,
                password,
                role: selectedRole
            })

            if(res.data.success){
                toast.success('가입을 축하합니다! 로그인해주세요.')
                handleRefresh()
            }
        } catch (error) {
            console.log('error', error)
            toast.error('가입 중 오류가 발생했습니다.')
        }
    }
    
  return (
    <StyledBox>
    <StyledBackBtn onClick={handleRefresh}>
        <FontAwesomeIcon icon={faArrowLeft}/>
    </StyledBackBtn>
    <h1>BNTY</h1>
    <StyledLoginInput>
        <StyledEmail>
            <input type="email" placeholder='ID (Email)' onChange={(e) => setEmail(e.target.value)}/>
            <StyledCheckBtn onClick={checkEmail}>
                <span className="text">중복확인</span>
                <FontAwesomeIcon icon={faUserCheck} className="icon" />
            </StyledCheckBtn>
        </StyledEmail>
        
        <input type="text" placeholder='Name' onChange={(e) => setName(e.target.value)}/>
        
        <StyledPassword>
            <input type="password" placeholder='PASSWORD' onChange={(e) => {
                setPassword(e.target.value);
                setPasswordMismatch(e.target.value !== confirmPassword);
            }}/>
            <input type="password" placeholder='PASSWORD Check' onChange={(e) => {
                setConfirmPassword(e.target.value);
                setPasswordMismatch(e.target.value !== password);
            }}/>
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
    
    <StyledSignUp onClick={handleSignup}>가입하기</StyledSignUp>
</StyledBox>
  )
}

export default SignupComponent
