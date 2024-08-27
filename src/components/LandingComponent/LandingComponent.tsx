import React, { useState } from 'react'
import KakaoLogin from 'react-kakao-login'
import { StyledBox, StyledContainer } from './style'

const LandingComponent = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    
    const kakaoClientId = '748f4b889898873bb1a6d613886ebdf5'

    const handleLogin = () =>{
        console.log('try to login', { email, password})
    }
    
    const kakaoOnSuccess = async (data: any) => {
        console.log(data)
        const idToken = data.response.access_token  // 엑세스 토큰 백엔드로 전달
    }
    const kakaoOnFailure = (error: any) => {
        console.log(error);
    };
    return (
        <StyledContainer>
            <StyledBox>
                <h1>BNTY</h1>
                <img src="./logo.png" alt="" />
                    <KakaoLogin
                        token={kakaoClientId}
                        onSuccess={kakaoOnSuccess}
                        onFail={kakaoOnFailure}
                        style={{
                            // backgroundColor: 'rgb(69 10 10)',
                            backgroundColor: 'rgb(153 27 27)',
                            color: 'white',
                            borderRadius: '5px',
                            padding: '10px 30px',
                            
                        }}
                    />
                </StyledBox>
            </StyledContainer>
    )
}

export default LandingComponent
