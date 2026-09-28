import { useState } from 'react';
import { X } from 'lucide-react';

export default function GalleryLightbox({ items }) {
  const [active, setActive] = useState(null);
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <button key={item._id} onClick={() => setActive(item)} className="aspect-square overflow-hidden rounded-sm">
            <img
              src={item.image}
              alt={item.caption}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </button>
        ))}
      </div>
      {active && (
        <div className="fixed inset-0 bg-charcoal/90 z-50 flex items-center justify-center p-6" onClick={() => setActive(null)}>
          <button className="absolute top-6 right-6 text-cream" onClick={() => setActive(null)} aria-label="Close">
            <X size={28} />
          </button>
          <img
            src={active.image}
            alt={active.caption}
            className="max-h-[85vh] max-w-full rounded-sm"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
