import React, { useState } from 'react'
import { FoodComponent, UploadModalComponent } from '../../components'

const FoodPage = () => {
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);

  const handleAddPhotoClick = () => {
    setShowUploadModal(true);
  };

  const handleCloseModal = () => {
    setShowUploadModal(false);
  };
  return (
    <div className='h-screen'>
      <FoodComponent onClick={handleAddPhotoClick}/>
      {showUploadModal && 
      <>
        <div className='fixed inset-0 bg-black bg-opacity-50'></div>
        <UploadModalComponent onClose={handleCloseModal}/>
      </>
        }
    </div>
  )
}

export default FoodPage
