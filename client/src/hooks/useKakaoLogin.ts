import toast from 'react-hot-toast';


export const useKakaoLogin = () => {

  const handleKakaoLogin = () => {
    if (!window.Kakao || !window.Kakao.isInitialized()) {
      toast.error('카카오 로그인을 준비 중입니다.')
      return
    }

    window.Kakao.Auth.authorize({
      redirectUri: `${window.location.origin}/callback`,
      throughTalk: false
    })
  }

  return { handleKakaoLogin };
};


