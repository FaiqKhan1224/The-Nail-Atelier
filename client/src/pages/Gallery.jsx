import { useEffect, useState } from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import GalleryLightbox from '../components/GalleryLightbox';
import { GalleryAPI } from '../api/services';

const categories = ['All', 'French Nails', 'Bridal Nails', 'Chrome Nails', 'Minimalist Nails', 'Creative Nail Art', 'Spa Interior'];

export default function Gallery() {
  const [active, setActive] = useState('All');
  const [items, setItems] = useState([]);

  useEffect(() => {
    GalleryAPI.list(active === 'All' ? undefined : active)
      .then(setItems)
      .catch(() => setItems([]));
  }, [active]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <SectionHeading title="Nail Artistry Gallery" />
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`px-4 py-2 text-xs rounded-full border ${active === c ? 'bg-charcoal text-cream border-charcoal' : 'border-beige text-mocha'}`}
          >
            {c}
          </button>
        ))}
      </div>
      {items.length === 0 ? <p className="text-center text-mocha">No images in this category yet.</p> : <GalleryLightbox items={items} />}
    </div>
  );
}
