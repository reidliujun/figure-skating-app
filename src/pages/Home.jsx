import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  // Add categories data
  const categories = [
    {
      id: 'basic',
      name: 'Figure Skating Basic',
      description: 'Fundamental skills for beginners in figure skating'
    },
    {
      id: 'free-skate',
      name: 'Free Skate Curriculum',
      description: 'Free skating techniques'
    }
  ];
  
  // Add state for toggling the benefits section
  const [showBenefits, setShowBenefits] = useState(false);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Figure Skating Curriculums</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <p className="mb-4">
          Explore figure skating curriculums of different categories and learn various moves with detailed descriptions and video tutorials. {' '}
          <a href="https://www.usfigureskating.org/skate/skating-curriculum" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
            (Official USFSA Curriculum)
          </a>
        </p>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <button 
            onClick={() => setShowBenefits(!showBenefits)}
            className="flex items-center justify-between w-full text-left"
          >
            <h2 className="text-xl font-semibold">Why Use This App?</h2>
            <span className="text-blue-600">
              {showBenefits ? '▲' : '▼'}
            </span>
          </button>
          
          {showBenefits && (
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Track your progress through official figure skating levels</li>
              <li>Access detailed descriptions of each skating move</li>
              <li>Watch tutorial videos for proper technique</li>
              <li>Mark moves as completed to visualize your advancement</li>
              <li>Follow the same curriculum used by professional coaches</li>
            </ul>
          )}
        </div>
        
        <p className="mb-4">
          Whether you're a beginner just starting out or an intermediate skater looking to improve your skills, 
          our app provides a structured approach to learning figure skating based on the official USFSA curriculum.
        </p>
      </div>
      
      {/* Existing category cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
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
      
      {/* New testimonial or featured content section */}
      <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Learning Path</h2>
        <p className="mb-4">
          Our app follows the progressive learning path established by professional skating organizations:
        </p>
        <ol className="list-decimal pl-5 space-y-2 mb-4">
          <li><strong>Basic Skills</strong> - Learn fundamental skating techniques and balance</li>
          <li><strong>Free Skate</strong> - Develop jumps, spins, and artistic elements</li>
        </ol>
        <p>
          Start your journey today and keep track of your progress as you advance through each level!
        </p>
      </div>
    </div>
  );
};

export default Home;