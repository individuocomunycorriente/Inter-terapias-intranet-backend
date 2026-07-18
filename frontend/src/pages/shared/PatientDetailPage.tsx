import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/useAuth';
import type { PatientFile, ClinicalReport } from '../../types';
import { getPatientFile, updatePatient, deletePatient, type PatientInput } from '../../api/services/patients';
import { createReport, updateReport, deleteReport } from '../../api/services/reports';
import { getErrorMessage } from '../../utils/errors';
import { isValidRut, formatRut } from '../../utils/rut';
import ReportForm, { type ReportFormValues } from '../Therapist/ReportForm';

const PatientDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const patientId = Number(id);
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const [file, setFile] = useState<PatientFile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showNewForm, setShowNewForm] = useState(false);
  const [editingReport, setEditingReport] = useState<ClinicalReport | null>(null);
  const [editingPatient, setEditingPatient] = useState(false);
  const [patientForm, setPatientForm] = useState<PatientInput | null>(null);
  const [rutTouched, setRutTouched] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      setFile(await getPatientFile(patientId));
    } catch (err) {
      setError(getErrorMessage(err, 'No se pudo cargar la ficha del paciente.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- resetea el formulario y recarga la ficha al cambiar de paciente seleccionado */
    setShowNewForm(false);
    setEditingReport(null);
    setEditingPatient(false);
    load();
    /* eslint-enable react-hooks/set-state-in-effect */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientId]);

  const handleCreateReport = async (values: ReportFormValues) => {
    await createReport({ patientId, ...values });
    setShowNewForm(false);
    await load();
  };

  const handleUpdateReport = async (values: ReportFormValues) => {
    if (!editingReport) return;
    await updateReport(editingReport.id, values);
    setEditingReport(null);
    await load();
  };

  const handleDeleteReport = async (report: ClinicalReport) => {
    if (!window.confirm('¿Eliminar este informe? Esta acción no se puede deshacer.')) return;
    try {
      await deleteReport(report.id);
      await load();
    } catch (err) {
      setError(getErrorMessage(err, 'No se pudo eliminar el informe.'));
    }
  };

  const startEditPatient = () => {
    if (!file) return;
    setPatientForm({
      fullName: file.fullName,
      rut: formatRut(file.rut),
      age: file.age,
      contactPhone: file.contactPhone || '',
      guardianName: file.guardianName || '',
    });
    setRutTouched(false);
    setEditingPatient(true);
  };

  const handleSavePatient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientForm || !isValidRut(patientForm.rut)) {
      setRutTouched(true);
      return;
    }
    setSaving(true);
    setError('');
    try {
      await updatePatient(patientId, patientForm);
      setEditingPatient(false);
      await load();
    } catch (err) {
      setError(getErrorMessage(err, 'No se pudo actualizar el paciente.'));
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePatient = async () => {
    if (!file) return;
    if (!window.confirm(`¿Eliminar a ${file.fullName} y todo su historial? Esta acción no se puede deshacer.`)) return;
    try {
      await deletePatient(patientId);
      navigate('..', { relative: 'path' });
    } catch (err) {
      setError(getErrorMessage(err, 'No se pudo eliminar el paciente.'));
    }
  };

  if (loading) return <p className="text-slate-500 text-sm">Cargando ficha del paciente...</p>;
  if (error && !file) return <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">{error}</div>;
  if (!file) return null;

  const rutIsValid = patientForm ? isValidRut(patientForm.rut) : false;

  return (
    <div className="space-y-6">
      <Link to=".." relative="path" className="inline-flex items-center gap-1.5 text-sm text-brand-green-dark hover:underline">
        <ArrowLeft size={16} /> Volver al listado
      </Link>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">{error}</div>
      )}

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
        {!editingPatient ? (
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">{file.fullName}</h2>
              <p className="text-sm text-slate-500">
                RUT: {formatRut(file.rut)} · Edad: {file.age}{' '}
                {file.guardianName ? `· Apoderado/a: ${file.guardianName}` : ''}
                {file.contactPhone ? ` · Tel: ${file.contactPhone}` : ''}
              </p>
            </div>
            {isAdmin && (
              <div className="flex gap-3 shrink-0">
                <button onClick={startEditPatient} className="text-brand-green-dark text-sm font-medium hover:underline">
                  Editar
                </button>
                <button onClick={handleDeletePatient} className="text-red-600 text-sm font-medium hover:underline">
                  Eliminar
                </button>
              </div>
            )}
          </div>
        ) : (
          patientForm && (
            <form onSubmit={handleSavePatient} className="space-y-3">
              <h3 className="font-semibold text-slate-700">Editar datos del paciente</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  required
                  placeholder="Nombre completo"
                  value={patientForm.fullName}
                  onChange={(e) => setPatientForm({ ...patientForm, fullName: e.target.value })}
                  className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
                />
                <div>
                  <input
                    required
                    placeholder="RUT"
                    value={patientForm.rut}
                    onChange={(e) => setPatientForm({ ...patientForm, rut: e.target.value })}
                    onBlur={() => {
                      setRutTouched(true);
                      if (isValidRut(patientForm.rut)) setPatientForm({ ...patientForm, rut: formatRut(patientForm.rut) });
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
                  value={patientForm.age}
                  onChange={(e) => setPatientForm({ ...patientForm, age: Number(e.target.value) })}
                  className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
                />
                <input
                  placeholder="Teléfono de contacto (opcional)"
                  value={patientForm.contactPhone}
                  onChange={(e) => setPatientForm({ ...patientForm, contactPhone: e.target.value })}
                  className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
                />
                <input
                  placeholder="Nombre del apoderado (opcional)"
                  value={patientForm.guardianName}
                  onChange={(e) => setPatientForm({ ...patientForm, guardianName: e.target.value })}
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
                  onClick={() => setEditingPatient(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )
        )}
      </div>

      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-700">Historial de informes</h3>
        {user?.role === 'professional' && !showNewForm && (
          <button
            onClick={() => setShowNewForm(true)}
            className="bg-brand-green hover:bg-brand-green-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            + Nuevo informe
          </button>
        )}
      </div>

      {showNewForm && (
        <ReportForm submitLabel="Enviar informe" onSubmit={handleCreateReport} onCancel={() => setShowNewForm(false)} />
      )}

      <div className="space-y-4">
        {file.clinicalReports.length === 0 && (
          <p className="text-slate-400 text-sm">Este paciente aún no tiene informes registrados.</p>
        )}
        {file.clinicalReports.map((report) => {
          const canEdit = isAdmin || (user?.role === 'professional' && report.professionalId === user.id);
          const isEditing = editingReport?.id === report.id;

          if (isEditing) {
            return (
              <ReportForm
                key={report.id}
                initial={report}
                submitLabel="Guardar cambios"
                onSubmit={handleUpdateReport}
                onCancel={() => setEditingReport(null)}
              />
            );
          }

          return (
            <div key={report.id} className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-slate-700">
                  {report.professional?.name} · {report.professional?.specialty}
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400">{new Date(report.date).toLocaleDateString('es-CL')}</span>
                  {canEdit && (
                    <button onClick={() => setEditingReport(report)} className="text-brand-green-dark text-sm hover:underline font-medium">
                      Editar
                    </button>
                  )}
                  {isAdmin && (
                    <button onClick={() => handleDeleteReport(report)} className="text-red-600 text-sm hover:underline font-medium">
                      Eliminar
                    </button>
                  )}
                </div>
              </div>
              <dl className="text-sm text-slate-600 space-y-1">
                <div>
                  <dt className="font-medium text-slate-500 inline">Objetivo terapéutico: </dt>
                  <dd className="inline">{report.therapeuticGoal}</dd>
                </div>
                <div>
                  <dt className="font-medium text-slate-500 inline">Actividad realizada: </dt>
                  <dd className="inline">{report.activityPerformed}</dd>
                </div>
                <div>
                  <dt className="font-medium text-slate-500 inline">Cumplimiento de logros: </dt>
                  <dd className="inline">{report.goalsAchieved}</dd>
                </div>
                <div>
                  <dt className="font-medium text-slate-500 inline">Observaciones clínicas: </dt>
                  <dd className="inline">{report.clinicalObservations}</dd>
                </div>
                <div>
                  <dt className="font-medium text-slate-500 inline">Observación de trato/conducta: </dt>
                  <dd className="inline">{report.behaviorObservation}</dd>
                </div>
                {report.additionalComments && (
                  <div>
                    <dt className="font-medium text-slate-500 inline">Observaciones adicionales: </dt>
                    <dd className="inline">{report.additionalComments}</dd>
                  </div>
                )}
              </dl>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PatientDetailPage;
