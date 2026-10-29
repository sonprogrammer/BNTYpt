import { lazy, Suspense, useEffect } from 'react'
import { StyledContainer, StyledTrainerBox } from './style'
import { useQrCheckIn } from '../../hooks/useQrCheckIn';
import { QrReader } from './QrReader';
import { createPortal } from 'react-dom';

const QRCodeCanvas = lazy(() => import('qrcode.react').then(module => ({ default: module.QRCodeCanvas })))
// const StyledQrReader = lazy(() => import('./style').then(module => ({ default: module.StyledQrReader })))
interface QrcodeComponentProps {
    role: string | null;
}

const videoConstraints = {
    audio: false,
    video: {
        facingMode: 'environment'
    }
}


const QrcodeComponent = ({ role }: QrcodeComponentProps) => {
    const { user, isScanning, isCameraOpen, handleResult, handleQrError, openCamera, closeCamera } = useQrCheckIn()

    useEffect(() => {
        if (!isCameraOpen) return
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && !isScanning) closeCamera()
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.body.style.overflow = previousOverflow
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isCameraOpen, isScanning, closeCamera])


    return (
        <StyledContainer className='hi'>
            <Suspense fallback={<div className="py-4 text-center text-sm text-gray-400">QR 모듈 로딩 중...</div>}>
                {role === 'trainer' ? (
                    <StyledTrainerBox>
                        {user.role === 'trainer' && user.objectId ? (
                            <QRCodeCanvas value={user.objectId} />
                        ) : (
                            <p className="text-sm text-gray-400">로그인 정보를 확인해주세요.</p>
                        )}

                    </StyledTrainerBox>
                ) : role === 'member' ? (
                    <button
                        type="button"
                        onClick={openCamera}
                        className="flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-500"
                    >
                        QR 코드 스캔
                    </button>
                ) : null}

                {role === 'member' && isCameraOpen && createPortal(
                    <QrReader
                        closeCamera={closeCamera}
                        isScanning={isScanning}
                        handleResult={handleResult}
                        handleQrError={handleQrError}
                        videoConstraints={videoConstraints}
                    />,
                    document.body
                )}
            </Suspense>
        </StyledContainer>
    )
}


export default QrcodeComponent


