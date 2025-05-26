import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import AboutUs from './pages/AboutUs';
import MenuPage from './pages/MenuPage';
import MyOrders from './pages/MyOrders';
import OrderPage from './pages/OrderPage';
import CartPage from './pages/CartPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import ForgotPassword from './pages/ForgotPassword';
import { PrivateRoute } from './components/PrivateRoute';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Router>
        <AuthProvider>
          <CartProvider>
            <Routes>
              {/* Auth pages with background image */}
              <Route path="/login" element={
                <div className="min-h-screen flex flex-col"
                  style={{ 
                    backgroundImage: 'url(/mam.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}>
                  <Login />
                </div>
              } />
              
              <Route path='/forgot-password' element={
                <div className="min-h-screen flex flex-col"
                  style={{ 
                    backgroundImage: 'url(/mam.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}>
                  <ForgotPassword />
                </div>
              } />
              
              <Route path="/signup" element={
                <div className="min-h-screen flex flex-col"
                  style={{ 
                    backgroundImage: 'url(/mam.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}>
                  <SignUp />
                </div>
              } />
              
              {/* Public routes - dapat diakses tanpa login */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/menu" element={<MenuPage />} />
              
              {/* Protected routes - memerlukan login */}
              <Route 
                path="/MyOrders" 
                element={
                  <PrivateRoute>
                    <MyOrders />
                  </PrivateRoute>
                } 
              />
              
              <Route 
                path="/order" 
                element={
                  <PrivateRoute>
                    <OrderPage />
                  </PrivateRoute>
                } 
              />
              
              <Route 
                path="/cart" 
                element={
                  <PrivateRoute>
                    <CartPage />
                  </PrivateRoute>
                } 
              />
              
              <Route 
                path="/order-success" 
                element={
                  <PrivateRoute>
                    <OrderSuccessPage />
                  </PrivateRoute>
                } 
              />
              
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;