import { useEffect, useState } from 'react'
import { PostListComponent } from '../PostListComponent';
import { StyledClose, StyledMember, StyledMembersGroup, StyledNavText, StyledNoteContainer, StyledNothing, StyledPostBox, StyledPostForm, StyledRecordBtn } from './style';
import { useRecoilState } from 'recoil';
import { userState } from '../../utils/userState';
import { NotePostFormComponent } from '../NotePostFormComponent';
import useGetMembers from '../../hooks/useGetMemers';
import useGetEachMemberNote from '../../hooks/useGetEachMemberNote';
import useGetTrainerMemberNote from '../../hooks/useGetTrainerMemberNote';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faUsers, faQrcode,faXmark } from '@fortawesome/free-solid-svg-icons';
import { BeatLoader } from 'react-spinners'

interface Post {
    text: string;
    images: string[];
    uploadTime: string;
    imageUrl?: string;
}

const NoteComponent = () => {
    const [role, setRole] = useState<string>('')
    const [posts, setPosts] = useState<Post[]>([])
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [user] = useRecoilState(userState)
    const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

    const { data: members, isLoading } = useGetMembers(user?.objectId)



    //*트레이너가 보는것    
    const trainerNotesQuery = useGetTrainerMemberNote(selectedMemberId, user?.objectId);
    //*회원이 보는것
    const memberNotesQuery = useGetEachMemberNote(user?.objectId);

    

    const eachMemberNote = user?.role === 'trainer'
        ? trainerNotesQuery.data
        : memberNotesQuery.data;

    const refetch = user?.role === 'trainer'
        ? trainerNotesQuery.refetch
        : memberNotesQuery.refetch;

    useEffect(() => {
        if(!user || !user.objectId) return
        if (user.role === 'trainer') {
            setRole(user.role)
        } else {
            setSelectedMemberId(user.objectId)
        }

    }, [user])


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
            {role === 'trainer' ? (
                <>
                    {members?.length > 0 ? (
                        <>
                            <StyledMembersGroup>
                                <div className="label"><FontAwesomeIcon icon={faUsers} className="mr-2"/>회원 목록</div>
                                <div className="member-list">
                                    {members.map((m: any) => (
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
                                <FontAwesomeIcon icon={faPlus} className="mr-2" />
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
                                <FontAwesomeIcon icon={faQrcode} size="3x" className="mb-4 opacity-20" />
                                <p>QR코드를 통해 회원을 등록 후 사용하세요.</p>
                            </StyledNothing>
                        )
                    }

                    {modalOpen && (
                        <StyledPostBox onClick={handleClosModal}>
                            <StyledPostForm onClick={(e) => e.stopPropagation()}>
                                <StyledClose onClick={handleClosModal}>
                                    <FontAwesomeIcon icon={faXmark} />
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
