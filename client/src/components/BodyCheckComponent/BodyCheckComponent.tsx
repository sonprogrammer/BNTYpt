import React, { useCallback } from 'react'
import { StyledBox, StyledContainer, StyledDelete, StyledImage, StyledImgContainer, StyledNothing, StyledText, StyledTitle } from './style'
import dayjs from 'dayjs'

import { useState } from 'react'
import { useEffect } from 'react'
import { axiosInstance } from '../../utils/axiosInstance';
import { useRecoilState } from 'recoil'
import { userState } from '../../utils/userState'
import loadingBar from '../../assets/loading.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { confirmDelete, showSuccess } from '../../utils/alert'
import useDeletePhoto from '../../hooks/useDeletePhoto'

const apiUrl = process.env.REACT_APP_API_URL;


function BodyCheckComponent({ refresh }: { refresh: boolean }) {
  const [photos, setPhotos] = useState<{ imageUrl: string, uploadTime: string, text: string, imageId: string }[]>([])
  const [user] = useRecoilState(userState)
  const [loading, setLoading] = useState<boolean>(false)
  const [clickedForDelete, setClickedForDelete] = useState<string | null>(null)

  const deleteMutation = useDeletePhoto()

  console.log('user', user)

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

  const handleDelete = async(photoId: string) => {
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

        <div className='flex justify-center items-center h-full'>
          <img src={loadingBar} alt="로딩이미지" className='w-20' />
        </div>
      ) : (
        <>

          {photos.length === 0 ? (
            <StyledNothing>
              사진을 업로드 해주세요
            </StyledNothing>
          ) : (
            <StyledImgContainer>

              {photos.map((photo, i) => (
                <StyledBox key={i} onClick={() => setClickedForDelete(clickedForDelete === photo.imageId ? null : photo.imageId)}>
                  <StyledTitle>{photo.text}</StyledTitle>
                  <StyledImage src={photo.imageUrl || 'notfound.png'} alt="image" className='h-[100px]'
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { e.currentTarget.src = './notfound.png'; }}
                  />
                  <StyledDelete
                    style={{ display: clickedForDelete === photo.imageId ? 'block' : 'none' }}
                    onClick={() => handleDelete(photo.imageId)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </StyledDelete>
                  <StyledText>{photo.uploadTime}</StyledText>
                </StyledBox>
              ))
              }
            </StyledImgContainer>
          )}
        </>
      )
      }
    </StyledContainer>
  )
}

export default BodyCheckComponent
