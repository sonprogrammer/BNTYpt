import React, { useState } from 'react'
import KakaoLogin from 'react-kakao-login'
import { StyledBox, StyledContainer, StyledLoginBtn, StyledLoginInput, StyledRadios, StyledSignUpBtn } from './style'
import axios from 'axios'
import { useRecoilState } from 'recoil';
import { userState } from '../../utils/userState';
import { useNavigate } from 'react-router-dom';
import { saveUserToLocalStorage } from '../../utils/localStorage';
import SignupComponent from './SignupComponent';





const LandingComponent = () => {
    const [selectedRole, setSelectedRole] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [user, setUser] = useRecoilState(userState)
    const [signup, setSignup] = useState<boolean>(false)

    const navigate = useNavigate()

    // 나중에 env파일에 집어 넣기
    const kakaoClientId = '748f4b889898873bb1a6d613886ebdf5'

    const handleRadioChage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedRole(e.target.value)
    }

    const kakaoOnSuccess = async (data: any) => {
        const accessToken = data.response.access_token
        if (!selectedRole) {
            alert('Please select your role')
            return
        }
        try {
            setLoading(true)
            const res = await axios.post('http://localhost:4000/api/user/login', {
                accessToken,
                role: selectedRole
            })
            if (res.data.success) {
                const newUser = ({
                    kakaoId: res.data.kakaoId,
                    name: res.data.name,
                    role: selectedRole,
                    token: accessToken
                });
                setUser(newUser)
                saveUserToLocalStorage(newUser)
                navigate('/browse')
            } else {
                console.error('login failed :', res.data.message)
            }
        } catch (error) {
            alert('❌❌check your Email or Password❌❌')

            console.error('error login : ', error)
        } finally {
            setLoading(false)
        }
    }

    const kakaoOnFailure = (error: any) => {
        console.log('카톡 로그인 오류', error);
    };


    const hanldeSignup = () => {
        setSignup(true)
    }

    return (
        <StyledContainer>
            {
                signup ? (
                    <SignupComponent />
                )
                : (

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
                <StyledLoginBtn>로그인</StyledLoginBtn>
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
                <StyledSignUpBtn onClick={hanldeSignup}>가입하기</StyledSignUpBtn>
            </StyledBox>
                )
            }
        </StyledContainer>
    )
}

export default LandingComponent
