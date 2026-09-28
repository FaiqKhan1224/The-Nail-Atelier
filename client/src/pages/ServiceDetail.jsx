import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import Loading from '../components/ui/Loading';
import { ServiceAPI } from '../api/services';

export default function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    ServiceAPI.get(id).then(setService).catch(() => setNotFound(true));
  }, [id]);

  if (notFound) return <p className="text-center py-24 text-mocha">Service not found.</p>;
  if (!service) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-14">
      <img src={service.image} alt={service.name} className="rounded-sm w-full h-[420px] object-cover" />
      <div>
        <h1 className="font-display text-4xl text-charcoal mb-2">{service.name}</h1>
        <p className="text-gold text-lg mb-6">
          ${service.price} · {service.duration} mins
        </p>
        <Button to={`/booking?service=${service._id}`}>Book Now</Button>
        <p className="text-mocha mt-8 leading-relaxed">{service.description}</p>

        {service.benefits?.length > 0 && (
          <div className="mt-8">
            <h3 className="font-display text-lg mb-3">Benefits</h3>
            <ul className="text-sm text-mocha space-y-1 list-disc list-inside">
              {service.benefits.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        )}
        {service.addOns?.length > 0 && (
          <div className="mt-8">
            <h3 className="font-display text-lg mb-3">Optional Add-ons</h3>
            <ul className="text-sm text-mocha space-y-1">
              {service.addOns.map((a, i) => (
                <li key={i}>
                  + {a.name} — ${a.price}
                </li>
              ))}
            </ul>
          </div>
        )}
        {service.aftercare?.length > 0 && (
          <div className="mt-8">
            <h3 className="font-display text-lg mb-3">Aftercare</h3>
            <ul className="text-sm text-mocha space-y-1 list-disc list-inside">
              {service.aftercare.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
