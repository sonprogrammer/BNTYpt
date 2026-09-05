import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance"

const apiUrl = process.env.REACT_APP_API_URL;

interface ChatRoom{
    memberId: string
    opponentName: string;
}

interface MemberByTRes{
    chatRooms: ChatRoom[]   
}

const getMemberByT = async (objectId: string) => {
    const res = await axiosInstance.get<MemberByTRes>(`${apiUrl}/api/chat/chatrooms/${objectId}`)
    return res.data
}

export function useGetMemberByT(objectId: string) {
    return useQuery({
        queryKey: ['membersByTrainer', objectId],
        queryFn: () => getMemberByT(objectId!),
        enabled: !!objectId
    })
}
