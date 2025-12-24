declare module 'react-qr-scanner' {
  import { ComponentType, CSSProperties } from 'react';

  
    export type OnResultFunction = (data: any, error?: any) => void;
  
    interface QrReaderProps {
      delay?: number;
      facingMode?: 'user' | 'environment';
      onError?: (error: any) => void;
      onScan?: OnResultFunction;
      style?: CSSProperties;
      constraints?: {
        audio?: boolean;
        video?: {
            facingMode?: { exact: string } | string;
            [key: string]: any;

        }
    }
    }
  
    const QrReader: ComponentType<QrReaderProps>;
  
    export default QrReader;
  }
  