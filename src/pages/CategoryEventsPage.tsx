import React from 'react';
import { useParams } from 'react-router-dom';
import { CategoryPage } from '../components/events/CategoryPage';
import { EventCategory } from '../types';

export const CategoryEventsPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  
  // Validate category parameter
  const validCategories: EventCategory[] = [
    'music', 'dance', 'theater', 'art', 'festival', 'workshop', 'conference', 'other'
  ];
  
  if (!category || !validCategories.includes(category as EventCategory)) {
    // Redirect to events page if invalid category
    window.location.href = '/events';
    return null;
  }
  
  return <CategoryPage category={category as EventCategory} />;
};