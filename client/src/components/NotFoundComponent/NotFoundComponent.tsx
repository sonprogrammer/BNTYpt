import React from 'react'
import { StyledBackLink, StyledContainer, StyledEmoji, StyledText } from './style'

const NotFoundComponent = () => {
  return (
    <StyledContainer>
      <StyledEmoji>😢</StyledEmoji>
      <StyledText>404 - Page Not Found</StyledText>
      <StyledBackLink href='/'>go back</StyledBackLink>
    </StyledContainer>
  )
}

export default NotFoundComponent
