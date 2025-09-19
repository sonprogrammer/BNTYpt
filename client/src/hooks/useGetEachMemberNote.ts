import { useQuery } from "@tanstack/react-query";
import { getMemberNotes } from "../api/noteApi";

// *멤버 로그인시 노트 페이지 

const useGetEachMemberNote = (memberId: string | null)=> {
    return useQuery({
        queryKey: ['memberNote', memberId],
        queryFn: () => getMemberNotes(memberId!),
        enabled: !!memberId
    })
}

export default useGetEachMemberNote