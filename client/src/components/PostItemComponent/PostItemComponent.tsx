import React from 'react'
import { StyledBox, StyledContainer, StyledContent, StyledImg } from './style';
import dayjs from 'dayjs';

interface Post {
  text: string;
  images: string[];
  uploadTime: string;
  imageUrl?: string; 
}

// props의 타입 정의
interface PostItemComponentProps {
  post: Post;
}


const PostItemComponent = ({post}: PostItemComponentProps  ) => {
  // console.log('post', post)
  const formattedDate = dayjs(post.uploadTime).format('YY.MM.DD(dd)')
  return (
    <StyledContainer>
      <p className='mt-3'>{formattedDate}</p>
      <StyledBox>
      {post.text && <StyledContent>{post.text}</StyledContent>}
      {post.images && post.images.length > 0 && (
        <StyledImg>
          {post.images.map((image, index) => (
            <img 
              key={index}
              src={image}
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
