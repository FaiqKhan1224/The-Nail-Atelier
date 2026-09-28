import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <h1 className="font-display text-3xl text-center mb-8">Create Your Account</h1>
      <form onSubmit={submit} className="bg-cream border border-beige rounded-sm p-8 space-y-4">
        <input required placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-beige rounded-sm p-3" />
        <input
          required
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border border-beige rounded-sm p-3"
        />
        <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border border-beige rounded-sm p-3" />
        <input
          required
          type="password"
          minLength={6}
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full border border-beige rounded-sm p-3"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" className="w-full">Create Account</Button>
      </form>
      <p className="text-center text-sm text-mocha mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-gold underline">
          Login
        </Link>
      </p>
    </div>
  );
}
