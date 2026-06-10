import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import restauranteIcon from '../assets/restaurante.png';

export default function AuthPage() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, login, register, error, clearError } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => { if (user) navigate('/'); }, [user]);
  useEffect(() => {
    if (error) { toast(error, 'error'); clearError(); }
  }, [error]);

  function set(field) {
    return e => setForm(f => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const ok = mode === 'login'
      ? login({ email: form.email, password: form.password })
      : register(form);
    if (ok) toast(mode === 'login' ? 'Bem-vindo de volta!' : 'Conta criada com sucesso!', 'success');
    setLoading(false);
  }

  function switchMode() {
    setMode(m => m === 'login' ? 'register' : 'login');
    setForm({ name: '', email: '', password: '' });
    clearError();
  }

  function fillDemoCredentials(field, value) {
    setForm(f => ({ ...f, [field]: value }));
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-surface">
      <div className="w-full max-w-sm relative animate-fade-in">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white/5 mb-4 mx-auto">
            <img src={restauranteIcon} alt="Raízes Logo" className="w-9 h-9 object-contain" />
          </div>
          <h1 className="text-2xl font-semibold text-white">Raízes<span className="text-primary">.</span></h1>
          <p className="text-white/40 text-sm mt-2">
            {mode === 'login' ? 'Faça login para continuar' : 'Crie sua conta'}
          </p>
        </div>

        <div className="flex bg-white/5 p-1 mb-6 rounded-lg">
          {['login', 'register'].map(m => (
            <button
              key={m}
              onClick={() => { switchMode(); }}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all
                ${mode === m ? 'bg-primary text-white' : 'text-white/40 hover:text-white/60'}`}
            >
              {m === 'login' ? 'Entrar' : 'Criar conta'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === 'register' && (
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                id="name"
                className="input-field pl-10 py-3"
                type="text"
                placeholder="Nome completo"
                value={form.name}
                onChange={set('name')}
                required
                minLength={2}
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              id="email"
              className="input-field pl-10 py-3"
              type="email"
              placeholder="E-mail"
              value={form.email}
              onChange={set('email')}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              id="password"
              className="input-field pl-10 pr-11 py-3"
              type={show ? 'text' : 'password'}
              placeholder="Senha"
              value={form.password}
              onChange={set('password')}
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShow(s => !s)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
            >
              {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center py-3 mt-2 disabled:opacity-50"
          >
            {loading ? 'Aguarde…' : mode === 'login' ? 'Entrar' : 'Criar conta'}
          </button>
        </form>

        <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
          <p className="text-xs text-white/40 mb-2 font-medium">Demo</p>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <code className="text-xs text-white/60 font-mono">demo@raizes.com</code>
              <button 
                onClick={() => fillDemoCredentials('email', 'demo@raizes.com')}
                className="text-xs text-primary hover:text-white transition-colors"
              >
                Copiar
              </button>
            </div>
            <div className="flex items-center gap-2">
              <code className="text-xs text-white/60 font-mono">123456</code>
              <button 
                onClick={() => fillDemoCredentials('password', '123456')}
                className="text-xs text-primary hover:text-white transition-colors"
              >
                Copiar
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
