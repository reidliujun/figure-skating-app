import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Figure Skating App. All rights reserved.</p>
        <div className="mt-2">
          <Link to="/privacy-policy" className="text-blue-300 hover:text-blue-100">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;