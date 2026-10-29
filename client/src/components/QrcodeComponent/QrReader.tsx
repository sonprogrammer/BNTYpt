import { Suspense } from "react";
import { StyledQrReader } from "./style";
import type { ComponentProps } from 'react'

type QrReaderProps = ComponentProps<typeof StyledQrReader>

interface QrScannerModalProps {
  closeCamera: () => void
  isScanning: boolean
  handleResult: QrReaderProps['onScan']
  handleQrError: QrReaderProps['onError']
  videoConstraints: QrReaderProps['constraints']
}


export function QrReader({closeCamera, isScanning, handleQrError, handleResult, videoConstraints}: QrScannerModalProps) {
    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="qr-scanner-title"
            className="fixed inset-0 z-[9999] flex h-[100dvh] flex-col overflow-hidden bg-gray-950 text-white"
        >
            <header className="flex shrink-0 items-center justify-between px-5 pb-4 pt-[max(20px,env(safe-area-inset-top))]">
                <h2 id="qr-scanner-title" className="text-base font-semibold">
                    QR 체크인
                </h2>
                <button
                    type="button"
                    onClick={closeCamera}
                    disabled={isScanning}
                    autoFocus
                    aria-label="카메라 닫기"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 disabled:opacity-40"
                >
                    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="m6 6 12 12M18 6 6 18" />
                    </svg>
                </button>
            </header>

            <div className="relative min-h-0 flex-1 overflow-hidden bg-black">
                <div className="absolute inset-0 [&>div]:!h-full [&>div]:!w-full [&_video]:!h-full [&_video]:!w-full [&_video]:!object-cover">
                    <Suspense fallback={
                        <div className="flex h-full items-center justify-center text-sm text-gray-400">
                            카메라 준비 중...
                        </div>
                    }>
                        <StyledQrReader
                            onScan={handleResult}
                            delay={500}
                            onError={handleQrError}
                            constraints={videoConstraints}
                        />
                    </Suspense>
                </div>

                <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="relative aspect-square w-[70%] max-w-[300px] rounded-3xl shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]">
                        <span className="absolute left-0 top-0 h-10 w-10 rounded-tl-3xl border-l-4 border-t-4 border-blue-400" />
                        <span className="absolute right-0 top-0 h-10 w-10 rounded-tr-3xl border-r-4 border-t-4 border-blue-400" />
                        <span className="absolute bottom-0 left-0 h-10 w-10 rounded-bl-3xl border-b-4 border-l-4 border-blue-400" />
                        <span className="absolute bottom-0 right-0 h-10 w-10 rounded-br-3xl border-b-4 border-r-4 border-blue-400" />
                    </div>
                </div>

                {isScanning && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-white/20 border-t-blue-400 motion-reduce:animate-none" />
                    </div>
                )}
            </div>

            <footer className="shrink-0 px-6 pt-6 pb-[max(28px,env(safe-area-inset-bottom))] text-center">
                <p role="status" className="text-base font-semibold">
                    {isScanning ? '수업 정보를 처리하고 있어요' : '트레이너의 QR 코드를 맞춰주세요'}
                </p>
                <p className="mt-2 text-sm leading-6 text-gray-400">
                    처음 스캔하면 트레이너와 연결되고,
                    <br />
                    이미 연결된 트레이너라면 PT 1회가 차감돼요.
                </p>
            </footer>
        </div>
    )
}