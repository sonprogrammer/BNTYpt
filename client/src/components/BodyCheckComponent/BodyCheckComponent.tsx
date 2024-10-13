import React from 'react'
import { StyledBox, StyledContainer, StyledImage, StyledNothing, StyledText } from './style'
import dayjs from 'dayjs'

import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { userState } from '../../utils/userState'

function BodyCheckComponent( {refresh} : { refresh: boolean}) {
  const [photos, setPhotos] = useState<{ imageUrl: string, uploadTime: string, text: string}[]>([])
  const [user] = useRecoilState(userState)

  
    useEffect(() => {
      if(user){
        fetchPost()
      }
    }, [refresh, user])

    const fetchPost = async () =>{
      try {
        let url = ``

        if(user.email){
          url = `http://localhost:4000/api/posts/user/email/${user.email}`
        }else if(user.kakaoId){
          url = `http://localhost:4000/api/posts/user/kakao/${user.kakaoId}`
        }

        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
        console.log('API 응답 데이터:', res.data.posts); // 응답 데이터 확인


        const formatedPost = res.data.posts.map((post:any) => ({
          imageUrl: post.images[0],
          uploadTime: dayjs(post.date).format('YYYY-MM-DD'),
          text: post.text
        }))
        setPhotos(formatedPost)
      } catch (error) {
        console.error('er',error)
      }
    }
    
  return (
    <StyledContainer>
    {photos.length === 0 ? (
      <StyledNothing>
          게시글이 아직 없습니다🤪
      </StyledNothing>
    ): (
      photos.map((photo, i)=> (
        <StyledBox key={i}>
            <StyledImage src={photo.imageUrl} alt="image" />
            <StyledText>{photo.text}</StyledText>
            <StyledText>{photo.uploadTime}</StyledText>
          </StyledBox>
      ))
    )}
    </StyledContainer>
  )
}

export default BodyCheckComponent
