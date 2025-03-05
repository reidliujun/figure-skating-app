import React, { useEffect, useRef } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

const Auth = ({ onUserChange }) => {
  const authContainerRef = useRef(null);
  
  useEffect(() => {
    const auth = getAuth();
    let ui = null;
    
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      onUserChange(user);
      
      // If no user is signed in, show the login UI
      if (!user && authContainerRef.current) {
        // Initialize the FirebaseUI Widget using Firebase
        ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
        
        // Configure FirebaseUI
        const uiConfig = {
          signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
          ],
          signInSuccessUrl: '/',
          signInFlow: 'popup',
          callbacks: {
            signInSuccessWithAuthResult: () => false // Prevents redirect
          }
        };
        
        // Start the FirebaseUI Widget
        ui.start('#firebaseui-auth-container', uiConfig);
      }
    });
    
    // Cleanup subscription and UI
    return () => {
      unsubscribe();
      if (ui) {
        ui.reset();
      }
    };
  }, [onUserChange]);

  return (
    <div className="container mx-auto p-4">
      <div id="firebaseui-auth-container" ref={authContainerRef}></div>
    </div>
  );
};

export default Auth;