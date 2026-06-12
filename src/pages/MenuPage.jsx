import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Minus, ShoppingCart, MapPin, ArrowLeft, TicketPercent, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { PRODUCTS, CATEGORIES, UNITS, CAMPAIGNS } from '../data/seed';

function ProductRow({ product, qty, onAdd, onRemove }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 border-b border-surface-border">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-medium text-white">{product.name}</h3>
          {product.badge && (
            <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-medium uppercase">
              {product.badge}
            </span>
          )}
        </div>
        <p className="text-white/40 text-xs line-clamp-2">{product.desc}</p>
      </div>

      <div className="flex flex-col items-end gap-2 shrink-0">
        <span className="font-semibold text-sm text-white">
          {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </span>

        {qty > 0 ? (
          <div className="flex items-center gap-2 bg-surface-card border border-surface-border rounded-lg px-2 py-1">
            <button onClick={() => onRemove(product.id)} className="w-7 h-7 rounded-md hover:bg-white/10 flex items-center justify-center">
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-medium text-xs w-4 text-center">{qty}</span>
            <button onClick={() => onAdd(product)} className="w-7 h-7 rounded-md bg-primary hover:bg-primary-dark flex items-center justify-center text-white">
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button onClick={() => onAdd(product)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-surface-border hover:border-primary/50 text-xs font-medium transition-all">
            <Plus className="w-3.5 h-3.5" /> Adicionar
          </button>
        )}
      </div>
    </div>
  );
}

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('todos');
  const [search, setSearch] = useState('');

  const { unitId, items, addItem, removeItem, count, total } = useCart();
  const toast = useToast();
  const navigate = useNavigate();

  const unit = UNITS.find(u => u.id === unitId);

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter(p => p.units.includes(unitId));
    if (activeCategory !== 'todos') list = list.filter(p => p.category === activeCategory);
    if (search.trim()) list = list.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.desc.toLowerCase().includes(search.toLowerCase())
    );
    return list;
  }, [unitId, activeCategory, search]);

  const availableCategories = useMemo(() => {
    const ids = new Set(PRODUCTS.filter(p => p.units.includes(unitId)).map(p => p.category));
    return CATEGORIES.filter(c => ids.has(c.id));
  }, [unitId]);

  function handleAdd(product) {
    addItem(product);
    toast(`${product.name} adicionado!`, 'success');
  }

  function getQty(id) { return items.find(i => i.id === id)?.qty ?? 0; }

  return (
    <div className="min-h-screen bg-surface pb-24">
      <div className="sticky top-16 z-30 bg-surface border-b border-surface-border">
        <div className="px-4 py-4 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => navigate('/')} className="p-2 -ml-2 rounded-lg hover:bg-white/5 text-white/60">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-white">Cardápio</h1>
              <p className="text-xs text-primary flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {unit?.name}
              </p>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              className="w-full bg-white/5 border border-surface-border focus:border-primary text-white placeholder-white/30 rounded-lg px-4 py-2.5 pl-10 outline-none text-sm"
              placeholder="Buscar..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="px-4 pb-3 overflow-x-auto scrollbar-none">
          <div className="flex gap-4 max-w-3xl mx-auto">
            <button
              onClick={() => setActiveCategory('todos')}
              className={`pb-2 text-sm font-medium whitespace-nowrap transition-all relative ${
                activeCategory === 'todos' ? 'text-primary' : 'text-white/40 hover:text-white/60'
              }`}
            >
              Todos
              {activeCategory === 'todos' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full" />}
            </button>
            {availableCategories.map(c => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`pb-2 text-sm font-medium whitespace-nowrap transition-all relative flex items-center gap-1 ${
                  activeCategory === c.id ? 'text-primary' : 'text-white/40 hover:text-white/60'
                }`}
              >
                <span className="opacity-70">{c.icon}</span> {c.label}
                {activeCategory === c.id && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-4">
        {CAMPAIGNS.map(camp => (
          <div key={camp.id} className="mb-4 bg-primary/5 border border-primary/20 rounded-lg p-3 flex items-start gap-3">
            <div className="bg-primary/20 p-2 rounded-full text-primary shrink-0">
              <TicketPercent className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm text-white">{camp.title}</h4>
              <p className="text-white/40 text-xs mt-0.5">{camp.description}</p>
            </div>
          </div>
        ))}

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-white/30">
            <p className="text-sm">Nenhum item encontrado.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map(p => (
              <ProductRow
                key={p.id}
                product={p}
                qty={getQty(p.id)}
                onAdd={handleAdd}
                onRemove={removeItem}
              />
            ))}
          </div>
        )}
      </div>

      {count > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-40 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:max-w-sm">
          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-primary hover:bg-primary-dark text-white rounded-xl px-5 py-3.5 flex items-center justify-between font-medium transition-all shadow-lg"
          >
            <div className="flex items-center gap-2">
               <div className="bg-white/20 w-7 h-7 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-4 h-4" />
              </div>
              <span className="text-sm">{count} {count === 1 ? 'item' : 'itens'}</span>
            </div>
            <span className="text-sm">{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          </button>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 mt-8 pb-8">
        <div className="pt-6 border-t border-white/10 text-center">
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
