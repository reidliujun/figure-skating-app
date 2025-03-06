import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { loadSkatingMoves } from '../utils/csvLoader';
import { useCompletion } from '../context/CompletionContext';

const CategoryDetail = () => {
  const { categoryId } = useParams();
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { completedMoves } = useCompletion();

  useEffect(() => {
    const loadData = async () => {
      const data = await loadSkatingMoves();
      if (data && data[categoryId]) {
        setCategoryData(data[categoryId]);
      }
      setLoading(false);
    };

    loadData();
  }, [categoryId]);

  const calculateProgress = (levelId) => {
    if (!categoryData || !categoryData.levels[levelId] || !categoryData.levels[levelId].moves) {
      return 0;
    }
    
    const moves = categoryData.levels[levelId].moves;
    const totalMoves = moves.length;
    
    if (totalMoves === 0) return 0;
    
    let completedCount = 0;
    moves.forEach(move => {
      const moveKey = `${categoryId}-${levelId}-${move.id}`;
      if (completedMoves[moveKey]) {
        completedCount++;
      }
    });
    
    return Math.round((completedCount / totalMoves) * 100);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!categoryData) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Under Development</h1>
        <Link to="/" className="text-blue-600 hover:underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <Link 
          to="/" 
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <span className="mr-2">←</span>
          Back to Home
        </Link>
      </div>
      
      <h2 className="text-2xl font-bold mb-4">Levels</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(categoryData.levels).map(([levelId, level]) => {
          const progress = calculateProgress(levelId);
          
          return (
            <div key={levelId} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">
                  {levelId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </h3>
                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{progress}% complete</p>
                </div>
                <p className="text-gray-600 mb-4">{level.moves?.length || 0} moves available</p>
                <Link 
                  to={`/category/${categoryId}/level/${levelId}`} 
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  View Moves
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryDetail;