import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance";


const apiUrl = process.env.REACT_APP_API_URL;
interface CreateNoteParams {
    title: string;
    text: string;
    images?: string[]
    uploadTime: string;
    userObjectId: string
    memberId: string
}

const postNote = async(params: CreateNoteParams) => {
    const res = await axiosInstance.post(`${apiUrl}/api/records`, params) 
    return res.data
}

export function usePostNote() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: postNote,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({queryKey:['trainerMemberNotes', variables.memberId, variables.userObjectId]})
        }
    })
}

