import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { MOCK_EVENTS } from '../../constants/mockData';
import { 
  Share2, 
  Copy, 
  Download, 
  Eye,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  MessageCircle,
  QrCode,
  Megaphone,
  TrendingUp,
  Users,
  ExternalLink,
  Palette,
  Image as ImageIcon
} from 'lucide-react';

export const Promotion: React.FC = () => {
  const [language] = useState<'fr' | 'en'>('fr');
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  
  // Filter events for this organizer
  const organizerEvents = MOCK_EVENTS.filter(event => event.organizers.includes('2'));
  const selectedEventData = organizerEvents.find(event => event.id === selectedEvent);

  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600',
      description: { fr: 'Partagez sur Facebook', en: 'Share on Facebook' }
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-sky-500',
      description: { fr: 'Partagez sur Twitter', en: 'Share on Twitter' }
    },
    {
      name: 'Instagram',
      icon: Instagram,
      color: 'bg-pink-600',
      description: { fr: 'Partagez sur Instagram', en: 'Share on Instagram' }
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-600',
      description: { fr: 'Partagez sur WhatsApp', en: 'Share on WhatsApp' }
    }
  ];

  const promotionTools = [
    {
      title: { fr: 'Affiches personnalisées', en: 'Custom Posters' },
      description: { fr: 'Créez des affiches professionnelles', en: 'Create professional posters' },
      icon: Palette,
      action: { fr: 'Créer une affiche', en: 'Create Poster' }
    },
    {
      title: { fr: 'Code QR', en: 'QR Code' },
      description: { fr: 'Générez un code QR pour l\'inscription', en: 'Generate QR code for registration' },
      icon: QrCode,
      action: { fr: 'Générer QR', en: 'Generate QR' }
    },
    {
      title: { fr: 'Kit média', en: 'Media Kit' },
      description: { fr: 'Téléchargez les ressources promotionnelles', en: 'Download promotional resources' },
      icon: Download,
      action: { fr: 'Télécharger', en: 'Download' }
    },
    {
      title: { fr: 'Email marketing', en: 'Email Marketing' },
      description: { fr: 'Envoyez des invitations par email', en: 'Send email invitations' },
      icon: Mail,
      action: { fr: 'Créer campagne', en: 'Create Campaign' }
    }
  ];

  const copyEventLink = () => {
    if (selectedEventData) {
      const link = `${window.location.origin}/events/${selectedEventData.id}`;
      navigator.clipboard.writeText(link);
      alert(language === 'fr' ? 'Lien copié !' : 'Link copied!');
    }
  };

  const shareOnSocial = (platform: string) => {
    if (!selectedEventData) return;
    
    const eventUrl = `${window.location.origin}/events/${selectedEventData.id}`;
    const text = `${selectedEventData.title} - ${selectedEventData.shortDescription}`;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'Facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}`;
        break;
      case 'Twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(eventUrl)}`;
        break;
      case 'WhatsApp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + eventUrl)}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="pb-5 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">
          {language === 'fr' ? 'Promotion et marketing' : 'Promotion and Marketing'}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {language === 'fr' 
            ? 'Outils pour promouvoir vos événements et augmenter la participation'
            : 'Tools to promote your events and increase participation'
          }
        </p>
      </div>

      {/* Event Selection */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {language === 'fr' ? 'Sélectionnez un événement à promouvoir' : 'Select an event to promote'}
        </label>
        <select
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
          className="w-full max-w-md rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        >
          <option value="">
            {language === 'fr' ? 'Choisir un événement...' : 'Choose an event...'}
          </option>
          {organizerEvents.map((event) => (
            <option key={event.id} value={event.id}>
              {event.title}
            </option>
          ))}
        </select>
      </div>

      {selectedEventData && (
        <>
          {/* Event Preview */}
          <Card variant="elevated" className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="mr-2" size={20} />
                {language === 'fr' ? 'Aperçu de l\'événement' : 'Event Preview'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <img
                    src={selectedEventData.image}
                    alt={selectedEventData.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <div className="md:w-2/3">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {selectedEventData.title}
                    </h3>
                    {selectedEventData.isFeatured && (
                      <Badge variant="warning">
                        {language === 'fr' ? 'En vedette' : 'Featured'}
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">
                    {selectedEventData.shortDescription}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-900">
                        {language === 'fr' ? 'Date:' : 'Date:'}
                      </span>
                      <div className="text-gray-600">
                        {new Date(selectedEventData.startDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">
                        {language === 'fr' ? 'Lieu:' : 'Location:'}
                      </span>
                      <div className="text-gray-600">
                        {selectedEventData.location}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">
                        {language === 'fr' ? 'Participants:' : 'Participants:'}
                      </span>
                      <div className="text-gray-600">
                        {selectedEventData.registeredCount}/{selectedEventData.capacity}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Share */}
          <Card variant="elevated" className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Share2 className="mr-2" size={20} />
                {language === 'fr' ? 'Partage rapide' : 'Quick Share'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Event Link */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'fr' ? 'Lien de l\'événement' : 'Event Link'}
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      value={`${window.location.origin}/events/${selectedEventData.id}`}
                      readOnly
                      className="flex-1 rounded-l-md border-gray-300 bg-gray-50"
                    />
                    <Button
                      variant="outline"
                      onClick={copyEventLink}
                      leftIcon={<Copy size={16} />}
                      className="rounded-l-none border-l-0"
                    >
                      {language === 'fr' ? 'Copier' : 'Copy'}
                    </Button>
                  </div>
                </div>

                {/* Social Media Buttons */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'fr' ? 'Partager sur les réseaux sociaux' : 'Share on Social Media'}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {socialPlatforms.map((platform) => (
                      <Button
                        key={platform.name}
                        variant="outline"
                        onClick={() => shareOnSocial(platform.name)}
                        className="flex items-center justify-center p-3 h-auto"
                      >
                        <div className={`p-2 rounded-full ${platform.color} text-white mr-2`}>
                          <platform.icon size={16} />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">{platform.name}</div>
                          <div className="text-xs text-gray-500">
                            {platform.description[language]}
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Promotion Tools */}
          <Card variant="elevated" className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Megaphone className="mr-2" size={20} />
                {language === 'fr' ? 'Outils de promotion' : 'Promotion Tools'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {promotionTools.map((tool, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-6 hover:border-green-300 transition-colors"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 p-3 bg-green-100 rounded-lg text-green-600">
                        <tool.icon size={24} />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-lg font-medium text-gray-900 mb-1">
                          {tool.title[language]}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {tool.description[language]}
                        </p>
                        <Button variant="outline" size="sm">
                          {tool.action[language]}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Analytics Preview */}
          <Card variant="elevated" className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2" size={20} />
                {language === 'fr' ? 'Aperçu des performances' : 'Performance Overview'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {Math.round((selectedEventData.registeredCount / selectedEventData.capacity) * 100)}%
                  </div>
                  <div className="text-sm text-blue-800">
                    {language === 'fr' ? 'Taux de remplissage' : 'Fill Rate'}
                  </div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {selectedEventData.registeredCount}
                  </div>
                  <div className="text-sm text-green-800">
                    {language === 'fr' ? 'Participants inscrits' : 'Registered Participants'}
                  </div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {selectedEventData.capacity - selectedEventData.registeredCount}
                  </div>
                  <div className="text-sm text-purple-800">
                    {language === 'fr' ? 'Places restantes' : 'Remaining Spots'}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Button
                  variant="outline"
                  leftIcon={<TrendingUp size={18} />}
                  onClick={() => window.location.href = '/organizer/analytics'}
                >
                  {language === 'fr' ? 'Voir les statistiques complètes' : 'View Full Analytics'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {!selectedEvent && (
        <div className="text-center py-16">
          <Megaphone size={64} className="mx-auto text-gray-300 mb-6" />
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            {language === 'fr' ? 'Sélectionnez un événement' : 'Select an Event'}
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            {language === 'fr'
              ? 'Choisissez un événement dans la liste ci-dessus pour accéder aux outils de promotion.'
              : 'Choose an event from the list above to access promotion tools.'}
          </p>
        </div>
      )}
    </div>
  );
};