import React from 'react'
import { StyledMenus, StyledTitle } from './style'

const NavbarComponent = () => {
  return (
    <div>
      <StyledTitle>
        <h1>BNTY</h1> 
        {/* logo */}
      </StyledTitle>
      <StyledMenus>
        <button>bodyCheck</button>
        <button>food</button>
        <button>today</button>
        <button>timer</button>
      </StyledMenus>
    </div>
  )
}

export default NavbarComponent
