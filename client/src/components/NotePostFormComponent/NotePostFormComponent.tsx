import React, { FormEvent, useState } from 'react'
import { ImagePreviewWrapper, StyledBtn, StyledContainerForm, StyledRecord, StyledMemberName, StyledSubmitEl, StyledTextArea, StyledTitle, StyledUpper } from './style';
import { useRecoilValue } from 'recoil';

import axios from 'axios';
import { Image as ImageIcon, CloudUpload } from 'lucide-react';
import toast from 'react-hot-toast'
import { userState } from '../../state/userState';
import { usePostNote } from '../../hooks/usePostNote';


interface Record {
    title: string;
    text: string;
    images: string[];
    uploadTime: string;
    imageUrl?: string;
    userObjectId: string;
    memberId: string
}

interface MemberInfo {
    memberId: string
    membersName: string
}

interface NotePostFormComponentProps {
    closeModal: () => void;
    selectedMember: MemberInfo
}


const NotePostFormComponent = ({ closeModal, selectedMember }: NotePostFormComponentProps) => {
    const [text, setText] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [images, setImages] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);


    const user = useRecoilValue(userState)

    const { mutateAsync: createNote, isPending} = usePostNote()


   

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
            const uploadedImageUrls = await Promise.all(
                images.map(image => uploadImageToCloudinary(image))
            )


            const formData: Record = {
                title,
                text,
                images: uploadedImageUrls,
                uploadTime: new Date().toISOString(),
                userObjectId: user.objectId,
                memberId: selectedMember.memberId
            }
            await createNote(formData)

            setText('');
            setImages([]);
            setPreviewImages([]);
            toast.success('노트 일지를 작성하셨습니다')
            closeModal();


        } catch (error) {
            console.error('Error', error)
            toast.error('노트 작성 실패')
        }

    };




    return (
        <StyledContainerForm onSubmit={handleSubmit}>
            <StyledUpper>
                <StyledRecord>NEW RECORD</StyledRecord>
                <div className="select-wrapper">
                    <StyledMemberName 
                    >
                        {`${selectedMember.membersName} 회원님`}
                    </StyledMemberName>
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
                        <ImageIcon size={18} />
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

                <StyledBtn type="submit" disabled={isPending}>
                    {isPending ? '기록 업로드 중...' : (
                        <>
                            <CloudUpload size={18} className="mr-2" />
                            <p>게시하기</p>
                        </>
                    )}
                </StyledBtn>
            </StyledSubmitEl>
        </StyledContainerForm>
    )
}

export default NotePostFormComponent
