import React, { useState } from 'react';
import { Navbar } from '../components/ui/Navbar';
import { Footer } from '../components/ui/Footer';
import { Users, Calendar, Award, Globe, Heart, Sparkles } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  
  const handleLanguageChange = (lang: 'fr' | 'en') => {
    setLanguage(lang);
  };

  const stats = [
    {
      icon: Users,
      value: '10,000+',
      label: {
        fr: 'Participants',
        en: 'Participants',
      },
    },
    {
      icon: Calendar,
      value: '500+',
      label: {
        fr: 'Événements organisés',
        en: 'Events organized',
      },
    },
    {
      icon: Award,
      value: '50+',
      label: {
        fr: 'Partenaires culturels',
        en: 'Cultural partners',
      },
    },
  ];

  const values = [
    {
      icon: Heart,
      title: {
        fr: 'Passion pour la Culture',
        en: 'Passion for Culture',
      },
      description: {
        fr: 'Nous sommes passionnés par la préservation et la promotion de la riche culture congolaise.',
        en: 'We are passionate about preserving and promoting the rich Congolese culture.',
      },
    },
    {
      icon: Globe,
      title: {
        fr: 'Accessibilité',
        en: 'Accessibility',
      },
      description: {
        fr: 'Nous rendons la culture accessible à tous à travers des événements inclusifs et diversifiés.',
        en: 'We make culture accessible to everyone through inclusive and diverse events.',
      },
    },
    {
      icon: Sparkles,
      title: {
        fr: 'Innovation',
        en: 'Innovation',
      },
      description: {
        fr: 'Nous utilisons la technologie pour créer des expériences culturelles uniques et mémorables.',
        en: 'We use technology to create unique and memorable cultural experiences.',
      },
    },
  ];

  const team = [
    {
      name: 'Jean-Pierre Mukendi',
      role: {
        fr: 'Directeur Général',
        en: 'General Director',
      },
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
    },
    {
      name: 'Marie-Claire Bakala',
      role: {
        fr: 'Directrice Artistique',
        en: 'Artistic Director',
      },
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    },
    {
      name: 'Pascal Lumumba',
      role: {
        fr: 'Responsable des Événements',
        en: 'Events Manager',
      },
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
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
              src="https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg"
              alt="Cultural celebration"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {language === 'fr' ? 'À Propos de CultureCongo' : 'About CultureCongo'}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {language === 'fr'
                ? 'Nous sommes dédiés à la promotion et à la préservation de la riche culture congolaise à travers des événements innovants et accessibles.'
                : 'We are dedicated to promoting and preserving the rich Congolese culture through innovative and accessible events.'}
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-8 rounded-lg text-center transform hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full text-green-600 mb-4">
                    <stat.icon size={24} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label[language]}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {language === 'fr' ? 'Notre Mission & Vision' : 'Our Mission & Vision'}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {language === 'fr'
                  ? 'Créer une plateforme dynamique qui célèbre et promeut la culture congolaise, en connectant les artistes, les organisateurs et le public.'
                  : 'Creating a dynamic platform that celebrates and promotes Congolese culture by connecting artists, organizers, and audiences.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full text-green-600 mb-4">
                    <value.icon size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {value.title[language]}
                  </h3>
                  <p className="text-gray-600">
                    {value.description[language]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {language === 'fr' ? 'Notre Équipe' : 'Our Team'}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {language === 'fr'
                  ? 'Une équipe passionnée dédiée à la promotion de la culture congolaise.'
                  : 'A passionate team dedicated to promoting Congolese culture.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="text-center"
                >
                  <div className="relative w-48 h-48 mx-auto mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-gray-600">{member.role[language]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-green-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              {language === 'fr'
                ? 'Rejoignez-nous dans cette aventure culturelle'
                : 'Join us in this cultural journey'}
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
              {language === 'fr'
                ? 'Découvrez les événements culturels les plus captivants du Congo.'
                : 'Discover the most captivating cultural events in Congo.'}
            </p>
            <a
              href="/events"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-green-50 md:py-4 md:text-lg md:px-10"
            >
              {language === 'fr' ? 'Explorer les événements' : 'Explore events'}
            </a>
          </div>
        </section>
      </main>

      <Footer currentLanguage={language} />
    </div>
  );
};