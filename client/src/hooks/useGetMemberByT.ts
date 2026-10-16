import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./useAxiosInterceptor";
import { useRecoilValue } from "recoil";
import { userState } from "../state/userState";

interface ChatRoom{
    memberId: string
    opponentName: string;
}

interface MemberByTRes{
    chatRooms: ChatRoom[]   
}

const getMemberByT = async () => {
    const res = await axiosInstance.get<MemberByTRes>(`/chat/chatrooms`)
    return res.data
}

export function useGetMemberByT() {
    const user = useRecoilValue(userState)
    return useQuery({
        queryKey: ['membersByTrainer', user.objectId],
        queryFn: () => getMemberByT(),
        staleTime: 1_000 * 60 * 10,
        gcTime: 1_000 * 60 * 30,
        enabled: !!user.objectId
    })
}
