import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
// Make sure all imports are at the top of the file

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProgress, setUserProgress] = useState({});
  
  // Define auth and db at the component level
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Load user progress from Firestore
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          setUserProgress(userDoc.data().progress || {});
        } else {
          // Create a new user document if it doesn't exist
          await setDoc(userDocRef, { progress: {} });
        }
      } else {
        setUserProgress({});
      }
      
      setLoading(false);
    });
    
    return unsubscribe;
  }, [auth, db]); // Add auth and db to the dependency array

  // Initialize user document when they first sign in
  // In the user initialization useEffect
  useEffect(() => {
    if (currentUser) {
      const initializeUserData = async () => {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (!userDoc.exists()) {
          // Create initial user document with empty progress
          await setDoc(userDocRef, {
            email: currentUser.email,
            progress: {}
          });
        }
        
        // Load existing progress
        if (userDoc.exists() && userDoc.data().progress) {
          setUserProgress(userDoc.data().progress);
        }
      };
      initializeUserData();
    }
  }, [currentUser, db]);

  // Add this to AuthContext.jsx
  const updateProgress = React.useCallback(async (moveKey, completed) => {
    if (!currentUser) {
      return;
    }
    
    try {
      const userDocRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userDocRef);
      const currentData = userDoc.exists() ? userDoc.data() : { progress: {} };
      
      const newProgress = {
        ...currentData.progress,
        [moveKey]: completed
      };
      
      const updateData = {
        email: currentUser.email,
        progress: newProgress
      };
      
      await setDoc(userDocRef, updateData, { merge: true });
      setUserProgress(newProgress);
      
      return newProgress;
    } catch (error) {
      console.error('Error updating progress:', error);
      throw error;
    }
  }, [currentUser, db]);

  const value = {
    currentUser,
    userProgress,
    updateProgress,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};