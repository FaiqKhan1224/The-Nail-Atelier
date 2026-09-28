import { useState } from 'react';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { AuthAPI } from '../../api/services';

export default function Profile() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', phone: user?.phone || '' });
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '' });
  const [status, setStatus] = useState('');
  const [pwStatus, setPwStatus] = useState('');

  const saveProfile = async (e) => {
    e.preventDefault();
    try {
      const { user: updated } = await AuthAPI.updateMe(form);
      setUser(updated);
      setStatus('Profile updated.');
    } catch (err) {
      setStatus(err.response?.data?.message || 'Update failed.');
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    try {
      await AuthAPI.changePassword(pwForm);
      setPwStatus('Password updated.');
      setPwForm({ currentPassword: '', newPassword: '' });
    } catch (err) {
      setPwStatus(err.response?.data?.message || 'Update failed.');
    }
  };

  return (
    <div className="max-w-lg space-y-10">
      <div>
        <h1 className="font-display text-3xl mb-6">Profile</h1>
        <form onSubmit={saveProfile} className="bg-cream border border-beige rounded-sm p-6 space-y-4">
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-beige rounded-sm p-3" placeholder="Name" />
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border border-beige rounded-sm p-3" placeholder="Phone" />
          <input value={user?.email} disabled className="w-full border border-beige rounded-sm p-3 bg-beige/20 text-mocha" />
          <Button type="submit">Save Changes</Button>
          {status && <p className="text-sm text-mocha">{status}</p>}
        </form>
      </div>
      <div>
        <h2 className="font-display text-xl mb-4">Change Password</h2>
        <form onSubmit={changePassword} className="bg-cream border border-beige rounded-sm p-6 space-y-4">
          <input
            required
            type="password"
            placeholder="Current Password"
            value={pwForm.currentPassword}
            onChange={(e) => setPwForm({ ...pwForm, currentPassword: e.target.value })}
            className="w-full border border-beige rounded-sm p-3"
          />
          <input
            required
            type="password"
            minLength={6}
            placeholder="New Password"
            value={pwForm.newPassword}
            onChange={(e) => setPwForm({ ...pwForm, newPassword: e.target.value })}
            className="w-full border border-beige rounded-sm p-3"
          />
          <Button type="submit">Update Password</Button>
          {pwStatus && <p className="text-sm text-mocha">{pwStatus}</p>}
        </form>
      </div>
    </div>
  );
}
