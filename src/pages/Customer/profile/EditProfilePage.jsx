import React from 'react';
import ProfileLayout from '../components/ProfileLayout';

function EditProfilePage() {
  return (
    <ProfileLayout title="Edit Profile">
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-taiba-gray mb-2">Full Name</label>
          <input type="text" className="input-field" defaultValue="Saud Ahmed" />
        </div>
        <div>
          <label className="block text-sm font-medium text-taiba-gray mb-2">Email Address</label>
          <input type="email" className="input-field" defaultValue="saud.ahmed@email.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-taiba-gray mb-2">Phone Number</label>
          <input type="tel" className="input-field" defaultValue="96899123456" />
        </div>
        <div className="flex justify-end pt-4">
          <button type="submit" className="btn-primary px-6 py-2">Save Changes</button>
        </div>
      </form>
    </ProfileLayout>
  );
}

export default EditProfilePage;
