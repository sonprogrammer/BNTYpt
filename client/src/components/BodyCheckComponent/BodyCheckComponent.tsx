import React from 'react'
import { StyledBox, StyledContainer, StyledImage, StyledNothing, StyledText, StyledTitle } from './style'
import dayjs from 'dayjs'

import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { userState } from '../../utils/userState'
const apiUrl = process.env.REACT_APP_API_URL;


function BodyCheckComponent( {refresh} : { refresh: boolean}) {
  const [photos, setPhotos] = useState<{ imageUrl: string, uploadTime: string, text: string}[]>([])
  const [user] = useRecoilState(userState)
  // console.log('photos', photos)

  
    useEffect(() => {
      if(user){
        fetchPost()
      }
    }, [refresh, user])

    const fetchPost = async () =>{
      try {
        let url = ``

        if(user.email){
          url = `${apiUrl}/api/posts/user/email/${user.email}`
        }else if(user.kakaoId){
          url = `${apiUrl}/api/posts/user/kakao/${user.kakaoId}`
        }

        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })

        console.log('res',res)


        const formatedPost = res.data.posts.map((post:any) => ({
          imageUrl: post.images[0],
          uploadTime: dayjs(post.date).format('YYYY-MM-DD'),
          text: post.text
        })).sort((a:any, b:any) => new Date(b.uploadTime).getTime() - new Date(a.uploadTime).getTime())

        
        setPhotos(formatedPost)
      } catch (error) {
        console.error('er',error)
      }
    }
    
  return (
    <StyledContainer>
    {photos.length === 0 ? (
      <StyledNothing>
          게시글이 아직 없습니다 🤪
      </StyledNothing>
    ): (
      photos.map((photo, i)=> (
        <StyledBox key={i}>
            <StyledTitle>{photo.text}</StyledTitle>
            <StyledImage src={photo.imageUrl} alt="image" 
              onError={(e) => {e.currentTarget.src}}
            />
            <StyledText>{photo.uploadTime}</StyledText>
          </StyledBox>
      ))
    )}
    </StyledContainer>
  )
}

export default BodyCheckComponent
