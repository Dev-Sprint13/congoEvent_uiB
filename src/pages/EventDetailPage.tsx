import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/ui/Navbar';
import { Footer } from '../components/ui/Footer';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card, CardContent } from '../components/ui/Card';
import { Event } from '../types';
import { MOCK_EVENTS, MOCK_PARTNERS } from '../constants/mockData';
import { formatDateTime, formatCurrency } from '../utils/formatters';
import { Link } from '../components/navigation/Link';
import { Calendar, MapPin, Users, Clock, Info, Share2, ChevronLeft } from 'lucide-react';

export const EventDetailPage: React.FC = () => {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const [event, setEvent] = useState<Event | null>(null);
  
  const handleLanguageChange = (lang: 'fr' | 'en') => {
    setLanguage(lang);
  };
  
  // In a real app, we would get the event ID from the URL
  // For this demo, we'll just use the first event
  useEffect(() => {
    // Simulating loading the event by ID
    setEvent(MOCK_EVENTS[0]);
  }, []);
  
  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar
          currentLanguage={language}
          onLanguageChange={handleLanguageChange}
        />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
        <Footer currentLanguage={language} />
      </div>
    );
  }
  
  const statusLabels: Record<Event['status'], { fr: string; en: string }> = {
    upcoming: { fr: 'À venir', en: 'Upcoming' },
    ongoing: { fr: 'En cours', en: 'Ongoing' },
    completed: { fr: 'Terminé', en: 'Completed' },
    cancelled: { fr: 'Annulé', en: 'Cancelled' },
  };
  
  const statusVariants: Record<Event['status'], React.ComponentProps<typeof Badge>['variant']> = {
    upcoming: 'default',
    ongoing: 'success',
    completed: 'outline',
    cancelled: 'error',
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
    <div className="min-h-screen flex flex-col">
      <Navbar
        currentLanguage={language}
        onLanguageChange={handleLanguageChange}
      />
      
      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="relative h-80 md:h-96 bg-gray-900">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${event.image})` }}
          >
            <div className="absolute inset-0 bg-black opacity-40"></div>
          </div>
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <Link to="/events" className="inline-flex items-center text-white mb-4 hover:text-green-300 transition-colors">
                <ChevronLeft size={20} className="mr-1" />
                {language === 'fr' ? 'Retour aux événements' : 'Back to events'}
              </Link>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant={statusVariants[event.status]}>
                  {statusLabels[event.status][language]}
                </Badge>
                <Badge variant="outline" className="bg-white/20">
                  {categoryLabels[event.category][language]}
                </Badge>
                {event.isFeatured && (
                  <Badge variant="warning">
                    {language === 'fr' ? 'En vedette' : 'Featured'}
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-4xl">
                {event.title}
              </h1>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="lg:flex lg:gap-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-4">
                    {language === 'fr' ? 'À propos de cet événement' : 'About this event'}
                  </h2>
                  <p className="text-gray-700 whitespace-pre-line">
                    {event.description}
                  </p>
                </div>
                
                <div className="border-t border-gray-100 px-6 py-4">
                  <Button
                    variant="outline"
                    leftIcon={<Share2 size={18} />}
                    onClick={() => {
                      // In a real app, this would open a share dialog
                      alert(language === 'fr' ? 'Partager l\'événement' : 'Share event');
                    }}
                  >
                    {language === 'fr' ? 'Partager' : 'Share'}
                  </Button>
                </div>
              </div>
              
              {/* Partners Section */}
              {event.partners.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">
                      {language === 'fr' ? 'Partenaires' : 'Partners'}
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {event.partners.map((partner) => (
                        <div key={partner.id} className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                          <img
                            src={partner.logo}
                            alt={partner.name}
                            className="w-16 h-16 object-cover rounded-full mb-2"
                          />
                          <h3 className="text-sm font-medium text-center">{partner.name}</h3>
                          {partner.website && (
                            <a
                              href={partner.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-green-600 hover:underline mt-1"
                            >
                              {language === 'fr' ? 'Visiter le site' : 'Visit website'}
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/3 space-y-6">
              {/* Event Details Card */}
              <Card variant="bordered">
                <CardContent className="p-0">
                  <div className="p-6 space-y-4">
                    {/* Date and Time */}
                    <div className="flex items-start">
                      <Calendar size={20} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium">
                          {language === 'fr' ? 'Date et Heure' : 'Date and Time'}
                        </h3>
                        <p className="text-gray-600 mt-1">
                          {formatDateTime(event.startDate, language)}
                        </p>
                        <p className="text-gray-600">
                          {language === 'fr' ? 'au' : 'to'} {formatDateTime(event.endDate, language)}
                        </p>
                      </div>
                    </div>
                    
                    {/* Location */}
                    <div className="flex items-start">
                      <MapPin size={20} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium">
                          {language === 'fr' ? 'Lieu' : 'Location'}
                        </h3>
                        <p className="text-gray-600 mt-1">{event.location}</p>
                        <a
                          href={`https://maps.google.com/?q=${encodeURIComponent(event.location)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 text-sm hover:underline mt-1 inline-block"
                        >
                          {language === 'fr' ? 'Voir sur la carte' : 'View on map'}
                        </a>
                      </div>
                    </div>
                    
                    {/* Registration Status */}
                    <div className="flex items-start">
                      <Users size={20} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium">
                          {language === 'fr' ? 'Inscriptions' : 'Registrations'}
                        </h3>
                        <p className="text-gray-600 mt-1">
                          {event.registeredCount}/{event.capacity} {language === 'fr' ? 'places réservées' : 'seats reserved'}
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                          <div 
                            className="bg-green-500 h-2.5 rounded-full"
                            style={{ width: `${(event.registeredCount / event.capacity) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Price */}
                    {event.ticketPrice !== undefined && (
                      <div className="flex items-start">
                        <Info size={20} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium">
                            {language === 'fr' ? 'Prix' : 'Price'}
                          </h3>
                          <p className="text-gray-600 mt-1">
                            {event.ticketPrice === 0
                              ? (language === 'fr' ? 'Gratuit' : 'Free')
                              : formatCurrency(event.ticketPrice, event.ticketCurrency, language)
                            }
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6 border-t border-gray-100">
                    {event.status === 'upcoming' || event.status === 'ongoing' ? (
                      <Link to={`/register/${event.id}`} className="block w-full">
                        <Button fullWidth>
                          {language === 'fr' ? 'S\'inscrire à cet événement' : 'Register for this event'}
                        </Button>
                      </Link>
                    ) : (
                      <Button disabled fullWidth>
                        {event.status === 'completed'
                          ? (language === 'fr' ? 'Événement terminé' : 'Event completed')
                          : (language === 'fr' ? 'Événement annulé' : 'Event cancelled')
                        }
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              {/* Important Info Card */}
              <Card variant="bordered">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">
                    {language === 'fr' ? 'Informations importantes' : 'Important information'}
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <Clock size={18} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>
                        {language === 'fr'
                          ? 'Arrivez 30 minutes avant le début de l\'événement'
                          : 'Arrive 30 minutes before the event starts'}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Info size={18} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>
                        {language === 'fr'
                          ? 'Apportez votre confirmation d\'inscription'
                          : 'Bring your registration confirmation'}
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer currentLanguage={language} />
    </div>
  );
};