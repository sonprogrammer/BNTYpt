
import { StyledTitle } from './style'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil'
import { userState } from '../../utils/userState'
import { usePostLogout } from '../../hooks/usePostLogout';
import { useState } from 'react';
import LogoutModal from '../LogoutModalComponent/LogoutModalComponent';



const LogoComponent = () => {
  const [, setUser] = useRecoilState(userState)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const logoutMutation =usePostLogout()

  const navigate = useNavigate()

  const handleLogoutClick = () => {
    setIsModalOpen(true)
  }


  const handleLogoutConfirm = async () => {
    try {
      await logoutMutation.mutateAsync();
      setUser(null);
      localStorage.clear();
      navigate('/');
    } catch (e) {
      console.error("logout error", e);
    }
  }


  return (
    <header>
      <StyledTitle>
        <Link to="/browse"><h1>B N T Y</h1></Link>
        <div className='logout-icon' onClick={handleLogoutClick}>
          <FontAwesomeIcon icon={faRightFromBracket} />
        </div>
      </StyledTitle>

      {isModalOpen && (
        <LogoutModal 
          onConfirm={handleLogoutConfirm} 
          onCancel={() => setIsModalOpen(false)} 
        />
      )}
    </header>
  )
}

export default LogoComponent
