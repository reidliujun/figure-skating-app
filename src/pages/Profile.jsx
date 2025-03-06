import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAuth, signOut } from 'firebase/auth';

const Profile = () => {
  const { currentUser, userProgress, loading } = useAuth();
  
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth);
  };

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // Count completed moves by category
  // Update the progress calculation
  const progressByCategory = {};
  if (userProgress) {
    Object.entries(userProgress).forEach(([key, isCompleted]) => {
      if (isCompleted) {
        const [category, level] = key.split('-');
        if (!progressByCategory[category]) {
          progressByCategory[category] = {
            total: 1,
            byLevel: { [level]: 1 }
          };
        } else {
          progressByCategory[category].total += 1;
          progressByCategory[category].byLevel[level] = 
            (progressByCategory[category].byLevel[level] || 0) + 1;
        }
      }
    });
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center mb-4">
          {currentUser.photoURL && (
            <img 
              src={currentUser.photoURL} 
              alt="Profile" 
              className="w-16 h-16 rounded-full mr-4"
            />
          )}
          <div>
            <h2 className="text-xl font-bold">{currentUser.displayName || 'Skater'}</h2>
            <p className="text-gray-600">{currentUser.email}</p>
          </div>
        </div>
        
        <button 
          onClick={handleSignOut}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Sign Out
        </button>
      </div>
      
      <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
      
      {Object.keys(progressByCategory).length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(progressByCategory).map(([category, progress]) => (
            <div key={category} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-2 capitalize">{category}</h3>
              <p className="text-gray-600 mb-2">{progress.total} moves completed</p>
              <div className="space-y-1 mb-4">
                {Object.entries(progress.byLevel).map(([level, count]) => (
                  <p key={level} className="text-sm text-gray-500">
                    {level}: {count} moves
                  </p>
                ))}
              </div>
              <Link 
                to={`/category/${category}`}
                className="text-blue-600 hover:underline"
              >
                View Category
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-2">No Progress Yet</h3>
          <p className="text-gray-600 mb-4">
            You haven't marked any skating moves as completed yet. Start by exploring the categories below and marking moves as complete.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Link 
              to="/category/basic"
              className="bg-blue-100 text-blue-800 p-4 rounded-lg text-center hover:bg-blue-200"
            >
              Basic Skills
            </Link>
            <Link 
              to="/category/freetyle"
              className="bg-green-100 text-green-800 p-4 rounded-lg text-center hover:bg-green-200"
            >
              Free Skate
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;