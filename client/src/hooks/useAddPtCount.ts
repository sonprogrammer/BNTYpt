import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "./useAxiosInterceptor";


interface AddPtCountParams{
    memberId: string;
    ptCount: number;
}

interface AddPtCountRes{
    success: boolean
    message?: string
}

const addPtCount = async({memberId, ptCount}: AddPtCountParams) => {
    const res = await axiosInstance.post<AddPtCountRes>(`/chat/pt/add`, {
          memberId,
          ptCount,
        });
    return res.data
}

export function useAddPtCount() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: addPtCount,
        onSuccess: (_, variable) => {
            queryClient.invalidateQueries({queryKey: ['userPtCount', variable.memberId]})
        }
    })
}
