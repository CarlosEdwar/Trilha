import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Clock, ArrowRight, MapPin, Package, ChefHat, Truck, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { UNITS, ORDER_STATUSES, STATUS_DELAYS } from '../data/seed';

const STATUS_ICONS = [Package, ChefHat, Truck, CheckCircle2];

function StatusTimeline({ statusIdx }) {
  return (
    <div className="flex items-center w-full">
      {ORDER_STATUSES.map((s, i) => {
        const Icon = STATUS_ICONS[i];
        const isCompleted = i <= statusIdx;
        const isCurrent = i === statusIdx;

        return (
          <div key={s.key} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors
                  ${isCompleted
                    ? 'bg-emerald-500/10 border-emerald-500/30'
                    : 'bg-transparent border-white/5'
                  }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 ${isCompleted ? 'text-emerald-400' : 'text-white/10'}`}
                />
              </div>
              <span className={`mt-1 text-[9px] ${isCurrent ? 'text-emerald-400' : isCompleted ? 'text-emerald-500/50' : 'text-white/15'}`}>
                {s.label}
              </span>
            </div>

            {i < ORDER_STATUSES.length - 1 && (
              <div className="flex-1 h-0.5 mx-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500/30 transition-all duration-500"
                  style={{ width: i < statusIdx ? '100%' : '0%' }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function OrderCard({ order, onAdvance }) {
  const unit = UNITS.find(u => u.id === order.unitId);
  const status = ORDER_STATUSES[order.statusIdx];
  const isDone = order.statusIdx === 3;
  const time = new Date(order.createdAt).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  useEffect(() => {
    if (isDone) return;
    const delay = STATUS_DELAYS[order.statusIdx];
    const t = setTimeout(() => onAdvance(order.id), delay);
    return () => clearTimeout(t);
  }, [order.statusIdx, order.id, isDone, onAdvance]);

  return (
    <div className="glass-card p-4">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="font-mono text-xs text-emerald-300/70">
              #{order.id.slice(0, 8).toUpperCase()}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium
              ${isDone
                ? 'bg-emerald-500/10 text-emerald-400'
                : 'bg-emerald-500/5 text-emerald-400/70'
              }`}
            >
              {status.label}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-white/25 flex-wrap">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-emerald-500/40" />
              {unit?.name}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-emerald-500/40" />
              {time}
            </span>
          </div>
        </div>
        <span className="text-sm font-medium text-emerald-300/80 shrink-0">
          {order.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </span>
      </div>

      <StatusTimeline statusIdx={order.statusIdx} />

      <div className="mt-4 pt-3 border-t border-white/5">
        <p className="text-[10px] text-emerald-500/40 mb-2 font-medium uppercase tracking-wider">Itens</p>
        <div className="flex flex-wrap gap-1.5">
          {order.items.map(item => (
            <span
              key={item.id}
              className="px-2.5 py-1 rounded-md bg-emerald-500/5 text-[10px] text-emerald-200/50 border border-emerald-500/10"
            >
              {item.qty}× {item.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function EmptyState({ onAction }) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-20 px-4 text-center">
      <div className="w-14 h-14 rounded-xl bg-emerald-500/5 flex items-center justify-center border border-emerald-500/10">
        <ShoppingBag className="w-6 h-6 text-emerald-500/30" />
      </div>
      <div>
        <p className="text-sm text-white/40 mb-1">Nenhum pedido ainda</p>
        <p className="text-xs text-white/20">Seus pedidos aparecerão aqui</p>
      </div>
      <button
        onClick={onAction}
        className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500/10 text-emerald-400/80 text-sm font-medium hover:bg-emerald-500/15 transition-colors border border-emerald-500/15"
      >
        Fazer primeiro pedido
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function TrackingPage() {
  const { orders, advanceStatus } = useCart();
  const navigate = useNavigate();

  const sorted = [...orders].sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-lg font-medium text-white">Meus pedidos</h1>
          <p className="text-xs text-white/20 mt-0.5">
            {sorted.length} pedido{sorted.length > 1 ? 's' : ''}
          </p>
        </div>

        {sorted.length === 0 ? (
          <EmptyState onAction={() => navigate('/')} />
        ) : (
          <div className="space-y-4">
            {sorted.map(order => (
              <OrderCard
                key={order.id}
                order={order}
                onAdvance={advanceStatus}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}