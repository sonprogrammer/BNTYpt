import { useEffect, useMemo, useState } from 'react'
import { PostListComponent } from '../PostListComponent';
import { StyledClose, StyledMember, StyledMembersGroup, StyledNavText, StyledNoteContainer, StyledNothing, StyledPostBox, StyledPostForm, StyledRecordBtn } from './style';
import { useRecoilState } from 'recoil';
import { userState } from '../../utils/userState';
import { NotePostFormComponent } from '../NotePostFormComponent';
import useGetMembers from '../../hooks/useGetMemers';
import useGetEachMemberNote from '../../hooks/useGetEachMemberNote';
import useGetTrainerMemberNote from '../../hooks/useGetTrainerMemberNote';
import { Users, Plus, QrCode, X } from 'lucide-react';
import { BeatLoader } from 'react-spinners'

interface Post {
    text: string;
    images: string[];
    uploadTime: string;
    imageUrl?: string;
}


const NoteComponent = () => {
    const [posts, setPosts] = useState<Post[]>([])
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [user] = useRecoilState(userState)
    const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

    const userRole = user?.role;
    const isTrainer = userRole === 'trainer';

    const { data: members =[], isLoading } = useGetMembers(user?.objectId)


    //*트레이너가 보는것    
    const trainerNotesQuery = useGetTrainerMemberNote(selectedMemberId, user?.objectId);
    //*회원이 보는것
    const memberNotesQuery = useGetEachMemberNote(user?.objectId);


    const { eachMemberNote, refetch } = useMemo(() => {
        return isTrainer 
            ? { eachMemberNote: trainerNotesQuery.data, refetch: trainerNotesQuery.refetch }
            : { eachMemberNote: memberNotesQuery.data, refetch: memberNotesQuery.refetch };
    }, [isTrainer, trainerNotesQuery.data, trainerNotesQuery.refetch, memberNotesQuery.data, memberNotesQuery.refetch]);
    
    console.log('eachmemeber', eachMemberNote)
    useEffect(() => {
        if (!user || !user.objectId) return
        if (!isTrainer) {
            setSelectedMemberId(user.objectId)
        }
    }, [user, isTrainer])

    const handleMemberClick = (memeberId: string) => {
        setSelectedMemberId(memeberId)
    }



    const addPost = (post: Post) => {
        setPosts([post, ...posts])
        refetch()
    }

    const handleModalOpen = () => {
        setModalOpen(true)
        refetch()
    }

    const handleClosModal = () => {
        setModalOpen(false)
        refetch()
    }

    if(isLoading){
        return (
            <div className='h-full flex flex-col items-center justify-center gap-3'>
                <BeatLoader color="#ef4444" size={12} />
                <p className="text-gray-500 text-sm">정보를 불러오는 중...</p>
            </div>
        )
    }

    return (
        <StyledNoteContainer>
            {isTrainer ? (
                <>
                    {members && members?.length > 0 ? (
                        <>
                            <StyledMembersGroup>
                                <div className="label">
                                    <Users size={18} className="mr-2 inline-block align-text-bottom" />회원 목록
                                </div>
                                <div className="member-list">
                                    {members.map((m) => (
                                        <StyledMember 
                                            key={m.memberId} 
                                            active={selectedMemberId === m.memberId}
                                            onClick={() => handleMemberClick(m.memberId)}
                                        >
                                            {m.memebersName}
                                        </StyledMember>
                                    ))}
                                </div>
                            </StyledMembersGroup>

                            <StyledRecordBtn onClick={handleModalOpen}>
                                <Plus size={16} className="mr-2 inline-block align-middle" />
                                운동 일지 기록 추가
                            </StyledRecordBtn>

                            {selectedMemberId === null ? (
                                <StyledNavText>
                                    기록을 확인할 회원을 상단에서 선택해주세요.
                                </StyledNavText>
                            ) : (
                                <div className="content-area">
                                    {eachMemberNote && (
                                        <PostListComponent eachMember={eachMemberNote} refetch={refetch}  />
                                    )}
                                </div>
                            )}
                        </>)
                        : (
                            <StyledNothing>
                                <QrCode size={48} className="mb-4 opacity-20 mx-auto" />
                                <p>QR코드를 통해 회원을 등록 후 사용하세요.</p>
                            </StyledNothing>
                        )
                    }

                    {modalOpen && (
                        <StyledPostBox onClick={handleClosModal}>
                            <StyledPostForm onClick={(e) => e.stopPropagation()}>
                                <StyledClose onClick={handleClosModal}>
                                    <X size={20} />
                                </StyledClose>
                                <NotePostFormComponent addPost={addPost} closeModal={handleClosModal} />
                            </StyledPostForm>
                        </StyledPostBox>
                    )}
                </>
            ) : (
                <div className="content-area">
                    {eachMemberNote?.length > 0 ? (
                        <PostListComponent eachMember={eachMemberNote} refetch={refetch}  />
                    ) : (
                        <StyledNothing>아직 작성된 일지가 없습니다.</StyledNothing>
                    )}
                </div>
            )}
        </StyledNoteContainer>
    )
}

export default NoteComponent
