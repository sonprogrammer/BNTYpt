/* eslint-disable*/

import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import { LoginComponent, NavbarComponent, TimerComponent } from './components';
import { BodyCheckPage, MainPage, LayoutPage, FoodPage, TodayPage, TimerPage, LandingPage } from './pages';
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
          <FoodPage />
        }/>
        <Route path='/chat' element={
          <TodayPage />
        }/>
        <Route path='/note' element={
          <TimerPage />
        }/>
        </Route>
      </Routes>

    </>
  );
}

export default App;
