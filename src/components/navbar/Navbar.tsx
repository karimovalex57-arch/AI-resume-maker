import React, { useState } from 'react';
import { Language, UserProfile } from '../../types';
import { translations } from '../../data/translations';
import { Sparkles, Sun, Moon, Globe, LogIn, User, Menu, X, LayoutDashboard, Crown } from 'lucide-react';

interface NavbarProps {
  currentView: 'landing' | 'dashboard' | 'editor' | 'cover-letter' | 'settings' | 'pricing';
  onNavigate: (view: 'landing' | 'dashboard' | 'editor' | 'cover-letter' | 'settings' | 'pricing') => void;
  user: UserProfile | null;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  lang: Language;
  onLangChange: (lang: Language) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  user,
  onLoginClick,
  onLogoutClick,
  lang,
  onLangChange,
  isDark,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const t = translations[lang];

  return (
    <header className="no-print sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single element Brand wordmark */}
        <button
          type="button"
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2.5 text-left cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-600/25 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-lg font-black tracking-tight text-slate-100 group-hover:text-indigo-400 transition-colors">
            CV Genius AI
          </span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-400">
          <button
            type="button"
            onClick={() => onNavigate('landing')}
            className={`hover:text-slate-100 transition-colors cursor-pointer ${
              currentView === 'landing' ? 'text-indigo-400 font-bold' : ''
            }`}
          >
            {t.navHome}
          </button>

          <button
            type="button"
            onClick={() => onNavigate('dashboard')}
            className={`hover:text-slate-100 transition-colors cursor-pointer flex items-center gap-1.5 ${
              currentView === 'dashboard' ? 'text-indigo-400 font-bold' : ''
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            {t.navDashboard}
          </button>

          <a href="#templates" onClick={() => onNavigate('landing')} className="hover:text-slate-100 transition-colors">
            {t.navTemplates}
          </a>

          <button
            type="button"
            onClick={() => onNavigate('cover-letter')}
            className={`hover:text-slate-100 transition-colors cursor-pointer ${
              currentView === 'cover-letter' ? 'text-indigo-400 font-bold' : ''
            }`}
          >
            {t.dashCoverLetter}
          </button>

          <button
            type="button"
            onClick={() => onNavigate('pricing')}
            className={`hover:text-slate-100 transition-colors cursor-pointer ${
              currentView === 'pricing' ? 'text-indigo-400 font-bold' : ''
            }`}
          >
            {t.navPricing}
          </button>
        </nav>

        {/* Zone 3: Actions & Controls */}
        <div className="flex items-center gap-2.5">
          {/* Language Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium inline-flex items-center gap-1 cursor-pointer transition-colors"
              title="Tilni tanlash"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span className="uppercase font-mono text-[11px]">{lang}</span>
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                <button
                  type="button"
                  onClick={() => {
                    onLangChange('uz');
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full px-3 py-1.5 text-left text-xs hover:bg-slate-800 transition-colors cursor-pointer ${
                    lang === 'uz' ? 'text-indigo-400 font-bold' : 'text-slate-300'
                  }`}
                >
                  O‘zbekcha (UZ)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onLangChange('en');
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full px-3 py-1.5 text-left text-xs hover:bg-slate-800 transition-colors cursor-pointer ${
                    lang === 'en' ? 'text-indigo-400 font-bold' : 'text-slate-300'
                  }`}
                >
                  English (EN)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onLangChange('ru');
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full px-3 py-1.5 text-left text-xs hover:bg-slate-800 transition-colors cursor-pointer ${
                    lang === 'ru' ? 'text-indigo-400 font-bold' : 'text-slate-300'
                  }`}
                >
                  Русский (RU)
                </button>
              </div>
            )}
          </div>

          {/* Dark / Light Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white cursor-pointer transition-colors"
            title={isDark ? 'Yorug‘ mavzu' : 'Qorong‘i mavzu'}
          >
            {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-400" />}
          </button>

          {/* User Auth or Profile Button */}
          {user ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onNavigate('settings')}
                className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors"
              >
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-6 h-6 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-lg bg-indigo-600/30 text-indigo-400 flex items-center justify-center text-[10px] font-bold">
                    {user.name.charAt(0)}
                  </div>
                )}
                <span className="text-xs font-semibold text-slate-200 hidden sm:inline max-w-[100px] truncate">
                  {user.name}
                </span>
                {user.plan === 'premium' && <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onLoginClick}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{t.navLogin}</span>
            </button>
          )}

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 p-4 space-y-3 animate-in slide-in-from-top-2">
          <button
            type="button"
            onClick={() => {
              onNavigate('landing');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 text-xs font-semibold text-slate-300 hover:text-white"
          >
            {t.navHome}
          </button>
          <button
            type="button"
            onClick={() => {
              onNavigate('dashboard');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-2"
          >
            <LayoutDashboard className="w-4 h-4" />
            {t.navDashboard}
          </button>
          <button
            type="button"
            onClick={() => {
              onNavigate('cover-letter');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 text-xs font-semibold text-slate-300 hover:text-white"
          >
            {t.dashCoverLetter}
          </button>
          <button
            type="button"
            onClick={() => {
              onNavigate('pricing');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 text-xs font-semibold text-slate-300 hover:text-white"
          >
            {t.navPricing}
          </button>
          <button
            type="button"
            onClick={() => {
              onNavigate('settings');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 text-xs font-semibold text-slate-300 hover:text-white"
          >
            {t.settingsTitle}
          </button>
        </div>
      )}
    </header>
  );
};
