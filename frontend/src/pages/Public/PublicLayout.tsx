import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { TreePine, Menu, X, Camera, Users, PlayCircle, MessageCircle } from 'lucide-react';
import { PUBLIC_NAV_ITEMS, SOCIAL_LINKS } from './navConfig';

const PublicLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
            <TreePine className="text-brand-green-dark" size={26} />
            <div className="leading-tight">
              <p className="font-bold text-slate-800 tracking-tight">INTERTERAPIA</p>
              <p className="text-[10px] text-brand-green-dark font-medium tracking-wide">RE-HABILITACIÓN INTEGRAL</p>
            </div>
          </NavLink>

          <nav className="hidden lg:flex items-center gap-1">
            {PUBLIC_NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'text-brand-green-dark bg-brand-lime-light' : 'text-slate-600 hover:text-brand-green-dark hover:bg-slate-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:block">
            <NavLink
              to="/login"
              className="bg-brand-petrol hover:bg-brand-petrol-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Acceso profesional
            </NavLink>
          </div>

          <button
            onClick={() => setMobileOpen((open) => !open)}
            className="lg:hidden p-2 text-slate-600"
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {mobileOpen && (
          <nav className="lg:hidden border-t border-slate-200 px-4 py-3 flex flex-col gap-1">
            {PUBLIC_NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium ${
                    isActive ? 'text-brand-green-dark bg-brand-lime-light' : 'text-slate-600'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="mt-2 bg-brand-petrol text-white px-3 py-2 rounded-lg text-sm font-medium text-center"
            >
              Acceso profesional
            </NavLink>
          </nav>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-brand-petrol text-white">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col items-center gap-5">
          <p className="text-xs tracking-widest text-white/60 uppercase">Síguenos en redes sociales</p>
          <div className="flex items-center gap-4">
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors" aria-label="Instagram">
              <Camera size={18} />
            </a>
            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors" aria-label="Facebook">
              <Users size={18} />
            </a>
            <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors" aria-label="YouTube">
              <PlayCircle size={18} />
            </a>
            <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors" aria-label="WhatsApp">
              <MessageCircle size={18} />
            </a>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <TreePine size={18} className="text-brand-lime" />
            <span className="font-semibold tracking-tight">InterTerapia · Re-Habilitación Integral</span>
          </div>
          <p className="text-xs text-white/40">© {new Date().getFullYear()} InterTerapia. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
