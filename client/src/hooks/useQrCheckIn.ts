import { useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import toast from 'react-hot-toast'
import { axiosInstance } from "./useAxiosInterceptor";
import { userState } from '../state/userState'

interface ScanResult {
    text: string
}

export function useQrCheckIn() {
    const [user, setUser] = useRecoilState(userState)
    const [isScanning, setIsScanning] = useState(false)
    const [isCameraOpen, setIsCameraOpen] = useState(false)
    const scanLock = useRef(false)
    const requesting = useRef(false)

    const handleScan = async (trainerId: string) => {
        if (scanLock.current || !trainerId) return
        if (!user.objectId || user.role !== 'member') {
            toast.error('회원용 입니다.')
            return
        }
        scanLock.current = true
        setIsScanning(true)
        requesting.current = true
        try {
            await axiosInstance.post('/chat', { trainerId })
            const res = await axiosInstance.post<{ ptCount: number }>('/chat/pt/check-in', { trainerId })
            setUser(prev => ({
                ...prev,
                ptCount: res.data.ptCount
            }))
            setIsCameraOpen(false)
            toast.success('수업 시작')
        } catch (error) {
            console.error('QR 체크인 실패', error)
            toast.error('처리에 실패했습니다. 잠시 후 다시 시도해주세요.')
        } finally {
            setIsScanning(false)
            requesting.current = false
        }
    }
    const handleResult = (result: ScanResult | null) => {
        if (result?.text) {
            void handleScan(result.text)
        }
    }
    const handleQrError = (error: unknown) => {
        console.error('QR 카메라 오류', error)
    }
    const openCamera = () => {
        if (requesting.current) return
        scanLock.current = false
        setIsCameraOpen(true)
    }
    const closeCamera = () => {
        if (requesting.current) return
        setIsCameraOpen(false)
    }

    return { user, isScanning, isCameraOpen, handleResult, handleQrError, openCamera, closeCamera }
}