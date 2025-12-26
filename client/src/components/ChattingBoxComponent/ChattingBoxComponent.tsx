import { useEffect, useState } from 'react'
import { StyledContainer, StyledContent, StyledProfile, StyledNotMember, LastMsgWrapper, UnreadBadge } from './style'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { userState } from '../../utils/userState'
import socket from '../../socket'
import { BeatLoader } from 'react-spinners'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments } from '@fortawesome/free-solid-svg-icons'




interface ChatRoom {
    [key: string]: any;
    _id: string; 
    memberId?: string; 
    trainerId?: string; 
    memberName?: string; 
    trainerName?: string; 
    opponentName?: string;
    lastMessage?: string; 
    messages?: {
        message: string;
        createdAt: string;
        senderId: string;
        readBy: string[];
    }[]
}

const ChattingBoxComponent = () => {
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const navigate = useNavigate()
    const [user] = useRecoilState(userState)

    useEffect(() => {
        if(!socket || !user?.objectId) return
        setLoading(true)
        socket.emit('getChatRooms', user.objectId)

        socket.on('chatRoomsUpdate', (rooms: ChatRoom[]) => {
            setChatRooms(rooms)
            setLoading(false)
        })

        socket.on('receiveMessage', (message: any) => {
            setChatRooms(prev => prev.map(room => {
                if(room._id === message.chatRoomId){
                    const read = message.readBy.includes(user.objectId)
                    return{
                        ...room,
                        lastMessage: message.text,
                        unRead: !read
                    }
                }
                return room
            }))
        })
    
        return () => {
            socket.off('receiveMessage')
            socket.off('chatRoomsUpdate')
        }


    }, [user])
  

    const orderedChatRooms = [...chatRooms].sort((a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )
    

   

    if (loading) return (
        <div className='flex flex-col justify-center items-center h-[300px] gap-4'>
            <BeatLoader color="#ef4444" size={10} />
            <p className="text-gray-500 text-sm">대화 목록을 가져오는 중...</p>
        </div>
    )
    return (
        <>
        {orderedChatRooms.length === 0 ? (
            <StyledNotMember>
                <FontAwesomeIcon icon={faComments} size="2x" className="mb-4 opacity-20" />
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
                    <div className="arrow-icon">〉</div>
                </StyledContainer>
            ))
        )}
    </>
    )
}

export default ChattingBoxComponent
