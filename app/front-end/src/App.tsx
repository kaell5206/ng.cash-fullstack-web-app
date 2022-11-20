import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyProvider from './Provider/MyProvider';
import './App.css';
import Login from './Pages/Login/login';
import Register from './Pages/Register/register';
import Header from './Components/header';
import Dashboard from './Pages/Dashboard/dashboard';

function App() {
  return (
    <BrowserRouter>
      <MyProvider>
        <main>
        <Header />
        <Routes>
          <Route path='/' element={ <Login /> } />
          <Route path='/register' element={ <Register /> } />
          <Route path='/user/dashboard' element={ <Dashboard /> } />
        </Routes>
        </main>
      </MyProvider>
    </BrowserRouter>
  );
}

export default App;
