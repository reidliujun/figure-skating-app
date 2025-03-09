import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
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
      
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      
      <div className="prose max-w-none">
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">Introduction</h2>
        <p className="mb-4">
          This Privacy Policy describes how Figure Skating App ("we", "us", or "our") collects, uses, and discloses your 
          information when you use our service.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">Information Collection</h2>
        <p className="mb-4">
          We collect information that you provide directly to us, such as when you create an account, update your profile, 
          or track your skating progress. This may include your name, email address, and information about your skating skills.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">How We Use Your Information</h2>
        <p className="mb-4">
          We use the information we collect to provide, maintain, and improve our services, including tracking your skating progress 
          and providing personalized content.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">Cookies</h2>
        <p className="mb-4">
          We use cookies and similar tracking technologies to track activity on our service and hold certain information. 
          Cookies are files with a small amount of data which may include an anonymous unique identifier.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">Advertising</h2>
        <p className="mb-4">
          We may use third-party advertising companies to serve ads when you visit our service. These companies may use information 
          about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">Changes to This Privacy Policy</h2>
        <p className="mb-4">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact us at:
          <br />
          <a href="mailto:reid.liujun@gmail.com" className="text-blue-600 hover:underline">
          reid.liujun@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;