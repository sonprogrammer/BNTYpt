import React from 'react'
import { StyledContainer } from './style';
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
      <p className='absolute left-5 top-5'>{formattedDate}</p>
      {post.text && <p>{post.text}</p>}
      {post.images.length > 0 && (
        <div>
          {post.images.map((image, index) => (
            <img 
              key={index}
              src={URL.createObjectURL(image)} 
              alt={`Post image ${index + 1}`} 
              style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }} 
            />
          ))}
        </div>
      )}
    </StyledContainer>
  )
}

export default PostItemComponent
