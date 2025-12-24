import { useCallback, useState } from 'react'
import { QrcodeComponent } from '../../components'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { userState } from '../../utils/userState'
import AddMemeberComponent from './AddMemeberComponent'
import { StyledDashboardCard, StyledInfoText, StyledMainContainer, StyledPtAddBtn } from './style'
import { axiosInstance } from '../../utils/axiosInstance'
const apiUrl = process.env.REACT_APP_API_URL;



const MainPage = () => {
  const [addMemeber, setAddMember] = useState<boolean>(false)
  const [user, setUser] = useRecoilState(userState)

  const getUserPtCount = useCallback(async () => {
    if (!user?.objectId) return
    try {
      const res = await axiosInstance.get(`${apiUrl}/api/chat/pt/${user.objectId}`)

      if (res.data.success) {
        setUser((prevState: any) => ({ ...prevState, ptCount: res.data.message }));

      }

    } catch (error) {
      console.error(error)
    }
  },[user?.objectId, setUser])

  useEffect(() => {
    getUserPtCount()
  }, [getUserPtCount])


  return (
    <StyledMainContainer>
      <StyledDashboardCard>
        {user?.role === 'trainer' ? (
          <div className='flex flex-col gap-6 items-center w-full'>
            <StyledInfoText>
              <span className="role">TRAINER</span>
              <h2>{user.name} <span>트레이너님</span></h2>
              <p>회원님의 QR리더기로 스캔하여 수업을 체크하세요.</p>
            </StyledInfoText>

            <QrcodeComponent role={user.role} />

            <StyledPtAddBtn onClick={() => setAddMember(true)}>
              신규 PT 회원 추가
            </StyledPtAddBtn>

            {addMemeber && <AddMemeberComponent closeModal={() => setAddMember(false)} />}
          </div>
        ) : (
          <div className='flex flex-col gap-6 items-center w-full'>
            <StyledInfoText>
              <span className="role member">MEMBER</span>
              <h2>{user?.name} <span>님</span></h2>
            </StyledInfoText>

            <div className="pt-count-badge">
              <span className="label">남은 PT 횟수</span>
              <span className="count">{user?.ptCount}</span>
            </div>

            <QrcodeComponent role={user?.role} />
            
            <p className="hint-text">트레이너에게 QR 코드를 보여주세요.</p>
          </div>
        )}
      </StyledDashboardCard>
    </StyledMainContainer>
  
  )
}

export default MainPage
