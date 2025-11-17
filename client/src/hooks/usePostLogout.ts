import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance";


const logoutUser = async() => {
    const res = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/user/logout`)
    return res.data
}

export const usePostLogout = () => {
    return useMutation({
        mutationFn: logoutUser,
    })
}