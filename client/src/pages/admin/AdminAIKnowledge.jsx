import AdminResourceTable from '../../components/admin/AdminResourceTable';
import { AIKnowledgeAPI } from '../../api/services';

export default function AdminAIKnowledge() {
  return (
    <AdminResourceTable
      title="AI Knowledge (FAQs)"
      api={{ list: AIKnowledgeAPI.list, create: AIKnowledgeAPI.create, update: AIKnowledgeAPI.update, remove: AIKnowledgeAPI.remove }}
      columns={[
        { key: 'question', label: 'Question' },
        { key: 'category', label: 'Category' },
        { key: 'published', label: 'Published', render: (v) => (v ? 'Yes' : 'No') },
      ]}
      fields={[
        { name: 'question', label: 'Question', required: true },
        { name: 'answer', label: 'Answer', type: 'textarea', required: true },
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          options: ['Services', 'Pricing', 'Booking', 'Cancellation', 'Rescheduling', 'Opening Hours', 'Location', 'Payments', 'Packages', 'Promotions', 'Aftercare', 'General FAQ'],
        },
        { name: 'keywords', label: 'Keywords (one per line)', type: 'list' },
        { name: 'published', label: 'Published', type: 'checkbox' },
      ]}
    />
  );
}
