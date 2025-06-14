import React from 'react';
import { OrganizerSidebar } from './OrganizerSidebar';
import { Outlet } from 'react-router-dom';

export const OrganizerLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <OrganizerSidebar />
        <div className="flex-1 md:ml-64">
          <div className="py-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};