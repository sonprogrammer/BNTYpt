import React, { useEffect, useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { QrReader, OnResultFunction } from 'react-qr-reader'
import { StyledContainer, StyledMemberBox, StyledQrReader, StyledTrainerBox } from './style'

// usestate훅으로 만약 로그인한 사람이 회원이면 출석체크하기 버튼이 나와서 카메라가 활성화되는 버튼이
// 나오고 트레이너면 qr코드가 떠있는다

interface QrcodeComponentProps {
    role: string;
}

const QrcodeComponent = ({ role } : QrcodeComponentProps) => {
    // const [role, setRole] = useState<string>('trainer')
    const [scannedData, setScannedData] = useState<string>('');
    const [memberClicked, setMemberClicked] = useState<boolean>(false)


    const handleScan = (data: string) => {
        if (data) {
            setScannedData(data);
            console.log('QR Code Scanned:', data);
        }
    };

    const handleError = (err: Error | null) => {
        console.error('QR Scan Error:', err);
    };

    const handleResult: OnResultFunction = (result: any, error: any) => {
        if (result) {
            const text = result.getText();
            handleScan(text);
        }
        if (error) {
            handleError(error);
        }
    };


    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        setMemberClicked(!memberClicked)
    }

    return (
        <StyledContainer>
            
            {role === 'trainer' ? (
                <StyledTrainerBox>
                    <QRCodeCanvas value="https://example.com/attendance" />
                </StyledTrainerBox>
            ) : (
                <StyledMemberBox>
                    {memberClicked ?
                        <div className='w-[100%]'>
                            <StyledQrReader
                                constraints={{ facingMode: 'user' }}
                                onResult={handleResult}
                            />
                            <div className='mb-7 text-center hover:font-bold hover:text-red-500 hover:cursor-pointer' onClick={handleClick}>go back</div>
                        </div>
                        :
                        <div 
                            onClick={handleClick}
                            className='font-bold text-xl hover:cursor-pointer hover:text-red-900'
                            >
                        scan Qr code
                        </div>
                    }

                    {scannedData && <p>스캔된 데이터: {scannedData}</p>}
                </StyledMemberBox>
            )}
        </StyledContainer>
    )
}

export default QrcodeComponent
