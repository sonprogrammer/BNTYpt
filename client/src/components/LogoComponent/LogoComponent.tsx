
import { StyledTitle } from './style'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil'
import { userState } from '../../utils/userState'
import { handleLogout } from '../../utils/logout'
import { usePostLogout } from '../../hooks/usePostLogout';



const LogoComponent = () => {
  const [, setUser] = useRecoilState(userState)

  const logoutMutation =usePostLogout()

  const navigate = useNavigate()




  const handleLogoutConfirm = async () => {
    const confirmed = await handleLogout()
    if (confirmed) {

      try {
        await logoutMutation.mutateAsync()
      } catch (e) {
        console.error("logout error", e)
      }
      
      setUser(null)
      localStorage.removeItem('user')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('token')
      
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('kakao_')) {
          localStorage.removeItem(key);
        }
      });
      navigate('/')
    }
  }


  return (
    <div>
      <StyledTitle>
        <Link to="/browse">
          <h1>B N T Y</h1>
        </Link>
        <FontAwesomeIcon onClick={handleLogoutConfirm} className='logout-icon' icon={faRightFromBracket} />
      </StyledTitle>
    </div>
  )
}

export default LogoComponent
