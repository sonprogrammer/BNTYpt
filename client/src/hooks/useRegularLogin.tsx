import axios from "axios";
import toast from "react-hot-toast";
import { useSetRecoilState } from "recoil";
import { userState } from "../utils/userState";
import { useNavigate } from "react-router-dom";
import { saveUserToLocalStorage } from "../utils/localStorage";
import { saveAccessToken } from "../utils/accessToken";
import { useMutation } from "@tanstack/react-query";


const apiUrl = process.env.REACT_APP_API_URL;

interface RegularLoginParams{
    email: string;
    password: string;
    role: string
}

interface RegularLoginResponse {
  success: boolean;
  message?: string;
  user: {
    email: string;
    name: string;
    role: string;
    objectId: string;
    ptCount: number;
    token: string;
  };
}

const regularLogin = async ({email,password,role}:RegularLoginParams) => {
    const res = await axios.post<RegularLoginResponse>(`${apiUrl}/api/user/login/regular`, {
        email, password, role
    },{withCredentials: true})
    return res.data
}


export const useRegularLogin = () => {
    const setUser = useSetRecoilState(userState);
    const navigate = useNavigate();

    return useMutation({
        mutationFn: regularLogin,
        onSuccess: (data) =>{
            if(!data.success){
                toast.error(data.message ?? '로그인에 실패했습니다')
                return 
            }
            const newUser = {
                email: data.user.email,
                name: data.user.name,
                role: data.user.role,
                objectId: data.user.objectId,
                ptCount: data.user.ptCount,
            }

            setUser(newUser)
            saveAccessToken(data.user.token)
            saveUserToLocalStorage(newUser)
            navigate('/browse')
        },
        onError: (error) => {
            console.error('login failed', error)
            toast.error('로그인 실패')
        }
    })
}