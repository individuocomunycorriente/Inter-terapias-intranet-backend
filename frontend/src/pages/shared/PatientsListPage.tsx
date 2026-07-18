import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import type { Patient } from '../../types';
import { listPatients, createPatient, type PatientInput } from '../../api/services/patients';
import { getErrorMessage } from '../../utils/errors';
import { isValidRut, formatRut } from '../../utils/rut';
import SearchInput from '../../components/SearchInput';
import Pagination from '../../components/Pagination';

const EMPTY_FORM: PatientInput = { fullName: '', rut: '', age: 0, contactPhone: '', guardianName: '' };
const PAGE_SIZE = 10;

const PatientsListPage: React.FC = () => {
  const { user } = useAuth();
  const canManage = user?.role === 'admin';

  const [patients, setPatients] = useState<Patient[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState<PatientInput>(EMPTY_FORM);
  const [rutTouched, setRutTouched] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await listPatients({ search, page, pageSize: PAGE_SIZE });
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
  }, [search, page]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const rutIsValid = isValidRut(form.rut);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRutTouched(true);
    if (!rutIsValid) return;

    setSaving(true);
    setError('');
    try {
      await createPatient(form);
      setShowForm(false);
      setForm(EMPTY_FORM);
      setRutTouched(false);
      await load();
    } catch (err) {
      setError(getErrorMessage(err, 'No se pudo crear el paciente.'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <h2 className="text-xl font-semibold text-slate-800">Pacientes</h2>
        <div className="flex items-center gap-3">
          <SearchInput onSearch={handleSearch} placeholder="Buscar por nombre o RUT..." className="w-72" />
          {canManage && (
            <button
              onClick={() => setShowForm((v) => !v)}
              className="bg-brand-green hover:bg-brand-green-dark text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors whitespace-nowrap"
            >
              + Nuevo paciente
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm border border-red-100">{error}</div>
      )}

      {canManage && showForm && (
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 mb-6 space-y-3">
          <h3 className="font-semibold text-slate-700">Nuevo paciente</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              required
              placeholder="Nombre completo"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
            />
            <div>
              <input
                required
                placeholder="RUT (ej. 12.345.678-9)"
                value={form.rut}
                onChange={(e) => setForm({ ...form, rut: e.target.value })}
                onBlur={() => {
                  setRutTouched(true);
                  if (isValidRut(form.rut)) setForm((f) => ({ ...f, rut: formatRut(f.rut) }));
                }}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                  rutTouched && !rutIsValid
                    ? 'border-red-300 focus:ring-red-200 focus:border-red-400'
                    : 'border-slate-200 focus:ring-brand-green/20 focus:border-brand-green'
                }`}
              />
              {rutTouched && !rutIsValid && <p className="text-xs text-red-600 mt-1">RUT inválido.</p>}
            </div>
            <input
              required
              type="number"
              min={0}
              placeholder="Edad"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: Number(e.target.value) })}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
            />
            <input
              placeholder="Teléfono de contacto (opcional)"
              value={form.contactPhone}
              onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
            />
            <input
              placeholder="Nombre del apoderado (opcional)"
              value={form.guardianName}
              onChange={(e) => setForm({ ...form, guardianName: e.target.value })}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm sm:col-span-2 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="bg-brand-green hover:bg-brand-green-dark text-white px-4 py-2 rounded-lg text-sm disabled:opacity-50 transition-colors"
            >
              {saving ? 'Guardando...' : 'Guardar'}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-slate-500 text-sm">Cargando...</p>
      ) : (
        <div className="overflow-x-auto bg-white border border-slate-200 rounded-xl shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-left">
              <tr>
                <th className="px-4 py-2.5 font-medium">Nombre</th>
                <th className="px-4 py-2.5 font-medium">RUT</th>
                <th className="px-4 py-2.5 font-medium">Edad</th>
                <th className="px-4 py-2.5 font-medium">Apoderado</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} className="border-t border-slate-100 hover:bg-slate-50/60">
                  <td className="px-4 py-2.5">
                    <Link to={String(patient.id)} className="text-brand-green-dark hover:underline font-medium">
                      {patient.fullName}
                    </Link>
                  </td>
                  <td className="px-4 py-2.5">{formatRut(patient.rut)}</td>
                  <td className="px-4 py-2.5">{patient.age}</td>
                  <td className="px-4 py-2.5">{patient.guardianName || '—'}</td>
                </tr>
              ))}
              {patients.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-slate-400">
                    {search ? 'No se encontraron pacientes con ese criterio.' : 'Aún no hay pacientes registrados.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <Pagination page={page} pageSize={PAGE_SIZE} total={total} onPageChange={setPage} />
        </div>
      )}
    </div>
  );
};

export default PatientsListPage;
