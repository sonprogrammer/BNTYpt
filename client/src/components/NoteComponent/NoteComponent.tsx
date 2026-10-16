import {  useRecoilValue } from 'recoil';
import { userState } from '../../state/userState';
import { MemberNoteComponent } from './MemberNoteComponent';
import { TrainerNoteComponent } from './TrainerNoteComponent';


export function NoteComponent() {
  const { role } = useRecoilValue(userState)
  
  // if (!role) return null
  return role === 'trainer' ? <TrainerNoteComponent /> : <MemberNoteComponent />
}
    
    // <StyledNoteContainer>
    //     {isTrainer ? (
    //         <>
    //             {members && members?.length > 0 ? (
    //                 <>
    //                     <StyledMembersGroup>
    //                         <div className="label">
    //                             <Users size={18} className="mr-2 inline-block align-text-bottom" />회원 목록
    //                         </div>
    //                         <div className="member-list">
    //                             {members.map((m) => (
    //                                 <StyledMember
    //                                     key={m.memberId}
    //                                     active={selectedMemberId === m.memberId}
    //                                     onClick={() => handleMemberClick(m.memberId)}
    //                                 >
    //                                     {m.membersName}
    //                                 </StyledMember>
    //                             ))}
    //                         </div>
    //                     </StyledMembersGroup>

    //                     {selectedMember &&
    //                         <StyledRecordBtn onClick={handleModalOpen}>
    //                             <Plus size={16} className="mr-2 inline-block align-middle" />
    //                             운동 일지 기록 추가
    //                         </StyledRecordBtn>
    //                     }

    //                     {selectedMemberId === null ? (
    //                         <StyledNavText>
    //                             기록을 확인할 회원을 상단에서 선택해주세요.
    //                         </StyledNavText>
    //                     ) : (
    //                         <div className="content-area">
    //                             {eachMemberNote && (
    //                                 <PostListComponent eachMember={eachMemberNote} refetch={refetch} />
    //                             )}

    //                             {eachMemberNote.length === 0 && <div className="flex flex-col items-center justify-center py-16 text-center">
    //                                 <div className="flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-white/5">
    //                                     <NotebookPen
    //                                         size={26}
    //                                         className="text-gray-500"
    //                                     />
    //                                 </div>

    //                                 <p className="text-sm font-bold text-gray-400">
    //                                     기록된 노트가 없습니다.
    //                                 </p>

    //                                 <p className="mt-1 text-xs text-gray-600">
    //                                     회원의 운동 및 상담 내용을 기록해보세요.
    //                                 </p>
    //                             </div>}
    //                         </div>
    //                     )}
    //                 </>)
    //                 : (
    //                     <StyledNothing>
    //                         <QrCode size={48} className="mb-4 opacity-20 mx-auto" />
    //                         <p>QR코드를 통해 회원을 등록 후 사용하세요.</p>
    //                     </StyledNothing>
    //                 )
    //             }

    //             {modalOpen && selectedMember && (
    //                 <StyledPostBox onClick={handleClosModal}>
    //                     <StyledPostForm onClick={(e) => e.stopPropagation()}>
    //                         <StyledClose onClick={handleClosModal}>
    //                             <X size={20} />
    //                         </StyledClose>
    //                         <NotePostFormComponent selectedMember={selectedMember} closeModal={handleClosModal} />
    //                     </StyledPostForm>
    //                 </StyledPostBox>
    //             )}
    //         </>
    //     ) : (
    //         <div className="content-area">
    //             {eachMemberNote?.length > 0 ? (
    //                 <PostListComponent eachMember={eachMemberNote} refetch={refetch} />
    //             ) : (
    //                 <StyledNothing>아직 작성된 일지가 없습니다.</StyledNothing>
    //             )}
    //         </div>
    //     )}
    // </StyledNoteContainer>