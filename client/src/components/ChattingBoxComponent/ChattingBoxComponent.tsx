import React, { useEffect, useState } from 'react'
import { StyledContainer, StyledContent, StyledProfile } from './style'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { userState } from '../../utils/userState'

const ChattingBoxComponent = () => {
    const [chatRooms, setChatRooms] = useState([])
    const navigate = useNavigate()
    const [user] = useRecoilState(userState)

    const fetchChatRooms = async(userId: string) => {
        try {
            const res = await axios.get(`http://localhost/api/chatrooms/${userId}`)
            setChatRooms(res.data.chatRooms)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const userId = user.email || user.kakaoId
        fetchChatRooms(userId)
    },[user])
    
    
    const handleNavigate = (userId: number | string) => {
        navigate(`/chat/${userId}`)
    }
    return (
        <>
            {chatRooms.map((room) => (
                <StyledContainer key={room._id} onClick={() => handleNavigate(room.memberId || room.trainerId)}>
                    <StyledProfile>
                        <img src="./logo2.png" alt="프로필사진" />
                    </StyledProfile>
                    <StyledContent>
                        <h2>{room.memberName || '이름'}</h2> {/* 이름 필드 수정 필요 */}
                        <p>{room.lastMessage || '대화내용'}</p> {/* 마지막 메시지 필드 수정 필요 */}
                    </StyledContent>
                </StyledContainer>
            ))}

        </>
    )
}

export default ChattingBoxComponent
