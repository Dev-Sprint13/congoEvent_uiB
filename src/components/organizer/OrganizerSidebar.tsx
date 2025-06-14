import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Plus,
  BarChart3,
  Users,
  Settings,
  Megaphone,
  Star,
  LogOut,
  Eye,
  CreditCard,
} from 'lucide-react';

interface OrganizerSidebarProps {
  currentLanguage?: 'fr' | 'en';
}

export const OrganizerSidebar: React.FC<OrganizerSidebarProps> = ({ currentLanguage = 'fr' }) => {
  const location = useLocation();

  const navigation = [
    {
      name: currentLanguage === 'fr' ? 'Tableau de bord' : 'Dashboard',
      href: '/organizer',
      icon: LayoutDashboard,
    },
    {
      name: currentLanguage === 'fr' ? 'Mes événements' : 'My Events',
      href: '/organizer/events',
      icon: Calendar,
    },
    {
      name: currentLanguage === 'fr' ? 'Créer un événement' : 'Create Event',
      href: '/organizer/create-event',
      icon: Plus,
    },
    {
      name: currentLanguage === 'fr' ? 'Participants' : 'Participants',
      href: '/organizer/participants',
      icon: Users,
    },
    {
      name: currentLanguage === 'fr' ? 'Promotion' : 'Promotion',
      href: '/organizer/promotion',
      icon: Megaphone,
    },
    {
      name: currentLanguage === 'fr' ? 'Statistiques' : 'Analytics',
      href: '/organizer/analytics',
      icon: BarChart3,
    },
    {
      name: currentLanguage === 'fr' ? 'Revenus' : 'Revenue',
      href: '/organizer/revenue',
      icon: CreditCard,
    },
    {
      name: currentLanguage === 'fr' ? 'Paramètres' : 'Settings',
      href: '/organizer/settings',
      icon: Settings,
    },
  ];

  const isActive = (href: string) => {
    if (href === '/organizer') {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-5 bg-gray-800 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <div className="h-8 w-8 flex items-center justify-center rounded-md bg-gradient-to-r from-green-600 via-yellow-500 to-red-500">
            <span className="text-white font-bold">CC</span>
          </div>
          <div className="ml-2">
            <span className="text-xl font-bold text-white">CultureCongo</span>
            <div className="text-xs text-green-300">
              {currentLanguage === 'fr' ? 'Espace Organisateur' : 'Organizer Space'}
            </div>
          </div>
        </div>
        
        <div className="mt-5 flex-grow flex flex-col">
          <nav className="flex-1 px-2 pb-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(item.href)
                    ? 'bg-green-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <item.icon className="mr-3 flex-shrink-0 h-6 w-6" />
                {item.name}
              </Link>
            ))}
          </nav>
          
          <div className="px-2 pb-4">
            <Link
              to="/"
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            >
              <Eye className="mr-3 flex-shrink-0 h-6 w-6" />
              {currentLanguage === 'fr' ? 'Voir le site' : 'View Site'}
            </Link>
          </div>
        </div>
        
        <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
          <button
            className="flex-shrink-0 w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
            onClick={() => {
              // Handle logout
            }}
          >
            <LogOut className="mr-3 flex-shrink-0 h-6 w-6" />
            {currentLanguage === 'fr' ? 'Se déconnecter' : 'Logout'}
          </button>
        </div>
      </div>
    </div>
  );
};