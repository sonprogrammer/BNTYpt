
import { StyledAdd } from './style'
import { Camera, Plus } from 'lucide-react';

interface AddPhotoComponentProps {
  onClick: () => void;
}

const AddPhotoComponent = ({onClick} : AddPhotoComponentProps) => {
  return (
    <StyledAdd onClick={onClick}>
      <div className="icon-wrapper">
        <Camera  />
        <Plus />
      </div>
    </StyledAdd>
  )
}

export default AddPhotoComponent
