import React, { useEffect, useState } from 'react'
import { StyledContainer, StyledContent, StyledProfile } from './style'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { userState } from '../../utils/userState'


interface ChatRoom {
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
    }[]
}

const ChattingBoxComponent = () => {
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])
    const navigate = useNavigate()
    const [user] = useRecoilState(userState)
    console.log('user', user)

    const fetchChatRooms = async(userId: string) => {
        try {
            const res = await axios.get(`http://localhost:4000/api/chat/chatrooms/${user.objectId}`)
            setChatRooms(res.data.chatRooms)
            console.log('chatrooms', chatRooms)
            const roomsWithLastMessage = res.data.chatRooms.map((room: ChatRoom) => {
                const lastMessage = room.messages && room.messages.length > 0 
                ? room.messages[room.messages.length - 1].message : null;
                console.log('lastMessage', lastMessage)
                return { ...room, lastMessage };
            });

            setChatRooms(roomsWithLastMessage); 
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        const userId = user.email || user.kakaoId
        fetchChatRooms(userId)
    },[user])
    

    const handleNavigate = (room: ChatRoom) => {
        navigate(`/chat/${room.opponentName}`)
    }
    return (
        <>
            {chatRooms.map((room) => (
                <StyledContainer key={room._id} onClick={() => handleNavigate(room)}>
                    <StyledProfile>
                        <img src="./logo2.png" alt="프로필사진" />
                    </StyledProfile>
                    <StyledContent>
                        <h2>{room.opponentName || '이름'}</h2> 
                        <p>{room.lastMessage || '대화내용'}</p>
                    </StyledContent>
                </StyledContainer>
            ))}

        </>
    )
}

export default ChattingBoxComponent
