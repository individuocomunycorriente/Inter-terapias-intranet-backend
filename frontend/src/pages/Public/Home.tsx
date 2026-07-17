import React from 'react';
import { Link } from 'react-router-dom';
import { TreePine, ArrowRight, Activity, Sprout, HeartHandshake, Users, Scale } from 'lucide-react';
import InfoCard from './components/InfoCard';

const AREAS = [
  { icon: Activity, title: 'Movimiento', description: 'Fortalecemos la motricidad y la funcionalidad en cada etapa del desarrollo.' },
  { icon: Sprout, title: 'Crecimiento', description: 'Acompañamos el desarrollo integral de niños, adolescentes y adultos.' },
  { icon: HeartHandshake, title: 'Bienestar', description: 'Ponemos la salud mental y emocional en el centro de cada intervención.' },
  { icon: Users, title: 'Conexión', description: 'Construimos vínculos terapéuticos cercanos, respetuosos y de confianza.' },
  { icon: Scale, title: 'Equilibrio', description: 'Buscamos la autonomía y la participación plena en la vida cotidiana.' },
];

const Home: React.FC = () => {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-petrol via-brand-green-dark to-brand-green text-white">
        <div className="max-w-5xl mx-auto px-6 py-24 sm:py-32 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-6">
            <TreePine size={32} className="text-brand-lime" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">InterTerapia</h1>
          <p className="text-lg sm:text-xl text-brand-lime font-medium mb-6">Re-Habilitación Integral</p>
          <p className="max-w-2xl mx-auto text-white/80 leading-relaxed mb-10">
            Centro de rehabilitación integral y apoyo terapéutico comprometido con el bienestar y la calidad de
            vida de niños, adolescentes, adultos y personas mayores.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/profesionales"
              className="inline-flex items-center gap-2 bg-white text-brand-petrol px-6 py-3 rounded-xl font-medium hover:bg-brand-cream transition-colors"
            >
              Conoce a nuestros profesionales <ArrowRight size={18} />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/10 transition-colors"
            >
              Acceso profesional
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">Un equipo comprometido con tu bienestar</h2>
          <p className="text-slate-500">
            Trabajamos desde una mirada interdisciplinaria, personalizada y basada en la evidencia.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {AREAS.map((area) => (
            <InfoCard key={area.title} icon={area.icon} title={area.title} description={area.description} />
          ))}
        </div>
      </section>

      <section className="bg-brand-lime-light">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-petrol mb-3">¿Listo para comenzar?</h2>
          <p className="text-slate-600 mb-8">
            Conoce nuestros programas terapéuticos o contáctanos directamente para resolver tus dudas.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/programas"
              className="bg-brand-green hover:bg-brand-green-dark text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              Ver programas
            </Link>
            <Link
              to="/contacto"
              className="bg-white border border-brand-green/30 text-brand-green-dark px-6 py-3 rounded-xl font-medium hover:bg-brand-green/5 transition-colors"
            >
              Contáctanos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
