import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';

const ICONS = {
  success: <CheckCircle  className="w-5 h-5 text-green-400" />,
  error:   <XCircle      className="w-5 h-5 text-red-400" />,
  info:    <Info         className="w-5 h-5 text-blue-400" />,
  warning: <AlertTriangle className="w-5 h-5 text-yellow-400" />,
};

export default function Toast({ message, type = 'info', onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const t = setTimeout(() => { setVisible(false); setTimeout(onClose, 300); }, 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`
      flex items-center gap-3 glass-card px-4 py-3 shadow-2xl min-w-[280px]
      transition-all duration-300 border-l-4
      ${type === 'success' ? 'border-green-500' : type === 'error' ? 'border-red-500' : type === 'warning' ? 'border-yellow-500' : 'border-blue-500'}
      ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
    `}>
      {ICONS[type]}
      <span className="text-sm text-white/90 flex-1">{message}</span>
      <button onClick={() => { setVisible(false); setTimeout(onClose, 300); }}>
        <X className="w-4 h-4 text-white/40 hover:text-white" />
      </button>
    </div>
  );
}
