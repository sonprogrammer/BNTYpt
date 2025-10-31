
import { useNavigate } from 'react-router-dom'
import { LandingComponent } from '../../components'
import { StyledContainer, StyledLogin } from './style'
import { useRecoilState } from 'recoil'
import { userState } from '../../utils/userState'
import { useEffect } from 'react'


const LandingPage = () => {
  const [user] = useRecoilState(userState)
const navigate = useNavigate()


useEffect(() => {
  if(user?.email){
      navigate('/browse')
  }
} ,[user?.email, navigate])
  
  return (
    <StyledContainer>
        <video autoPlay loop muted>
            <source src='/bg.mp4' type='video/mp4'/>
                your browser does not support
        </video>
        <StyledLogin>
            <LandingComponent />
        </StyledLogin>
    </StyledContainer>
  )
}

export default LandingPage
