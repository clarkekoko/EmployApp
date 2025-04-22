import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAvrweFXEOVDmPDnKx1lNdYwx66obdLuXI",
  authDomain: "employ-app1.firebaseapp.com",
  projectId: "employ-app1",
  storageBucket: "employ-app1.appspot.com",
  messagingSenderId: "20127277481",
  appId: "1:20127277481:web:a3e503b3f36b98596b64b8",
  measurementId: "G-3T5B6GFSL5"
};

// Initialize Firebase with AsyncStorage
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore(app);

export { auth, db };
