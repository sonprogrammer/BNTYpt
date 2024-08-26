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
      {showUploadModal && <UploadModalComponent onClose={handleCloseModal}/>}
    </div>
  )
}

export default FoodPage
