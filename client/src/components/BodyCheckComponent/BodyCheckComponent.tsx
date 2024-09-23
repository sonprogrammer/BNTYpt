import React from 'react'
import { StyledBox, StyledContainer, StyledImage, StyledText } from './style'
import dayjs from 'dayjs'
import { PhotoComponent } from '../PhotoComponent'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

function BodyCheckComponent() {
  const [photos, setPhotos] = useState<{ imageUrl: string, uploadTime: string, text: string}[]>([])
    // const uploadTime = dayjs().format('YYYY-MM-DD:mm:ss')

    useEffect(() => {
      const fetchPost = async () =>{
        try {
          const res = await axios.get('http://localhost:4000/api/posts')
          const formatedPost = res.data.posts.map((post:any) => ({
            imageurl: post.images[0],
            uploadTime: dayjs(post.date).format('YYYY-MM-DD'),
            text: post.text
          }))
          setPhotos(formatedPost)
        } catch (error) {
          console.error(error)
        }
      }
      fetchPost()
    }, [])
  return (
    <>
    {photos.map((photo, i) => (
      <PhotoComponent key={i} imageUrl={photo.imageUrl} uploadTime={photo.uploadTime} text={photo.text}/>

    ))}
    </>
  )
}

export default BodyCheckComponent
