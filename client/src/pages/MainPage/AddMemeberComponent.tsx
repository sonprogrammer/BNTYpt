import React from 'react'
import { StyledContainer, StyledInput, StyledInputIcon, StyledMembers } from './style'

const AddMemeberComponent = () => {
  return (
    <StyledContainer>
      <StyledInput>
        <input type="text" />
        <StyledInputIcon>icon</StyledInputIcon>
      </StyledInput>
      <StyledMembers>
        names
      </StyledMembers>
    </StyledContainer>
  )
}

export default AddMemeberComponent
