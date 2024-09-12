import React from 'react'
import { useParams } from 'react-router-dom'

const ChatRoomPage = () => {
    const { userId } = useParams()
  return (
    <div>
        <h1>room</h1>
        <p>{userId} chatting</p>
    </div>
  )
}

export default ChatRoomPage
