import React, { useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { OnResultFunction } from 'react-qr-scanner'
import { StyledContainer, StyledMemberBox, StyledQrReader, StyledTrainerBox } from './style'
import { useRecoilState } from 'recoil';
import { userState } from '../../utils/userState';
import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;



interface QrcodeComponentProps {
    role: string;
}


const QrcodeComponent = ({ role } : QrcodeComponentProps) => {
    const [, setScannedData] = useState<string>('');
    const [memberClicked, setMemberClicked] = useState<boolean>(false)
    const [user] = useRecoilState(userState)

    const handleScan = async (trainerId: string) => {
        if (trainerId) {

            setScannedData(trainerId);
                try {
                    await axios.post(`${apiUrl}/api/chat`, {
                        trainerInfo: trainerId,
                        memberInfo: user.email || user.kakaoId
                    })
                    await axios.post(`${apiUrl}/api/chat/pt`, {
                        ptCount: -1, 
                        memberId: user.objectId  
                    });
        
                alert('Scan Success')
                } catch (error) {
                    console.error('error', error)
                }
            }
        }
    


    const handleResult: OnResultFunction = (result: any, error: any) => {
        if (result) {
            const text = result.getText();
            handleScan(text);
   
        }
        if (error) {
            console.log('error 발생', error)
        }
    };
    const handleQrError = (err: any) => {
        console.log('QR error', err);
      };

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        setMemberClicked(!memberClicked)
    }

    const videoConstraints = {
        audio: false,
        video: {
            facingMode: { exact: "environment" },
            width: {ideal: 1280},
            height: {ideal: 720}
        }
    };

    return (
        <StyledContainer>
            {role === 'trainer' ? (
                <StyledTrainerBox>
                    <QRCodeCanvas value={user.email || user.kakaoId} />

                </StyledTrainerBox>
            ) : (
                <StyledMemberBox>
                    {memberClicked ?
                        <div className='w-[100%]'>
                            <StyledQrReader
                                onScan={handleResult}
                                delay={500}
                                onError={handleQrError}
                                constraints={videoConstraints}
                            />
                            <div className='m-7 text-center hover:font-bold hover:text-red-500 hover:cursor-pointer' onClick={handleClick}>Exit camera</div>
                        </div>
                        :
                        <div 
                            onClick={handleClick}
                            className='font-bold text-xl hover:cursor-pointer hover:text-red-900'
                            >
                        scan Qr code
                        </div>
                    }
                </StyledMemberBox>
            )}
        </StyledContainer>
    )
}


export default QrcodeComponent


