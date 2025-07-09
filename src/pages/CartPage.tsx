import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { addDocument } from '../firebase/firebase';
import { OrderStatus } from '../types/orderTypes';

const CartPage: React.FC = () => {
  // Hooks untuk cart dan auth
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  // State untuk form
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderNotes, setOrderNotes] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');

  // Fungsi untuk menambah kuantitas
  const handleIncreaseQuantity = (id: string) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      updateQuantity(id, item.quantity + 1);
    }
  };

  // Fungsi untuk mengurangi kuantitas
  const handleDecreaseQuantity = (id: string) => {
    const item = cartItems.find(item => item.id === id);
    if (item && item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);
    } else if (item && item.quantity === 1) {
      removeFromCart(id);
    }
  };

  // Fungsi untuk checkout pesanan
  const handleCheckout = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      return;
    }

    try {
      setIsSubmitting(true);

      // Simpan order ke Firestore
      await addDocument('orders', {
        userId: currentUser.uid,
        items: cartItems,
        totalPrice,
        status: OrderStatus.PENDING,
        paymentMethod,
        deliveryAddress,
        contactPhone,
        notes: orderNotes,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      // Bersihkan keranjang setelah order berhasil
      await clearCart();

      // Arahkan ke halaman sukses
      navigate('/order-success');

    } catch (error) {
      console.error('Error creating order:', error);
      alert('Gagal membuat pesanan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Lanjutkan belanja
  const continueShopping = () => {
    navigate('/order');
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-12 pt-24">
        <h1 className="text-2xl font-bold mb-6">Keranjang Belanja</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded p-6 text-center shadow">
            <h2 className="text-xl mb-4">Keranjang belanja Anda kosong</h2>
            <p className="mb-4">Belum ada item yang ditambahkan ke keranjang.</p>
            <button
              onClick={continueShopping}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Lihat Menu
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Daftar item keranjang */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded shadow">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left">Item</th>
                      <th className="px-4 py-2 text-center">Harga</th>
                      <th className="px-4 py-2 text-center">Jumlah</th>
                      <th className="px-4 py-2 text-right">Subtotal</th>
                      <th className="px-4 py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-2">{item.name}</td>
                        <td className="px-4 py-2 text-center">
                          Rp {item.price.toLocaleString('id-ID')}
                        </td>
                        <td className="px-4 py-2 text-center">
                          <div className="flex items-center justify-center">
                            <button
                              onClick={() => handleDecreaseQuantity(item.id)}
                              className="px-2 bg-gray-200 rounded"
                            >
                              -
                            </button>
                            <span className="mx-2">{item.quantity}</span>
                            <button
                              onClick={() => handleIncreaseQuantity(item.id)}
                              className="px-2 bg-gray-200 rounded"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-2 text-right">
                          Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                        </td>
                        <td className="px-4 py-2 text-right">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="p-4 flex justify-between">
                  <button
                    onClick={continueShopping}
                    className="text-blue-500"
                  >
                    ← Lanjutkan Belanja
                  </button>
                </div>
              </div>
            </div>

            {/* Form checkout */}
            <div>
              <div className="bg-white rounded p-4 shadow">
                <h2 className="text-xl font-semibold mb-4">Ringkasan Order</h2>

                <div className="mb-4">
                  <div className="flex justify-between py-2 border-b">
                    <span>Subtotal</span>
                    <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span>Biaya Pengiriman</span>
                    <span>Gratis</span>
                  </div>
                  <div className="flex justify-between py-2 font-semibold">
                    <span>Total</span>
                    <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                {/* Informasi pengiriman */}
                <div className="mb-4">
                  <label className="block font-medium mb-1">
                    Alamat Pengiriman
                  </label>
                  <textarea
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    rows={2}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-medium mb-1">
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-medium mb-1">
                    Metode Pembayaran
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                  >
                    <option value="cash">Bayar di Tempat</option>
                    <option value="transfer">Transfer Bank</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block font-medium mb-1">
                    Catatan Order (opsional)
                  </label>
                  <textarea
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    rows={2}
                    placeholder="Instruksi khusus untuk pesanan Anda..."
                  />
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isSubmitting || cartItems.length === 0 || !deliveryAddress || !contactPhone}
                  className="w-full py-2 bg-green-500 text-white rounded disabled:opacity-50"
                >
                  {isSubmitting ? 'Memproses...' : 'Checkout'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;