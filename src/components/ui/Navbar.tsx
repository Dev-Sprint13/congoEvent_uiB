import React, { useState } from 'react';
import { Link } from '../navigation/Link';
import { Button } from './Button';
import { Menu, X, User, Search, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export interface NavbarProps {
  onLanguageChange?: (lang: 'fr' | 'en') => void;
  currentLanguage?: 'fr' | 'en';
  isLoggedIn?: boolean;
  userName?: string;
  userAvatar?: string;
  onLogin?: () => void;
  onSignup?: () => void;
  onProfile?: () => void;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onLanguageChange,
  currentLanguage = 'fr',
  isLoggedIn = false,
  userName,
  userAvatar,
  onLogin,
  onSignup,
  onProfile,
  onLogout,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLanguageChange = () => {
    onLanguageChange?.(currentLanguage === 'fr' ? 'en' : 'fr');
  };
  const navigate = useNavigate();
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <div className="flex items-center">
                  <div className="h-8 w-8 flex items-center justify-center rounded-md bg-gradient-to-r from-green-600 via-yellow-500 to-red-500">
                    <span className="text-white font-bold">CC</span>
                  </div>
                  <span className="ml-2 text-xl font-bold text-gray-900">CultureCongo</span>
                </div>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                {currentLanguage === 'fr' ? 'Accueil' : 'Home'}
              </Link>
              <Link to="/events" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                {currentLanguage === 'fr' ? 'Événements' : 'Events'}
              </Link>
              <Link to="/about" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                {currentLanguage === 'fr' ? 'À propos' : 'About'}
              </Link>
              <Link to="/contact" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                {currentLanguage === 'fr' ? 'Contact' : 'Contact'}
              </Link>
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <button
              type="button"
              className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              onClick={() => {}}
            >
              <span className="sr-only">Search</span>
              <Search size={20} />
            </button>
            
            <button
              type="button"
              className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              onClick={handleLanguageChange}
            >
              <span className="sr-only">Change Language</span>
              <Globe size={20} />
              <span className="ml-1 text-sm">{currentLanguage.toUpperCase()}</span>
            </button>
            
            {isLoggedIn ? (
              <div className="relative">
                <button
                  type="button"
                  className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  onClick={onProfile}
                >
                  <span className="sr-only">Open user menu</span>
                  {userAvatar ? (
                    <img
                      className="h-8 w-8 rounded-full"
                      src={userAvatar}
                      alt={userName || 'User'}
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                      <User size={18} />
                    </div>
                  )}
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={()=>navigate('/login')}
                >
                  {currentLanguage === 'fr' ? 'Connexion' : 'Login'}
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={()=>navigate('/register')}
                >
                  {currentLanguage === 'fr' ? 'S\'inscrire' : 'Sign Up'}
                </Button>
              </div>
            )}
          </div>
          
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
              aria-expanded="false"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
            >
              {currentLanguage === 'fr' ? 'Accueil' : 'Home'}
            </Link>
            <Link
              to="/events"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
            >
              {currentLanguage === 'fr' ? 'Événements' : 'Events'}
            </Link>
            <Link
              to="/about"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
            >
              {currentLanguage === 'fr' ? 'À propos' : 'About'}
            </Link>
            <Link
              to="/contact"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
            >
              {currentLanguage === 'fr' ? 'Contact' : 'Contact'}
            </Link>
          </div>
          
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              {isLoggedIn ? (
                <>
                  <div className="flex-shrink-0">
                    {userAvatar ? (
                      <img
                        className="h-10 w-10 rounded-full"
                        src={userAvatar}
                        alt={userName || 'User'}
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                        <User size={20} />
                      </div>
                    )}
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{userName}</div>
                  </div>
                </>
              ) : (
                <div className="flex space-x-2 w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onLogin}
                    className="flex-1"
                  >
                    {currentLanguage === 'fr' ? 'Connexion' : 'Login'}
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={onSignup}
                    className="flex-1"
                  >
                    {currentLanguage === 'fr' ? 'S\'inscrire' : 'Sign Up'}
                  </Button>
                </div>
              )}
            </div>
            <div className="mt-3 space-y-1">
              <button
                onClick={handleLanguageChange}
                className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <Globe size={16} />
                  <span className="ml-2">
                    {currentLanguage === 'fr' ? 'English' : 'Français'}
                  </span>
                </div>
              </button>
              {isLoggedIn && (
                <>
                  <button
                    onClick={onProfile}
                    className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    {currentLanguage === 'fr' ? 'Votre Profil' : 'Your Profile'}
                  </button>
                  <button
                    onClick={onLogout}
                    className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    {currentLanguage === 'fr' ? 'Se déconnecter' : 'Sign out'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};