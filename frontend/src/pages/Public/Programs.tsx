import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, HeartHandshake, Scale, Users, ClipboardList, Ear } from 'lucide-react';
import InfoCard from './components/InfoCard';

const PROGRAMS = [
  {
    icon: Brain,
    title: 'Programa neurodivergente',
    description:
      'Acompañamiento integral para personas neurodivergentes en todas las etapas de la vida. Evaluación, intervención y apoyo familiar personalizado.',
  },
  {
    icon: HeartHandshake,
    title: 'Programa de salud mental',
    description:
      'Apoyo psicológico para el bienestar emocional, manejo de ansiedad, depresión, autoestima y habilidades socioemocionales.',
  },
  {
    icon: Scale,
    title: 'Programa valor similar a Fonasa',
    description:
      'Programa de atención accesible con valores similares a Fonasa, para que más personas puedan acceder a una atención terapéutica de calidad.',
  },
  {
    icon: Users,
    title: 'Talleres multidisciplinarios',
    description:
      'Espacios grupales guiados por diferentes profesionales que fortalecen habilidades sociales, cognitivas, comunicativas y de autonomía. Modalidad online y presencial.',
  },
  {
    icon: ClipboardList,
    title: 'Evaluación de ADOS-2',
    description:
      'Evaluación estandarizada para la detección y apoyo en el diagnóstico del Trastorno del Espectro Autista (TEA) en niños y adolescentes.',
  },
  {
    icon: Ear,
    title: 'Lavado de oídos y screening auditivo',
    description: 'Servicio de higiene auditiva y evaluación auditiva preventiva para cuidar tu salud y bienestar.',
  },
];

const Programs: React.FC = () => {
  return (
    <div className="bg-brand-cream">
      <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-brand-green-dark font-semibold tracking-wide text-sm uppercase mb-2">Programas que integran</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3">Programas</h1>
          <p className="text-slate-500">
            Diseñados para acompañar, potenciar y mejorar la calidad de vida de niños, adolescentes, adultos y
            personas mayores, desde una mirada integral y especializada.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROGRAMS.map((program) => (
            <InfoCard key={program.title} icon={program.icon} title={program.title} description={program.description} />
          ))}
        </div>

        <div className="text-center mt-14">
          <p className="text-slate-500 mb-1">
            Los programas pueden incluir información no tan detallada, como la ausencia de valores u otros aspectos.
          </p>
          <p className="text-slate-500 mb-6">Consulta directamente al contacto para más detalles.</p>
          <Link
            to="/contacto"
            className="inline-block bg-brand-green hover:bg-brand-green-dark text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            Contáctanos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Programs;
