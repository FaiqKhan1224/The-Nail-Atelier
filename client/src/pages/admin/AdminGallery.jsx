import AdminResourceTable from '../../components/admin/AdminResourceTable';
import { GalleryAPI } from '../../api/services';

export default function AdminGallery() {
  return (
    <AdminResourceTable
      title="Gallery"
      api={{ list: GalleryAPI.list, create: GalleryAPI.create, update: GalleryAPI.update, remove: GalleryAPI.remove }}
      columns={[
        { key: 'category', label: 'Category' },
        { key: 'caption', label: 'Caption' },
      ]}
      fields={[
        { name: 'image', label: 'Image URL', required: true },
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          options: ['French Nails', 'Bridal Nails', 'Chrome Nails', 'Minimalist Nails', 'Creative Nail Art', 'Spa Interior'],
          required: true,
        },
        { name: 'caption', label: 'Caption' },
      ]}
    />
  );
}
