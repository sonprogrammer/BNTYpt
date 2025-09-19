import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


const deleteNote = async(noteId: string) => {
    const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/records/note/${noteId}`)
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
          alert("삭제에 실패했습니다.");
        }
      })
}

export default useDeleteNote