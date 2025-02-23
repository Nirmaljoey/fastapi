import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa'; // Added FaBars and FaTimes for hamburger menu
import { useAuthContext } from '../context/AuthContext';
import logo from '../assets/logo.svg';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuthContext();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu toggle
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

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
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="w-full flex flex-col md:flex-row justify-between items-center px-4 md:px-10 py-4 bg-white shadow-md">
      {/* Logo */}
      <div className="flex justify-between items-center w-full md:w-auto">
        <Link to="/" className="text-2xl font-bold text-black">
          <img src={logo} alt="21YARD Logo" className="h-8 md:h-4" /> {/* Larger logo on mobile */}
        </Link>
        {/* Hamburger menu for mobile */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-gray-700 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Navigation links and auth buttons - hidden on mobile, shown on desktop */}
      <div
        ref={menuRef}
        className={`${
          isMobileMenuOpen ? 'flex flex-col items-center bg-white shadow-md p-4 absolute top-16 left-0 w-full z-50' : 'hidden'
        } md:flex md:flex-row md:gap-10 md:items-center md:relative md:top-0 md:left-0 md:w-auto md:p-0 md:shadow-none`}
      >
        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row md:gap-10 mb-4 md:mb-0">
          <Link to="/" className="text-black hover:text-gray-600 py-2 md:py-0">Заказы</Link>
          <Link to="/personal-account/profile/" className="text-black hover:text-gray-600 py-2 md:py-0">Мои заявки</Link>
          <Link to="/" className="text-black hover:text-gray-600 py-2 md:py-0">Тарификация</Link>
          <Link to="/" className="text-black hover:text-gray-600 py-2 md:py-0">Шаблоны</Link>
        </div>

        {/* Auth Section */}
        <div className="flex gap-4 items-center mt-4 md:mt-0">
          {isAuthenticated ? (
            <>
              <Link to="/personal-account/applications/create">
                <button className="bg-yellow-400 text-black px-4 py-2 rounded-2xl hover:bg-yellow-300 md:px-5 md:py-2">
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
              <Link to="/login" className="px-4 py-2 border border-gray-400 rounded-2xl hover:bg-gray-200">
                Вход
              </Link>
              <Link to="/register" className="px-4 py-2 bg-yellow-400 text-black rounded-2xl hover:bg-yellow-300">
                Регистрация
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
