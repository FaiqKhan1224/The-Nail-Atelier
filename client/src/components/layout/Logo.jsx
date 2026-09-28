export default function Logo({ dark = false }) {
  return (
    <div className="flex items-center gap-3">
      <svg width="36" height="36" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="20" cy="20" r="18" stroke="#C4A484" strokeWidth="1.2" />
        <text x="20" y="26" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="17" fill="#C4A484">
          N
        </text>
      </svg>
      <div className="leading-tight">
        <div className={`font-display tracking-wide text-sm ${dark ? 'text-cream' : 'text-charcoal'}`}>THE NAIL ATELIER</div>
        <div className={`text-[10px] italic ${dark ? 'text-beige/70' : 'text-mocha/70'}`}>The Art of Beautiful Nails</div>
      </div>
    </div>
  );
}
