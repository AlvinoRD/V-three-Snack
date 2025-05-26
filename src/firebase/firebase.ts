import { initializeApp } from "firebase/app";
import { OAuthProvider, signInWithPhoneNumber, RecaptchaVerifier, GoogleAuthProvider, signInWithPopup, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, sendPasswordResetEmail, UserCredential } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, query, where, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiHNUCW9wpYqdhHMjaabaox8i4ThRy6c4",
  authDomain: "login-a3932.firebaseapp.com",
  projectId: "login-a3932",
  storageBucket: "login-a3932.firebasestorage.app",
  messagingSenderId: "17935627971",
  appId: "1:17935627971:web:56d2a0cb23dba344f39476",
  measurementId: "G-V5CFFHBPD5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// Initialize Firestore
export const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
  
export const signInWithApple = async (): Promise<UserCredential> => {
    const provider = new OAuthProvider('apple.com');
    provider.addScope('email');
    provider.addScope('name');
    return signInWithPopup(auth, provider);
};
    
export const setupRecaptcha = (elementId: string) => {
    return new RecaptchaVerifier(auth, elementId, {
      'size': 'invisible',
      'callback': () => {}
    });
};
  
export const phoneSignIn = async (phoneNumber: string, recaptchaVerifier: any): Promise<any> => {
    return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
  };

export const signInWithGoogle = async (): Promise<User |null> => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return result.user;
    } catch (error : any) {
        console.error("Error signing in with Google: ", error.message);
        throw error;
    }
}

// Sign up
export const registerUser = async (email: string, password: string): Promise<User | null> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error : any) {
        console.error("Error registering user: ", error.message);
        throw error;
    }
}

// Sign in

export const loginUser = async (email: string, password: string): Promise<User | null> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error : any) {
        console.error("Error logging in user: ", error.message);
        throw error;
    }
}

// Sign out

export const logoutUser = async (): Promise<void> => {
    try {
        await signOut(auth)
    } catch (error : any) {
        console.error("Error logging out user: ", error.message);
        throw error;
    }
}

export const resetPassword =  async (email: string): Promise<void> => {
    await sendPasswordResetEmail(auth, email);
}

// Firestore CRUD Operations
// Add a document to collection
export const addDocument = async (collectionName: string, data: any) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error: any) {
    console.error("Error adding document:", error.message);
    throw error;
  }
};

// Create a document with specific ID
export const setDocument = async (collectionName: string, docId: string, data: any) => {
  try {
    await setDoc(doc(db, collectionName, docId), {
      ...data,
      updatedAt: new Date()
    }, { merge: true });
    return docId;
  } catch (error: any) {
    console.error("Error setting document:", error.message);
    throw error;
  }
};

// Get a document by ID
export const getDocument = async (collectionName: string, docId: string) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error: any) {
    console.error("Error getting document:", error.message);
    throw error;
  }
};

// Get all documents in a collection
export const getCollection = async (collectionName: string) => {
  try {
    console.log(`Mencoba mengambil koleksi: ${collectionName}`);
    const querySnapshot = await getDocs(collection(db, collectionName));
    console.log(`Berhasil mengambil koleksi ${collectionName}, jumlah dokumen:`, querySnapshot.size);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error: any) {
    console.error(`Error mengambil koleksi ${collectionName}:`, error.message, error.code);
    throw error;
  }
};

// Get documents in a collection filtered by a field
export const getOrdersByUserId = async (userId: string) => {
  try {
    console.log(`Mengambil orders untuk user ID: ${userId}`);
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    console.log(`Berhasil mengambil orders, jumlah dokumen:`, querySnapshot.size);
    
    // Mengubah data agar sesuai dengan tipe Order
    const orders = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        userId: data.userId,
        items: data.items || [],
        totalPrice: data.totalPrice || 0,
        status: data.status || 'pending',
        createdAt: data.createdAt || { seconds: Date.now() / 1000 },
        address: data.address,
        paymentMethod: data.paymentMethod
      };
    });
    
    return orders;
  } catch (error: any) {
    console.error(`Error mengambil orders:`, error.message, error.code);
    throw error;
  }
};

// Update a document
export const updateDocument = async (collectionName: string, docId: string, data: any) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date()
    });
    return docId;
  } catch (error: any) {
    console.error("Error updating document:", error.message);
    throw error;
  }
};

// Delete a document
export const deleteDocument = async (collectionName: string, docId: string) => {
  try {
    await deleteDoc(doc(db, collectionName, docId));
    return docId;
  } catch (error: any) {
    console.error("Error deleting document:", error.message);
    throw error;
  }
};