import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface InfoCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 transition-all hover:shadow-md hover:-translate-y-0.5">
      <div className="w-11 h-11 rounded-full bg-brand-lime-light text-brand-green-dark flex items-center justify-center mb-4">
        <Icon size={22} />
      </div>
      <h3 className="font-semibold text-slate-800 mb-1.5">{title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
};

export default InfoCard;
