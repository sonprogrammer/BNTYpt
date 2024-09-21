import React from 'react'
import { LandingComponent, LoginComponent } from '../../components'
import { StyledContainer, StyledLogin } from './style'


const LandingPage = () => {
  return (
    <StyledContainer>
        <video autoPlay loop muted>
            <source src='/bg.mp4' type='video/mp4'/>
                your browser does not support
        </video>
        <StyledLogin>
            <LandingComponent />
        </StyledLogin>
    </StyledContainer>
  )
}

export default LandingPage
