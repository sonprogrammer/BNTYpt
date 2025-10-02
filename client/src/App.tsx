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
      <Suspense fallback={<div>로딩중...</div>}>

        <Routes>
          <Route path='/' element={<LandingPage />} />

          <Route path='*' element={<NotFoundComponent />} />

          <Route element={<LayoutPage />}>
            <Route path='/browse' element={<MainPage />} />
            <Route path='/bodycheck' element={<BodyCheckPage />} />
            <Route path='/calendar' element={<CalendarPage />} />
            <Route path='/chat' element={<ChatPage />} />
            <Route path='/chat/:userId' element={<ChatRoomPage />} />
            <Route path='/note' element={<NotePage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default App
