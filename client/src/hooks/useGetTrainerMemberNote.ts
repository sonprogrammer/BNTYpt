import { useQuery } from "@tanstack/react-query";
import { getMemberNotes } from "../api/noteApi";



//* 트레이너 로그인시 노트 페이지


const useGetTrainerMemberNote = (memberId: string | null, trainerId: string) => {
    return useQuery({
        queryKey: ['trainerMemberNotes', memberId, trainerId],
        queryFn: () => getMemberNotes(memberId!, trainerId),
        enabled: !!memberId && !!trainerId,
        staleTime: 1_000 * 60 * 10,
        gcTime: 1_000 * 60 * 30,
    })
}

export default useGetTrainerMemberNote