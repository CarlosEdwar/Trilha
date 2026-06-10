import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Lock, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import restauranteIcon from '../assets/restaurante.png';

export default function AuthPage() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lgpdConsent, setLgpdConsent] = useState(false);

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

    if (mode === 'register' && !lgpdConsent) {
      toast('Você precisa concordar com os Termos de Uso e a Política de Privacidade para criar uma conta.', 'error');
      return;
    }

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
    setLgpdConsent(false);
    clearError();
  }

  function fillDemoCredentials(field, value) {
    setForm(f => ({ ...f, [field]: value }));
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-surface">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-md relative animate-fade-in">
        
        <div className="glass-card p-4 mb-6 border border-primary/20">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
              <span className="text-lg">🔑</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-primary mb-2">Credenciais Demo</p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 bg-black/20 rounded-lg px-3 py-2">
                  <Mail className="w-3.5 h-3.5 text-white/40" />
                  <code className="text-xs text-white/80 font-mono">demo@raizes.com</code>
                  <button 
                    onClick={() => fillDemoCredentials('email', 'demo@raizes.com')}
                    className="ml-auto text-xs text-primary hover:text-white transition-colors"
                  >
                    Preencher
                  </button>
                </div>
                <div className="flex items-center gap-2 bg-black/20 rounded-lg px-3 py-2">
                  <Lock className="w-3.5 h-3.5 text-white/40" />
                  <code className="text-xs text-white/80 font-mono">123456</code>
                  <button 
                    onClick={() => fillDemoCredentials('password', '123456')}
                    className="ml-auto text-xs text-primary hover:text-white transition-colors"
                  >
                    Preencher
                  </button>
                </div>
              </div>
              <p className="text-xs text-white/40 mt-2 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                Clique em "Preencher" ou digite manualmente
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 mb-4">
            <img src={restauranteIcon} alt="Raízes Logo" className="w-10 h-10 object-contain" />
          </div>
          <h1 className="text-3xl font-bold">Raízes<span className="text-primary">.</span></h1>
          <p className="text-white/50 text-sm mt-1">
            {mode === 'login' ? 'Acesse sua conta para pedir' : 'Crie sua conta gratuitamente'}
          </p>
        </div>

        <div className="flex glass-card p-1 mb-6 gap-1">
          {['login', 'register'].map(m => (
            <button
              key={m}
              onClick={() => { switchMode(); }}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200
                ${mode === m ? 'bg-primary text-white shadow-lg' : 'text-white/50 hover:text-white'}`}
            >
              {m === 'login' ? 'Entrar' : 'Criar conta'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-6 flex flex-col gap-4">
          {mode === 'register' && (
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                id="name"
                className="input-field pl-10"
                type="text"
                placeholder="Seu nome completo"
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
              className="input-field pl-10"
              type="email"
              placeholder="seu@email.com"
              value={form.email}
              onChange={set('email')}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              id="password"
              className="input-field pl-10 pr-11"
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

          {mode === 'register' && (
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={lgpdConsent}
                onChange={e => setLgpdConsent(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-primary focus:ring-primary focus:ring-offset-0"
              />
              <span className="text-xs text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">
                Concordo com os{' '}
                <a href="/termos-de-uso" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  Termos de Uso
                </a>{' '}
                e a{' '}
                <a href="/politica-de-privacidade" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  Política de Privacidade
                </a>
                . Autorizo o tratamento dos meus dados pessoais conforme a LGPD (Lei nº 13.709/2018).
              </span>
            </label>
          )}

          <button
            type="submit"
            disabled={loading || (mode === 'register' && !lgpdConsent)}
            className="btn-primary w-full justify-center mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Aguarde…' : mode === 'login' ? 'Entrar' : 'Criar conta'}
          </button>
        </form>

        <p className="text-center text-white/40 text-sm mt-4">
          {mode === 'login' ? 'Não tem conta?' : 'Já tem conta?'}{' '}
          <button onClick={switchMode} className="text-primary hover:underline font-medium">
            {mode === 'login' ? 'Cadastre-se' : 'Faça login'}
          </button>
        </p>

        {/* LGPD Footer */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <div className="flex items-center justify-center gap-2 mb-2 text-white/30">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wider">Proteção de Dados</span>
          </div>
          <p className="text-xs text-white/30 leading-relaxed max-w-sm mx-auto">
            Seus dados pessoais são tratados com segurança e transparência, em conformidade com a{' '}
            <strong className="text-white/50">Lei Geral de Proteção de Dados (LGPD)</strong>. 
            Você pode solicitar acesso, correção ou exclusão dos seus dados a qualquer momento através da nossa seção de privacidade.
          </p>
        </div>

      </div>
    </div>
  );
}
