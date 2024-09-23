import React from 'react'
import { PhotoComponent } from '../PhotoComponent'
import { AddPhotoComponent } from '../AddPhotoComponent'

interface AddPhotoComponentProps {
  onClick: () => void;
}

const FoodComponent = ({onClick} : AddPhotoComponentProps) => {
  return (
    <div>
      {/* <PhotoComponent /> */}
      <AddPhotoComponent onClick={onClick}/>
    </div>
  )
}

export default FoodComponent
