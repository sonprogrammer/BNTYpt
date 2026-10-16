import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "./useAxiosInterceptor";
import { userState } from "../state/userState";
import { useRecoilValue } from "recoil";

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


const getCalendarRecords = async( ) => {
    const res = await axiosInstance.get<CalendaRes>('/calendar/user')
    return res.data

}

export function useGetCalendarRecords() {
    const user = useRecoilValue(userState)
    return useQuery({
        queryKey: ['calendar', user.objectId],
        queryFn: () => getCalendarRecords(),
        staleTime: 1_000 * 60 * 10,
        gcTime: 1_000 * 60 * 30,
    })
}

