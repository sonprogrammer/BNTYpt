import { useQueryClient, useMutation } from "@tanstack/react-query";

import { axiosInstance } from "../utils/axiosInstance";

const deletePhoto = async(photoId: string) => {
    const res = await axiosInstance.delete(`${process.env.REACT_APP_API_URL}/api/posts/delete/${photoId}`)
    return res.data
}


const useDeletePhoto = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deletePhoto,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['userPhotos']})
        },
        onError: (error) => {
            console.log('삭제 실패', error)
        }
    })
}

export default useDeletePhoto