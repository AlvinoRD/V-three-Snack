import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const Dashboard: React.FC = () => {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="flex flex-col" style={{ backgroundColor: "#FAF3E0" }}>
    <Header />
    
<div
  className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative"
  style={{ 
    backgroundImage: "url('/kumpulan.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }}
>
  {/* Semi-transparent overlay for better text readability */}
  <div className="absolute inset-0 bg-black bg-opacity-50"></div>
  
  <div className="max-w-4xl mx-auto relative z-10">
    <h1
      className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white"
      style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
    >
      KELEZATAN DALAM SETIAP HIDANGAN
    </h1>
    <p
      className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-white"
      style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.5)" }}
    >
      Catering berkualitas untuk semua acara spesial Anda
    </p>
    <button
      className="px-10 py-4 text-lg font-medium rounded-full transition duration-300 shadow-lg hover:bg-yellow-400 transform hover:scale-105"
      style={{
        backgroundColor: "#F4D35E",
        color: "#8B5E3C",
        border: "2px solid #6DBE45",
      }}
    >
      KONSULTASI
    </button>
  </div>
</div>

      <div
      className="min-h-screen flex py-20 px-4"
      style={{ backgroundColor: "#6DBE45", color: "#FAF3E0" }}
    >
      <div className="container mx-auto flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 mb-12 lg:mb-0">
          <h2
            className="text-6xl sm:text-7xl md:text-8xl font-bold mb-8 leading-tight"
            style={{ color: "#F4D35E" }}
          >
            ABOUT<br />V-THREE<br />SNACK
          </h2>
        </div>
        <div className="lg:w-1/2 lg:pl-12">
          <p className="text-lg md:text-xl mb-8 leading-relaxed">
            V-THREE SNACK lahir dari persahabatan dan kecintaan pada makanan berkualitas. Pendiri kami,
            yang merupakan sahabat dekat, menghabiskan banyak waktu untuk menciptakan kombinasi rasa
            yang sempurna dengan tetap menghormati tradisi kuliner yang ada sebelumnya.
          </p>
          <Link
            to="/about"
            className="inline-block px-8 py-3 rounded-full font-medium text-lg transition duration-300"
            style={{
              backgroundColor: "#F4D35E",
              color: "#8B5E3C",
              border: "2px solid #8B5E3C",
            }}
          >
            LEARN MORE
          </Link>
          </div>
        </div>
      </div>
      
      <div className="min-h-screen py-20 px-4" style={{ backgroundColor: "#F4D35E" }}>
      <div className="container mx-auto">
        <h2
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-16"
          style={{ color: "#8B5E3C" }}
        >
          LIHAT MENU KAMI
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Menu Item 1 */}
          <div className="flex flex-col items-center">
            <div
              className="rounded-full w-64 h-64 mb-6 flex items-center justify-center overflow-hidden"
              style={{ backgroundColor: "#FAF3E0" }}
            >
              <div className="text-6xl" style={{ color: "#6DBE45" }}>Paket A</div>
            </div>
            <h3 className="text-2xl font-bold mb-2" style={{ color: "#8B5E3C" }}>PAKET HEMAT</h3>
            <div className="text-center mb-4" style={{ color: "#8B5E3C" }}>
              <p className="font-medium">BAHAN-BAHAN:</p>
              <p>Nasi Putih, Ayam Goreng, Sayur Asem, Kerupuk, Air Mineral</p>
            </div>
            <p className="font-bold" style={{ color: "#6DBE45" }}>Rp 25.000</p>
          </div>
          {/* Menu Item 2 */}
          <div className="flex flex-col items-center transform md:scale-110">
            <div
              className="rounded-full w-64 h-64 mb-6 flex items-center justify-center overflow-hidden"
              style={{ backgroundColor: "#FAF3E0" }}>
                 <div className="text-6xl" style={{ color: "#6DBE45" }}>Paket B</div>
            </div>
            <h3 className="text-2xl font-bold mb-2" style={{ color: "#8B5E3C" }}>PAKET SPESIAL</h3>
            <div className="text-center mb-4" style={{ color: "#8B5E3C" }}>
              <p className="font-medium">BAHAN-BAHAN:</p>
              <p>Nasi Putih, Ayam Bakar, Sop Buntut, Tahu/Tempe, Kerupuk, Es Teh</p>
            </div>
            <p className="font-bold" style={{ color: "#6DBE45" }}>Rp 35.000</p>
          </div>
          {/* Menu Item 3 */}
          <div className="flex flex-col items-center">
            <div
              className="rounded-full w-64 h-64 mb-6 flex items-center justify-center overflow-hidden"
              style={{ backgroundColor: "#FAF3E0" }}
            >
              <div className="text-6xl" style={{ color: "#6DBE45" }}>Paket C</div>
            </div>
            <h3 className="text-2xl font-bold mb-2" style={{ color: "#8B5E3C" }}>PAKET PREMIUM</h3>
            <div className="text-center mb-4" style={{ color: "#8B5E3C" }}>
              <p className="font-medium">BAHAN-BAHAN:</p>
              <p>Nasi Putih, Ikan Bakar, Sop Iga, Cah Kangkung, Kerupuk, Es Jeruk</p>
            </div>
            <p className="font-bold" style={{ color: "#6DBE45" }}>Rp 45.000</p>
          </div>
        </div>
          
         <div className="flex justify-center">
          <Link
            to="/menu"
            className="inline-block px-10 py-4 rounded-full font-medium text-lg transition duration-300 shadow-lg"
            style={{
              backgroundColor: "#6DBE45",
              color: "#FAF3E0",
              border: "2px solid #8B5E3C",
            }}
          >
            LIHAT MENU LENGKAP
          </Link>
        </div>
      </div>
    </div>

      <div className="py-20 px-4" style={{ backgroundColor: "#FAF3E0" }}>
      <div className="container mx-auto">
        <h2
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-16"
          style={{ color: "#6DBE45" }}
        >
          FOLLOW US ON INSTAGRAM
        </h2>
          
          <div className="flex justify-center">
            <div 
              className="instagram-container" 
              dangerouslySetInnerHTML={{ 
                __html: `
                  <blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/reel/DIbcIcnBpK5/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/reel/DIbcIcnBpK5/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/reel/DIbcIcnBpK5/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by hansen vendi agus (@hansenvendiagus)</a></p></div></blockquote>
                `
              }} 
            />
          </div>
        </div>
      </div>
      
      {/* Locations Section */}
      <div className="min-h-screen py-20 px-4" style={{ backgroundColor: "#6DBE45" }}>
      <div className="container mx-auto">
        <h2
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-16"
          style={{ color: "#FAF3E0" }}
        >
          LOKASI KAMI
        </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Location 1 */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-4 text-blue-600">Kantor Pusat</h3>
              <div className="mb-6 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                {/* Placeholder for map or location image */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="font-medium mr-2">Alamat:</span>
                  <span>Jl. Pahlawan No. 123, Jakarta Pusat, 10110</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">Telepon:</span>
                  <span>(021) 1234-5678</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">Jam Buka:</span>
                  <span>Senin - Jumat: 08.00 - 17.00</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">Email:</span>
                  <span>info@vthreesnack.com</span>
                </li>
              </ul>
            </div>
            
            {/* Location 2 */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-4 text-blue-600">Cabang Surabaya</h3>
              <div className="mb-6 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                {/* Placeholder for map or location image */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="font-medium mr-2">Alamat:</span>
                  <span>Jl. Pemuda No. 456, Surabaya, 60271</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">Telepon:</span>
                  <span>(031) 9876-5432</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">Jam Buka:</span>
                  <span>Senin - Sabtu: 09.00 - 18.00</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">Email:</span>
                  <span>surabaya@vthreesnack.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex justify-center mt-12">
          <Link
            to="/locations"
            className="inline-block px-10 py-4 rounded-full font-medium text-lg transition duration-300 shadow-lg"
            style={{
              backgroundColor: "#F4D35E",
              color: "#8B5E3C",
              border: "2px solid #8B5E3C",
            }}
          >
            LIHAT SEMUA LOKASI
          </Link>
        </div>
      </div>
    </div>

       

      <footer className="text-white" style={{ backgroundColor: "#8B5E3C" }}>
        {/* Main Footer Content */}
        <div className="container mx-auto py-12 px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            {/* Logo/Brand */}
            <div className="mb-8 md:mb-0">
              <Link to="/dashboard" className="text-3xl font-bold">
                V-THREE SNACK
              </Link>
            </div>
            
            {/* Navigation Links */}
            <div className="grid grid-cols-2 gap-x-12 gap-y-4 mb-8 md:mb-0">
              <Link to="/about" className="font-medium hover:text-gray-200 transition">
                ABOUT US
              </Link>
              <Link to="#" className="font-medium hover:text-gray-200 transition">
                DELIVERY
              </Link>
              <Link to="/menu" className="font-medium hover:text-gray-200 transition">
                MENU
              </Link>
              <Link to="/locations" className="font-medium hover:text-gray-200 transition">
                LOCATION
              </Link>
            </div>
            
            {/* Contact/Social */}
            <div className="flex flex-col items-end">
              <div className="flex space-x-4 mb-4">
                {/* Social Icons */}
                <a href="#" className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#" className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <Link to="#" className="bg-white text-blue-600 px-4 py-2 rounded-full font-medium text-sm hover:bg-gray-100 transition">
                  LOYALTY PROGRAM
                </Link>
              </div>
              
              {/* Contact */}
              <div className="flex items-center">
                <span className="mr-2">CONTACT US:</span>
                <a href="mailto:hello@vthreesnack.com" className="flex items-center hover:underline">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  HELLO@VTHREESNACK.COM
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Footer / Copyright */}
        <div className="border-t">
          <div className="container mx-auto py-4 px-4 flex flex-col md:flex-row justify-between items-center text-sm">
            <div className="flex space-x-8 mb-4 md:mb-0">
              <Link to="#" className="hover:underline">TERMS OF SERVICE</Link>
              <Link to="#" className="hover:underline">PRIVACY POLICY</Link>
              <Link to="#" className="hover:underline">COOKIES</Link>
            </div>
            <div>
              © 2025, V-THREE SNACK ALL RIGHTS RESERVED.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;