import React, { useState } from 'react'
import { AddPhotoComponent, BodyCheckComponent, PostForm, UploadModalComponent } from '../../components'
import { StylecContainer, StyledClose, StyledPostBox, StyledPostForm } from './style'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';

interface Post {
  text: string;
  images: string[];
  uploadTime: string;
  imageUrl?: string; 
}

const BodyCheckPage = () => {
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false)
  const [posts, setPosts] = useState<Post[]>([])
  const [refresh, setRefresh] = useState<boolean>(false)

  const handleAddPhotoClick = () => {
    setShowUploadModal(true)
  }
  const handleCloseModal = () => {
    setShowUploadModal(false);
  };
  const addPost = (post:Post) => {
    setPosts([post, ...posts])
    handleCloseModal()
    setRefresh(p => !p)
}

  
  return (
    <StylecContainer className='b'>

        <BodyCheckComponent refresh={refresh}/>
        {showUploadModal ? (
                    <></>
                    ):(
                        <AddPhotoComponent onClick={handleAddPhotoClick}/>
                    )
                }
        {showUploadModal && 
        <>
        <div className='fixed inset-0 bg-black bg-opacity-50'></div>
        <StyledPostBox onClick={handleCloseModal}>
                        <StyledPostForm onClick={(e) => e.stopPropagation()}>
                            <StyledClose onClick={handleCloseModal}>
                                <FontAwesomeIcon icon={faXmark} size='xl' />
                            </StyledClose>
                            <PostForm addPost={addPost}/>
                        </StyledPostForm>
                    </StyledPostBox>
        </>
        
        }
    </StylecContainer>
  )
}

export default BodyCheckPage
