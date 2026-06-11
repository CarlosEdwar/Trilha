import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Clock, ArrowRight, MapPin, ChevronRight, Package, ChefHat, Truck, CheckCircle2 } from 'lucide-react';
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
            <div className="flex flex-col items-center relative">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border-2
                  ${isCompleted
                    ? 'bg-primary border-primary shadow-lg shadow-primary/25 scale-110'
                    : 'bg-surface border-white/10 scale-100'
                  }`}
              >
                <Icon
                  className={`w-4 h-4 transition-colors duration-300
                    ${isCompleted ? 'text-white' : 'text-white/20'}`}
                />
              </div>
              {isCurrent && (
                <span className="absolute -bottom-5 text-[10px] font-semibold text-primary whitespace-nowrap">
                  Agora
                </span>
              )}
            </div>

            {i < ORDER_STATUSES.length - 1 && (
              <div className="flex-1 h-1 mx-2 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-700 ease-out"
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

  /* Avança status automaticamente */
  useEffect(() => {
    if (isDone) return;
    const delay = STATUS_DELAYS[order.statusIdx];
    const t = setTimeout(() => onAdvance(order.id), delay);
    return () => clearTimeout(t);
  }, [order.statusIdx, order.id, isDone, onAdvance]);

  return (
    <div className="glass-card overflow-hidden animate-slide-up group hover:border-primary/20 transition-all duration-300">

      <div className="p-5 pb-4 border-b border-white/5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 mb-1">
              <span className="font-mono text-sm font-bold tracking-wide text-white/90">
                #{order.id.slice(0, 8).toUpperCase()}
              </span>
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wide
                  ${isDone
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                    : 'bg-primary/15 text-primary border border-primary/20'
                  }`}
              >
                {isDone && <CheckCircle2 className="w-3 h-3" />}
                {status.label}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs text-white/40">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {unit?.name}
              </span>
              <span className="w-px h-3 bg-white/10" />
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {time}
              </span>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-primary font-bold text-lg">
              {order.total.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
          </div>
        </div>
      </div>

      <div className="px-5 py-5 bg-white/[0.02]">
        <StatusTimeline statusIdx={order.statusIdx} />
      </div>

      <div className="px-5 py-4 bg-white/[0.01]">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[11px] font-medium uppercase tracking-wider text-white/30">
            Itens do pedido
          </p>
          <span className="text-[11px] text-white/20">
            {order.items.length} item{order.items.length > 1 ? 's' : ''}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {order.items.map(item => (
            <span
              key={item.id}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-colors"
            >
              <span className="font-semibold text-primary">{item.qty}×</span>
              {item.name}
            </span>
          ))}
        </div>
      </div>

      {!isDone && (
        <div className="px-5 py-3 border-t border-white/5 flex items-center justify-between">
          <span className="text-[11px] text-white/30">
            Atualizando automaticamente…
          </span>
          <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
        </div>
      )}
    </div>
  );
}
function EmptyState({ onAction }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 text-center px-4">
      <div className="relative">
        <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center">
          <ShoppingBag className="w-10 h-10 text-primary/60" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-surface border border-white/10 flex items-center justify-center">
          <Clock className="w-4 h-4 text-white/30" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-bold text-white/90">Nenhum pedido ainda</h2>
        <p className="text-sm text-white/40 max-w-xs mx-auto leading-relaxed">
          Seus pedidos aparecerão aqui.
        </p>
      </div>

      <button
        onClick={onAction}
        className="btn-primary flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold hover:scale-105 transition-transform"
      >
        Fazer meu primeiro pedido
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

function PageHeader({ count }) {
  return (
    <div className="mb-8 space-y-1">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Meus pedidos</h1>
        {count > 0 && (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-white/50">
            {count} pedido{count > 1 ? 's' : ''}
          </span>
        )}
      </div>
      <p className="text-sm text-white/40">
        Acompanhe o status dos seus pedidos
      </p>
    </div>
  );
}

export default function TrackingPage() {
  const { orders, advanceStatus } = useCart();
  const navigate = useNavigate();

  const sorted = [...orders].sort((a, b) => b.createdAt - a.createdAt);

  if (!sorted.length) {
    return (
      <div className="min-h-screen bg-surface">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <PageHeader count={0} />
          <EmptyState onAction={() => navigate('/')} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-3xl mx-auto px-4 py-8 animate-fade-in">
        <PageHeader count={sorted.length} />

        <div className="space-y-5">
          {sorted.map(order => (
            <OrderCard
              key={order.id}
              order={order}
              onAdvance={advanceStatus}
            />
          ))}
        </div>
      </div>
    </div>
  );
}