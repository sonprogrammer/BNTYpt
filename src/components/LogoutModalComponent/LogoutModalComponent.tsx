import React from 'react'
import { StyledBtns, StyledContainer, StyledContent } from './style'


interface LogoutModalProps {
    onConfirm: () => void;
    onCancel: () => void;
    text: string;
  }

const LogoutModalComponent = () => {
  return (
    <StyledContainer>
        <StyledContent>
            <p>정말 로그아웃하시겠습니까?</p>
            <StyledBtns>
                <button>확인</button>
                <button>취소</button>
            </StyledBtns>
        </StyledContent>
    </StyledContainer>
  )
}

export default LogoutModalComponent
