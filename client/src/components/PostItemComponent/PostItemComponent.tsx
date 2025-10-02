import { StyledBox, StyledContainer, StyledContent, StyledImg, StyledTitle, StyledUpper } from './style';
import dayjs from 'dayjs';

interface Post {
  text: string;
  images: string[];
  uploadTime: string;
  imageUrl?: string;
  title: string;
}

interface PostItemComponentProps {
  post: Post;
  handleClick: () => void;
}


const PostItemComponent = ({ post, handleClick }: PostItemComponentProps) => {

  const formattedDate = dayjs(post.uploadTime).format('MM.DD(dd)')
  return (
    <StyledContainer className='am' onClick={handleClick}>
      <StyledUpper>
        {post.title ? <StyledTitle>{post.title}</StyledTitle> : <></>}
        <p className='mt-1'>{formattedDate}</p>
      </StyledUpper>
      <StyledBox>
        {post.text && <StyledContent>{post.text}</StyledContent>}
        {post.images && post.images.length > 0 && (
          <StyledImg>
            {post.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={'노트이미지'}
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
