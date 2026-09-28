import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

export default function AdminResourceTable({ title, columns, fields, api, allowCreate = true }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  const load = () =>
    api
      .list()
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openNew = () => {
    const initial = {};
    fields.forEach((f) => {
      initial[f.name] = f.type === 'checkbox' ? false : '';
    });
    setForm(initial);
    setEditing({});
  };

  const openEdit = (item) => {
    const initial = {};
    fields.forEach((f) => {
      let v = item[f.name];
      if (f.type === 'list') v = Array.isArray(v) ? v.join('\n') : '';
      initial[f.name] = v ?? (f.type === 'checkbox' ? false : '');
    });
    setForm(initial);
    setEditing(item);
  };

  const close = () => {
    setEditing(null);
    setForm({});
  };

  const save = async (e) => {
    e.preventDefault();
    const payload = { ...form };
    fields.forEach((f) => {
      if (f.type === 'list') payload[f.name] = (form[f.name] || '').split('\n').map((s) => s.trim()).filter(Boolean);
      if (f.type === 'number') payload[f.name] = Number(form[f.name]) || 0;
    });
    if (editing._id) await api.update(editing._id, payload);
    else await api.create(payload);
    close();
    load();
  };

  const remove = async (id) => {
    if (!confirm('Delete this item?')) return;
    await api.remove(id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl">{title}</h1>
        {allowCreate && (
          <button onClick={openNew} className="flex items-center gap-2 px-4 py-2.5 bg-gold text-cream text-sm rounded-sm hover:bg-charcoal">
            <Plus size={16} /> Add New
          </button>
        )}
      </div>

      <div className="bg-cream border border-beige rounded-sm overflow-x-auto">
        {loading ? (
          <p className="p-6 text-mocha text-sm">Loading…</p>
        ) : (
          <table className="w-full text-sm min-w-[600px]">
            <thead className="bg-beige/40 text-left text-mocha">
              <tr>
                {columns.map((c) => (
                  <th key={c.key} className="p-3">
                    {c.label}
                  </th>
                ))}
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-t border-beige/60">
                  {columns.map((c) => (
                    <td key={c.key} className="p-3">
                      {c.render ? c.render(item[c.key], item) : String(item[c.key] ?? '')}
                    </td>
                  ))}
                  <td className="p-3 flex gap-3">
                    <button onClick={() => openEdit(item)} className="text-gold" aria-label="Edit">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => remove(item._id)} className="text-red-500" aria-label="Delete">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!loading && items.length === 0 && <p className="p-6 text-mocha text-sm">Nothing here yet.</p>}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-charcoal/50 z-50 flex items-center justify-center p-6" onClick={close}>
          <form onSubmit={save} onClick={(e) => e.stopPropagation()} className="bg-ivory rounded-sm p-8 w-full max-w-lg max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-display text-xl">
                {editing._id ? 'Edit' : 'Add'} {title.replace(/s$/, '')}
              </h3>
              <button type="button" onClick={close} aria-label="Close">
                <X size={20} />
              </button>
            </div>
            {fields.map((f) => (
              <div key={f.name} className="mb-4">
                <label className="text-xs text-mocha block mb-1">{f.label}</label>
                {f.type === 'textarea' || f.type === 'list' ? (
                  <textarea
                    rows={f.type === 'list' ? 4 : 3}
                    value={form[f.name] || ''}
                    onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                    className="w-full border border-beige rounded-sm p-2 text-sm"
                    placeholder={f.type === 'list' ? 'One per line' : ''}
                  />
                ) : f.type === 'checkbox' ? (
                  <input
                    type="checkbox"
                    checked={!!form[f.name]}
                    onChange={(e) => setForm({ ...form, [f.name]: e.target.checked })}
                    className="w-4 h-4"
                  />
                ) : f.type === 'select' ? (
                  <select
                    value={form[f.name] || ''}
                    onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                    className="w-full border border-beige rounded-sm p-2 text-sm"
                  >
                    <option value="">Select…</option>
                    {f.options.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={f.type || 'text'}
                    required={f.required}
                    value={form[f.name] || ''}
                    onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                    className="w-full border border-beige rounded-sm p-2 text-sm"
                  />
                )}
              </div>
            ))}
            <button type="submit" className="w-full py-3 bg-gold text-cream rounded-sm text-sm mt-2">
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
