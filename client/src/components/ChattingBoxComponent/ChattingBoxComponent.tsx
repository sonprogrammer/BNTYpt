import { useEffect, useState } from 'react'
import { StyledContainer, StyledContent, StyledProfile, StyledNotMember } from './style'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { userState } from '../../utils/userState'
import loadingBar from '../../assets/loading.gif';
import socket from '../../socket'




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
            console.log('me', message)
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
    

    const handleNavigate = (room: ChatRoom) => {
        navigate(`/chat/${room.opponentName}`)
    }
    return (
        <>
        {loading && <>
            <div className='flex justify-center items-center h-full'>
                <img src={loadingBar} alt="로딩이미지" className='w-20'/>
            </div>
        </>}
             {orderedChatRooms.length === 0 ? (
                <StyledNotMember>채팅 멤버가 없습니다. 😿</StyledNotMember> 
            ) : (
                orderedChatRooms.map((room) => (
                    <StyledContainer className='hi' key={room._id} onClick={() => handleNavigate(room)}>
                        <StyledProfile>
                            <img src="./logo2.png" alt="프로필사진" />
                        </StyledProfile>
                        <StyledContent>
                            <h2>{room.opponentName || '이름'}</h2> 
                            <p>{room.lastMessage || '대화내용'}</p>
                            {room.unRead && 
                            <span className='text-red-500 text-sm'>
                                unRead
                            </span>}

                        </StyledContent>
                    </StyledContainer>
                ))
            )}

        </>
    )
}

export default ChattingBoxComponent
