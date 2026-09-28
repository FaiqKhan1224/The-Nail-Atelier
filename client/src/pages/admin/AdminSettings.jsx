import { useEffect, useState } from 'react';
import Button from '../../components/ui/Button';
import { SettingsAPI } from '../../api/services';

export default function AdminSettings() {
  const [settings, setSettings] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    SettingsAPI.get().then(setSettings);
  }, []);

  const update = (path, value) => {
    setSettings((prev) => {
      const next = { ...prev };
      const keys = path.split('.');
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
      obj[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const save = async (e) => {
    e.preventDefault();
    try {
      const updated = await SettingsAPI.update(settings);
      setSettings(updated);
      setStatus('Settings saved.');
    } catch (err) {
      setStatus('Could not save settings.');
    }
  };

  if (!settings) return <p className="text-mocha">Loading…</p>;

  const Field = ({ label, path, textarea, type = 'text' }) => {
    const keys = path.split('.');
    const value = keys.reduce((o, k) => o?.[k], settings) ?? '';
    return (
      <div className="mb-4">
        <label className="text-xs text-mocha block mb-1">{label}</label>
        {textarea ? (
          <textarea rows={3} value={value} onChange={(e) => update(path, e.target.value)} className="w-full border border-beige rounded-sm p-2 text-sm" />
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => update(path, type === 'number' ? Number(e.target.value) : e.target.value)}
            className="w-full border border-beige rounded-sm p-2 text-sm"
          />
        )}
      </div>
    );
  };

  return (
    <form onSubmit={save} className="max-w-3xl">
      <h1 className="font-display text-3xl mb-8">Business Settings</h1>

      <div className="bg-cream border border-beige rounded-sm p-6 mb-6">
        <h3 className="font-display text-lg mb-4">Business Information</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Business Name" path="name" />
          <Field label="Tagline" path="tagline" />
          <Field label="Phone" path="phone" />
          <Field label="Email" path="email" />
          <Field label="Address" path="address" />
          <Field label="Hours (display text)" path="hours" />
          <Field label="Opening Hour (24h)" path="openHour" type="number" />
          <Field label="Closing Hour (24h)" path="closeHour" type="number" />
          <Field label="Instagram URL" path="social.instagram" />
          <Field label="Facebook URL" path="social.facebook" />
        </div>
      </div>

      <div className="bg-cream border border-beige rounded-sm p-6 mb-6">
        <h3 className="font-display text-lg mb-4">Policies</h3>
        <Field label="Cancellation Policy" path="policies.cancellation" textarea />
        <Field label="Rescheduling Policy" path="policies.rescheduling" textarea />
        <Field label="Deposit Policy" path="policies.deposit" textarea />
        <Field label="Late Arrival Policy" path="policies.lateArrival" textarea />
        <Field label="Payment Policy" path="policies.payment" textarea />
      </div>

      <div className="bg-cream border border-beige rounded-sm p-6 mb-6">
        <h3 className="font-display text-lg mb-4">Legal Pages</h3>
        <Field label="Privacy Policy" path="privacyPolicy" textarea />
        <Field label="Terms & Conditions" path="termsAndConditions" textarea />
        <Field label="Cancellation Policy Page" path="cancellationPolicyPage" textarea />
      </div>

      <div className="bg-cream border border-beige rounded-sm p-6 mb-6">
        <h3 className="font-display text-lg mb-4">Atelier AI Configuration</h3>
        <Field label="Assistant Name" path="aiConfig.assistantName" />
        <Field label="Subtitle" path="aiConfig.subtitle" />
        <Field label="Welcome Message" path="aiConfig.welcomeMessage" textarea />
        <Field label="Fallback Message" path="aiConfig.fallbackMessage" textarea />
        <Field label="Human Handoff Message" path="aiConfig.humanHandoffMessage" textarea />
      </div>

      <Button type="submit">Save Settings</Button>
      {status && <p className="text-sm text-mocha mt-3">{status}</p>}
    </form>
  );
}
