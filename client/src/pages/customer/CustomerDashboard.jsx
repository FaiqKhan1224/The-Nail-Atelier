import { useEffect, useState } from 'react';
import Button from '../../components/ui/Button';
import { AppointmentAPI } from '../../api/services';
import { useAuth } from '../../context/AuthContext';

export default function CustomerDashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    AppointmentAPI.mine().then(setAppointments).catch(() => {});
  }, []);

  const today = new Date().toISOString().slice(0, 10);
  const upcoming = appointments.filter((a) => a.status !== 'cancelled' && a.date >= today).slice(0, 3);

  return (
    <div>
      <h1 className="font-display text-3xl mb-2">Welcome back, {user?.name?.split(' ')[0]}</h1>
      <p className="text-mocha mb-10">Here's what's coming up.</p>

      <div className="grid sm:grid-cols-2 gap-6 mb-10">
        <div className="bg-cream border border-beige rounded-sm p-6">
          <h3 className="font-display text-lg mb-4">Upcoming Appointments</h3>
          {upcoming.length === 0 ? (
            <p className="text-sm text-mocha">No upcoming appointments.</p>
          ) : (
            <ul className="space-y-3">
              {upcoming.map((a) => (
                <li key={a._id} className="text-sm">
                  <span className="font-medium text-charcoal">{a.service?.name}</span> — {a.date} at {a.time}
                  <span className="ml-2 text-xs uppercase text-gold">{a.status}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="bg-cream border border-beige rounded-sm p-6">
          <h3 className="font-display text-lg mb-4">Quick Actions</h3>
          <div className="flex flex-col gap-3">
            <Button to="/booking">Book Appointment</Button>
            <Button to="/dashboard/appointments" variant="outline">View All Appointments</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
