import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Figure Skating Curriculums</h1>
      <p className="mb-6">
        Explore figure skating curriculums of different categories and learn various moves with detailed descriptions and video tutorials.{' '}
        <a 
          href="https://skatingacademy.org/wp-content/uploads/Basic_Skills_Overview1.pdf" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-600 hover:text-blue-800 underline"
        >
          (Official USFSA Curriculum)
        </a>
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-4">Figure Skating Basic</h2>
            <p className="text-gray-600 mb-6 flex-grow">Fundamental skills for beginners in figure skating</p>
            <div>
              <Link to="/category/basic" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Explore
              </Link>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-4">Free Skate Curriculum</h2>
            <p className="text-gray-600 mb-6 flex-grow">Free skating techniques</p>
            <div>
              <Link to="/category/freestyle" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Explore
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;