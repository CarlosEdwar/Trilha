import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, MapPin, LogOut, ClipboardList, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useChannel } from '../context/ChannelContext';
import { UNITS } from '../data/seed';
import restauranteIcon from '../assets/restaurante.png';

const CHANNEL_COLORS = {
  Web:   'bg-white/10 text-white/60',
  App:   'bg-white/10 text-white/60',
  Totem: 'bg-white/10 text-white/60',
};

export default function Navbar() {
  const { user, logout } = useAuth();
  const { count, unitId } = useCart();
  const { channel }       = useChannel();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const unit = UNITS.find(u => u.id === unitId);

  function handleLogout() { logout(); navigate('/auth'); }

  return (
    <nav className="sticky top-0 z-50 bg-surface-glass backdrop-blur-glass border-b border-surface-border">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

        <Link to="/" className="flex items-center gap-2 group">
          <img src={restauranteIcon} alt="Raízes Logo" className="w-6 h-6 object-contain" />
          <span className="font-semibold text-base tracking-tight text-white">Raízes do Nordeste<span className="text-primary"></span></span>
        </Link>

        {unit && (
          <button
            onClick={() => navigate('/')}
            className="hidden sm:flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors"
          >
            <MapPin className="w-3.5 h-3.5" />
            {unit.name}
          </button>
        )}

        <div className="flex items-center gap-2 ml-auto">
          <span className={`badge ${CHANNEL_COLORS[channel]} hidden sm:inline-flex text-xs`}>
            {channel}
          </span>

          {user && (
            <div className="hidden sm:flex items-center gap-1.5 bg-white/5 text-white/60 px-2.5 py-1 rounded-full text-xs font-medium border border-white/10 ml-2" title="Programa de Fidelidade Raízes">
              <Star className="w-3.5 h-3.5" />
              {user.points || 0} pts
            </div>
          )}

          {user && (
            <button
              onClick={() => navigate('/tracking')}
              className={`btn-ghost p-2 ${pathname === '/tracking' ? 'text-primary' : ''}`}
              title="Meus pedidos"
            >
              <ClipboardList className="w-5 h-5" />
            </button>
          )}

          {user && pathname !== '/checkout' && (
            <button
              onClick={() => navigate('/checkout')}
              className="relative btn-ghost p-2"
              title="Carrinho"
            >
              <ShoppingCart className="w-5 h-5" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </button>
          )}

          {user && (
            <button onClick={handleLogout} className="btn-ghost p-2" title="Sair">
              <LogOut className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
