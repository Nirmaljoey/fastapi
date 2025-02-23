import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useAuthContext } from '../context/AuthContext';
import logo from '../assets/logo.svg'

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuthContext();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await logout();
    setShowDropdown(false);
    navigate('/login');
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="w-screen flex justify-between items-center px-10 py-4 bg-white shadow-md">
      <Link to="/" className="text-2xl font-bold text-black">
        <img src={logo} alt="21YARD Logo" className="h-4" />
      </Link>
      <div className="flex gap-10">
        <Link to="/personal-account/profile/listings" className="text-black hover:text-gray-600">Заказы</Link>
        <Link to="/personal-account/profile/" className="text-black hover:text-gray-600">Мои заявки</Link>
        <Link to="/" className="text-black hover:text-gray-600">Тарификация</Link>
        <Link to="/" className="text-black hover:text-gray-600">Шаблоны</Link>
      </div>

      <div className="flex gap-8 items-center">
        {isAuthenticated ? (
          <>
            <Link to="/personal-account/applications/create">
              <button className="bg-yellow-400 text-black px-5 py-2 rounded-2xl hover:bg-yellow-300">
                Создать заявку
              </button>
            </Link>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="flex items-center focus:outline-none bg-transparent"
              >
                <FaUserCircle size={30} className="text-gray-700 hover:text-yellow-300" />
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-60 bg-white shadow-lg rounded-lg z-50">
                  <div className="p-4 border-b">
                    <p className="font-semibold text-lg text-black">{user?.name || 'User'}</p>
                    <p className="text-sm text-gray-600">{user?.email || ''}</p>
                  </div>
                  <Link to="/personal-account/profile" className="block px-4 py-2 hover:bg-gray-100 text-black">
                    Мой профиль
                  </Link>
                  <Link to="/companies" className="block px-4 py-2 hover:bg-gray-100 text-black">
                    Мои компании
                  </Link>
                  <Link to="/requests" className="block px-4 py-2 hover:bg-gray-100 text-black">
                    Работа с заявками
                  </Link>
                  <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100 text-black">
                    Настройки
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full bg-transparent px-4 py-2 text-left text-black hover:bg-red-500 hover:text-white"
                  >
                    Выйти
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <a
              href="https://t.me/manager21yard"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-gray-600"
            >
              ❓
            </a>
            <Link to="/login" className="px-5 py-2 border border-gray-400 rounded-2xl hover:bg-gray-200">
              Вход
            </Link>
            <Link to="/register" className="px-5 py-2 bg-yellow-400 text-black rounded-2xl hover:bg-yellow-300">
              Регистрация
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
