import { useEffect, useState } from "react"
import socket from "../socket";
import { useRecoilValue } from "recoil";
import { userState } from "../state/userState";

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
        timestamp?: string
    }[]
}


interface ReceiveMsg {
    chatRoomId: string;
    text: string;
    readBy: string[]
    createdAt?: string
    timestamp?: string
}

export function useChatRooms() {
    const { objectId: userId } = useRecoilValue(userState)
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setChatRooms([])
        if (!userId) {
            setIsLoading(false)
            return
        }

        setIsLoading(true)
        const handleConnect = () => {
            setIsLoading(true)
            socket.emit('getChatRooms')
        }

        const handleChatRoomsUpdate = (rooms: ChatRoom[]) => {
            setChatRooms(rooms)
            setIsLoading(false)
        }

        const handleRecieveMsg = (msg: ReceiveMsg) => {
            setChatRooms(prev =>
                prev.map(room => {
                    if (room._id !== msg.chatRoomId) {
                        return room
                    }
                    const isRead = msg.readBy?.includes(userId) ?? false
                    return {
                        ...room,
                        lastMessage: msg.text,
                        unRead: !isRead,
                        updatedAt: msg.timestamp ?? room.updatedAt
                    }
                })
            )
        }

        socket.on('connect', handleConnect)
        socket.on('chatRoomsUpdate', handleChatRoomsUpdate)
        socket.on('receiveMessage', handleRecieveMsg)

        if(socket.connected) handleConnect()

        return () => {
            socket.off('connect', handleConnect)
            socket.off('chatRoomsUpdate', handleChatRoomsUpdate)
            socket.off('receiveMessage', handleRecieveMsg)
        }
    }, [userId])

    return { chatRooms, isLoading }
}
