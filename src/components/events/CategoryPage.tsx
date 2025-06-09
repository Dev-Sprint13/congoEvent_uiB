import React, { useState, useEffect } from 'react';
import { Navbar } from '../ui/Navbar';
import { Footer } from '../ui/Footer';
import { EventCard } from './EventCard';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Event, EventCategory } from '../../types';
import { MOCK_EVENTS } from '../../constants/mockData';
import { ArrowLeft, Calendar, MapPin, Users, Star } from 'lucide-react';

interface CategoryPageProps {
  category: EventCategory;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ category }) => {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  
  const handleLanguageChange = (lang: 'fr' | 'en') => {
    setLanguage(lang);
  };

  const categoryInfo: Record<EventCategory, {
    title: { fr: string; en: string };
    description: { fr: string; en: string };
    icon: string;
    color: string;
    bgImage: string;
  }> = {
    music: {
      title: { fr: 'Événements Musicaux', en: 'Music Events' },
      description: { 
        fr: 'Découvrez la richesse de la musique congolaise à travers concerts, festivals et performances live',
        en: 'Discover the richness of Congolese music through concerts, festivals and live performances'
      },
      icon: '🎵',
      color: 'from-purple-600 to-purple-800',
      bgImage: 'https://images.pexels.com/photos/3593865/pexels-photo-3593865.jpeg'
    },
    dance: {
      title: { fr: 'Événements de Danse', en: 'Dance Events' },
      description: { 
        fr: 'Explorez les traditions de danse congolaise et les créations contemporaines',
        en: 'Explore Congolese dance traditions and contemporary creations'
      },
      icon: '💃',
      color: 'from-pink-600 to-pink-800',
      bgImage: 'https://images.pexels.com/photos/1405816/pexels-photo-1405816.jpeg'
    },
    theater: {
      title: { fr: 'Théâtre et Arts de la Scène', en: 'Theater and Performing Arts' },
      description: { 
        fr: 'Plongez dans l\'univers du théâtre congolais et des arts de la scène',
        en: 'Dive into the world of Congolese theater and performing arts'
      },
      icon: '🎭',
      color: 'from-indigo-600 to-indigo-800',
      bgImage: 'https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg'
    },
    art: {
      title: { fr: 'Arts Visuels', en: 'Visual Arts' },
      description: { 
        fr: 'Admirez les œuvres d\'artistes congolais dans nos expositions et galeries',
        en: 'Admire the works of Congolese artists in our exhibitions and galleries'
      },
      icon: '🎨',
      color: 'from-orange-600 to-orange-800',
      bgImage: 'https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg'
    },
    festival: {
      title: { fr: 'Festivals Culturels', en: 'Cultural Festivals' },
      description: { 
        fr: 'Participez aux grands festivals qui célèbrent la culture congolaise',
        en: 'Participate in major festivals celebrating Congolese culture'
      },
      icon: '🎪',
      color: 'from-red-600 to-red-800',
      bgImage: 'https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg'
    },
    workshop: {
      title: { fr: 'Ateliers et Formations', en: 'Workshops and Training' },
      description: { 
        fr: 'Développez vos compétences artistiques avec nos ateliers spécialisés',
        en: 'Develop your artistic skills with our specialized workshops'
      },
      icon: '🛠️',
      color: 'from-blue-600 to-blue-800',
      bgImage: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg'
    },
    conference: {
      title: { fr: 'Conférences Culturelles', en: 'Cultural Conferences' },
      description: { 
        fr: 'Participez aux débats sur l\'avenir de la culture congolaise',
        en: 'Participate in debates about the future of Congolese culture'
      },
      icon: '🎤',
      color: 'from-green-600 to-green-800',
      bgImage: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg'
    },
    other: {
      title: { fr: 'Autres Événements', en: 'Other Events' },
      description: { 
        fr: 'Découvrez d\'autres événements culturels uniques et innovants',
        en: 'Discover other unique and innovative cultural events'
      },
      icon: '📅',
      color: 'from-gray-600 to-gray-800',
      bgImage: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg'
    }
  };

  useEffect(() => {
    const events = MOCK_EVENTS.filter(event => event.category === category);
    setFilteredEvents(events);
  }, [category]);

  const currentCategory = categoryInfo[category];
  const upcomingEvents = filteredEvents.filter(event => event.status === 'upcoming');
  const featuredEvents = filteredEvents.filter(event => event.isFeatured);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        currentLanguage={language}
        onLanguageChange={handleLanguageChange}
      />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className={`relative bg-gradient-to-br ${currentCategory.color} py-20`}>
          <div className="absolute inset-0">
            <img
              src={currentCategory.bgImage}
              alt={currentCategory.title[language]}
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white">
              <div className="text-6xl mb-4">{currentCategory.icon}</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {currentCategory.title[language]}
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
                {currentCategory.description[language]}
              </p>
              
              {/* Quick Stats */}
              <div className="flex justify-center gap-8 mt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold">{filteredEvents.length}</div>
                  <div className="text-sm text-white/80">
                    {language === 'fr' ? 'Événements' : 'Events'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{upcomingEvents.length}</div>
                  <div className="text-sm text-white/80">
                    {language === 'fr' ? 'À venir' : 'Upcoming'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{featuredEvents.length}</div>
                  <div className="text-sm text-white/80">
                    {language === 'fr' ? 'En vedette' : 'Featured'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                leftIcon={<ArrowLeft size={18} />}
                onClick={() => window.history.back()}
              >
                {language === 'fr' ? 'Retour aux événements' : 'Back to events'}
              </Button>
              
              <div className="flex items-center gap-4">
                <Badge variant="default" className="flex items-center gap-1">
                  <span>{currentCategory.icon}</span>
                  {currentCategory.title[language]}
                </Badge>
                {featuredEvents.length > 0 && (
                  <Badge variant="warning" className="flex items-center gap-1">
                    <Star size={14} />
                    {featuredEvents.length} {language === 'fr' ? 'en vedette' : 'featured'}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Events Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {filteredEvents.length > 0 ? (
            <>
              {/* Featured Events */}
              {featuredEvents.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Star size={24} className="text-yellow-500 mr-2" />
                    {language === 'fr' ? 'Événements en vedette' : 'Featured Events'}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredEvents.map((event) => (
                      <EventCard key={event.id} event={event} language={language} />
                    ))}
                  </div>
                </div>
              )}

              {/* Upcoming Events */}
              {upcomingEvents.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Calendar size={24} className="text-green-500 mr-2" />
                    {language === 'fr' ? 'Événements à venir' : 'Upcoming Events'}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {upcomingEvents.map((event) => (
                      <EventCard key={event.id} event={event} language={language} />
                    ))}
                  </div>
                </div>
              )}

              {/* All Events */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {language === 'fr' ? 'Tous les événements' : 'All Events'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredEvents.map((event) => (
                    <EventCard key={event.id} event={event} language={language} />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">{currentCategory.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                {language === 'fr' ? 'Aucun événement disponible' : 'No events available'}
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                {language === 'fr'
                  ? 'Il n\'y a actuellement aucun événement dans cette catégorie. Revenez bientôt pour découvrir de nouveaux événements.'
                  : 'There are currently no events in this category. Check back soon for new events.'}
              </p>
              <Button
                variant="outline"
                onClick={() => window.location.href = '/events'}
              >
                {language === 'fr' ? 'Explorer tous les événements' : 'Explore all events'}
              </Button>
            </div>
          )}
        </div>

        {/* Related Categories */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              {language === 'fr' ? 'Explorer d\'autres catégories' : 'Explore other categories'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {Object.entries(categoryInfo)
                .filter(([key]) => key !== category)
                .map(([key, info]) => (
                  <button
                    key={key}
                    onClick={() => window.location.href = `/events?category=${key}`}
                    className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 text-center group"
                  >
                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                      {info.icon}
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {info.title[language]}
                    </div>
                  </button>
                ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer currentLanguage={language} />
    </div>
  );
};