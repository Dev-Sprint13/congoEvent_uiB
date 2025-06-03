import React from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Users,
  BarChart,
  Settings,
  LogOut,
} from 'lucide-react';

interface SidebarProps {
  currentLanguage?: 'fr' | 'en';
}

export const Sidebar: React.FC<SidebarProps> = ({ currentLanguage = 'fr' }) => {
  const navigation = [
    {
      name: currentLanguage === 'fr' ? 'Tableau de bord' : 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
    },
    {
      name: currentLanguage === 'fr' ? 'Événements' : 'Events',
      href: '/admin/events',
      icon: Calendar,
    },
    {
      name: currentLanguage === 'fr' ? 'Utilisateurs' : 'Users',
      href: '/admin/users',
      icon: Users,
    },
    {
      name: currentLanguage === 'fr' ? 'Rapports' : 'Reports',
      href: '/admin/reports',
      icon: BarChart,
    },
    {
      name: currentLanguage === 'fr' ? 'Paramètres' : 'Settings',
      href: '/admin/settings',
      icon: Settings,
    },
  ];

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-5 bg-gray-800 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <div className="h-8 w-8 flex items-center justify-center rounded-md bg-gradient-to-r from-green-600 via-yellow-500 to-red-500">
            <span className="text-white font-bold">CC</span>
          </div>
          <span className="ml-2 text-xl font-bold text-white">CultureCongo</span>
        </div>
        <div className="mt-5 flex-grow flex flex-col">
          <nav className="flex-1 px-2 pb-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <item.icon className="mr-3 flex-shrink-0 h-6 w-6" />
                {item.name}
              </Link>
            ))}
          </nav>
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