import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  User 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  query, 
  where, 
  getDocs 
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

type UserData = {
  displayName?: string;
  email: string;
  phoneNumber?: string;
  profilePicture?: string;
} | null;

type AuthContextType = {
  user: User | null;
  userData: UserData;
  loading: boolean;
  error: string | null;
  hasUserData: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; user?: User }>;
  signUp: (email: string, password: string, profileData?: any) => Promise<{ success: boolean; message?: string }>;
  signOut: () => Promise<void>;
  saveUserData: (data: any) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasUserData, setHasUserData] = useState(false);

  // Check if user has data in the database
  const checkUserData = async (uid: string) => {
    try {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        setUserData(userSnap.data() as UserData);
        setHasUserData(true);
      }
    } catch (error) {
      console.error('Error checking user data:', error);
    }
  };

  // Save user data to the database
  const saveUserData = async (data: any) => {
    try {
      if (!user) {
        throw new Error('No authenticated user found');
      }
      
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        ...data,
        email: user.email,
        createdAt: new Date()
      });
      
      setUserData(data);
      setHasUserData(true);
      return true;
    } catch (error) {
      console.error('Error saving user data:', error);
      return false;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("Auth state changed, user:", currentUser?.email);
      setUser(currentUser);
      
      if (currentUser) {
        await checkUserData(currentUser.uid);
      } else {
        setUserData(null);
        setHasUserData(false);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Sign in successful for:", email);
      
      try {
        await checkUserData(userCredential.user.uid);
        return { success: true, user: userCredential.user };
      } catch (error) {
        console.error('Error after sign in:', error);
        return { success: true, user: userCredential.user };
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      setError(error.message);
      return { success: false };
    }
  };

  const signUp = async (email: string, password: string, profileData?: any) => {
    try {
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Sign up successful for:", email);
      
      // For now, we'll consider new users as having data to avoid permission issues
      setHasUserData(true);
      
      try {
        // Try to create the user document with profile data if provided
        const userRef = doc(db, 'users', userCredential.user.uid);
        const userData = {
          email: email,
          createdAt: new Date(),
          ...profileData
        };
        await setDoc(userRef, userData);
        
        setUserData(userData);
        return { success: true };
      } catch (error) {
        console.error('Error saving user data:', error);
        return { success: true };
      }
    } catch (error: any) {
      console.error('Sign up error:', error);
      setError(error.message);
      return { success: false, message: error.message };
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUserData(null);
      setHasUserData(false);
    } catch (error: any) {
      console.error('Sign out error:', error);
      setError(error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        loading,
        error,
        hasUserData,
        signIn,
        signUp,
        signOut,
        saveUserData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
