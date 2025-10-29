import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, ChevronDown } from 'lucide-react';

const roles = [
  { id: 'super-admin', name: 'Delivery Super Admin', path: '/super-admin' },
  { id: 'delivery-admin', name: 'Delivery Admin', path: '/delivery-admin' },
  { id: 'zone-incharge', name: 'Zone Incharge', path: '/zone-incharge' },
  { id: 'store-incharge', name: 'Store Incharge', path: '/store-incharge' },
  { id: 'driver', name: 'Delivery Partner (Driver)', path: '/driver' },
  { id: 'customer', name: 'Customer', path: '/customer' },
];

function LoginPage() {
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate(selectedRole.path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-taiba-blue to-taiba-purple flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 md:p-10">
        <div className="flex justify-center mb-8">
          <img 
            src="https://i.ibb.co/7JhXfK9/taiba-logo.png" 
            alt="Taiba Pharmacy Logo" 
            className="h-16 md:h-20 object-contain"
          />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-center text-taiba-gray mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-taiba-gray mb-8">
          Logistics Management System
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <label className="block text-sm font-medium text-taiba-gray mb-2">
              Select Your Role
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg flex items-center justify-between hover:border-taiba-blue transition-colors"
              >
                <span className="font-medium text-taiba-gray">{selectedRole.name}</span>
                <ChevronDown className={`w-5 h-5 text-taiba-gray transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {showDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-xl z-10 max-h-64 overflow-y-auto">
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => {
                        setSelectedRole(role);
                        setShowDropdown(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-taiba-blue hover:text-white transition-colors font-medium"
                    >
                      {role.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-taiba-gray mb-2">
              Username / Email
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-taiba-gray w-5 h-5" />
              <input
                type="text"
                placeholder="Enter your username or email"
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-taiba-blue transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-taiba-gray mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-taiba-gray w-5 h-5" />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-taiba-blue transition-colors"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-taiba-blue text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="#" className="text-sm text-taiba-blue hover:underline font-medium">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
