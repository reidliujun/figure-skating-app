import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loadSkatingMoves } from '../utils/csvLoader';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [allMoves, setAllMoves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllMoves = async () => {
      const data = await loadSkatingMoves();
      if (data) {
        const moves = [];
        
        // Flatten the data structure to get all moves
        Object.keys(data).forEach(categoryId => {
          const category = data[categoryId];
          Object.keys(category.levels).forEach(levelId => {
            const level = category.levels[levelId];
            level.moves.forEach(move => {
              moves.push({
                ...move,
                categoryId,
                levelId,
                categoryName: categoryId.charAt(0).toUpperCase() + categoryId.slice(1),
                levelName: levelId
              });
            });
          });
        });
        
        setAllMoves(moves);
      }
      setLoading(false);
    };

    fetchAllMoves();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    const term = searchTerm.toLowerCase();
    const results = allMoves.filter(move => 
      move.name.toLowerCase().includes(term) || 
      move.description.toLowerCase().includes(term) ||
      move.detailedDescription.toLowerCase().includes(term)
    );
    
    setSearchResults(results);
  }, [searchTerm, allMoves]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Search Skating Moves</h1>
      
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for moves by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          )}
        </div>
      </div>
      
      {loading ? (
        <div>Loading moves...</div>
      ) : searchTerm.trim() === '' ? (
        <div className="text-gray-500">Enter a search term to find skating moves</div>
      ) : searchResults.length === 0 ? (
        <div className="text-gray-500">No moves found matching "{searchTerm}"</div>
      ) : (
        <div className="space-y-6">
          <p className="text-gray-700">{searchResults.length} moves found</p>
          
          {searchResults.map(move => (
            <div key={`${move.categoryId}-${move.levelId}-${move.id}`} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                  <h2 className="text-xl font-bold">{move.name}</h2>
                  <div className="mt-2 md:mt-0">
                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-2">
                      {move.categoryName}
                    </span>
                    <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                      {move.levelName}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{move.description}</p>
                
                <Link 
                  to={`/category/${move.categoryId}/level/${move.levelId}#move-${move.id}`}
                  state={{ selectedMoveId: move.id }}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;