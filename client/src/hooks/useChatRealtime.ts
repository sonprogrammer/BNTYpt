
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import socket from "../socket";
import type { ChatMsg } from "./useGetChatMsgs";
import { userState } from "../state/userState";
import { useRecoilValue } from "recoil";

interface ReceiveMsg {
    chatRoomId: string
    text?: string
    message?: string
    sender: string
    type?: "text" | "media"
    data?: string
    readBy?: string[]
}

interface ReadEvent {
  chatRoomId: string
  userId: string
}

export function useChatRealtime(chatRoomId: string | undefined) {
    const { objectId: currentUserId } = useRecoilValue(userState)
    const queryClient = useQueryClient()

    useEffect(() => {
        if (!chatRoomId || !currentUserId) return
        const queryKey = ['chatMessages', chatRoomId, currentUserId]

        const handleConnect = () => {
            socket.emit('joinRoom', chatRoomId)
            socket.emit('read', { chatRoomId })
            void queryClient.invalidateQueries({ queryKey })
        }

        const handleReceiveMsg = (msg: ReceiveMsg) => {
            if (msg.chatRoomId !== chatRoomId || msg.sender === currentUserId) return

            const newMsg: ChatMsg = {
                text: msg.text ?? msg.message ?? '',
                sender: msg.sender,
                isMine: false,
                type: msg.type ?? 'text',
                data: msg.data,
                readBy: msg.readBy ?? []
            }

            queryClient.setQueryData<ChatMsg[]>(
                queryKey, prev => prev ? [...prev, newMsg] : undefined
            )
            socket.emit('read', { chatRoomId })
        }

        const handleRead = ({ chatRoomId: roomId, userId: readId }: ReadEvent) => {
            if (roomId !== chatRoomId) return

            queryClient.setQueryData<ChatMsg[]>(
                queryKey, prev => prev?.map(msg => ({ ...msg, readBy: msg.readBy.includes(readId) ? msg.readBy : [...msg.readBy, readId] }))
            )
        }

        socket.on('connect', handleConnect)
        socket.on('receiveMessage', handleReceiveMsg)
        socket.on('read', handleRead)

        if (socket.connected) handleConnect()

        return () => {
            socket.off('connect', handleConnect)
            socket.off('receiveMessage', handleReceiveMsg)
            socket.off('read', handleRead)
            if (socket.connected) socket.emit('leaveRoom', chatRoomId)
        }
    }, [chatRoomId, currentUserId, queryClient])
}


