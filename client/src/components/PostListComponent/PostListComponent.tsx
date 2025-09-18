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
  eachMember: Post[]
}

const PostListComponent = ({ eachMember} : PostListProps) => {


  const orderedPosts = eachMember.sort((a, b) => new Date(b.uploadTime).getTime() - new Date(a.uploadTime).getTime())

  
  return (
    <StyledContainer>
      {orderedPosts.map((post, i) => (
        <PostItemComponent key={i} post={post} />
      ))}
    </StyledContainer>
  )
}

export default PostListComponent
