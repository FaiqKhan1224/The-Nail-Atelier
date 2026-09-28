import { useEffect, useState } from 'react';
import { SettingsAPI } from '../api/services';

const titles = { privacy: 'Privacy Policy', terms: 'Terms & Conditions', cancellation: 'Cancellation & Refund Policy' };
const fields = { privacy: 'privacyPolicy', terms: 'termsAndConditions', cancellation: 'cancellationPolicyPage' };

export default function Legal({ type }) {
  const [content, setContent] = useState('');
  useEffect(() => {
    SettingsAPI.get().then((s) => setContent(s[fields[type]] || ''));
  }, [type]);
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="font-display text-3xl mb-8 text-center">{titles[type]}</h1>
      <div className="text-mocha text-sm leading-relaxed whitespace-pre-line border-t border-beige pt-8">
        {content || 'This page has not been configured yet. Please contact us with any questions.'}
      </div>
    </div>
  );
}
