import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Minus, ShoppingCart, MapPin, ArrowLeft, TicketPercent } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { PRODUCTS, CATEGORIES, UNITS, CAMPAIGNS } from '../data/seed';

function ProductRow({ product, qty, onAdd, onRemove }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 border-b border-surface-border/60 hover:bg-white/[0.02] transition-colors px-3 -mx-3 rounded-2xl">
      <div className="flex-1 min-w-0 pr-4">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="font-bold text-lg text-white/90">{product.name}</h3>
          {product.badge && (
            <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">{product.badge}</span>
          )}
        </div>
        <p className="text-white/50 text-sm leading-relaxed mb-3 sm:mb-0 max-w-2xl">{product.desc}</p>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0 mt-2 sm:mt-0">
        <span className="font-semibold text-lg text-white">
          {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </span>

        {qty > 0 ? (
          <div className="flex items-center gap-3 bg-surface-card border border-surface-border rounded-full px-1.5 py-1.5 shadow-sm">
            <button onClick={() => onRemove(product.id)} className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-bold text-sm w-4 text-center">{qty}</span>
            <button onClick={() => onAdd(product)} className="w-8 h-8 rounded-full bg-primary hover:bg-primary-dark flex items-center justify-center transition-colors text-white shadow-md shadow-primary/30">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button onClick={() => onAdd(product)} className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-surface-border hover:border-primary/50 hover:bg-primary/5 text-sm font-semibold transition-all">
            <Plus className="w-4 h-4 text-white/50" /> Adicionar
          </button>
        )}
      </div>
    </div>
  );
}

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('todos');
  const [search, setSearch]                 = useState('');

  const { unitId, items, addItem, removeItem, count, total } = useCart();
  const toast    = useToast();
  const navigate = useNavigate();

  const unit = UNITS.find(u => u.id === unitId);

  /* Filtra por unidade, categoria e busca */
  const filtered = useMemo(() => {
    let list = PRODUCTS.filter(p => p.units.includes(unitId));
    if (activeCategory !== 'todos') list = list.filter(p => p.category === activeCategory);
    if (search.trim())              list = list.filter(p =>
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
    <div className="min-h-screen bg-surface pb-32">
      <div className="pt-8 pb-4 px-4 sticky top-16 z-30 bg-surface/80 backdrop-blur-xl border-b border-surface-border/50">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/')} className="p-2 -ml-2 rounded-full hover:bg-white/5 transition-colors text-white/60 hover:text-white" title="Voltar para unidades">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Cardápio</h1>
              <p className="text-sm text-primary flex items-center gap-1.5 mt-0.5 font-medium">
                <MapPin className="w-3.5 h-3.5" /> {unit?.name}
              </p>
            </div>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              className="w-full bg-white/5 border border-surface-border focus:border-primary focus:bg-white/10 text-white placeholder-white/30 rounded-full px-4 py-2.5 pl-10 outline-none transition-all text-sm"
              placeholder="Buscar prato ou bebida..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-8">
        {CAMPAIGNS.map(camp => (
          <div key={camp.id} className="mb-8 bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 rounded-2xl p-4 flex items-start sm:items-center gap-4 animate-fade-in shadow-lg shadow-primary/5">
            <div className="bg-primary/20 p-3 rounded-full text-primary shrink-0">
              <TicketPercent className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-white text-lg">{camp.title}</h4>
              <p className="text-white/60 text-sm mt-0.5">{camp.description}</p>
            </div>
            <div className="hidden sm:block">
              <span className="px-3 py-1.5 border border-primary/30 rounded-lg text-primary text-sm font-mono font-bold bg-primary/10 tracking-wider select-all" title="Copiar cupom">
                {camp.code}
              </span>
            </div>
          </div>
        ))}

        <div className="flex gap-8 overflow-x-auto pb-4 mb-6 scrollbar-none border-b border-surface-border/50 mask-fade-edges">
          <button
            onClick={() => setActiveCategory('todos')}
            className={`shrink-0 pb-3 text-sm font-medium transition-all relative
              ${activeCategory === 'todos' ? 'text-primary' : 'text-white/50 hover:text-white'}`}
          >
            Todos
            {activeCategory === 'todos' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full shadow-[0_0_8px_rgba(255,107,53,0.5)]" />}
          </button>
          {availableCategories.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`shrink-0 pb-3 text-sm font-medium transition-all relative flex items-center gap-2
                ${activeCategory === c.id ? 'text-primary' : 'text-white/50 hover:text-white'}`}
            >
              <span className="opacity-70">{c.icon}</span> {c.label}
              {activeCategory === c.id && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full shadow-[0_0_8px_rgba(255,107,53,0.5)]" />}
            </button>
          ))}
        </div>

        <div className="animate-fade-in">
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-white/30">
              <span className="text-4xl block mb-4 opacity-30">🔍</span>
              <p>Nenhum item encontrado nesta unidade.</p>
            </div>
          ) : (
            <div className="flex flex-col">
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
      </div>

      {count > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-sm animate-slide-up">
          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-primary hover:bg-primary-dark text-white shadow-2xl shadow-primary/30 rounded-full px-6 py-4 flex items-center justify-between font-semibold transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-4 h-4" />
              </div>
              <span>{count} {count === 1 ? 'item' : 'itens'}</span>
            </div>
            <span>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          </button>
        </div>
      )}
    </div>
  );
}
