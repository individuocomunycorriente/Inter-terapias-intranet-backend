import React from 'react';
import { useAuth } from '../../context/AuthContext';

const TherapistDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-600">Panel Clínico (Fono/Kine)</h1>
      <p className="mt-2">Bienvenido Terapeuta: {user?.name}</p>
      <p className="text-sm text-slate-500">Aquí podrás ver tus pacientes asignados y redactar reportes de evolución.</p>
      <button onClick={logout} className="mt-4 bg-slate-800 text-white px-4 py-2 rounded-lg">Cerrar Sesión</button>
    </div>
  );
};
export default TherapistDashboard;