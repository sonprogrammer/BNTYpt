import React, { useCallback, useEffect, useState } from 'react'
import { StyledBox, StyledBtn, StyledContainer, StyledInput, StyledMember, StyledSelect, StyledXIcon } from './style'
import { X, UserPlus, ArrowUp10 } from 'lucide-react';
import { useRecoilState } from 'recoil';
import { userState } from '../../utils/userState';
import { axiosInstance } from '../../utils/axiosInstance';
import toast from 'react-hot-toast'
const apiUrl = process.env.REACT_APP_API_URL;

interface AddMemeberComponentProps {
  closeModal: () => void;
}

const AddMemeberComponent = ({ closeModal }: AddMemeberComponentProps) => {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [chatRooms, setChatRooms] = useState<any[]>([]);
  const [ptCount, setPtCount] = useState<number>(0);
  const [user] = useRecoilState(userState)

  const fetchMemeber = useCallback( async () => {
    try {
      const res = await axiosInstance.get(`${apiUrl}/api/chat/chatrooms/${user.objectId}`)
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
      toast.error('회원 목록을 불러오지 못했습니다')
    }
  },[user.objectId])

  useEffect(() => {
    fetchMemeber()
  }, [fetchMemeber])


  const handleSavePtCount = async () => {
    if (selectedMember && ptCount > 0) {
      try {
        await axiosInstance.post(`${apiUrl}/api/chat/pt`, {
          memberId: selectedMember,
          ptCount,
        });
        toast.success(`${ptCount}회 저장이 완료되었습니다!`)
        closeModal(); 
      } catch (error) {
        console.error("PT 횟수 저장 실패. 다시 시도해주세요");
      }
    } else {
      toast.error("회원과 정확한 횟수를 입력해 주세요.");
    }
  };

  return (
    <StyledContainer onClick={closeModal}>
      <StyledBox onClick={(e) => e.stopPropagation()}>
        <StyledXIcon onClick={closeModal}>
          <X size={20} />
        </StyledXIcon>
        
        <div className="title-section">
          <h2>PT 수업 추가</h2>
          <p>회원을 선택하고 부여할 횟수를 입력하세요.</p>
        </div>

        <StyledMember>
          <div className="input-label">
            <UserPlus size={18} />
            <span>대상 회원</span>
          </div>
          <StyledSelect 
            value={selectedMember || ''}
            onChange={(e) => setSelectedMember(e.target.value)}
          >
            {chatRooms.length === 0 ? (
                <option value="">연결된 회원이 없습니다</option>
            ) : (
                chatRooms.map((room) => (
                  <option key={room.memberId} value={room.memberId}>
                    {room.memberName} 회원님
                  </option>
                ))
            )}
          </StyledSelect>
        </StyledMember>

        <StyledInput>
          <div className="input-label">
            <ArrowUp10 size={18} />
            <span>PT 추가 횟수</span>
          </div>
          <input 
            type="number" 
            placeholder="0"
            value={ptCount > 0 ? ptCount : ''} 
            onChange={(e) => setPtCount(Number(e.target.value))}
          />
        </StyledInput>

        <StyledBtn onClick={handleSavePtCount}>
          PT 횟수 부여하기
        </StyledBtn>
      </StyledBox>
    </StyledContainer>
  )
}


export default AddMemeberComponent
