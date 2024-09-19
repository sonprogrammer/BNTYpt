import React, { useEffect, useState } from 'react'
import { PostForm } from '../PostForm'
import { PostListComponent } from '../PostListComponent';
import { AddPhotoComponent } from '../AddPhotoComponent';
import { StyledClose, StyledPostBox, StyledPostForm } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';


interface Post{
    text: string;
    images: File[];
    date: Date;
}

const NoteComponent = () => {
    const [role, setRole] = useState<string>('trainer')
    const [posts, setPosts] = useState<Post[]>([])
    const [modalOpen, setModalOpen] = useState<boolean>(false)


    useEffect(() => {
        const fetchUserRole = async () => {
            setRole('trainer')

            // 목업
            const mockPosts: Post[] = [
                {
                  text: '오늘은 하체 운동을 집중적으로 했어요!',
                  images: [], // 이미지가 없는 경우
                  date: new Date()
                },
                {
                  text: '상체 운동 루틴을 공유합니다.',
                  images: [new File([], 'mock-image.jpg')], // 이미지가 있는 경우 (실제 파일 경로는 없으므로 대체 데이터)
                  date: new Date()
                },
                {
                  text: '스트레칭 중요성에 대한 글입니다.',
                  images: [],
                  date: new Date()
                },
              ];
              setPosts(mockPosts)
        }
        fetchUserRole()
    }, [])

    const addPost = (post:Post) => {
        setPosts([post, ...posts])
    }

    const handleModalOpen = () => {
        setModalOpen(true)
    }

    const handleClostModal = () =>{
        setModalOpen(false)
    }

    return (
        <>
            {role === 'trainer' ? (
                <>
                <PostListComponent posts={posts}/>
                {modalOpen ? (
                    <></>
                    ):(
                        <AddPhotoComponent onClick={handleModalOpen}/>
                    )
                }
                {modalOpen && (
                    <StyledPostBox onClick={handleClostModal}>
                        <StyledPostForm onClick={(e) => e.stopPropagation()}>
                            <StyledClose onClick={handleClostModal}>
                                <FontAwesomeIcon icon={faXmark} size='xl' />
                            </StyledClose>
                            <PostForm addPost={addPost}/>
                        </StyledPostForm>
                    </StyledPostBox>
                )}
                </>
            ) : (
                <PostListComponent posts={posts} />
            )
            }


        </>
    )
}

export default NoteComponent
