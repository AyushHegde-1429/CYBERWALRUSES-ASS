import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bell, Search, Moon, Sun, ChevronDown } from 'lucide-react';
import { currentUser } from '../../data/mockData';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/' },
    { name: 'Markets', href: '/markets' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Strategies', href: '/strategies' },
    { name: 'About', href: '/about' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, we would toggle the actual theme here
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <div className="text-blue-500 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M2 5h20M2 19h20M2 12h20M9 12l3-3 3 3"/>
                  </svg>
                </div>
                <span className="text-white font-bold text-xl">TradePi</span>
              </Link>
            </div>
            
            <nav className="hidden md:ml-8 md:flex md:space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    isActive(item.href)
                      ? 'text-white bg-gray-800'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center">
            <div className="relative mx-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search stocks..."
                className="block w-full pl-10 pr-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              onClick={toggleDarkMode}
              className="ml-4 px-2 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <button className="ml-4 relative p-1 rounded-full text-gray-300 hover:text-white focus:outline-none">
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              <Bell className="h-5 w-5" />
            </button>

            <div className="ml-4 relative flex items-center">
              <div className="relative">
                <button className="flex items-center max-w-xs text-sm rounded-full focus:outline-none">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={currentUser.avatar}
                    alt="User avatar"
                  />
                  <span className="ml-2 text-gray-300 hidden lg:block">{currentUser.name}</span>
                  <ChevronDown className="ml-1 h-4 w-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.href)
                    ? 'text-white bg-gray-800'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src={currentUser.avatar}
                  alt="User avatar"
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-white">{currentUser.name}</div>
                <div className="text-sm font-medium text-gray-400">{currentUser.email}</div>
              </div>
              <div className="ml-auto">
                <button className="p-1 rounded-full text-gray-400 hover:text-white focus:outline-none">
                  <Bell className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link
                to="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Your Profile
              </Link>
              <button
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                onClick={toggleDarkMode}
              >
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
              <Link
                to="/settings"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Settings
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;