import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { MOCK_EVENTS } from '../../constants/mockData';
import { formatDateTime } from '../../utils/formatters';
import { Plus, Search, Edit2, Trash2, Eye } from 'lucide-react';

export const EventManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  
  const filteredEvents = MOCK_EVENTS.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Event Management</h1>
        <Button leftIcon={<Plus size={18} />}>
          Create New Event
        </Button>
      </div>

      <Card>
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center justify-between">
            <CardTitle>Events</CardTitle>
            <div className="w-64">
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search size={18} />}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4">Event</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Location</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Registrations</th>
                  <th className="text-right py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((event) => (
                  <tr
                    key={event.id}
                    className={`border-b border-gray-100 hover:bg-gray-50 ${
                      selectedEvent === event.id ? 'bg-green-50' : ''
                    }`}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-10 h-10 rounded object-cover mr-3"
                        />
                        <div>
                          <div className="font-medium">{event.title}</div>
                          <div className="text-sm text-gray-500">{event.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {formatDateTime(event.startDate, 'en')}
                    </td>
                    <td className="py-3 px-4">{event.location}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          event.status === 'upcoming' ? 'default' :
                          event.status === 'ongoing' ? 'success' :
                          event.status === 'completed' ? 'outline' : 'error'
                        }
                      >
                        {event.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      {event.registeredCount}/{event.capacity}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          leftIcon={<Eye size={16} />}
                          onClick={() => {}}
                        >
                          View
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          leftIcon={<Edit2 size={16} />}
                          onClick={() => {}}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          leftIcon={<Trash2 size={16} />}
                          onClick={() => {}}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};