import React, { FormEvent, useEffect, useState } from 'react'
import { StyledBtn, StyledContainerForm, StyledSelect, StyledSubmitEl, StyledTextArea, StyledTitle } from './style';
import { useRecoilState } from 'recoil';
import { userState } from '../../utils/userState';
import axios from 'axios';

interface Record {
    text: string;
    images: string[];
    uploadTime: string;
    imageUrl?: string;
    userObjectId: string;
    opponentName: string | null;
}

interface NotePostFormComponentProps {
    addPost: (post: { text: string; images: string[]; uploadTime: string; }) => void;
    closeModal: () => void;
}


const NotePostFormComponent = ({ addPost, closeModal }: NotePostFormComponentProps) => {
    const [text, setText] = useState<string>('');
    const [images, setImages] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [selectedMember, setSelectedMember] = useState<string | null>(null);
    const [chatRooms, setChatRooms] = useState<any[]>([]);


    const [user] = useRecoilState(userState)



    const fetchMemeber = async(userId: string) => {
        try {
            const res = await axios.get(`http://localhost:4000/api/chat/chatrooms/${user.objectId}`)
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
    }
    useEffect(() => {
        const userId = user.objectId
        fetchMemeber(userId)
    },[])

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value)
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setImages(files); 
    
            const previewUrls = files.map((file) => URL.createObjectURL(file)); 
            setPreviewImages(previewUrls); 
        }
    };
        const uploadImageToCloudinary = async(file: File): Promise<string> => {
            const formData = new FormData();
            formData.append('file', file)
            formData.append('upload_preset', 'ods04138@gmail.com')
            const res = await axios.post('https://api.cloudinary.com/v1_1/dqrsksfho/image/upload', formData);
            return res.data.secure_url
          }
        
        
        
          const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (!text && images.length === 0) return;

            try{
        
              const uploadedImageUrls = await Promise.all(
                images.map(image => uploadImageToCloudinary(image))
              )


              const formData: Record = {
                text,
                images: uploadedImageUrls,
                uploadTime: new Date().toISOString(),
                userObjectId: user.objectId,
                opponentName: selectedMember,

              }
              const res = await axios.post('http://localhost:4000/api/records', formData,{
                headers: {
                    'Content-Type' : 'application/json'
                }
              })

              addPost(formData)
              setText('');
            setImages([]);
            setPreviewImages([]);
            setSelectedMember(chatRooms[0]?.memberId || null);

              closeModal();

        
            }catch(error){
              console.error('Error', error)
            }
        
          };

    


    return (
        <StyledContainerForm onSubmit={handleSubmit}>
            <StyledSelect name="member"
                value={selectedMember || ''}
                onChange={(e) => setSelectedMember(e.target.value)}
                >
                <option value="nametag" disabled>member</option>
                {chatRooms.map((room) => (
                    <option key={room.memberId} value={room.memberId}>
                        {room.memberName}
                    </option>
                ))}

            </StyledSelect>
            <StyledTitle>일지 기록</StyledTitle>
            <StyledTextArea
                placeholder="무슨 운동을 했나요?"
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
