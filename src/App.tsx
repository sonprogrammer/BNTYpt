/* eslint-disable*/

import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import { LoginComponent, NavbarComponent, TimerComponent } from './components';
import { BodyCheckPage, MainPage, LayoutPage } from './pages';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>

      <Routes>
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
        </Route>
      </Routes>

    </>
  );
}

export default App;
