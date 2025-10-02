/* eslint-disable */

import React, { useState } from 'react'
import KakaoLogin from 'react-kakao-login'
import { StyledBox, StyledContainer, StyledEmailInput, StyledLoginBtn, StyledLogo, StyledPasswordInput, StyledSubmitBtns } from './style'

const LoginComponent = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    
    const kakaoClientId = process.env.REACT_APP_KAKAO_CLIENT_ID as string

 
    
    const kakaoOnSuccess = async (data: any) => {
        const idToken = data.response.access_token  
    }
    const kakaoOnFailure = (error: any) => {
        console.log(error);
    };
    return (
        <StyledBox>
            <StyledContainer>
                <h1>BNTY</h1>
                <StyledLogo src="./logo.png" alt="" />
                <StyledEmailInput
                    type="email" 
                    placeholder='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                     />
                <StyledPasswordInput 
                    type="password" 
                    placeholder='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                     />
                <StyledSubmitBtns>
                    <StyledLoginBtn type="submit">로그인하기</StyledLoginBtn>
                    <KakaoLogin
                        token={kakaoClientId}
                        // clientId={kakaoClientId}
                        onSuccess={kakaoOnSuccess}
                        onFail={kakaoOnFailure}
                        style={{
                            backgroundColor: 'rgb(153 27 27)',
                            color: 'white',
                            borderRadius: '5px',
                            padding: '10px 30px'
                        }}
                    />
                </StyledSubmitBtns>
            </StyledContainer>
        </StyledBox>
    )
}

export default LoginComponent
