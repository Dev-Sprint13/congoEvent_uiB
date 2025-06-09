import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/ui/Navbar';
import { Footer } from '../components/ui/Footer';
import { EventCard } from '../components/events/EventCard';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card, CardContent } from '../components/ui/Card';
import { Event, EventCategory, EventStatus } from '../types';
import { MOCK_EVENTS } from '../constants/mockData';
import { Search, CalendarIcon, Filter, X, MapPin, Clock, Users, Star } from 'lucide-react';

export const EventsPage: React.FC = () => {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<EventCategory[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<EventStatus[]>([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'popularity' | 'price'>('date');
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(MOCK_EVENTS);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Get URL parameters for category filtering
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam && categoryParam !== 'all') {
      setSelectedCategories([categoryParam as EventCategory]);
    }
  }, []);
  
  const handleLanguageChange = (lang: 'fr' | 'en') => {
    setLanguage(lang);
  };
  
  const categoryOptions: { value: EventCategory; label: { fr: string; en: string }; icon: string; color: string }[] = [
    { value: 'music', label: { fr: 'Musique', en: 'Music' }, icon: '🎵', color: 'bg-purple-100 text-purple-800' },
    { value: 'dance', label: { fr: 'Danse', en: 'Dance' }, icon: '💃', color: 'bg-pink-100 text-pink-800' },
    { value: 'theater', label: { fr: 'Théâtre', en: 'Theater' }, icon: '🎭', color: 'bg-indigo-100 text-indigo-800' },
    { value: 'art', label: { fr: 'Art', en: 'Art' }, icon: '🎨', color: 'bg-orange-100 text-orange-800' },
    { value: 'festival', label: { fr: 'Festival', en: 'Festival' }, icon: '🎪', color: 'bg-red-100 text-red-800' },
    { value: 'workshop', label: { fr: 'Atelier', en: 'Workshop' }, icon: '🛠️', color: 'bg-blue-100 text-blue-800' },
    { value: 'conference', label: { fr: 'Conférence', en: 'Conference' }, icon: '🎤', color: 'bg-green-100 text-green-800' },
    { value: 'other', label: { fr: 'Autre', en: 'Other' }, icon: '📅', color: 'bg-gray-100 text-gray-800' },
  ];
  
  const statusOptions: { value: EventStatus; label: { fr: string; en: string }; color: string }[] = [
    { value: 'upcoming', label: { fr: 'À venir', en: 'Upcoming' }, color: 'bg-green-100 text-green-800' },
    { value: 'ongoing', label: { fr: 'En cours', en: 'Ongoing' }, color: 'bg-yellow-100 text-yellow-800' },
    { value: 'completed', label: { fr: 'Terminé', en: 'Completed' }, color: 'bg-gray-100 text-gray-800' },
    { value: 'cancelled', label: { fr: 'Annulé', en: 'Cancelled' }, color: 'bg-red-100 text-red-800' },
  ];

  const locations = [...new Set(MOCK_EVENTS.map(event => event.location))];
  
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
    setSelectedLocation('');
    setPriceFilter('all');
    setSortBy('date');
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchTerm) count++;
    if (selectedCategories.length > 0) count++;
    if (selectedStatuses.length > 0) count++;
    if (selectedLocation) count++;
    if (priceFilter !== 'all') count++;
    return count;
  };
  
  useEffect(() => {
    // Filter events based on search term, categories, statuses, location, and price
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

    if (selectedLocation) {
      filtered = filtered.filter(event => event.location === selectedLocation);
    }

    if (priceFilter === 'free') {
      filtered = filtered.filter(event => event.ticketPrice === 0 || event.ticketPrice === undefined);
    } else if (priceFilter === 'paid') {
      filtered = filtered.filter(event => event.ticketPrice && event.ticketPrice > 0);
    }

    // Sort events
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        case 'popularity':
          return b.registeredCount - a.registeredCount;
        case 'price':
          const priceA = a.ticketPrice || 0;
          const priceB = b.ticketPrice || 0;
          return priceA - priceB;
        default:
          return 0;
      }
    });
    
    setFilteredEvents(filtered);
  }, [searchTerm, selectedCategories, selectedStatuses, selectedLocation, priceFilter, sortBy]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        currentLanguage={language}
        onLanguageChange={handleLanguageChange}
      />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-800 py-16">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {language === 'fr' ? 'Événements Culturels' : 'Cultural Events'}
              </h1>
              <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
                {language === 'fr'
                  ? 'Découvrez la richesse culturelle du Congo à travers nos événements exceptionnels'
                  : 'Discover the cultural richness of Congo through our exceptional events'}
              </p>
              
              {/* Quick Category Filters */}
              <div className="flex flex-wrap justify-center gap-3 mt-8">
                {categoryOptions.slice(0, 6).map((category) => (
                  <button
                    key={category.value}
                    onClick={() => toggleCategory(category.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategories.includes(category.value)
                        ? 'bg-white text-green-600 shadow-lg transform scale-105'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.label[language]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* Search Bar */}
              <div className="flex-grow">
                <Input
                  type="text"
                  placeholder={language === 'fr' ? 'Rechercher des événements...' : 'Search events...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  leftIcon={<Search size={18} />}
                  fullWidth
                  className="h-12"
                />
              </div>
              
              {/* Filter Controls */}
              <div className="flex items-center gap-3">
                <Button
                  variant={showFilters ? 'primary' : 'outline'}
                  onClick={() => setShowFilters(!showFilters)}
                  leftIcon={<Filter size={18} />}
                  className="relative"
                >
                  {language === 'fr' ? 'Filtres' : 'Filters'}
                  {getActiveFiltersCount() > 0 && (
                    <Badge 
                      variant="error" 
                      className="absolute -top-2 -right-2 min-w-[20px] h-5 flex items-center justify-center text-xs"
                    >
                      {getActiveFiltersCount()}
                    </Badge>
                  )}
                </Button>
                
                {/* View Mode Toggle */}
                <div className="flex border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-2 text-sm ${
                      viewMode === 'grid' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className="grid grid-cols-2 gap-1 w-4 h-4">
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                    </div>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-2 text-sm ${
                      viewMode === 'list' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className="space-y-1 w-4 h-4">
                      <div className="bg-current h-1 rounded"></div>
                      <div className="bg-current h-1 rounded"></div>
                      <div className="bg-current h-1 rounded"></div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Advanced Filters Panel */}
            {showFilters && (
              <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Categories */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      {language === 'fr' ? 'Catégories' : 'Categories'}
                    </h3>
                    <div className="space-y-2">
                      {categoryOptions.map((option) => (
                        <label key={option.value} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(option.value)}
                            onChange={() => toggleCategory(option.value)}
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            {option.icon} {option.label[language]}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* Status */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      {language === 'fr' ? 'Statut' : 'Status'}
                    </h3>
                    <div className="space-y-2">
                      {statusOptions.map((option) => (
                        <label key={option.value} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedStatuses.includes(option.value)}
                            onChange={() => toggleStatus(option.value)}
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            {option.label[language]}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* Location */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      {language === 'fr' ? 'Lieu' : 'Location'}
                    </h3>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full rounded-md border-gray-300 text-sm focus:border-green-500 focus:ring-green-500"
                    >
                      <option value="">
                        {language === 'fr' ? 'Tous les lieux' : 'All locations'}
                      </option>
                      {locations.map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Price & Sort */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      {language === 'fr' ? 'Prix et Tri' : 'Price & Sort'}
                    </h3>
                    <div className="space-y-3">
                      <select
                        value={priceFilter}
                        onChange={(e) => setPriceFilter(e.target.value as 'all' | 'free' | 'paid')}
                        className="w-full rounded-md border-gray-300 text-sm focus:border-green-500 focus:ring-green-500"
                      >
                        <option value="all">
                          {language === 'fr' ? 'Tous les prix' : 'All prices'}
                        </option>
                        <option value="free">
                          {language === 'fr' ? 'Gratuit' : 'Free'}
                        </option>
                        <option value="paid">
                          {language === 'fr' ? 'Payant' : 'Paid'}
                        </option>
                      </select>
                      
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'date' | 'popularity' | 'price')}
                        className="w-full rounded-md border-gray-300 text-sm focus:border-green-500 focus:ring-green-500"
                      >
                        <option value="date">
                          {language === 'fr' ? 'Trier par date' : 'Sort by date'}
                        </option>
                        <option value="popularity">
                          {language === 'fr' ? 'Trier par popularité' : 'Sort by popularity'}
                        </option>
                        <option value="price">
                          {language === 'fr' ? 'Trier par prix' : 'Sort by price'}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Filter Actions */}
                <div className="mt-6 flex justify-between items-center">
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map((category) => {
                      const categoryOption = categoryOptions.find(opt => opt.value === category);
                      return (
                        <Badge
                          key={category}
                          variant="default"
                          className="flex items-center gap-1"
                        >
                          {categoryOption?.icon} {categoryOption?.label[language]}
                          <button
                            onClick={() => toggleCategory(category)}
                            className="ml-1 hover:bg-green-600 rounded-full p-0.5"
                          >
                            <X size={12} />
                          </button>
                        </Badge>
                      );
                    })}
                    {selectedStatuses.map((status) => {
                      const statusOption = statusOptions.find(opt => opt.value === status);
                      return (
                        <Badge
                          key={status}
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          {statusOption?.label[language]}
                          <button
                            onClick={() => toggleStatus(status)}
                            className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                          >
                            <X size={12} />
                          </button>
                        </Badge>
                      );
                    })}
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                  >
                    {language === 'fr' ? 'Réinitialiser' : 'Reset all'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Results Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {filteredEvents.length > 0 ? (
            <>
              {/* Results Header */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">
                  {language === 'fr'
                    ? `${filteredEvents.length} événement${filteredEvents.length > 1 ? 's' : ''} trouvé${filteredEvents.length > 1 ? 's' : ''}`
                    : `${filteredEvents.length} event${filteredEvents.length > 1 ? 's' : ''} found`}
                </p>
                
                {/* Featured Events Toggle */}
                <div className="flex items-center gap-2">
                  <Star size={16} className="text-yellow-500" />
                  <span className="text-sm text-gray-600">
                    {filteredEvents.filter(e => e.isFeatured).length} {language === 'fr' ? 'en vedette' : 'featured'}
                  </span>
                </div>
              </div>
              
              {/* Events Grid/List */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredEvents.map((event) => (
                    <EventCard key={event.id} event={event} language={language} />
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredEvents.map((event) => (
                    <Card key={event.id} variant="elevated" className="overflow-hidden">
                      <div className="flex">
                        <div className="w-48 h-32 flex-shrink-0">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="flex-grow p-6">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 hover:text-green-600 transition-colors">
                              {event.title}
                            </h3>
                            <div className="flex gap-2">
                              {event.isFeatured && (
                                <Badge variant="warning">
                                  {language === 'fr' ? 'En vedette' : 'Featured'}
                                </Badge>
                              )}
                              <Badge variant="default">
                                {categoryOptions.find(c => c.value === event.category)?.label[language]}
                              </Badge>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {event.shortDescription}
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Clock size={16} className="mr-2 text-green-500" />
                              <span>{new Date(event.startDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin size={16} className="mr-2 text-green-500" />
                              <span className="truncate">{event.location}</span>
                            </div>
                            <div className="flex items-center">
                              <Users size={16} className="mr-2 text-green-500" />
                              <span>
                                {event.registeredCount}/{event.capacity} {language === 'fr' ? 'inscrits' : 'registered'}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <CalendarIcon size={64} className="mx-auto text-gray-300 mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                {language === 'fr' ? 'Aucun événement trouvé' : 'No events found'}
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                {language === 'fr'
                  ? 'Aucun événement ne correspond à vos critères de recherche. Essayez de modifier vos filtres.'
                  : 'No events match your search criteria. Try adjusting your filters.'}
              </p>
              <Button
                variant="outline"
                onClick={resetFilters}
                leftIcon={<X size={18} />}
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