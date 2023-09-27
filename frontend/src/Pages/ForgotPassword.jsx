import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Forgot Password</h2>
          {/* Add your forgot password form code here */}
          <Link to="/login" className="text-blue-500 underline mt-4">
            Remembered your password? Login
          </Link>
          <Link to="/signup" className="text-blue-500 underline">
            Don't have an account? Sign Up
          </Link>
        </div>
      </div>
    );
  };
  
  export default ForgotPasswordPage