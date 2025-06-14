import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { MOCK_EVENTS, MOCK_PARTICIPANTS } from '../../constants/mockData';
import { 
  Search, 
  Download, 
  Mail, 
  Phone, 
  Calendar,
  Users,
  Filter,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  Eye
} from 'lucide-react';

export const Participants: React.FC = () => {
  const [language] = useState<'fr' | 'en'>('fr');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Filter events for this organizer
  const organizerEvents = MOCK_EVENTS.filter(event => event.organizers.includes('2'));
  
  // Filter participants for organizer's events
  const organizerParticipants = MOCK_PARTICIPANTS.filter(participant =>
    organizerEvents.some(event => event.id === participant.eventId)
  );
  
  const filteredParticipants = organizerParticipants.filter(participant => {
    const matchesSearch = participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         participant.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEvent = selectedEvent === 'all' || participant.eventId === selectedEvent;
    const matchesStatus = statusFilter === 'all' || participant.status === statusFilter;
    return matchesSearch && matchesEvent && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle size={16} className="text-green-500" />;
      case 'pending': return <Clock size={16} className="text-yellow-500" />;
      case 'cancelled': return <XCircle size={16} className="text-red-500" />;
      default: return null;
    }
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      confirmed: { fr: 'Confirmé', en: 'Confirmed' },
      pending: { fr: 'En attente', en: 'Pending' },
      cancelled: { fr: 'Annulé', en: 'Cancelled' }
    };
    return labels[status as keyof typeof labels]?.[language] || status;
  };

  const getStatusVariant = (status: string): React.ComponentProps<typeof Badge>['variant'] => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'error';
      default: return 'outline';
    }
  };

  const exportParticipants = () => {
    // Export logic here
    alert(language === 'fr' ? 'Export en cours...' : 'Exporting...');
  };

  const sendEmail = (participant: any) => {
    // Email logic here
    alert(language === 'fr' ? `Email envoyé à ${participant.name}` : `Email sent to ${participant.name}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {language === 'fr' ? 'Participants' : 'Participants'}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {language === 'fr' 
              ? `Gérez les ${organizerParticipants.length} participants à vos événements`
              : `Manage the ${organizerParticipants.length} participants in your events`
            }
          </p>
        </div>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <Button
            variant="outline"
            leftIcon={<Download size={18} />}
            onClick={exportParticipants}
          >
            {language === 'fr' ? 'Exporter' : 'Export'}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card variant="elevated">
          <CardContent className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 rounded-md bg-blue-100 text-blue-600">
                <Users size={24} />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">
                  {language === 'fr' ? 'Total participants' : 'Total Participants'}
                </p>
                <p className="text-xl font-semibold text-gray-900">
                  {organizerParticipants.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardContent className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 rounded-md bg-green-100 text-green-600">
                <CheckCircle size={24} />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">
                  {language === 'fr' ? 'Confirmés' : 'Confirmed'}
                </p>
                <p className="text-xl font-semibold text-gray-900">
                  {organizerParticipants.filter(p => p.status === 'confirmed').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardContent className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 rounded-md bg-yellow-100 text-yellow-600">
                <Clock size={24} />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">
                  {language === 'fr' ? 'En attente' : 'Pending'}
                </p>
                <p className="text-xl font-semibold text-gray-900">
                  {organizerParticipants.filter(p => p.status === 'pending').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardContent className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 rounded-md bg-red-100 text-red-600">
                <XCircle size={24} />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">
                  {language === 'fr' ? 'Annulés' : 'Cancelled'}
                </p>
                <p className="text-xl font-semibold text-gray-900">
                  {organizerParticipants.filter(p => p.status === 'cancelled').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder={language === 'fr' ? 'Rechercher par nom ou email...' : 'Search by name or email...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search size={18} />}
            fullWidth
          />
        </div>
        <div className="lg:w-48">
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          >
            <option value="all">
              {language === 'fr' ? 'Tous les événements' : 'All events'}
            </option>
            {organizerEvents.map((event) => (
              <option key={event.id} value={event.id}>
                {event.title}
              </option>
            ))}
          </select>
        </div>
        <div className="lg:w-48">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          >
            <option value="all">
              {language === 'fr' ? 'Tous les statuts' : 'All statuses'}
            </option>
            <option value="confirmed">
              {language === 'fr' ? 'Confirmé' : 'Confirmed'}
            </option>
            <option value="pending">
              {language === 'fr' ? 'En attente' : 'Pending'}
            </option>
            <option value="cancelled">
              {language === 'fr' ? 'Annulé' : 'Cancelled'}
            </option>
          </select>
        </div>
      </div>

      {/* Participants Table */}
      <Card variant="elevated" className="mt-6">
        <CardHeader className="border-b border-gray-100">
          <CardTitle>
            {language === 'fr' ? 'Liste des participants' : 'Participants List'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    {language === 'fr' ? 'Participant' : 'Participant'}
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    {language === 'fr' ? 'Événement' : 'Event'}
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    {language === 'fr' ? 'Date d\'inscription' : 'Registration Date'}
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    {language === 'fr' ? 'Statut' : 'Status'}
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    {language === 'fr' ? 'Type de billet' : 'Ticket Type'}
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">
                    {language === 'fr' ? 'Actions' : 'Actions'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredParticipants.map((participant) => {
                  const event = organizerEvents.find(e => e.id === participant.eventId);
                  return (
                    <tr key={participant.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-gray-900">
                            {participant.name}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Mail size={14} className="mr-1" />
                            {participant.email}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Phone size={14} className="mr-1" />
                            {participant.phone}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900">
                          {event?.title || 'Unknown Event'}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {event ? new Date(event.startDate).toLocaleDateString() : '-'}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm text-gray-900">
                          {new Date(participant.registrationDate).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(participant.registrationDate).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={getStatusVariant(participant.status)} className="flex items-center gap-1 w-fit">
                          {getStatusIcon(participant.status)}
                          {getStatusLabel(participant.status)}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-900 capitalize">
                          {participant.ticketType || 'Standard'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            leftIcon={<Mail size={16} />}
                            onClick={() => sendEmail(participant)}
                          >
                            {language === 'fr' ? 'Email' : 'Email'}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            leftIcon={<Eye size={16} />}
                          >
                            {language === 'fr' ? 'Voir' : 'View'}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                          >
                            <MoreHorizontal size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredParticipants.length === 0 && (
            <div className="text-center py-16">
              <Users size={64} className="mx-auto text-gray-300 mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                {language === 'fr' ? 'Aucun participant trouvé' : 'No participants found'}
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                {searchTerm || selectedEvent !== 'all' || statusFilter !== 'all'
                  ? (language === 'fr' 
                      ? 'Aucun participant ne correspond à vos critères de recherche.'
                      : 'No participants match your search criteria.')
                  : (language === 'fr'
                      ? 'Aucun participant inscrit pour le moment.'
                      : 'No participants registered yet.')
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};