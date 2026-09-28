import { useEffect, useState } from 'react';
import { ContactAPI } from '../../api/services';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const load = () => ContactAPI.adminList().then(setMessages).catch(() => {});
  useEffect(() => {
    load();
  }, []);

  const markRead = async (id) => {
    await ContactAPI.updateStatus(id, 'read');
    load();
  };
  const remove = async (id) => {
    if (confirm('Delete this message?')) {
      await ContactAPI.remove(id);
      load();
    }
  };

  return (
    <div>
      <h1 className="font-display text-3xl mb-8">Contact Messages</h1>
      <div className="space-y-3">
        {messages.map((m) => (
          <div key={m._id} className="bg-cream border border-beige rounded-sm p-5 flex justify-between items-start gap-4 flex-wrap">
            <div>
              <div className="font-medium text-charcoal">
                {m.name} <span className="text-xs text-mocha">({m.email}{m.phone ? `, ${m.phone}` : ''})</span>
              </div>
              <p className="text-sm text-mocha mt-1">{m.message}</p>
              <div className="text-xs text-mocha/60 mt-1">{new Date(m.createdAt).toLocaleString()}</div>
            </div>
            <div className="flex gap-2 items-center">
              <span className={`text-xs px-2 py-1 rounded-full ${m.status === 'new' ? 'bg-gold/20 text-charcoal' : 'bg-beige/50 text-mocha'}`}>{m.status}</span>
              {m.status === 'new' && (
                <button onClick={() => markRead(m._id)} className="text-xs text-gold underline">
                  Mark Read
                </button>
              )}
              <button onClick={() => remove(m._id)} className="text-xs text-red-600 underline">
                Delete
              </button>
            </div>
          </div>
        ))}
        {messages.length === 0 && <p className="text-mocha text-sm">No messages yet.</p>}
      </div>
    </div>
  );
}
