
import { StyledBox, StyledContainer, StyledImage, StyledText } from './style'


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
