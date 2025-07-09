import { initializeApp } from "firebase/app";
import { OAuthProvider, signInWithPhoneNumber, RecaptchaVerifier, GoogleAuthProvider, signInWithPopup, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, sendPasswordResetEmail, UserCredential } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, query, where, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

// Firebase configuration that uses environment variables
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
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
        console.error("Error signing in with Google:", error);
        throw error;
    }
};

// Rest of your firebase methods...
