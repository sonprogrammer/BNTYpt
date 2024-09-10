import React from 'react'
import { StyledLogoutModal, StyledTitle } from './style'
import { Link } from 'react-router-dom'

const LogoComponent = () => {
  return (
    <div>
    <StyledTitle>
        <Link to="/browse">
          <h1>BNTY</h1> 
        </Link>
        <StyledLogoutModal>
          <h3>logout</h3>
        </StyledLogoutModal>
      </StyledTitle>
    </div>
  )
}

export default LogoComponent
