
import { StyledTitle } from './style'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { userState } from '../../utils/userState'
import { usePostLogout } from '../../hooks/usePostLogout';
import { useState } from 'react';
import LogoutModal from '../LogoutModalComponent/LogoutModalComponent';
import { LogOut } from 'lucide-react';



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
          <LogOut size={22} className="cursor-pointer" strokeWidth={3.5} />
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
