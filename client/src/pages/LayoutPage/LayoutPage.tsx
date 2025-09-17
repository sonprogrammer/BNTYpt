import React from 'react'
import { LogoComponent, NavbarComponent } from '../../components'
import { Outlet } from 'react-router-dom'
import { StyledContainer, StyledMenus, StyledOutlet } from './style'

function LayoutPage() {
  return (

    <StyledContainer>
      <LogoComponent />
      <StyledOutlet className='hi'>
        <Outlet />
      </StyledOutlet>
      <StyledMenus>
        <NavbarComponent />
      </StyledMenus>
    </StyledContainer>
  )
}

export default LayoutPage
