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
import { confirmDelete, showSuccess } from '../../utils/alert'



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
    const confirmed = await confirmDelete()

    if(confirmed){
      deletMutation.mutate(noteId, {
        onSuccess: () => {
          refetch()
          showSuccess('삭제되었습니다')
          // setAskDelete(false)
          setModalOpen(false)
        }
      })
    }

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
          alert('수정 완료')
        },
        onError: () => {
          alert('수정 실패')
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
        <StyledModalContainer className='modal ' onClick={handleCloseModal}>

          <StyledModalBox onClick={(e) => e.stopPropagation()}>
            <StyledCloseBtn onClick={handleCloseModal}>
              <FontAwesomeIcon icon={faX} />
            </StyledCloseBtn>

            {editMode ? (
              <StyledEditBox>
                <StyledEditTitle type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                <StyledEditBtnGroup>
                  <button onClick={() => handleSave(selectedPost._id)}>save</button>
                  <button onClick={() => setEditMode(false)}>cancle</button>
                </StyledEditBtnGroup>
                <StyledEditText value={editText} onChange={(e) => setEditText(e.target.value)} />
              </StyledEditBox>
            )
              :
              (
                <>
                  <StyledTitle>{selectedPost.title}</StyledTitle>
                  <StyledDate>{dayjs(selectedPost.uploadTime).format('MM.DD(dd)')}</StyledDate>

                  {currentUserRole === 'trainer' ?
                    <StyledTrainerFn>
                      <IconButton onClick={handleEdit} sx={{ border: '1px solid' }}>
                        <EditIcon />
                      </IconButton>

                      <IconButton aria-label="delete" sx={{ color: 'darkred', border: '1px solid' }}
                       onClick={()=>handleDelete(selectedPost._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </StyledTrainerFn>
                    :
                    <></>
                  }
                  {selectedPost.images && selectedPost.images.length > 0 && (
                    <StyledImage>
                      {selectedPost.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={'노트이미지'}
                          style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }}
                        />
                      ))}
                    </StyledImage>
                  )}

                  <StyledText>{selectedPost.text}</StyledText>
                </>
              )
            }


          </StyledModalBox>
          {/* {askDelete &&
            <StyledAskDeleteContainer>
              <StyledAskBox>
                <h1>삭제 하시겠습니까?</h1>
                <p>복구 할 수 없습니다.</p>
                <StyledBtns>
                  <FontAwesomeIcon icon={faThumbsUp} className='text-red-700 text-[52px] cursor-pointer hover:opacity-70' 
                    onClick={()=>handleDelete(selectedPost._id)}
                  />
                  <FontAwesomeIcon icon={faThumbsDown} className='text-blue-600 text-[52px] cursor-pointer hover:opacity-70'
                    onClick={() => setAskDelete(false)}
                  />
                </StyledBtns>
              </StyledAskBox>
            </StyledAskDeleteContainer>
          } */}

        </StyledModalContainer>
      )
      }
    </StyledContainer>
  )
}
export default PostListComponent
