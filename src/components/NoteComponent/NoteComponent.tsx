import React, { useEffect, useState } from 'react'
import { PostForm } from '../PostForm'
import { PostListComponent } from '../PostListComponent';


interface Post{
    text: string;
    image: File | null;
    date: Date;
}

const NoteComponent = () => {
    const [role, setRole] = useState<string>('trainer')
    const [posts, setPosts] = useState<Post[]>([])


    useEffect(() => {
        const fetchUserRole = async () => {
            setRole('member')

            // 목업
            const mockPosts: Post[] = [
                {
                  text: '오늘은 하체 운동을 집중적으로 했어요!',
                  image: null, // 이미지가 없는 경우
                  date: new Date()
                },
                {
                  text: '상체 운동 루틴을 공유합니다.',
                  image: new File([], 'mock-image.jpg'), // 이미지가 있는 경우 (실제 파일 경로는 없으므로 대체 데이터)
                  date: new Date()
                },
                {
                  text: '스트레칭 중요성에 대한 글입니다.',
                  image: null,
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


    return (
        <>
            {role === 'trainer' ? (
                <PostForm addPost={addPost}/>
            ) : (
                <PostListComponent posts={posts} />
            )
            }


        </>
    )
}

export default NoteComponent
