import React, { useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { OnResultFunction } from 'react-qr-reader'
import { StyledContainer, StyledMemberBox, StyledQrReader, StyledTrainerBox } from './style'
import { useRecoilState } from 'recoil';
import { userState } from '../../utils/userState';
import axios from 'axios';
import QRCode from "react-qr-code";


// usestate훅으로 만약 로그인한 사람이 회원이면 출석체크하기 버튼이 나와서 카메라가 활성화되는 버튼이
// 나오고 트레이너면 qr코드가 떠있는다

interface QrcodeComponentProps {
    role: string;
}


const QrcodeComponent = ({ role } : QrcodeComponentProps) => {
    const [scannedData, setScannedData] = useState<string>('');
    const [memberClicked, setMemberClicked] = useState<boolean>(false)
    const [user] = useRecoilState(userState)


    const handleScan = async (trainerId: string) => {
        
        if (trainerId) {
            setScannedData(trainerId);
            console.log('QR Code Scanned:', trainerId);
            try {
                const res = await axios.post('http://localhost:4000/api/chat', {
                    trinerInfo: trainerId,
                    memberInfo: user.email || user.kakaoId
                })
                console.log('respose', res.data)
            } catch (error) {
                console.error('error', error)
            }
        }
    };


    const handleResult: OnResultFunction = (result: any, error: any) => {
        if (result) {
            const text = result.getText();
            console.log('Scanned text',text)    
            handleScan(text);
            console.log('reslut', result)
        }
        if (error) {
            console.log('error 발생', error)
        }
    };


    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        setMemberClicked(!memberClicked)
    }

    return (
        <StyledContainer>
            
            {role === 'trainer' ? (
                <StyledTrainerBox>
                    <QRCodeCanvas value={user.email || user.kakaoId} />
                    {/* <QRCodeCanvas value={JSON.stringify({ email: user.email || user.kakaoId })} /> */}
                    {/* <QRCodeCanvas value={'https://www.naver.com'} /> */}

                    <p>{user.email || user.kakaoId}</p>
                </StyledTrainerBox>
            ) : (
                <StyledMemberBox>
                    {memberClicked ?
                        <div className='w-[100%]'>
                            <StyledQrReader
                                constraints={{ facingMode: 'user' }}
                                onResult={handleResult}
                                scanDelay={300}
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

                    {scannedData ? <p>스캔된 데이터: {scannedData}</p> : <p>no scandata</p>}
                </StyledMemberBox>
            )}
        </StyledContainer>
    )
}

export default QrcodeComponent
