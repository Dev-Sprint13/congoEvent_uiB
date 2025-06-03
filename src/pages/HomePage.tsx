

import React, { useState } from 'react';
import { Navbar } from '../components/ui/Navbar';
import { Footer } from '../components/ui/Footer';
import { FeaturedEvent } from '../components/events/FeaturedEvent';
import { EventCard } from '../components/events/EventCard';
import { Button } from '../components/ui/Button';
import { Link } from '../components/navigation/Link';
import { MOCK_EVENTS } from '../constants/mockData';
import { Calendar, Users, Award, BarChart3 } from 'lucide-react';

export const HomePage: React.FC = () => {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  
  const handleLanguageChange = (lang: 'fr' | 'en') => {
    setLanguage(lang);
  };
  
  // Find featured events
  const featuredEvent = MOCK_EVENTS.find(event => event.isFeatured);
  
  // Get upcoming events
  const upcomingEvents = MOCK_EVENTS
    .filter(event => event.status === 'upcoming')
    .slice(0, 4);
  
  // Get various categories for the discovery section
  const eventsByCategory = {
    music: MOCK_EVENTS.filter(event => event.category === 'music')[0],
    art: MOCK_EVENTS.filter(event => event.category === 'art')[0],
    dance: MOCK_EVENTS.filter(event => event.category === 'dance')[0],
    workshop: MOCK_EVENTS.filter(event => event.category === 'workshop')[0],
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        currentLanguage={language}
        onLanguageChange={handleLanguageChange}
      />
      
      <main className="flex-grow">
        {/* Hero Section with Featured Event */}
        <section className="relative">
          {featuredEvent && (
            <FeaturedEvent event={featuredEvent} language={language} />
          )}
        </section>
        
        {/* Upcoming Events Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                {language === 'fr' ? 'Événements à venir' : 'Upcoming Events'}
              </h2>
              <Link to="/events" className="text-green-600 hover:text-green-700 font-medium flex items-center">
                {language === 'fr' ? 'Voir tous les événements' : 'View all events'}
                <svg className="ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} language={language} />
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <Link to="/events">
                <Button variant="outline" size="lg">
                  {language === 'fr' ? 'Explorer tous les événements' : 'Explore All Events'}
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Why Choose Us Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {language === 'fr' ? 'Pourquoi choisir CultureCongo ?' : 'Why Choose CultureCongo?'}
              </h2>
              <p className="max-w-3xl mx-auto text-gray-600">
                {language === 'fr'
                  ? 'Nous sommes dédiés à la promotion et à la préservation de la riche culture congolaise à travers des événements de haute qualité et accessibles à tous.'
                  : 'We are dedicated to promoting and preserving the rich Congolese culture through high-quality events accessible to everyone.'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 text-center transition-transform hover:transform hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full text-green-600 mb-4">
                  <Calendar size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {language === 'fr' ? 'Événements Divers' : 'Diverse Events'}
                </h3>
                <p className="text-gray-600">
                  {language === 'fr'
                    ? 'Des dizaines d\'événements culturels variés chaque mois.'
                    : 'Dozens of varied cultural events each month.'}
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 text-center transition-transform hover:transform hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full text-yellow-600 mb-4">
                  <Users size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {language === 'fr' ? 'Communauté Active' : 'Active Community'}
                </h3>
                <p className="text-gray-600">
                  {language === 'fr'
                    ? 'Rejoignez des milliers de participants passionnés par la culture.'
                    : 'Join thousands of participants passionate about culture.'}
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 text-center transition-transform hover:transform hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full text-red-600 mb-4">
                  <Award size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {language === 'fr' ? 'Qualité Supérieure' : 'Superior Quality'}
                </h3>
                <p className="text-gray-600">
                  {language === 'fr'
                    ? 'Des événements soigneusement sélectionnés et organisés.'
                    : 'Carefully selected and organized events.'}
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 text-center transition-transform hover:transform hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full text-green-600 mb-4">
                  <BarChart3 size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {language === 'fr' ? 'Impact Culturel' : 'Cultural Impact'}
                </h3>
                <p className="text-gray-600">
                  {language === 'fr'
                    ? 'Contribuer à la préservation et au rayonnement du patrimoine.'
                    : 'Contributing to heritage preservation and promotion.'}
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Discover By Category Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {language === 'fr' ? 'Découvrir par Catégorie' : 'Discover by Category'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(eventsByCategory).map(([category, event]) => (
                event && (
                  <Link to={`/events?category=${category}`} key={category} className="block group">
                    <div className="relative rounded-lg overflow-hidden h-60">
                      <img
                        src={event.image}
                        alt={category}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent flex items-end">
                        <div className="p-6 text-white">
                          <h3 className="text-xl font-bold mb-1">
                            {language === 'fr' ? {
                              music: 'Musique',
                              art: 'Art',
                              dance: 'Danse',
                              workshop: 'Ateliers',
                            }[category] : {
                              music: 'Music',
                              art: 'Art',
                              dance: 'Dance',
                              workshop: 'Workshops',
                            }[category]}
                          </h3>
                          <p className="text-gray-200">
                            {language === 'fr' ? 'Explorer les événements' : 'Explore events'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="bg-green-600 py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              {language === 'fr'
                ? 'Vous organisez un événement culturel ?'
                : 'Are you organizing a cultural event?'}
            </h2>
            <p className="text-lg text-green-100 mb-8 max-w-3xl mx-auto">
              {language === 'fr'
                ? 'Rejoignez notre plateforme pour promouvoir votre événement et atteindre un public plus large passionné par la culture congolaise.'
                : 'Join our platform to promote your event and reach a wider audience passionate about Congolese culture.'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="secondary"
                size="lg"
              >
                {language === 'fr' ? 'Devenir Organisateur' : 'Become an Organizer'}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-green-600"
              >
                {language === 'fr' ? 'En savoir plus' : 'Learn More'}
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer currentLanguage={language} />
    </div>
  );
};