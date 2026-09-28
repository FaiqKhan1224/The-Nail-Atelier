
import { useEffect, useState } from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import { OfferAPI } from '../api/services';
import bannerImage from '../assets/nail and spa.png';

export default function Offers() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    OfferAPI.list().then(setOffers).catch(() => {});
  }, []);

  return (
    <div>
      <section className="relative h-64 flex items-center justify-center text-center">
        <img
          src={bannerImage}
          className="absolute inset-0 w-full h-full object-cover"
          alt="Nail and Spa Packages"
        />
        <div className="absolute inset-0 bg-charcoal/50" />
        <h1 className="relative font-display text-4xl text-cream">
          Packages
        </h1>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <SectionHeading title="Special Offers & Promotions" />

        {offers.length === 0 ? (
          <p className="text-center text-mocha">
            No active offers right now — check back soon.
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {offers.map((o) => (
              <div
                key={o._id}
                className="bg-blush/20 border border-beige rounded-sm overflow-hidden"
              >
                {o.image && (
                  <img
                    src={o.image}
                    className="w-full h-40 object-cover"
                    alt={o.title}
                  />
                )}

                <div className="p-6">
                  <div className="text-gold text-xs uppercase tracking-widest mb-2">
                    {o.discountLabel}
                  </div>

                  <h3 className="font-display text-xl mb-2">
                    {o.title}
                  </h3>

                  <p className="text-sm text-mocha mb-3">
                    {o.description}
                  </p>

                  {o.code && (
                    <p className="text-xs text-charcoal">
                      Code: <span className="font-medium">{o.code}</span>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}