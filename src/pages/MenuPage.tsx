import React from 'react';
import Header from '../components/Header';

const MenuPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Menu</h1>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold">Our Menu</h2>
            <div className="mt-4 space-y-4">
              <div className="border-b pb-2">
                <h3 className="font-medium">Appetizers</h3>
                <ul className="mt-2 space-y-1 text-gray-600">
                  <li>Spring Rolls - $5.99</li>
                  <li>Garlic Bread - $4.50</li>
                  <li>Mozzarella Sticks - $6.99</li>
                </ul>
              </div>
              <div className="border-b pb-2">
                <h3 className="font-medium">Main Courses</h3>
                <ul className="mt-2 space-y-1 text-gray-600">
                  <li>Grilled Salmon - $18.99</li>
                  <li>Pasta Carbonara - $14.50</li>
                  <li>Steak with Fries - $22.99</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium">Desserts</h3>
                <ul className="mt-2 space-y-1 text-gray-600">
                  <li>Chocolate Cake - $6.99</li>
                  <li>Ice Cream - $4.50</li>
                  <li>Apple Pie - $5.99</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MenuPage;