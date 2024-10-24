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
import { NotePostFormComponent } from '../NotePostFormComponent';
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

    useEffect(() => {
        if(user.role){
            setRole(user.role)
        }
    },[user.role])


    
    useEffect(() => {
        const fetchPost = async () => {
        if(user.role === 'trainer'){
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
        }else if(user.role === 'member'){
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
                                <NotePostFormComponent addPost={addPost} closeModal={handleClosModal} />
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
