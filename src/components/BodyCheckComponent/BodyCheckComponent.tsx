import React from 'react'
import { StyledBox, StyledContainer, StyledImage, StyledText } from './style'
import dayjs from 'dayjs'

function BodyCheckComponent() {
    const uploadTime = dayjs().format('YYYY-MM-DD:mm:ss')
  return (
    <StyledContainer>
        <StyledBox>
            <StyledImage src="logo.png" alt="image" />
            <StyledText>{uploadTime}</StyledText>
        </StyledBox>
        <StyledBox>
            <StyledImage src="logo.png" alt="image" />
            <StyledText>{uploadTime}</StyledText>
        </StyledBox>
        <StyledBox>
            <StyledImage src="logo.png" alt="image" />
            <StyledText>{uploadTime}</StyledText>
        </StyledBox>
    </StyledContainer>
  )
}

export default BodyCheckComponent
