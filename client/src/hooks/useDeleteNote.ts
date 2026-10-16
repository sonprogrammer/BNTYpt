import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "./useAxiosInterceptor";
import { useRecoilValue } from "recoil";
import { userState } from "../state/userState";
import toast from "react-hot-toast";


const deleteNote = async(noteId: string) => {
    const res = await axiosInstance.delete(`/records/note/${noteId}`)
    return res.data
}

const useDeleteNote = (memberId?: string) => {
    const queryClient = useQueryClient()
    const user = useRecoilValue(userState)
    return useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['trainerMemberNotes', memberId, user.objectId] })
        },
        onError: (error) => {
          console.error("삭제 실패", error);
          toast.error('삭제 실패. 다시 시도해주세요')
        }
      })
}

export default useDeleteNote