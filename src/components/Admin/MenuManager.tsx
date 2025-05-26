import React, { useEffect, useState } from 'react';
import { addDocument, getCollection, updateDocument, deleteDocument } from '../../firebase/firebase';
import { MenuItem } from '../../types/menuTypes';

const MenuManager: React.FC = () => {
  // State untuk daftar menu dan item yang sedang diedit
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<MenuItem>({
    name: '',
    price: 0,
    category: 'Main Courses',
    description: '',
    imageUrl: '',
    isPopular: false,
    available: true
  });

  // Mengambil data menu saat komponen dimuat
  useEffect(() => {
    fetchMenuItems();
  }, []);

  // Fungsi untuk mengambil data menu dari Firestore
  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      
      // Menggunakan helper function untuk mengambil koleksi dari Firestore
      const items = await getCollection('menuItems');
      setMenuItems(items as MenuItem[]);
      setError(null);
      
      console.log('Data menu berhasil diambil:', items);
    } catch (err) {
      console.error("Error fetching menu items:", err);
      setError("Gagal memuat data menu");
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk menangani perubahan input form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    // Khusus untuk input checkbox
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setCurrentItem(prev => ({ ...prev, [name]: checked }));
    } else {
      // Untuk input teks dan angka
      setCurrentItem(prev => ({ 
        ...prev, 
        [name]: type === 'number' ? parseFloat(value) : value 
      }));
    }
  };

  // Fungsi untuk menangani submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      if (editMode && currentItem.id) {
        // Update item yang sudah ada di Firestore
        console.log('Memperbarui item menu:', currentItem);
        await updateDocument('menuItems', currentItem.id, currentItem);
        console.log('Item menu berhasil diperbarui');
      } else {
        // Tambahkan item baru ke Firestore
        console.log('Menambahkan item menu baru:', currentItem);
        await addDocument('menuItems', currentItem);
        console.log('Item menu baru berhasil ditambahkan');
      }
      
      // Reset form dan refresh data
      setCurrentItem({
        name: '',
        price: 0,
        category: 'Main Courses',
        description: '',
        imageUrl: '',
        isPopular: false,
        available: true
      });
      setEditMode(false);
      await fetchMenuItems();
    } catch (err) {
      console.error("Error saving menu item:", err);
      setError("Gagal menyimpan item menu");
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk mengedit item
  const handleEdit = (item: MenuItem) => {
    console.log('Mengedit item:', item);
    setCurrentItem(item);
    setEditMode(true);
  };

  // Fungsi untuk menghapus item
  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    
    if (window.confirm("Anda yakin ingin menghapus item menu ini?")) {
      try {
        setLoading(true);
        console.log('Menghapus item dengan ID:', id);
        await deleteDocument('menuItems', id);
        console.log('Item berhasil dihapus');
        await fetchMenuItems();
      } catch (err) {
        console.error("Error deleting menu item:", err);
        setError("Gagal menghapus item menu");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      {/* Formulir untuk menambah/edit menu */}
      <div className="bg-gray-100 p-4 rounded mb-6">
        <h3 className="font-bold mb-2">
          {editMode ? 'Edit Item Menu' : 'Tambah Item Menu Baru'}
        </h3>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Nama Menu</label>
              <input 
                type="text"
                name="name"
                value={currentItem.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div>
              <label className="block mb-1">Harga</label>
              <input 
                type="number"
                name="price"
                value={currentItem.price}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block mb-1">Kategori</label>
            <select
              name="category"
              value={currentItem.category}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="Appetizers">Appetizers</option>
              <option value="Main Courses">Main Courses</option>
              <option value="Desserts">Desserts</option>
              <option value="Beverages">Beverages</option>
            </select>
          </div>
          
          <div>
            <label className="block mb-1">Deskripsi</label>
            <textarea
              name="description"
              value={currentItem.description || ''}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              rows={2}
            />
          </div>
          
          <div>
            <label className="block mb-1">URL Gambar</label>
            <input 
              type="url"
              name="imageUrl"
              value={currentItem.imageUrl || ''}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isPopular"
                checked={currentItem.isPopular || false}
                onChange={handleInputChange}
                className="mr-2"
              />
              Menu Populer
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                name="available"
                checked={currentItem.available || false}
                onChange={handleInputChange}
                className="mr-2"
              />
              Tersedia
            </label>
          </div>
          
          <div className="flex space-x-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
              disabled={loading}
            >
              {loading ? 'Menyimpan...' : editMode ? 'Update Menu' : 'Tambah Menu'}
            </button>
            
            {editMode && (
              <button
                type="button"
                onClick={() => {
                  setEditMode(false);
                  setCurrentItem({
                    name: '',
                    price: 0,
                    category: 'Main Courses',
                    description: '',
                    imageUrl: '',
                    isPopular: false,
                    available: true
                  });
                }}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </div>
      
      {/* Tabel Menu */}
      <h3 className="font-bold mb-2">Daftar Menu</h3>
      
      {loading && menuItems.length === 0 ? (
        <p>Memuat data...</p>
      ) : (
        <>
          {menuItems.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">Nama</th>
                    <th className="p-2 text-left">Kategori</th>
                    <th className="p-2 text-right">Harga</th>
                    <th className="p-2 text-left">Status</th>
                    <th className="p-2 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {menuItems.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="p-2">
                        {item.name}
                        {item.isPopular && (
                          <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs py-0.5 px-1 rounded">
                            Popular
                          </span>
                        )}
                      </td>
                      <td className="p-2">{item.category}</td>
                      <td className="p-2 text-right">Rp {item.price.toLocaleString('id-ID')}</td>
                      <td className="p-2">
                        {item.available ? (
                          <span className="text-green-600">Tersedia</span>
                        ) : (
                          <span className="text-red-600">Tidak Tersedia</span>
                        )}
                      </td>
                      <td className="p-2 text-center">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-blue-600 hover:underline mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:underline"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">
              Belum ada data menu. Tambahkan menu pertama Anda menggunakan form di atas.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default MenuManager;