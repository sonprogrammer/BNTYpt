import { useState, ChangeEvent, FormEvent } from 'react';
import { FileInputWrapper, PreviewContainer, StyledBtn, StyledContainerForm, StyledSubmitEl, StyledTitle, StyledTitleInput } from './style';
import { useRecoilValue } from 'recoil';
import { userState } from '../../utils/userState';
import { Image as ImageIcon, CloudUpload } from 'lucide-react';
import toast from 'react-hot-toast';
import { BeatLoader } from 'react-spinners';
import { useCreateBodyCheckPost } from '../../hooks/useCreateBodyCheckPost';




const PostForm = ({onSuccess}: {onSuccess: () => void}) => {
  const [text, setText] = useState<string>('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const user = useRecoilValue(userState)

  const { mutate: createPost, isPending} = useCreateBodyCheckPost()

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value);
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files)
      setImages(fileArray);

      const previewUrls = fileArray.map((file) => URL.createObjectURL(file))
      setImagePreview(previewUrls)
    }
  };




  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text || images.length === 0) return toast.error('내용과 사진을 모두 등록해주세요!');

    const toastId = toast.loading('이미지를 업로드 중입니다...');

    createPost({text,files: images, email: user?.email, kakaoId: user?.kakaoId}, {
      onSuccess: () => {
        toast.success('저장 완료', {id: toastId})
        setText('')
        setImages([])
        setImagePreview([])
        onSuccess()
      },
      onError: (error) => {
        console.error(error)
        toast.error('업로드 실패',{ id: toastId})
      }
    })

  };



  return (
    <StyledContainerForm onSubmit={handleSubmit}>
      <StyledTitle>
        <ImageIcon size={20} className="mr-3" />
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
            <CloudUpload size={24} />
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

        <StyledBtn type="submit" disabled={isPending}>
          {isPending ? <BeatLoader color="#fff" size={8} /> : '게시하기'}
        </StyledBtn>
      </StyledSubmitEl>
    </StyledContainerForm>
  );
};

export default PostForm;
