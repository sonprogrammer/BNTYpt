import React, { useCallback, useMemo } from 'react'
import { ImageWrapper, StyledBox, StyledContainer, StyledDelete, StyledImgContainer, StyledNothing, StyledText, StyledTitle } from './style'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { userState } from '../../utils/userState'
import { Trash2, Camera } from 'lucide-react'
import toast from 'react-hot-toast'
import useDeletePhoto from '../../hooks/useDeletePhoto'
import { BeatLoader } from 'react-spinners'
import { useGetBodyCheckPhotos } from '../../hooks/useGetBodyCheckPhotos'


function BodyCheckComponent() {
  const user = useRecoilValue(userState)
  const [clickedForDelete, setClickedForDelete] = useState<string | null>(null)

  const deleteMutation = useDeletePhoto()

  const { data: photos=[], isPending} = useGetBodyCheckPhotos(user?.email, user?.kakaoId)


  const handleDelete = useCallback ((e: React.MouseEvent, photoId: string) => {
    e.stopPropagation()
    deleteMutation.mutate(photoId, {
      onSuccess: () => {
        toast.success('삭제되었습니다!')
        setClickedForDelete(null)
      }
    })
  },[deleteMutation])

  const getOptimizedImageUrl = (url: string) => {
    if (!url || !url.includes('cloudinary.com')) return url || '/notfound.png';
    return url.replace('/upload/', '/upload/f_auto,q_auto,w_400/');
  }

  const renderedPhotos = useMemo(() => {
    return photos.map((photo) => (
      <StyledBox
        key={photo.imageId}
        onClick={() => setClickedForDelete(clickedForDelete === photo.imageId ? null : photo.imageId)}
      >
        <StyledTitle>{photo.text || "No Title"}</StyledTitle>

        <ImageWrapper>
          <img
            src={getOptimizedImageUrl(photo.imageUrl)} 
            alt="body-check"
            onError={(e) => { e.currentTarget.src = '/notfound.png'; }}
            loading="lazy"
            decoding="async" 
          />
          {clickedForDelete === photo.imageId && (
            <StyledDelete onClick={(e) => handleDelete(e, photo.imageId)}>
              <Trash2 size={18} />
            </StyledDelete>
          )}
        </ImageWrapper>

        <StyledText>{photo.uploadTime}</StyledText>
      </StyledBox>
    ));
  }, [photos, clickedForDelete, handleDelete]);

  return (
    <StyledContainer>
      {isPending ? (
        <div className='flex flex-col justify-center items-center h-[400px] gap-4'>
          <BeatLoader color="#e11d48" size={12} />
          <p className="text-gray-500 text-sm">기록을 불러오는 중...</p>
        </div>
      ) : (
        <>
          {photos.length === 0 ? (
            <StyledNothing>
              <Camera size={48} className="mb-4 opacity-20" />
              <p>아직 등록된 기록이 없어요.<br />오늘의 몸을 기록해보세요!</p>
            </StyledNothing>
          ) : (
            <StyledImgContainer>
              {renderedPhotos}
            </StyledImgContainer>
          )}
        </>
      )}
    </StyledContainer>
  )
}

export default BodyCheckComponent
