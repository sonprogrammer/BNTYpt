import React, { useState } from 'react'
import { AddPhotoComponent, BodyCheckComponent, UploadModalComponent } from '../../components'
import { StylecContainer } from './style'

const BodyCheckPage = () => {
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false)

  const handleAddPhotoClick = () => {
    setShowUploadModal(true)
  }
  const handleCloseModal = () => {
    setShowUploadModal(false);
  };
  
  return (
    <StylecContainer>
        <BodyCheckComponent />
        <AddPhotoComponent onClick={handleAddPhotoClick}/>
        {showUploadModal && 
        <>
        <div className='fixed inset-0 bg-black bg-opacity-50'></div>
        <UploadModalComponent onClose={handleCloseModal}/>
        </>
        
        }
    </StylecContainer>
  )
}

export default BodyCheckPage
