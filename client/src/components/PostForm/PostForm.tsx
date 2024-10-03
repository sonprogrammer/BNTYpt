import React, { useState, ChangeEvent, FormEvent } from 'react';
import { StyledBtn, StyledContainerForm, StyledSubmitEl, StyledTextArea, StyledTitle } from './style';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userState } from '../../utils/userState';

interface PostFormProps {
  addPost: (post: { text: string; images: File[]; date: Date; }) => void;
}

const PostForm = ({ addPost } : PostFormProps) => {
  const [text, setText] = useState<string>('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [user, setUser] = useRecoilState(userState)

  console.log('user', user)

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value);
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files)
      setImages(fileArray);

      const previewUrls = fileArray.map((file) => URL.createObjectURL(file))
      setImagePreview(previewUrls)
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text && images.length === 0) return;
    console.log('user', user.email)

    const formData = new FormData();
    formData.append('text', text);
    formData.append('email', user.email);
    images.forEach((image) => {
      formData.append('images', image)
    })
    console.log('formData', formData);
    try{
      const res = await axios.post('http://localhost:4000/api/posts', formData,{
        headers: {
          'Content-Type' : 'multipart/form-data'
        }
      })

      if(res.data.success){
        const currentDate = new Date()
        
        addPost({ text, images: res.data.post.images, date: currentDate});
        setText('');
        setImages([]);
        setImagePreview([])
      }else{
        console.error('Error', res.data.message)
      }
    }catch(error){
      console.error('Error', error)
    }

  };

  const closeModal = () =>{
    setIsModalOpen(false)
  }

  return (
    <StyledContainerForm onSubmit={handleSubmit}>
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
      {imagePreview.map((preview, index) => (
          <img key={index} src={preview} alt={`미리보기 ${index + 1}`} className="my-2 w-[30%] overflow-auto mr-5"/>
        ))}
        </div>
      <StyledBtn type="submit" onClick={closeModal}>
        게시하기
      </StyledBtn>
      </StyledSubmitEl>
    </StyledContainerForm>
  );
};

export default PostForm;
