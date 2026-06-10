import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, CreditCard, Banknote, QrCode, ArrowLeft, CheckCircle, Ticket, Star, Loader2, ExternalLink } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { UNITS, CAMPAIGNS } from '../data/seed';

const PAYMENT_METHODS = [
  { id: 'pix', label: 'Pix', icon: <QrCode className="w-5 h-5" /> },
  { id: 'card', label: 'Cartão', icon: <CreditCard className="w-5 h-5" /> },
  { id: 'cash', label: 'Dinheiro', icon: <Banknote className="w-5 h-5" /> },
];

export default function CheckoutPage() {
  const [payment, setPayment] = useState('pix');
  const [placing, setPlacing] = useState(false);

  const [coupon, setCoupon] = useState('');
  const [activeCoupon, setActiveCoupon] = useState(null);

  const [useLoyalty, setUseLoyalty] = useState(false);

  const [paymentStep, setPaymentStep] = useState(0); // 0: idle, 1: external loading, 2: success

  const { items, unitId, total: subtotal, addItem, removeItem, placeOrder } = useCart();
  const { user, usePoints, addPoints } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const unit = UNITS.find(u => u.id === unitId);

  // Calcula descontos
  let discountCoupon = 0;
  if (activeCoupon && subtotal >= activeCoupon.minAmount) {
    discountCoupon = subtotal * (activeCoupon.discountPercent / 100);
  }

  // Fidelidade: cada ponto vale R$ 0.10.
  const canUseLoyalty = (user?.points || 0) >= 50;
  let discountLoyalty = 0;
  let pointsToUse = 0;

  if (useLoyalty && canUseLoyalty) {
    const pointsAvailable = user.points || 0;
    // Usa no máximo os pontos necessários para zerar o pedido ou todos disponíveis
    const maxDiscountAllowed = subtotal - discountCoupon;
    const pointsNeeded = Math.min(pointsAvailable, Math.floor(maxDiscountAllowed / 0.10));

    if (pointsNeeded >= 50) {
      discountLoyalty = pointsNeeded * 0.10;
      pointsToUse = pointsNeeded;
    }
  }

  const finalTotal = Math.max(0, subtotal - discountCoupon - discountLoyalty);

  function applyCoupon() {
    if (!coupon.trim()) return;
    const camp = CAMPAIGNS.find(c => c.code.toUpperCase() === coupon.toUpperCase());
    if (!camp) {
      toast('Cupom inválido ou expirado.', 'error');
      return;
    }
    if (subtotal < camp.minAmount) {
      toast(`O valor mínimo para este cupom é R$ ${camp.minAmount.toFixed(2)}`, 'warning');
      return;
    }
    setActiveCoupon(camp);
    setCoupon('');
    toast('Cupom aplicado com sucesso!', 'success');
  }

  async function handlePlaceOrder() {
    if (!items.length) { toast('Carrinho vazio.', 'warning'); return; }

    // Simula Pagamento
    setPlacing(true);
    setPaymentStep(1);

    // Simula 2.5s processando
    await new Promise(r => setTimeout(r, 2500));

    setPaymentStep(2);

    // Dá 1 segundo pro usuário ler 
    await new Promise(r => setTimeout(r, 1200));

    // Subtrai pontos
    if (useLoyalty && pointsToUse > 0) {
      usePoints(pointsToUse);
    }

    // Adiciona pontos novos (1 pt por R$ gasto do total final arredondado pra baixo)
    const pointsEarned = Math.floor(finalTotal);
    if (pointsEarned > 0) {
      addPoints(pointsEarned);
    }

    placeOrder({ total: finalTotal, payment });
    toast(`Pedido confirmado! Você ganhou ${pointsEarned} pts.`, 'success');
    navigate('/tracking');
  }

  if (!items.length) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-white/40">
      <span className="text-6xl">🛒</span>
      <p className="text-lg font-medium">Seu carrinho está vazio.</p>
      <button onClick={() => navigate('/menu')} className="btn-primary mt-2">
        <ArrowLeft className="w-4 h-4" /> Voltar ao cardápio
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface px-4 py-8 relative">

      {paymentStep > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface/90 backdrop-blur-md px-4">
          <div className="glass-card p-8 flex flex-col items-center text-center max-w-sm w-full animate-slide-up border-primary/20 shadow-2xl shadow-primary/10">
            {paymentStep === 1 ? (
              <>
                <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                <h3 className="text-xl font-bold mb-2">Processando Pagamento...</h3>
                <p className="text-white/50 text-sm flex items-center gap-1.5 justify-center">
                  Aguardando gateway seguro externo <ExternalLink className="w-3.5 h-3.5" />
                </p>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mb-4">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Pagamento Aprovado</h3>
                <p className="text-white/50 text-sm">Redirecionando para acompanhamento...</p>
              </>
            )}
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">

        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/menu')} className="btn-ghost p-2 -ml-2 text-white/60 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Finalizar Pedido</h1>
            <p className="text-primary text-sm font-medium">{unit?.name}</p>
          </div>
        </div>

        <div className="glass-card p-2 border-surface-border/50">
          {items.map(item => (
            <div key={item.id} className="flex items-center gap-4 p-3 border-b border-surface-border/30 last:border-0 hover:bg-white/[0.02] rounded-xl transition-colors">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl shrink-0">
                {item.category === 'burgers' ? '🍔' :
                  item.category === 'combos' ? '🎯' :
                    item.category === 'drinks' ? '🥤' :
                      item.category === 'sides' ? '🍟' : '🍨'}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-bold text-white/90 text-sm truncate">{item.name}</p>
                <p className="text-white/40 text-xs mt-0.5">
                  {(item.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} un.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-surface-card border border-surface-border rounded-full p-1 shadow-sm">
                <button
                  onClick={() => removeItem(item.id)}
                  className="w-7 h-7 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  {item.qty === 1 ? <Trash2 className="w-3.5 h-3.5 text-red-400" /> : <Minus className="w-3.5 h-3.5" />}
                </button>
                <span className="w-5 text-center text-sm font-bold">{item.qty}</span>
                <button
                  onClick={() => addItem(item)}
                  className="w-7 h-7 rounded-full bg-primary hover:bg-primary-dark flex items-center justify-center transition-colors"
                >
                  <Plus className="w-3.5 h-3.5 text-white" />
                </button>
              </div>

              <span className="font-bold text-white shrink-0 w-20 text-right">
                {(item.price * item.qty).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">

          <div className="glass-card p-5 flex flex-col gap-4 border-surface-border/50">
            <h2 className="font-semibold text-sm text-white/80 flex items-center gap-2">
              <Ticket className="w-4 h-4 text-primary" /> Inserir Cupom Promocional
            </h2>
            {activeCoupon ? (
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-green-400 font-bold text-sm uppercase">{activeCoupon.code}</p>
                  <p className="text-green-400/60 text-xs mt-0.5">Aplicado com sucesso (-{activeCoupon.discountPercent}%)</p>
                </div>
                <button onClick={() => setActiveCoupon(null)} className="text-white/40 hover:text-white p-2" title="Remover cupom">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ex: SERTAO20"
                  value={coupon}
                  onChange={e => setCoupon(e.target.value.toUpperCase())}
                  className="input-field py-2.5 px-4 text-sm flex-1 uppercase tracking-wider"
                />
                <button onClick={applyCoupon} className="btn-primary px-5 py-2.5 text-sm rounded-xl">
                  Aplicar
                </button>
              </div>
            )}
          </div>

          <div className="glass-card p-5 flex flex-col gap-4 border-surface-border/50 relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 opacity-[0.03]">
              <Star className="w-40 h-40" />
            </div>

            <div className="flex items-center justify-between relative z-10">
              <h2 className="font-semibold text-sm text-white/80 flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400/20" /> Clube Raízes
              </h2>
              <span className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs font-bold">
                {user?.points || 0} pts
              </span>
            </div>

            <div className="flex-1 flex flex-col justify-center relative z-10">
              {canUseLoyalty ? (
                <label className="flex items-start gap-3 cursor-pointer p-3.5 rounded-xl border transition-colors select-none
                  ${useLoyalty ? 'border-yellow-500/40 bg-yellow-500/10' : 'border-white/10 hover:border-yellow-500/20 bg-white/5'}">
                  <input
                    type="checkbox"
                    checked={useLoyalty}
                    onChange={e => setUseLoyalty(e.target.checked)}
                    className="mt-0.5 accent-yellow-400 w-4 h-4"
                  />
                  <span className="text-sm text-white/80 leading-snug">
                    Usar <strong className="text-yellow-400">{pointsToUse > 0 ? pointsToUse : 50} pts</strong> para ter desconto de <strong className="text-white font-black">{(pointsToUse > 0 ? pointsToUse * 0.10 : 5.00).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong> nesta compra.
                  </span>
                </label>
              ) : (
                <div className="text-xs text-white/40 bg-black/20 p-4 rounded-xl text-center border border-white/5">
                  Mínimo de resgate: 50 pts.<br />
                  Faltam <strong className="text-white/60">{50 - (user?.points || 0)} pts</strong> para seu primeiro desconto!
                </div>
              )}
            </div>
          </div>

        </div>

        <div className="glass-card p-5 border-surface-border/50">
          <h2 className="font-semibold mb-4 text-sm text-white/80">Pagamento (Integração Externa)</h2>
          <div className="grid grid-cols-3 gap-3">
            {PAYMENT_METHODS.map(m => (
              <button
                key={m.id}
                onClick={() => setPayment(m.id)}
                className={`flex flex-col items-center gap-2 py-4 px-2 rounded-2xl border transition-all duration-200 text-sm font-semibold
                  ${payment === m.id
                    ? 'border-primary bg-primary/10 text-primary shadow-[0_0_15px_rgba(255,107,53,0.15)] scale-[1.02]'
                    : 'border-surface-border text-white/50 hover:border-white/20 hover:text-white bg-surface-card hover:bg-white/5'}`}
              >
                {m.icon}
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <div className="glass-card p-6 space-y-4 border-surface-border/50">
          <div className="flex justify-between text-sm text-white/50">
            <span>Subtotal</span>
            <span>{subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          </div>

          {discountCoupon > 0 && (
            <div className="flex justify-between text-sm text-green-400 font-medium">
              <span>Desconto Promocional</span>
              <span>- {discountCoupon.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
          )}

          {discountLoyalty > 0 && (
            <div className="flex justify-between text-sm text-yellow-400 font-medium">
              <span>Desconto Clube Raízes</span>
              <span>- {discountLoyalty.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
          )}

          <div className="flex justify-between text-sm text-white/50">
            <span>Taxa de serviço / Entrega</span>
            <span className="text-green-400 font-medium">Grátis</span>
          </div>

          <div className="flex justify-between items-end font-black text-2xl pt-4 border-t border-surface-border">
            <span className="text-base text-white/80 font-semibold mb-0.5">Total a Pagar</span>
            <span className="text-white text-3xl">
              {finalTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </div>

          <div className="text-right text-xs text-primary font-medium">
            <Star className="w-3 h-3 inline-block -mt-0.5 mr-1" />
            Esta compra vai render <strong className="text-white">{Math.floor(finalTotal)} pontos</strong> Clube Raízes
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={placing}
            className="btn-primary w-full justify-center py-4 text-base font-bold rounded-2xl shadow-xl shadow-primary/30 mt-6 active:scale-[0.98] transition-all hover:brightness-110 flex items-center gap-2"
          >
            Pagar com Gateway Seguro <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
