import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, ChevronDown, MapPin } from 'lucide-react';

const roles = [
  { id: 'super-admin', name: 'Delivery Super Admin', path: '/super-admin' },
  { id: 'delivery-admin', name: 'Delivery Admin', path: '/delivery-admin' },
  { id: 'zone-incharge', name: 'Cluster Incharge', path: '/zone-incharge' },
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col md:flex-row w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Left Side - Branding */}
        <div className="w-full md:w-1/2 lg:w-2/5 p-8 md:p-12 text-white bg-taiba-blue flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white bg-opacity-10 rounded-full"></div>
            <div className="absolute -bottom-16 -left-10 w-48 h-48 bg-white bg-opacity-10 rounded-full"></div>
            
            <div className="z-10">
                <img 
                    src="https://i.ibb.co/7JhXfK9/taiba-logo.png" 
                    alt="Taiba Pharmacy Logo" 
                    className="h-16 brightness-0 invert"
                />
            </div>
            
            <div className="z-10">
                <MapPin className="w-12 h-12 mb-4 opacity-75" />
                <h2 className="text-3xl font-bold mb-2">Streamlined Logistics</h2>
                <p className="text-lg opacity-90">Efficient delivery and order management for Taiba Pharmacy.</p>
            </div>
            
            <div className="z-10">
                <p className="text-sm opacity-75">&copy; 2025 Taiba Pharmacy. All rights reserved.</p>
            </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 lg:w-3/5 p-8 md:p-12 flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-taiba-gray mb-2">
              Welcome Back
            </h1>
            <p className="text-taiba-gray mb-8">
              Select your role and sign in to continue.
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg flex items-center justify-between hover:border-taiba-blue transition-colors"
                  >
                    <span className="font-medium text-taiba-gray">{selectedRole.name}</span>
                    <ChevronDown className={`w-5 h-5 text-taiba-gray transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-10 max-h-64 overflow-y-auto">
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
                    className="input-field pl-10"
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
                    className="input-field pl-10"
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
    </div>
  );
}

export default LoginPage;
