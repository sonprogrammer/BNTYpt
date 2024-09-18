import React, { useState } from 'react'
import { StyledLogoutModal, StyledTitle } from './style'
import { Link, useNavigate } from 'react-router-dom'
import { LogoutModalComponent } from '../LogoutModalComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';


const LogoComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isWidth, setIsWidth] = useState<boolean>(window.innerWidth <= 800)

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
        <h3 className='logout-text' onClick={handleOpenModal}>logout</h3>
        <FontAwesomeIcon onClick={handleOpenModal} className='logout-icon' icon={faRightFromBracket} size='lg'/>
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
