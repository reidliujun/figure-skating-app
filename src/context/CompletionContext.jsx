import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

// Initialize with default values
const CompletionContext = createContext({
  completedMoves: {},
  toggleCompletion: () => {}
});

export const useCompletion = () => {
  const context = useContext(CompletionContext);
  if (!context) {
    console.error('useCompletion must be used within a CompletionProvider');
    return { completedMoves: {}, toggleCompletion: () => {} };
  }
  return context;
};

export const CompletionProvider = ({ children }) => {
  const [completedMoves, setCompletedMoves] = useState(() => {
    const saved = localStorage.getItem('completedMoves');
    return saved ? JSON.parse(saved) : {};
  });
  
  const { currentUser, userProgress, updateProgress } = useAuth();

  // Sync with Firebase when user logs in
  useEffect(() => {
    if (currentUser && userProgress) {
      setCompletedMoves(userProgress);
    }
  }, [currentUser, userProgress]);

  const toggleMoveCompletion = React.useCallback(async (categoryId, levelId, moveId) => {
    // Add parameter validation
    if (!categoryId || !levelId || !moveId) {
      console.error("Invalid toggle parameters:", {categoryId, levelId, moveId});
      throw new Error("Missing required parameters for move completion");
    }
    
    // Clean up moveId to prevent double-prefixing
    const cleanMoveId = moveId.replace(`${categoryId}-${levelId}-`, '');
    const moveKey = `${categoryId}-${levelId}-${cleanMoveId}`;
    
    try {
      const currentStatus = completedMoves[moveKey] || false;
      const newStatus = !currentStatus;
  
      if (currentUser && updateProgress) {
        // Update Firebase with clean moveKey
        await updateProgress(moveKey, newStatus);
        
        // Update local state with same moveKey
        setCompletedMoves(prev => ({
          ...prev,
          [moveKey]: newStatus
        }));
        
        return newStatus;
      }
  
      // Local update logic for non-authenticated users
      setCompletedMoves(prev => {
        const updated = { ...prev, [moveKey]: newStatus };
        // Save to localStorage
        localStorage.setItem('completedMoves', JSON.stringify(updated));
        return updated;
      });
      
      return newStatus;
    } catch (error) {
      console.error("Toggle Error:", error);
      throw error;
    }
  }, [completedMoves, currentUser, updateProgress]);
  
  // Modify the sync effect to handle immediate updates
  useEffect(() => {
    if (currentUser && userProgress) {
      // Add deep comparison to prevent unnecessary updates
      if (JSON.stringify(completedMoves) !== JSON.stringify(userProgress)) {
        setCompletedMoves(userProgress);
      }
    }
  }, [currentUser, userProgress]);

  // Create context value with useMemo
  const contextValue = React.useMemo(() => ({
    completedMoves,
    toggleMoveCompletion,
    isMoveCompleted: (categoryId, levelId, moveId) => {
      // Add parameter validation
      if (!categoryId || !levelId || !moveId) {
        console.error("Invalid isMoveCompleted check:", {categoryId, levelId, moveId});
        return false;
      }
      const moveKey = `${categoryId}-${levelId}-${moveId}`;
      return completedMoves[moveKey] || false;
    },
    isLoaded: true
  }), [completedMoves, toggleMoveCompletion]);

  return <CompletionContext.Provider value={contextValue}>{children}</CompletionContext.Provider>;
};