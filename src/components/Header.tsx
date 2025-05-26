import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logoutUser } from '../firebase/firebase';

const Header: React.FC = () => {
  // Ambil status login user dari context
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fungsi untuk menangani logout
  const handleLogout = async () => {
    try {
      console.log('Proses logout dimulai');
      await logoutUser();
      console.log('Logout berhasil, redirect ke halaman dashboard');
      navigate('/dashboard');
    } catch (error) {
      console.error('Gagal logout:', error);
      alert('Gagal logout. Silakan coba lagi.');
    }
  };

  // Menu navigasi utama - mengubah Locations menjadi My Orders
  const menuItems = [
    { name: 'About Us', href: '/about' },
    { name: 'Menu', href: '/menu' },
    { name: 'Order', href: '/order' },
    { name: 'My Orders', href: '/MyOrders' } // URL masih /locations tapi label diubah
  ];

  return (
    <header className="bg-white shadow fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/dashboard" className="font-bold text-xl">
              V-THREE SNACK
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="px-3 py-2 text-gray-700 hover:text-gray-900"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Login/Logout Button (Desktop) */}
          <div className="hidden md:block">
            {currentUser ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Logout
              </button>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
            >
              {isMobileMenuOpen ? 'Tutup' : 'Menu'}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-2 border-t">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 text-gray-700"
                >
                  {item.name}
                </Link>
              ))}
              
              {currentUser ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-gray-700"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-gray-700"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-gray-700"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;