import { useEffect, useState } from 'react';
import { AppointmentAPI } from '../../api/services';

const statuses = ['pending', 'confirmed', 'completed', 'cancelled'];

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const load = () => AppointmentAPI.adminList().then(setAppointments).catch(() => {});
  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id, status) => {
    await AppointmentAPI.updateStatus(id, status);
    load();
  };

  return (
    <div>
      <h1 className="font-display text-3xl mb-8">Appointments</h1>
      <div className="bg-cream border border-beige rounded-sm overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead className="bg-beige/40 text-left text-mocha">
            <tr>
              <th className="p-3">Customer</th>
              <th className="p-3">Service</th>
              <th className="p-3">Date</th>
              <th className="p-3">Time</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a._id} className="border-t border-beige/60">
                <td className="p-3">
                  {a.customer?.name}
                  <div className="text-xs text-mocha">{a.customer?.email}</div>
                </td>
                <td className="p-3">{a.service?.name}</td>
                <td className="p-3">{a.date}</td>
                <td className="p-3">{a.time}</td>
                <td className="p-3">${a.totalPrice}</td>
                <td className="p-3">
                  <select value={a.status} onChange={(e) => updateStatus(a._id, e.target.value)} className="border border-beige rounded-sm p-1 text-xs">
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {appointments.length === 0 && <p className="p-6 text-mocha text-sm">No appointments yet.</p>}
      </div>
    </div>
  );
}
