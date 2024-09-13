import React from 'react'
import { useParams } from 'react-router-dom'
import { StyledContainer, StyledMessage, StyledMessageBox, StyledPlus, StyledSendEl, Styledupper } from './style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';


const ChatRoomComponent = () => {
    const { userId } = useParams()
    return (
      <StyledContainer>
          <Styledupper>
            <h2>{userId} chat</h2>
          </Styledupper>
          <StyledMessageBox>
            <StyledMessage>
                message
            </StyledMessage>
          </StyledMessageBox>
          <StyledSendEl>
            <input type="text" />
            <StyledPlus>
                <FontAwesomeIcon icon={faPlus} />
            </StyledPlus>
            <button>send</button>
          </StyledSendEl>
      </StyledContainer>
    )
}

export default ChatRoomComponent
