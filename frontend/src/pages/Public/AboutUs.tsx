import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="bg-brand-cream">
      <div className="max-w-3xl mx-auto px-6 py-16 sm:py-20">
        <p className="text-brand-green-dark font-semibold tracking-wide text-sm uppercase mb-2">Quiénes somos</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-8">
          Somos lo que necesitas, somos parte de tu camino
        </h1>

        <div className="space-y-5 text-slate-600 leading-relaxed">
          <p>
            InterTerapia es un centro de rehabilitación integral y apoyo terapéutico comprometido con el bienestar
            y la calidad de vida de niños, adolescentes, adultos y personas mayores. Nuestro objetivo es potenciar
            el desarrollo, la autonomía y la participación de cada persona a través de una atención personalizada,
            basada en el respeto, la evidencia y el trabajo interdisciplinario.
          </p>
          <p>
            Contamos con un equipo de profesionales altamente capacitados que brinda atención a personas con y sin
            discapacidad, acompañando procesos relacionados con el neurodesarrollo, la salud mental y diversas
            condiciones neurológicas. Además, desarrollamos programas terapéuticos, talleres grupales y planes de
            intervención interdisciplinarios, adaptados a las necesidades y objetivos de cada usuario.
          </p>
          <p>
            Trabajamos con niños y adultos en áreas como el desarrollo infantil, neurodivergencia, salud mental,
            dificultades del aprendizaje y la comunicación, así como en procesos de rehabilitación de personas con
            Accidente Cerebrovascular (ACV), enfermedad de Parkinson y otras patologías neurológicas o físicas que
            requieren un acompañamiento especializado.
          </p>
          <p>
            Para nuestro equipo es fundamental reconocer las fortalezas, intereses y necesidades de cada persona.
            Por ello, diseñamos planes de intervención individualizados, promoviendo la adherencia al tratamiento,
            la participación activa y la creación de vínculos terapéuticos positivos, siempre desde una atención
            cercana, respetuosa e integral.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
