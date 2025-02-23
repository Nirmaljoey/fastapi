import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { useAuthContext } from '../context/AuthContext';
import logo from '../assets/logo.svg';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuthContext();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    try {
      console.log('Attempting to log out...');
      await logout();
      setShowDropdown(false);
      navigate('/login');
      console.log('Logged out successfully, isAuthenticated:', isAuthenticated, 'user:', user);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Prevent page scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  // Click outside handler with 'click' event
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isAuthenticated, user]);

  return (
    <nav className="w-screen flex justify-between items-center px-10 py-4 bg-white shadow-md">
      <Link to="/" className="text-2xl font-bold text-black">
        <img src={logo} alt="21YARD Logo" className="h-4" />
      </Link>

      <div className="flex gap-10 hidden md:flex">
        <Link to="/personal-account/profile/listings" className="text-black hover:text-gray-600">Заказы</Link>
        <Link to="/personal-account/profile/" className="text-black hover:text-gray-600">Мои заявки</Link>
        <Link to="/" className="text-black hover:text-gray-600">Тарификация</Link>
        <Link to="/" className="text-black hover:text-gray-600">Шаблоны</Link>
      </div>

      <div className="flex gap-8 items-center hidden md:flex">
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
                <div className="absolute right-0 mt-2 w-60 bg-white shadow-lg rounded-lg z-60">
                  <div className="p-4 border-b">
                    <p className="font-semibold text-lg text-black">{user?.name || 'User'}</p>
                    <p className="text-sm text-gray-600">{user?.email || ''}</p>
                  </div>
                  <Link
                    to="/personal-account/profile"
                    className="block px-4 py-2 hover:bg-gray-100 text-black cursor-pointer"
                    onClick={() => setShowDropdown(false)}
                  >
                    Мой профиль
                  </Link>
                  <Link
                    to="/companies"
                    className="block px-4 py-2 hover:bg-gray-100 text-black cursor-pointer"
                    onClick={() => setShowDropdown(false)}
                  >
                    Мои компании
                  </Link>
                  <Link
                    to="/requests"
                    className="block px-4 py-2 hover:bg-gray-100 text-black cursor-pointer"
                    onClick={() => setShowDropdown(false)}
                  >
                    Работа с заявками
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 hover:bg-gray-100 text-black cursor-pointer"
                    onClick={() => setShowDropdown(false)}
                  >
                    Настройки
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full bg-transparent px-4 py-2 text-left text-black hover:bg-red-500 hover:text-white cursor-pointer"
                  >
                    Выйти
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <a href="https://t.me/manager21yard" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600">
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

      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden p-2 text-gray-700 focus:outline-none absolute right-4 top-4"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      <div
        ref={menuRef}
        className={`${
          isMobileMenuOpen
            ? 'fixed top-16 left-0 w-full bg-white shadow-md p-4 z-50 flex flex-col items-center'
            : 'hidden'
        } md:hidden`}
      >
        <div className="flex flex-col items-center w-full mb-4">
          <Link to="/personal-account/profile/listings" className="text-black hover:text-gray-600 py-2 w-full text-center border-b border-gray-200">
            Заказы
          </Link>
          <Link to="/personal-account/profile/" className="text-black hover:text-gray-600 py-2 w-full text-center border-b border-gray-200">
            Мои заявки
          </Link>
          <Link to="/" className="text-black hover:text-gray-600 py-2 w-full text-center border-b border-gray-200">
            Тарификация
          </Link>
          <Link to="/" className="text-black hover:text-gray-600 py-2 w-full text-center border-b border-gray-200">
            Шаблоны
          </Link>
        </div>

        <div className="flex flex-col items-center gap-4 w-full">
          {isAuthenticated ? (
            <>
              <Link to="/personal-account/applications/create">
                <button className="bg-yellow-400 text-black px-5 py-2 rounded-2xl hover:bg-yellow-300 w-full mb-4">
                  Создать заявку
                </button>
              </Link>
              <div className="relative w-full" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown((prev) => !prev)}
                  className="flex items-center justify-center w-full focus:outline-none bg-transparent"
                >
                  <FaUserCircle size={30} className="text-gray-700 hover:text-yellow-300" />
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-60 bg-white shadow-lg rounded-lg z-60">
                    <div className="p-4 border-b">
                      <p className="font-semibold text-lg text-black">{user?.name || 'User'}</p>
                      <p className="text-sm text-gray-600">{user?.email || ''}</p>
                    </div>
                    <Link
                      to="/personal-account/profile"
                      className="block px-4 py-2 hover:bg-gray-100 text-black cursor-pointer"
                      onClick={() => setShowDropdown(false)}
                    >
                      Мой профиль
                    </Link>
                    <Link
                      to="/companies"
                      className="block px-4 py-2 hover:bg-gray-100 text-black cursor-pointer"
                      onClick={() => setShowDropdown(false)}
                    >
                      Мои компании
                    </Link>
                    <Link
                      to="/requests"
                      className="block px-4 py-2 hover:bg-gray-100 text-black cursor-pointer"
                      onClick={() => setShowDropdown(false)}
                    >
                      Работа с заявками
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 hover:bg-gray-100 text-black cursor-pointer"
                      onClick={() => setShowDropdown(false)}
                    >
                      Настройки
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full bg-transparent px-4 py-2 text-left text-black hover:bg-red-500 hover:text-white cursor-pointer"
                    >
                      Выйти
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <a href="https://t.me/manager21yard" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-600 py-2">
                ❓
              </a>
              <Link to="/login" className="px-5 py-2 border border-gray-400 rounded-2xl hover:bg-gray-200 w-full text-center mb-4">
                Вход
              </Link>
              <Link to="/register" className="px-5 py-2 bg-yellow-400 text-black rounded-2xl hover:bg-yellow-300 w-full text-center">
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
