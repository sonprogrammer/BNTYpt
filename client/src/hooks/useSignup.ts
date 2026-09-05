import axios from "axios"
import toast from "react-hot-toast";

const apiUrl = process.env.REACT_APP_API_URL;

interface SignupParams {
    email: string
    name: string;
    password: string;
    role: string;
}

interface SignupRes {
    success: boolean;
    message?: string
}

const signupApi = async ({ email, name, password, role }: SignupParams) => {
    const res = await axios.post<SignupRes>(`${apiUrl}/api/user/signup`, {
        email,
        name,
        password,
        role
    })

    return res.data
}

export function useSignup() {

    const handleSignup = async (params: SignupParams) => {
        try {
            const data = await signupApi(params)
            if (data.success) {
                toast.success('가입을 축하합니다! 로그인해주세요.')
                window.location.reload()
            } 
        } catch (error) {
            console.error(error)
            if (axios.isAxiosError(error)) {
                toast.error(
                    error.response?.data?.message ?? '가입 중 오류가 발생했습니다.'
                );
            } else {
                toast.error('가입 중 오류가 발생했습니다.');
            }

        }
    }
    return { signup: handleSignup }
}
