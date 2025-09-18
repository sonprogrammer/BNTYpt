import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getEachMemberNote = async (memberId: string)=> {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/records/member/${memberId}`)
    return res.data.records
}


const useGetEachMemberNote = (memberId: string | null)=> {
    return useQuery({
        queryKey: ['memberNote', memberId],
        queryFn: () => getEachMemberNote(memberId!),
        enabled: !!memberId
    })
}

export default useGetEachMemberNote