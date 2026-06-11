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
        return (
          <div key={s.key} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center border
                  ${isCompleted
                    ? 'bg-white/10 border-white/20'
                    : 'bg-transparent border-white/10'
                  }`}
              >
                <Icon
                  className={`w-3 h-3 ${isCompleted ? 'text-white/70' : 'text-white/30'}`}
                />
              </div>
              <span className={`mt-1 text-[9px] ${isCompleted ? 'text-white/70' : 'text-white/30'}`}>
                {s.label}
              </span>
            </div>

            {i < ORDER_STATUSES.length - 1 && (
              <div className="flex-1 h-px mx-1 bg-white/10">
                <div
                  className="h-full bg-white/20 transition-all duration-500"
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
    <div className="p-4 border border-white/10 rounded-lg bg-white/5">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-mono text-xs text-white/80">
              #{order.id.slice(0, 8).toUpperCase()}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] bg-white/10 text-white/70">
              {status.label}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-white/40 flex-wrap">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {unit?.name}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {time}
            </span>
          </div>
        </div>
        <span className="text-sm text-white/80 shrink-0">
          {order.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </span>
      </div>

      <StatusTimeline statusIdx={order.statusIdx} />

      <div className="mt-4 pt-3 border-t border-white/10">
        <p className="text-[10px] text-white/40 mb-2">Itens</p>
        <div className="flex flex-wrap gap-1.5">
          {order.items.map(item => (
            <span
              key={item.id}
              className="px-2 py-1 rounded bg-white/10 text-[10px] text-white/60"
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
    <div className="flex flex-col items-center justify-center gap-4 py-20 px-4 text-center">
      <ShoppingBag className="w-10 h-10 text-white/30" />
      <div>
        <p className="text-sm text-white/60 mb-1">Nenhum pedido ainda</p>
        <p className="text-xs text-white/30">Seus pedidos aparecerão aqui</p>
      </div>
      <button
        onClick={onAction}
        className="text-sm text-white/70 hover:text-white/90 hover:underline transition-colors"
      >
        Fazer primeiro pedido
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
          <p className="text-xs text-white/40 mt-0.5">
            {sorted.length} pedido{sorted.length > 1 ? 's' : ''}
          </p>
        </div>

        {sorted.length === 0 ? (
          <EmptyState onAction={() => navigate('/')} />
        ) : (
          <div className="space-y-3">
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