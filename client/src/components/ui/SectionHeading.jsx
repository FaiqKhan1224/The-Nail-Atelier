export default function SectionHeading({ title, subtitle, center = true }) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      <h2 className="font-display text-3xl md:text-4xl text-charcoal">{title}</h2>
      {subtitle && <p className="text-mocha mt-4 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}
