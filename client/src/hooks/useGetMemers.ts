import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;


const getMembers = async(userId: string) => {
    try {
        const res = await axios.get(`${apiUrl}/api/chat/chatrooms/${userId}`)
        if(res.data.chatRooms){
            const memebersName = res.data.chatRooms.map((room: any) => ({
                memberId: room.memberId,
                memebersName: room.opponentName
            }))
            return memebersName
        }else{
            return []
        }
    } catch (error) {
        console.log('error getMembersHooks', error)
    }
}

const useGetMembers = (userId: string) => {
    return useQuery({
        queryKey: ['Trainermembers', userId],
        queryFn: () => getMembers(userId)
    })
}

export default useGetMembers