import React from 'react';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Event } from '../../types';
import { Link } from '../navigation/Link';
import { Calendar, MapPin, Users } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

interface EventCardProps {
  event: Event;
  isCompact?: boolean;
  language?: 'fr' | 'en';
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  isCompact = false,
  language = 'fr',
}) => {
  const statusVariants: Record<Event['status'], { variant: React.ComponentProps<typeof Badge>['variant'], label: { fr: string; en: string } }> = {
    upcoming: {
      variant: 'default',
      label: { fr: 'À venir', en: 'Upcoming' },
    },
    ongoing: {
      variant: 'success',
      label: { fr: 'En cours', en: 'Ongoing' },
    },
    completed: {
      variant: 'outline',
      label: { fr: 'Terminé', en: 'Completed' },
    },
    cancelled: {
      variant: 'error',
      label: { fr: 'Annulé', en: 'Cancelled' },
    },
  };

  const categoryLabels: Record<Event['category'], { fr: string; en: string }> = {
    music: { fr: 'Musique', en: 'Music' },
    dance: { fr: 'Danse', en: 'Dance' },
    theater: { fr: 'Théâtre', en: 'Theater' },
    art: { fr: 'Art', en: 'Art' },
    festival: { fr: 'Festival', en: 'Festival' },
    workshop: { fr: 'Atelier', en: 'Workshop' },
    conference: { fr: 'Conférence', en: 'Conference' },
    other: { fr: 'Autre', en: 'Other' },
  };

  return (
    <Card
      variant="elevated"
      className={`group transition-all duration-300 h-full ${
        isCompact ? 'max-w-xs' : 'w-full'
      }`}
    >
      <Link to={`/events/${event.id}`} className="block h-full">
        <div className="relative">
          <div className="aspect-[16/9] overflow-hidden">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="absolute top-2 left-2 flex gap-2">
            <Badge variant={statusVariants[event.status].variant}>
              {statusVariants[event.status].label[language]}
            </Badge>
            <Badge variant="outline" className="bg-white/90">
              {categoryLabels[event.category][language]}
            </Badge>
          </div>
          {event.isFeatured && (
            <Badge
              variant="warning"
              className="absolute top-2 right-2"
            >
              {language === 'fr' ? 'En vedette' : 'Featured'}
            </Badge>
          )}
        </div>

        <CardContent className="pt-4">
          <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-green-600 transition-colors">
            {event.title}
          </h3>
          {!isCompact && (
            <p className="mt-2 text-gray-600 text-sm line-clamp-2">
              {event.shortDescription}
            </p>
          )}
          <div className="mt-3 space-y-2">
            <div className="flex items-center text-sm text-gray-500">
              <Calendar size={16} className="mr-2 text-green-500" />
              <span>{formatDate(event.startDate, language)}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin size={16} className="mr-2 text-green-500" />
              <span className="truncate">{event.location}</span>
            </div>
            {!isCompact && (
              <div className="flex items-center text-sm text-gray-500">
                <Users size={16} className="mr-2 text-green-500" />
                <span>
                  {event.registeredCount}/{event.capacity} {language === 'fr' ? 'inscrits' : 'registered'}
                </span>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between items-center border-t border-gray-100 bg-gray-50">
          {event.ticketPrice !== undefined ? (
            <div className="font-medium">
              {event.ticketPrice === 0 ? (
                <span className="text-green-600">
                  {language === 'fr' ? 'Gratuit' : 'Free'}
                </span>
              ) : (
                <span>
                  {event.ticketPrice.toLocaleString()} {event.ticketCurrency}
                </span>
              )}
            </div>
          ) : (
            <div></div>
          )}
          <span className="text-sm font-medium text-green-600 group-hover:underline">
            {language === 'fr' ? 'Voir les détails' : 'View details'}
          </span>
        </CardFooter>
      </Link>
    </Card>
  );
};