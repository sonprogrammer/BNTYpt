import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance";

const apiUrl = process.env.REACT_APP_API_URL;

interface AddPtCountParams{
    memberId: string;
    ptCount: number;
}

interface AddPtCountRes{
    success: boolean
    message?: string
}

const addPtCount = async({memberId, ptCount}: AddPtCountParams) => {
    const res = await axiosInstance.post<AddPtCountRes>(`${apiUrl}/api/chat/pt`, {
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
