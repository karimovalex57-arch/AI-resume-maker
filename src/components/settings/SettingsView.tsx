import React, { useState } from 'react';
import { Language, UserProfile } from '../../types';
import { translations } from '../../data/translations';
import {
  User,
  Globe,
  Sun,
  Moon,
  CreditCard,
  Trash2,
  Check,
  Crown,
  AlertTriangle,
  ArrowLeft,
  Save,
} from 'lucide-react';

interface SettingsProps {
  user: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
  onDeleteAccount: () => void;
  onBack: () => void;
  lang: Language;
  onLangChange: (lang: Language) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const SettingsView: React.FC<SettingsProps> = ({
  user,
  onUpdateUser,
  onDeleteAccount,
  onBack,
  lang,
  onLangChange,
  isDark,
  onToggleTheme,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'appearance' | 'account' | 'subscription'>('profile');
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const t = translations[lang];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name,
      email,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top back button */}
      <button
        type="button"
        onClick={onBack}
        className="text-xs font-medium text-slate-400 hover:text-slate-200 inline-flex items-center gap-1.5 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        {lang === 'uz' ? 'Kabinetga qaytish' : 'Back to Dashboard'}
      </button>

      {/* Main settings card */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold text-slate-100">{t.settingsTitle}</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {lang === 'uz'
              ? 'Profilingiz, til va ilova parametrlari'
              : 'Manage your profile, language, and subscription settings'}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-800 px-6 gap-6 text-xs font-semibold overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`py-3.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'profile'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-4 h-4" />
            {t.settingsProfileTab}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('appearance')}
            className={`py-3.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'appearance'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-4 h-4" />
            {t.settingsLangThemeTab}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('subscription')}
            className={`py-3.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'subscription'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            {t.settingsSubTab}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('account')}
            className={`py-3.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'account'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Trash2 className="w-4 h-4" />
            {t.settingsAccountTab}
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 sm:p-8">
          {/* 1. Profile Tab */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4 max-w-md">
              {savedSuccess && (
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800 text-xs text-emerald-300 flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  {lang === 'uz' ? 'Profil muvaffaqiyatli yangilandi!' : 'Profile updated successfully!'}
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {lang === 'uz' ? 'To‘liq ism sharif' : 'Full Name'}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {lang === 'uz' ? 'Elektron pochta' : 'Email Address'}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  {t.btnSave}
                </button>
              </div>
            </form>
          )}

          {/* 2. Appearance & Language */}
          {activeTab === 'appearance' && (
            <div className="space-y-6 max-w-md">
              {/* Language Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  {lang === 'uz' ? 'Interfeys tili:' : 'Interface Language:'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => onLangChange('uz')}
                    className={`p-3 rounded-xl border text-xs font-medium text-left transition-colors cursor-pointer ${
                      lang === 'uz'
                        ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    🇺🇿 O‘zbekcha
                  </button>
                  <button
                    type="button"
                    onClick={() => onLangChange('en')}
                    className={`p-3 rounded-xl border text-xs font-medium text-left transition-colors cursor-pointer ${
                      lang === 'en'
                        ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    🇬🇧 English
                  </button>
                  <button
                    type="button"
                    onClick={() => onLangChange('ru')}
                    className={`p-3 rounded-xl border text-xs font-medium text-left transition-colors cursor-pointer ${
                      lang === 'ru'
                        ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    🇷🇺 Русский
                  </button>
                </div>
              </div>

              {/* Theme Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  {lang === 'uz' ? 'Rang mavzusi:' : 'Theme Mode:'}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => !isDark && onToggleTheme()}
                    className={`p-3.5 rounded-xl border text-xs font-medium flex items-center gap-2 cursor-pointer transition-colors ${
                      isDark
                        ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Moon className="w-4 h-4 text-indigo-400" />
                    <span>{t.settingsThemeDark}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => isDark && onToggleTheme()}
                    className={`p-3.5 rounded-xl border text-xs font-medium flex items-center gap-2 cursor-pointer transition-colors ${
                      !isDark
                        ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span>{t.settingsThemeLight}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 3. Subscription Tab */}
          {activeTab === 'subscription' && (
            <div className="space-y-4 max-w-lg">
              <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/60 to-purple-950/40 border border-indigo-800/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                    <Crown className="w-4 h-4 text-amber-400" />
                    {user.plan === 'premium' ? 'Professional (Premium)' : 'Boshlang‘ich (Bepul)'}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/40">
                    Faol
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  {user.plan === 'premium'
                    ? (lang === 'uz' ? 'Cheksiz rezyumelar, barcha 6 ta premium shablon va chuqur ATS tahlilidan foydalanmoqdasiz.' : 'Unlimited CVs and all AI features enabled.')
                    : (lang === 'uz' ? 'Standart imkoniyatlar faol.' : 'Standard free plan active.')}
                </p>
              </div>

              {user.plan !== 'premium' ? (
                <button
                  type="button"
                  onClick={() => onUpdateUser({ ...user, plan: 'premium' })}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs cursor-pointer"
                >
                  {t.btnUpgrade}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onUpdateUser({ ...user, plan: 'free' })}
                  className="text-xs text-slate-500 hover:text-slate-400 underline cursor-pointer"
                >
                  Obunani bekor qilish
                </button>
              )}
            </div>
          )}

          {/* 4. Account & Danger Zone */}
          {activeTab === 'account' && (
            <div className="space-y-6 max-w-md">
              <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-3">
                <h3 className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  {t.settingsDangerZone}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {lang === 'uz'
                    ? 'Hisobingizni o‘chirsangiz, barcha saqlangan rezyumelaringiz va sozlamalaringiz tiklab bo‘lmaydigan qilib o‘chiriladi.'
                    : 'Deleting your account permanently removes all stored resumes, drafts, and user data.'}
                </p>
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white cursor-pointer"
                >
                  {t.settingsDeleteAccount}
                </button>
              </div>

              {showDeleteConfirm && (
                <div className="p-4 rounded-xl bg-slate-950 border border-rose-800 space-y-3">
                  <p className="text-xs text-rose-300 font-medium">
                    {t.settingsDeleteAccountConfirm}
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={onDeleteAccount}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-600 text-white cursor-pointer"
                    >
                      Ha, butunlay o‘chirilsin
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowDeleteConfirm(false)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 cursor-pointer"
                    >
                      Bekor qilish
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
