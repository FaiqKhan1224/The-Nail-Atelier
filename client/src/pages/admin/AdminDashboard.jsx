import { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { AdminAPI } from '../../api/services';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  useEffect(() => {
    AdminAPI.stats().then(setStats).catch(() => {});
  }, []);

  if (!stats) return <p className="text-mocha">Loading dashboard…</p>;

  const cards = [
    { label: "Today's Appointments", value: stats.todayAppointments },
    { label: 'Pending Bookings', value: stats.pendingBookings },
    { label: 'Confirmed Bookings', value: stats.confirmedBookings },
    { label: 'Customers', value: stats.totalCustomers },
    { label: 'Revenue', value: `$${stats.revenue.toLocaleString()}` },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl mb-8">Dashboard Overview</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        {cards.map((c) => (
          <div key={c.label} className="bg-cream border border-beige rounded-sm p-5">
            <div className="text-2xl font-display text-charcoal">{c.value}</div>
            <div className="text-xs text-mocha mt-1">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-cream border border-beige rounded-sm p-6">
          <h3 className="font-display text-lg mb-4">Appointments (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={stats.last7Days}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EADDD8" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="appointments" fill="#C4A484" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-cream border border-beige rounded-sm p-6">
          <h3 className="font-display text-lg mb-4">Revenue (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={stats.last7Days}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EADDD8" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#211C1C" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-cream border border-beige rounded-sm p-6">
        <h3 className="font-display text-lg mb-4">Popular Services</h3>
        {stats.popularServices.length === 0 ? (
          <p className="text-sm text-mocha">Not enough data yet.</p>
        ) : (
          <ul className="space-y-2">
            {stats.popularServices.map((p) => (
              <li key={p.name} className="flex justify-between text-sm border-b border-beige/60 pb-2">
                <span>{p.name}</span>
                <span className="text-mocha">{p.count} bookings</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
