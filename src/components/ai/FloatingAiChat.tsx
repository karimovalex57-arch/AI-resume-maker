import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, CVData, Language } from '../../types';
import { aiService } from '../../services/aiService';
import { Bot, X, Send, Sparkles, Loader2, Copy, Check, MessageSquare } from 'lucide-react';

interface FloatingChatProps {
  currentCV?: CVData;
  onApplySummary?: (summaryText: string) => void;
  lang: Language;
}

export const FloatingAiChat: React.FC<FloatingChatProps> = ({ currentCV, onApplySummary, lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'ai',
      text:
        lang === 'uz'
          ? 'Assalomu alaykum! Men CV Genius AI yordamchingizman. Rezyumengiz uchun xulosa (summary) yozish, tajribani kuchaytirish yoki ATS bo‘yicha maslahat berishim mumkin. Qanday yordam bera olaman?'
          : 'Hello! I am your CV Genius AI assistant. I can craft executive summaries, optimize experience bullet points, or audit ATS readiness. How can I help you today?',
      timestamp: 'Hozir',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await aiService.chat(query, currentCV, lang);
      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedAction: response.action,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-err-${Date.now()}`,
          sender: 'ai',
          text: lang === 'uz' ? 'Kechirasiz, javob olishda xatolik yuz berdi.' : 'Sorry, failed to process response.',
          timestamp: 'Hozir',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    lang === 'uz' ? 'Marketing manager uchun summary yoz' : 'Write summary for Marketing Manager',
    lang === 'uz' ? 'CV\'dagi eng katta 3 ta xato qaysilar?' : 'What are the top 3 resume mistakes?',
    lang === 'uz' ? 'Tajriba qismini raqamlar bilan kuchaytir' : 'How to quantify resume bullet points?',
  ];

  return (
    <div id="floating-ai-chat" className="no-print fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-2xl shadow-indigo-600/40 border border-indigo-400/30 transition-all hover:scale-105 cursor-pointer"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-indigo-700 animate-pulse"></span>
          </div>
          <span className="text-xs font-bold tracking-wide">
            {lang === 'uz' ? 'AI Yordamchi' : 'AI Assistant'}
          </span>
        </button>
      )}

      {/* Floating Chat Drawer/Window */}
      {isOpen && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl w-[360px] sm:w-[420px] h-[540px] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="px-5 py-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-sm">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                  CV Genius AI
                  <span className="text-[10px] font-normal text-emerald-400 bg-emerald-950/50 px-1.5 py-0.2 rounded border border-emerald-800/40">
                    Online
                  </span>
                </h3>
                <p className="text-[10px] text-slate-400">
                  {lang === 'uz' ? 'Rezyume bo‘yicha shaxsiy maslahatchi' : 'Personal Resume Consultant'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed whitespace-pre-wrap ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-xs shadow-sm'
                      : 'bg-slate-800/80 text-slate-200 border border-slate-700/60 rounded-bl-xs'
                  }`}
                >
                  {msg.text}

                  {msg.suggestedAction && onApplySummary && (
                    <div className="mt-2.5 pt-2 border-t border-slate-700/70">
                      <button
                        type="button"
                        onClick={() => onApplySummary(msg.suggestedAction!.payload)}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-indigo-500 hover:bg-indigo-400 text-white inline-flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                      >
                        <Sparkles className="w-3 h-3" />
                        {msg.suggestedAction.label}
                      </button>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-slate-500 font-mono mt-0.5 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-indigo-400 p-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{lang === 'uz' ? 'AI javob tayyorlamoqda...' : 'AI is thinking...'}</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions pills */}
          <div className="px-3 py-1.5 bg-slate-950/40 border-t border-slate-800/60 overflow-x-auto flex gap-1.5 scrollbar-none">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(p)}
                className="text-[10px] px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 whitespace-nowrap cursor-pointer transition-colors"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                lang === 'uz'
                  ? 'Savolingizni yozing...'
                  : 'Ask about summary, skills, or ATS...'
              }
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-40 transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
