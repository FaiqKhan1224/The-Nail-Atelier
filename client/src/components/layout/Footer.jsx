import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, MapPin, Phone, Mail } from 'lucide-react';
import { SettingsAPI } from '../../api/services';

export default function Footer() {
  const [settings, setSettings] = useState(null);
  useEffect(() => {
    SettingsAPI.get().then(setSettings).catch(() => {});
  }, []);

  return (
    <footer className="bg-charcoal text-beige mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="font-display text-xl text-cream mb-2">THE NAIL ATELIER</div>
          <p className="text-sm text-beige/70">A Little Luxury. A Lot of Self-Love.</p>
          <div className="flex gap-4 mt-4">
            {settings?.social?.instagram && (
              <a href={settings.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="flex items-center gap-1.5 text-xs text-beige/70 hover:text-cream">
                <Globe size={16} /> Instagram
              </a>
            )}
            {settings?.social?.facebook && (
              <a href={settings.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="flex items-center gap-1.5 text-xs text-beige/70 hover:text-cream">
                <Globe size={16} /> Facebook
              </a>
            )}
          </div>
        </div>
        <div>
          <div className="text-cream text-sm mb-3">Quick Links</div>
          <div className="flex flex-col gap-2 text-sm text-beige/70">
            <Link to="/about">About</Link>
            <Link to="/services">Services</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/bridal">Bridal Packages</Link>
            <Link to="/offers">Offers</Link>
          </div>
        </div>
        <div>
          <div className="text-cream text-sm mb-3">Contact</div>
          <div className="flex flex-col gap-2 text-sm text-beige/70">
            {settings?.phone && (
              <span className="flex items-center gap-2">
                <Phone size={14} />
                {settings.phone}
              </span>
            )}
            {settings?.email && (
              <span className="flex items-center gap-2">
                <Mail size={14} />
                {settings.email}
              </span>
            )}
            {settings?.address && (
              <span className="flex items-center gap-2">
                <MapPin size={14} />
                {settings.address}
              </span>
            )}
          </div>
        </div>
        <div>
          <div className="text-cream text-sm mb-3">Opening Hours</div>
          <p className="text-sm text-beige/70">{settings?.hours}</p>
        </div>
      </div>
      <div className="border-t border-beige/10 py-6 text-center text-xs text-beige/50 flex flex-col md:flex-row items-center justify-center gap-3">
        <span>© {new Date().getFullYear()} The Nail Atelier. All rights reserved.</span>
        <span className="flex gap-4">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms & Conditions</Link>
          <Link to="/cancellation-policy">Cancellation Policy</Link>
        </span>
      </div>
    </footer>
  );
}
