import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import TransportRequestPage from '../pages/TransportRequestPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import PrivateRoute from './PrivateRoute';
import SchoolPage from '../pages/SchoolPage';
import StudentPage from '../pages/StudentPage';

function AppRoutes() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/transport-request" element={<TransportRequestPage />} />
          <Route path="/school" element={<SchoolPage />} />
          <Route path="/student" element={<StudentPage />} />
          <Route element={<PrivateRoute />}>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default AppRoutes;