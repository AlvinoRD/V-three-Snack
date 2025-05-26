import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase/firebase';
import { doc, setDoc, getDoc, collection, query, where, getDocs, deleteDoc, addDoc } from 'firebase/firestore';
import { Cart, CartItem } from '../types/orderTypes';
import { User } from 'firebase/auth';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  totalPrice: number;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartId, setCartId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Total items in cart
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  // Total price of all items in cart
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchCart(currentUser.uid);
      } else {
        setCartItems([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch cart from Firestore
  const fetchCart = async (userId: string) => {
    try {
      setLoading(true);
      const cartQuery = query(collection(db, 'cart'), where('userId', '==', userId));
      const cartSnapshot = await getDocs(cartQuery);
      
      if (!cartSnapshot.empty) {
        // Get the first cart document
        const cartDoc = cartSnapshot.docs[0];
        const cartData = cartDoc.data() as Cart;
        setCartItems(cartData.items || []);
        setCartId(cartDoc.id);
      } else {
        // Create a new cart for the user
        const newCartRef = await addDoc(collection(db, 'cart'), {
          userId,
          items: [],
          totalPrice: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        setCartId(newCartRef.id);
        setCartItems([]);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update cart in Firestore
  const updateCart = async (items: CartItem[]) => {
    if (!user || !cartId) return;
    
    try {
      const cartRef = doc(db, 'cart', cartId);
      await setDoc(cartRef, {
        userId: user.uid,
        items,
        totalPrice: items.reduce<number>((total, item) => total + (item.price * item.quantity), 0),
        updatedAt: new Date()
      }, { merge: true });
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  // Add item to cart
  const addToCart = async (newItem: CartItem) => {
    if (!user) return;
    
    const existingItemIndex = cartItems.findIndex(item => item.menuItemId === newItem.menuItemId);
    
    let updatedItems: CartItem[];
    
    if (existingItemIndex >= 0) {
      // Update the quantity if item already exists
      updatedItems = cartItems.map((item, index) => {
        if (index === existingItemIndex) {
          return { ...item, quantity: item.quantity + newItem.quantity };
        }
        return item;
      });
    } else {
      // Add new item
      updatedItems = [...cartItems, newItem];
    }
    
    setCartItems(updatedItems);
    await updateCart(updatedItems);
  };

  // Remove item from cart
  const removeFromCart = async (itemId: string) => {
    if (!user) return;
    
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedItems);
    await updateCart(updatedItems);
  };

  // Update quantity of an item in cart
  const updateQuantity = async (itemId: string, quantity: number) => {
    if (!user) return;
    
    if (quantity <= 0) {
      await removeFromCart(itemId);
      return;
    }
    
    const updatedItems = cartItems.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity };
      }
      return item;
    });
    
    setCartItems(updatedItems);
    await updateCart(updatedItems);
  };

  // Clear all items from cart
  const clearCart = async () => {
    if (!user || !cartId) return;
    
    setCartItems([]);
    await updateCart([]);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    loading
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};