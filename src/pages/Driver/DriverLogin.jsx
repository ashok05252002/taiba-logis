import React, { useState } from 'react';
import { KeyRound } from 'lucide-react';

function DriverLogin({ onLogin }) {
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
    }
  };
  
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.join('').length === 4) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="h-[720px] flex flex-col">
            <div className="bg-gradient-to-br from-taiba-blue to-taiba-purple p-8 text-white text-center">
                 <img 
                    src="public/Images/taiba-pharmacy-new (1).png" 
                    alt="Taiba" 
                    className="h-12 object-contain mx-auto mb-4 brightness-0 invert"
                />
                <h1 className="text-xl font-bold">Driver Portal</h1>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-8">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-taiba-blue bg-opacity-10 rounded-full mb-4">
                        <KeyRound className="w-8 h-8 text-taiba-blue" />
                    </div>
                    <h2 className="text-2xl font-bold text-taiba-gray mb-1">Enter OTP</h2>
                    <p className="text-sm text-taiba-gray">A 4-digit code was sent to your number.</p>
                </div>

                <form onSubmit={handleSubmit} className="w-full space-y-8">
                    <div className="flex justify-center space-x-3">
                        {otp.map((digit, index) => (
                            <input
                            key={index}
                            id={`otp-${index}`}
                            type="tel"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-taiba-blue transition-colors"
                            />
                        ))}
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
      </div>
    </div>
  );
}

export default DriverLogin;
