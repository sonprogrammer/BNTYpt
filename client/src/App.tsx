/* eslint-disable*/

import React, { Suspense } from 'react';
import './App.css';
import { LoginComponent, NavbarComponent, TimerComponent } from './components';
import { BodyCheckPage, MainPage, LayoutPage, TodayPage, TimerPage, LandingPage, CalendarPage, ChatPage, NotePage, ChatRoomPage } from './pages';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={
          <LandingPage />
        }/>
        <Route element={
          <Suspense fallback={<div></div>}>
              <LayoutPage />
          </Suspense>
        }>
        <Route path='/browse' element={
          <MainPage />
        }/>
        <Route path='/bodycheck' element={
          <BodyCheckPage />
        }/>
        <Route path='/calendar' element={
          <CalendarPage />
        }/>
        <Route path='/chat' element={
          <ChatPage />
        }/>
        <Route path='/chat/:userId' element={
          <ChatRoomPage />
        }/>
        <Route path='/note' element={
            <NotePage />
        }/>
        </Route>
      </Routes>

    </>
  );
}

export default App;
