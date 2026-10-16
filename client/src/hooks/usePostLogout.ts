import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "./useAxiosInterceptor";


const logoutUser = async() => {
    const res = await axiosInstance.post(`/user/logout`)
    return res.data
}

export const usePostLogout = () => {
    return useMutation({
        mutationFn: logoutUser,
    })
}