import React from 'react'
import { StyledContainer } from './style';
import dayjs from 'dayjs';

interface Post {
    text: string;
    image: File | null;
    date: Date;
}

interface PostItemProps {
    post: Post;
}

const PostItemComponent = ({post} : PostItemProps) => {
  const formattedDate = dayjs(post.date).format('YY.MM.DD(dd)')
  return (
    <StyledContainer>
      <p className='absolute left-5 top-5'>{formattedDate}</p>
      {post.text && <p>{post.text}</p>}
      {post.image && (
        <img src={URL.createObjectURL(post.image)} alt="Post" />
      )}
    </StyledContainer>
  )
}

export default PostItemComponent
