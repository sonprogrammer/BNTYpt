import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil'
import './assets/styles/fonts.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { AxiosInterceptor } from './components/AxiosInterceptor';
import { SocketConnection } from './utils/SocketConnection';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const queryClient = new QueryClient()

root.render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <BrowserRouter>
          <Toaster position="top-center" reverseOrder={false} />
        <SocketConnection />
        <AxiosInterceptor>
          <Suspense fallback={
            <div role="status" className="flex min-h-screen items-center justify-center bg-[#111111] text-sm text-gray-400">
              화면을 불러오는 중...
            </div>
          }>


          <App />
          </Suspense>
        </AxiosInterceptor>
      </BrowserRouter>
    </RecoilRoot>
  </QueryClientProvider>
);

serviceWorkerRegistration.register();



reportWebVitals();

