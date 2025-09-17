declare module 'react-qr-scanner' {
  import { ComponentType, CSSProperties } from 'react';

  
    // 스캔 결과 함수 타입
    export type OnResultFunction = (data: any, error?: any) => void;
  
    interface QrReaderProps {
      delay?: number;
      facingMode?: 'user' | 'environment';
      onError?: (error: any) => void;
      onScan?: OnResultFunction;
      style?: CSSProperties;
    }
  
    const QrReader: ComponentType<QrReaderProps>;
  
    export default QrReader;
  }
  