import React, { useState } from 'react'
import { StyledBox, StyledContainer, StyledLoginInput, StyledRadios, StyledSignUpBtn } from './style'

const SignupComponent = () => {
    const [selectedRole, setSelectedRole] = useState<string>('')

    const handleRadioChage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedRole(e.target.value)
    }
  return (
    <StyledContainer>
    <StyledBox>
        <h1>BNTY</h1>
        {/* <img src="./logo.png" alt="" /> */}
        <StyledLoginInput>
                <input type="email" placeholder='ID'/>
                <input type="password" placeholder='PASSWORD'/>
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
        
        <StyledSignUpBtn>가입하기</StyledSignUpBtn>
    </StyledBox>
</StyledContainer>
  )
}

export default SignupComponent
