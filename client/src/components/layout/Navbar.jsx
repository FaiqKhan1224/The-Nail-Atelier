import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import Logo from './Logo';
import { useAuth } from '../../context/AuthContext';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/bridal', label: 'Packages' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const accountLink = user
    ? (user.role === 'admin' ? '/admin' : '/dashboard')
    : '/login';

  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur border-b border-beige">

      {/* COMPACT HEADER */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/">
          <Logo />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-6">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `text-[13px] tracking-wide hover:text-gold transition-colors ${
                  isActive ? 'text-gold' : 'text-charcoal'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* DESKTOP ACTIONS */}
        <div className="hidden lg:flex items-center gap-4">

          <Link
            to={accountLink}
            className="flex items-center gap-1.5 text-[13px] text-charcoal hover:text-gold transition-colors"
          >
            <User size={16} />
            {user ? user.name.split(' ')[0] : 'Login'}
          </Link>

          <Link
            to="/booking"
            className="px-4 py-2 bg-gold text-cream text-[13px] tracking-wide rounded-sm hover:bg-charcoal transition-colors"
          >
            Book Appointment
          </Link>

        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="lg:hidden text-charcoal"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="lg:hidden bg-cream border-t border-beige px-5 py-3 flex flex-col gap-3">

          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="text-charcoal text-sm py-1 hover:text-gold transition-colors"
            >
              {l.label}
            </Link>
          ))}

          <Link
            to={accountLink}
            onClick={() => setOpen(false)}
            className="text-charcoal text-sm py-1 hover:text-gold transition-colors"
          >
            {user ? 'My Account' : 'Login'}
          </Link>

          <Link
            to="/booking"
            onClick={() => setOpen(false)}
            className="px-4 py-2 bg-gold text-cream text-sm text-center rounded-sm hover:bg-charcoal transition-colors"
          >
            Book Appointment
          </Link>

        </div>
      )}

    </header>
  );
}