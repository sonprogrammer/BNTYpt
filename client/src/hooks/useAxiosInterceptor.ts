import axios from "axios";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toast } from "react-hot-toast";


import { accessTokenState } from "../state/userState";
import { axiosInstance } from "../utils/axiosInstance";

export const useAxiosInterceptor = () => {
  const accessToken = useRecoilValue(accessTokenState);
  const setAccessToken = useSetRecoilState(accessTokenState);

  useEffect(() => {
    const requestInterceptor =
      axiosInstance.interceptors.request.use(
        (config) => {
          if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }

          return config;
        },
        (error) => Promise.reject(error)
      );

    const responseInterceptor =
      axiosInstance.interceptors.response.use(
        (res) => res,

        async (error) => {
          const originalRequest = error.config;

          if (
            (error.response?.status === 401  &&
            !originalRequest._retry)
          ) {
            originalRequest._retry = true;

            try {
              const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/user/refresh`,
                {},
                {
                  withCredentials: true,
                }
              );

              const newAccessToken = res.data.accessToken;

              setAccessToken(newAccessToken);

              originalRequest.headers.Authorization =
                `Bearer ${newAccessToken}`;

              return axiosInstance(originalRequest);
            } catch (error) {
              console.error("토큰 갱신 실패", error);

              setAccessToken(null);

              toast.error("토큰 만료, 재로그인 해주세요");

              setTimeout(() => {
                window.location.href = "/";
              }, 1000);
            }
          }

          return Promise.reject(error);
        }
      );

    return () => {
      axiosInstance.interceptors.request.eject(
        requestInterceptor
      );

      axiosInstance.interceptors.response.eject(
        responseInterceptor
      );
    };
  }, [accessToken, setAccessToken]);
};