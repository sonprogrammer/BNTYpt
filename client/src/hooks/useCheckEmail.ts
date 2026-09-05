
import axios from "axios";
import { useEffect, useState } from "react";

interface CheckEmailRes {
    exists: boolean
    success?: boolean
    message?: string
}

const apiUrl = process.env.REACT_APP_API_URL;

const checkEmail = async (email: string): Promise<CheckEmailRes> => {
    const res = await axios.get<CheckEmailRes>(`${apiUrl}/api/user/check-email?email=${email}`)
    return res.data
}

export function useCheckEmail(email: string) {
    const [isLoading, setIsLoading] = useState(false)
    const [emailChecked, setEmailChecked] = useState(false)
    const [isAvailable, setIsAvailable] = useState(false)

    useEffect(() => {
        setEmailChecked(false)
        setIsAvailable(false)

        if (!email) return

        const timer = setTimeout(async () => {
            try {
                setIsLoading(true)
                const data = await checkEmail(email)

                setEmailChecked(true)
                setIsAvailable(!data.exists)
            } catch (error) {
                console.error(error)
                setEmailChecked(false)
                setIsAvailable(false)
            } finally {
                setIsLoading(false)
            }
        }, 500)

        return () => clearTimeout(timer)

    }, [email])


    return { isLoading, emailChecked, isAvailable }
}
