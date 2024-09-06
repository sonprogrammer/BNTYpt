import React, { useState, ChangeEvent, FormEvent } from 'react';

interface PostFormProps {
  addPost: (post: { text: string; image: File | null; date: Date; }) => void;
}

const PostForm = ({ addPost } : PostFormProps) => {
  const [text, setText] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value);
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text && !image) return;

    const currentDate = new Date()
    
    addPost({ text, image, date: currentDate});
    setText('');
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-md shadow-md">
      <textarea
        placeholder="무슨 생각을 하고 있나요?"
        value={text}
        onChange={handleTextChange}
        className="w-full p-2 border rounded-md"
      />
      <input type="file" accept="image/*" onChange={handleImageChange} className="my-2" />
      <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
        게시하기
      </button>
    </form>
  );
};

export default PostForm;
