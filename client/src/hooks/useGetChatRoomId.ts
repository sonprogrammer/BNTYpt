
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance";

const apiUrl = process.env.REACT_APP_API_URL;

interface ChatRoom {
    _id: string;
    memberId?: string;
    trainerId?: string;
    opponentName?: string;
}

interface ChatRoomRes{
    chatRooms: ChatRoom[]
}

const getChatRoomId = async(currentUserId:string, opponentName: string) => {
    const res = await axiosInstance.get<ChatRoomRes>(`${apiUrl}/api/chat/chatrooms/${currentUserId}`)
    const room = res.data.chatRooms.find(room => 
        (room.trainerId === currentUserId || room.memberId === currentUserId) && room.opponentName === opponentName
    )
    return room?._id ?? null
}

export function useGetChatRoomId(currentUserId?:string, opponentName?: string){
    return useQuery({
        queryKey: ['chatRoomId', currentUserId, opponentName],
        queryFn: () => getChatRoomId(currentUserId!, opponentName!),
        enabled: !!currentUserId && !!opponentName
    })
}