import { initializeApp } from "firebase/app";
import { OAuthProvider, signInWithPhoneNumber, RecaptchaVerifier, GoogleAuthProvider, signInWithPopup, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, sendPasswordResetEmail, UserCredential } from 'firebase/auth';


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
export const auth = getAuth(app)

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