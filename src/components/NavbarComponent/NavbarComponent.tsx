import React from 'react'
import { StyledMenus, StyledTitle } from './style'
import { Link } from 'react-router-dom'

const NavbarComponent = () => {
  return (
    <div>
      <StyledTitle>
        <h1>BNTY</h1> 
      </StyledTitle>
      <StyledMenus>
        <Link to="/bodycheck">
          <button>bodyCheck 📸</button>
        </Link>
        <button>food 🥗</button>
        <button>today 🏋️</button>
        <button>timer ⏰</button>
      </StyledMenus>
    </div>
  )
}

export default NavbarComponent
