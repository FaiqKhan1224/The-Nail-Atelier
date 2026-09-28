import { Link } from 'react-router-dom';

export default function ServiceCard({ service }) {
  return (
    <div className="bg-cream border border-beige rounded-sm overflow-hidden group">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg text-charcoal">{service.name}</h3>
        <p className="text-sm text-mocha mt-1">
          ${service.price} · {service.duration} mins
        </p>
        <Link to={`/services/${service._id}`} className="inline-block mt-4 text-xs tracking-widest uppercase text-gold hover:text-charcoal">
          Book Now
        </Link>
      </div>
    </div>
  );
}
