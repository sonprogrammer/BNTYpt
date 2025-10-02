// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAAfr4LOJTjPfdvvMPDxXdrQ6uy5pnPk84",
  authDomain: "bnty-949aa.firebaseapp.com",
  projectId: "bnty-949aa",
  storageBucket: "bnty-949aa.firebasestorage.app",
  messagingSenderId: "373814333941",
  appId: "1:373814333941:web:5468514bd59d17344e10bc",
  measurementId: "G-LB0W3QDM0X"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// 알림 권한 요청 및 토큰 발급
export const requestPermission = async (): Promise<string | null> => {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    try {
      // serviceWorker 등록 필수
      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
      const token = await getToken(messaging, {
        vapidKey: "BBUGNmLg5XoINYIHz63xQmot2OXkKoIq2afKJLcUN5xFG2sq-1ZvsGZFtN3kLFqhQLSyzX3ZpyHuqLgPzn4U1F4",
        serviceWorkerRegistration: registration
      });
      console.log("FCM 토큰:", token);
      return token;
    } catch (err) {
      console.log("FCM 토큰 발급 실패:", err);
      return null;
    }
  } else {
    console.log("알림 권한 거부됨");
    return null;
  }
};

// 앱 켜져 있을 때 메시지 수신
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => resolve(payload));
  });

export default messaging;
