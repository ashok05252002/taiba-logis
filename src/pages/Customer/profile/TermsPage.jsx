import React from 'react';
import ProfileLayout from '../components/ProfileLayout';

function TermsPage() {
  return (
    <ProfileLayout title="Terms & Conditions">
        <div className="prose prose-sm max-w-none">
            <p>Last updated: August 2, 2025</p>
            <p>Please read these terms and conditions carefully before using Our Service.</p>
            <h4>Interpretation and Definitions</h4>
            <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
            <h4>Acknowledgment</h4>
            <p>These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.</p>
            {/* Add more static text as needed */}
        </div>
    </ProfileLayout>
  );
}

export default TermsPage;
