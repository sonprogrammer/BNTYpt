import { useState } from 'react'
import { StyledBox, StyledBtn, StyledContainer, StyledInput, StyledMember, StyledSelect, StyledXIcon } from './style'
import { X, UserPlus, ArrowUp10 } from 'lucide-react';
import { useRecoilValue } from 'recoil';
import { userState } from '../../utils/userState';
import { createPortal } from 'react-dom';
import toast from 'react-hot-toast'
import { useGetMemberByT } from '../../hooks/useGetMemberByT';
import { useAddPtCount } from '../../hooks/useAddPtCount';


interface AddMemeberComponentProps {
  closeModal: () => void;
}


const AddMemeberComponent = ({ closeModal }: AddMemeberComponentProps) => {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [ptCount, setPtCount] = useState<number>(0);
  const user = useRecoilValue(userState)

  const { data, isPending } =useGetMemberByT(user?.objectId)
  const { mutate: addPtCount, isPending: isSaving} = useAddPtCount()

  const chatRooms = data?.chatRooms ?? []

  const currentMemberId = selectedMember ?? chatRooms[0]?.memberId ?? ''

  const handleSavePtCount = async () => {
    if(!currentMemberId || ptCount <= 0){
      toast.error('회원과 정확한 횟수를 입력해주세요')
      return
    }
    addPtCount({memberId: currentMemberId, ptCount},{
      onSuccess: () => {
        toast.success(`${ptCount}회 저장`)
        closeModal()
      },
      onError: (error) => {
        console.error(error)
        toast.error('PT 저장 실패')
      }
      
    })
    
  };

  return createPortal(
    <StyledContainer className='df' onClick={() => closeModal()}>
      <StyledBox onClick={(e) => e.stopPropagation()}>
        <StyledXIcon onClick={() => closeModal()}>
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
            value={currentMemberId}
            onChange={(e) => setSelectedMember(e.target.value)}
            disabled={isPending}
          >
            {chatRooms.length === 0 ? (
                <option value="">연결된 회원이 없습니다</option>
            ) : (
                chatRooms.map((room) => (
                  <option key={room.memberId} value={room.memberId}>
                    {room.opponentName} 회원님
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

        <StyledBtn disabled={isSaving} onClick={handleSavePtCount}>
          {isSaving ? "저장 중..." : "PT 횟수 저장하기"}
        </StyledBtn>
      </StyledBox>
    </StyledContainer>,
    document.body
  )
}


export default AddMemeberComponent
