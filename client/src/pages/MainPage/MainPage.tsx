import { lazy, Suspense, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { userState } from '../../utils/userState'
import { StyledDashboardCard, StyledInfoText, StyledMainContainer, StyledPtAddBtn } from './style'
import { useGetUserPtCount } from '../../hooks/useGetUserPtCount'

const AddMemeberComponent = lazy(() => import('./AddMemeberComponent'))
const QrcodeComponent = lazy(() => import('../../components').then(module => ({ default: module.QrcodeComponent })))

const MainPage = () => {
  const [addMemeber, setAddMember] = useState<boolean>(false)
  const user = useRecoilValue(userState)

  const { data, isPending } = useGetUserPtCount(user?.objectId, user?.role === 'member')

  const ptCount = data?.data

  return (
    <StyledMainContainer>
      <StyledDashboardCard>
        <Suspense fallback={<div className='animate-pulse w-full rounded-[2.5rem]'></div>}>
          {user?.role === 'trainer' ? (
            <div className='flex flex-col gap-6 items-center w-full'>
              <StyledInfoText>
                <span className="role">TRAINER</span>
                <h2>{user.name} <span>트레이너님</span></h2>
                <p>회원님의 QR리더기로 스캔하여 수업을 체크하세요.</p>
              </StyledInfoText>

              <QrcodeComponent role={user.role} />

              <StyledPtAddBtn onClick={() => setAddMember(true)}>
                수업 일수 추가
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
                <span className="count">
                  {isPending ?
                    <span className="inline-block w-20 h-20 rounded-md bg-white/10 animate-pulse" />
                    :
                      ptCount ?? '-'
                  }
                </span>
              </div>

              <QrcodeComponent role={user?.role} />

              <p className="hint-text">트레이너의 QR 코드를 스캔해주세요.</p>
            </div>
          )}
        </Suspense>
      </StyledDashboardCard>
    </StyledMainContainer>

  )
}

export default MainPage
