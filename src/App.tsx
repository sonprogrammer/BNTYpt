/* eslint-disable*/

import React from 'react';
import logo from './logo.svg';
import './App.css';
import { NavbarComponent, TimerComponent } from './components';
import { MainPage } from './pages';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={
          <MainPage />
        }/>
      </Routes>

    </>
  );
}

export default App;
