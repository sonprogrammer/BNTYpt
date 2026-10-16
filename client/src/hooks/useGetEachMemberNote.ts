import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./useAxiosInterceptor";
import { useRecoilValue } from "recoil";
import { userState } from "../state/userState";


// *멤버 로그인시 노트 페이지 
const getMemberNotes = async () => {
    const res = await axiosInstance.get(`/records/member`);
    return res.data.records;
};


export function useGetEachMemberNote(){
    const user = useRecoilValue(userState)
    return useQuery({
        queryKey: ['trainerMemberNotes', user.objectId],
        queryFn: getMemberNotes,
        enabled: user.role === 'member' && !!user.objectId
    })
}
