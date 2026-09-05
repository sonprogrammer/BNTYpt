
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import socket from "../socket";
import type { ChatMsg } from "./useGetChatMsgs";

interface ReceiveMsg {
    text?: string;
    message?: string;
    sender: string;
    type?: "text" | "media";
    data?: string;
    readBy?: string[];
}

export function useChatRealtime(chatRoomId?:string, currentUserId?: string){
    const queryClient = useQueryClient()
    
    useEffect(() => {
        if(!chatRoomId || !currentUserId)return

        socket.emit('joinRoom', chatRoomId)
        socket.emit('read', { chatRoomId, userId: currentUserId})

        const handleRecieveMsg = (msg: ReceiveMsg) => {
            if(msg.sender === currentUserId)return

            const newMsg: ChatMsg = {
                text: msg.text ??msg.message ?? '',
                sender: msg.sender,
                isMine: false,
                type: msg.type ?? 'text',
                data: msg.data,
                readBy: msg.readBy ?? []
            }

            queryClient.setQueryData<ChatMsg[]>(
                ['chatMessages', chatRoomId], (prev =[]) => [...prev, newMsg]
            )
            socket.emit('read', {chatRoomId, userId: currentUserId})
        }

        const handleRead = ({chatRoomId: roomId, userId: readId}:{chatRoomId: string, userId: string})=>{
            if(roomId !== chatRoomId)return

            queryClient.setQueryData<ChatMsg[]>(
                ['chatMessages', chatRoomId], (prev =[]) => prev.map(msg => ({
                    ...msg,
                    readBy: msg.readBy.includes(readId) ? msg.readBy : [...msg.readBy, readId]
                }))
            )
        }

        socket.on('receiveMessage', handleRecieveMsg)
        socket.on('read', handleRead)

        return () => {
            socket.off('receiveMessage', handleRecieveMsg)
            socket.off('read', handleRead)
        }
    },[chatRoomId, currentUserId, queryClient])
}


