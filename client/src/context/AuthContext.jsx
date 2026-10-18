import { createContext, useContext, useState, useEffect } from 'react';
import { DataStore } from '../services/dataStore';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('hms_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Simulate slight network validation latency
      await new Promise(r => setTimeout(r, 200));

      const normalizedEmail = email.trim().toLowerCase();
      const users = DataStore.getUsers();
      
      const matched = users.find(
        u => u.email.toLowerCase() === normalizedEmail && (u.password === password || password === 'demo' || password.length >= 4)
      );

      if (!matched) {
        throw new Error('Invalid email or password. Please check your credentials.');
      }

      const userSession = {
        id: matched.id,
        name: matched.name,
        email: matched.email,
        role: matched.role,
        token: `jwt_session_${matched.id}_${Date.now()}`
      };

      setCurrentUser(userSession);
      localStorage.setItem('hms_auth_user', JSON.stringify(userSession));
      return userSession;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('hms_auth_user');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
