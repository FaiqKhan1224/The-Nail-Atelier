import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, X, Minus, Send, Trash2 } from 'lucide-react';
import { AIChatAPI } from '../../api/services';

export default function AIChatWidget() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [actions, setActions] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    AIChatAPI.config().then(setConfig).catch(() => {});
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const send = async (text) => {
    const content = text ?? input;
    if (!content.trim() || sending) return;
    const userMsg = { role: 'user', content };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput('');
    setSending(true);
    setActions([]);
    try {
      const { reply, actions: acts } = await AIChatAPI.send(content, nextMessages.slice(-6));
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
      setActions(acts || []);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "I'm sorry, I'm having trouble connecting right now. You can still explore our services or contact our team directly." },
      ]);
      setActions([
        { label: 'Explore Services', route: '/services' },
        { label: 'Contact Us', route: '/contact' },
      ]);
    } finally {
      setSending(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setActions([]);
  };

  if (!config) return null;

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Beauty Concierge"
        title="Beauty Concierge"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gold text-cream shadow-lg flex items-center justify-center hover:bg-charcoal transition-colors motion-reduce:transition-none"
      >
        {open ? <X size={22} /> : <Sparkles size={22} />}
      </button>

      {open && (
        <div className="fixed z-50 bottom-24 right-6 left-6 sm:left-auto sm:w-96 h-[70vh] sm:h-[520px] bg-cream border border-beige rounded-sm shadow-2xl flex flex-col overflow-hidden">
          <div className="bg-charcoal text-cream px-5 py-4 flex justify-between items-center">
            <div>
              <div className="font-display text-lg">{config.assistantName}</div>
              <div className="text-xs text-beige/70">{config.subtitle}</div>
            </div>
            <div className="flex gap-3">
              <button onClick={clearChat} aria-label="Clear chat">
                <Trash2 size={16} />
              </button>
              <button onClick={() => setOpen(false)} aria-label="Close chat">
                <Minus size={16} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="bg-ivory border border-beige rounded-sm p-3 text-sm text-charcoal">{config.welcomeMessage}</div>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] p-3 rounded-sm text-sm ${m.role === 'user' ? 'ml-auto bg-blush/40 text-charcoal' : 'bg-ivory border border-beige text-charcoal'}`}
              >
                {m.content}
              </div>
            ))}
            {sending && <div className="bg-ivory border border-beige rounded-sm p-3 text-sm text-mocha w-fit">Typing…</div>}
            <div ref={bottomRef} />
          </div>

          <div className="px-4 pb-2 flex gap-2 flex-wrap">
            {(messages.length === 0 ? config.quickActions || [] : actions).map((a) => (
              <button
                key={a.label}
                onClick={() => (a.route ? navigate(a.route) : send(a.label))}
                className="text-xs px-3 py-1.5 border border-gold text-charcoal rounded-full hover:bg-gold hover:text-cream"
              >
                {a.label}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="border-t border-beige p-3 flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about services, hours, booking…"
              className="flex-1 border border-beige rounded-sm px-3 py-2 text-sm"
              aria-label="Message"
            />
            <button type="submit" disabled={sending} className="bg-gold text-cream w-10 h-10 rounded-sm flex items-center justify-center" aria-label="Send">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
