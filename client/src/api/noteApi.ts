import { axiosInstance } from "../utils/axiosInstance";


const apiUrl = process.env.REACT_APP_API_URL;

// 회원별 노트 가져오기 - trainerId는 선택적
export const getMemberNotes = async (memberId: string, trainerId?: string) => {
  const res = await axiosInstance.get(`${apiUrl}/api/records/member/${memberId}`, {
    params: trainerId ? { trainerId } : {},
  });
  return res.data.records;
};