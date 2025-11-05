import React, { useState } from 'react';
import ProfileLayout from '../components/ProfileLayout';

function LanguagePage() {
    const [selectedLang, setSelectedLang] = useState('English');

    return (
        <ProfileLayout title="Language">
            <div className="space-y-4">
                <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer">
                    <input type="radio" name="language" value="English" checked={selectedLang === 'English'} onChange={(e) => setSelectedLang(e.target.value)} className="h-5 w-5 text-taiba-blue focus:ring-taiba-blue" />
                    <span className="font-medium text-taiba-gray">English</span>
                </label>
                <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer">
                    <input type="radio" name="language" value="Arabic" checked={selectedLang === 'Arabic'} onChange={(e) => setSelectedLang(e.target.value)} className="h-5 w-5 text-taiba-blue focus:ring-taiba-blue" />
                    <span className="font-medium text-taiba-gray">العربية</span>
                </label>
            </div>
        </ProfileLayout>
    );
}

export default LanguagePage;
