import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "./useAxiosInterceptor";
import { useRecoilValue } from "recoil";
import { userState } from "../state/userState";

interface CreateNotePayload {
    title: string;
    text: string;
    images?: string[]
    uploadTime: string;
    memberId: string
}

const postNote = async(payload: CreateNotePayload) => {
    const res = await axiosInstance.post(`/records`, payload) 
    return res.data
}

export function usePostNote() {
    const queryClient = useQueryClient()
    const user = useRecoilValue(userState)

    return useMutation({
        mutationFn: postNote,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({queryKey:['trainerMemberNotes', variables.memberId, user.objectId]})
        }
    })
}

