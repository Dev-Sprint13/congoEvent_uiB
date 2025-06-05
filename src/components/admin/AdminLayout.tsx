import React from 'react';
import { Sidebar } from './Sidebar';
import { Outlet } from 'react-router-dom';

export const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 md:ml-64">
          <div className="py-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};