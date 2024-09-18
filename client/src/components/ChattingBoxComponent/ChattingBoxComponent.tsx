import React from 'react'
import { StyledContainer, StyledContent, StyledProfile } from './style'
import { useNavigate } from 'react-router-dom'

const ChattingBoxComponent = () => {
    const navigate = useNavigate()

    const handleNavigate = (userId: number | string) => {
        navigate(`/chat/${userId}`)
    }
    return (
        <>
            <StyledContainer onClick={() => handleNavigate(1)}>
                <StyledProfile>
                    <img src="./logo2.png" alt="프로필사진" />
                </StyledProfile>
                <StyledContent>
                    <h2>이름</h2>
                    <p>대화내용</p>
                </StyledContent>
            </StyledContainer>
            <StyledContainer>
                <StyledProfile>
                    <img src="./logo2.png" alt="프로필사진" />
                </StyledProfile>
                <StyledContent>
                    <h2>이름</h2>
                    <p>대화내용</p>
                </StyledContent>
            </StyledContainer>
            <StyledContainer>
                <StyledProfile>
                    <img src="./logo2.png" alt="프로필사진" />
                </StyledProfile>
                <StyledContent>
                    <h2>이름</h2>
                    <p>대화내용</p>
                </StyledContent>
            </StyledContainer>
        </>
    )
}

export default ChattingBoxComponent
