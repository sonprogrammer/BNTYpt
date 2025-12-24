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
    <StyledContainer onClick={handleClick}>
      <StyledUpper>
        <StyledTitle>{post.title || '제목 없음'}</StyledTitle>
        <span className='date'>{formattedDate}</span>
      </StyledUpper>
      
      <StyledBox>
        {post.text && <StyledContent>{post.text}</StyledContent>}
        {post.images && post.images.length > 0 && (
          <StyledImg>
            <img src={post.images[0]} alt={'thumbnail'} />
            {post.images.length > 1 && (
              <div className="img-count">+{post.images.length - 1}</div>
            )}
          </StyledImg>
        )}
      </StyledBox>
    </StyledContainer>
  )
}

export default PostItemComponent
