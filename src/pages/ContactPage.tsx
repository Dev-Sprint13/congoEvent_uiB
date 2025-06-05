import React, { useState } from 'react';
import { Navbar } from '../components/ui/Navbar';
import { Footer } from '../components/ui/Footer';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent } from '../components/ui/Card';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
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
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 1500);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: {
        fr: 'Adresse',
        en: 'Address',
      },
      content: {
        fr: '123 Avenue de l\'Indépendance, Brazzaville, République du Congo',
        en: '123 Independence Avenue, Brazzaville, Republic of Congo',
      },
    },
    {
      icon: Phone,
      title: {
        fr: 'Téléphone',
        en: 'Phone',
      },
      content: {
        fr: '+242 06 123 4567',
        en: '+242 06 123 4567',
      },
    },
    {
      icon: Mail,
      title: {
        fr: 'Email',
        en: 'Email',
      },
      content: {
        fr: 'contact@culturecongo.org',
        en: 'contact@culturecongo.org',
      },
    },
    {
      icon: Clock,
      title: {
        fr: 'Heures d\'ouverture',
        en: 'Opening Hours',
      },
      content: {
        fr: 'Lun - Ven: 9h00 - 18h00',
        en: 'Mon - Fri: 9:00 AM - 6:00 PM',
      },
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        currentLanguage={language}
        onLanguageChange={handleLanguageChange}
      />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gray-900 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg"
              alt="Contact"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {language === 'fr' ? 'Contactez-nous' : 'Contact Us'}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {language === 'fr'
                ? 'Nous sommes là pour vous aider. N\'hésitez pas à nous contacter pour toute question.'
                : 'We are here to help. Do not hesitate to contact us for any questions.'}
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactInfo.map((info, index) => (
                <Card key={index} variant="elevated">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full text-green-600 mb-4">
                      <info.icon size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {info.title[language]}
                    </h3>
                    <p className="text-gray-600">
                      {info.content[language]}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card variant="elevated">
              <CardContent className="p-8">
                {isSuccess ? (
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full text-green-600 mb-4">
                      <Send size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {language === 'fr'
                        ? 'Message envoyé avec succès !'
                        : 'Message sent successfully!'}
                    </h2>
                    <p className="text-gray-600 mb-6">
                      {language === 'fr'
                        ? 'Nous vous répondrons dans les plus brefs délais.'
                        : 'We will get back to you as soon as possible.'}
                    </p>
                    <Button
                      onClick={() => setIsSuccess(false)}
                      variant="outline"
                    >
                      {language === 'fr' ? 'Envoyer un autre message' : 'Send another message'}
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
                        fullWidth
                      />
                      
                      <Input
                        label="Email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        fullWidth
                      />
                    </div>

                    <Input
                      label={language === 'fr' ? 'Sujet' : 'Subject'}
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      fullWidth
                    />

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {language === 'fr' ? 'Message' : 'Message'}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        className="block w-full rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm border-gray-300"
                      />
                    </div>

                    <div>
                      <Button
                        type="submit"
                        fullWidth
                        isLoading={isSubmitting}
                      >
                        {language === 'fr' ? 'Envoyer le message' : 'Send message'}
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Map Section */}
        <section className="h-96 relative">
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63833.41814766961!2d15.241650899999999!3d-4.2633597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a6a3130cb6e0c47%3A0x24c7f3d9b6d9f863!2sBrazzaville%2C%20Republic%20of%20the%20Congo!5e0!3m2!1sen!2sus!4v1709766543276!5m2!1sen!2sus"
            className="w-full h-full border-0"
            loading="lazy"
          />
        </section>
      </main>

      <Footer currentLanguage={language} />
    </div>
  );
};