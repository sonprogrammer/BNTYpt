
import { LogOut } from 'lucide-react';
import { ButtonGroup, IconWrapper, ModalBox, Overlay } from "./style";

interface LogoutModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutModal = ({ onConfirm, onCancel }: LogoutModalProps) => {
  return (
    <Overlay onClick={onCancel}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <IconWrapper>
          <LogOut size={24} />
        </IconWrapper>
        <h2>로그아웃 하시겠습니까?</h2>
        <p>로그아웃 시 서비스 이용을 위해 다시 로그인해야 합니다.</p>
        
        <ButtonGroup>
          <button className="confirm" onClick={onConfirm}>로그아웃</button>
          <button className="cancel" onClick={onCancel}>취소</button>
        </ButtonGroup>
      </ModalBox>
    </Overlay>
  );
};

export default LogoutModal;
