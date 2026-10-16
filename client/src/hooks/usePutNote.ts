import { useQueryClient, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "./useAxiosInterceptor";
import { useRecoilValue } from "recoil";
import { userState } from "../state/userState";
import toast from "react-hot-toast";


const putNote = async ({ noteId, title, text }: { noteId: string; title: string; text: string }) => {
    const res = await axiosInstance.put(`/records/note/${noteId}`,
        {title, text}
    )
    return res.data
}

const usePutNote = (memberId: string) => {
    const queryClient = useQueryClient()
    const user = useRecoilValue(userState)
    return useMutation({
        mutationFn: putNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['trainerMemberNotes', memberId, user.objectId] })
        },
        onError: (error) => {
            console.error('수정 실패', error)
            toast.error('수정실패. 다시 시도해주세요')
        }
    })
}

export default usePutNote