import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Clock, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { UNITS, ORDER_STATUSES, STATUS_DELAYS } from '../data/seed';

/* Linha de progresso do pedido */
function StatusTimeline({ statusIdx }) {
  return (
    <div className="flex items-center gap-0">
      {ORDER_STATUSES.map((s, i) => (
        <div key={s.key} className="flex items-center flex-1 last:flex-none">
          {/* Bolinha */}
          <div className={`relative flex flex-col items-center`}>
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-base transition-all duration-500
              ${i <= statusIdx ? 'bg-primary shadow-lg shadow-primary/30 scale-110' : 'bg-white/10 scale-100'}`}>
              {ORDER_STATUSES[i].icon}
            </div>
            <span className={`mt-1.5 text-[10px] font-medium text-center leading-tight whitespace-nowrap
              ${i <= statusIdx ? 'text-primary' : 'text-white/30'}`}>
              {s.label}
            </span>
          </div>
          {i < ORDER_STATUSES.length - 1 && (
            <div className="flex-1 h-0.5 mx-1 mb-5 rounded-full overflow-hidden bg-white/10">
              <div
                className="h-full bg-primary transition-all duration-700"
                style={{ width: i < statusIdx ? '100%' : '0%' }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function OrderCard({ order, onAdvance }) {
  const unit    = UNITS.find(u => u.id === order.unitId);
  const status  = ORDER_STATUSES[order.statusIdx];
  const isDone  = order.statusIdx === 3;
  const time    = new Date(order.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  /* Avança status automaticamente via setTimeout */
  useEffect(() => {
    if (isDone) return;
    const delay = STATUS_DELAYS[order.statusIdx];
    const t = setTimeout(() => onAdvance(order.id), delay);
    return () => clearTimeout(t);
  }, [order.statusIdx]);

  return (
    <div className="glass-card p-5 space-y-5 animate-slide-up">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-bold text-sm">#{order.id.slice(0, 8).toUpperCase()}</span>
            <span className={`badge ${isDone ? 'bg-green-500/20 text-green-400' : 'bg-primary/20 text-primary'}`}>
              {status.label}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-white/40">
            <span>{unit?.name}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {time}</span>
          </div>
        </div>
        <span className="text-primary font-bold text-sm shrink-0">
          {order.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </span>
      </div>

      <StatusTimeline statusIdx={order.statusIdx} />

      <div className="pt-3 border-t border-surface-border">
        <p className="text-xs text-white/30 mb-2">Itens do pedido</p>
        <div className="flex flex-wrap gap-1.5">
          {order.items.map(item => (
            <span key={item.id} className="badge bg-white/5 text-white/60 border border-surface-border">
              {item.qty}× {item.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TrackingPage() {
  const { orders, advanceStatus } = useCart();
  const navigate = useNavigate();

  /* Pedidos mais recentes primeiro */
  const sorted = [...orders].sort((a, b) => b.createdAt - a.createdAt);

  if (!sorted.length) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-white/40">
      <ShoppingBag className="w-16 h-16 opacity-20" />
      <p className="text-lg font-medium">Nenhum pedido ainda.</p>
      <button onClick={() => navigate('/')} className="btn-primary">
        <ArrowRight className="w-4 h-4" /> Fazer meu primeiro pedido
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface px-4 py-8">
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Meus pedidos</h1>
          <p className="text-white/40 text-sm mt-1">{sorted.length} pedido{sorted.length > 1 ? 's' : ''} no histórico</p>
        </div>

        <div className="space-y-4">
          {sorted.map(order => (
            <OrderCard key={order.id} order={order} onAdvance={advanceStatus} />
          ))}
        </div>
      </div>
    </div>
  );
}
