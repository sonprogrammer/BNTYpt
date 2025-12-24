import React, { FormEvent, useCallback, useEffect, useState } from 'react'
import { ImagePreviewWrapper, StyledBtn, StyledContainerForm, StyledRecord, StyledSelect, StyledSubmitEl, StyledTextArea, StyledTitle, StyledUpper } from './style';
import { useRecoilState } from 'recoil';
import { userState } from '../../utils/userState';
import axios from 'axios';
import { axiosInstance } from '../../utils/axiosInstance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp, faImage } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast'
const apiUrl = process.env.REACT_APP_API_URL;

interface Record {
    title: string;
    text: string;
    images: string[];
    uploadTime: string;
    imageUrl?: string;
    userObjectId: string;
    opponentName: string | null;
}

interface NotePostFormComponentProps {
    addPost: (post: { text: string; images: string[]; uploadTime: string;}) => void;
    closeModal: () => void;
}


const NotePostFormComponent = ({ addPost, closeModal }: NotePostFormComponentProps) => {
    const [text, setText] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [images, setImages] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [selectedMember, setSelectedMember] = useState<string | null>(null);
    const [chatRooms, setChatRooms] = useState<any[]>([]);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const [user] = useRecoilState(userState)



    const fetchMemeber = useCallback(async (userId: string) => {
        try {
            const res = await axiosInstance.get(`${apiUrl}/api/chat/chatrooms/${user.objectId}`)
            const memberNames = res.data.chatRooms.map((room: any) => ({
                memberId: room.memberId,
                memberName: room.opponentName
            }))

            setChatRooms(memberNames)

            if (memberNames.length > 0) {
                setSelectedMember(memberNames[0].memberId);
            }
        } catch (error) {
            console.error(error);
        }
    },[user.objectId])

    useEffect(() => {
        const userId = user.objectId
        fetchMemeber(userId)
    }, [user.objectId, fetchMemeber])

   

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setImages(files);

            const previewUrls = files.map((file) => URL.createObjectURL(file));
            setPreviewImages(previewUrls);
        }
    };
    const uploadImageToCloudinary = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('file', file)
        formData.append('upload_preset', 'ods04138@gmail.com')
        const res = await axios.post('https://api.cloudinary.com/v1_1/dqrsksfho/image/upload', formData);
        return res.data.secure_url
    }



    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title || !text) {
            toast.error('빈 내용이 없는지 확인해주세요')
            return
        };

        try {
            setIsUploading(true)
            const uploadedImageUrls = await Promise.all(
                images.map(image => uploadImageToCloudinary(image))
            )


            const formData: Record = {
                title,
                text,
                images: uploadedImageUrls,
                uploadTime: new Date().toISOString(),
                userObjectId: user.objectId,
                opponentName: selectedMember,
            }
            await axiosInstance.post(`${apiUrl}/api/records`, formData)

            addPost(formData)
            setText('');
            setImages([]);
            setPreviewImages([]);
            setSelectedMember(chatRooms[0]?.memberId || null);
            toast.success('노트 일지를 작성하셨습니다')
            closeModal();


        } catch (error) {
            console.error('Error', error)
        }finally {
            setIsUploading(false)
        }

    };




    return (
        <StyledContainerForm onSubmit={handleSubmit}>
            <StyledUpper>
                <StyledRecord>NEW RECORD</StyledRecord>
                <div className="select-wrapper">
                    <StyledSelect 
                        value={selectedMember || ''}
                        onChange={(e) => setSelectedMember(e.target.value)}
                    >
                        <option value={''} disabled>회원 선택</option>
                        {chatRooms.map((room) => (
                            <option key={room.memberId} value={room.memberId}>
                                {room.memberName}
                            </option>
                        ))}
                    </StyledSelect>
                </div>
            </StyledUpper>

            <StyledTitle 
                placeholder='일지 제목을 입력하세요 (예: 하체 루틴)'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <StyledTextArea
                placeholder="오늘 운동에 대한 상세 설명이나 피드백을 남겨주세요."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <StyledSubmitEl>
                <div className="file-input-wrapper">
                    <label htmlFor="file-upload">
                        <FontAwesomeIcon icon={faImage} />
                        {images.length > 0 ? `${images.length}장의 사진 선택됨` : '사진 첨부 (최대 3장)'}
                    </label>
                    <input id="file-upload" type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
                </div>

                {previewImages.length > 0 && (
                    <ImagePreviewWrapper>
                        {previewImages.map((preview, index) => (
                            <img key={index} src={preview} alt="preview" />
                        ))}
                    </ImagePreviewWrapper>
                )}

                <StyledBtn type="submit" disabled={isUploading}>
                    {isUploading ? '기록 업로드 중...' : (
                        <>
                            <FontAwesomeIcon icon={faCloudArrowUp} className="mr-2" />
                            게시하기
                        </>
                    )}
                </StyledBtn>
            </StyledSubmitEl>
        </StyledContainerForm>
    )
}

export default NotePostFormComponent
