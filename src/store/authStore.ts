import { create } from 'zustand';

const DEFAULT_PASSWORD = '123';
const AUTH_KEY = 'auth';
const PASSWORD_KEY = 'monetix_password';

interface AuthStore {
  isAuthenticated: boolean;
  user: string | null;
  error: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  changePassword: (currentPassword: string, newPassword: string) => { success: boolean; error?: string };
}

function getStoredPassword(): string {
  return localStorage.getItem(PASSWORD_KEY) ?? DEFAULT_PASSWORD;
}

function getInitialAuth() {
  const stored = localStorage.getItem(AUTH_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as { isAuthenticated: boolean; user: string };
    } catch {
      return null;
    }
  }
  return null;
}

const initial = getInitialAuth();

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: initial?.isAuthenticated ?? false,
  user: initial?.user ?? null,
  error: null,
  login: (username, password) => {
    if (username === 'admin' && password === getStoredPassword()) {
      localStorage.setItem(AUTH_KEY, JSON.stringify({ isAuthenticated: true, user: username }));
      window.history.replaceState(null, '', '/');
      set({ isAuthenticated: true, user: username, error: null });
      return true;
    }
    set({ error: 'Usuário ou senha inválidos' });
    return false;
  },
  logout: () => {
    localStorage.removeItem(AUTH_KEY);
    set({ isAuthenticated: false, user: null, error: null });
  },
  changePassword: (currentPassword, newPassword) => {
    if (currentPassword !== getStoredPassword()) {
      return { success: false, error: 'Senha atual incorreta' };
    }
    if (newPassword.length < 3) {
      return { success: false, error: 'A nova senha deve ter pelo menos 3 caracteres' };
    }
    localStorage.setItem(PASSWORD_KEY, newPassword);
    return { success: true };
  },
}));
