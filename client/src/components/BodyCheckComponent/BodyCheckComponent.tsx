import React from 'react'
import { StyledBox, StyledContainer, StyledImage, StyledText } from './style'
import dayjs from 'dayjs'
import { PhotoComponent } from '../PhotoComponent'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { userState } from '../../utils/userState'

function BodyCheckComponent( {refresh} : { refresh: boolean}) {
  const [photos, setPhotos] = useState<{ imageUrl: string, uploadTime: string, text: string}[]>([])
  const [user] = useRecoilState(userState)

  console.log('user email', user.email)

  //user.email이용해서 사용하면댐


    useEffect(() => {
      if(user){
        fetchPost()
      }
    }, [refresh, user])

    const fetchPost = async () =>{
      try {
        const res = await axios.get('http://localhost:4000/api/posts/user/${user.email}',{
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
        const formatedPost = res.data.posts.map((post:any) => ({
          imageUrl: post.images[0],
          uploadTime: dayjs(post.date).format('YYYY-MM-DD'),
          text: post.text
        }))
        setPhotos(formatedPost)
      } catch (error) {
        console.error(error)
      }
    }
    
  return (
    <StyledContainer>
    {photos.map((photo, i) => (
      <StyledBox key={i}>
      <StyledImage src={photo.imageUrl} alt="image" />
      <StyledText>{photo.text}</StyledText>
      <StyledText>{photo.uploadTime}</StyledText>
    </StyledBox>

    ))}
    </StyledContainer>
  )
}

export default BodyCheckComponent
