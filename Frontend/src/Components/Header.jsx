// src/components/Header.jsx
import React from 'react';
import { Bell, Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 border-b bg-white shadow-sm">
      {/* Branding */}
      <div className="flex items-center space-x-2 text-2xl font-bold">
        <div className="text-purple-600">C</div>
        <span className="text-gray-800">ircle</span>
        <span className="text-black">Soft</span>
      </div>

      {/* Search Bar */}
      <div className="flex items-center bg-gray-100 rounded-md px-3 py-1 w-1/3">
        <Search className="w-4 h-4 text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent w-full focus:outline-none"
        />
      </div>

      {/* Notification Bell */}
      <div className="relative">
        <Bell className="w-6 h-6 text-gray-600" />
        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
      </div>
    </header>
  );
};

export default Header;