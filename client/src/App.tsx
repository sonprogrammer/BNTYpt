/* eslint-disable */
import { Suspense, lazy } from 'react'
import './App.css'
import { NotFoundComponent } from './components'
import { Route, Routes } from 'react-router-dom'
import { BodyCheckPageSkeleton, CalendarPageSkeleton, ChatPageSkeleton, ChatRoomPageSkeleton, LandingPageSplash, MainPageSkeleton, NotePageSkeleton } from './skeleton';







const LandingPage = lazy(() =>
  new Promise<{ default: React.ComponentType<any> }>(resolve => {
    setTimeout(() => {
      import('./pages/LandingPage').then(module => resolve({ default: module.LandingPage }));
    }, 2000); // 2초 지연
  })
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
          <Suspense fallback={<LandingPageSplash />}>
            <LandingPage />
          </Suspense>
        } />
        

        <Route path='*' element={<NotFoundComponent />} />

        <Route element={<LayoutPage />}>
          <Route path='/browse' element={
            <Suspense fallback={<MainPageSkeleton />}>
              <MainPage />
            </Suspense>
          } />
          <Route path='/bodycheck' element={
            <Suspense fallback={<BodyCheckPageSkeleton />}>
              <BodyCheckPage />
            </Suspense>
          } />
          <Route path='/calendar' element={
            <Suspense fallback={<CalendarPageSkeleton />}>
              <CalendarPage />
            </Suspense>
          } />
          <Route path='/chat' element={
            <Suspense fallback={<ChatPageSkeleton />}>
              <ChatPage />
            </Suspense>
          } />
          <Route path='/chat/:userId' element={
            <Suspense fallback={<ChatRoomPageSkeleton />}>
              <ChatRoomPage />
            </Suspense>
          } />
          <Route path='/note' element={
            <Suspense fallback={<NotePageSkeleton />}>
              <NotePage />
            </Suspense>
          } />
        </Route>
      </Routes>

    </>
  )
}

export default App
