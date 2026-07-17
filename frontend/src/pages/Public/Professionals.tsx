import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { PublicProfessional } from '../../types';
import { getPublicProfessionals } from '../../api/services/professionals';
import { getErrorMessage } from '../../utils/errors';

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

const Professionals: React.FC = () => {
  const [professionals, setProfessionals] = useState<PublicProfessional[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getPublicProfessionals()
      .then(setProfessionals)
      .catch((err) => setError(getErrorMessage(err, 'No se pudo cargar el listado de profesionales.')))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className="text-brand-green-dark font-semibold tracking-wide text-sm uppercase mb-2">Profesionales</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3">Un equipo interdisciplinario comprometido con tu bienestar</h1>
        <p className="text-slate-500">
          Cada profesional aporta desde su especialidad para ofrecerte una atención integral, humana y de calidad.
        </p>
      </div>

      {loading && <p className="text-center text-slate-400 text-sm">Cargando profesionales...</p>}
      {error && <p className="text-center text-red-600 text-sm">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {professionals.map((professional) => (
            <div
              key={professional.id}
              className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              {professional.imageUrl ? (
                <img src={professional.imageUrl} alt={professional.name} className="w-full h-48 object-cover" />
              ) : (
                <div className="w-full h-48 bg-brand-lime-light flex items-center justify-center">
                  <span className="text-4xl font-bold text-brand-green-dark">{getInitials(professional.name)}</span>
                </div>
              )}
              <div className="p-5">
                <h3 className="font-semibold text-slate-800">{professional.name}</h3>
                <p className="text-brand-green-dark text-sm font-medium">{professional.specialty}</p>
              </div>
            </div>
          ))}
          {professionals.length === 0 && (
            <p className="col-span-full text-center text-slate-400 text-sm py-8">
              Aún no hay profesionales publicados.
            </p>
          )}
        </div>
      )}

      <div className="text-center mt-14">
        <p className="text-slate-500 mb-4">¿Quieres agendar una atención o resolver tus dudas?</p>
        <Link
          to="/contacto"
          className="inline-block bg-brand-green hover:bg-brand-green-dark text-white px-6 py-3 rounded-xl font-medium transition-colors"
        >
          Contáctanos
        </Link>
      </div>
    </div>
  );
};

export default Professionals;
