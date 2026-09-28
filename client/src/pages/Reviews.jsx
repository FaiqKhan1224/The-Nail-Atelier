import { useEffect, useState } from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import { ReviewAPI } from '../api/services';
import { useAuth } from '../context/AuthContext';

export default function Reviews() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('');

  const load = () => ReviewAPI.list().then(setReviews).catch(() => {});
  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setStatus('');
    try {
      await ReviewAPI.create({ rating, comment });
      setComment('');
      setStatus('Thank you! Your review will appear once approved.');
    } catch (err) {
      setStatus(err.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <SectionHeading title="What Our Clients Say" />
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {reviews.map((r) => (
          <div key={r._id} className="bg-cream border border-beige rounded-sm p-6">
            <div className="text-gold mb-2">
              {'★'.repeat(r.rating)}
              {'☆'.repeat(5 - r.rating)}
            </div>
            <p className="text-mocha text-sm mb-3">"{r.comment}"</p>
            <div className="text-sm text-charcoal font-medium">
              {r.customer?.name} · {new Date(r.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
        {reviews.length === 0 && <p className="text-mocha text-sm">No reviews yet — be the first to share your experience.</p>}
      </div>

      {user ? (
        <form onSubmit={submit} className="max-w-md mx-auto bg-cream border border-beige rounded-sm p-8">
          <h3 className="font-display text-xl mb-4">Leave a Review</h3>
          <label className="text-sm text-mocha">Rating</label>
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="w-full border border-beige rounded-sm p-2 my-2">
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} star{n > 1 ? 's' : ''}
              </option>
            ))}
          </select>
          <label className="text-sm text-mocha">Your experience</label>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} required rows={4} className="w-full border border-beige rounded-sm p-2 my-2" />
          <Button type="submit" className="w-full mt-2">Submit Review</Button>
          {status && <p className="text-sm text-mocha mt-3">{status}</p>}
        </form>
      ) : (
        <p className="text-center text-mocha">
          Please <a href="/login" className="text-gold underline">log in</a> to leave a review.
        </p>
      )}
    </div>
  );
}
