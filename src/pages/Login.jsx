import React from 'react';
import { Navigate } from 'react-router-dom';
import Auth from '../components/Auth';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { currentUser, loading } = useAuth();

  const handleUserChange = (user) => {
    // This is handled by the AuthContext now
  };

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (currentUser) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <p className="mb-6">Sign in to track your progress across devices</p>
      
      <Auth onUserChange={handleUserChange} />
    </div>
  );
};

export default Login;