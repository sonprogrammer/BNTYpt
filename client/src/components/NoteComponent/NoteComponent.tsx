import React, { useEffect, useState } from 'react'
import { PostForm } from '../PostForm'
import { PostListComponent } from '../PostListComponent';
import { AddPhotoComponent } from '../AddPhotoComponent';
import { StyledClose, StyledNothing, StyledPostBox, StyledPostForm } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';
import { userState } from '../../utils/userState';
import axios from 'axios';
import dayjs from 'dayjs';


interface Post {
    text: string;
    images: string[];
    uploadTime: string;
    imageUrl?: string; 
}

const NoteComponent = () => {
    const [role, setRole] = useState<string>('trainer')
    const [posts, setPosts] = useState<Post[]>([])
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [user] = useRecoilState(userState)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                let loginedUser: string | undefined;
                let url = '';

                // 유저에 따라 URL 설정
                if (user.email) {
                    loginedUser = user.email;
                    url = `http://localhost:4000/api/posts/user/email/${loginedUser}`;
                } else if (user.kakaoId) {
                    loginedUser = user.kakaoId;
                    url = `http://localhost:4000/api/posts/user/kakao/${loginedUser}`;
                }

                const res = await axios.get(url);
                console.log('res', res);

                 const formattedPost = res.data.posts.map((post: any) => ({
                    imageUrl: post.images && post.images.length > 0 ? post.images[0] : '',
                    uploadTime: dayjs(post.date).format('YYYY-MM-DD'),
                    text: post.text,
                }));

                setPosts(formattedPost);
            } catch (error) {
                console.error('Error fetching posts:', error); 
            }
        };

        if (user.email || user.kakaoId) {
            fetchPost(); 
        }
    }, [user]);


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
