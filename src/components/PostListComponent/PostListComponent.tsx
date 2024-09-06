import React from 'react'
import { PostItemComponent } from '../PostItemComponent';
import { StyledContainer } from './style';

interface Post {
    text: string;
    image: File | null;
    date: Date;
}

interface PostListProps{
    posts: Post[]
}

const PostListComponent = ({ posts} : PostListProps) => {
  return (
    <StyledContainer>
      {posts.map((post, i) => (
        <PostItemComponent key={i} post={post}/>
      ))}
    </StyledContainer>
  )
}

export default PostListComponent
