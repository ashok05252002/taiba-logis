import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function ProfileLayout({ title, children }) {
    const navigate = useNavigate();
    return (
        <div className="space-y-4">
            <button onClick={() => navigate(-1)} className="flex items-center space-x-2 text-taiba-gray font-medium hover:text-taiba-blue">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Profile</span>
            </button>
            <h2 className="text-2xl font-bold text-taiba-gray">{title}</h2>
            <div className="bg-white rounded-xl shadow-md p-6">
                {children}
            </div>
        </div>
    );
}
export default ProfileLayout;
