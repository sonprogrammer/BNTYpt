import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useRecoilValue } from "recoil";
import { userState } from "../state/userState";
import { axiosInstance } from "./useAxiosInterceptor";




type Records = {
    date: string;
    diet?: string;
    workout?: string;
}

interface AddCalendarRes { 
    post: Records
}

const addCalendar = async(formData: Records) => {
    const res = await axiosInstance.post<AddCalendarRes>(`/calendar`, formData)
    return res.data

}

export function useAddCalendarRecord(){
    const queryClient = useQueryClient()
    const user = useRecoilValue(userState)

    return useMutation({
        mutationFn: addCalendar,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({queryKey:['calendar', user.objectId]})
        }
    })
}

    