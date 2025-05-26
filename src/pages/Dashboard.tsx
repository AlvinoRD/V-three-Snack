import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ChatBot from '../components/ChatBot';

const Dashboard: React.FC = () => {
  // Palette warna untuk ChatBot
  const colors = {
    base: "#FAEBD7", // Antique white base
    gold: "#D8B382", // Warm gold that complements the palette
    pink: "#CC8899", // Dusky rose
    darkPink: "#B4707F", // Darker rose for contrast
    sage: "#E6D7CE", // Soft neutral that complements both main colors
    brown: "#917681", // Muted rose-brown for footer
    text: "#6D5A60", // Muted text color that works with both main colors
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-12 pt-24">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        {/* Menu Navigasi Utama - menghapus Admin link */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link to="/menu" className="bg-white p-4 rounded shadow hover:shadow-md">
            <h2 className="text-xl font-semibold mb-2">Menu</h2>
            <p className="text-gray-600">Lihat daftar menu tersedia</p>
          </Link>
          
          <Link to="/order" className="bg-white p-4 rounded shadow hover:shadow-md">
            <h2 className="text-xl font-semibold mb-2">Order</h2>
            <p className="text-gray-600">Pesan makanan online</p>
          </Link>
        </div>
        
        {/* Ringkasan Informasi */}
        <div className="bg-white p-6 rounded shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Selamat Datang di V-THREE SNACK</h2>
          <p className="mb-4">
            Platform pemesanan makanan online untuk berbagai acara spesial. Silakan jelajahi menu kami dan lakukan pemesanan online.
          </p>
          <div className="flex space-x-3">
            <Link to="/about" className="text-blue-500 hover:underline">Tentang Kami</Link>
            <Link to="/locations" className="text-blue-500 hover:underline">My Orders</Link>
          </div>
        </div>

        {/* CTA Pemesanan */}
        <div className="bg-blue-50 p-6 rounded shadow text-center">
          <h2 className="text-2xl font-bold mb-4">Pesan Sekarang</h2>
          <p className="mb-6">Nikmati kelezatan menu kami dengan pemesanan mudah dan cepat.</p>
          <Link to="/order" className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Mulai Order
          </Link>
        </div>
      </div>
      
      {/* ChatBot */}
      <ChatBot colors={colors} />
    </div>
  );
};

export default Dashboard;