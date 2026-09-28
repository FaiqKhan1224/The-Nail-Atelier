import { useEffect, useState } from 'react';
import { ReviewAPI } from '../../api/services';

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const load = () => ReviewAPI.adminList().then(setReviews).catch(() => {});
  useEffect(() => {
    load();
  }, []);

  const setApproved = async (id, approved) => {
    await ReviewAPI.updateStatus(id, approved);
    load();
  };
  const remove = async (id) => {
    if (confirm('Delete this review?')) {
      await ReviewAPI.remove(id);
      load();
    }
  };

  return (
    <div>
      <h1 className="font-display text-3xl mb-8">Reviews</h1>
      <div className="space-y-3">
        {reviews.map((r) => (
          <div key={r._id} className="bg-cream border border-beige rounded-sm p-5 flex justify-between items-start gap-4 flex-wrap">
            <div>
              <div className="text-gold text-sm">{'★'.repeat(r.rating)}</div>
              <p className="text-sm text-mocha my-1">"{r.comment}"</p>
              <div className="text-xs text-charcoal">
                {r.customer?.name} ({r.customer?.email})
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <span className={`text-xs px-2 py-1 rounded-full ${r.approved ? 'bg-green-100 text-green-700' : 'bg-beige/50 text-mocha'}`}>
                {r.approved ? 'Approved' : 'Pending'}
              </span>
              {!r.approved && (
                <button onClick={() => setApproved(r._id, true)} className="text-xs text-gold underline">
                  Approve
                </button>
              )}
              {r.approved && (
                <button onClick={() => setApproved(r._id, false)} className="text-xs text-mocha underline">
                  Unapprove
                </button>
              )}
              <button onClick={() => remove(r._id)} className="text-xs text-red-600 underline">
                Delete
              </button>
            </div>
          </div>
        ))}
        {reviews.length === 0 && <p className="text-mocha text-sm">No reviews yet.</p>}
      </div>
    </div>
  );
}
