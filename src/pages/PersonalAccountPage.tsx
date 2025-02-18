import React from 'react';
import PersonalAccount from '../components/PersonalAccount';

const PersonalAccountPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-blue-800 text-white p-4 fixed top-0 left-0 w-full z-10 shadow-md">
        <h1 className="text-xl font-bold">🌐 My Dashboard</h1>
      </nav>

      {/* Content */}
      <div className="flex-grow pt-20 p-4 bg-gray-50">
        <PersonalAccount />
      </div>
    </div>
  );
};

export default PersonalAccountPage;
