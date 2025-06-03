import React from 'react';
import { Link } from '../navigation/Link';
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from 'lucide-react';

export interface FooterProps {
  currentLanguage?: 'fr' | 'en';
}

export const Footer: React.FC<FooterProps> = ({ currentLanguage = 'fr' }) => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 flex items-center justify-center rounded-md bg-gradient-to-r from-green-600 via-yellow-500 to-red-500">
                <span className="text-white font-bold">CC</span>
              </div>
              <span className="ml-2 text-xl font-bold">CultureCongo</span>
            </div>
            <p className="text-gray-300 mb-4">
              {currentLanguage === 'fr'
                ? 'Valoriser et promouvoir le patrimoine culturel congolais à travers des événements artistiques et culturels innovants.'
                : 'Enhancing and promoting Congo\'s cultural heritage through innovative artistic and cultural events.'}
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {currentLanguage === 'fr' ? 'Liens Rapides' : 'Quick Links'}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {currentLanguage === 'fr' ? 'Accueil' : 'Home'}
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {currentLanguage === 'fr' ? 'Événements' : 'Events'}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {currentLanguage === 'fr' ? 'À propos' : 'About'}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {currentLanguage === 'fr' ? 'Contact' : 'Contact'}
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {currentLanguage === 'fr' ? 'Connexion' : 'Login'}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {currentLanguage === 'fr' ? 'Événements' : 'Events'}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/events?category=music"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {currentLanguage === 'fr' ? 'Concerts & Musique' : 'Concerts & Music'}
                </Link>
              </li>
              <li>
                <Link
                  to="/events?category=art"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {currentLanguage === 'fr' ? 'Expositions d\'Art' : 'Art Exhibitions'}
                </Link>
              </li>
              <li>
                <Link
                  to="/events?category=dance"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {currentLanguage === 'fr' ? 'Danse & Performances' : 'Dance & Performances'}
                </Link>
              </li>
              <li>
                <Link
                  to="/events?category=workshop"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {currentLanguage === 'fr' ? 'Ateliers & Formations' : 'Workshops & Training'}
                </Link>
              </li>
              <li>
                <Link
                  to="/events?category=festival"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {currentLanguage === 'fr' ? 'Festivals' : 'Festivals'}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {currentLanguage === 'fr' ? 'Contact' : 'Contact'}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="text-gray-400 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-300">
                  {currentLanguage === 'fr'
                    ? '123 Avenue de l\'Indépendance, Brazzaville, République du Congo'
                    : '123 Independence Avenue, Brazzaville, Republic of Congo'}
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-gray-400 mr-2 flex-shrink-0" />
                <span className="text-gray-300">+242 06 123 4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-gray-400 mr-2 flex-shrink-0" />
                <a
                  href="mailto:contact@culturecongo.org"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  contact@culturecongo.org
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {year} CultureCongo. {currentLanguage === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}
          </p>
          <div className="flex space-x-6">
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              {currentLanguage === 'fr' ? 'Conditions d\'utilisation' : 'Terms of Service'}
            </Link>
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              {currentLanguage === 'fr' ? 'Politique de confidentialité' : 'Privacy Policy'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};