/* eslint-disable */

import React, { useState } from 'react'
import { StyledContainer, StyledInput, StyledTitle } from './style'
import toast from 'react-hot-toast'
interface UploadModalComponentProps{
  onClose: () => void;
  addPost: (post: { text: string; images: File[]; date: Date; }) => void;
}


const UploadModalComponent = ({onClose, addPost} : UploadModalComponentProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [description, setDescription] = useState<string>('')

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file)
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>{
    setDescription(e.target.value)
  }

  const handleUpload =() => {
    if(!imageFile || !description){
      toast.error('게시할 글과 이미지를 입력해주세요!')
      return
    }

    addPost({
      text: description,
      images: [imageFile],
      date: new Date()
    })

    setImageFile(null)
    setImagePreview(null)
    setDescription('')
    onClose()
  }

  

  
  return (
    <StyledContainer>
      <StyledTitle>
        <h1>Add photo</h1>
        <p onClick={onClose}>X</p>
      </StyledTitle>
      {imagePreview && (
        <div className='mb-4'>
          <img src={imagePreview} alt="preview" />
        </div>
      )}
      <StyledInput>
        <input type="file" accept='image/*' onChange={handleImageChange} />
        <textarea 
          name="description" 
          rows={2} 
          placeholder='type something...'
          value={description}
          onChange={handleDescriptionChange}
           />
        <button onClick={handleUpload}>upload</button>
      </StyledInput>
    </StyledContainer>
  )
}

export default UploadModalComponent
