import { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'cyber_session';
const USERS_KEY   = 'cyber_users';

// Usuário padrão
const DEFAULT_USER = {
  id: 'demo-user-001',
  name: 'Usuário Demo',
  email: 'demo@raizes.com',
  password: '123456',
  points: 100,
  createdAt: Date.now()
};

function getUsers() {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  // Garante que o usuário padrão sempre exista
  if (!users.find(u => u.email === DEFAULT_USER.email)) {
    users.push(DEFAULT_USER);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
  return users;
}

function getSession() { return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); }

const initialState = { user: getSession(), error: null };

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':   return { user: action.payload, error: null };
    case 'LOGOUT':  return { user: null, error: null };
    case 'ERROR':   return { ...state, error: action.payload };
    case 'UPDATE_POINTS': return { ...state, user: { ...state.user, points: action.payload } };
    default:        return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.user));
  }, [state.user]);

  function register({ name, email, password }) {
    const users = getUsers();
    if (users.find(u => u.email === email)) {
      dispatch({ type: 'ERROR', payload: 'E-mail já cadastrado.' });
      return false;
    }
    const user = { id: crypto.randomUUID(), name, email, password, points: 50, createdAt: Date.now() }; // 50 pontos de boas-vindas
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]));
    dispatch({ type: 'LOGIN', payload: { id: user.id, name, email, points: 50 } });
    return true;
  }

  function login({ email, password }) {
    const users = getUsers();
    const user  = users.find(u => u.email === email && u.password === password);
    if (!user) {
      dispatch({ type: 'ERROR', payload: 'E-mail ou senha incorretos.' });
      return false;
    }
    dispatch({ type: 'LOGIN', payload: { id: user.id, name: user.name, email, points: user.points || 0 } });
    return true;
  }

  function addPoints(amount) {
    if (!state.user) return;
    const newPoints = (state.user.points || 0) + amount;
    dispatch({ type: 'UPDATE_POINTS', payload: newPoints });
    
    const users = getUsers();
    const updated = users.map(u => u.id === state.user.id ? { ...u, points: newPoints } : u);
    localStorage.setItem(USERS_KEY, JSON.stringify(updated));
  }
  
  function usePoints(amount) {
    if (!state.user) return false;
    const currentPoints = state.user.points || 0;
    if (currentPoints < amount) return false;
    
    const newPoints = currentPoints - amount;
    dispatch({ type: 'UPDATE_POINTS', payload: newPoints });
    
    const users = getUsers();
    const updated = users.map(u => u.id === state.user.id ? { ...u, points: newPoints } : u);
    localStorage.setItem(USERS_KEY, JSON.stringify(updated));
    return true;
  }

  function logout() { dispatch({ type: 'LOGOUT' }); }
  function clearError() { dispatch({ type: 'ERROR', payload: null }); }

  return (
    <AuthContext.Provider value={{ user: state.user, error: state.error, register, login, logout, clearError, addPoints, usePoints }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
