import React from 'react';
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


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const queryClient = new QueryClient()

root.render(
  <QueryClientProvider client={queryClient}>
  <RecoilRoot>
    <BrowserRouter>
    <Toaster position="top-center" reverseOrder={false} />
      <App />
    </BrowserRouter>
  </RecoilRoot>
  </QueryClientProvider>
);

serviceWorkerRegistration.register();



reportWebVitals();

