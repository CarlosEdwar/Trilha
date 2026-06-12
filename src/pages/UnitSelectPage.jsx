import { useNavigate } from 'react-router-dom';
import { MapPin, ChevronRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { UNITS } from '../data/seed';

export default function UnitSelectPage() {
  const { setUnit } = useCart();
  const { user }    = useAuth();
  const navigate    = useNavigate();
  
  function handleSelect(id) {
    setUnit(id);
    navigate('/menu');
  }

  return (
    <div className="min-h-screen bg-surface px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center animate-fade-in">
          <h1 className="text-xl font-semibold text-white mb-2">Olá, {user?.name?.split(' ')[0]}</h1>
          <p className="text-white/40 text-sm">Escolha uma unidade</p>
        </div>

        <div className="space-y-3 animate-slide-up">
          {UNITS.map((unit) => (
            <button
              key={unit.id}
              onClick={() => handleSelect(unit.id)}
              className="w-full flex items-center gap-4 p-4 text-left rounded-xl bg-surface-card border border-surface-border hover:border-primary/30 transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-medium text-white truncate">{unit.name}</h2>
                <p className="text-white/40 text-xs truncate">{unit.city}</p>
              </div>
              <div className="flex items-center gap-3 text-xs text-white/40 shrink-0">
                <span className="hidden sm:inline">{unit.hours}</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-center">
          <div className="flex items-center justify-center gap-2 mb-2 text-white/30">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wider">
              Proteção de Dados
            </span>
          </div>
          <p className="text-xs text-white/30 leading-relaxed max-w-sm mx-auto">
            Seus dados pessoais são tratados com segurança e transparência, em
            conformidade com a LGPD. Ao continuar você concorda com os termos.
          </p>
        </div>
      </div>
    </div>
  );
}
