import React from 'react';
import logo from '../assets/logo.png';

interface LogoProps {
  size?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 32, className }) => {
  return <img src={logo} alt="InterTerapia" style={{ width: size, height: size }} className={`object-contain ${className ?? ''}`} />;
};

export default Logo;
