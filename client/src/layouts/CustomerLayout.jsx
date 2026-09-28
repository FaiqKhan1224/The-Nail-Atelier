import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CalendarCheck, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/dashboard/appointments', label: 'My Appointments', icon: CalendarCheck },
  { to: '/dashboard/profile', label: 'Profile', icon: User },
];

export default function CustomerLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-ivory flex">
      <aside className="w-64 bg-cream border-r border-beige p-6 hidden md:block">
        <div className="font-display text-lg mb-8">THE NAIL ATELIER</div>
        <p className="text-sm text-mocha mb-6">Welcome, {user?.name?.split(' ')[0]}</p>
        <nav className="space-y-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-sm text-sm ${isActive ? 'bg-gold/20 text-charcoal' : 'text-mocha hover:bg-beige/40'}`}
            >
              <l.icon size={18} /> {l.label}
            </NavLink>
          ))}
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="flex items-center gap-3 px-4 py-3 rounded-sm text-sm text-mocha hover:bg-beige/40 w-full"
          >
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </aside>
      <main className="flex-1 p-6 md:p-10">
        <Outlet />
      </main>
    </div>
  );
}
