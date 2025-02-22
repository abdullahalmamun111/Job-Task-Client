import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input type="text" placeholder="Type your username" className="w-full px-4 py-2 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-400" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input type="password" placeholder="Type your password" className="w-full px-4 py-2 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-400" />
        </div>
        
        <div className="text-right text-sm text-blue-500 cursor-pointer mb-4">Forgot password?</div>
        
        <button className="w-full py-2 rounded-lg text-white bg-gradient-to-r from-cyan-400 to-pink-500 hover:opacity-90 transition">LOGIN</button>
        
        <div className="flex justify-center gap-4 mt-4">
          <button className="bg-blue-600 text-white p-2 rounded-full">F</button>
          <button className="bg-blue-400 text-white p-2 rounded-full">T</button>
          <button className="bg-red-500 text-white p-2 rounded-full">G</button>
        </div>
        
        <p className="text-center text-sm mt-4">Or Sign Up Using</p>
        <p className="text-center text-blue-500 cursor-pointer mt-2">
          <Link to="/register">SIGN UP</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
