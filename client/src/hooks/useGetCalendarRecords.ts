import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../utils/axiosInstance";

interface CalendarsData{
    _id: string;
    diet: string;
    workout: string
    date: string
    userId: string
}

interface CalendaRes{
    message?: string
    success: boolean;
    calendars: CalendarsData[]
}

const apiUrl = process.env.REACT_APP_API_URL;

const getCalendarRecords = async(email?: string, kakaoId?: string) => {
    let url= ''
    if(email){
        url = `${apiUrl}/api/calendar/user/email/${email}`
    } else if(kakaoId){
        url = `${apiUrl}/api/calendar/user/kakao/${kakaoId}`
    }
    
    const res = await axiosInstance.get<CalendaRes>(url)
    return res.data

}

export function useGetCalendarRecords(email?: string, kakaoId?: string) {
    return useQuery({
        queryKey: ['calendar', email, kakaoId],
        queryFn: () => getCalendarRecords(email, kakaoId),
        enabled: !!email || !!kakaoId
    })
}

