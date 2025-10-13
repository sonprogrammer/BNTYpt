
import { useNavigate } from 'react-router-dom'
import { StyledBackLink, StyledContainer, StyledEmoji, StyledText } from './style'

const NotFoundComponent = () => {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }
  
  return (
    <StyledContainer>
      <StyledEmoji>😢</StyledEmoji>
      <StyledText>404 - Page Not Found</StyledText>
      <StyledBackLink onClick={handleGoBack}>go back</StyledBackLink>
    </StyledContainer>
  )
}

export default NotFoundComponent
