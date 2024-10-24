import React, { useState, ChangeEvent, FormEvent } from 'react';
import { StyledBtn, StyledContainerForm, StyledSubmitEl, StyledTextArea, StyledTitle } from './style';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userState } from '../../utils/userState';
const apiUrl = process.env.REACT_APP_API_URL;



interface PostFormProps {
  addPost: (post: { text: string; images: string[]; uploadTime: string; }) => void;
}


const PostForm = ({ addPost } : PostFormProps) => {
  const [text, setText] = useState<string>('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [user] = useRecoilState(userState)


  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value);
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files)
      setImages(fileArray);

      const previewUrls = fileArray.map((file) => URL.createObjectURL(file))
      setImagePreview(previewUrls)
    }
  };

//*추가
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
      
      const formData: Record<string, any> = {
        text,
        images: uploadedImageUrls
      }

      if(user.kakaoId){
        formData['kakaoId'] = user.kakaoId
        const res = await axios.post(`${apiUrl}/api/posts`, formData,{
          headers: {
            'Content-Type' : 'application/json',
            Authorization: `Bearer ${user.kakaoAccessToken}`
          }
        })

        if(res.data.success){
          addPost({ text, images: res.data.post.images, uploadTime: res.data.post.date })
          setText('')
          setImages([])
          setImagePreview([])
        }else{
          console.error('errror', res.data.message)
        }
      }
      //*일반 로그인 
      else{
        formData['email'] = user.email
        const res = await axios.post(`${apiUrl}/api/posts`, formData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`
          }
        })
        if(res.data.success){
          addPost({ text, images: res.data.post.images, uploadTime: res.data.post.date})
          setText('')
          setImages([])
          setImagePreview([])
        }else{
          console.error('errror', res.data.message)
        }
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
