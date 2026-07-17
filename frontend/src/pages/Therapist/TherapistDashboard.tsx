import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/useAuth';
import type { Patient } from '../../types';
import { listPatients } from '../../api/services/patients';
import { getErrorMessage } from '../../utils/errors';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import SearchInput from '../../components/SearchInput';
import Pagination from '../../components/Pagination';
import PatientDetail from './PatientDetail';

const PAGE_SIZE = 8;

const TherapistDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await listPatients({ search: debouncedSearch, page, pageSize: PAGE_SIZE });
      setPatients(result.items);
      setTotal(result.total);
    } catch (err) {
      setError(getErrorMessage(err, 'No se pudo cargar el listado de pacientes.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- carga el listado al montar y cuando cambian búsqueda/página
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, page]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-brand-cream">
      <header className="bg-brand-petrol text-white px-8 py-4 flex items-center justify-between shadow-sm">
        <div>
          <h1 className="text-lg font-bold tracking-tight">InterTerapia — Panel Clínico</h1>
          <p className="text-sm text-white/70">
            Bienvenido/a, {user?.name} {user?.specialty ? `(${user.specialty})` : ''}
          </p>
        </div>
        <button onClick={logout} className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm transition-colors">
          Cerrar sesión
        </button>
      </header>

      <main className="p-8 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
        <aside className="bg-white border border-slate-200 rounded-xl shadow-sm h-fit">
          <div className="p-4">
            <h2 className="font-semibold text-slate-700 mb-3">Pacientes</h2>
            <SearchInput value={search} onChange={handleSearchChange} placeholder="Buscar por nombre..." />
          </div>
          {error && <p className="text-red-600 text-sm px-4">{error}</p>}
          <ul className="max-h-[55vh] overflow-y-auto px-2">
            {loading && <li className="text-slate-400 text-sm px-3 py-2">Cargando...</li>}
            {!loading &&
              patients.map((patient) => (
                <li key={patient.id}>
                  <button
                    onClick={() => setSelectedId(patient.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedId === patient.id ? 'bg-brand-lime-light text-brand-green-dark font-medium' : 'hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    {patient.fullName}
                  </button>
                </li>
              ))}
            {!loading && patients.length === 0 && (
              <li className="text-slate-400 text-sm px-3 py-2">Sin resultados.</li>
            )}
          </ul>
          <Pagination page={page} pageSize={PAGE_SIZE} total={total} onPageChange={setPage} />
        </aside>

        <section>
          {selectedId ? (
            <PatientDetail patientId={selectedId} />
          ) : (
            <p className="text-slate-400 text-sm">Selecciona un paciente para ver su ficha e informes.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default TherapistDashboard;
