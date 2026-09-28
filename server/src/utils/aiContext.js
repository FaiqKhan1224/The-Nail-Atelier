function tokenize(text) {
  return (text || '')
    .toLowerCase()
    .split(/[^a-z0-9]+/i)
    .filter((w) => w.length > 2);
}

exports.findRelevantServices = function (services, message) {
  const words = tokenize(message);
  const scored = services.map((s) => {
    const haystack = `${s.name} ${s.category} ${s.description}`.toLowerCase();
    const score = words.filter((w) => haystack.includes(w)).length;
    return { s, score };
  });
  const matched = scored.filter((x) => x.score > 0).sort((a, b) => b.score - a.score).map((x) => x.s);
  if (matched.length) return matched.slice(0, 6);
  const featured = services.filter((s) => s.featured);
  return (featured.length ? featured : services).slice(0, 6);
};

exports.findRelevantFAQs = function (faqs, message) {
  const words = tokenize(message);
  const scored = faqs.map((f) => {
    const haystack = `${f.question} ${f.answer} ${(f.keywords || []).join(' ')}`.toLowerCase();
    const score = words.filter((w) => haystack.includes(w)).length;
    return { f, score };
  });
  return scored.filter((x) => x.score > 0).sort((a, b) => b.score - a.score).slice(0, 5).map((x) => x.f);
};

exports.suggestActions = function (userMessage, aiReply) {
  const text = `${userMessage} ${aiReply}`.toLowerCase();
  const actions = [];
  if (/book|appointment|schedul/.test(text)) actions.push({ label: 'Book Appointment', route: '/booking' });
  if (/price|cost|how much|\$/.test(text)) actions.push({ label: 'View Services & Pricing', route: '/services' });
  if (/gallery|photo|design|inspiration/.test(text)) actions.push({ label: 'View Gallery', route: '/gallery' });
  if (/bridal|wedding/.test(text)) actions.push({ label: 'Bridal Packages', route: '/bridal' });
  if (/hour|open|address|location/.test(text)) actions.push({ label: 'Contact & Hours', route: '/contact' });
  if (/cancel|reschedul|my appointment/.test(text)) actions.push({ label: 'My Appointments', route: '/dashboard/appointments' });
  if (!actions.length) {
    actions.push({ label: 'Explore Services', route: '/services' }, { label: 'Contact Us', route: '/contact' });
  }
  const seen = new Set();
  return actions.filter((a) => (seen.has(a.route) ? false : seen.add(a.route))).slice(0, 3);
};
