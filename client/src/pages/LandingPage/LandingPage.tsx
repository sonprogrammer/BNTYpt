
import { useNavigate } from 'react-router-dom'
import { LandingComponent } from '../../components'
import { BackgroundDecor, BrandingSection, StyledContainer, StyledLogin } from './style'
import { useRecoilState } from 'recoil'
import { userState } from '../../utils/userState'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

const LandingPage = () => {
  const [user] = useRecoilState(userState)
const navigate = useNavigate()


useEffect(() => {
  if(user?.email){
    toast.success(`${user?.name} 환영합니다.`)
      navigate('/browse')
  }
} ,[user?.email, navigate, user?.name])
  
  return (
    <StyledContainer>
      <BackgroundDecor />

      <StyledLogin>
        <BrandingSection>
          <h1>BNTY</h1>
          <div className="tagline">당신의 성장을 기록하는 가장 완벽한 방법</div>
          <p className="description">
            QR 체크인으로 간편한 수업 관리부터,<br />
            전문적인 식단/운동 일지까지 한곳에서 관리하세요.
          </p>
          <div className="feature-pills">
            <span>#PT_QR_체크인</span>
            <span>#식단_캘린더</span>
            <span>#오운완_앨범</span>
          </div>
        </BrandingSection>

        <LandingComponent />
      </StyledLogin>
    </StyledContainer>
  )
}

export default LandingPage
