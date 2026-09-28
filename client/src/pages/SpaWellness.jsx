import { useEffect, useState } from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import { ServiceAPI } from '../api/services';

export default function SpaWellness() {
  const [services, setServices] = useState([]);
  useEffect(() => {
    ServiceAPI.list('Spa Treatments').then(setServices).catch(() => {});
  }, []);
  return (
    <div>
      <section className="relative h-72 flex items-center justify-center text-center">
        <img src="https://picsum.photos/seed/spa-hero/1600/600" className="absolute inset-0 w-full h-full object-cover" alt="Spa relaxation room" />
        <div className="absolute inset-0 bg-charcoal/50" />
        <h1 className="relative font-display text-4xl text-cream">Spa & Wellness</h1>
      </section>
      <section className="max-w-7xl mx-auto px-6 py-16">
        <SectionHeading title="Your Personal Escape Into Relaxation" />
        {services.length === 0 ? (
          <p className="text-center text-mocha">Spa treatments coming soon.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <ServiceCard key={s._id} service={s} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
