import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext(null);

const CART_KEY   = 'raizes_cart';
const ORDERS_KEY = 'raizes_orders';

function loadCart()   { return JSON.parse(localStorage.getItem(CART_KEY)   || '[]'); }
function loadOrders() { return JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]'); }

const initialState = { items: loadCart(), orders: loadOrders(), unitId: null };

function reducer(state, action) {
  switch (action.type) {
    case 'SET_UNIT': return { ...state, unitId: action.payload, items: [] };

    case 'ADD': {
      const idx = state.items.findIndex(i => i.id === action.payload.id);
      const items = idx >= 0
        ? state.items.map((i, n) => n === idx ? { ...i, qty: i.qty + 1 } : i)
        : [...state.items, { ...action.payload, qty: 1 }];
      return { ...state, items };
    }

    case 'REMOVE': {
      const items = state.items
        .map(i => i.id === action.payload ? { ...i, qty: i.qty - 1 } : i)
        .filter(i => i.qty > 0);
      return { ...state, items };
    }

    case 'CLEAR_CART': return { ...state, items: [] };

    case 'PLACE_ORDER': {
      const order = {
        id: crypto.randomUUID(),
        unitId:    state.unitId,
        items:     state.items,
        total:     action.payload.total,
        payment:   action.payload.payment,
        status:    'received',
        statusIdx: 0,
        createdAt: Date.now(),
      };
      return { ...state, items: [], orders: [...state.orders, order] };
    }

    case 'ADVANCE_STATUS': {
      const orders = state.orders.map(o =>
        o.id === action.payload && o.statusIdx < 3
          ? { ...o, statusIdx: o.statusIdx + 1, status: ['received','preparing','ready','delivered'][o.statusIdx + 1] }
          : o
      );
      return { ...state, orders };
    }

    default: return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  /* Persiste carrinho e pedidos */
  useEffect(() => { localStorage.setItem(CART_KEY,   JSON.stringify(state.items));  }, [state.items]);
  useEffect(() => { localStorage.setItem(ORDERS_KEY, JSON.stringify(state.orders)); }, [state.orders]);

  const total = state.items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = state.items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{
      items:         state.items,
      orders:        state.orders,
      unitId:        state.unitId,
      total,
      count,
      setUnit:       (id)     => dispatch({ type: 'SET_UNIT',      payload: id }),
      addItem:       (p)      => dispatch({ type: 'ADD',           payload: p }),
      removeItem:    (id)     => dispatch({ type: 'REMOVE',        payload: id }),
      clearCart:     ()       => dispatch({ type: 'CLEAR_CART' }),
      placeOrder:    (data)   => dispatch({ type: 'PLACE_ORDER',   payload: data }),
      advanceStatus: (id)     => dispatch({ type: 'ADVANCE_STATUS', payload: id }),
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
