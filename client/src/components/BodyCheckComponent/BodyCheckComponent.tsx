import React from 'react'
import { StyledBox, StyledContainer, StyledImage, StyledText } from './style'
import dayjs from 'dayjs'
import { PhotoComponent } from '../PhotoComponent'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

function BodyCheckComponent( {refresh} : { refresh: boolean}) {
  const [photos, setPhotos] = useState<{ imageUrl: string, uploadTime: string, text: string}[]>([])
  

    useEffect(() => {
      fetchPost()
    }, [refresh])

    const fetchPost = async () =>{
      try {
        const res = await axios.get('http://localhost:4000/api/posts')
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
