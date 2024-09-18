import React, { useState } from 'react'
import KakaoLogin from 'react-kakao-login'
import { StyledBox, StyledContainer, StyledRadios } from './style'

const LandingComponent = () => {
    const [selectedRole, setSelectedRole] = useState<String>('')
    
    const kakaoClientId = '748f4b889898873bb1a6d613886ebdf5'

   const handleRadioChage = (e : React.ChangeEvent<HTMLInputElement>) =>{
        setSelectedRole(e.target.value)
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
                <StyledRadios>
                    <label style={{color : selectedRole === 'trainer' ? 'red' : 'white'}}>
                        <input 
                            type="radio" 
                            name='role' 
                            value='trainer' 
                            checked={selectedRole === 'trainer'}
                            onChange={handleRadioChage}
                        />
                        Trainer
                    </label>
                    <label style={{color: selectedRole === 'member' ? 'blue' : 'white'}}>
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
                </StyledBox>
            </StyledContainer>
    )
}

export default LandingComponent
