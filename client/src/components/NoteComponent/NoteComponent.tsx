import React, { useEffect, useState } from 'react'
import { PostForm } from '../PostForm'
import { PostListComponent } from '../PostListComponent';
import { AddPhotoComponent } from '../AddPhotoComponent';
import { StyledClose, StyledNothing, StyledPostBox, StyledPostForm } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';
import { userState } from '../../utils/userState';


interface Post {
    text: string;
    images: string[];
    date: Date;
}

const NoteComponent = () => {
    const [role, setRole] = useState<string>('trainer')
    const [posts, setPosts] = useState<Post[]>([])
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [user] = useRecoilState(userState)

    useEffect(() => {
        const fetchUserRole = async () => {
            setRole(user.role)
        

        }
        fetchUserRole()
    }, [user])

    const addPost = (post: Post) => {
        setPosts([post, ...posts])
    }

    const handleModalOpen = () => {
        setModalOpen(true)
    }

    const handleClosModal = () => {
        setModalOpen(false)
    }

    return (
        <>
            {role === 'trainer' ? (
                <>
                    {posts.length > 0 ? (
                        <PostListComponent posts={posts} />
                    ) : (
                        <StyledNothing>게시글이 아직 없습니다🤪</StyledNothing>
                    )}
                    {/* <PostListComponent posts={posts}/> */}
                    {modalOpen ? (
                        <></>
                    ) : (
                        <AddPhotoComponent onClick={handleModalOpen} />
                    )
                    }
                    {modalOpen && (
                        <StyledPostBox onClick={handleClosModal}>
                            <StyledPostForm onClick={(e) => e.stopPropagation()}>
                                <StyledClose onClick={handleClosModal}>
                                    <FontAwesomeIcon icon={faXmark} size='xl' />
                                </StyledClose>
                                <PostForm addPost={addPost} />
                            </StyledPostForm>
                        </StyledPostBox>
                    )}
                </>
            ) : (
                <>
                    {posts.length > 0 ? (
                        <PostListComponent posts={posts} />
                    ) : (
                        <StyledNothing>게시글이 아직 없습니다🤪</StyledNothing>
                    )}
                    {/* <PostListComponent posts={posts} /> */}
                </>
            )
            }


        </>
    )
}

export default NoteComponent
