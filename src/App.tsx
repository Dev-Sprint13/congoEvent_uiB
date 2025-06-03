import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { EventsPage } from './pages/EventsPage';
import { EventDetailPage } from './pages/EventDetailPage';
import { LoginPage } from './pages/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { EventManagement } from './pages/admin/EventManagement';
import { UserManagement } from './pages/admin/UserManagement';
import { Reports } from './pages/admin/Reports';
import { Settings } from './pages/admin/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/events" element={<EventManagement />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;