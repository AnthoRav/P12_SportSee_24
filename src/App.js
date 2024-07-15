import React from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import './style/main.scss'

function App() {
  return (
    <div className="App">
      <Header />
      <div className='blockApp'>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Navigate replace to={`/user/12/`} />} />
          <Route path='/user/:userId' element={<Dashboard />} />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
