import React from 'react'
import { StyledBtns, StyledContainer, StyledContent } from './style'


interface LogoutModalProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const LogoutModalComponent = ({ onConfirm, onCancel }: LogoutModalProps) => {
    return (
        <StyledContainer onClick={onCancel}>
            <StyledContent onClick={(e) => e.stopPropagation()}>
                <p>정말 로그아웃하시겠습니까?</p>
                <StyledBtns>
                    <button onClick={onConfirm}>확인</button>
                    <button onClick={onCancel}>취소</button>
                </StyledBtns>
            </StyledContent>
        </StyledContainer>
    )
}

export default LogoutModalComponent
