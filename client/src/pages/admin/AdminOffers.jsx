import AdminResourceTable from '../../components/admin/AdminResourceTable';
import { OfferAPI } from '../../api/services';

export default function AdminOffers() {
  return (
    <AdminResourceTable
      title="Offers"
      api={{ list: OfferAPI.adminList, create: OfferAPI.create, update: OfferAPI.update, remove: OfferAPI.remove }}
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'discountLabel', label: 'Discount' },
        { key: 'active', label: 'Active', render: (v) => (v ? 'Yes' : 'No') },
      ]}
      fields={[
        { name: 'title', label: 'Title', required: true },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'discountLabel', label: 'Discount Label (e.g. 20% OFF)' },
        { name: 'code', label: 'Promo Code' },
        { name: 'image', label: 'Image URL' },
        { name: 'startDate', label: 'Start Date', type: 'date', required: true },
        { name: 'endDate', label: 'End Date', type: 'date', required: true },
        { name: 'active', label: 'Active', type: 'checkbox' },
      ]}
    />
  );
}
