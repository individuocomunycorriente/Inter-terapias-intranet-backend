import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  specialty?: string; // Solo profesionales
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  role: 'admin' | 'professional' | null;
  login: (token: string, userData: User, isChangeToAdmin?: boolean) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<'admin' | 'professional' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Recuperar sesión al recargar la página
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    const storedRole = localStorage.getItem('role');

    if (storedToken && storedUser && storedRole) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setRole(storedRole as 'admin' | 'professional');
    }
    setLoading(false);
  } , []);

  const login = (newToken: string, userData: User, isChangeToAdmin = false) => {
    const userRole = isChangeToAdmin ? 'admin' : 'professional';
    
    setToken(newToken);
    setUser(userData);
    setRole(userRole);

    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('role', userRole);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setRole(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, token, role, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de un AuthProvider');
  return context;
};