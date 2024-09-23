import React from 'react'
import { StyledBox, StyledContainer, StyledImage, StyledText } from './style'
import dayjs from 'dayjs'

interface PhotoComponentProps {
    imageUrl: string,
    uploadTime: string
    text: string
}

const PhotoComponent = ({ imageUrl, uploadTime, text} : PhotoComponentProps) => {

  return (
    <StyledContainer>
        <StyledBox>
            <StyledImage src={imageUrl} alt="image" />
            <p>{text}</p>
            <StyledText>{uploadTime}</StyledText>
        </StyledBox>
    </StyledContainer>
  )
}

export default PhotoComponent
