import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { loadSkatingMoves } from '../utils/csvLoader';
import { useCompletion } from '../context/CompletionContext';

const LevelDetail = () => {
  const { categoryId, levelId } = useParams();
  const location = useLocation();
  const [expandedMoves, setExpandedMoves] = useState({});
  const [levelData, setLevelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toggleMoveCompletion, isMoveCompleted, isLoaded } = useCompletion();

  // Keep this useEffect for hash navigation
  useEffect(() => {
    const moveId = location.hash.replace('#move-', '');
    if (moveId) {
      setExpandedMoves(prev => ({
        ...prev,
        [moveId]: true
      }));

      setTimeout(() => {
        const element = document.getElementById(`move-${moveId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [location.hash]);

  const toggleMoveExpansion = useCallback((moveId) => {
    setExpandedMoves(prev => ({
      ...prev,
      [moveId]: !prev[moveId]
    }));
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await loadSkatingMoves();
        if (data?.[categoryId]?.levels?.[levelId]) {
          const validatedMoves = data[categoryId].levels[levelId].moves.map(move => ({
            ...move,
            id: move.id || `${categoryId}-${levelId}-${move.name.toLowerCase().replace(/\s+/g, '-')}`
          }));
          
          setLevelData({
            category: { id: categoryId },
            level: { id: levelId, moves: validatedMoves }
          });
        }
      } catch (error) {
        console.error('Failed to load moves:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [categoryId, levelId]);

  const handleToggleCompletion = async (moveId) => {
    try {
      if (!isLoaded) {
        throw new Error("Context not loaded");
      }

      return await toggleMoveCompletion(categoryId, levelId, moveId);
    } catch (error) {
      console.error('Toggle failed:', error);
      return false;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!levelData) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Level not found</h1>
        <Link to="/categories" className="text-blue-600 hover:underline">Back to Categories</Link>
      </div>
    );
  }

  const { level } = levelData;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <Link to={`/category/${categoryId}`} className="text-blue-600 hover:underline">
          ← Back to Category
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-2">Level {levelId}</h1>
      
      <h2 className="text-2xl font-bold mb-4">Moves</h2>
      <div className="space-y-6">
        {level.moves?.map((move, index) => {
          const completed = isMoveCompleted(categoryId, levelId, move.id);
          const isExpanded = expandedMoves[move.id];
          
          return (
            <div 
              key={move.id}
              id={`move-${move.id}`} // Add this id for scrolling
              className={`bg-white rounded-lg shadow-md overflow-hidden ${completed ? 'border-l-4 border-green-500' : ''}`}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold">{index + 1}. {move.name}</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleToggleCompletion(move.id)}
                      className={`px-3 py-1 rounded-full ${
                        completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {completed ? 'Completed' : 'Mark Complete'}
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{move.description}</p>
                
                <button 
                  onClick={() => toggleMoveExpansion(move.id)}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {isExpanded ? 'Hide Details' : 'View Details'}
                </button>
                
                {isExpanded && (
                  <div className="mt-6 border-t pt-4">
                    <h4 className="text-lg font-bold mb-2">Detailed Description</h4>
                    <p className="text-gray-700 mb-6">{move.detailedDescription}</p>
                    
                    <h4 className="text-lg font-bold mb-2">Video Tutorial</h4>
                    <div className="aspect-w-16 aspect-h-9 mb-4">
                      <iframe 
                        src={`https://www.youtube.com/embed/${move.videoUrl.split('v=')[1]}`}
                        title={move.name}
                        className="w-full h-96"
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                      ></iframe>
                    </div>
                    
                    <div className="mt-2">
                      <a 
                        href={move.videoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 hover:underline"
                      >
                        Watch on YouTube
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LevelDetail;