import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, ChevronRight, Store } from 'lucide-react';
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
    <div className="min-h-screen bg-surface px-4 py-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-14 text-center animate-fade-in">
          <p className="inline-flex items-center gap-2 text-primary text-sm font-semibold mb-4 bg-primary/10 px-4 py-1.5 rounded-full">
            <Store className="w-4 h-4" /> Bem-vindo(a), {user?.name?.split(' ')[0]}!
          </p>
          <h1 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight">Onde vamos matar sua <span className="text-primary">fome</span> hoje?</h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Escolha a unidade mais próxima de você para conferir o nosso cardápio regional exclusivo.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up">
          {UNITS.map((unit, i) => (
            <button
              key={unit.id}
              onClick={() => handleSelect(unit.id)}
              className="group relative flex flex-col p-6 text-left rounded-3xl bg-surface-card border border-surface-border overflow-hidden hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-full h-32 mb-6 rounded-2xl bg-gradient-to-br from-surface to-primary/10 flex items-center justify-center relative overflow-hidden shrink-0 border border-white/5">
                 <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FF6B35_1px,transparent_1px)] [background-size:16px_16px]"></div>
                 <MapPin className="w-10 h-10 text-primary group-hover:scale-125 transition-transform duration-500 relative z-10" />
              </div>

              <h2 className="font-bold text-xl mb-1 group-hover:text-primary transition-colors">{unit.name}</h2>
              <p className="text-white/40 text-sm mb-5">{unit.city}</p>

              <div className="w-full space-y-3 text-sm text-white/60 mb-8 flex-1 flex flex-col justify-end">
                <span className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-primary/60 shrink-0 mt-0.5" />
                  <span className="leading-tight">{unit.address}</span>
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary/60 shrink-0" />
                  <span>{unit.hours}</span>
                </span>
              </div>

              <div className="w-full py-3.5 rounded-xl bg-white/5 group-hover:bg-primary text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors mt-auto">
                Ver Cardápio <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
