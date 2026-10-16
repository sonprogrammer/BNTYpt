
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./useAxiosInterceptor";
import { useRecoilValue } from "recoil";
import { userState } from "../state/userState";


interface ChatRoom {
    _id: string;
    memberId?: string;
    trainerId?: string;
    opponentName?: string;
}

interface ChatRoomRes{
    chatRooms: ChatRoom[]
}

const getChatRoomId = async(opponentName: string) => {
    const res = await axiosInstance.get<ChatRoomRes>(`/chat/chatrooms`)
    const room = res.data.chatRooms.find(room => room.opponentName === opponentName)
    return room?._id ?? null
}

export function useGetChatRoomId( opponentName?: string){
    const user = useRecoilValue(userState)
    return useQuery({
        queryKey: ['chatRoomId', user.objectId, opponentName],
        queryFn: () => getChatRoomId(opponentName!),
        enabled:!!opponentName && !!user.objectId
    })
}