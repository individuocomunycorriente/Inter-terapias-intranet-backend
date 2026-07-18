import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/useAuth';
import type { Professional } from '../../types';
import {
  getProfessionalById,
  updateProfessional,
  updateOwnProfile,
  deleteProfessional,
  type ProfessionalInput,
  type OwnProfileInput,
} from '../../api/services/professionals';
import { getErrorMessage } from '../../utils/errors';

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

const ProfessionalDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const professionalId = Number(id);
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const isSelf = user?.role === 'professional' && user.id === professionalId;
  const canEdit = isAdmin || isSelf;

  const [professional, setProfessional] = useState<Professional | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<Partial<ProfessionalInput>>({});
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      setProfessional(await getProfessionalById(professionalId));
    } catch (err) {
      setError(getErrorMessage(err, 'No se pudo cargar el perfil del profesional.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- carga el perfil al montar o cambiar de profesional
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [professionalId]);

  const startEdit = () => {
    if (!professional) return;
    setForm({
      name: professional.name,
      email: professional.email,
      specialty: professional.specialty,
      imageUrl: professional.imageUrl || '',
      password: '',
    });
    setEditing(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (isAdmin) {
        const payload: Partial<ProfessionalInput> = { ...form };
        if (!payload.password) delete payload.password;
        await updateProfessional(professionalId, payload);
      } else {
        const payload: OwnProfileInput = {
          name: form.name,
          specialty: form.specialty,
          imageUrl: form.imageUrl,
        };
        if (form.password) payload.password = form.password;
        await updateOwnProfile(payload);
      }
      setEditing(false);
      await load();
    } catch (err) {
      setError(getErrorMessage(err, 'No se pudo guardar el perfil.'));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!professional) return;
    if (!window.confirm(`¿Eliminar a ${professional.name}? Esta acción no se puede deshacer.`)) return;
    setError('');
    try {
      await deleteProfessional(professionalId);
      navigate('..', { relative: 'path' });
    } catch (err) {
      setError(getErrorMessage(err, 'No se pudo eliminar el profesional.'));
    }
  };

  if (loading) return <p className="text-slate-500 text-sm">Cargando perfil...</p>;
  if (error && !professional) return <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">{error}</div>;
  if (!professional) return null;

  return (
    <div className="max-w-2xl space-y-6">
      <Link to=".." relative="path" className="inline-flex items-center gap-1.5 text-sm text-brand-green-dark hover:underline">
        <ArrowLeft size={16} /> Volver al listado
      </Link>

      {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">{error}</div>}

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
        {!editing ? (
          <div className="flex items-start gap-5">
            {professional.imageUrl ? (
              <img src={professional.imageUrl} alt={professional.name} className="w-20 h-20 rounded-full object-cover shrink-0" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-brand-lime-light text-brand-green-dark flex items-center justify-center text-xl font-bold shrink-0">
                {getInitials(professional.name)}
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-slate-800">{professional.name}</h2>
                  <p className="text-brand-green-dark font-medium text-sm">{professional.specialty}</p>
                  <p className="text-slate-500 text-sm mt-1">{professional.email}</p>
                </div>
                {canEdit && (
                  <div className="flex gap-3 shrink-0">
                    <button onClick={startEdit} className="text-brand-green-dark text-sm font-medium hover:underline">
                      Editar
                    </button>
                    {isAdmin && (
                      <button onClick={handleDelete} className="text-red-600 text-sm font-medium hover:underline">
                        Eliminar
                      </button>
                    )}
                  </div>
                )}
              </div>
              {isSelf && (
                <p className="text-xs text-slate-400 mt-3">
                  Puedes editar tu nombre, especialidad, foto y contraseña. Para cambiar tu correo institucional, contacta al administrador.
                </p>
              )}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <h3 className="font-semibold text-slate-700">{isAdmin ? 'Editar profesional' : 'Editar mi perfil'}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                required
                placeholder="Nombre completo"
                value={form.name || ''}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
              />
              <input
                required
                type="email"
                placeholder="correo@interterapia.cl"
                value={form.email || ''}
                disabled={!isAdmin}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="border border-slate-200 rounded-lg px-3 py-2 text-sm disabled:bg-slate-50 disabled:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
              />
              <input
                required
                placeholder="Especialidad"
                value={form.specialty || ''}
                onChange={(e) => setForm({ ...form, specialty: e.target.value })}
                className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
              />
              <input
                type="password"
                placeholder="Nueva contraseña (opcional)"
                value={form.password || ''}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
              />
              <input
                placeholder="URL de foto (opcional)"
                value={form.imageUrl || ''}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                className="border border-slate-200 rounded-lg px-3 py-2 text-sm sm:col-span-2 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={saving}
                className="bg-brand-green hover:bg-brand-green-dark text-white px-4 py-2 rounded-lg text-sm disabled:opacity-50 transition-colors"
              >
                {saving ? 'Guardando...' : 'Guardar cambios'}
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfessionalDetailPage;
