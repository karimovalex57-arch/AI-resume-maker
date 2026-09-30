import React, { useState } from 'react';
import { Language, UserProfile } from '../../types';
import { translations } from '../../data/translations';
import { X, Mail, Lock, User, Sparkles, ArrowRight, Check } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  lang: Language;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess, lang }) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('jasur.alimov@example.uz');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('Jasur Alimov');
  const [forgotSent, setForgotSent] = useState(false);

  const t = translations[lang];

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'forgot') {
      setForgotSent(true);
      setTimeout(() => {
        setForgotSent(false);
        setMode('login');
      }, 2500);
      return;
    }

    const authenticatedUser: UserProfile = {
      id: 'usr-1',
      name: mode === 'register' ? name : 'Jasur Alimov',
      email: email,
      avatarUrl: '/src/assets/images/avatar_professional_1_1790762782018.jpg',
      plan: 'premium',
      joinedDate: '2026-09-10',
      language: lang,
      theme: 'dark',
    };

    onLoginSuccess(authenticatedUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-6 relative animate-in fade-in zoom-in-95 duration-150">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-200 p-1.5 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1 text-center">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mx-auto mb-2">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">
            {mode === 'login'
              ? (lang === 'uz' ? 'Tizimga kirish' : 'Welcome Back')
              : mode === 'register'
              ? (lang === 'uz' ? 'Ro‘yxatdan o‘tish' : 'Create Account')
              : (lang === 'uz' ? 'Parolni tiklash' : 'Reset Password')}
          </h2>
          <p className="text-xs text-slate-400">
            {mode === 'login'
              ? (lang === 'uz' ? 'CV Genius AI bilan rezyumelaringizni boshqaring' : 'Sign in to access your resumes and AI tools')
              : mode === 'register'
              ? (lang === 'uz' ? '1 daqiqada bepul hisob oching' : 'Sign up in seconds and start building')
              : (lang === 'uz' ? 'Pochtangizni kiriting, tiklash havolasi yuboriladi' : 'Enter your email to receive recovery instructions')}
          </p>
        </div>

        {forgotSent ? (
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800 text-center space-y-2">
            <Check className="w-6 h-6 text-emerald-400 mx-auto" />
            <p className="text-xs font-semibold text-emerald-300">
              {lang === 'uz'
                ? 'Tiklash havolasi pochtangizga yuborildi!'
                : 'Password reset link sent to your email!'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {lang === 'uz' ? 'Ism sharifingiz' : 'Full Name'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jasur Alimov"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {lang === 'uz' ? 'Elektron pochta' : 'Email Address'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nomzod@example.uz"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-slate-300">
                    {lang === 'uz' ? 'Parol' : 'Password'}
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-[11px] text-indigo-400 hover:underline cursor-pointer"
                    >
                      {lang === 'uz' ? 'Parolni unutdingizmi?' : 'Forgot Password?'}
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              {mode === 'login'
                ? (lang === 'uz' ? 'Kirish' : 'Log In')
                : mode === 'register'
                ? (lang === 'uz' ? 'Hisob yaratish' : 'Sign Up')
                : (lang === 'uz' ? 'Yuborish' : 'Submit')}
            </button>
          </form>
        )}

        {/* Toggle Mode */}
        <div className="text-center text-xs text-slate-400 pt-2 border-t border-slate-800">
          {mode === 'login' ? (
            <p>
              {lang === 'uz' ? 'Hali hisobingiz yo‘qmi?' : 'Don’t have an account?'}{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="font-semibold text-indigo-400 hover:underline cursor-pointer"
              >
                {lang === 'uz' ? 'Ro‘yxatdan o‘tish' : 'Sign Up'}
              </button>
            </p>
          ) : (
            <p>
              {lang === 'uz' ? 'Hisobingiz bormi?' : 'Already have an account?'}{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="font-semibold text-indigo-400 hover:underline cursor-pointer"
              >
                {lang === 'uz' ? 'Kirish' : 'Log In'}
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
