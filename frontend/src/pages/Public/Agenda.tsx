import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarClock, HeartHandshake } from 'lucide-react';

const Agenda: React.FC = () => {
  return (
    <div className="bg-brand-cream min-h-[60vh] flex items-center">
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-lime-light text-brand-green-dark mb-6">
          <CalendarClock size={30} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Agenda</h1>
        <p className="text-slate-600 leading-relaxed mb-2">
          Agenda directamente con nuestra administración, ve al menú <strong>Contactos</strong>.
        </p>
        <p className="text-slate-500 leading-relaxed mb-8 flex items-center justify-center gap-2">
          <HeartHandshake size={16} className="text-brand-green-dark" />
          De esta manera será más personalizado y eficiente, logrando una comunicación más fluida y de confianza.
        </p>
        <Link
          to="/contacto"
          className="inline-block bg-brand-green hover:bg-brand-green-dark text-white px-6 py-3 rounded-xl font-medium transition-colors"
        >
          Ir a Contacto
        </Link>
      </div>
    </div>
  );
};

export default Agenda;
