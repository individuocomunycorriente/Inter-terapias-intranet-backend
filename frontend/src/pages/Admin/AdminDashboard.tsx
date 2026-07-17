import React from 'react';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-red-600">Panel de Administración</h1>
      <p className="mt-2">Bienvenido Administrador: {user?.name}</p>
      <p className="text-sm text-slate-500">Aquí crearás, editarás y eliminarás profesionales de @interterapia.cl.</p>
      <button onClick={logout} className="mt-4 bg-slate-800 text-white px-4 py-2 rounded-lg">Cerrar Sesión</button>
    </div>
  );
};
export default AdminDashboard;