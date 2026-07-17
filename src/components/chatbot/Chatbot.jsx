import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { CHATBOT_GREETING, findChatbotResponse } from '../../data/chatbotKnowledge';
import { COMPANY } from '../../constants/company';
import { BRAND } from '../../constants/brand';

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.dataset.chatOpen = open ? 'true' : 'false';
    return () => { document.body.dataset.chatOpen = 'false'; };
  }, [open]);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: 'bot', text: CHATBOT_GREETING.message, quickReplies: CHATBOT_GREETING.quickReplies }]);
    }
  }, [open, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { role: 'user', text: text.trim() }]);
    setInput('');
    setTyping(true);

    await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));

    const response = findChatbotResponse(text);
    setTyping(false);
    setMessages((prev) => [...prev, {
      role: 'bot',
      text: response.response,
      quickReplies: response.quickReplies,
      link: response.link,
      escalate: response.escalate,
    }]);
  };

  const handleQuickReply = (reply) => {
    sendMessage(reply);
  };

  if (!mounted) return null;

  return createPortal(
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fab-chat-panel fixed z-[70] flex w-[380px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-deep-100 bg-white shadow-card"
            role="dialog"
            aria-label="Care assistant chat"
          >
            <div className="flex items-center justify-between bg-gradient-brand px-4 py-3 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 p-1">
                  <img src={BRAND.logoIcon} alt="" className="h-full w-full object-contain" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold">{COMPANY.shortName} Assistant</p>
                  <p className="text-xs text-white/80">Typically replies instantly</p>
                </div>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="rounded-full p-1 hover:bg-white/10">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-royal-600 text-white'
                      : 'bg-deep-50 text-deep-800'
                  }`}>
                    <p className="whitespace-pre-line">{msg.text}</p>
                    {msg.link && (
                      <Link to={msg.link} className="mt-2 inline-block font-semibold text-royal-700 underline" onClick={() => setOpen(false)}>
                        Learn more →
                      </Link>
                    )}
                    {msg.escalate && (
                      <Link to="/contact" className="mt-2 inline-block font-semibold text-royal-700 underline" onClick={() => setOpen(false)}>
                        Contact our team →
                      </Link>
                    )}
                    {msg.quickReplies && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {msg.quickReplies.map((reply) => (
                          <button
                            key={reply}
                            type="button"
                            onClick={() => handleQuickReply(reply)}
                            className="rounded-full border border-royal-200 bg-white px-3 py-1 text-xs font-medium text-royal-700 transition-colors hover:bg-royal-50"
                          >
                            {reply}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="rounded-2xl bg-deep-50 px-4 py-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((d) => (
                        <motion.span
                          key={d}
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: d * 0.2 }}
                          className="h-2 w-2 rounded-full bg-deep-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
              className="flex gap-2 border-t border-deep-100 p-3"
            >
              <label htmlFor="chat-input" className="sr-only">Type your message</label>
              <input
                id="chat-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about our services..."
                className="flex-1 rounded-full border border-deep-200 px-4 py-2 text-sm focus:border-royal-500 focus:ring-2 focus:ring-royal-200"
              />
              <button
                type="submit"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-brand text-white"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fab-safe fixed z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand text-white shadow-glow"
        aria-label={open ? 'Close care assistant' : 'Open care assistant'}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </motion.button>
    </>,
    document.body
  );
}
