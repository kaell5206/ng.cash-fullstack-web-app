import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyProvider from './Provider/MyProvider';
import './App.css';
import Login from './Pages/Login/login';
import Register from './Pages/Register/register';
import Header from './Components/header';
import Dashboard from './Pages/Dashboard/dashboard';
import Pix from './Pages/Dashboard/Transaction/Pix';
import Footer from './Components/footer';

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
          <Route path='/user/pix' element={ <Pix /> } />
        </Routes>
        </main>
        <Footer />
      </MyProvider>
    </BrowserRouter>
  );
}

export default App;
