import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider }    from './context/AuthContext';
import { CartProvider }    from './context/CartContext';
import { ChannelProvider } from './context/ChannelContext';
import { ToastProvider }   from './context/ToastContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar         from './components/Navbar';
import AuthPage       from './pages/AuthPage';
import UnitSelectPage from './pages/UnitSelectPage';
import MenuPage       from './pages/MenuPage';
import CheckoutPage   from './pages/CheckoutPage';
import TrackingPage   from './pages/TrackingPage';

function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/auth" element={<AuthPage />} />

        <Route path="/" element={
          <ProtectedRoute><UnitSelectPage /></ProtectedRoute>
        } />
        <Route path="/menu" element={
          <ProtectedRoute><MenuPage /></ProtectedRoute>
        } />
        <Route path="/checkout" element={
          <ProtectedRoute><CheckoutPage /></ProtectedRoute>
        } />
        <Route path="/tracking" element={
          <ProtectedRoute><TrackingPage /></ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ChannelProvider>
        <AuthProvider>
          <CartProvider>
            <ToastProvider>
              <AppRoutes />
            </ToastProvider>
          </CartProvider>
        </AuthProvider>
      </ChannelProvider>
    </BrowserRouter>
  );
}
