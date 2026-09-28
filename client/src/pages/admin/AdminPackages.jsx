import AdminResourceTable from '../../components/admin/AdminResourceTable';
import { PackageAPI } from '../../api/services';

export default function AdminPackages() {
  return (
    <AdminResourceTable
      title="Bridal Packages"
      api={{ list: PackageAPI.adminList, create: PackageAPI.create, update: PackageAPI.update, remove: PackageAPI.remove }}
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'price', label: 'Price', render: (v) => `$${v}` },
        { key: 'popular', label: 'Popular', render: (v) => (v ? 'Yes' : 'No') },
      ]}
      fields={[
        { name: 'name', label: 'Name', required: true },
        { name: 'price', label: 'Price ($)', type: 'number', required: true },
        { name: 'includes', label: 'Includes (one per line)', type: 'list' },
        { name: 'image', label: 'Image URL' },
        { name: 'popular', label: 'Mark as Most Popular', type: 'checkbox' },
        { name: 'published', label: 'Published', type: 'checkbox' },
      ]}
    />
  );
}
