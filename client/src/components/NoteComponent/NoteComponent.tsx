import React, { useEffect, useState } from 'react'
import { PostForm } from '../PostForm'
import { PostListComponent } from '../PostListComponent';
import { AddPhotoComponent } from '../AddPhotoComponent';
import { StyledClose, StyledMember, StyledMembersGroup, StyledNavText, StyledNoteContainer, StyledNothing, StyledPostBox, StyledPostForm, StyledRecordBtn } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';
import { userState } from '../../utils/userState';
import axios from 'axios';
import dayjs from 'dayjs';
import { NotePostFormComponent } from '../NotePostFormComponent';
import useGetMembers from '../../hooks/useGetMemers';
import useGetEachMemberNote from '../../hooks/useGetEachMemberNote';
const apiUrl = process.env.REACT_APP_API_URL;



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


    const { data: eachMemberNote, refetch } = useGetEachMemberNote(selectedMemberId)

    console.log('mem', members)

    useEffect(() => {
        if (user.role) {
            setRole(user.role)
        }

    }, [user.role])





    useEffect(() => {
        const fetchPost = async () => {
            if (user.role === 'trainer') {
                try {
                    const res = await axios.get(`${apiUrl}/api/records/${user.objectId}`)
                    const formattedPosts = res.data.records.map((post: any) => ({
                        ...post,
                        uploadTime: dayjs(post.uploadTime).format('YYYY-MM-DD HH:mm:ss'),
                    }));

                    setPosts(formattedPosts);

                } catch (error) {
                    console.error('Error fetching posts:', error);
                }
            } else if (user.role === 'member') {
                try {
                    const res = await axios.get(`${apiUrl}/api/records/member/${user.objectId}`)
                    const formattedPosts = res.data.records.map((post: any) => ({
                        ...post,
                        uploadTime: dayjs(post.uploadTime).format('YYYY-MM-DD HH:mm:ss'), // 포맷팅
                    }));

                    setPosts(formattedPosts);
                } catch (error) {
                    console.error('Error fetching posts:', error);
                }
            }
        };


        if (user.email || user.kakaoId) {
            fetchPost();
        }
    }, [user, eachMemberNote]);

    const handleMemberClick = (memeberId: string) => {
        setSelectedMemberId(memeberId)
    }



    const addPost = (post: Post) => {
        setPosts([post, ...posts])
        refetch()
    }

    const handleModalOpen = () => {
        setModalOpen(true)
    }

    const handleClosModal = () => {
        setModalOpen(false)
    }

    return (
        <StyledNoteContainer>
            {role === 'trainer' ? (
                <>
                    { members?.length > 0 ? (
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
                                        <PostListComponent eachMember={eachMemberNote} />
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
                    {posts.length > 0 ? (
                        <PostListComponent eachMember={eachMemberNote} />
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
