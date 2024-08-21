import React from 'react'
import { NavbarComponent } from '../../components'
import { Outlet } from 'react-router-dom'

function LayoutPage() {
  return (
    <>
        <NavbarComponent /> 
        <Outlet />
    </>
  )
}

export default LayoutPage
