import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./useAxiosInterceptor";
import { useRecoilValue } from "recoil";
import { userState } from "../state/userState";


//* 트레이너 로그인시 노트 페이지
const getTrainerNotes = async (memberId: string) => {
    const res = await axiosInstance.get(`/records/trainer/${memberId}`)
    return res.data.records;
};


export const useGetTrainerMemberNote = (memberId: string | null) => {
    const user = useRecoilValue(userState)

    return useQuery({
        queryKey: ['trainerMemberNotes', memberId, user.objectId],
        queryFn: () => {
            if (!memberId) {
                throw new Error('회원을 선택해주세요.')
            }
            return getTrainerNotes(memberId)
        },
        enabled: user.role === 'trainer' && !!memberId && !!user.objectId,
        staleTime: 1_000 * 60 * 10,
        gcTime: 1_000 * 60 * 30,
    })
}

