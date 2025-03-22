import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import TransportRequest from '../pages/TransportRequest';
import AdminDashboard from '../pages/AdminDashboard';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import PrivateRoute from './PrivateRoute';
import SchoolPage from '../pages/SchoolPage';

function AppRoutes() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/transport-request" element={<TransportRequest />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/school" element={<SchoolPage />} />
          <Route element={<PrivateRoute />}>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default AppRoutes;