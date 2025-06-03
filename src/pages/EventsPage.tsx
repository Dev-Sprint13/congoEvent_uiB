import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/ui/Navbar';
import { Footer } from '../components/ui/Footer';
import { EventCard } from '../components/events/EventCard';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Event, EventCategory, EventStatus } from '../types';
import { MOCK_EVENTS } from '../constants/mockData';
import { Search, CalendarIcon, Filter } from 'lucide-react';

export const EventsPage: React.FC = () => {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<EventCategory[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<EventStatus[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(MOCK_EVENTS);
  const [showFilters, setShowFilters] = useState(false);
  
  const handleLanguageChange = (lang: 'fr' | 'en') => {
    setLanguage(lang);
  };
  
  const categoryOptions: { value: EventCategory; label: { fr: string; en: string } }[] = [
    { value: 'music', label: { fr: 'Musique', en: 'Music' } },
    { value: 'dance', label: { fr: 'Danse', en: 'Dance' } },
    { value: 'theater', label: { fr: 'Théâtre', en: 'Theater' } },
    { value: 'art', label: { fr: 'Art', en: 'Art' } },
    { value: 'festival', label: { fr: 'Festival', en: 'Festival' } },
    { value: 'workshop', label: { fr: 'Atelier', en: 'Workshop' } },
    { value: 'conference', label: { fr: 'Conférence', en: 'Conference' } },
    { value: 'other', label: { fr: 'Autre', en: 'Other' } },
  ];
  
  const statusOptions: { value: EventStatus; label: { fr: string; en: string } }[] = [
    { value: 'upcoming', label: { fr: 'À venir', en: 'Upcoming' } },
    { value: 'ongoing', label: { fr: 'En cours', en: 'Ongoing' } },
    { value: 'completed', label: { fr: 'Terminé', en: 'Completed' } },
    { value: 'cancelled', label: { fr: 'Annulé', en: 'Cancelled' } },
  ];
  
  const toggleCategory = (category: EventCategory) => {
    setSelectedCategories(prevCategories => 
      prevCategories.includes(category)
        ? prevCategories.filter(c => c !== category)
        : [...prevCategories, category]
    );
  };
  
  const toggleStatus = (status: EventStatus) => {
    setSelectedStatuses(prevStatuses => 
      prevStatuses.includes(status)
        ? prevStatuses.filter(s => s !== status)
        : [...prevStatuses, status]
    );
  };
  
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setSelectedStatuses([]);
  };
  
  useEffect(() => {
    // Filter events based on search term, categories, and statuses
    let filtered = [...MOCK_EVENTS];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(term) ||
        event.description.toLowerCase().includes(term) ||
        event.location.toLowerCase().includes(term)
      );
    }
    
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(event => selectedCategories.includes(event.category));
    }
    
    if (selectedStatuses.length > 0) {
      filtered = filtered.filter(event => selectedStatuses.includes(event.status));
    }
    
    setFilteredEvents(filtered);
  }, [searchTerm, selectedCategories, selectedStatuses]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        currentLanguage={language}
        onLanguageChange={handleLanguageChange}
      />
      
      <main className="flex-grow">
        {/* Page Header */}
        <div className="bg-gray-800 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white">
              {language === 'fr' ? 'Événements Culturels' : 'Cultural Events'}
            </h1>
            <p className="mt-2 text-gray-300">
              {language === 'fr'
                ? 'Découvrez tous les événements culturels au Congo'
                : 'Discover all cultural events in Congo'}
            </p>
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="relative flex-grow">
                <Input
                  type="text"
                  placeholder={language === 'fr' ? 'Rechercher des événements...' : 'Search events...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  leftIcon={<Search size={18} />}
                  fullWidth
                />
              </div>
              
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                leftIcon={<Filter size={18} />}
              >
                {language === 'fr' ? 'Filtres' : 'Filters'}
              </Button>
            </div>
            
            {showFilters && (
              <div className="mt-4 pt-4 border-t">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      {language === 'fr' ? 'Catégories' : 'Categories'}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {categoryOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => toggleCategory(option.value)}
                          className={`px-3 py-1 rounded-full text-sm ${
                            selectedCategories.includes(option.value)
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {option.label[language]}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      {language === 'fr' ? 'Statut' : 'Status'}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {statusOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => toggleStatus(option.value)}
                          className={`px-3 py-1 rounded-full text-sm ${
                            selectedStatuses.includes(option.value)
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {option.label[language]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                  >
                    {language === 'fr' ? 'Réinitialiser les filtres' : 'Reset filters'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Events Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {filteredEvents.length > 0 ? (
            <>
              <p className="text-gray-500 mb-6">
                {language === 'fr'
                  ? `${filteredEvents.length} événement${filteredEvents.length > 1 ? 's' : ''} trouvé${filteredEvents.length > 1 ? 's' : ''}`
                  : `${filteredEvents.length} event${filteredEvents.length > 1 ? 's' : ''} found`}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} language={language} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <CalendarIcon size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                {language === 'fr' ? 'Aucun événement trouvé' : 'No events found'}
              </h3>
              <p className="text-gray-500">
                {language === 'fr'
                  ? 'Essayez de modifier vos filtres ou votre recherche'
                  : 'Try changing your filters or search terms'}
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={resetFilters}
              >
                {language === 'fr' ? 'Réinitialiser les filtres' : 'Reset filters'}
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer currentLanguage={language} />
    </div>
  );
};