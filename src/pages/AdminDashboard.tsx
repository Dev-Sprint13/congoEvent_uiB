import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { MOCK_EVENTS, MOCK_PARTICIPANTS, MOCK_STATS } from '../constants/mockData';
import { formatDate } from '../utils/formatters';
import { Calendar, Users, Ticket, BarChart3, ArrowUpRight, Plus, Clock, AlertTriangle } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  // Get the upcoming events for the quick view
  const upcomingEvents = MOCK_EVENTS
    .filter(event => event.status === 'upcoming')
    .slice(0, 5);
  
  // Get recent registrations
  const recentRegistrations = MOCK_PARTICIPANTS
    .sort((a, b) => new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime())
    .slice(0, 5);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <Button
            variant="primary"
            leftIcon={<Plus size={18} />}
          >
            New Event
          </Button>
        </div>
      </div>
      
      {/* Stats overview */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card variant="default">
          <CardContent className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 rounded-md bg-green-100 text-green-600">
                <Calendar size={24} />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Total events</p>
                <p className="text-xl font-semibold text-gray-900">{MOCK_STATS.totalEvents}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card variant="default">
          <CardContent className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 rounded-md bg-yellow-100 text-yellow-600">
                <Clock size={24} />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Upcoming events</p>
                <p className="text-xl font-semibold text-gray-900">{MOCK_STATS.upcomingEvents}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card variant="default">
          <CardContent className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 rounded-md bg-blue-100 text-blue-600">
                <Users size={24} />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Total participants</p>
                <p className="text-xl font-semibold text-gray-900">{MOCK_STATS.totalParticipants}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card variant="default">
          <CardContent className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 rounded-md bg-red-100 text-red-600">
                <AlertTriangle size={24} />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Attention needed</p>
                <p className="text-xl font-semibold text-gray-900">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Upcoming Events and Registrations section */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Upcoming Events */}
        <Card variant="default">
          <CardHeader className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Upcoming Events</CardTitle>
              <a
                href="#"
                className="text-sm font-medium text-green-600 hover:text-green-700 flex items-center"
              >
                View all
                <ArrowUpRight size={16} className="ml-1" />
              </a>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-md object-cover"
                          src={event.image}
                          alt={event.title}
                        />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
                        <div className="flex items-center mt-1">
                          <Calendar size={14} className="text-gray-400 mr-1" />
                          <span className="text-xs text-gray-500">
                            {formatDate(event.startDate, 'en')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge>
                      {event.registeredCount}/{event.capacity}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Registrations */}
        <Card variant="default">
          <CardHeader className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Recent Registrations</CardTitle>
              <a
                href="#"
                className="text-sm font-medium text-green-600 hover:text-green-700 flex items-center"
              >
                View all
                <ArrowUpRight size={16} className="ml-1" />
              </a>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {recentRegistrations.map((participant) => {
                const event = MOCK_EVENTS.find(e => e.id === participant.eventId);
                return (
                  <div key={participant.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <Users size={20} className="text-gray-500" />
                        </div>
                        <div className="ml-4">
                          <h4 className="text-sm font-medium text-gray-900">{participant.name}</h4>
                          <div className="flex items-center mt-1">
                            <span className="text-xs text-gray-500">
                              {event ? event.title : 'Unknown event'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge variant={
                        participant.status === 'confirmed' ? 'success' :
                        participant.status === 'pending' ? 'warning' : 'error'
                      }>
                        {participant.status}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Events by Category Chart */}
      <div className="mt-8">
        <Card variant="default">
          <CardHeader className="px-6 py-4 border-b border-gray-100">
            <CardTitle className="text-lg font-medium">Events by Category</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-64 grid grid-cols-1 md:grid-cols-4 gap-4">
              {Object.entries(MOCK_STATS.eventsByCategory).map(([category, count]) => (
                count > 0 && (
                  <div key={category} className="flex flex-col items-center justify-center">
                    <div className="text-3xl font-bold text-gray-900 mb-2">{count}</div>
                    <div className="text-sm text-gray-500">{category}</div>
                  </div>
                )
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button
            className="justify-start h-auto py-4"
            leftIcon={<Plus size={18} />}
          >
            New event
          </Button>
          <Button
            variant="secondary"
            className="justify-start h-auto py-4"
            leftIcon={<Users size={18} />}
          >
            Add participants
          </Button>
          <Button
            variant="outline"
            className="justify-start h-auto py-4"
            leftIcon={<BarChart3 size={18} />}
          >
            Generate report
          </Button>
          <Button
            variant="ghost"
            className="justify-start h-auto py-4"
            leftIcon={<Calendar size={18} />}
          >
            View calendar
          </Button>
        </div>
      </div>
    </div>
  );
};