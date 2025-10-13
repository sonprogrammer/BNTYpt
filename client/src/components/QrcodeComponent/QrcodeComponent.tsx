import React, { useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { OnResultFunction } from 'react-qr-scanner'
import { StyledContainer, StyledMemberBox, StyledQrReader, StyledTrainerBox } from './style'
import { useRecoilState } from 'recoil';
import { userState } from '../../utils/userState';
import axios from 'axios';
import { showSuccessAlert, showFailAlert } from '../../utils/toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const apiUrl = process.env.REACT_APP_API_URL;



interface QrcodeComponentProps {
    role: string;
}


const QrcodeComponent = ({ role } : QrcodeComponentProps) => {
    const [, setScannedData] = useState<string>('');
    const [isScanning, setIsScanning] = useState<boolean>(false)
    const [memberClicked, setMemberClicked] = useState<boolean>(false)
    const [user, setUser] = useRecoilState(userState)

    const handleScan = async (trainerId: string) => {
        if(isScanning) return
        if (trainerId) {
            setIsScanning(true)
            setScannedData(trainerId);
                try {
                    await axios.post(`${apiUrl}/api/chat`, {
                        trainerInfo: trainerId,
                        memberInfo: user.email || user.kakaoId
                    })
                    const res = await axios.post(`${apiUrl}/api/chat/pt`, {
                        ptCount: -1, 
                        memberId: user.objectId  
                    });

                    setUser((prev: any) => ({
                        ...prev, 
                        ptCount: res.data.ptCount
                    }))
        
                    showSuccessAlert('수업 시작')
                    setMemberClicked(false)
                } catch (error) {
                    console.error('error', error)
                    showFailAlert('다시 스캔해주세요')
                }finally{
                    setIsScanning(false)
                }
            }
        }
    


    const handleResult: OnResultFunction = (result: any, error: any) => {
        if(isScanning) return
        if (result) {
            const text = result.text;
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
        }
    };

    return (
        <StyledContainer className='hi'>
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
            <ToastContainer/>
        </StyledContainer>
    )
}


export default QrcodeComponent


