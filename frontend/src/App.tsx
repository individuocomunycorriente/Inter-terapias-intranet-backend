import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicLayout from './pages/Public/PublicLayout';
import Home from './pages/Public/Home';
import AboutUs from './pages/Public/AboutUs';
import ObjectivesMethods from './pages/Public/ObjectivesMethods';
import Professionals from './pages/Public/Professionals';
import Agenda from './pages/Public/Agenda';
import Contact from './pages/Public/Contact';
import Programs from './pages/Public/Programs';
import Login from './pages/Login';
import AdminDashboard from './pages/Admin/AdminDashboard';
import TherapistDashboard from './pages/Therapist/TherapistDashboard';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Fachada pública de difusión, con el acceso profesional como una sección más */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/quienes-somos" element={<AboutUs />} />
            <Route path="/objetivos-y-metodos" element={<ObjectivesMethods />} />
            <Route path="/profesionales" element={<Professionals />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/programas" element={<Programs />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Rutas Protegidas de Administración */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          {/* Rutas Protegidas de Profesionales/Terapeutas */}
          <Route element={<ProtectedRoute allowedRoles={['professional']} />}>
            <Route path="/dashboard" element={<TherapistDashboard />} />
          </Route>

          {/* Redirección por defecto: a la portada pública */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
