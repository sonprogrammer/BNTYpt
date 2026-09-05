import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance";

const apiUrl = process.env.REACT_APP_API_URL;

export interface ChatMsg {
    text: string
    sender: string
    isMine: boolean
    type: 'text' | 'media'
    data?: string;
    readBy: string[]
}

interface MsgData{
    message: string;
    sender: string;
    type?:'text' | 'media'
    data?: string;
    readBy?: string[]
}

interface MsgRes{
    success: boolean
    message: MsgData[]
}

const getChatMsgs = async(chatRoomId: string, currentUserId: string): Promise<ChatMsg[]> =>{
    const res = await axiosInstance.get<MsgRes>(`${apiUrl}/api/chat/messages/${chatRoomId}`)

    if(!res.data.success){
        return []
    }

    return res.data.message.map(msg => ({
        text: msg.message,
        sender: msg.sender,
        isMine: msg.sender === currentUserId,
        type: msg.type ?? 'text',
        data: msg.data,
        readBy: msg.readBy ?? []
    }))
}

export function useGetChatMsgs(chatRoomId?: string, currentUserId?: string) {
    return useQuery({
        queryKey: ['chatMessages', chatRoomId],
        queryFn: () => getChatMsgs(chatRoomId!, currentUserId!),
        enabled: !!chatRoomId && !!currentUserId
    })
}