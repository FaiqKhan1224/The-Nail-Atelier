import { useEffect, useState } from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import { SettingsAPI, ContactAPI } from '../api/services';

export default function Contact() {
  const [settings, setSettings] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('');

  useEffect(() => {
    SettingsAPI.get().then(setSettings).catch(() => {});
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await ContactAPI.send(form);
      setStatus("Thank you — we'll be in touch soon.");
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setStatus(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-14">
      <div>
        <SectionHeading title="Contact Us" center={false} />
        <div className="space-y-3 text-mocha text-sm mb-8">
          {settings?.address && <p>{settings.address}</p>}
          {settings?.phone && <p>{settings.phone}</p>}
          {settings?.email && <p>{settings.email}</p>}
          {settings?.hours && <p>{settings.hours}</p>}
        </div>
        {settings?.address && (
          <iframe
            title="map"
            className="w-full h-64 rounded-sm border border-beige"
            src={`https://www.google.com/maps?q=${encodeURIComponent(settings.address)}&output=embed`}
          />
        )}
      </div>
      <form onSubmit={submit} className="bg-cream border border-beige rounded-sm p-8 h-fit">
        <h3 className="font-display text-xl mb-4">Send Us a Message</h3>
        <div className="space-y-4">
          <input required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-beige rounded-sm p-3" />
          <input
            required
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-beige rounded-sm p-3"
          />
          <input placeholder="Phone (optional)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border border-beige rounded-sm p-3" />
          <textarea
            required
            rows={4}
            placeholder="Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full border border-beige rounded-sm p-3"
          />
          <Button type="submit" className="w-full">Send Message</Button>
          {status && <p className="text-sm text-mocha">{status}</p>}
        </div>
      </form>
    </div>
  );
}
