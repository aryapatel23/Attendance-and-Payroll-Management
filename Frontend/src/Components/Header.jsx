// src/components/Header.jsx
import React from 'react';
import { Bell } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 border-b">
      <div className="text-2xl font-bold flex items-center gap-2">
        <span className="text-primary">🟣</span> Circle <span className="text-black">Soft</span>
      </div>
      <div className="relative">
        <Bell className="w-6 h-6 text-gray-600" />
        <span className="absolute top-0 right-0 bg-red-500 w-2 h-2 rounded-full" />
      </div>
    </header>
  );
};

export default Header;
