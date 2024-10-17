import React, { useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { OnResultFunction } from 'react-qr-reader'
import { StyledContainer, StyledMemberBox, StyledQrReader, StyledTrainerBox } from './style'
import { useRecoilState } from 'recoil';
import { userState } from '../../utils/userState';
import axios from 'axios';
import AddMemeberComponent from '../../pages/MainPage/AddMemeberComponent';
import { scannedMemberState } from '../../utils/pt';


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
                try {
                    const res = await axios.post('http://localhost:4000/api/chat', {
                        trainerInfo: trainerId,
                        memberInfo: user.email || user.kakaoId
                    })
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


    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        setMemberClicked(!memberClicked)
    }

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
                </StyledMemberBox>
            )}
        </StyledContainer>
    )
}


export default QrcodeComponent


