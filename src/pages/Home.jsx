import React from 'react';
import { Link } from 'react-router-dom';
import skatingData from '../data/skatingData';

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Figure Skating App</h1>
      <p className="mb-6">
        Explore different categories of figure skating and learn various moves with detailed descriptions and video tutorials.{' '}
        <a 
          href="https://skatingacademy.org/wp-content/uploads/Basic_Skills_Overview1.pdf" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-600 hover:text-blue-800 underline"
        >
          (Official USFSA Curriculum)
        </a>
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skatingData.categories.map(category => (
          <div key={category.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{category.name}</h2>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <Link 
                to={`/category/${category.id}`} 
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Explore
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;