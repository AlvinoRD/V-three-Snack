import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { getOrdersByUserId } from '../firebase/firebase';

interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalPrice: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: { seconds: number };
  address?: string;
  paymentMethod?: string;
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const MyOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrders, setCurrentOrders] = useState<Order[]>([]);
  const [historyOrders, setHistoryOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (orders.length > 0) {
      // Pesanan saat ini adalah yang statusnya pending atau processing
      const current = orders.filter(order => 
        order.status === 'pending' || order.status === 'processing'
      );
      
      // Riwayat pesanan adalah yang statusnya completed atau cancelled
      const history = orders.filter(order => 
        order.status === 'completed' || order.status === 'cancelled'
      );
      
      setCurrentOrders(current);
      setHistoryOrders(history);
    }
  }, [orders]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      
      if (!currentUser?.uid) {
        setError("User ID tidak ditemukan");
        setLoading(false);
        return;
      }

      // Menggunakan fungsi getOrdersByUserId yang baru dibuat
      const userOrders = await getOrdersByUserId(currentUser.uid);
      
      if (userOrders && userOrders.length > 0) {
        // Sort berdasarkan waktu terbaru
        const sortedOrders = userOrders
          .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
        
        setOrders(sortedOrders);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load your orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Format tanggal dari timestamp
  const formatDate = (seconds: number) => {
    const date = new Date(seconds * 1000);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Tampilan untuk status pesanan
  const OrderStatus = ({ status }: { status: string }) => {
    let bgColor = '';
    let textColor = 'text-white';
    
    switch (status) {
      case 'pending':
        bgColor = 'bg-yellow-500';
        break;
      case 'processing':
        bgColor = 'bg-blue-500';
        break;
      case 'completed':
        bgColor = 'bg-green-500';
        break;
      case 'cancelled':
        bgColor = 'bg-red-500';
        break;
      default:
        bgColor = 'bg-gray-500';
    }
    
    return (
      <span className={`${bgColor} ${textColor} px-2 py-1 rounded text-xs font-medium`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Jika belum login, tampilkan pesan dan tombol login
  if (!currentUser) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center p-6 max-w-md">
            <h2 className="text-2xl font-bold mb-4">Login Required</h2>
            <p className="mb-6">Please login to view your order history.</p>
            <button
              onClick={() => navigate('/login')}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
            >
              Login
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 overflow-auto pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">My Orders</h1>
          
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          ) : (
            <>
              {/* Current Orders Section */}
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Current Orders</h2>
                {currentOrders.length === 0 ? (
                  <p className="text-gray-500">You don't have any active orders.</p>
                ) : (
                  <div className="space-y-6">
                    {currentOrders.map(order => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm text-gray-500">Order ID: {order.id}</p>
                            <p className="text-sm text-gray-500">
                              {order.createdAt ? formatDate(order.createdAt.seconds) : 'Date not available'}
                            </p>
                          </div>
                          <OrderStatus status={order.status} />
                        </div>
                        
                        <div className="mt-3">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm py-1">
                              <span>
                                {item.name} x {item.quantity}
                              </span>
                              <span>
                                Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                              </span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-3 pt-3 border-t flex justify-between font-medium">
                          <span>Total</span>
                          <span>Rp {order.totalPrice.toLocaleString('id-ID')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Order History Section */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Order History</h2>
                {historyOrders.length === 0 ? (
                  <p className="text-gray-500">You don't have any past orders.</p>
                ) : (
                  <div className="space-y-6">
                    {historyOrders.map(order => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm text-gray-500">Order ID: {order.id}</p>
                            <p className="text-sm text-gray-500">
                              {order.createdAt ? formatDate(order.createdAt.seconds) : 'Date not available'}
                            </p>
                          </div>
                          <OrderStatus status={order.status} />
                        </div>
                        
                        <div className="mt-3">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm py-1">
                              <span>
                                {item.name} x {item.quantity}
                              </span>
                              <span>
                                Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                              </span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-3 pt-3 border-t flex justify-between font-medium">
                          <span>Total</span>
                          <span>Rp {order.totalPrice.toLocaleString('id-ID')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyOrders;