import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import { default_userId } from './service/config';

 const Router = () => {
  return (
    <Routes>
          <Route path="/" element={<Navigate replace to={`/user/${default_userId}/`} />} />
          <Route path='/user/:userId' element={<Dashboard />} />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
  )
}

export default Router