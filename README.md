# V-THREE SNACK Catering Management ## Struktur Pro  - **context/**: Implementasi React Context API untuk state management global.
    - **AuthContext.tsx**: Konteks untuk manajemen state autentikasi.
    - **CartContext.tsx**: Konteks untuk manajemen keranjang belanja.

  - **firebase/**: Konfigurasi dan setup Firebase.
    - **firebase.ts**: Inisialisasi Firebase dan ekspor instance.

  - **services/**: Layer service untuk operasi data dan logika bisnis.
    - **GeminiService.ts**: Service untuk integrasi dengan Gemini AI.

- **src/**: Direktori utama untuk kode sumber aplikasi.

  - **components/**: Berisi komponen UI yang dapat digunakan kembali.
    - **Header.tsx**: Komponen header dengan navigasi.
    - **ChatBot.tsx**: Komponen ChatBot dengan integrasi Gemini AI.
    - **GoogleSignInButton.tsx**: Komponen untuk login dengan Google.
    - **PrivateRoute.tsx**: Komponen untuk menangani rute terproteksi yang memerlukan autentikasi.
    - **Admin/**: Komponen khusus untuk pengguna admin.m

Selamat datang di repositori proyek V-THREE SNACK Catering Management System. Proyek ini adalah aplikasi manajemen untuk bisnis katering yang dibangun menggunakan React, TypeScript, dan Firebase sebagai Backend as a Service (BaaS), dengan fitur ChatBot menggunakan Gemini AI API.

Aplikasi ini dirancang untuk menampilkan menu katering, menangani pesanan pelanggan secara online, dan memberikan rekomendasi menu melalui ChatBot pintar. Aplikasi ini menggunakan Firebase Firestore untuk menyimpan dan mengelola data menu dan pesanan.

## Demo Aplikasi

Anda dapat mengakses dan mencoba aplikasi yang sudah di-deploy melalui link berikut:

[Akses V-THREE SNACK](https://login-a3932.web.app)

Kredensial untuk Login:
- Email: ujicoba@gmail.com
- Password: lab12345

## Fitur Utama

- **Autentikasi Aman**: Sistem login berbasis Firebase Authentication dengan sign-in menggunakan email atau Google.
- **Dashboard**: Tampilan beranda dengan navigasi ke menu, order, dan informasi tentang layanan katering.
- **Menu Katalog**: Tampilan daftar menu katering dengan kategori snack dan nasi.
- **Sistem Order**: Pemesanan makanan online untuk berbagai acara spesial.
- **Riwayat Pesanan**: Pelanggan dapat melihat riwayat pesanan mereka.
- **ChatBot AI**: ChatBot dengan Gemini AI untuk memberikan rekomendasi menu berdasarkan jenis acara dan kebutuhan pelanggan.
- **Antarmuka Responsif**: Desain yang responsif menggunakan Tailwind CSS untuk pengalaman pengguna yang optimal.

## Teknologi yang Digunakan

- **Framework Frontend**: React dengan TypeScript
- **State Management**: React Context API
- **Backend**: Firebase (Authentication, Firestore)
- **AI Integration**: Google Gemini AI API
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Development & Build**: Create React App

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

  - **pages/**: Halaman-halaman utama aplikasi.
    - **Dashboard.tsx**: Halaman beranda utama.
    - **Login.tsx**: Halaman login.
    - **SignUp.tsx**: Halaman pendaftaran.
    - **MenuPage.tsx**: Halaman katalog menu.
    - **OrderPage.tsx**: Halaman untuk melakukan pemesanan.
    - **AboutUs.tsx**: Halaman informasi tentang V-THREE SNACK.
    - **CartPage.tsx**: Halaman keranjang belanja.
    - **MyOrders.tsx**: Halaman riwayat pesanan pengguna.
    - **OrderSuccessPage.tsx**: Halaman konfirmasi pesanan berhasil.
    - **ForgotPassword.tsx**: Halaman reset password.

  - **types/**: Definisi TypeScript untuk tipe data aplikasi.
    - **menuTypes.ts**: Definisi tipe untuk menu dan kategori.
    - **orderTypes.ts**: Definisi tipe untuk pesanan dan status.

## Arsitektur Aplikasi

Aplikasi ini diimplementasikan menggunakan Layered Architecture:

- **Presentation Layer**: Komponen React di folder components/ dan pages/.
- **Business Logic Layer**: Service di folder services/ dan context/.
- **Data Access Layer**: Integrasi dengan Firebase Firestore dan Gemini AI.

Arsitektur ini memungkinkan pemisahan kepentingan (separation of concerns), memudahkan pengujian, dan meningkatkan pemeliharaan kode.

## Fitur Keamanan

Aplikasi ini mengimplementasikan beberapa fitur keamanan:

- **Autentikasi Firebase**: Menggunakan sistem autentikasi yang aman dari Firebase.
- **Rute Terproteksi**: Menggunakan PrivateRoute untuk mencegah akses tidak sah ke halaman yang memerlukan autentikasi.
- **Validasi Input**: Validasi input untuk mencegah data tidak valid disimpan ke database.
- **Variabel Lingkungan**: Penggunaan .env untuk menyimpan API key dan konfigurasi sensitif.

## Fitur ChatBot dengan Gemini AI

Aplikasi ini mengintegrasikan Google Gemini AI untuk memberikan rekomendasi menu berdasarkan jenis acara dan kebutuhan pelanggan. ChatBot ini:

- Menyediakan rekomendasi menu berdasarkan jenis acara (pernikahan, ulang tahun, seminar, dll)
- Mempertimbangkan kebutuhan diet khusus (vegetarian, bebas gluten, dll)
- Memberikan saran berdasarkan jumlah tamu dan budget
- Menawarkan informasi tentang menu paling populer

## Pengembangan Masa Depan

Beberapa fitur yang direncanakan untuk pengembangan masa depan:

- **Manajemen Inventaris**: Sistem untuk melacak stok bahan baku.
- **Analitik Bisnis**: Dashboard analitik dengan visualisasi data penjualan.
- **Integrasi Pembayaran**: Dukungan untuk berbagai metode pembayaran online.
- **Sistem Notifikasi**: Notifikasi real-time untuk admin dan pelanggan.
- **Aplikasi Mobile**: Versi mobile dari aplikasi untuk pemesanan on-the-go.
- **Peningkatan ChatBot**: Pengembangan lebih lanjut dari kemampuan ChatBot dengan fitur pembelajaran dari interaksi pengguna.
