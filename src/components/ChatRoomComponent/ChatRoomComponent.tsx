import React from 'react'
import { StyledContainer, StyledContent, StyledProfile } from './style'

const ChatRoomComponent = () => {
  return (
    <StyledContainer>
        <StyledProfile>
            <img src="./logo2.png" alt="프로필사진" />
        </StyledProfile>
        <StyledContent>
            <h2>이름</h2>
            <p>대화내용</p>
        </StyledContent>
    </StyledContainer>
  )
}

export default ChatRoomComponent
