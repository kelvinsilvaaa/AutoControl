import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Veiculos from './pages/Veiculos';
import Manutencoes from './pages/Manutencoes';
import Abastecimentos from './pages/Abastecimentos';
import Navbar from './components/Navbar';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <div>
                <Navbar />
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/veiculos" element={<Veiculos />} />
                  <Route path="/manutencoes" element={<Manutencoes />} />
                  <Route path="/abastecimentos" element={<Abastecimentos />} />
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                </Routes>
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
