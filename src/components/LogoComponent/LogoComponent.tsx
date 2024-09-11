import React, { useState } from 'react'
import { StyledLogoutModal, StyledTitle } from './style'
import { Link, useNavigate } from 'react-router-dom'
import { LogoutModalComponent } from '../LogoutModalComponent'

const LogoComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const navigate = useNavigate()
  
  
  const handleOpenModal = () =>{
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    console.log('close modal')
  }

  const handleConfirmModal = () => {
    //로그아웃 api
    console.log('success to logout')
    handleCloseModal()
    navigate('/')
  }
  
  
  return (
    <div>
    <StyledTitle>
        <Link to="/browse">
          <h1>BNTY</h1> 
        </Link>
        <h3 onClick={handleOpenModal}>logout</h3>
        <StyledLogoutModal onClick={handleCloseModal}>
          {isModalOpen && 
            (<LogoutModalComponent 
              onConfirm={handleConfirmModal} 
              onCancel={handleCloseModal}
            />)}
        </StyledLogoutModal>
      </StyledTitle>
    </div>
  )
}

export default LogoComponent
