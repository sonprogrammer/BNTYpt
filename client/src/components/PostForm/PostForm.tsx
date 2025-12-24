import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FileInputWrapper, PreviewContainer, StyledBtn, StyledContainerForm, StyledSubmitEl, StyledTitle, StyledTitleInput } from './style';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userState } from '../../utils/userState';
import { axiosInstance } from '../../utils/axiosInstance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp, faImage } from '@fortawesome/free-solid-svg-icons'
import toast from 'react-hot-toast';
import { BeatLoader } from 'react-spinners';
const apiUrl = process.env.REACT_APP_API_URL;



interface PostFormProps {
  addPost: (post: { text: string; images: string[]; uploadTime: string; }) => void;
}


const PostForm = ({ addPost } : PostFormProps) => {
  const [text, setText] = useState<string>('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false)
  const [user] = useRecoilState(userState)


  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value);
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files)
      setImages(fileArray);

      const previewUrls = fileArray.map((file) => URL.createObjectURL(file))
      setImagePreview(previewUrls)
    }
  };

//*추가
  const uploadImageToCloudinary = async(file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file)
    formData.append('upload_preset', 'ods04138@gmail.com')
    const res = await axios.post('https://api.cloudinary.com/v1_1/dqrsksfho/image/upload', formData);
    return res.data.secure_url
  }



  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text || images.length === 0) return toast.error('내용과 사진을 모두 등록해주세요!');

    setLoading(true);
    const toastId = toast.loading('이미지를 업로드 중입니다...');

    try {
      const uploadedImageUrls = await Promise.all(
        images.map(image => uploadImageToCloudinary(image))
      );
      
      const formData: Record<string, any> = {
        text,
        images: uploadedImageUrls
      };

      let res;
      if (user.kakaoId) {
        formData['kakaoId'] = user.kakaoId;
        res = await axios.post(`${apiUrl}/api/posts`, formData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.kakaoAccessToken}`
          }
        });
      } else {
        formData['email'] = user.email;
        res = await axiosInstance.post(`${apiUrl}/api/posts`, formData);
      }

      if (res.data.success) {
        toast.success('기록이 저장되었습니다! 💪', { id: toastId });
        addPost({ text, images: res.data.post.images, uploadTime: res.data.post.date });
        setText('');
        setImages([]);
        setImagePreview([]);
      }
    } catch (error) {
      console.error('Error', error);
      toast.error('업로드에 실패했습니다.', { id: toastId });
    } finally {
      setLoading(false);
    }
  };



  return (
    <StyledContainerForm onSubmit={handleSubmit}>
      <StyledTitle>
        <FontAwesomeIcon icon={faImage} className="mr-3" />
        오늘의 기록
      </StyledTitle>
      
      <StyledTitleInput
        placeholder="어떤 운동을 하셨나요? (예: 오운완! 가슴 운동 완료)"
        value={text}
        onChange={handleTextChange}
      />

      <StyledSubmitEl>
        <FileInputWrapper>
          <input type="file" id="file-upload" multiple accept="image/*" onChange={handleImageChange} />
          <label htmlFor="file-upload">
            <FontAwesomeIcon icon={faCloudArrowUp} size="lg" />
            <span>{images.length > 0 ? `${images.length}장의 사진 선택됨` : '사진 올리기 (클릭)'}</span>
          </label>
        </FileInputWrapper>

        <PreviewContainer>
          {imagePreview.length > 0 ? (
            imagePreview.map((preview, index) => (
              <img key={index} src={preview} alt={`미리보기 ${index + 1}`} />
            ))
          ) : (
            <div className="empty-preview">선택된 사진이 없습니다.</div>
          )}
        </PreviewContainer>

        <StyledBtn type="submit" disabled={loading}>
          {loading ? <BeatLoader color="#fff" size={8} /> : '게시하기'}
        </StyledBtn>
      </StyledSubmitEl>
    </StyledContainerForm>
  );
};

export default PostForm;
