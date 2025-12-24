
import { StyledAdd } from './style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCamera } from '@fortawesome/free-solid-svg-icons'

interface AddPhotoComponentProps {
  onClick: () => void;
}

const AddPhotoComponent = ({onClick} : AddPhotoComponentProps) => {
  return (
    <StyledAdd onClick={onClick}>
      <div className="icon-wrapper">
        <FontAwesomeIcon icon={faCamera} className="camera-icon" />
        <FontAwesomeIcon icon={faPlus} className="plus-icon" />
      </div>
    </StyledAdd>
  )
}

export default AddPhotoComponent
