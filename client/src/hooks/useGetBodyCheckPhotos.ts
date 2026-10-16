import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./useAxiosInterceptor";
import dayjs from "dayjs";
import { userState } from "../state/userState";
import { useRecoilValue } from "recoil";

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


const getBodyCheckPhotos = async (): Promise<BodyCheckPhoto[]> => {
  const res = await axiosInstance.get<BodyCheckRes>('/posts/user')
  return res.data.posts.map(post => ({
    imageUrl: post.images[0],
    uploadTime: dayjs(post.date).format('YYYY-MM-DD'),
    text: post.text,
    imageId: post._id
  })).sort((a, b) => new Date(b.uploadTime).getTime() - new Date(a.uploadTime).getTime())

}

export function useGetBodyCheckPhotos() {
  const user = useRecoilValue(userState)
  return useQuery({
    queryKey: ['bodyCheckPhotos', user.objectId],
    queryFn: () => getBodyCheckPhotos(),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30
  })
}
