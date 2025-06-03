import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/ui/Navbar';
import { Footer } from '../components/ui/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { MOCK_EVENTS } from '../constants/mockData';
import { Event } from '../types';
import { formatDateTime, formatCurrency } from '../utils/formatters';
import { Link } from '../components/navigation/Link';
import { Calendar, MapPin, Users, ChevronLeft, User, Mail, Phone, CreditCard, Check } from 'lucide-react';

export const RegistrationPage: React.FC = () => {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const [event, setEvent] = useState<Event | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    ticketType: 'standard',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleLanguageChange = (lang: 'fr' | 'en') => {
    setLanguage(lang);
  };
  
  // In a real app, we would get the event ID from the URL
  // For this demo, we'll just use the first event
  useEffect(() => {
    // Simulating loading the event by ID
    setEvent(MOCK_EVENTS[0]);
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleTicketTypeChange = (type: string) => {
    setFormData(prev => ({ ...prev, ticketType: type }));
  };
  
  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };
  
  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };
  
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
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        currentLanguage={language}
        onLanguageChange={handleLanguageChange}
      />
      
      <main className="flex-grow py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to={`/events/${event.id}`} className="inline-flex items-center text-green-600 mb-6 hover:text-green-700 transition-colors">
            <ChevronLeft size={20} className="mr-1" />
            {language === 'fr' ? 'Retour aux détails de l\'événement' : 'Back to event details'}
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {language === 'fr' ? 'Inscription à l\'événement' : 'Event Registration'}
          </h1>
          
          {isSuccess ? (
            <Card variant="elevated">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="rounded-full bg-green-100 p-3">
                    <Check size={32} className="text-green-600" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {language === 'fr' ? 'Inscription réussie !' : 'Registration Successful!'}
                </h2>
                <p className="text-gray-600 mb-6">
                  {language === 'fr'
                    ? 'Votre inscription a été confirmée. Vous recevrez un email avec les détails de votre inscription.'
                    : 'Your registration has been confirmed. You will receive an email with the details of your registration.'}
                </p>
                <div className="flex justify-center">
                  <Link to="/">
                    <Button variant="primary">
                      {language === 'fr' ? 'Retour à l\'accueil' : 'Back to home'}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="sticky top-6">
                  <Card variant="elevated" className="mb-6">
                    <CardContent className="p-4">
                      <h2 className="font-semibold text-lg mb-4">
                        {language === 'fr' ? 'Résumé de l\'événement' : 'Event Summary'}
                      </h2>
                      
                      <div className="aspect-video rounded-md overflow-hidden mb-4">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <h3 className="font-medium text-gray-900 mb-2">{event.title}</h3>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex items-start text-sm">
                          <Calendar size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-600">
                            {formatDateTime(event.startDate, language)}
                          </span>
                        </div>
                        <div className="flex items-start text-sm">
                          <MapPin size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-600">
                            {event.location}
                          </span>
                        </div>
                        <div className="flex items-start text-sm">
                          <Users size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-600">
                            {event.registeredCount}/{event.capacity} {language === 'fr' ? 'inscrits' : 'registered'}
                          </span>
                        </div>
                      </div>
                      
                      {event.ticketPrice !== undefined && (
                        <div className="border-t border-gray-100 pt-3 mt-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">
                              {language === 'fr' ? 'Prix du billet' : 'Ticket price'}:
                            </span>
                            <span className="font-medium">
                              {event.ticketPrice === 0
                                ? (language === 'fr' ? 'Gratuit' : 'Free')
                                : formatCurrency(event.ticketPrice, event.ticketCurrency, language)
                              }
                            </span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <div className="text-sm text-gray-500">
                    <p>
                      {language === 'fr'
                        ? 'Besoin d\'aide ? Contactez-nous au +242 06 123 4567 ou par email à contact@culturecongo.org'
                        : 'Need help? Contact us at +242 06 123 4567 or by email at contact@culturecongo.org'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="md:w-2/3">
                <Card variant="elevated">
                  <CardHeader className="px-6 py-4 border-b border-gray-100">
                    <CardTitle className="text-xl font-semibold">
                      {language === 'fr' ? 'Formulaire d\'inscription' : 'Registration Form'}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    {/* Step Indicator */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                            currentStep >= 1 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                          }`}>
                            1
                          </div>
                          <div className="ml-2">
                            <p className="text-sm font-medium">
                              {language === 'fr' ? 'Informations personnelles' : 'Personal Information'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex-grow mx-4 h-0.5 bg-gray-200">
                          <div className={`h-0.5 bg-green-500 transition-all ${
                            currentStep >= 2 ? 'w-full' : 'w-0'
                          }`}></div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                            currentStep >= 2 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                          }`}>
                            2
                          </div>
                          <div className="ml-2">
                            <p className="text-sm font-medium">
                              {language === 'fr' ? 'Sélection du billet' : 'Ticket Selection'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex-grow mx-4 h-0.5 bg-gray-200">
                          <div className={`h-0.5 bg-green-500 transition-all ${
                            currentStep >= 3 ? 'w-full' : 'w-0'
                          }`}></div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                            currentStep >= 3 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                          }`}>
                            3
                          </div>
                          <div className="ml-2">
                            <p className="text-sm font-medium">
                              {language === 'fr' ? 'Confirmation' : 'Confirmation'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <form onSubmit={handleSubmit}>
                      {/* Step 1: Personal Information */}
                      {currentStep === 1 && (
                        <div className="space-y-6">
                          <h3 className="text-lg font-medium text-gray-900">
                            {language === 'fr' ? 'Informations personnelles' : 'Personal Information'}
                          </h3>
                          
                          <div className="space-y-4">
                            <Input
                              id="name"
                              name="name"
                              label={language === 'fr' ? 'Nom complet' : 'Full name'}
                              type="text"
                              required
                              value={formData.name}
                              onChange={handleInputChange}
                              leftIcon={<User size={18} />}
                              fullWidth
                            />
                            
                            <Input
                              id="email"
                              name="email"
                              label={language === 'fr' ? 'Adresse e-mail' : 'Email address'}
                              type="email"
                              required
                              value={formData.email}
                              onChange={handleInputChange}
                              leftIcon={<Mail size={18} />}
                              fullWidth
                            />
                            
                            <Input
                              id="phone"
                              name="phone"
                              label={language === 'fr' ? 'Numéro de téléphone' : 'Phone number'}
                              type="tel"
                              required
                              value={formData.phone}
                              onChange={handleInputChange}
                              leftIcon={<Phone size={18} />}
                              helperText={language === 'fr' ? 'Ex: +242 06 123 4567' : 'Ex: +242 06 123 4567'}
                              fullWidth
                            />
                          </div>
                          
                          <div className="flex justify-end">
                            <Button
                              type="button"
                              onClick={nextStep}
                            >
                              {language === 'fr' ? 'Continuer' : 'Continue'}
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {/* Step 2: Ticket Selection */}
                      {currentStep === 2 && (
                        <div className="space-y-6">
                          <h3 className="text-lg font-medium text-gray-900">
                            {language === 'fr' ? 'Sélection du billet' : 'Ticket Selection'}
                          </h3>
                          
                          <div className="space-y-4">
                            <div className="grid gap-4">
                              <div
                                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                                  formData.ticketType === 'standard'
                                    ? 'border-green-500 bg-green-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                                onClick={() => handleTicketTypeChange('standard')}
                              >
                                <div className="flex items-start">
                                  <input
                                    type="radio"
                                    name="ticketType"
                                    id="standard"
                                    checked={formData.ticketType === 'standard'}
                                    onChange={() => handleTicketTypeChange('standard')}
                                    className="mt-1 mr-3"
                                  />
                                  <div className="flex-grow">
                                    <label htmlFor="standard" className="block font-medium text-gray-900">
                                      {language === 'fr' ? 'Billet Standard' : 'Standard Ticket'}
                                    </label>
                                    <p className="text-gray-500 text-sm mt-1">
                                      {language === 'fr'
                                        ? 'Accès à tous les événements principaux'
                                        : 'Access to all main events'}
                                    </p>
                                    <div className="mt-2 flex justify-between items-center">
                                      <Badge variant="default">
                                        {language === 'fr' ? 'Populaire' : 'Popular'}
                                      </Badge>
                                      <span className="font-semibold">
                                        {event.ticketPrice ? formatCurrency(event.ticketPrice, event.ticketCurrency, language) : (language === 'fr' ? 'Gratuit' : 'Free')}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div
                                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                                  formData.ticketType === 'vip'
                                    ? 'border-green-500 bg-green-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                                onClick={() => handleTicketTypeChange('vip')}
                              >
                                <div className="flex items-start">
                                  <input
                                    type="radio"
                                    name="ticketType"
                                    id="vip"
                                    checked={formData.ticketType === 'vip'}
                                    onChange={() => handleTicketTypeChange('vip')}
                                    className="mt-1 mr-3"
                                  />
                                  <div className="flex-grow">
                                    <label htmlFor="vip" className="block font-medium text-gray-900">
                                      {language === 'fr' ? 'Billet VIP' : 'VIP Ticket'}
                                    </label>
                                    <p className="text-gray-500 text-sm mt-1">
                                      {language === 'fr'
                                        ? 'Accès prioritaire et espace réservé'
                                        : 'Priority access and reserved seating'}
                                    </p>
                                    <div className="mt-2 flex justify-between items-center">
                                      <Badge variant="warning">
                                        {language === 'fr' ? 'Premium' : 'Premium'}
                                      </Badge>
                                      <span className="font-semibold">
                                        {event.ticketPrice ? formatCurrency(event.ticketPrice * 2, event.ticketCurrency, language) : (language === 'fr' ? 'Gratuit' : 'Free')}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex justify-between">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={prevStep}
                            >
                              {language === 'fr' ? 'Retour' : 'Back'}
                            </Button>
                            <Button
                              type="button"
                              onClick={nextStep}
                            >
                              {language === 'fr' ? 'Continuer' : 'Continue'}
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {/* Step 3: Confirmation */}
                      {currentStep === 3 && (
                        <div className="space-y-6">
                          <h3 className="text-lg font-medium text-gray-900">
                            {language === 'fr' ? 'Confirmation' : 'Confirmation'}
                          </h3>
                          
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium mb-4">
                              {language === 'fr' ? 'Résumé de votre inscription' : 'Registration Summary'}
                            </h4>
                            
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-gray-600">
                                  {language === 'fr' ? 'Événement' : 'Event'}:
                                </span>
                                <span className="font-medium">{event.title}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">
                                  {language === 'fr' ? 'Date' : 'Date'}:
                                </span>
                                <span>{formatDateTime(event.startDate, language)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">
                                  {language === 'fr' ? 'Nom' : 'Name'}:
                                </span>
                                <span>{formData.name}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">
                                  {language === 'fr' ? 'Email' : 'Email'}:
                                </span>
                                <span>{formData.email}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">
                                  {language === 'fr' ? 'Téléphone' : 'Phone'}:
                                </span>
                                <span>{formData.phone}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">
                                  {language === 'fr' ? 'Type de billet' : 'Ticket Type'}:
                                </span>
                                <span>
                                  {formData.ticketType === 'standard'
                                    ? (language === 'fr' ? 'Standard' : 'Standard')
                                    : (language === 'fr' ? 'VIP' : 'VIP')
                                  }
                                </span>
                              </div>
                              <div className="flex justify-between pt-2 border-t border-gray-200">
                                <span className="font-medium">
                                  {language === 'fr' ? 'Prix total' : 'Total Price'}:
                                </span>
                                <span className="font-bold">
                                  {event.ticketPrice
                                    ? formData.ticketType === 'standard'
                                      ? formatCurrency(event.ticketPrice, event.ticketCurrency, language)
                                      : formatCurrency(event.ticketPrice * 2, event.ticketCurrency, language)
                                    : (language === 'fr' ? 'Gratuit' : 'Free')
                                  }
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {event.ticketPrice > 0 && (
                            <div className="space-y-4">
                              <h4 className="font-medium">
                                {language === 'fr' ? 'Informations de paiement' : 'Payment Information'}
                              </h4>
                              
                              <Input
                                id="card-number"
                                name="cardNumber"
                                label={language === 'fr' ? 'Numéro de carte' : 'Card Number'}
                                type="text"
                                required
                                placeholder="1234 5678 9012 3456"
                                leftIcon={<CreditCard size={18} />}
                                fullWidth
                              />
                              
                              <div className="grid grid-cols-2 gap-4">
                                <Input
                                  id="expiry-date"
                                  name="expiryDate"
                                  label={language === 'fr' ? 'Date d\'expiration' : 'Expiry Date'}
                                  type="text"
                                  required
                                  placeholder="MM/YY"
                                  fullWidth
                                />
                                <Input
                                  id="cvv"
                                  name="cvv"
                                  label={language === 'fr' ? 'Code de sécurité' : 'Security Code'}
                                  type="text"
                                  required
                                  placeholder="123"
                                  fullWidth
                                />
                              </div>
                            </div>
                          )}
                          
                          <div className="flex items-center">
                            <input
                              id="terms"
                              name="terms"
                              type="checkbox"
                              required
                              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                              {language === 'fr'
                                ? 'J\'accepte les conditions générales et la politique de confidentialité'
                                : 'I agree to the terms and conditions and privacy policy'}
                            </label>
                          </div>
                          
                          <div className="flex justify-between">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={prevStep}
                            >
                              {language === 'fr' ? 'Retour' : 'Back'}
                            </Button>
                            <Button
                              type="submit"
                              isLoading={isSubmitting}
                            >
                              {language === 'fr' ? 'Confirmer l\'inscription' : 'Confirm Registration'}
                            </Button>
                          </div>
                        </div>
                      )}
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer currentLanguage={language} />
    </div>
  );
};