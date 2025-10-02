
import { StyledTitle } from './style'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil'
import { userState } from '../../utils/userState'
import { handleLogout } from '../../utils/logout'



const LogoComponent = () => {
  const [, setUser] = useRecoilState(userState)


  const navigate = useNavigate()




  const handleLogoutConfirm = async () => {
    const confirmed = await handleLogout()
    if (confirmed) {
      navigate('/')
      setTimeout(() => {


        setUser(null)
        localStorage.removeItem('user')
        localStorage.removeItem('token')
      }, 1600)

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
