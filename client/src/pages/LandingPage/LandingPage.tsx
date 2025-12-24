
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
          <div className="tagline">트레이너와 회원을 잇는 최고의 파트너십</div>
          <p className="description">
            복잡한 수업 예약과 관리는 이제 그만.<br />
            <strong>트레이너의 전문적인 가이드</strong>와 <strong>회원의 노력</strong>이<br />
            BNTY 안에서 하나의 데이터로 실시간 공유됩니다.
          </p>
          <div className="feature-pills">
            <span>#PT_QR_체크인</span>
            <span>#식단_캘린더</span>
            <span>#1:1_밀착_코칭_일지</span>
            <span>#오운완_앨범</span>
            <span>#실시간_채팅_피드백</span>
          </div>
        </BrandingSection>

        <LandingComponent />
      </StyledLogin>
    </StyledContainer>
  )
}

export default LandingPage
