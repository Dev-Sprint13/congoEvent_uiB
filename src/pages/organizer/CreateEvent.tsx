import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { 
  Save, 
  Eye, 
  Upload, 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign,
  Tag,
  FileText,
  Image as ImageIcon,
  Clock,
  Globe,
  Star,
  AlertCircle
} from 'lucide-react';

export const CreateEvent: React.FC = () => {
  const [language] = useState<'fr' | 'en'>('fr');
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    description: '',
    category: 'music',
    startDate: '',
    endDate: '',
    location: '',
    capacity: '',
    ticketPrice: '',
    ticketCurrency: 'XAF',
    image: '',
    isFeatured: false,
    isPublished: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    { value: 'music', label: { fr: 'Musique', en: 'Music' }, icon: '🎵' },
    { value: 'dance', label: { fr: 'Danse', en: 'Dance' }, icon: '💃' },
    { value: 'theater', label: { fr: 'Théâtre', en: 'Theater' }, icon: '🎭' },
    { value: 'art', label: { fr: 'Art', en: 'Art' }, icon: '🎨' },
    { value: 'festival', label: { fr: 'Festival', en: 'Festival' }, icon: '🎪' },
    { value: 'workshop', label: { fr: 'Atelier', en: 'Workshop' }, icon: '🛠️' },
    { value: 'conference', label: { fr: 'Conférence', en: 'Conference' }, icon: '🎤' },
    { value: 'other', label: { fr: 'Autre', en: 'Other' }, icon: '📅' }
  ];

  const steps = [
    {
      number: 1,
      title: { fr: 'Informations de base', en: 'Basic Information' },
      description: { fr: 'Titre, description et catégorie', en: 'Title, description and category' }
    },
    {
      number: 2,
      title: { fr: 'Date et lieu', en: 'Date and Location' },
      description: { fr: 'Quand et où aura lieu l\'événement', en: 'When and where the event will take place' }
    },
    {
      number: 3,
      title: { fr: 'Billetterie', en: 'Ticketing' },
      description: { fr: 'Capacité et prix des billets', en: 'Capacity and ticket pricing' }
    },
    {
      number: 4,
      title: { fr: 'Médias et publication', en: 'Media and Publishing' },
      description: { fr: 'Images et options de publication', en: 'Images and publishing options' }
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.title.trim()) {
          newErrors.title = language === 'fr' ? 'Le titre est requis' : 'Title is required';
        }
        if (!formData.shortDescription.trim()) {
          newErrors.shortDescription = language === 'fr' ? 'La description courte est requise' : 'Short description is required';
        }
        if (!formData.description.trim()) {
          newErrors.description = language === 'fr' ? 'La description est requise' : 'Description is required';
        }
        break;
      case 2:
        if (!formData.startDate) {
          newErrors.startDate = language === 'fr' ? 'La date de début est requise' : 'Start date is required';
        }
        if (!formData.endDate) {
          newErrors.endDate = language === 'fr' ? 'La date de fin est requise' : 'End date is required';
        }
        if (!formData.location.trim()) {
          newErrors.location = language === 'fr' ? 'Le lieu est requis' : 'Location is required';
        }
        if (formData.startDate && formData.endDate && new Date(formData.startDate) >= new Date(formData.endDate)) {
          newErrors.endDate = language === 'fr' ? 'La date de fin doit être après la date de début' : 'End date must be after start date';
        }
        break;
      case 3:
        if (!formData.capacity || parseInt(formData.capacity) <= 0) {
          newErrors.capacity = language === 'fr' ? 'La capacité doit être supérieure à 0' : 'Capacity must be greater than 0';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Redirect to events list
      window.location.href = '/organizer/events';
    }, 1500);
  };

  const handleSaveDraft = () => {
    // Save as draft logic
    alert(language === 'fr' ? 'Brouillon sauvegardé' : 'Draft saved');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="pb-5 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">
          {language === 'fr' ? 'Créer un nouvel événement' : 'Create New Event'}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {language === 'fr' 
            ? 'Remplissez les informations pour créer votre événement'
            : 'Fill in the information to create your event'
          }
        </p>
      </div>

      {/* Step Indicator */}
      <div className="mt-6 mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.number
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-300 text-gray-500'
                }`}>
                  {step.number}
                </div>
                <div className="mt-2 text-center">
                  <div className="text-sm font-medium text-gray-900">
                    {step.title[language]}
                  </div>
                  <div className="text-xs text-gray-500">
                    {step.description[language]}
                  </div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4 h-0.5 bg-gray-200">
                  <div className={`h-0.5 bg-green-500 transition-all ${
                    currentStep > step.number ? 'w-full' : 'w-0'
                  }`}></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card variant="elevated">
          <CardContent className="p-6">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="flex items-center mb-4">
                  <FileText className="mr-2 text-green-500" size={20} />
                  <h3 className="text-lg font-medium text-gray-900">
                    {language === 'fr' ? 'Informations de base' : 'Basic Information'}
                  </h3>
                </div>

                <Input
                  label={language === 'fr' ? 'Titre de l\'événement' : 'Event Title'}
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  error={errors.title}
                  placeholder={language === 'fr' ? 'Ex: Festival de musique traditionnelle' : 'Ex: Traditional Music Festival'}
                  fullWidth
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'fr' ? 'Catégorie' : 'Category'}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {categories.map((category) => (
                      <button
                        key={category.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, category: category.value }))}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          formData.category === category.value
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-2xl mb-1">{category.icon}</div>
                        <div className="text-sm font-medium">
                          {category.label[language]}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <Input
                  label={language === 'fr' ? 'Description courte' : 'Short Description'}
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleInputChange}
                  error={errors.shortDescription}
                  placeholder={language === 'fr' ? 'Résumé en une phrase' : 'One sentence summary'}
                  helperText={language === 'fr' ? 'Maximum 150 caractères' : 'Maximum 150 characters'}
                  fullWidth
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'fr' ? 'Description complète' : 'Full Description'}
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={6}
                    className={`block w-full rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm ${
                      errors.description ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder={language === 'fr' 
                      ? 'Décrivez votre événement en détail...'
                      : 'Describe your event in detail...'
                    }
                    required
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Date and Location */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="flex items-center mb-4">
                  <Calendar className="mr-2 text-green-500" size={20} />
                  <h3 className="text-lg font-medium text-gray-900">
                    {language === 'fr' ? 'Date et lieu' : 'Date and Location'}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label={language === 'fr' ? 'Date et heure de début' : 'Start Date and Time'}
                    name="startDate"
                    type="datetime-local"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    error={errors.startDate}
                    leftIcon={<Calendar size={18} />}
                    fullWidth
                    required
                  />

                  <Input
                    label={language === 'fr' ? 'Date et heure de fin' : 'End Date and Time'}
                    name="endDate"
                    type="datetime-local"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    error={errors.endDate}
                    leftIcon={<Clock size={18} />}
                    fullWidth
                    required
                  />
                </div>

                <Input
                  label={language === 'fr' ? 'Lieu de l\'événement' : 'Event Location'}
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  error={errors.location}
                  placeholder={language === 'fr' ? 'Ex: Place de la Liberté, Brazzaville' : 'Ex: Place de la Liberté, Brazzaville'}
                  leftIcon={<MapPin size={18} />}
                  fullWidth
                  required
                />

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">
                        {language === 'fr' ? 'Conseil' : 'Tip'}
                      </h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <p>
                          {language === 'fr' 
                            ? 'Assurez-vous que le lieu est accessible et dispose des équipements nécessaires pour votre événement.'
                            : 'Make sure the venue is accessible and has the necessary equipment for your event.'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Ticketing */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex items-center mb-4">
                  <Users className="mr-2 text-green-500" size={20} />
                  <h3 className="text-lg font-medium text-gray-900">
                    {language === 'fr' ? 'Billetterie' : 'Ticketing'}
                  </h3>
                </div>

                <Input
                  label={language === 'fr' ? 'Capacité maximale' : 'Maximum Capacity'}
                  name="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  error={errors.capacity}
                  placeholder="100"
                  leftIcon={<Users size={18} />}
                  helperText={language === 'fr' ? 'Nombre maximum de participants' : 'Maximum number of participants'}
                  fullWidth
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label={language === 'fr' ? 'Prix du billet (optionnel)' : 'Ticket Price (optional)'}
                    name="ticketPrice"
                    type="number"
                    value={formData.ticketPrice}
                    onChange={handleInputChange}
                    placeholder="0"
                    leftIcon={<DollarSign size={18} />}
                    helperText={language === 'fr' ? 'Laissez vide pour un événement gratuit' : 'Leave empty for free event'}
                    fullWidth
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {language === 'fr' ? 'Devise' : 'Currency'}
                    </label>
                    <select
                      name="ticketCurrency"
                      value={formData.ticketCurrency}
                      onChange={handleInputChange}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    >
                      <option value="XAF">XAF (Franc CFA)</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                    </select>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <DollarSign className="h-5 w-5 text-green-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">
                        {language === 'fr' ? 'Revenus estimés' : 'Estimated Revenue'}
                      </h3>
                      <div className="mt-2 text-sm text-green-700">
                        <p>
                          {formData.capacity && formData.ticketPrice
                            ? `${(parseInt(formData.capacity) * parseFloat(formData.ticketPrice)).toLocaleString()} ${formData.ticketCurrency}`
                            : (language === 'fr' ? 'Événement gratuit' : 'Free event')
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Media and Publishing */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="flex items-center mb-4">
                  <ImageIcon className="mr-2 text-green-500" size={20} />
                  <h3 className="text-lg font-medium text-gray-900">
                    {language === 'fr' ? 'Médias et publication' : 'Media and Publishing'}
                  </h3>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'fr' ? 'Image de l\'événement' : 'Event Image'}
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                        >
                          <span>
                            {language === 'fr' ? 'Télécharger un fichier' : 'Upload a file'}
                          </span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">
                          {language === 'fr' ? 'ou glisser-déposer' : 'or drag and drop'}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF {language === 'fr' ? 'jusqu\'à' : 'up to'} 10MB
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="isFeatured"
                      name="isFeatured"
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-900">
                      <div className="flex items-center">
                        <Star size={16} className="mr-1 text-yellow-500" />
                        {language === 'fr' ? 'Marquer comme événement en vedette' : 'Mark as featured event'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {language === 'fr' 
                          ? 'Les événements en vedette sont mis en avant sur la plateforme'
                          : 'Featured events are highlighted on the platform'
                        }
                      </div>
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="isPublished"
                      name="isPublished"
                      type="checkbox"
                      checked={formData.isPublished}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-900">
                      <div className="flex items-center">
                        <Globe size={16} className="mr-1 text-green-500" />
                        {language === 'fr' ? 'Publier immédiatement' : 'Publish immediately'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {language === 'fr' 
                          ? 'L\'événement sera visible publiquement'
                          : 'The event will be publicly visible'
                        }
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              <div>
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                  >
                    {language === 'fr' ? 'Précédent' : 'Previous'}
                  </Button>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleSaveDraft}
                  leftIcon={<Save size={18} />}
                >
                  {language === 'fr' ? 'Sauvegarder le brouillon' : 'Save Draft'}
                </Button>

                {currentStep < steps.length ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                  >
                    {language === 'fr' ? 'Suivant' : 'Next'}
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    leftIcon={<Save size={18} />}
                  >
                    {language === 'fr' ? 'Créer l\'événement' : 'Create Event'}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};