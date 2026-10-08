import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance";

const apiUrl = process.env.REACT_APP_API_URL;


interface UserPtCountRes{
    success: boolean
    message?: string
    data?: number
}


const getUserPtCount = async (memberId: string)=> {
    const res = await axiosInstance.get<UserPtCountRes>(`${apiUrl}/api/chat/pt/${memberId}`)
    return res.data
}

// * user의 objectId
export function useGetUserPtCount(memberId: string, enabled = true){
    return useQuery({
        queryKey: ['userPtCount', memberId],
        queryFn: () => getUserPtCount(memberId),
        staleTime: 1000 * 60 * 30,
        gcTime: 1000 * 60 * 60,
        refetchOnWindowFocus: 'always',
        enabled: !!memberId && enabled
    })
}
