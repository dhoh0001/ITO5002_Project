import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ito5002-cdeea.firebaseapp.com",
  projectId: "ito5002-cdeea",
  storageBucket: "ito5002-cdeea.appspot.com",
  messagingSenderId: "1072834521285",
  appId: "1:1072834521285:web:2ce887ae6b692d15e2a8ac"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Export Firebase Initialize Function
export const initFirebase = () => {
    return app;
}