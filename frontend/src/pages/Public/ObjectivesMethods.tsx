import React from 'react';
import { Target, Users, ClipboardList, HeartHandshake, UserCheck, BookMarked, Compass } from 'lucide-react';
import InfoCard from './components/InfoCard';

const METHOD_ITEMS = [
  {
    icon: Target,
    title: 'Atención integral y centrada en la persona',
    description:
      'Consideramos las características, fortalezas, necesidades y contexto de cada usuario, desde la infancia hasta la adultez y en todo el ciclo vital.',
  },
  {
    icon: Users,
    title: 'Trabajo multidisciplinario e interdisciplinario',
    description:
      'Profesionales de distintas áreas trabajan en conjunto, coordinan estrategias y realizan seguimiento continuo para una atención coherente e integrada.',
  },
  {
    icon: Compass,
    title: 'Intervenciones funcionales y significativas',
    description:
      'Fomentamos habilidades para la vida diaria, autonomía e independencia en entornos como el hogar, la escuela, el trabajo y la comunidad.',
  },
  {
    icon: HeartHandshake,
    title: 'Familia como parte esencial',
    description:
      'Entregamos estrategias y actividades para el hogar, promoviendo la participación activa de familias y cuidadores para fortalecer y generalizar los aprendizajes.',
  },
  {
    icon: ClipboardList,
    title: 'Evaluación continua y personalizada',
    description:
      'Monitoreamos el progreso de manera constante para ajustar los objetivos terapéuticos y responder a las necesidades cambiantes de cada usuario.',
  },
  {
    icon: BookMarked,
    title: 'Talleres y programas grupales',
    description:
      'Desarrollamos espacios que potencian habilidades sociales, cognitivas, comunicativas, motoras y emocionales, favoreciendo la interacción y participación.',
  },
  {
    icon: UserCheck,
    title: 'Enfoque inclusivo y colaborativo',
    description:
      'Promovemos el respeto por la diversidad, la inclusión y la toma de decisiones compartida, trabajando en conjunto con familias, instituciones y redes de apoyo.',
  },
];

const ObjectivesMethods: React.FC = () => {
  return (
    <div>
      <div className="max-w-4xl mx-auto px-6 py-16 sm:py-20">
        <p className="text-brand-green-dark font-semibold tracking-wide text-sm uppercase mb-2">Objetivos y métodos</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-8">Objetivo general</h1>

        <div className="bg-brand-lime-light border border-brand-green/10 rounded-2xl p-6 sm:p-8 text-slate-700 leading-relaxed">
          Brindar atención integral, personalizada y de alta calidad a personas neurodivergentes desde la infancia
          hasta la adultez, así como a personas con enfermedad de Parkinson y secuelas de accidente cerebrovascular,
          mediante programas terapéuticos multidisciplinarios basados en la evidencia. Asimismo, promover el
          desarrollo de habilidades, la autonomía, la participación y la calidad de vida de las personas y sus
          familias, a través de intervenciones especializadas, talleres terapéuticos y acciones de acompañamiento
          desarrolladas por un equipo de profesionales comprometidos con la inclusión, el bienestar y la atención
          centrada en la persona.
        </div>
      </div>

      <div className="bg-brand-cream">
        <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3 text-center">Método y enfoque</h2>
          <p className="text-slate-500 text-center max-w-2xl mx-auto mb-12">
            Un modelo de atención integral, sistémico y centrado en la persona, a lo largo de todo el ciclo vital.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {METHOD_ITEMS.map((item) => (
              <InfoCard key={item.title} icon={item.icon} title={item.title} description={item.description} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObjectivesMethods;
