// hooks/useKakaoLogin.ts

import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import toast from 'react-hot-toast';
import { userState } from '../utils/userState';
import { saveUserToLocalStorage } from '../utils/localStorage';
import { saveAccessToken } from '../utils/accessToken';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

interface KakaoLoginParams {
  kakaoaccessToken: string;
  role: string;
}

interface KakaoLoginResponse {
  success: boolean;
  kakaoId: string;
  name: string;
  objectId: string;
  token: string;
  message?: string;
}

export const useKakaoLogin = () => {
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ kakaoaccessToken, role }: KakaoLoginParams) => {
        const response = await axios.post<KakaoLoginResponse>(
        `${apiUrl}/api/user/login/kakao`,
        {kakaoaccessToken,role},{withCredentials: true}
      )

      return response.data
    },

    onSuccess: (data, variables) => {
      if (!data.success) {
        toast.error(data.message ?? '카카오 로그인에 실패했습니다.');
        return;
      }

      const newUser = {
        kakaoId: data.kakaoId,
        name: data.name,
        role: variables.role,
        objectId: data.objectId,
      };

      setUser(newUser);

      saveUserToLocalStorage(newUser);
      saveAccessToken(data.token);

      navigate('/browse');
    },

    onError: (error) => {
      console.error('카카오 로그인 오류:', error);
      toast.error('카카오 로그인에 실패했습니다.');
    },
  });
};