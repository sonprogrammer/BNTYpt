import React from 'react'
import { StyledBox, StyledContainer, StyledImage, StyledText } from './style'
import dayjs from 'dayjs'
import { PhotoComponent } from '../PhotoComponent'

function BodyCheckComponent() {
    const uploadTime = dayjs().format('YYYY-MM-DD:mm:ss')
  return (
    <PhotoComponent />
  )
}

export default BodyCheckComponent
