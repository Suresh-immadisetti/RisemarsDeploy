import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="pt-16 min-h-screen bg-gray-50 flex items-center">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <span className="text-9xl font-bold text-primary-300">404</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-primary-800">Page Not Found</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-xl mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center bg-skyblue-600 hover:bg-skyblue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              <Home className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center bg-white border border-gray-300 hover:border-skyblue-600 text-primary-800 hover:text-skyblue-600 font-medium px-6 py-3 rounded-lg transition-colors"
            >
              <Search className="h-5 w-5 mr-2" />
              Contact Support
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;