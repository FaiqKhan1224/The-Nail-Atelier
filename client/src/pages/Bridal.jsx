
import { useEffect, useState } from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import { PackageAPI } from '../api/services';
import bannerImage from '../assets/nail and spa.png';

export default function Bridal() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    PackageAPI.list().then(setPackages).catch(() => {});
  }, []);

  return (
    <div>
      <section className="relative h-72 flex items-center justify-center text-center">
        <img
          src={bannerImage}
          className="absolute inset-0 w-full h-full object-cover"
          alt="Bridal Packages"
        />
        <div className="absolute inset-0 bg-charcoal/50" />

        <div className="relative text-cream">
          <h1 className="font-display text-4xl mb-2">
            Bridal Packages
          </h1>
          <p>Luxury beauty for your special day.</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <SectionHeading title="Our Bridal Packages" />

        {packages.length === 0 ? (
          <p className="text-center text-mocha">
            Bridal packages coming soon — contact us for a custom quote.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {packages.map((p) => {
              const packageClass = p.popular
                ? 'border border-gold bg-blush/10 rounded-sm p-8'
                : 'border border-beige bg-cream rounded-sm p-8';

              return (
                <div key={p._id} className={packageClass}>
                  {p.popular && (
                    <div className="text-gold text-xs uppercase tracking-widest mb-2">
                      Most Popular
                    </div>
                  )}

                  <h3 className="font-display text-2xl mb-2">
                    {p.name}
                  </h3>

                  <p className="text-3xl text-charcoal mb-4">
                    ${p.price}
                  </p>

                  <ul className="text-sm text-mocha space-y-2 mb-6">
                    {p.includes.map((i, idx) => (
                      <li key={idx}>✓ {i}</li>
                    ))}
                  </ul>

                  <Button to="/booking">Book Now</Button>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
