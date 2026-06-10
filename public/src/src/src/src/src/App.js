import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Companies from './pages/Companies';
import Orders from './pages/Orders';
import Bonuses from './pages/Bonuses';
import Promotions from './pages/Promotions';
import Layout from './components/Layout';

const PrivateRoute = ({ children }) => {
  return localStorage.getItem('token') ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="companies" element={<Companies />} />
          <Route path="orders" element={<Orders />} />
          <Route path="bonuses" element={<Bonuses />} />
          <Route path="promotions" element={<Promotions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
