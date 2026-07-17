import React, { useState } from 'react';
import { TreePine } from 'lucide-react';
import { useAuth } from '../../context/useAuth';
import ProfessionalsPanel from './ProfessionalsPanel';
import PatientsPanel from './PatientsPanel';

type Tab = 'professionals' | 'patients';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [tab, setTab] = useState<Tab>('professionals');

  return (
    <div className="min-h-screen bg-brand-cream">
      <header className="bg-brand-petrol text-white px-8 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <TreePine className="text-brand-lime" size={26} />
          <div>
            <h1 className="text-lg font-bold tracking-tight">InterTerapia — Panel de Administración</h1>
            <p className="text-sm text-white/70">Bienvenido/a, {user?.name}</p>
          </div>
        </div>
        <button onClick={logout} className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm transition-colors">
          Cerrar sesión
        </button>
      </header>

      <nav className="bg-white border-b border-slate-200 px-8 flex gap-6">
        <button
          onClick={() => setTab('professionals')}
          className={`py-3 text-sm font-medium border-b-2 transition-colors ${
            tab === 'professionals' ? 'border-brand-green text-brand-green-dark' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Profesionales
        </button>
        <button
          onClick={() => setTab('patients')}
          className={`py-3 text-sm font-medium border-b-2 transition-colors ${
            tab === 'patients' ? 'border-brand-green text-brand-green-dark' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Pacientes
        </button>
      </nav>

      <main className="p-8">{tab === 'professionals' ? <ProfessionalsPanel /> : <PatientsPanel />}</main>
    </div>
  );
};

export default AdminDashboard;
