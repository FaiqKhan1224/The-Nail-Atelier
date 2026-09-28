import { Link } from 'react-router-dom';

export default function Button({ to, href, onClick, variant = 'primary', className = '', children, type = 'button', disabled }) {
  const base = 'inline-flex items-center justify-center px-6 py-3 text-sm tracking-wide rounded-sm transition-colors';
  const styles = {
    primary: 'bg-gold text-cream hover:bg-charcoal',
    outline: 'border border-charcoal text-charcoal hover:bg-charcoal hover:text-cream',
    outlineLight: 'border border-cream text-cream hover:bg-cream hover:text-charcoal',
    ghost: 'text-charcoal hover:text-gold',
  };
  const cls = `${base} ${styles[variant]} ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''} ${className}`;

  if (to) return <Link to={to} className={cls}>{children}</Link>;
  if (href) return <a href={href} className={cls}>{children}</a>;
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}
