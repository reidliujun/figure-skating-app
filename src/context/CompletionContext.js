import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';

const CompletionContext = createContext();

export const CompletionProvider = ({ children }) => {
  const [completedMoves, setCompletedMoves] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const { currentUser, userProgress, updateProgress } = useAuth();

  // Load initial data from localStorage or Firebase
  useEffect(() => {
    if (currentUser && userProgress) {
      setCompletedMoves(userProgress);
      setIsLoaded(true);
    } else {
      try {
        const savedMoves = localStorage.getItem('completedMoves');
        if (savedMoves) {
          setCompletedMoves(JSON.parse(savedMoves));
        }
      } catch (error) {
        console.error('Error loading from localStorage:', error);
      } finally {
        setIsLoaded(true);
      }
    }
  }, [currentUser, userProgress]);

  const toggleMoveCompletion = async (categoryId, levelId, moveId) => {
    const cleanMoveId = moveId.replace(`${categoryId}-${levelId}-`, '');
    const moveKey = `${categoryId}-${levelId}-${cleanMoveId}`;
    const newStatus = !completedMoves[moveKey];

    try {
      if (currentUser && updateProgress) {
        await updateProgress(moveKey, newStatus);
      }

      setCompletedMoves(prev => ({
        ...prev,
        [moveKey]: newStatus
      }));

      return newStatus;
    } catch (error) {
      console.error('Toggle failed:', { error, moveKey });
      throw error;
    }
  };

  const isMoveCompleted = (categoryId, levelId, moveId) => {
    const moveKey = `${categoryId}-${levelId}-${moveId}`;
    return !!completedMoves[moveKey];
  };

  return (
    <CompletionContext.Provider value={{ 
      toggleMoveCompletion, 
      isMoveCompleted, 
      completedMoves,
      isLoaded
    }}>
      {children}
    </CompletionContext.Provider>
  );
};

export const useCompletion = () => {
  const context = useContext(CompletionContext);
  if (!context) {
    throw new Error('useCompletion must be used within a CompletionProvider');
  }
  return context;
};