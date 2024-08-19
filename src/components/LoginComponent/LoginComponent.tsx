import React from 'react'
import KakaoLogin from 'react-kakao-login'
import { StyledContainer, StyledEmailInput, StyledSubmitBtns } from './style'

const LoginComponent = () => {
    const kakaoClientId = '748f4b889898873bb1a6d613886ebdf5'
    const kakaoOnSuccess = async (data: any) => {
        console.log(data)
        const idToken = data.response.access_token  // 엑세스 토큰 백엔드로 전달
    }
    const kakaoOnFailure = (error: any) => {
        console.log(error);
    };
    return (
        <>
            <StyledContainer>
                <h1>bnty login</h1>
                <StyledEmailInput type="email" />
                <StyledEmailInput type="password" />
                <StyledSubmitBtns>
                    <button type="submit">로그인하기</button>
                    <KakaoLogin
                        token={kakaoClientId}
                        onSuccess={kakaoOnSuccess}
                        onFail={kakaoOnFailure}
                    />
                </StyledSubmitBtns>
            </StyledContainer>
        </>
    )
}

export default LoginComponent
