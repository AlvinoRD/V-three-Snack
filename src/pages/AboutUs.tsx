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
              Vthree Snack adalah brand kuliner lokal yang berdedikasi menghadirkan aneka camilan berkualitas dengan cita rasa khas Indonesia. 
              Kami memproduksi berbagai jenis snack, mulai dari makanan ringan tradisional hingga kreasi modern, yang cocok dinikmati kapan saja. 
              Dengan mengutamakan bahan-bahan pilihan dan proses produksi yang higienis, Vthree Snack hadir sebagai solusi praktis dan lezat untuk menemani aktivitas harian Anda. 
              Kami percaya bahwa setiap gigitan membawa rasa, cerita, dan kebahagiaan.
            </p>
            <p className="mt-4 text-gray-600">
              Dibangun sejak 2009, kami telah tumbuh secara konsisten dan terus memperluas ragam produk kami untuk menjawab kebutuhan konsumen yang terus berkembang. 
              Berawal dari produksi camilan rumahan dalam skala kecil, Vthree Snack kini telah melayani berbagai segmen pasar, mulai dari individu, pelaku usaha, hingga penyelenggara acara. 
              Dengan komitmen terhadap kualitas, inovasi rasa, dan kepuasan pelanggan, kami terus berinovasi untuk menjadi pilihan utama dalam industri makanan ringan di Indonesia.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;