import AdminResourceTable from '../../components/admin/AdminResourceTable';
import { ServiceAPI } from '../../api/services';

export default function AdminServices() {
  return (
    <AdminResourceTable
      title="Services"
      api={{ list: ServiceAPI.adminList, create: ServiceAPI.create, update: ServiceAPI.update, remove: ServiceAPI.remove }}
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'category', label: 'Category' },
        { key: 'price', label: 'Price', render: (v) => `$${v}` },
        { key: 'published', label: 'Published', render: (v) => (v ? 'Yes' : 'No') },
      ]}
      fields={[
        { name: 'name', label: 'Name', required: true },
        { name: 'category', label: 'Category', type: 'select', options: ['Nail Treatments', 'Spa Treatments'], required: true },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'price', label: 'Price ($)', type: 'number', required: true },
        { name: 'duration', label: 'Duration (mins)', type: 'number', required: true },
        { name: 'image', label: 'Image URL' },
        { name: 'benefits', label: 'Benefits (one per line)', type: 'list' },
        { name: 'aftercare', label: 'Aftercare (one per line)', type: 'list' },
        { name: 'featured', label: 'Featured on Home Page', type: 'checkbox' },
        { name: 'published', label: 'Published', type: 'checkbox' },
      ]}
    />
  );
}
