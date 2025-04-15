import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logoutUser } from '../firebase/firebase';

const Header: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll event listener to detect when page is scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Clean up the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  // Menu items with proper routes
  const menuItems = [
    { name: 'About Us', href: '/about' },
    { name: 'Menu', href: '/menu' },
    { name: 'Locations', href: '/locations' },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#6DBE45] bg-opacity-95 shadow-md' : 'bg-transparent shadow-none'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm font-medium text-white hover:text-gray-200 transition-colors"
                style={{ textShadow: isScrolled ? 'none' : "1px 1px 2px rgba(0,0,0,0.3)" }}
              >
                {item.name.toUpperCase()}
              </Link>
            ))}
          </div>

          {/* Brand Logo/Name - Center */}
          <div 
            className="flex-1 flex justify-center md:flex-none md:absolute md:left-1/2 md:transform md:-translate-x-1/2 cursor-pointer"
            onClick={() => navigate('/dashboard')}
          >
            <div className="text-white text-2xl font-bold" 
              style={{ textShadow: isScrolled ? 'none' : "2px 2px 4px rgba(0,0,0,0.5)" }}
            >
              V-THREE SNACK
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-gray-700 hover:bg-opacity-25 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Right Side - Logout Button */}
          <div className="hidden md:flex items-center">
            <button
              onClick={handleLogout}
              className="px-6 py-2 rounded-full text-white transition duration-300 hover:bg-opacity-80 focus:outline-none"
              style={{
                backgroundColor: "#F4D35E",
                color: "#8B5E3C",
                border: "2px solid #6DBE45",
              }}
            >
              LOGOUT
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black bg-opacity-75 rounded-b-lg">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 hover:bg-opacity-50"
            >
              {item.name}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="mt-2 w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white hover:bg-opacity-90"
            style={{
              backgroundColor: "#F4D35E",
              color: "#8B5E3C",
              border: "2px solid #6DBE45",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;