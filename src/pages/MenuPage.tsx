import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { getCollection } from '../firebase/firebase';
import { MenuItem } from '../types/menuTypes';

const MenuPage: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const items = await getCollection('menuItems');
        
        // Jika tidak ada data di Firestore, gunakan data statis
        if (items && items.length > 0) {
          setMenuItems(items as MenuItem[]);
          
          // Extract unique categories
          const uniqueCategories = Array.from(
            new Set(items.map((item: any) => item.category))
          );
          setCategories(uniqueCategories as string[]);
        } else {
          // Data statis jika Firestore kosong
          const staticData = [
            { id: '1', name: 'Tahu', price: 4000, category: 'Appetizers' },
          ];
          setMenuItems(staticData);
          setCategories(['Appetizers', 'Main Courses', 'Desserts']);
        }
      } catch (err) {
        console.error("Error fetching menu items:", err);
        setError("Failed to load menu items. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Menu</h1>
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold">Our Menu</h2>
              <div className="mt-4 space-y-4">
                {categories.map((category) => (
                  <div key={category} className="border-b pb-2">
                    <h3 className="font-medium">{category}</h3>
                    <ul className="mt-2 space-y-1 text-gray-600">
                      {menuItems
                        .filter(item => item.category === category)
                        .map(item => (
                          <li key={item.id}>
                            {item.name} - Rp {item.price.toLocaleString('id-ID')}
                            {item.isPopular && (
                              <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded">
                                Popular
                              </span>
                            )}
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MenuPage;