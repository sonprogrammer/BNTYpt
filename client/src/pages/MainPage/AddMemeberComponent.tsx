import React from 'react'
import { StyledBox, StyledBtn, StyledContainer, StyledInput, StyledInputIcon, StyledMembers } from './style'

const AddMemeberComponent = () => {
  return (
    <StyledContainer>
      <StyledBox>
        <StyledMembers>
          names 회원님
        </StyledMembers>
        <StyledInput>
          <p>PT횟수 : </p>
          <input type="number" className='p-3' />
          {/* <StyledInputIcon>icon</StyledInputIcon> */}
        </StyledInput>
        {/* 서버로부터 받아온 이름 가져올꺼임 */}

        <StyledBtn>
            PT 저장하기
        </StyledBtn>
      </StyledBox>
    </StyledContainer>
  )
}

export default AddMemeberComponent
