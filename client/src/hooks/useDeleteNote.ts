import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance";


const deleteNote = async(noteId: string) => {
    const res = await axiosInstance.delete(`${process.env.REACT_APP_API_URL}/api/records/note/${noteId}`)
    return res.data
}

const useDeleteNote = (memberId?: string, trainerId?: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['trainerMemberNotes', memberId, trainerId] })
        },
        onError: (error) => {
          console.error("삭제 실패", error);
        }
      })
}

export default useDeleteNote