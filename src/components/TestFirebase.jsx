import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const TestFirebase = () => {
  const { currentUser, updateProgress } = useAuth();
  const [result, setResult] = useState('');

  const handleTestClick = async () => {
    try {
      console.log("Test button clicked");
      setResult("Testing...");
      
      if (!currentUser) {
        setResult("No user logged in");
        return;
      }
      
      if (typeof updateProgress !== 'function') {
        setResult("updateProgress function not available");
        return;
      }
      
      const testKey = "test-firebase-direct";
      const testValue = true;
      console.log(`Testing direct Firebase update with: ${testKey}=${testValue}`);
      
      const updateResult = await updateProgress(testKey, testValue);
      console.log("Update result:", updateResult);
      
      setResult("Firebase update completed successfully!");
    } catch (error) {
      console.error("Test error:", error);
      setResult(`Error: ${error.message}`);
    }
  };

  // Debug on mount
  useEffect(() => {
    console.log("TestFirebase component mounted with:", {
      hasCurrentUser: !!currentUser,
      hasUpdateProgress: typeof updateProgress === 'function'
    });
  }, [currentUser, updateProgress]);

  if (!currentUser) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded">
        Please log in to test Firebase updates
      </div>
    );
  }

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">Test Firebase Update</h3>
      <button 
        onClick={handleTestClick}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Test Firebase Update
      </button>
      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          Result: {result}
        </div>
      )}
    </div>
  );
};

export default TestFirebase;