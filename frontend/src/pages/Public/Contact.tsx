import React from 'react';
import { Phone, Mail, Camera, Users, PlayCircle, MessageCircle } from 'lucide-react';
import { SOCIAL_LINKS } from './navConfig';

const Contact: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 sm:py-20">
      <p className="text-brand-green-dark font-semibold tracking-wide text-sm uppercase mb-2">Contacto</p>
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Contáctanos</h1>
      <p className="text-slate-600 leading-relaxed mb-10">
        Estamos para escuchar y saber en qué podemos trabajar para solucionar o mejorar tus inquietudes, desde una
        mirada profesional e integral.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <a
          href={SOCIAL_LINKS.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow"
        >
          <div className="w-11 h-11 rounded-full bg-brand-lime-light text-brand-green-dark flex items-center justify-center shrink-0">
            <Phone size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500">Número de contacto</p>
            <p className="font-semibold text-slate-800">{SOCIAL_LINKS.phoneDisplay}</p>
          </div>
        </a>

        <a
          href={`mailto:${SOCIAL_LINKS.email}`}
          className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow"
        >
          <div className="w-11 h-11 rounded-full bg-brand-lime-light text-brand-green-dark flex items-center justify-center shrink-0">
            <Mail size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500">Correo electrónico</p>
            <p className="font-semibold text-slate-800 break-all">{SOCIAL_LINKS.email}</p>
          </div>
        </a>
      </div>

      <div className="bg-brand-cream rounded-xl p-6">
        <p className="text-xs text-slate-500 uppercase tracking-wide mb-4 text-center">Síguenos en redes sociales</p>
        <div className="flex items-center justify-center gap-4">
          <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" className="p-3 rounded-full bg-white border border-slate-200 text-brand-green-dark hover:shadow-md transition-shadow" aria-label="Instagram">
            <Camera size={18} />
          </a>
          <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" className="p-3 rounded-full bg-white border border-slate-200 text-brand-green-dark hover:shadow-md transition-shadow" aria-label="Facebook">
            <Users size={18} />
          </a>
          <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noreferrer" className="p-3 rounded-full bg-white border border-slate-200 text-brand-green-dark hover:shadow-md transition-shadow" aria-label="YouTube">
            <PlayCircle size={18} />
          </a>
          <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noreferrer" className="p-3 rounded-full bg-white border border-slate-200 text-brand-green-dark hover:shadow-md transition-shadow" aria-label="WhatsApp">
            <MessageCircle size={18} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
