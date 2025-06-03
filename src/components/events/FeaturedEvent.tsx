import React from 'react';
import { Event } from '../../types';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { formatDate } from '../../utils/formatters';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Link } from '../navigation/Link';

interface FeaturedEventProps {
  event: Event;
  language?: 'fr' | 'en';
}

export const FeaturedEvent: React.FC<FeaturedEventProps> = ({
  event,
  language = 'fr',
}) => {
  const statusLabels: Record<Event['status'], { fr: string; en: string }> = {
    upcoming: { fr: 'À venir', en: 'Upcoming' },
    ongoing: { fr: 'En cours', en: 'Ongoing' },
    completed: { fr: 'Terminé', en: 'Completed' },
    cancelled: { fr: 'Annulé', en: 'Cancelled' },
  };

  return (
    <div className="relative overflow-hidden rounded-xl bg-gray-900 h-[500px] flex items-end">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${event.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
      </div>

      <div className="relative z-10 w-full p-6 md:p-8 text-white">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="warning">
            {language === 'fr' ? 'En vedette' : 'Featured'}
          </Badge>
          <Badge variant="default">
            {statusLabels[event.status][language]}
          </Badge>
        </div>

        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 max-w-3xl">
          {event.title}
        </h2>
        
        <p className="mb-6 text-gray-200 max-w-2xl line-clamp-3">
          {event.shortDescription}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center">
            <Calendar size={20} className="mr-2 text-green-400" />
            <span>{formatDate(event.startDate, language)}</span>
          </div>
          <div className="flex items-center">
            <MapPin size={20} className="mr-2 text-green-400" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center">
            <Users size={20} className="mr-2 text-green-400" />
            <span>
              {event.registeredCount}/{event.capacity} {language === 'fr' ? 'inscrits' : 'registered'}
            </span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Link to={`/events/${event.id}`}>
            <Button variant="primary" size="lg">
              {language === 'fr' ? 'Détails de l\'événement' : 'Event Details'}
            </Button>
          </Link>
          <Link to={`/register/${event.id}`}>
            <Button variant="outline" size="lg">
              {language === 'fr' ? 'S\'inscrire' : 'Register'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};