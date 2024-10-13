import React from 'react'
import { PostItemComponent } from '../PostItemComponent';
import { StyledContainer } from './style';

interface Post {
  text: string;
  images: string[];
  uploadTime: string;
  imageUrl?: string; 
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
