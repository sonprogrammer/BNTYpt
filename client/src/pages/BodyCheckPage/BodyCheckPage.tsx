import { lazy, Suspense, useState } from 'react'
import { AddPhotoComponent, PostForm } from '../../components'
import { StyledCloseBtn, StyledModalOverlay, StyledPageContainer, StyledPostFormContainer } from './style'
import { X } from 'lucide-react';
const BodyCheckComponent = lazy(() => import('../../components/BodyCheckComponent/BodyCheckComponent'));



const AlbumSkeleton = () => (
  <div className="w-full animate-pulse p-4">
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {[1, 2, 3, 4, 6].map((n) => (
        <div key={n} className="bg-gray-900 rounded-xl h-64 w-full" />
      ))}
    </div>
  </div>
);

const BodyCheckPage = () => {
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false)


  const handleAddPhotoClick = () => {
    setShowUploadModal(true)
  }
  const handleCloseModal = () => {
    setShowUploadModal(false);
  };



  return (
    <StyledPageContainer>
      <Suspense fallback={<AlbumSkeleton />}>
        <BodyCheckComponent  />
      </Suspense>

      {!showUploadModal && (
        <AddPhotoComponent onClick={handleAddPhotoClick} />
      )}

      {showUploadModal && (
        <StyledModalOverlay onClick={handleCloseModal}>
          <StyledPostFormContainer onClick={(e) => e.stopPropagation()}>
            <StyledCloseBtn onClick={handleCloseModal}>
              <X size={20} />
            </StyledCloseBtn>

            <div className="modal-header">
              <h2>오늘의 변화 기록</h2>
              <p>운동 후의 멋진 모습을 기록하세요!</p>
            </div>

            <PostForm onSuccess={handleCloseModal}/>
          </StyledPostFormContainer>
        </StyledModalOverlay>
      )}
    </StyledPageContainer>
  )
}

export default BodyCheckPage
