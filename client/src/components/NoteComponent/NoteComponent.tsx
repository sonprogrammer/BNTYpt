import { useEffect, useState } from 'react'
import { PostListComponent } from '../PostListComponent';
import { StyledClose, StyledMember, StyledMembersGroup, StyledNavText, StyledNoteContainer, StyledNothing, StyledPostBox, StyledPostForm, StyledRecordBtn } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';
import { userState } from '../../utils/userState';
import { NotePostFormComponent } from '../NotePostFormComponent';
import useGetMembers from '../../hooks/useGetMemers';
import useGetEachMemberNote from '../../hooks/useGetEachMemberNote';
import useGetTrainerMemberNote from '../../hooks/useGetTrainerMemberNote';




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

    const { data: members } = useGetMembers(user.objectId)


    //*트레이너가 보는것    
    const trainerNotesQuery = useGetTrainerMemberNote(selectedMemberId, user.objectId);
    //*회원이 보는것
    const memberNotesQuery = useGetEachMemberNote(user.objectId);


    const eachMemberNote = user.role === 'trainer'
        ? trainerNotesQuery.data
        : memberNotesQuery.data;

    const refetch = user.role === 'trainer'
        ? trainerNotesQuery.refetch
        : memberNotesQuery.refetch;

    useEffect(() => {
        if (user.role === 'trainer') {
            setRole(user.role)
        } else {
            setSelectedMemberId(user.objectId)
        }

    }, [user.role])


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

    return (
        <StyledNoteContainer>
            {role === 'trainer' ? (
                <>
                    {members?.length > 0 ? (
                        <>
                            <StyledMembersGroup>
                                {members?.length > 0 &&
                                    members.map((m: any) => (
                                        <StyledMember key={m.memberId} onClick={() => handleMemberClick(m.memberId)}>{m.memebersName}</StyledMember>
                                    )
                                    )
                                }
                            </StyledMembersGroup>
                            <StyledRecordBtn onClick={handleModalOpen}>운동 일지 기록 추가</StyledRecordBtn>
                            {selectedMemberId === null ? (
                                <StyledNavText>노트 작성을 위해 등록된 회원 차트로 가세요</StyledNavText>
                            ) : (
                                <>
                                    {eachMemberNote && (
                                        <PostListComponent eachMember={eachMemberNote} refetch={refetch}  />
                                    )}
                                </>
                            )}
                        </>)
                        : (
                            <StyledNothing className='here'>
                                <h1 className='h-full flex items-center'>QR코드를 통해 회원을 등록 후 사용</h1>
                            </StyledNothing>
                        )
                    }

                    {modalOpen && (
                        <StyledPostBox onClick={handleClosModal}>
                            <StyledPostForm onClick={(e) => e.stopPropagation()}>
                                <StyledClose onClick={handleClosModal}>
                                    <FontAwesomeIcon icon={faXmark} size='xl' />
                                </StyledClose>
                                <NotePostFormComponent addPost={addPost} closeModal={handleClosModal} />
                            </StyledPostForm>
                        </StyledPostBox>
                    )}
                </>
            ) : (
                <>
                    {eachMemberNote?.length > 0 ? (
                        <PostListComponent eachMember={eachMemberNote} refetch={refetch}  />
                    ) : (
                        <StyledNothing>게시글이 아직 없습니다🤪</StyledNothing>
                    )}

                </>
            )
            }


        </StyledNoteContainer>
    )
}

export default NoteComponent
