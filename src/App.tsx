import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import AboutUs from './pages/AboutUs';
import MenuPage from './pages/MenuPage';
import Locations from './pages/Locations';
import ForgotPassword from './pages/ForgotPassword';
import { PrivateRoute } from './components/PrivateRoute';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Router>
        <AuthProvider>
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
            
            {/* Protected routes */}
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            
            <Route 
              path="/about" 
              element={
                <PrivateRoute>
                  <AboutUs />
                </PrivateRoute>
              } 
            />
            
            <Route 
              path="/menu" 
              element={
                <PrivateRoute>
                  <MenuPage />
                </PrivateRoute>
              } 
            />
            
            <Route 
              path="/locations" 
              element={
                <PrivateRoute>
                  <Locations />
                </PrivateRoute>
              } 
            />
            
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;