import { useEffect, useState } from "react"
import socket from "../socket";

export interface ChatRoom {
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


interface ReceiveMsg {
    ChatRoomId: string;
    text: string;
    readBy: string[]
    createdAt?: string
}

export function useChatRooms(userId?: string) {
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!userId) {
            setChatRooms([])
            setIsLoading(false)
            return
        }

        setIsLoading(true)

        const handleChatRoomsUpdate = (rooms: ChatRoom[]) => {
            setChatRooms(rooms)
            setIsLoading(false)
        }

        const handleRecieveMsg = (msg: ReceiveMsg) => {
            setChatRooms(prev =>
                prev.map(room => {
                    if (room._id !== msg.ChatRoomId) {
                        return room
                    }
                    const isRead = msg.readBy?.includes(userId) ?? false
                    return {
                        ...room,
                        lastMessage: msg.text,
                        unRead: !isRead,
                        updatedAt: msg.createdAt ?? room.updatedAt
                    }
                })
            )
        }

        socket.on('chatRoomsUpdate', handleChatRoomsUpdate)
        socket.on('receiveMessage', handleRecieveMsg)

        socket.emit('getChatRooms', userId)

        return () => {
            socket.off('chatRoomsUpdate', handleChatRoomsUpdate)
            socket.off('receiveMessage', handleRecieveMsg)
        }
    }, [userId])

    return { chatRooms, isLoading}
}
