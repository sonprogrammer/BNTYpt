import React, { useState } from 'react'
import { StyledBackBtn, StyledBox, StyledCheckBtn, StyledEmail, StyledLoginInput, StyledPassword, StyledRadios, StyledSignUp, StyledSignUpBtn } from './style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
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
            // const res = await axios.get(`http://localhost:4000/api/user/check-email?email=${email}`)
            const res = await axios.get(`${apiUrl}/api/user/check-email?email=${email}`)
            if(res.data.exists){
                alert('try other email')
            }else{
                alert('you cna use')
            }
        } catch (error) {
            console.log(error)
        }
    }



    const handleSignup = async() => {
        if(password !== confirmPassword){
            setPasswordMismatch(true)
            return
        }
        if(!selectedRole){
            alert('please select role')
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
                alert('congraturation~~~🥳')
                handleRefresh()
            }
        } catch (error) {
            console.log('error', error)
            alert('가입 중 오류가 발생했습니다. 다시 시도해주세요.')
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
                <input type="email" placeholder='ID' onChange={handleEamil}/>
                <StyledCheckBtn onClick={checkEmail}>
                        <span className="text">중복확인</span>
                        <FontAwesomeIcon icon={faUserCheck} className="icon" />
                </StyledCheckBtn>

            </StyledEmail>
                <input type="text" placeholder='name' onChange={handleName}/>
            <StyledPassword>
                <input type="password" placeholder='PASSWORD'onChange={handlePassword}/>
                <input type="password" placeholder='PASSWORD Check' onChange={handledConfirmPassword}/>
                {passwordMismatch && <p className='text-red-500'>비밀번호가 일치하지 않습니다.</p>}
            </StyledPassword>
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
        
        <StyledSignUp onClick={handleSignup}>가입하기</StyledSignUp>
    </StyledBox>
  )
}

export default SignupComponent
