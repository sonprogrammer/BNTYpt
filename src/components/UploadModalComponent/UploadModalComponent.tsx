/* eslint-disable */

import React, { useState } from 'react'
import { StyledContainer, StyledInput, StyledTitle } from './style'

interface UploadModalComponentProps{
  onClose: () => void;
}


const UploadModalComponent = ({onClose} : UploadModalComponentProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState<boolean>(false)
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCloseClick = () => {
    setShowAddModal(!showAddModal)
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
          cols={10} 
          placeholder='type something...' />
        <button>upload</button>
      </StyledInput>
    </StyledContainer>
  )
}

export default UploadModalComponent
