import { useState } from 'react'
import { AddPhotoComponent, BodyCheckComponent, PostForm } from '../../components'
import {  StyledCloseBtn, StyledModalOverlay, StyledPageContainer, StyledPostFormContainer } from './style'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


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
    <StyledPageContainer>
        <BodyCheckComponent refresh={refresh}/>

        {!showUploadModal && (
          <AddPhotoComponent onClick={handleAddPhotoClick}/>
        )}

        {showUploadModal && (
          <StyledModalOverlay onClick={handleCloseModal}>
            <StyledPostFormContainer onClick={(e) => e.stopPropagation()}>
                <StyledCloseBtn onClick={handleCloseModal}>
                    <FontAwesomeIcon icon={faXmark} />
                </StyledCloseBtn>
                
                <div className="modal-header">
                  <h2>오늘의 변화 기록</h2>
                  <p>운동 후의 멋진 모습을 기록하세요!</p>
                </div>

                <PostForm addPost={addPost}/>
            </StyledPostFormContainer>
          </StyledModalOverlay>
        )}
    </StyledPageContainer>
  )
}

export default BodyCheckPage
