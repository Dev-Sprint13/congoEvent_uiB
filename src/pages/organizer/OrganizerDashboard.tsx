import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { MOCK_EVENTS, MOCK_PARTICIPANTS } from '../../constants/mockData';
import { formatDate } from '../../utils/formatters';
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Plus, 
  Eye,
  Edit,
  Share2,
  AlertCircle,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react';

export const OrganizerDashboard: React.FC = () => {
  const [language] = useState<'fr' | 'en'>('fr');
  
  // Filter events for this organizer (in real app, this would be based on user ID)
  const organizerEvents = MOCK_EVENTS.filter(event => event.organizers.includes('2'));
  const upcomingEvents = organizerEvents.filter(event => event.status === 'upcoming');
  const ongoingEvents = organizerEvents.filter(event => event.status === 'ongoing');
  
  // Calculate stats
  const totalParticipants = organizerEvents.reduce((sum, event) => sum + event.registeredCount, 0);
  const totalRevenue = organizerEvents.reduce((sum, event) => {
    return sum + (event.ticketPrice || 0) * event.registeredCount;
  }, 0);
  
  const recentParticipants = MOCK_PARTICIPANTS
    .filter(p => organizerEvents.some(e => e.id === p.eventId))
    .sort((a, b) => new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime())
    .slice(0, 5);

  const stats = [
    {
      title: language === 'fr' ? 'Mes événements' : 'My Events',
      value: organizerEvents.length,
      icon: Calendar,
      color: 'bg-blue-500',
      change: '+2',
      changeType: 'positive' as const
    },
    {
      title: language === 'fr' ? 'Participants totaux' : 'Total Participants',
      value: totalParticipants,
      icon: Users,
      color: 'bg-green-500',
      change: '+12%',
      changeType: 'positive' as const
    },
    {
      title: language === 'fr' ? 'Revenus totaux' : 'Total Revenue',
      value: `${totalRevenue.toLocaleString()} XAF`,
      icon: DollarSign,
      color: 'bg-yellow-500',
      change: '+8%',
      changeType: 'positive' as const
    },
    {
      title: language === 'fr' ? 'Taux de remplissage' : 'Fill Rate',
      value: `${Math.round((totalParticipants / organizerEvents.reduce((sum, e) => sum + e.capacity, 0)) * 100)}%`,
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: '+5%',
      changeType: 'positive' as const
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {language === 'fr' ? 'Tableau de bord organisateur' : 'Organizer Dashboard'}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {language === 'fr' 
              ? 'Gérez vos événements et suivez vos performances'
              : 'Manage your events and track your performance'
            }
          </p>
        </div>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <Button
            variant="primary"
            leftIcon={<Plus size={18} />}
            onClick={() => window.location.href = '/organizer/create-event'}
          >
            {language === 'fr' ? 'Nouvel événement' : 'New Event'}
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} variant="elevated">
            <CardContent className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 p-3 rounded-md ${stat.color} text-white`}>
                  <stat.icon size={24} />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.title}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                        stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          {language === 'fr' ? 'Actions rapides' : 'Quick Actions'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button
            variant="outline"
            className="justify-start h-auto py-4"
            leftIcon={<Plus size={18} />}
            onClick={() => window.location.href = '/organizer/create-event'}
          >
            <div className="text-left">
              <div className="font-medium">
                {language === 'fr' ? 'Créer un événement' : 'Create Event'}
              </div>
              <div className="text-sm text-gray-500">
                {language === 'fr' ? 'Nouveau événement' : 'New event'}
              </div>
            </div>
          </Button>
          
          <Button
            variant="outline"
            className="justify-start h-auto py-4"
            leftIcon={<Share2 size={18} />}
          >
            <div className="text-left">
              <div className="font-medium">
                {language === 'fr' ? 'Promouvoir' : 'Promote'}
              </div>
              <div className="text-sm text-gray-500">
                {language === 'fr' ? 'Outils marketing' : 'Marketing tools'}
              </div>
            </div>
          </Button>
          
          <Button
            variant="outline"
            className="justify-start h-auto py-4"
            leftIcon={<Users size={18} />}
            onClick={() => window.location.href = '/organizer/participants'}
          >
            <div className="text-left">
              <div className="font-medium">
                {language === 'fr' ? 'Participants' : 'Participants'}
              </div>
              <div className="text-sm text-gray-500">
                {language === 'fr' ? 'Gérer les inscriptions' : 'Manage registrations'}
              </div>
            </div>
          </Button>
          
          <Button
            variant="outline"
            className="justify-start h-auto py-4"
            leftIcon={<TrendingUp size={18} />}
            onClick={() => window.location.href = '/organizer/analytics'}
          >
            <div className="text-left">
              <div className="font-medium">
                {language === 'fr' ? 'Statistiques' : 'Analytics'}
              </div>
              <div className="text-sm text-gray-500">
                {language === 'fr' ? 'Voir les performances' : 'View performance'}
              </div>
            </div>
          </Button>
        </div>
      </div>

      {/* Events and Participants Grid */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Events */}
        <Card variant="elevated">
          <CardHeader className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">
                {language === 'fr' ? 'Mes événements récents' : 'My Recent Events'}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.location.href = '/organizer/events'}
              >
                {language === 'fr' ? 'Voir tout' : 'View all'}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {organizerEvents.slice(0, 5).map((event) => (
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
                        <h4 className="text-sm font-medium text-gray-900 flex items-center">
                          {event.title}
                          {event.isFeatured && (
                            <Star size={14} className="ml-2 text-yellow-500" />
                          )}
                        </h4>
                        <div className="flex items-center mt-1">
                          <Calendar size={14} className="text-gray-400 mr-1" />
                          <span className="text-xs text-gray-500">
                            {formatDate(event.startDate, language)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={
                        event.status === 'upcoming' ? 'default' :
                        event.status === 'ongoing' ? 'success' :
                        event.status === 'completed' ? 'outline' : 'error'
                      }>
                        {event.status}
                      </Badge>
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {event.registeredCount}/{event.capacity}
                        </div>
                        <div className="text-xs text-gray-500">
                          {language === 'fr' ? 'inscrits' : 'registered'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Participants */}
        <Card variant="elevated">
          <CardHeader className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">
                {language === 'fr' ? 'Inscriptions récentes' : 'Recent Registrations'}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.location.href = '/organizer/participants'}
              >
                {language === 'fr' ? 'Voir tout' : 'View all'}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {recentParticipants.map((participant) => {
                const event = organizerEvents.find(e => e.id === participant.eventId);
                return (
                  <div key={participant.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <Users size={20} className="text-gray-500" />
                        </div>
                        <div className="ml-4">
                          <h4 className="text-sm font-medium text-gray-900">
                            {participant.name}
                          </h4>
                          <div className="flex items-center mt-1">
                            <span className="text-xs text-gray-500">
                              {event ? event.title : 'Unknown event'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={
                          participant.status === 'confirmed' ? 'success' :
                          participant.status === 'pending' ? 'warning' : 'error'
                        }>
                          {participant.status}
                        </Badge>
                        <div className="text-xs text-gray-500">
                          {new Date(participant.registrationDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts and Notifications */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          {language === 'fr' ? 'Alertes et notifications' : 'Alerts and Notifications'}
        </h2>
        <div className="space-y-4">
          {upcomingEvents.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Clock className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    {language === 'fr' ? 'Événements à venir' : 'Upcoming Events'}
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>
                      {language === 'fr' 
                        ? `Vous avez ${upcomingEvents.length} événement(s) à venir. Assurez-vous que tout est prêt !`
                        : `You have ${upcomingEvents.length} upcoming event(s). Make sure everything is ready!`
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {ongoingEvents.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    {language === 'fr' ? 'Événements en cours' : 'Ongoing Events'}
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>
                      {language === 'fr' 
                        ? `${ongoingEvents.length} événement(s) en cours. Bonne chance !`
                        : `${ongoingEvents.length} event(s) currently ongoing. Good luck!`
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};