import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const user = await login(form.email, form.password);
      navigate(user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <h1 className="font-display text-3xl text-center mb-8">Welcome Back</h1>
      <form onSubmit={submit} className="bg-cream border border-beige rounded-sm p-8 space-y-4">
        <input
          required
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border border-beige rounded-sm p-3"
        />
        <input
          required
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full border border-beige rounded-sm p-3"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" className="w-full">Login</Button>
      </form>
      <p className="text-center text-sm text-mocha mt-6">
        New here?{' '}
        <Link to="/register" className="text-gold underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
