import React from 'react'
import { NavbarComponent } from '../../components'
import { Outlet } from 'react-router-dom'
import { StyledContainer, StyledOutlet } from './style'

function LayoutPage() {
  return (
    <>
      <StyledContainer>
        <NavbarComponent />
        <StyledOutlet>
        <Outlet />
        </StyledOutlet>
      </StyledContainer>
    </>
  )
}

export default LayoutPage
