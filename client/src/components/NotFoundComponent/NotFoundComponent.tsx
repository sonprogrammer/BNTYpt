import { useNavigate } from 'react-router-dom'
import { StyledBackLink, StyledContainer, StyledEmoji, StyledText, StyledSubText } from './style'

const NotFoundComponent = () => {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }
  
  return (
    <StyledContainer>
      <StyledEmoji>🚫</StyledEmoji>
      <StyledText>Page <span>Not Found</span></StyledText>
      <StyledSubText>요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</StyledSubText>
      <StyledBackLink onClick={handleGoBack}>Go Back</StyledBackLink>
    </StyledContainer>
  )
}

export default NotFoundComponent;