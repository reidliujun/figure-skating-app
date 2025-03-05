import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loadSkatingMoves } from '../utils/csvLoader';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await loadSkatingMoves();
      
      if (data) {
        // Transform the data into the format needed for the UI
        const categoriesArray = Object.keys(data).map(categoryId => {
          const categoryData = data[categoryId];
          const levels = Object.keys(categoryData.levels).map(levelId => ({
            id: levelId,
            name: levelId,
          }));
          
          return {
            id: categoryId,
            name: categoryId.charAt(0).toUpperCase() + categoryId.slice(1), // Capitalize first letter
            description: `Learn ${categoryId} figure skating skills`,
            levels: levels
          };
        });
        
        setCategories(categoriesArray);
      }
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Skating Categories</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(category => (
          <div key={category.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">Figure Skating {category.name}</h2>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <p className="text-gray-600 mb-4">{category.levels.length} levels available</p>
              <Link 
                to={`/category/${category.id}`} 
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                View Levels
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;