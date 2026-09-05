import { axiosInstance } from './../utils/axiosInstance';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


const apiUrl = process.env.REACT_APP_API_URL;

interface CreatePostParams {
    text: string;
    files: File[];
    email?: string;
    kakaoId?: string;
}

interface CreatePostRes {
    success: boolean;
    post: {
        images: string[];
        date: string;
    };
}


const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData()

    formData.append('file', file)
    formData.append("upload_preset", "ods04138@gmail.com");

    const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dqrsksfho/image/upload",
        formData
    )

    return res.data.secure_url
}

const createBodyCheckPost = async({text, files, email, kakaoId}: CreatePostParams) => {
    const uploadImageUrls = await Promise.all(files.map(file => uploadImageToCloudinary(file)))

    const body = {text,images: uploadImageUrls, ...(kakaoId ? { kakaoId} : { email})}

    const res = await axiosInstance.post<CreatePostRes>(`${apiUrl}/api/posts`, body)

    return res.data
}

export function useCreateBodyCheckPost() {
    const queyrClient = useQueryClient()

    return useMutation({
        mutationFn: createBodyCheckPost,
        onSuccess: () => {
            queyrClient.invalidateQueries({queryKey: ['bodyCheckPhotos']})
        }
    })
}