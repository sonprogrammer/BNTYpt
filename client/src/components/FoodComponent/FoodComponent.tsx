
import { AddPhotoComponent } from '../AddPhotoComponent'

interface AddPhotoComponentProps {
  onClick: () => void;
}

const FoodComponent = ({onClick} : AddPhotoComponentProps) => {
  return (
    <div>
      <AddPhotoComponent onClick={onClick}/>
    </div>
  )
}

export default FoodComponent
