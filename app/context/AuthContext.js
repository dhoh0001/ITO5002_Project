'use client'

import {
    onAuthStateChanged,
    getAuth,
} from 'firebase/auth';
import { initFirebase } from '@firebase/firebaseApp';
import { createContext, useContext } from 'react';
import { useState, useEffect } from 'react';

const auth = getAuth();

export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const logout = async () => {
    try {
      setCurrentUser(null)
      await signOut(auth)
      return true
    }
    catch (error) {
      return false
    }
}

export const AuthContextProvider = ({
    children,
}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
};