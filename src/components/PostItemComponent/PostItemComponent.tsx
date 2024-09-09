import React from 'react'
import { StyledBox, StyledContainer, StyledContent, StyledImg } from './style';
import dayjs from 'dayjs';

interface Post {
    text: string;
    images: File[];
    date: Date;
}

interface PostItemProps {
    post: Post;
}

const PostItemComponent = ({post} : PostItemProps) => {
  const formattedDate = dayjs(post.date).format('YY.MM.DD(dd)')
  return (
    <StyledContainer>
      <p className='mt-3'>{formattedDate}</p>
      <StyledBox>
      {post.text && <StyledContent>{post.text}</StyledContent>}
      {post.images.length > 0 && (
        <StyledImg>
          {post.images.map((image, index) => (
            <img 
              key={index}
              src={URL.createObjectURL(image)} 
              alt={`Post image ${index + 1}`} 
              style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }} 
            />
          ))}
        </StyledImg>
      )}
      </StyledBox>
    </StyledContainer>
  )
}

export default PostItemComponent
