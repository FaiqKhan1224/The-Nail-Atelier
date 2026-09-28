import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarCheck,
  Sparkles,
  Image,
  Tag,
  Gift,
  Star,
  BrainCircuit,
  MessageSquare,
  Settings,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/appointments', label: 'Appointments', icon: CalendarCheck },
  { to: '/admin/services', label: 'Services', icon: Sparkles },
  { to: '/admin/gallery', label: 'Gallery', icon: Image },
  { to: '/admin/offers', label: 'Offers', icon: Tag },
  { to: '/admin/packages', label: 'Bridal Packages', icon: Gift },
  { to: '/admin/reviews', label: 'Reviews', icon: Star },
  { to: '/admin/ai-knowledge', label: 'AI Knowledge', icon: BrainCircuit },
  { to: '/admin/messages', label: 'Messages', icon: MessageSquare },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-ivory flex">
      <aside className="w-64 bg-charcoal text-beige p-6 hidden md:block">
        <div className="font-display text-lg text-cream mb-8">Atelier Admin</div>
        <nav className="space-y-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-sm text-sm ${isActive ? 'bg-gold text-charcoal' : 'text-beige/80 hover:bg-cream/10'}`}
            >
              <l.icon size={17} /> {l.label}
            </NavLink>
          ))}
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="flex items-center gap-3 px-4 py-2.5 rounded-sm text-sm text-beige/80 hover:bg-cream/10 w-full mt-4"
          >
            <LogOut size={17} /> Logout
          </button>
        </nav>
      </aside>
      <main className="flex-1 p-6 md:p-10 overflow-x-auto">
        <Outlet />
      </main>
    </div>
  );
}
