import React, { useState } from 'react';
import { Navbar } from '../components/ui/Navbar';
import { Footer } from '../components/ui/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { MOCK_EVENTS, MOCK_PARTICIPANTS, MOCK_STATS } from '../constants/mockData';
import { formatDate } from '../utils/formatters';
import { Calendar, Users, Ticket, BarChart3, ArrowUpRight, Plus, Clock, AlertTriangle } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  
  const handleLanguageChange = (lang: 'fr' | 'en') => {
    setLanguage(lang);
  };
  
  // Get the upcoming events for the quick view
  const upcomingEvents = MOCK_EVENTS
    .filter(event => event.status === 'upcoming')
    .slice(0, 5);
  
  // Get recent registrations
  const recentRegistrations = MOCK_PARTICIPANTS
    .sort((a, b) => new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime())
    .slice(0, 5);
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-grow">
        {/* Sidebar and Main Content */}
        <div className="flex">
          {/* Sidebar */}
          <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:pt-16 bg-gray-800">
            <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
              <nav className="flex-1 px-2 py-4 space-y-1">
                <a
                  href="#"
                  className="bg-gray-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  <BarChart3 size={20} className="mr-3 text-gray-300" />
                  {language === 'fr' ? 'Tableau de bord' : 'Dashboard'}
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  <Calendar size={20} className="mr-3 text-gray-400" />
                  {language === 'fr' ? 'Événements' : 'Events'}
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  <Users size={20} className="mr-3 text-gray-400" />
                  {language === 'fr' ? 'Participants' : 'Participants'}
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  <Ticket size={20} className="mr-3 text-gray-400" />
                  {language === 'fr' ? 'Billets' : 'Tickets'}
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  <BarChart3 size={20} className="mr-3 text-gray-400" />
                  {language === 'fr' ? 'Rapports' : 'Reports'}
                </a>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:pl-64 flex flex-col flex-1">
            <main className="flex-1 py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {/* Page header */}
                <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {language === 'fr' ? 'Tableau de bord' : 'Dashboard'}
                  </h1>
                  <div className="mt-3 sm:mt-0 sm:ml-4">
                    <Button
                      variant="primary"
                      leftIcon={<Plus size={18} />}
                    >
                      {language === 'fr' ? 'Nouvel Événement' : 'New Event'}
                    </Button>
                  </div>
                </div>
                
                {/* Stats overview */}
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {/* Total Events */}
                  <Card variant="default">
                    <CardContent className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 p-3 rounded-md bg-green-100 text-green-600">
                          <Calendar size={24} />
                        </div>
                        <div className="ml-5">
                          <p className="text-sm font-medium text-gray-500">
                            {language === 'fr' ? 'Total des événements' : 'Total events'}
                          </p>
                          <p className="text-xl font-semibold text-gray-900">{MOCK_STATS.totalEvents}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Upcoming Events */}
                  <Card variant="default">
                    <CardContent className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 p-3 rounded-md bg-yellow-100 text-yellow-600">
                          <Clock size={24} />
                        </div>
                        <div className="ml-5">
                          <p className="text-sm font-medium text-gray-500">
                            {language === 'fr' ? 'Événements à venir' : 'Upcoming events'}
                          </p>
                          <p className="text-xl font-semibold text-gray-900">{MOCK_STATS.upcomingEvents}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Total Participants */}
                  <Card variant="default">
                    <CardContent className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 p-3 rounded-md bg-blue-100 text-blue-600">
                          <Users size={24} />
                        </div>
                        <div className="ml-5">
                          <p className="text-sm font-medium text-gray-500">
                            {language === 'fr' ? 'Total des participants' : 'Total participants'}
                          </p>
                          <p className="text-xl font-semibold text-gray-900">{MOCK_STATS.totalParticipants}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Attention Required */}
                  <Card variant="default">
                    <CardContent className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 p-3 rounded-md bg-red-100 text-red-600">
                          <AlertTriangle size={24} />
                        </div>
                        <div className="ml-5">
                          <p className="text-sm font-medium text-gray-500">
                            {language === 'fr' ? 'Attention requise' : 'Attention needed'}
                          </p>
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
                        <CardTitle className="text-lg font-medium">
                          {language === 'fr' ? 'Événements à venir' : 'Upcoming Events'}
                        </CardTitle>
                        <a
                          href="#"
                          className="text-sm font-medium text-green-600 hover:text-green-700 flex items-center"
                        >
                          {language === 'fr' ? 'Voir tout' : 'View all'}
                          <ArrowUpRight size={16} className="ml-1" />
                        </a>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y divide-gray-100">
                        {upcomingEvents.length > 0 ? (
                          upcomingEvents.map((event) => (
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
                                        {formatDate(event.startDate, language)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <Badge>
                                  {event.registeredCount}/{event.capacity}
                                </Badge>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-4 text-center text-gray-500">
                            {language === 'fr' ? 'Aucun événement à venir' : 'No upcoming events'}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Recent Registrations */}
                  <Card variant="default">
                    <CardHeader className="px-6 py-4 border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-medium">
                          {language === 'fr' ? 'Inscriptions récentes' : 'Recent Registrations'}
                        </CardTitle>
                        <a
                          href="#"
                          className="text-sm font-medium text-green-600 hover:text-green-700 flex items-center"
                        >
                          {language === 'fr' ? 'Voir tout' : 'View all'}
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
                                  {participant.status === 'confirmed'
                                    ? (language === 'fr' ? 'Confirmé' : 'Confirmed')
                                    : participant.status === 'pending'
                                    ? (language === 'fr' ? 'En attente' : 'Pending')
                                    : (language === 'fr' ? 'Annulé' : 'Cancelled')
                                  }
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
                      <CardTitle className="text-lg font-medium">
                        {language === 'fr' ? 'Événements par catégorie' : 'Events by Category'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="h-64 grid grid-cols-1 md:grid-cols-4 gap-4">
                        {Object.entries(MOCK_STATS.eventsByCategory).map(([category, count]) => (
                          count > 0 && (
                            <div key={category} className="flex flex-col items-center justify-center">
                              <div className="text-3xl font-bold text-gray-900 mb-2">{count}</div>
                              <div className="text-sm text-gray-500">
                                {language === 'fr' ? {
                                  music: 'Musique',
                                  dance: 'Danse',
                                  theater: 'Théâtre',
                                  art: 'Art',
                                  festival: 'Festival',
                                  workshop: 'Atelier',
                                  conference: 'Conférence',
                                  other: 'Autre',
                                }[category as keyof typeof MOCK_STATS.eventsByCategory] : {
                                  music: 'Music',
                                  dance: 'Dance',
                                  theater: 'Theater',
                                  art: 'Art',
                                  festival: 'Festival',
                                  workshop: 'Workshop',
                                  conference: 'Conference',
                                  other: 'Other',
                                }[category as keyof typeof MOCK_STATS.eventsByCategory]}
                              </div>
                            </div>
                          )
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Quick Actions */}
                <div className="mt-8">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    {language === 'fr' ? 'Actions rapides' : 'Quick Actions'}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Button
                      className="justify-start h-auto py-4"
                      leftIcon={<Plus size={18} />}
                    >
                      {language === 'fr' ? 'Nouvel événement' : 'New event'}
                    </Button>
                    <Button
                      variant="secondary"
                      className="justify-start h-auto py-4"
                      leftIcon={<Users size={18} />}
                    >
                      {language === 'fr' ? 'Ajouter des participants' : 'Add participants'}
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start h-auto py-4"
                      leftIcon={<BarChart3 size={18} />}
                    >
                      {language === 'fr' ? 'Générer un rapport' : 'Generate report'}
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start h-auto py-4"
                      leftIcon={<Calendar size={18} />}
                    >
                      {language === 'fr' ? 'Voir le calendrier' : 'View calendar'}
                    </Button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};