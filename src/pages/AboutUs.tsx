import React from 'react';
import Header from '../components/Header';

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">About Us</h1>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold">About Our Company</h2>
            <p className="mt-2 text-gray-600">
              We are a dedicated team committed to providing excellent service and high-quality products to our customers.
              Our mission is to create value through innovative solutions and exceptional customer experiences.
            </p>
            <p className="mt-4 text-gray-600">
              Founded in 2020, we've been growing steadily and expanding our offerings to meet the evolving needs of our clients.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;