import React, { useState } from 'react';
import { KeyRound } from 'lucide-react';

function DriverLogin({ onLogin }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleOtpChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-taiba-blue to-taiba-purple flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="flex justify-center mb-6">
          <img 
            src="https://i.ibb.co/7JhXfK9/taiba-logo.png" 
            alt="Taiba" 
            className="h-16 object-contain"
          />
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-taiba-blue bg-opacity-10 rounded-full mb-4">
            <KeyRound className="w-8 h-8 text-taiba-blue" />
          </div>
          <h1 className="text-2xl font-bold text-taiba-gray mb-2">Driver Login</h1>
          <p className="text-sm text-taiba-gray">Enter your OTP to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-taiba-gray mb-3 text-center">
              Enter 6-Digit OTP
            </label>
            <div className="flex justify-center space-x-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-taiba-blue transition-colors"
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-taiba-blue text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all shadow-lg"
          >
            Verify & Login
          </button>

          <button
            type="button"
            className="w-full text-sm text-taiba-blue hover:underline font-medium"
          >
            Resend OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export default DriverLogin;
