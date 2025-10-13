/* eslint-disable */
import { Suspense, lazy } from 'react'
import './App.css'
import { NotFoundComponent } from './components'
import { Route, Routes } from 'react-router-dom'



export const LandingPage = lazy(() =>
  import('./pages/LandingPage').then(module => ({ default: module.LandingPage }))
);
export const MainPage = lazy(() =>
  import('./pages/MainPage').then(module => ({ default: module.MainPage }))
);
export const BodyCheckPage = lazy(() =>
  import('./pages/BodyCheckPage').then(module => ({ default: module.BodyCheckPage }))
);
export const CalendarPage = lazy(() =>
  import('./pages/CalendarPage').then(module => ({ default: module.CalendarPage }))
);
export const LayoutPage = lazy(() =>
  import('./pages/LayoutPage').then(module => ({ default: module.LayoutPage }))
);
export const ChatPage = lazy(() =>
  import('./pages/ChatPage').then(module => ({ default: module.ChatPage }))
);
export const NotePage = lazy(() =>
  import('./pages/NotePage').then(module => ({ default: module.NotePage }))
);
export const ChatRoomPage = lazy(() =>
  import('./pages/ChatRoomPage').then(module => ({ default: module.ChatRoomPage }))
);

function App() {


  return (
    <>
      <Routes>
  <Route path='/' element={
    <Suspense fallback={<div>로딩중...</div>}>
      <LandingPage />
    </Suspense>
  } />

  <Route path='*' element={<NotFoundComponent />} />

  <Route element={<LayoutPage />}>
    <Route path='/browse' element={
      <Suspense fallback={<div>로딩중...</div>}>
        <MainPage />
      </Suspense>
    } />
    <Route path='/bodycheck' element={
      <Suspense fallback={<div>로딩중...</div>}>
        <BodyCheckPage />
      </Suspense>
    } />
    <Route path='/calendar' element={
      <Suspense fallback={<div>로딩중...</div>}>
        <CalendarPage />
      </Suspense>
    } />
    <Route path='/chat' element={
      <Suspense fallback={<div>로딩중...</div>}>
        <ChatPage />
      </Suspense>
    } />
    <Route path='/chat/:userId' element={
      <Suspense fallback={<div>로딩중...</div>}>
        <ChatRoomPage />
      </Suspense>
    } />
    <Route path='/note' element={
      <Suspense fallback={<div>로딩중...</div>}>
        <NotePage />
      </Suspense>
    } />
  </Route>
</Routes>

    </>
  )
}

export default App
