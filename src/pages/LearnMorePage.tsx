import React, { useState } from 'react';
import { Navbar } from '../components/ui/Navbar';
import { Footer } from '../components/ui/Footer';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { 
  Heart, 
  Globe, 
  Users, 
  Calendar,
  Award,
  Sparkles,
  Music,
  Palette,
  Theater,
  Camera,
  BookOpen,
  MapPin,
  Clock,
  Star,
  ArrowRight,
  Play,
  Download,
  Share2
} from 'lucide-react';

export const LearnMorePage: React.FC = () => {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const [activeTab, setActiveTab] = useState('mission');

  const handleLanguageChange = (lang: 'fr' | 'en') => {
    setLanguage(lang);
  };

  const stats = [
    {
      icon: Calendar,
      value: '500+',
      label: {
        fr: 'Événements organisés',
        en: 'Events organized'
      }
    },
    {
      icon: Users,
      value: '50,000+',
      label: {
        fr: 'Participants satisfaits',
        en: 'Satisfied participants'
      }
    },
    {
      icon: Award,
      value: '100+',
      label: {
        fr: 'Partenaires culturels',
        en: 'Cultural partners'
      }
    },
    {
      icon: Globe,
      value: '15+',
      label: {
        fr: 'Villes couvertes',
        en: 'Cities covered'
      }
    }
  ];

  const values = [
    {
      icon: Heart,
      title: {
        fr: 'Passion pour la Culture',
        en: 'Passion for Culture'
      },
      description: {
        fr: 'Nous sommes animés par une passion profonde pour la richesse culturelle du Congo et nous nous engageons à la préserver et la promouvoir.',
        en: 'We are driven by a deep passion for Congo\'s cultural richness and are committed to preserving and promoting it.'
      }
    },
    {
      icon: Globe,
      title: {
        fr: 'Accessibilité Universelle',
        en: 'Universal Accessibility'
      },
      description: {
        fr: 'Nous croyons que la culture doit être accessible à tous, indépendamment du statut social ou économique.',
        en: 'We believe culture should be accessible to everyone, regardless of social or economic status.'
      }
    },
    {
      icon: Sparkles,
      title: {
        fr: 'Innovation Continue',
        en: 'Continuous Innovation'
      },
      description: {
        fr: 'Nous utilisons les dernières technologies pour créer des expériences culturelles uniques et mémorables.',
        en: 'We use the latest technologies to create unique and memorable cultural experiences.'
      }
    },
    {
      icon: Users,
      title: {
        fr: 'Communauté Unie',
        en: 'United Community'
      },
      description: {
        fr: 'Nous rassemblons artistes, organisateurs et public dans une communauté unie par l\'amour de la culture.',
        en: 'We bring together artists, organizers and audiences in a community united by love of culture.'
      }
    }
  ];

  const categories = [
    {
      icon: Music,
      name: {
        fr: 'Musique',
        en: 'Music'
      },
      description: {
        fr: 'Concerts, festivals de musique traditionnelle et contemporaine',
        en: 'Concerts, traditional and contemporary music festivals'
      },
      image: 'https://images.pexels.com/photos/3593865/pexels-photo-3593865.jpeg'
    },
    {
      icon: Palette,
      name: {
        fr: 'Arts Visuels',
        en: 'Visual Arts'
      },
      description: {
        fr: 'Expositions, galeries d\'art et installations artistiques',
        en: 'Exhibitions, art galleries and artistic installations'
      },
      image: 'https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg'
    },
    {
      icon: Theater,
      name: {
        fr: 'Arts de la Scène',
        en: 'Performing Arts'
      },
      description: {
        fr: 'Théâtre, danse traditionnelle et spectacles vivants',
        en: 'Theater, traditional dance and live performances'
      },
      image: 'https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg'
    },
    {
      icon: BookOpen,
      name: {
        fr: 'Littérature',
        en: 'Literature'
      },
      description: {
        fr: 'Lectures, conférences et ateliers d\'écriture',
        en: 'Readings, conferences and writing workshops'
      },
      image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg'
    }
  ];

  const timeline = [
    {
      year: '2020',
      title: {
        fr: 'Création de CultureCongo',
        en: 'CultureCongo Creation'
      },
      description: {
        fr: 'Lancement de la plateforme avec 10 événements pilotes',
        en: 'Platform launch with 10 pilot events'
      }
    },
    {
      year: '2021',
      title: {
        fr: 'Expansion Nationale',
        en: 'National Expansion'
      },
      description: {
        fr: 'Extension à 5 villes principales du Congo',
        en: 'Extension to 5 main cities in Congo'
      }
    },
    {
      year: '2022',
      title: {
        fr: 'Partenariats Stratégiques',
        en: 'Strategic Partnerships'
      },
      description: {
        fr: 'Collaboration avec le Ministère de la Culture',
        en: 'Collaboration with Ministry of Culture'
      }
    },
    {
      year: '2023',
      title: {
        fr: 'Innovation Technologique',
        en: 'Technological Innovation'
      },
      description: {
        fr: 'Lancement de l\'application mobile et des outils AR',
        en: 'Launch of mobile app and AR tools'
      }
    },
    {
      year: '2024',
      title: {
        fr: 'Reconnaissance Internationale',
        en: 'International Recognition'
      },
      description: {
        fr: 'Prix de l\'innovation culturelle africaine',
        en: 'African Cultural Innovation Award'
      }
    }
  ];

  const tabs = [
    {
      id: 'mission',
      label: {
        fr: 'Notre Mission',
        en: 'Our Mission'
      }
    },
    {
      id: 'vision',
      label: {
        fr: 'Notre Vision',
        en: 'Our Vision'
      }
    },
    {
      id: 'impact',
      label: {
        fr: 'Notre Impact',
        en: 'Our Impact'
      }
    }
  ];

  const tabContent = {
    mission: {
      title: {
        fr: 'Notre Mission',
        en: 'Our Mission'
      },
      content: {
        fr: 'CultureCongo a pour mission de valoriser, préserver et promouvoir le riche patrimoine culturel congolais en créant une plateforme innovante qui connecte les artistes, les organisateurs d\'événements et le public. Nous nous engageons à rendre la culture accessible à tous et à soutenir la créativité locale.',
        en: 'CultureCongo\'s mission is to enhance, preserve and promote Congo\'s rich cultural heritage by creating an innovative platform that connects artists, event organizers and audiences. We are committed to making culture accessible to all and supporting local creativity.'
      }
    },
    vision: {
      title: {
        fr: 'Notre Vision',
        en: 'Our Vision'
      },
      content: {
        fr: 'Nous envisageons un Congo où la culture est au cœur de la société, où chaque citoyen peut participer activement à la vie culturelle et où notre patrimoine est célébré et transmis aux générations futures. Nous aspirons à devenir la référence en matière d\'événements culturels en Afrique centrale.',
        en: 'We envision a Congo where culture is at the heart of society, where every citizen can actively participate in cultural life and where our heritage is celebrated and passed on to future generations. We aspire to become the reference for cultural events in Central Africa.'
      }
    },
    impact: {
      title: {
        fr: 'Notre Impact',
        en: 'Our Impact'
      },
      content: {
        fr: 'Depuis notre création, nous avons organisé plus de 500 événements, touché plus de 50 000 participants et soutenu des centaines d\'artistes locaux. Notre plateforme a contribué à la création d\'emplois dans le secteur culturel et à la sensibilisation du public à l\'importance de notre patrimoine.',
        en: 'Since our creation, we have organized over 500 events, reached over 50,000 participants and supported hundreds of local artists. Our platform has contributed to job creation in the cultural sector and public awareness of the importance of our heritage.'
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        currentLanguage={language}
        onLanguageChange={handleLanguageChange}
      />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg"
              alt="Cultural celebration"
              className="w-full h-full object-cover opacity-30"
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white">
              <Badge variant="warning" className="mb-4">
                {language === 'fr' ? 'Découvrez CultureCongo' : 'Discover CultureCongo'}
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {language === 'fr' ? 'En Savoir Plus' : 'Learn More'}
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
                {language === 'fr'
                  ? 'Découvrez notre histoire, nos valeurs et notre impact sur la culture congolaise'
                  : 'Discover our story, our values and our impact on Congolese culture'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  leftIcon={<Play size={20} />}
                >
                  {language === 'fr' ? 'Voir la vidéo' : 'Watch video'}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-gray-900"
                  leftIcon={<Download size={20} />}
                >
                  {language === 'fr' ? 'Télécharger la brochure' : 'Download brochure'}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors duration-300"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full text-green-600 mb-4">
                    <stat.icon size={32} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label[language]}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission, Vision, Impact Tabs */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {language === 'fr' ? 'Qui sommes-nous ?' : 'Who are we?'}
              </h2>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="border-b border-gray-200">
                <nav className="flex">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.label[language]}
                    </button>
                  ))}
                </nav>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {tabContent[activeTab as keyof typeof tabContent].title[language]}
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {tabContent[activeTab as keyof typeof tabContent].content[language]}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {language === 'fr' ? 'Nos Valeurs' : 'Our Values'}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {language === 'fr'
                  ? 'Les principes qui guident notre action quotidienne'
                  : 'The principles that guide our daily action'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <Card key={index} variant="elevated" className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full text-green-600 mr-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
                        <value.icon size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {value.title[language]}
                        </h3>
                        <p className="text-gray-600">
                          {value.description[language]}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {language === 'fr' ? 'Nos Domaines d\'Action' : 'Our Areas of Action'}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {language === 'fr'
                  ? 'Nous couvrons tous les aspects de la culture congolaise'
                  : 'We cover all aspects of Congolese culture'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {categories.map((category, index) => (
                <Card key={index} variant="elevated" className="group overflow-hidden">
                  <div className="relative h-48">
                    <img
                      src={category.image}
                      alt={category.name[language]}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center mb-2">
                        <category.icon size={24} className="mr-2" />
                        <h3 className="text-xl font-semibold">{category.name[language]}</h3>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-gray-600">{category.description[language]}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {language === 'fr' ? 'Notre Histoire' : 'Our History'}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {language === 'fr'
                  ? 'Les étapes clés de notre développement'
                  : 'Key milestones in our development'}
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-green-200"></div>
              
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                      <Card variant="elevated" className="p-6">
                        <div className="text-2xl font-bold text-green-600 mb-2">{item.year}</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {item.title[language]}
                        </h3>
                        <p className="text-gray-600">{item.description[language]}</p>
                      </Card>
                    </div>
                    
                    <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-green-600 rounded-full border-4 border-white shadow-lg">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                    
                    <div className="w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-green-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              {language === 'fr'
                ? 'Rejoignez notre communauté'
                : 'Join our community'}
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
              {language === 'fr'
                ? 'Participez à la préservation et à la promotion de la culture congolaise'
                : 'Participate in preserving and promoting Congolese culture'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                rightIcon={<ArrowRight size={18} />}
              >
                {language === 'fr' ? 'Découvrir les événements' : 'Discover events'}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-green-600"
                leftIcon={<Share2 size={18} />}
              >
                {language === 'fr' ? 'Partager notre mission' : 'Share our mission'}
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer currentLanguage={language} />
    </div>
  );
};