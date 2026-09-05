import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance";
import dayjs from "dayjs";

const apiUrl = process.env.REACT_APP_API_URL;

interface BodyCheckPost {
  _id: string;
  images: string[]
  date: string;
  text: string;
}

interface BodyCheckRes {
  posts: BodyCheckPost[]
}
export interface BodyCheckPhoto {
  imageUrl: string;
  uploadTime: string;
  text: string;
  imageId: string;
}


const getBodyCheckPhotos = async (email?: string, kakaoId?: string): Promise<BodyCheckPhoto[]> => {
  let url = ``

  if (email) {
    url = `${apiUrl}/api/posts/user/email/${email}`
  } else if (kakaoId) {
    url = `${apiUrl}/api/posts/user/kakao/${kakaoId}`
  }

  const res = await axiosInstance.get<BodyCheckRes>(url)

  return res.data.posts.map(post => ({
    imageUrl: post.images[0],
    uploadTime: dayjs(post.date).format('YYYY-MM-DD'),
    text: post.text,
    imageId: post._id
  })).sort((a,b) => new Date(b.uploadTime).getTime() - new Date(a.uploadTime).getTime())

}

export function useGetBodyCheckPhotos(email?:string, kakaoId?:string){
  return useQuery({
    queryKey: ['bodyCheckPhotos', email, kakaoId],
    queryFn: () => getBodyCheckPhotos(email, kakaoId),
    enabled: !!email || !kakaoId
  })
}
