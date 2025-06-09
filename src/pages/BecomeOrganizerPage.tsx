import React, { useState } from 'react';
import { Navbar } from '../components/ui/Navbar';
import { Footer } from '../components/ui/Footer';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  Shield, 
  Headphones, 
  Award,
  CheckCircle,
  Star,
  ArrowRight,
  User,
  Mail,
  Phone,
  Building,
  FileText
} from 'lucide-react';

export const BecomeOrganizerPage: React.FC = () => {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    experience: '',
    eventTypes: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleLanguageChange = (lang: 'fr' | 'en') => {
    setLanguage(lang);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const benefits = [
    {
      icon: Calendar,
      title: {
        fr: 'Gestion d\'événements simplifiée',
        en: 'Simplified event management'
      },
      description: {
        fr: 'Créez et gérez vos événements avec notre plateforme intuitive',
        en: 'Create and manage your events with our intuitive platform'
      }
    },
    {
      icon: Users,
      title: {
        fr: 'Audience élargie',
        en: 'Expanded audience'
      },
      description: {
        fr: 'Atteignez des milliers de passionnés de culture congolaise',
        en: 'Reach thousands of Congolese culture enthusiasts'
      }
    },
    {
      icon: TrendingUp,
      title: {
        fr: 'Outils d\'analyse',
        en: 'Analytics tools'
      },
      description: {
        fr: 'Suivez les performances de vos événements en temps réel',
        en: 'Track your event performance in real-time'
      }
    },
    {
      icon: Shield,
      title: {
        fr: 'Paiements sécurisés',
        en: 'Secure payments'
      },
      description: {
        fr: 'Système de paiement intégré et sécurisé pour vos billets',
        en: 'Integrated and secure payment system for your tickets'
      }
    },
    {
      icon: Headphones,
      title: {
        fr: 'Support dédié',
        en: 'Dedicated support'
      },
      description: {
        fr: 'Équipe de support disponible pour vous accompagner',
        en: 'Support team available to assist you'
      }
    },
    {
      icon: Award,
      title: {
        fr: 'Promotion gratuite',
        en: 'Free promotion'
      },
      description: {
        fr: 'Vos événements mis en avant sur notre plateforme',
        en: 'Your events featured on our platform'
      }
    }
  ];

  const steps = [
    {
      number: 1,
      title: {
        fr: 'Candidature',
        en: 'Application'
      },
      description: {
        fr: 'Remplissez le formulaire de candidature ci-dessous',
        en: 'Fill out the application form below'
      }
    },
    {
      number: 2,
      title: {
        fr: 'Évaluation',
        en: 'Evaluation'
      },
      description: {
        fr: 'Notre équipe examine votre candidature sous 48h',
        en: 'Our team reviews your application within 48h'
      }
    },
    {
      number: 3,
      title: {
        fr: 'Formation',
        en: 'Training'
      },
      description: {
        fr: 'Formation gratuite sur l\'utilisation de la plateforme',
        en: 'Free training on platform usage'
      }
    },
    {
      number: 4,
      title: {
        fr: 'Lancement',
        en: 'Launch'
      },
      description: {
        fr: 'Commencez à créer et promouvoir vos événements',
        en: 'Start creating and promoting your events'
      }
    }
  ];

  const testimonials = [
    {
      name: 'Marie Bakala',
      role: {
        fr: 'Organisatrice d\'événements culturels',
        en: 'Cultural events organizer'
      },
      content: {
        fr: 'CultureCongo a révolutionné la façon dont j\'organise mes événements. La plateforme est intuitive et le support client exceptionnel.',
        en: 'CultureCongo has revolutionized how I organize my events. The platform is intuitive and customer support is exceptional.'
      },
      rating: 5,
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
    },
    {
      name: 'Pascal Moukala',
      role: {
        fr: 'Directeur artistique',
        en: 'Artistic director'
      },
      content: {
        fr: 'Grâce à CultureCongo, nos événements atteignent maintenant un public beaucoup plus large. Les outils d\'analyse sont très utiles.',
        en: 'Thanks to CultureCongo, our events now reach a much wider audience. The analytics tools are very useful.'
      },
      rating: 5,
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        currentLanguage={language}
        onLanguageChange={handleLanguageChange}
      />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-green-600 via-green-700 to-green-800 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white">
              <Badge variant="warning" className="mb-4">
                {language === 'fr' ? 'Rejoignez-nous' : 'Join us'}
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {language === 'fr' ? 'Devenez Organisateur' : 'Become an Organizer'}
              </h1>
              <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto mb-8">
                {language === 'fr'
                  ? 'Rejoignez notre communauté d\'organisateurs et donnez vie à vos événements culturels'
                  : 'Join our community of organizers and bring your cultural events to life'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {language === 'fr' ? 'Postuler maintenant' : 'Apply now'}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-green-600"
                  onClick={() => document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {language === 'fr' ? 'Découvrir les avantages' : 'Discover benefits'}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {language === 'fr' ? 'Pourquoi devenir organisateur ?' : 'Why become an organizer?'}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {language === 'fr'
                  ? 'Découvrez tous les avantages de notre plateforme pour organiser vos événements culturels'
                  : 'Discover all the benefits of our platform for organizing your cultural events'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} variant="elevated" className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full text-green-600 mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
                      <benefit.icon size={32} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {benefit.title[language]}
                    </h3>
                    <p className="text-gray-600">
                      {benefit.description[language]}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {language === 'fr' ? 'Comment ça marche ?' : 'How does it work?'}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {language === 'fr'
                  ? 'Un processus simple en 4 étapes pour devenir organisateur'
                  : 'A simple 4-step process to become an organizer'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full text-white text-xl font-bold mb-4">
                      {step.number}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-green-200 transform -translate-y-1/2"></div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title[language]}
                  </h3>
                  <p className="text-gray-600">
                    {step.description[language]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {language === 'fr' ? 'Ce que disent nos organisateurs' : 'What our organizers say'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} variant="elevated" className="p-6">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={20} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 italic">
                      "{testimonial.content[language]}"
                    </p>
                    <div className="flex items-center">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-gray-600 text-sm">{testimonial.role[language]}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section id="application-form" className="py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card variant="elevated">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">
                  {language === 'fr' ? 'Formulaire de candidature' : 'Application form'}
                </CardTitle>
                <p className="text-gray-600 mt-2">
                  {language === 'fr'
                    ? 'Remplissez ce formulaire pour rejoindre notre communauté d\'organisateurs'
                    : 'Fill out this form to join our community of organizers'}
                </p>
              </CardHeader>

              <CardContent>
                {isSuccess ? (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full text-green-600 mb-4">
                      <CheckCircle size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {language === 'fr' ? 'Candidature envoyée !' : 'Application sent!'}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {language === 'fr'
                        ? 'Nous examinerons votre candidature et vous contacterons sous 48h.'
                        : 'We will review your application and contact you within 48h.'}
                    </p>
                    <Button
                      onClick={() => setIsSuccess(false)}
                      variant="outline"
                    >
                      {language === 'fr' ? 'Nouvelle candidature' : 'New application'}
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label={language === 'fr' ? 'Nom complet' : 'Full name'}
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        leftIcon={<User size={18} />}
                        fullWidth
                      />
                      
                      <Input
                        label="Email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        leftIcon={<Mail size={18} />}
                        fullWidth
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label={language === 'fr' ? 'Téléphone' : 'Phone'}
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        leftIcon={<Phone size={18} />}
                        fullWidth
                      />
                      
                      <Input
                        label={language === 'fr' ? 'Organisation' : 'Organization'}
                        name="organization"
                        type="text"
                        value={formData.organization}
                        onChange={handleInputChange}
                        leftIcon={<Building size={18} />}
                        fullWidth
                      />
                    </div>

                    <Input
                      label={language === 'fr' ? 'Expérience en organisation d\'événements' : 'Event organization experience'}
                      name="experience"
                      type="text"
                      required
                      value={formData.experience}
                      onChange={handleInputChange}
                      leftIcon={<Award size={18} />}
                      helperText={language === 'fr' ? 'Ex: 5 ans, débutant, etc.' : 'Ex: 5 years, beginner, etc.'}
                      fullWidth
                    />

                    <Input
                      label={language === 'fr' ? 'Types d\'événements que vous organisez' : 'Types of events you organize'}
                      name="eventTypes"
                      type="text"
                      required
                      value={formData.eventTypes}
                      onChange={handleInputChange}
                      leftIcon={<Calendar size={18} />}
                      helperText={language === 'fr' ? 'Ex: concerts, expositions, festivals, etc.' : 'Ex: concerts, exhibitions, festivals, etc.'}
                      fullWidth
                    />

                    <div>
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {language === 'fr' ? 'Décrivez votre projet' : 'Describe your project'}
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows={4}
                        required
                        value={formData.description}
                        onChange={handleInputChange}
                        className="block w-full rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border-gray-300"
                        placeholder={language === 'fr' 
                          ? 'Parlez-nous de vos projets d\'événements culturels...'
                          : 'Tell us about your cultural event projects...'
                        }
                      />
                    </div>

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

                    <Button
                      type="submit"
                      fullWidth
                      isLoading={isSubmitting}
                      rightIcon={<ArrowRight size={18} />}
                    >
                      {language === 'fr' ? 'Envoyer ma candidature' : 'Send my application'}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-green-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              {language === 'fr'
                ? 'Prêt à commencer votre aventure ?'
                : 'Ready to start your adventure?'}
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
              {language === 'fr'
                ? 'Rejoignez des centaines d\'organisateurs qui font confiance à CultureCongo'
                : 'Join hundreds of organizers who trust CultureCongo'}
            </p>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {language === 'fr' ? 'Commencer maintenant' : 'Start now'}
            </Button>
          </div>
        </section>
      </main>

      <Footer currentLanguage={language} />
    </div>
  );
};