import React from 'react'
import { StyledMenus, StyledTitle } from './style'
import { Link } from 'react-router-dom'

const NavbarComponent = () => {
  return (
    <div>
      <StyledTitle>
        <Link to="/browse">
          <h1>BNTY</h1> 
        </Link>
      </StyledTitle>
      <StyledMenus>
        <Link to="/bodycheck">
          <button>bodyCheck 📸</button>
        </Link>
        <Link to="/food">
          <button>food 🥗</button>
        </Link>
        <Link to="/workout">
          <button>work out 🏋️</button>
        </Link>
        <Link to="/timer">
          <button>timer ⏰</button>
        </Link>
      </StyledMenus>
    </div>
  )
}

export default NavbarComponent
