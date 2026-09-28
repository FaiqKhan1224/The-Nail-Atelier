import { Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import CustomerLayout from './layouts/CustomerLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Gallery from './pages/Gallery';
import SpaWellness from './pages/SpaWellness';
import Bridal from './pages/Bridal';
import Offers from './pages/Offers';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import BookingFlow from './pages/booking/BookingFlow';

import CustomerDashboard from './pages/customer/CustomerDashboard';
import MyAppointments from './pages/customer/MyAppointments';
import Profile from './pages/customer/Profile';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAppointments from './pages/admin/AdminAppointments';
import AdminServices from './pages/admin/AdminServices';
import AdminGallery from './pages/admin/AdminGallery';
import AdminOffers from './pages/admin/AdminOffers';
import AdminPackages from './pages/admin/AdminPackages';
import AdminReviews from './pages/admin/AdminReviews';
import AdminAIKnowledge from './pages/admin/AdminAIKnowledge';
import AdminMessages from './pages/admin/AdminMessages';
import AdminSettings from './pages/admin/AdminSettings';

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/spa-wellness" element={<SpaWellness />} />
        <Route path="/bridal" element={<Bridal />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Legal type="privacy" />} />
        <Route path="/terms" element={<Legal type="terms" />} />
        <Route path="/cancellation-policy" element={<Legal type="cancellation" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              <BookingFlow />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <CustomerLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<CustomerDashboard />} />
        <Route path="appointments" element={<MyAppointments />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="appointments" element={<AdminAppointments />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="gallery" element={<AdminGallery />} />
        <Route path="offers" element={<AdminOffers />} />
        <Route path="packages" element={<AdminPackages />} />
        <Route path="reviews" element={<AdminReviews />} />
        <Route path="ai-knowledge" element={<AdminAIKnowledge />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
