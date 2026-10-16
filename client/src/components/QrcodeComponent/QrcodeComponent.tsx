import {lazy, Suspense } from 'react'
import { StyledContainer, StyledMemberBox, StyledTrainerBox } from './style'
import { useQrCheckIn } from '../../hooks/useQrCheckIn';

const QRCodeCanvas = lazy(() => import('qrcode.react').then(module => ({ default: module.QRCodeCanvas })))
const StyledQrReader = lazy(() => import('./style').then(module => ({ default: module.StyledQrReader })))
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
                    <StyledMemberBox className='camera'>
                        {isCameraOpen ?
                            <div>
                                <StyledQrReader
                                    onScan={handleResult}
                                    delay={500}
                                    onError={handleQrError}
                                    constraints={videoConstraints}
                                />
                                <p role="status" className="mt-4 text-center text-sm text-gray-400">
                                    {isScanning ? '수업 정보를 처리하고 있어요...' : '트레이너의 QR코드를 스캔해주세요.'}
                                </p>
                                <button
                                    type="button"
                                    onClick={closeCamera}
                                    disabled={isScanning}
                                    className="mx-auto my-7 block text-sm text-gray-400 transition hover:text-red-500 disabled:opacity-50"
                                >
                                    카메라 닫기
                                </button>
                            </div>
                            :
                            <button
                                type='button'
                                onClick={openCamera}
                                className='font-bold text-xl hover:cursor-pointer hover:text-red-900'
                            >
                                QR코드 스캔하기
                            </button>
                        }
                    </StyledMemberBox>
                ) : null}
            </Suspense>
        </StyledContainer>
    )
}


export default QrcodeComponent


