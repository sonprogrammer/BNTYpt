import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./useAxiosInterceptor";
import { useRecoilValue } from "recoil";
import { userState } from "../state/userState";

export interface ChatMsg {
    text: string
    sender: string
    isMine: boolean
    type: 'text' | 'media'
    data?: string;
    readBy: string[]
}

//TODO 웹소켓도 확인해야함
interface MsgData{
    message: string;
    sender: string;
    isMine: boolean
    type?:'text' | 'media'
    data?: string;
    readBy?: string[]
}

interface MsgRes{
    success: boolean
    messages: MsgData[]
}

const getChatMsgs = async(chatRoomId: string): Promise<ChatMsg[]> =>{
    const res = await axiosInstance.get<MsgRes>(`/chat/messages/${chatRoomId}`)

    return res.data.messages.map(msg => ({
    text: msg.message,
    sender: msg.sender,
    isMine: msg.isMine,
    type: msg.type ?? 'text',
    data: msg.data,
    readBy: msg.readBy ?? []
  }))
}

export function useGetChatMsgs(chatRoomId?: string | null) {
    const user = useRecoilValue(userState)
    return useQuery({
        queryKey: ['chatMessages', chatRoomId, user.objectId],
        queryFn: () => {
            if(!chatRoomId || !user.objectId){
                throw new Error('메시지 조회 불가')
            }
            return getChatMsgs(chatRoomId)
        },
        enabled: !!chatRoomId && !!user.objectId
    })
}