import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SectionHeading from '../components/ui/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import Loading from '../components/ui/Loading';
import { ServiceAPI } from '../api/services';
import bannerImage from '../assets/Banner.png';

const categories = ['All', 'Nail Treatments', 'Spa Treatments'];

export default function Services() {
  const [params, setParams] = useSearchParams();
  const active = params.get('category') || 'All';
  const [services, setServices] = useState(null);

  useEffect(() => {
    setServices(null);
    ServiceAPI.list(active === 'All' ? undefined : active)
      .then(setServices)
      .catch(() => setServices([]));
  }, [active]);

  return (
    <div>
      <section className="relative h-64 flex items-center justify-center text-center">
        <img
          src={bannerImage}
          className="absolute inset-0 w-full h-full object-cover"
          alt="Nail treatment in progress"
        />
        <div className="absolute inset-0 bg-charcoal/50" />
        <h1 className="relative font-display text-4xl text-cream">
          Our Services
        </h1>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <SectionHeading title="Premium Nail & Spa Treatments" />

        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {categories.map((c) => {
            const buttonClass =
              active === c
                ? 'px-5 py-2 text-sm rounded-full border bg-charcoal text-cream border-charcoal'
                : 'px-5 py-2 text-sm rounded-full border border-beige text-mocha';

            return (
              <button
                key={c}
                onClick={() =>
                  setParams(c === 'All' ? {} : { category: c })
                }
                className={buttonClass}
              >
                {c}
              </button>
            );
          })}
        </div>

        {!services ? (
          <Loading />
        ) : services.length === 0 ? (
          <p className="text-center text-mocha">
            No services found in this category yet.
          </p>
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