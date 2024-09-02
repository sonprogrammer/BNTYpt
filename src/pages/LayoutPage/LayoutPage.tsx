import React from 'react'
import { LogoComponent, NavbarComponent } from '../../components'
import { Outlet } from 'react-router-dom'
import { StyledContainer, StyledMenus, StyledOutlet } from './style'

function LayoutPage() {
  return (
    <>
      <StyledContainer>
        <LogoComponent />
        <StyledOutlet>
        <Outlet />
        </StyledOutlet>
      </StyledContainer>
      <StyledMenus>
        <NavbarComponent />
      </StyledMenus>
    </>
  )
}

export default LayoutPage
