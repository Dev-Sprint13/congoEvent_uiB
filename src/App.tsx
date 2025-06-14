import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { EventsPage } from './pages/EventsPage';
import { CategoryEventsPage } from './pages/CategoryEventsPage';
import { EventDetailPage } from './pages/EventDetailPage';
import { LoginPage } from './pages/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { BecomeOrganizerPage } from './pages/BecomeOrganizerPage';
import { LearnMorePage } from './pages/LearnMorePage';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './pages/AdminDashboard';
import { EventManagement } from './pages/admin/EventManagement';
import { UserManagement } from './pages/admin/UserManagement';
import { Reports } from './pages/admin/Reports';
import { Settings } from './pages/admin/Settings';

// Organizer components
import { OrganizerLayout } from './components/organizer/OrganizerLayout';
import { OrganizerDashboard } from './pages/organizer/OrganizerDashboard';
import { MyEvents } from './pages/organizer/MyEvents';
import { CreateEvent } from './pages/organizer/CreateEvent';
import { Participants } from './pages/organizer/Participants';
import { Promotion } from './pages/organizer/Promotion';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/category/:category" element={<CategoryEventsPage />} />
        <Route path="/events/:id" element={<EventDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/become-organizer" element={<BecomeOrganizerPage />} />
        <Route path="/learn-more" element={<LearnMorePage />} />
        
        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="events" element={<EventManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Organizer routes */}
        <Route path="/organizer" element={<OrganizerLayout />}>
          <Route index element={<OrganizerDashboard />} />
          <Route path="events" element={<MyEvents />} />
          <Route path="create-event" element={<CreateEvent />} />
          <Route path="participants" element={<Participants />} />
          <Route path="promotion" element={<Promotion />} />
          <Route path="analytics" element={<div>Analytics Page (Coming Soon)</div>} />
          <Route path="revenue" element={<div>Revenue Page (Coming Soon)</div>} />
          <Route path="settings" element={<div>Organizer Settings (Coming Soon)</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;