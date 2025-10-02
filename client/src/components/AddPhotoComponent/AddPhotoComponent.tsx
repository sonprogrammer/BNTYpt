
import { StyledAdd } from './style'

interface AddPhotoComponentProps {
  onClick: () => void;
}

const AddPhotoComponent = ({onClick} : AddPhotoComponentProps) => {
  return (
    <StyledAdd onClick={onClick}>
      +
    </StyledAdd>
  )
}

export default AddPhotoComponent
