import { createContext, useContext, useState, useEffect } from 'react';

const ChannelContext = createContext(null);

/**
 * Detecta canal pelo query param ?channel.
 * Prioridade: URL param → UA touch → UA tablet → Web
 */
function detectChannel() {
  const param = new URLSearchParams(window.location.search).get('channel');
  if (param) return param.charAt(0).toUpperCase() + param.slice(1).toLowerCase();

  const ua = navigator.userAgent.toLowerCase();
  const isTouch  = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isTablet = /ipad|tablet|(android(?!.*mobile))/.test(ua);

  if (isTouch && isTablet) return 'Totem';
  if (isTouch)             return 'App';
  return 'Web';
}

export function ChannelProvider({ children }) {
  const [channel, setChannel] = useState(detectChannel);

  /* Aplica classe CSS no <html> para canais especificos */
  useEffect(() => {
    document.documentElement.dataset.channel = channel.toLowerCase();
  }, [channel]);

  return (
    <ChannelContext.Provider value={{ channel, setChannel }}>
      {children}
    </ChannelContext.Provider>
  );
}

export const useChannel = () => useContext(ChannelContext);
