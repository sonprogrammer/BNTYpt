import React, { useCallback } from 'react'
import { ImageWrapper, StyledBox, StyledContainer, StyledDelete, StyledImgContainer, StyledNothing, StyledText, StyledTitle } from './style'
import dayjs from 'dayjs'

import { useState } from 'react'
import { useEffect } from 'react'
import { axiosInstance } from '../../utils/axiosInstance';
import { useRecoilState } from 'recoil'
import { userState } from '../../utils/userState'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCamera } from '@fortawesome/free-solid-svg-icons'
import { confirmDelete, showSuccess } from '../../utils/alert'
import useDeletePhoto from '../../hooks/useDeletePhoto'
import { BeatLoader } from 'react-spinners'

const apiUrl = process.env.REACT_APP_API_URL;


function BodyCheckComponent({ refresh }: { refresh: boolean }) {
  const [photos, setPhotos] = useState<{ imageUrl: string, uploadTime: string, text: string, imageId: string }[]>([])
  const [user] = useRecoilState(userState)
  const [loading, setLoading] = useState<boolean>(false)
  const [clickedForDelete, setClickedForDelete] = useState<string | null>(null)

  const deleteMutation = useDeletePhoto()


  const fetchPost = useCallback( async () => {
    try {
      let url = ``

      if (user.email) {
        url = `${apiUrl}/api/posts/user/email/${user.email}`
      } else if (user.kakaoId) {
        url = `${apiUrl}/api/posts/user/kakao/${user.kakaoId}`
      }

      const res = await axiosInstance.get(url)


      const formatedPost = res.data.posts.map((post: any) => ({
        imageUrl: post.images[0],
        uploadTime: dayjs(post.date).format('YYYY-MM-DD'),
        text: post.text,
        imageId: post._id
      })).sort((a: any, b: any) => new Date(b.uploadTime).getTime() - new Date(a.uploadTime).getTime())


      setPhotos(formatedPost)
    } catch (error) {
      console.error('er', error)
    }
  },[user])

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return
      setLoading(true)
      try {
        await fetchPost()
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()

  }, [refresh, user, fetchPost])

  const handleDelete = async(e: React.MouseEvent,photoId: string) => {
    e.stopPropagation()
    const confirmed = await confirmDelete()
    if(confirmed){
      deleteMutation.mutate(photoId, {
        onSuccess: () => {
          showSuccess('삭제되었습니다')
          setPhotos(prev => prev.filter(p=> p.imageId !== photoId))

        }
      })
    }
  }

  return (
    <StyledContainer>
      {loading ? (
        <div className='flex flex-col justify-center items-center h-[400px] gap-4'>
          <BeatLoader color="#e11d48" size={12} />
          <p className="text-gray-500 text-sm">기록을 불러오는 중...</p>
        </div>
      ) : (
        <>
          {photos.length === 0 ? (
            <StyledNothing>
              <FontAwesomeIcon icon={faCamera} size="2xl" className="mb-4 opacity-20" />
              <p>아직 등록된 기록이 없어요.<br/>오늘의 몸을 기록해보세요!</p>
            </StyledNothing>
          ) : (
            <StyledImgContainer>
              {photos.map((photo) => (
                <StyledBox 
                  key={photo.imageId} 
                  onClick={() => setClickedForDelete(clickedForDelete === photo.imageId ? null : photo.imageId)}
                >
                  <StyledTitle>{photo.text || "No Title"}</StyledTitle>
                  
                  <ImageWrapper>
                    <img 
                      src={photo.imageUrl || '/notfound.png'} 
                      alt="body-check"
                      onError={(e) => { e.currentTarget.src = '/notfound.png'; }}
                    />
                    {clickedForDelete === photo.imageId && (
                      <StyledDelete onClick={(e) => handleDelete(e, photo.imageId)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </StyledDelete>
                    )}
                  </ImageWrapper>

                  <StyledText>{photo.uploadTime}</StyledText>
                </StyledBox>
              ))}
            </StyledImgContainer>
          )}
        </>
      )}
    </StyledContainer>
  )
}

export default BodyCheckComponent
