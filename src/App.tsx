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
        <Route path='/landing' element={
          <LandingPage />
        }/>
        <Route element={
          <Suspense fallback={<div></div>}>
              <LayoutPage />
          </Suspense>
        }>
        <Route path='/' element={
          <MainPage />
        }/>
        <Route path='/bodycheck' element={
          <BodyCheckPage />
        }/>
        <Route path='/food' element={
          <FoodPage />
        }/>
        <Route path='/today' element={
          <TodayPage />
        }/>
        <Route path='/timer' element={
          <TimerPage />
        }/>
        </Route>
      </Routes>

    </>
  );
}

export default App;
