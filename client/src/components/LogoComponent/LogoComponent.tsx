import React, { useState } from 'react'
import { StyledLogoutModal, StyledTitle } from './style'
import { Link, useNavigate } from 'react-router-dom'
import { LogoutModalComponent } from '../LogoutModalComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil'
import { userState } from '../../utils/userState'


const LogoComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [user, setUser] = useRecoilState(userState)


  const navigate = useNavigate()
  
  
  const handleOpenModal = () =>{
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleConfirmModal = () => {
    setUser(null)
    localStorage.removeItem('user')
    handleCloseModal()
    navigate('/')
  }
  
  
  return (
    <div>
    <StyledTitle>
        <Link to="/browse">
          <h1>B N T Y</h1> 
        </Link>
        <FontAwesomeIcon onClick={handleOpenModal} className='logout-icon' icon={faRightFromBracket} />
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
