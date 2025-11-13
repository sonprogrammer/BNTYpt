import { useQueryClient, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance";


const putNote = async ({ noteId, title, text }: { noteId: string; title: string; text: string }) => {
    const res = await axiosInstance.put(`${process.env.REACT_APP_API_URL}/api/records/note/${noteId}`,
        {title, text}
    )
    return res.data
}

const usePutNote = (memberId: string, trainerId: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: putNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['trainerMemberNotes', memberId, trainerId] })
        },
        onError: (error) => {
            console.error('수정 실패', error)
            alert('수정 실패했습니다.')
        }
    })
}

export default usePutNote