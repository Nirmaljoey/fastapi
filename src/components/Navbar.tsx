import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="w-screen flex justify-between items-center px-10 py-4 bg-white shadow-md">
      <div className="text-2xl font-bold text-black">
        <img src="/src/assets/logo.svg" alt="21YARD Logo" className="h-4" /></div>
      <div className="flex gap-10">
        <a href="/" className="text-black hover:text-gray-600">Заказы</a>
        <a href="/personal-account/profile" className="text-black hover:text-gray-600">Мои заявки</a>
        <a href="/" className="text-black hover:text-gray-600">Тарификация</a>
        <a href="/" className="text-black hover:text-gray-600">Шаблоны</a>
      </div>
      <div className="flex gap-6">
        <a href="https://t.me/manager21yard" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600">❓</a>
        <a href="/login" className="px-5 py-2 border border-gray-400 rounded hover:bg-gray-200">Вход</a>
        <a href="/register" className="px-5 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-300">Регистрация</a>
      </div>
    </nav>
  );
};

export default Navbar;
