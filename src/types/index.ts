// Types for the Cultural Events Management Platform

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'organizer' | 'public';
  avatar?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  startDate: string;
  endDate: string;
  location: string;
  image: string;
  capacity: number;
  registeredCount: number;
  category: EventCategory;
  status: EventStatus;
  organizers: string[];
  partners: Partner[];
  isPublished: boolean;
  isFeatured: boolean;
  ticketPrice?: number;
  ticketCurrency?: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  website?: string;
}

export interface Participant {
  id: string;
  name: string;
  email: string;
  phone: string;
  eventId: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  registrationDate: string;
  ticketType?: string;
}

export type EventCategory = 
  | 'music' 
  | 'dance' 
  | 'theater' 
  | 'art' 
  | 'festival' 
  | 'workshop' 
  | 'conference' 
  | 'other';

export type EventStatus = 
  | 'upcoming' 
  | 'ongoing' 
  | 'completed' 
  | 'cancelled';

export interface Stats {
  totalEvents: number;
  upcomingEvents: number;
  totalParticipants: number;
  eventsByCategory: Record<EventCategory, number>;
  participantsTrend: {
    month: string;
    count: number;
  }[];
}