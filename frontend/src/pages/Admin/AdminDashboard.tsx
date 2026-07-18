import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Logo from '../../components/Logo';
import { useAuth } from '../../context/useAuth';

const TABS = [
  { to: 'profesionales', label: 'Profesionales' },
  { to: 'pacientes', label: 'Pacientes' },
];

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-brand-cream">
      <header className="bg-white border-b border-slate-200 px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo size={36} />
          <div>
            <h1 className="text-base font-bold text-slate-800 tracking-tight">InterTerapia — Administración</h1>
            <p className="text-xs text-slate-500">Bienvenido/a, {user?.name}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm transition-colors"
        >
          Cerrar sesión
        </button>
      </header>

      <nav className="bg-white border-b border-slate-200 px-8 flex gap-6">
        {TABS.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              `py-3 text-sm font-medium border-b-2 transition-colors ${
                isActive ? 'border-brand-green text-brand-green-dark' : 'border-transparent text-slate-500 hover:text-slate-700'
              }`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>

      <main className="p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
