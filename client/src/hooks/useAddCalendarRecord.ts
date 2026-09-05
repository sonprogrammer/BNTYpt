import { useMutation, useQueryClient } from "@tanstack/react-query"
import { axiosInstance } from "../utils/axiosInstance"


const apiUrl = process.env.REACT_APP_API_URL;

type Records = {
    date: string;
    diet?: string;
    workout?: string;
    kakaoId?: string;
    email?: string;
    userType?: string;
}

interface AddCalendarRes { 
    post: Records
}

const addCalendar = async(formData: Records) => {
    const res = await axiosInstance.post<AddCalendarRes>(`${apiUrl}/api/calendar`, formData)
    return res.data

}

export function useAddCalendarRecord(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: addCalendar,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({queryKey:['calendar', variables.email, variables.kakaoId]})
        }
    })
}

    