import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Header from '../components/Header';
import { getCollection } from '../firebase/firebase';
import { MenuItem } from '../types/menuTypes';
import { CartItem } from '../types/orderTypes';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const OrderPage: React.FC = () => {
  // State untuk menyimpan data
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Hooks untuk cart dan auth
  const { addToCart, cartItems, totalItems, totalPrice } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Mengambil data menu dari Firestore saat komponen dimuat
  useEffect(() => {
    fetchMenuItems();
  }, []);

  // Fungsi untuk mengambil menu dari Firestore
  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      
      // Mengambil data dari koleksi 'menuItems'
      const items = await getCollection('menuItems');
      
      if (items && items.length > 0) {
        // Jika ada data di Firestore, gunakan data tersebut
        setMenuItems(items as MenuItem[]);
        
        // Ambil kategori unik
        const uniqueCategories = Array.from(
          new Set(items.map((item: any) => item.category))
        );
        setCategories(uniqueCategories as string[]);
        
        // Pilih kategori pertama sebagai default
        if (uniqueCategories.length > 0) {
          setSelectedCategory(uniqueCategories[0] as string);
        }
      } else {
        // Jika tidak ada data, gunakan data statis
        const staticData = [
          { id: '1', name: 'Spring Rolls', price: 5.99, category: 'Appetizers', description: 'Crispy spring rolls filled with vegetables', available: true },
          { id: '2', name: 'Garlic Bread', price: 4.50, category: 'Appetizers', description: 'Toasted bread with garlic butter', available: true },
          { id: '3', name: 'Mozzarella Sticks', price: 6.99, category: 'Appetizers', description: 'Breaded mozzarella sticks with marinara sauce', available: true },
          { id: '4', name: 'Grilled Salmon', price: 18.99, category: 'Main Courses', description: 'Fresh salmon fillet with herbs', available: true },
          { id: '5', name: 'Pasta Carbonara', price: 14.50, category: 'Main Courses', description: 'Classic pasta with creamy sauce', available: true },
          { id: '6', name: 'Steak with Fries', price: 22.99, category: 'Main Courses', description: 'Juicy steak served with seasoned fries', available: true },
          { id: '7', name: 'Chocolate Cake', price: 6.99, category: 'Desserts', description: 'Rich chocolate cake with frosting', available: true },
          { id: '8', name: 'Ice Cream', price: 4.50, category: 'Desserts', description: 'Assorted ice cream flavors', available: true },
          { id: '9', name: 'Apple Pie', price: 5.99, category: 'Desserts', description: 'Homemade apple pie with cinnamon', available: true },
        ];
        setMenuItems(staticData);
        setCategories(['Appetizers', 'Main Courses', 'Desserts']);
        setSelectedCategory('Appetizers');
      }
    } catch (err) {
      console.error("Error fetching menu items:", err);
      setError("Failed to load menu items. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk menambahkan item ke cart
  const handleAddToCart = (item: MenuItem) => {
    if (!currentUser) {
      // Redirect ke login jika belum login
      navigate('/login');
      return;
    }

    // Buat objek CartItem dari MenuItem
    const cartItem: CartItem = {
      id: uuidv4(),
      menuItemId: item.id || '',
      name: item.name,
      price: item.price,
      quantity: 1,
      imageUrl: item.imageUrl
    };

    // Tambahkan ke cart menggunakan context function
    addToCart(cartItem);
    alert(`${item.name} ditambahkan ke keranjang!`);
  };

  // Fungsi untuk melihat cart
  const viewCart = () => {
    navigate('/cart');
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-12 pt-24">
        {/* Header dengan tombol cart */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Order Menu</h1>
          <button
            onClick={viewCart}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Cart ({totalItems}) - Rp {totalPrice.toLocaleString('id-ID')}
          </button>
        </div>
        
        {/* Filter kategori */}
        <div className="mb-8">
          <div className="flex space-x-2 mb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded ${
                  selectedCategory === category 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Display menu items */}
        {loading ? (
          <p>Loading menu items...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuItems
              .filter(item => selectedCategory === null || item.category === selectedCategory)
              .filter(item => item.available !== false)
              .map((item) => (
                <div key={item.id} className="border rounded p-4">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="font-bold mt-2">Rp {item.price.toLocaleString('id-ID')}</p>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="mt-2 px-3 py-1 bg-green-500 text-white text-sm rounded"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;