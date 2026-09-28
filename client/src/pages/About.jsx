import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import aboutBanner from '../assets/about-banner.png';
import aboutRight from '../assets/about-right.png';

const values = [
  { title: 'Quality', desc: 'Premium products and meticulous technique in every service.' },
  { title: 'Hygiene', desc: 'Hospital-grade sterilization for every tool, every visit.' },
  { title: 'Expertise', desc: 'Trained nail artists with years of hands-on experience.' },
  { title: 'Care', desc: 'A calm, welcoming space built around your comfort.' },
];

export default function About() {
  return (
    <div>
      <section className="relative h-72 flex items-center justify-center text-center">
        <img src={aboutBanner} className="absolute inset-0 w-full h-full object-cover" alt="Studio entrance" />
        <div className="absolute inset-0 bg-charcoal/50" />
        <h1 className="relative font-display text-4xl text-cream">About Us</h1>
      </section>
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <SectionHeading title="Where Beauty Meets Serenity" center={false} />
          <p className="text-mocha mb-4">
            The Nail Atelier was founded on a simple belief: self-care should feel like a ritual, not a routine. Every detail of our studio is designed with your wellbeing in mind.
          </p>
          <p className="text-mocha">
            From the products we choose to the way we welcome you through our doors, everything reflects our commitment to quiet luxury and genuine care.
          </p>
        </div>
        <img
  src={aboutRight}
  className="rounded-sm w-full h-96 object-cover"
  alt="The Nail Atelier studio"
 />
      </section>
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <SectionHeading title="Our Values" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <div key={v.title} className="text-center bg-cream border border-beige rounded-sm p-8">
              <h3 className="font-display text-lg mb-2">{v.title}</h3>
              <p className="text-sm text-mocha">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-beige/40 py-16 text-center px-6">
        <p className="font-display italic text-2xl text-charcoal max-w-xl mx-auto">"Every detail is designed with your wellbeing in mind."</p>
        <Button to="/booking" className="mt-8">Book Your Appointment</Button>
      </section>
    </div>
  );
}
