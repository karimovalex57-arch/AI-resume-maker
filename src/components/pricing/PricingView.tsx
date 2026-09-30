import React from 'react';
import { Language, UserProfile } from '../../types';
import { translations } from '../../data/translations';
import { Check, Crown, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface PricingProps {
  user: UserProfile;
  onUpgrade: () => void;
  lang: Language;
}

export const PricingView: React.FC<PricingProps> = ({ user, onUpgrade, lang }) => {
  const t = translations[lang];

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-950/60 border border-indigo-800/40 text-indigo-400">
          <Crown className="w-3.5 h-3.5 text-amber-400" />
          {lang === 'uz' ? 'Karyerangizga sarmoya qiling' : 'Invest in Your Career'}
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-100">{t.pricingTitle}</h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">{t.pricingSubtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Free Plan */}
        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h2 className="font-bold text-lg text-slate-200">{t.planFreeTitle}</h2>
            <p className="text-xs text-slate-400">{t.planFreeDesc}</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-slate-100 font-mono">{t.planFreePrice}</span>
              <span className="text-xs text-slate-500">/ {t.planFreePeriod}</span>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-slate-800 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{t.planFreeFeat1}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{t.planFreeFeat2}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{t.planFreeFeat3}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{t.planFreeFeat4}</span>
              </div>
            </div>
          </div>

          <div className="p-3 text-center text-xs text-slate-500 bg-slate-950/60 rounded-xl">
            {user.plan === 'free' ? t.currentPlan : 'Standart tarif'}
          </div>
        </div>

        {/* Premium Plan */}
        <div className="p-8 rounded-3xl bg-gradient-to-b from-indigo-950/40 via-slate-900 to-slate-900 border-2 border-indigo-500/50 shadow-2xl flex flex-col justify-between space-y-6 relative">
          <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full text-[11px] font-bold bg-indigo-600 text-white shadow-md">
            Eng ommabop
          </div>

          <div className="space-y-4">
            <h2 className="font-bold text-lg text-indigo-300">{t.planPremiumTitle}</h2>
            <p className="text-xs text-slate-400">{t.planPremiumDesc}</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-slate-100 font-mono">{t.planPremiumPrice}</span>
              <span className="text-xs text-slate-500">/ {t.planPremiumPeriod}</span>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-slate-800 text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-indigo-400" />
                <span>{t.planPremiumFeat1}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-indigo-400" />
                <span>{t.planPremiumFeat2}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-indigo-400" />
                <span>{t.planPremiumFeat3}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-indigo-400" />
                <span>{t.planPremiumFeat4}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-indigo-400" />
                <span>{t.planPremiumFeat5}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-indigo-400" />
                <span>{t.planPremiumFeat6}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-indigo-400" />
                <span>{t.planPremiumFeat7}</span>
              </div>
            </div>
          </div>

          {user.plan === 'premium' ? (
            <div className="p-3 text-center text-xs font-semibold text-emerald-400 bg-emerald-950/40 rounded-xl border border-emerald-800/40">
              {t.currentPlan} (Faol)
            </div>
          ) : (
            <button
              type="button"
              onClick={onUpgrade}
              className="w-full py-3.5 rounded-2xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/30 cursor-pointer transition-all hover:scale-102 flex items-center justify-center gap-2"
            >
              <span>{t.btnUpgrade}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
