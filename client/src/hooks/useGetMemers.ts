import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./useAxiosInterceptor";
import { useRecoilValue } from "recoil";
import { userState } from "../state/userState";

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

const getMembers = async() => {
    try {
        const res = await axiosInstance.get<ResponseData>(`/chat/chatrooms`)
        if(res.data){
            const memebersName = res.data.chatRooms.map((room) => ({
                memberId: room.memberId,
                membersName: room.opponentName
            }))
            return memebersName
        }else{
            return []
        }
    } catch (error) {
        console.error('error getMembersHooks', error)
    }
}

const useGetMembers = () => {
    const user = useRecoilValue(userState)
    
    return useQuery({
        queryKey: ['Trainermembers', user.objectId],
        queryFn: () => getMembers(),
        
    })
}

export default useGetMembers