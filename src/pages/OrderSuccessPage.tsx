import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const OrderSuccessPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-12 pt-24 flex justify-center">
        <div className="bg-white p-6 rounded shadow max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold mb-4">Pesanan Berhasil Dibuat!</h1>
          
          <p className="mb-6">
            Terima kasih atas pesanan Anda. Kami telah menerima pesanan Anda dan akan segera memprosesnya.
          </p>
          
          <div className="mb-6 bg-gray-100 p-4 rounded text-sm">
            <p>
              Anda akan menerima email konfirmasi dengan detail pesanan Anda.
            </p>
          </div>
          
          <div className="flex flex-col space-y-3">
            <Link
              to="/MyOrders"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Lihat Pesanan Saya
            </Link>
            
            <Link
              to="/dashboard"
              className="px-4 py-2 border border-gray-300 rounded"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;