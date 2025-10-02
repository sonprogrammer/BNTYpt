import React, { useEffect, useState } from 'react'
import { StyledBox, StyledBtn, StyledContainer, StyledInput, StyledMember, StyledSelect, StyledXIcon } from './style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';
import { userState } from '../../utils/userState';
import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;

interface AddMemeberComponentProps {
  closeModal: () => void;
}

const AddMemeberComponent = ({ closeModal }: AddMemeberComponentProps) => {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [chatRooms, setChatRooms] = useState<any[]>([]);
  const [ptCount, setPtCount] = useState<number>(0);
  const [user] = useRecoilState(userState)
  const fetchMemeber = async (userId: string) => {
    try {
      const res = await axios.get(`${apiUrl}/api/chat/chatrooms/${user.objectId}`)
      const memberNames = res.data.chatRooms.map((room: any) => ({
        memberId: room.memberId,
        memberName: room.opponentName
      }))
      setChatRooms(memberNames)
      if (memberNames.length > 0) {
        setSelectedMember(memberNames[0].memberId);
      }
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    const userId = user.objectId
    fetchMemeber(userId)
  }, [])

  const handleContainerClick = () => {
    closeModal();
  };

  const handlePtCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPtCount(Number(e.target.value)); // PT 횟수 입력 처리
  };

  const handleSavePtCount = async () => {
    if (selectedMember && ptCount > 0) {
      try {
        await axios.post(`${apiUrl}/api/chat/pt`, {
          memberId: selectedMember,
          ptCount,
        });
        alert("PT 횟수가 성공적으로 저장되었습니다!");
        closeModal(); 
      } catch (error) {
        console.error("PT 횟수 저장 실패:", error);
      }
    } else {
      alert("회원과 PT 횟수를 선택해 주세요.");
    }
  };

  
  const handleBoxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  return (
    <StyledContainer onClick={handleContainerClick}>
      <StyledBox onClick={handleBoxClick}>
        <StyledXIcon onClick={closeModal}>
          <FontAwesomeIcon icon={faXmark} size='xl' />
        </StyledXIcon>
        <StyledMember>

          <StyledSelect name="member"
            value={selectedMember || ''}
            onChange={(e) => setSelectedMember(e.target.value)}
          >
            <option value="nametag" disabled>member</option>
            {chatRooms.map((room) => (
              <option key={room.memberId} value={room.memberId}>
                {room.memberName}
              </option>
            ))}
          </StyledSelect>
          <p>회원</p>
        </StyledMember>
        <StyledInput>
          <p>PT횟수 : </p>
          <input type="number" className='p-3' value={ptCount > 0 ? ptCount : ''} onChange={handlePtCountChange}/>
        </StyledInput>

        <StyledBtn onClick={handleSavePtCount}>
          PT 저장하기
        </StyledBtn>
      </StyledBox>
    </StyledContainer>
  )
}


export default AddMemeberComponent
