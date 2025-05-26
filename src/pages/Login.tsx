import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, signInWithGoogle } from '../firebase/firebase';

const Login: React.FC = () => {
  // State untuk menyimpan data formulir dan status
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();

  // Handler login dengan email/password
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Reset error dan set loading
      setError('');
      setLoading(true);
      console.log('Mencoba login dengan:', email);
      
      // Memanggil fungsi login dari firebase.ts
      await loginUser(email, password);
      console.log('Login berhasil, mengarahkan ke dashboard');
      
      // Redirect ke dashboard setelah login berhasil
      navigate('/dashboard'); 
    } catch (err: any) {
      console.error('Login error:', err);
      setError('Login gagal. Periksa email dan password Anda.');
    } finally {
      setLoading(false);
    }
  };

  // Handler login dengan Google
  const handleGoogleLogin = async () => {
    try {
      setError('');
      setGoogleLoading(true);
      console.log('Memulai proses login dengan Google');
      
      // Memanggil fungsi Google Sign In dari firebase.ts
      await signInWithGoogle();
      console.log('Login Google berhasil, mengarahkan ke dashboard');
      
      // Redirect ke dashboard setelah login berhasil
      navigate('/dashboard'); 
    } catch (err: any) {
      console.error('Google login error:', err);
      setError('Gagal login dengan Google.');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-md mx-auto bg-white p-8 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        
        {/* Pesan error */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded">
            {error}
          </div>
        )}

        {/* Form login email/password */}
        <form onSubmit={handleEmailLogin} className="mb-4">
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <label>Password</label>
              <Link to="/forgot-password" className="text-blue-500 text-sm">
                Lupa password?
              </Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 bg-blue-500 text-white rounded mb-4"
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center mb-4">
          <div className="flex-grow border-t"></div>
          <span className="mx-4 text-gray-500">atau</span>
          <div className="flex-grow border-t"></div>
        </div>

        {/* Login dengan Google */}
        <button
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          className="w-full p-2 border rounded mb-4 flex items-center justify-center"
        >
          {googleLoading ? 'Loading...' : 'Login dengan Google'}
        </button>

        {/* Link ke halaman signup */}
        <div className="text-center">
          <span>Belum punya akun? </span>
          <Link to="/signup" className="text-blue-500">
            Daftar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;