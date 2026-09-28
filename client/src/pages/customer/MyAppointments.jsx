import { useEffect, useState } from 'react';
import Button from '../../components/ui/Button';
import { AppointmentAPI } from '../../api/services';

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  const load = () => AppointmentAPI.mine().then(setAppointments).catch(() => {});
  useEffect(() => {
    load();
  }, []);

  const cancel = async (id) => {
    if (!confirm('Cancel this appointment?')) return;
    await AppointmentAPI.cancel(id);
    load();
  };

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h1 className="font-display text-3xl">My Appointments</h1>
        <Button to="/booking">Book Appointment</Button>
      </div>
      <div className="space-y-4">
        {appointments.length === 0 && <p className="text-mocha">No appointments yet.</p>}
        {appointments.map((a) => (
          <div key={a._id} className="bg-cream border border-beige rounded-sm p-5 flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="font-medium text-charcoal">{a.service?.name}</div>
              <div className="text-sm text-mocha">
                {a.date} at {a.time} · ${a.totalPrice}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-wide px-3 py-1 rounded-full bg-beige/50 text-charcoal">{a.status}</span>
              {['pending', 'confirmed'].includes(a.status) && a.date >= today && (
                <button onClick={() => cancel(a._id)} className="text-xs text-red-600 underline">
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
