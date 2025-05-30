import React, { useEffect, useState } from 'react'
import { StyledContainer, StyledContent, StyledProfile, StyledNotMember } from './style'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { userState } from '../../utils/userState'
const apiUrl = process.env.REACT_APP_API_URL;



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


    const fetchChatRooms = async() => {
        try {
            const res = await axios.get(`${apiUrl}/api/chat/chatrooms/${user.objectId}`)
            const rooms = res.data.chatRooms || []
            const roomsWithLastMessage = rooms.map((room: ChatRoom) => {
                const lastMessage = room.messages && room.messages.length > 0 
                ? room.messages[room.messages.length - 1].message : null;
                return { ...room, lastMessage };
            });

            setChatRooms(roomsWithLastMessage); 
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchChatRooms()
    },[user]) //socket추가
    

    const handleNavigate = (room: ChatRoom) => {
        navigate(`/chat/${room.opponentName}`)
    }
    return (
        <>
             {chatRooms.length === 0 ? (
                <StyledNotMember>채팅 멤버가 없습니다. 😿</StyledNotMember> 
            ) : (
                chatRooms.map((room) => (
                    <StyledContainer key={room._id} onClick={() => handleNavigate(room)}>
                        <StyledProfile>
                            <img src="./logo2.png" alt="프로필사진" />
                        </StyledProfile>
                        <StyledContent>
                            <h2>{room.opponentName || '이름'}</h2> 
                            <p>{room.lastMessage || '대화내용'}</p>
                        </StyledContent>
                    </StyledContainer>
                ))
            )}

        </>
    )
}

export default ChattingBoxComponent
