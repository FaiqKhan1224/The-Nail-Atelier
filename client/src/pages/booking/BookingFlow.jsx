import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { ServiceAPI, AppointmentAPI } from '../../api/services';

const steps = ['Service', 'Date & Time', 'Details', 'Review', 'Confirmation'];

export default function BookingFlow() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  const [date, setDate] = useState('');
  const [slots, setSlots] = useState([]);
  const [time, setTime] = useState('');

  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [confirmed, setConfirmed] = useState(null);

  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    ServiceAPI.list()
      .then((list) => {
        const serviceList = Array.isArray(list) ? list : [];

        setServices(serviceList);

        const pre = params.get('service');

        if (pre) {
          const foundService = serviceList.find(
            (service) => service._id === pre
          );

          setSelectedService(foundService || null);
        }
      })
      .catch((err) => {
        console.error('Services loading error:', err);
        setServices([]);
      });
  }, [params]);

  useEffect(() => {
    if (!selectedService || !date) {
      setSlots([]);
      setTime('');
      setLoadingSlots(false);
      return;
    }

    setSlots([]);
    setTime('');
    setError('');
    setLoadingSlots(true);

    AppointmentAPI.slots(selectedService._id, date)
      .then((availableSlots) => {
        console.log('Available slots:', availableSlots);

        if (Array.isArray(availableSlots)) {
          setSlots(availableSlots);
        } else {
          setSlots([]);
        }
      })
      .catch((err) => {
        console.error('Available slots error:', err);

        setSlots([]);
        setTime('');

        setError(
          err?.message ||
            'Unable to load available times. Please try another date.'
        );
      })
      .finally(() => {
        setLoadingSlots(false);
      });
  }, [selectedService, date]);

  const total =
    (selectedService?.price || 0) +
    selectedAddOns.reduce(
      (sum, addOn) => sum + (Number(addOn.price) || 0),
      0
    );

  const toggleAddOn = (addOn) => {
    setSelectedAddOns((prev) => {
      const exists = prev.some(
        (item) => item.name === addOn.name
      );

      if (exists) {
        return prev.filter(
          (item) => item.name !== addOn.name
        );
      }

      return [...prev, addOn];
    });
  };

  const confirmBooking = async () => {
    if (!selectedService || !date || !time) {
      setError('Please select a service, date and time.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const appt = await AppointmentAPI.create({
        serviceId: selectedService._id,
        date,
        time,
        addOns: selectedAddOns,
        notes,
      });

      console.log('Booking created:', appt);

      setConfirmed(appt);
      setStep(4);
    } catch (err) {
      console.error('Booking error:', err);

      setError(
        err?.message ||
          'Could not complete booking. Please try another time.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="flex justify-between mb-12">
        {steps.map((s, i) => {
          const stepClass =
            i <= step
              ? 'border-gold text-charcoal'
              : 'border-beige text-mocha/50';

          return (
            <div
              key={s}
              className={`flex-1 text-center text-xs uppercase tracking-wide border-b-2 pb-3 ${stepClass}`}
            >
              {i + 1}. {s}
            </div>
          );
        })}
      </div>

      {step === 0 && (
        <div>
          <h2 className="font-display text-2xl mb-6">
            Choose a Service
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {services.map((service) => {
              const serviceClass =
                selectedService?._id === service._id
                  ? 'text-left border rounded-sm p-4 border-gold bg-blush/10'
                  : 'text-left border rounded-sm p-4 border-beige';

              return (
                <button
                  key={service._id}
                  type="button"
                  onClick={() => {
                    setSelectedService(service);
                    setSelectedAddOns([]);
                    setDate('');
                    setTime('');
                    setSlots([]);
                    setError('');
                  }}
                  className={serviceClass}
                >
                  <div className="font-medium text-charcoal">
                    {service.name}
                  </div>

                  <div className="text-sm text-mocha">
                    ${service.price} · {service.duration} mins
                  </div>
                </button>
              );
            })}
          </div>

          {selectedService?.addOns?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm text-mocha mb-2">
                Add-ons (optional)
              </h3>

              <div className="flex flex-wrap gap-2">
                {selectedService.addOns.map((addOn) => {
                  const addOnSelected = selectedAddOns.some(
                    (item) => item.name === addOn.name
                  );

                  const addOnClass = addOnSelected
                    ? 'px-3 py-2 text-xs rounded-full border bg-gold text-cream border-gold'
                    : 'px-3 py-2 text-xs rounded-full border border-beige text-mocha';

                  return (
                    <button
                      key={addOn.name}
                      type="button"
                      onClick={() => toggleAddOn(addOn)}
                      className={addOnClass}
                    >
                      {addOn.name} (+${addOn.price})
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <Button
            className="mt-8"
            disabled={!selectedService}
            onClick={() => {
              setError('');
              setStep(1);
            }}
          >
            Continue
          </Button>
        </div>
      )}

      {step === 1 && (
        <div>
          <h2 className="font-display text-2xl mb-6">
            Choose Date & Time
          </h2>

          <input
            type="date"
            min={new Date().toLocaleDateString('en-CA')}
            value={date}
            onChange={(event) => {
              const selectedDate = event.target.value;

              setDate(selectedDate);
              setTime('');
              setSlots([]);
              setError('');
            }}
            className="border border-beige rounded-sm p-3 mb-6"
          />

          {date && (
            <div className="mb-6">
              {loadingSlots ? (
                <p className="text-sm text-mocha">
                  Checking available times...
                </p>
              ) : error ? (
                <p className="text-sm text-red-600">
                  {error}
                </p>
              ) : slots.length === 0 ? (
                <p className="text-sm text-mocha">
                  No slots available that day — try another date.
                </p>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {slots.map((slot) => {
                    const slotClass =
                      time === slot
                        ? 'py-2 text-sm rounded-sm border bg-gold text-cream border-gold'
                        : 'py-2 text-sm rounded-sm border border-beige text-mocha';

                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => {
                          setTime(slot);
                          setError('');
                        }}
                        className={slotClass}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setError('');
                setStep(0);
              }}
            >
              Back
            </Button>

            <Button
              disabled={!time || loadingSlots}
              onClick={() => {
                setError('');
                setStep(2);
              }}
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="font-display text-2xl mb-6">
            Additional Details
          </h2>

          <textarea
            placeholder="Anything we should know? (optional)"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows={4}
            className="w-full border border-beige rounded-sm p-3 mb-6"
          />

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setStep(1)}
            >
              Back
            </Button>

            <Button onClick={() => setStep(3)}>
              Continue
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="font-display text-2xl mb-6">
            Review Your Booking
          </h2>

          <div className="bg-cream border border-beige rounded-sm p-6 space-y-2 text-sm mb-6">
            <p>
              <span className="text-mocha">Service:</span>{' '}
              {selectedService?.name}
            </p>

            {selectedAddOns.length > 0 && (
              <p>
                <span className="text-mocha">Add-ons:</span>{' '}
                {selectedAddOns
                  .map((addOn) => addOn.name)
                  .join(', ')}
              </p>
            )}

            <p>
              <span className="text-mocha">Date:</span>{' '}
              {date}
            </p>

            <p>
              <span className="text-mocha">Time:</span>{' '}
              {time}
            </p>

            <p className="text-lg font-medium text-charcoal pt-2 border-t border-beige">
              Total: ${total}
            </p>
          </div>

          {error && (
            <p className="text-sm text-red-600 mb-4">
              {error}
            </p>
          )}

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setStep(2)}
            >
              Back
            </Button>

            <Button
              disabled={submitting}
              onClick={confirmBooking}
            >
              {submitting ? 'Booking...' : 'Confirm Booking'}
            </Button>
          </div>
        </div>
      )}

      {step === 4 && confirmed && (
        <div className="text-center py-12">
          <h2 className="font-display text-3xl mb-4">
            Booking Confirmed ✨
          </h2>

          <p className="text-mocha mb-8">
            We've received your request for {confirmed.date} at{' '}
            {confirmed.time}. You'll receive confirmation from our
            team shortly.
          </p>

          <Button
            onClick={() =>
              navigate('/dashboard/appointments')
            }
          >
            View My Appointments
          </Button>
        </div>
      )}
    </div>
  );
}