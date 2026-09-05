
import { StyledAdd } from './style'
import { Camera } from 'lucide-react';

interface AddPhotoComponentProps {
  onClick: () => void;
}

const AddPhotoComponent = ({onClick} : AddPhotoComponentProps) => {
  return (
    <StyledAdd onClick={onClick}>
      <div className="icon-wrapper">
        <Camera  />
      </div>
    </StyledAdd>
  )
}

export default AddPhotoComponent
