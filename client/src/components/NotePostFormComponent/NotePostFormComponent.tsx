import React, { FormEvent, useCallback, useEffect, useState } from 'react'
import { StyledBtn, StyledContainerForm, StyledRecord, StyledSelect, StyledSubmitEl, StyledTextArea, StyledTitle, StyledUpper } from './style';
import { useRecoilState } from 'recoil';
import { userState } from '../../utils/userState';
import axios from 'axios';
import { axiosInstance } from '../../utils/axiosInstance';
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

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value)
    }
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

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
            alert('빈 내용이 없는지 확인해주세요')
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
                opponentName: selectedMember,
            }
            await axiosInstance.post(`${apiUrl}/api/records`, formData)

            addPost(formData)
            setText('');
            setImages([]);
            setPreviewImages([]);
            setSelectedMember(chatRooms[0]?.memberId || null);

            closeModal();


        } catch (error) {
            console.error('Error', error)
        }

    };




    return (
        <StyledContainerForm onSubmit={handleSubmit}>
            <StyledUpper>

                <StyledRecord>일지 기록</StyledRecord>
                <StyledSelect name="member"
                    value={selectedMember || ''}
                    onChange={(e) => setSelectedMember(e.target.value)}
                >
                    <option value={''} disabled>member</option>
                    {chatRooms.map((room) => (
                        <option key={room.memberId} value={room.memberId}>
                            {room.memberName}
                        </option>
                    ))}

                </StyledSelect>
            </StyledUpper>

            <StyledTitle placeholder='오늘 주제'
                className='placeholder:text-red-950 placeholder:opacity-50'
                value={title}
                onChange={handleTitleChange}
            />

            <StyledTextArea
                placeholder="회원에게 알려주세요"
                value={text}
                onChange={handleTextChange}
                className='placeholder:text-red-950 placeholder:opacity-50'
            />
            <StyledSubmitEl>
                <input type="file" multiple accept="image/*" onChange={handleImageChange} className="my-2" />
                <div className='flex justify-around'>
                    {previewImages.map((preview, index) => (
                        <img key={index} src={preview} alt={`미리보기 ${index + 1}`} className="my-2 w-[30%] overflow-auto mr-5" />
                    ))}
                </div>
                <StyledBtn type="submit">
                    게시하기
                </StyledBtn>
            </StyledSubmitEl>
        </StyledContainerForm>
    )
}

export default NotePostFormComponent
