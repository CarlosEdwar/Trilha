import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, MapPin, LogOut, ClipboardList, Star, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useChannel } from '../context/ChannelContext';
import { UNITS } from '../data/seed';
import restauranteIcon from '../assets/restaurante.png';

//Canal Por Cor
const CHANNEL_COLORS = {
  Web:   'bg-blue-500/20 text-blue-400',
  App:   'bg-green-500/20 text-green-400',
  Totem: 'bg-yellow-500/20 text-yellow-400',
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

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img src={restauranteIcon} alt="Raízes Logo" className="w-6 h-6 object-contain group-hover:scale-110 transition-transform" />
          <span className="font-bold text-lg tracking-tight">Raízes<span className="text-primary">.</span></span>
        </Link>

        {/* Unidade escolhida */}
        {unit && (
          <button
            onClick={() => navigate('/')}
            className="hidden sm:flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
          >
            <MapPin className="w-3.5 h-3.5" />
            {unit.name}
          </button>
        )}

        <div className="flex items-center gap-2 ml-auto">
          {/* Canal */}
          <span className={`badge ${CHANNEL_COLORS[channel] ?? CHANNEL_COLORS.Web} hidden sm:inline-flex`}>
            {channel}
          </span>

          {user && (
            <div className="hidden sm:flex items-center gap-1.5 bg-yellow-500/10 text-yellow-400 px-3 py-1.5 rounded-full text-xs font-bold border border-yellow-500/20 shadow-[0_0_10px_rgba(234,179,8,0.1)] ml-2" title="Programa de Fidelidade Raízes">
              <Star className="w-3.5 h-3.5 fill-current" />
              {user.points || 0} pts
            </div>
          )}

          <button
            onClick={() => navigate('/lgpd')}
            className={`btn-ghost p-2 ${pathname === '/lgpd' ? 'text-primary' : ''}`}
            title="Privacidade e LGPD"
          >
            <Shield className="w-5 h-5" />
          </button>

          {user && (
            <button
              onClick={() => navigate('/tracking')}
              className={`btn-ghost p-2 relative ${pathname === '/tracking' ? 'text-primary' : ''}`}
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
