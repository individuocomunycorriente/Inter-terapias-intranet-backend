import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import AdminDashboard from './pages/Admin/AdminDashboard';
import TherapistDashboard from './pages/Therapist/TherapistDashboard';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Ruta Pública Inicial */}
          <Route path="/login" element={<Login />} />

          {/* Rutas Protegidas de Administración */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          {/* Rutas Protegidas de Profesionales/Terapeutas */}
          <Route element={<ProtectedRoute allowedRoles={['professional']} />}>
            <Route path="/dashboard" element={<TherapistDashboard />} />
          </Route>

          {/* Redirección por defecto */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;