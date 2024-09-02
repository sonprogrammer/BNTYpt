import React from 'react'
import { StyledTitle } from './style'
import { Link } from 'react-router-dom'

const LogoComponent = () => {
  return (
    <div>
    <StyledTitle>
        <Link to="/browse">
          <h1>BNTY</h1> 
        </Link>
      </StyledTitle>
    </div>
  )
}

export default LogoComponent
