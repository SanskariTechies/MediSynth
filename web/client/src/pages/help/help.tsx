import React from 'react';

export const Help = () => {
  return (
    <div className="p-4 bg-gradient-to-br from-blue-200 to-blue-400 text-gray-800 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-center">Help Center</h1>
      <p className="text-lg mb-6">Welcome to our Help Center. Here you can find answers to frequently asked questions.</p>
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-bold mb-2">FAQs</h2>
        <ul className="list-disc ml-4">
          <li className="mb-4">
            <strong className="font-bold text-blue-600">How do I reset my password?</strong>
            <p className="text-base">You can reset your password by visiting the password reset page and following the instructions.</p>
          </li>
          <li className="mb-4">
            <strong className="font-bold text-blue-600">How do I contact customer support?</strong>
            <p className="text-base">You can contact customer support by emailing support@example.com or calling 1-800-123-4567.</p>
          </li>
          <li className="mb-4">
            <strong className="font-bold text-blue-600">Is my information secure?</strong>
            <p className="text-base">Yes, we take the security of your information very seriously. We use industry-standard encryption and security measures to protect your data.</p>
          </li>
          <li className="mb-4">
            <strong className="font-bold text-blue-600">How do I update my account information?</strong>
            <p className="text-base">You can update your account information by logging in to your account and navigating to the settings or profile section.</p>
          </li>
          <li className="mb-4">
            <strong className="font-bold text-blue-600">How do Remove my email id?</strong>
            <p className="text-base">You can update your account information by logging in to your account and navigating to the settings or profile section.</p>
          </li>
          <li className="mb-4">
            <strong className="font-bold text-blue-600">How do I Contact you?</strong>
            <p className="text-base">You can update your account information by logging in to your account and navigating to the settings or profile section.</p>
          </li>
          <li className="mb-4">
            <strong className="font-bold text-blue-600">How do I Update my progile?</strong>
            <p className="text-base">You can update your account information by logging in to your account and navigating to the settings or profile section.</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
