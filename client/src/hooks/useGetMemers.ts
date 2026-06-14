import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance";
const apiUrl = process.env.REACT_APP_API_URL;

interface ChatMessage {
  _id: string;
  sender: string;
  type: "text" | "image" | string;
  message: string;
  data: any | null;     
  readBy: string[];                 
  timestamp: string;               
}

interface ChatRoomItem {
  _id: string;
  trainerId: string;
  trainerName: string;
  memberId: string;
  memberName: string;
  opponentName: string;            
  messages: ChatMessage[];        
  createdAt: string;
  updatedAt: string;
  __v: number;
}
interface ResponseData{
    chatRooms: ChatRoomItem[];
    success: boolean;
    userName: string;
}

const getMembers = async(userId: string) => {
    try {
        const res = await axiosInstance.get<ResponseData>(`${apiUrl}/api/chat/chatrooms/${userId}`)
        if(res.data){
            const memebersName = res.data.chatRooms.map((room) => ({
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