import { useState } from 'react'
import { PostItemComponent } from '../PostItemComponent';
import { StyledCloseBtn, StyledContainer, StyledDate, StyledEditBox, StyledEditBtnGroup, StyledEditText, StyledEditTitle, StyledImage, StyledModalBox, StyledModalContainer, StyledText, StyledTitle, StyledTrainerFn } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faX } from '@fortawesome/free-solid-svg-icons'
import dayjs from 'dayjs';
import useDeleteNote from '../../hooks/useDeleteNote';
import { useRecoilValue } from 'recoil';
import { userRoleSelector } from '../../utils/userState';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import usePutNote from '../../hooks/usePutNote';
import toast from 'react-hot-toast'


interface Post {
  [key: string]: any;
  text: string;
  images: string[];
  uploadTime: string;
  imageUrl?: string;
  title: string;
}

interface PostListProps {
  eachMember: Post[]
  refetch: () => void
}

const PostListComponent = ({ eachMember, refetch }: PostListProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [editTitle, setEditTitle] = useState<string>('')
  const [editText, setEditText] = useState<string>('')
  // const [askDelete, setAskDelete] = useState<boolean>(false)

  const currentUserRole = useRecoilValue(userRoleSelector)

  const trainerId = selectedPost?.trainerId
  const memberId = selectedPost?.memberId

  const deletMutation = useDeleteNote(memberId, trainerId)
  const editMutation = usePutNote(memberId, trainerId)


  const orderedPosts = eachMember?.sort((a, b) => new Date(b.uploadTime).getTime() - new Date(a.uploadTime).getTime())

  const handleClick = (post: Post) => {
    setModalOpen(true)
    setSelectedPost(post)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedPost(null)
    setEditMode(false)
  }


  const handleDelete = async(noteId: string) => {
      deletMutation.mutate(noteId, {
        onSuccess: () => {
          refetch()
          toast.success('삭제되었습니다!')
          setModalOpen(false)
        }
      })

  }

  const handleEdit = () => {
    if (!selectedPost) return
    setEditMode(true)
    setEditTitle(selectedPost.title)
    setEditText(selectedPost.text)
  }

  const handleSave = (noteId: string) => {
    editMutation.mutate({ noteId, title: editTitle, text: editText },
      {
        onSuccess: (res) => {
          setSelectedPost(res.note)
          setEditMode(false)
          toast.success('수정 완료')
        },
        onError: () => {
          toast.error('수정 실패')
        }
      }
    )
  }


  return (
    <StyledContainer>
      {orderedPosts.map((post, i) => (
        <PostItemComponent key={i} post={post} handleClick={() => handleClick(post)} />
      ))}
      
      {modalOpen && selectedPost && (
        <StyledModalContainer onClick={handleCloseModal}>
          <StyledModalBox onClick={(e) => e.stopPropagation()}>
            <StyledCloseBtn onClick={handleCloseModal}>
              <FontAwesomeIcon icon={faX} />
            </StyledCloseBtn>

            {editMode ? (
              <StyledEditBox>
                <div className="label">제목 수정</div>
                <StyledEditTitle 
                   type="text" 
                   value={editTitle} 
                   onChange={(e) => setEditTitle(e.target.value)} 
                />
                <div className="label">내용 수정</div>
                <StyledEditText 
                   value={editText} 
                   onChange={(e) => setEditText(e.target.value)} 
                />
                <StyledEditBtnGroup>
                  <button className="save" onClick={() => handleSave(selectedPost._id)}>저장하기</button>
                  <button className="cancel" onClick={() => setEditMode(false)}>취소</button>
                </StyledEditBtnGroup>
              </StyledEditBox>
            ) : (
              <>
                <StyledTitle>{selectedPost.title}</StyledTitle>
                <StyledDate>{dayjs(selectedPost.uploadTime).format('YYYY. MM. DD (dd)')}</StyledDate>

                {currentUserRole === 'trainer' && (
                  <StyledTrainerFn>
                    <IconButton 
                      onClick={handleEdit} 
                      sx={{ color: '#9ca3af', border: '1px solid #374151', '&:hover': { color: 'white', borderColor: 'white' } }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>

                    <IconButton 
                      aria-label="delete" 
                      onClick={() => handleDelete(selectedPost._id)}
                      sx={{ color: '#ef4444', border: '1px solid #ef4444', '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.1)' } }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </StyledTrainerFn>
                )}

                {selectedPost.images && selectedPost.images.length > 0 && (
                  <StyledImage>
                    {selectedPost.images.map((image, index) => (
                      <img key={index} src={image} alt={'노트이미지'} />
                    ))}
                  </StyledImage>
                )}

                <StyledText>{selectedPost.text}</StyledText>
              </>
            )}
          </StyledModalBox>
        </StyledModalContainer>
      )}
    </StyledContainer>
  )
}
export default PostListComponent
