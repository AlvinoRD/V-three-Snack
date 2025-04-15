import React from 'react';
import Header from '../components/Header';

const Locations: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Locations</h1>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold">Our Locations</h2>
            <div className="mt-4 space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-medium">Main Office</h3>
                <p className="text-gray-600 mt-1">123 Business Street, Suite 100</p>
                <p className="text-gray-600">City, State 12345</p>
                <p className="text-gray-600 mt-1">Phone: (123) 456-7890</p>
                <p className="text-gray-600">Hours: Mon-Fri, 9am - 5pm</p>
              </div>
              <div>
                <h3 className="font-medium">Branch Location</h3>
                <p className="text-gray-600 mt-1">456 Commerce Avenue</p>
                <p className="text-gray-600">Other City, State 67890</p>
                <p className="text-gray-600 mt-1">Phone: (098) 765-4321</p>
                <p className="text-gray-600">Hours: Mon-Fri, 9am - 5pm</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Locations;