import { useMemo} from 'react'
import { StyledContainer, StyledContent, StyledProfile, StyledNotMember, LastMsgWrapper, UnreadBadge } from './style'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { userState } from '../../utils/userState'
import { BeatLoader } from 'react-spinners'
import { MessageSquareText, ChevronRight } from 'lucide-react'
import { useChatRooms } from '../../hooks/useChatRooms'


const ChattingBoxComponent = () => {
    const navigate = useNavigate()
    const user = useRecoilValue(userState)

    const { chatRooms, isLoading } = useChatRooms(user?.objectId)


    const orderedChatRooms = useMemo(() => {
        return[...chatRooms].sort((a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )},[chatRooms])




    if (isLoading) return (
        <div className='flex flex-col justify-center items-center h-[300px] gap-4'>
            <BeatLoader color="#ef4444" size={10} />
            <p className="text-gray-500 text-sm">대화 목록을 가져오는 중...</p>
        </div>
    )
    return (
        <>
            {orderedChatRooms.length === 0 ? (
                <StyledNotMember>
                    <MessageSquareText size={48} className="mb-4 opacity-20" />
                    <p>연결된 대화 상대가 없습니다.</p>
                </StyledNotMember>
            ) : (
                orderedChatRooms.map((room) => (
                    <StyledContainer key={room._id} onClick={() => navigate(`/chat/${room.opponentName}`)}>
                        <StyledProfile>
                            <img src="/logo2.png" alt="프로필" />
                        </StyledProfile>
                        <StyledContent>
                            <div className="top-row">
                                <h2>{room.opponentName || '이름 없음'}</h2>
                                {room.unRead && <UnreadBadge>NEW</UnreadBadge>}
                            </div>
                            <LastMsgWrapper>
                                <p className="msg-text">{room.lastMessage || '새로운 대화가 없습니다.'}</p>
                            </LastMsgWrapper>
                        </StyledContent>
                        <div className="arrow-icon">
                            <ChevronRight size={20} />
                        </div>
                    </StyledContainer>
                ))
            )}
        </>
    )
}

export default ChattingBoxComponent
