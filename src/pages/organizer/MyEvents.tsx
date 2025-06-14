import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { MOCK_EVENTS } from '../../constants/mockData';
import { formatDateTime } from '../../utils/formatters';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Eye, 
  Copy,
  Share2,
  MoreHorizontal,
  Calendar,
  Users,
  MapPin,
  Star,
  TrendingUp
} from 'lucide-react';

export const MyEvents: React.FC = () => {
  const [language] = useState<'fr' | 'en'>('fr');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  
  // Filter events for this organizer
  const organizerEvents = MOCK_EVENTS.filter(event => event.organizers.includes('2'));
  
  const filteredEvents = organizerEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      upcoming: { fr: 'À venir', en: 'Upcoming' },
      ongoing: { fr: 'En cours', en: 'Ongoing' },
      completed: { fr: 'Terminé', en: 'Completed' },
      cancelled: { fr: 'Annulé', en: 'Cancelled' }
    };
    return labels[status as keyof typeof labels]?.[language] || status;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {language === 'fr' ? 'Mes événements' : 'My Events'}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {language === 'fr' 
              ? `Gérez vos ${organizerEvents.length} événements`
              : `Manage your ${organizerEvents.length} events`
            }
          </p>
        </div>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <Button
            variant="primary"
            leftIcon={<Plus size={18} />}
            onClick={() => window.location.href = '/organizer/create-event'}
          >
            {language === 'fr' ? 'Créer un événement' : 'Create Event'}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder={language === 'fr' ? 'Rechercher mes événements...' : 'Search my events...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search size={18} />}
            fullWidth
          />
        </div>
        <div className="sm:w-48">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          >
            <option value="all">
              {language === 'fr' ? 'Tous les statuts' : 'All statuses'}
            </option>
            <option value="upcoming">
              {language === 'fr' ? 'À venir' : 'Upcoming'}
            </option>
            <option value="ongoing">
              {language === 'fr' ? 'En cours' : 'Ongoing'}
            </option>
            <option value="completed">
              {language === 'fr' ? 'Terminé' : 'Completed'}
            </option>
            <option value="cancelled">
              {language === 'fr' ? 'Annulé' : 'Cancelled'}
            </option>
          </select>
        </div>
      </div>

      {/* Events Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <Card 
            key={event.id} 
            variant="elevated" 
            className={`group transition-all duration-300 hover:shadow-lg ${
              selectedEvent === event.id ? 'ring-2 ring-green-500' : ''
            }`}
          >
            <div className="relative">
              <div className="aspect-[16/9] overflow-hidden rounded-t-lg">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute top-2 left-2 flex gap-2">
                <Badge className={getStatusColor(event.status)}>
                  {getStatusLabel(event.status)}
                </Badge>
                {event.isFeatured && (
                  <Badge variant="warning" className="flex items-center gap-1">
                    <Star size={12} />
                    {language === 'fr' ? 'Vedette' : 'Featured'}
                  </Badge>
                )}
              </div>
              <div className="absolute top-2 right-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-white/80 hover:bg-white"
                >
                  <MoreHorizontal size={16} />
                </Button>
              </div>
            </div>

            <CardContent className="p-4">
              <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-green-600 transition-colors">
                {event.title}
              </h3>
              
              <div className="mt-3 space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar size={16} className="mr-2 text-green-500" />
                  <span>{formatDateTime(event.startDate, language)}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin size={16} className="mr-2 text-green-500" />
                  <span className="truncate">{event.location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users size={16} className="mr-2 text-green-500" />
                  <span>
                    {event.registeredCount}/{event.capacity} {language === 'fr' ? 'inscrits' : 'registered'}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-3">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>{language === 'fr' ? 'Taux de remplissage' : 'Fill rate'}</span>
                  <span>{Math.round((event.registeredCount / event.capacity) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(event.registeredCount / event.capacity) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Revenue */}
              {event.ticketPrice && event.ticketPrice > 0 && (
                <div className="mt-3 p-2 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-700">
                      {language === 'fr' ? 'Revenus' : 'Revenue'}
                    </span>
                    <span className="font-semibold text-green-800">
                      {(event.ticketPrice * event.registeredCount).toLocaleString()} XAF
                    </span>
                  </div>
                </div>
              )}
            </CardContent>

            {/* Actions */}
            <div className="px-4 pb-4 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Eye size={16} />}
                className="flex-1"
                onClick={() => window.open(`/events/${event.id}`, '_blank')}
              >
                {language === 'fr' ? 'Voir' : 'View'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Edit2 size={16} />}
                className="flex-1"
              >
                {language === 'fr' ? 'Modifier' : 'Edit'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Share2 size={16} />}
              >
                <Share2 size={16} />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-16">
          <Calendar size={64} className="mx-auto text-gray-300 mb-6" />
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            {language === 'fr' ? 'Aucun événement trouvé' : 'No events found'}
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            {searchTerm || statusFilter !== 'all'
              ? (language === 'fr' 
                  ? 'Aucun événement ne correspond à vos critères de recherche.'
                  : 'No events match your search criteria.')
              : (language === 'fr'
                  ? 'Vous n\'avez pas encore créé d\'événement. Commencez dès maintenant !'
                  : 'You haven\'t created any events yet. Get started now!')
            }
          </p>
          <Button
            variant="primary"
            leftIcon={<Plus size={18} />}
            onClick={() => window.location.href = '/organizer/create-event'}
          >
            {language === 'fr' ? 'Créer mon premier événement' : 'Create my first event'}
          </Button>
        </div>
      )}
    </div>
  );
};