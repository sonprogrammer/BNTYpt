import { useEffect } from 'react';


const kakaoClientId = process.env.VITE_KAKAO_CLIENT_ID || '';
export function KakaoInitializer() {
    useEffect(() => {
        const initialize = () => {
            if (!window.Kakao) return;
            if (!window.Kakao.isInitialized()) {
                window.Kakao.init(kakaoClientId);
            }
        };

        if (window.Kakao) {
            initialize();
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.8.3/kakao.min.js';
        script.async = true;
        script.onload = initialize;
        script.onerror = () => console.error('카카오 SDK 로드 실패');
        document.head.appendChild(script);
    }, []);

    return null;
}