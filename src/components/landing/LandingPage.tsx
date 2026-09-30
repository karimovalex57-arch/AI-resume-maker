import React, { useState } from 'react';
import { Language, TemplateId } from '../../types';
import { translations } from '../../data/translations';
import { sampleCV1 } from '../../data/sampleCVs';
import { CVRenderer } from '../templates/CVRenderer';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Zap,
  Target,
  Download,
  HelpCircle,
  ChevronDown,
  LayoutTemplate,
  Layers,
  Award,
} from 'lucide-react';

interface LandingPageProps {
  onStartCreate: () => void;
  onViewTemplates: () => void;
  onSelectTemplate: (templateId: TemplateId) => void;
  onLogin: () => void;
  lang: Language;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartCreate,
  onViewTemplates,
  onSelectTemplate,
  onLogin,
  lang,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const t = translations[lang];

  const templatesList: { id: TemplateId; name: string; tag: string; desc: string }[] = [
    { id: 'modern', name: 'Modern', tag: 'Eng ommabop', desc: 'SaaS, IT va raqamli kasblar uchun ikki ustunli zamonaviy dizayn.' },
    { id: 'minimal', name: 'Minimal', tag: 'HR sevimlisi', desc: 'Shveytsariya uslubidagi toza tipografika va mukammal bo‘shliqlar.' },
    { id: 'corporate', name: 'Corporate', tag: 'Fortune 500', desc: 'Banklar, moliya va yirik korporatsiyalar uchun jiddiy klassik header.' },
    { id: 'creative', name: 'Creative', tag: 'Dizayn & SMM', desc: 'Portfolio, marketing va ijodiy mutaxassislar uchun zamonaviy aksentlar.' },
    { id: 'executive', name: 'Executive', tag: 'Rahbarlar', desc: 'Top-menejerlar va direktorlar uchun obro‘li, vazmin shriftlar.' },
    { id: 'student', name: 'Student', tag: 'Bitiruvchilar', desc: 'Akademik yutuqlar, diplom va amaliyotlarga alohida urg‘u.' },
  ];

  const faqs = [
    {
      q: lang === 'uz' ? 'CV Genius AI rezyumeni qanday yaxshilaydi?' : 'How does CV Genius AI enhance my resume?',
      a: lang === 'uz'
        ? 'Sun\'iy intellekt siz kiritgan oddiy jumlalarni tahlil qilib, ularni kuchli harakat fe\'llari (action verbs) va o‘lchanadigan natijalar (metrikalar) bilan boyitadi. Shuningdek, sohangizga mos kalit so‘zlarni avtomatik taklif etadi.'
        : 'Our AI analyzes basic job descriptions and transforms them into high-impact, quantifiable accomplishment statements while injecting industry-relevant keywords.',
    },
    {
      q: lang === 'uz' ? 'ATS (Applicant Tracking System) nima va nega u muhim?' : 'What is ATS and why does it matter?',
      a: lang === 'uz'
        ? 'ATS — bu yirik kompaniyalar HR mutaxassislari nomzodlar rezyumelarini avtomatik saralash uchun ishlatadigan dastur. CV Genius AI shablonlari va tahlili ushbu robotlar rezyumeni xatosiz o‘qishi uchun maxsus 100% moslashtirilgan.'
        : 'ATS systems filter candidates before human recruiters review them. Our templates and scanner ensure 95%+ parseability.',
    },
    {
      q: lang === 'uz' ? 'PDF yuklab olish bepulmi?' : 'Can I download my CV in PDF for free?',
      a: lang === 'uz'
        ? 'Ha! Boshlang‘ich bepul tarifda ham toza, chop etishga tayyor A4 vektorli PDF faylni yuklab olishingiz mumkin.'
        : 'Yes! Our free plan includes full-resolution A4 vector PDF export with standard templates.',
    },
    {
      q: lang === 'uz' ? 'Ma\'lumotlarim xavfsiz saqlanadimi?' : 'Is my personal data secure?',
      a: lang === 'uz'
        ? 'Albatta. Sizning shaxsiy ma\'lumotlaringiz shifrlangan holda himoyalanadi va uchinchi shaxslarga berilmaydi.'
        : 'Yes, your data is securely stored, never sold, and respects end-user privacy.',
    },
  ];

  return (
    <div className="space-y-24 py-6 sm:py-12">
      {/* 1. HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-800/40 text-xs font-semibold text-indigo-300">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>{lang === 'uz' ? 'Sun\'iy intellekt bilan quvvatlangan' : 'Powered by Gemini AI'}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-100 text-balance leading-tight">
              {t.heroTitle}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {t.heroSubtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                type="button"
                onClick={onStartCreate}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/35 inline-flex items-center justify-center gap-2 transition-all hover:scale-102 cursor-pointer"
              >
                <span>{t.heroCtaCreate}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#templates"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <LayoutTemplate className="w-4 h-4 text-indigo-400" />
                <span>{t.heroCtaTemplates}</span>
              </a>
            </div>

            {/* Key trust bullets */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 pt-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{t.heroFeature1}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{t.heroFeature2}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{t.heroFeature3}</span>
              </div>
            </div>
          </div>

          {/* Hero Right Visual Preview */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Decorative ambient glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-indigo-500/20 rounded-3xl blur-2xl opacity-60"></div>

              {/* Showcase Image or Interactive Mini Preview Card */}
              <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/90 shadow-2xl">
                <img
                  src="/src/assets/images/hero_cv_mockup_1790762768979.jpg"
                  alt="CV Genius AI Mockup"
                  className="w-full h-auto object-cover max-h-[460px]"
                />

                {/* Floating overlay banner with ATS badge */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold font-mono">
                      95%
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-100">ATS Muvofiqlik Tasdiqlandi</p>
                      <p className="text-[11px] text-slate-400">Jasur Alimov · Senior Frontend</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onStartCreate}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer"
                  >
                    Sinab ko‘rish
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
            {t.howItWorksTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            {t.howItWorksSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3 relative hover:border-slate-700 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold font-mono">
              01
            </div>
            <h3 className="font-bold text-sm text-slate-100">{t.step1Title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{t.step1Desc}</p>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3 relative hover:border-slate-700 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold font-mono">
              02
            </div>
            <h3 className="font-bold text-sm text-slate-100">{t.step2Title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{t.step2Desc}</p>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3 relative hover:border-slate-700 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold font-mono">
              03
            </div>
            <h3 className="font-bold text-sm text-slate-100">{t.step3Title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{t.step3Desc}</p>
          </div>

          {/* Step 4 */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3 relative hover:border-slate-700 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold font-mono">
              04
            </div>
            <h3 className="font-bold text-sm text-slate-100">{t.step4Title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{t.step4Desc}</p>
          </div>
        </div>
      </section>

      {/* 3. MAIN FEATURES BENTO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
            {t.featuresTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            {t.featuresSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-100">{t.featAiWriterTitle}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{t.featAiWriterDesc}</p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-100">{t.featAtsTitle}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{t.featAtsDesc}</p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-100">{t.featTemplatesTitle}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{t.featTemplatesDesc}</p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-600/20 text-rose-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-100">{t.featCoverLetterTitle}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{t.featCoverLetterDesc}</p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-600/20 text-amber-400 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-100">{t.featJobMatchTitle}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{t.featJobMatchDesc}</p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-100">{t.featFastExportTitle}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{t.featFastExportDesc}</p>
          </div>
        </div>
      </section>

      {/* 4. RESUME TEMPLATES GALLERY */}
      <section id="templates" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
              {lang === 'uz' ? 'Professional Rezyume Shablonlari' : 'Curated Resume Templates'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {lang === 'uz'
                ? 'Har bir shablon HR standartlariga mos va 100% tahrirlanadi'
                : 'Every template is engineered for ATS compliance and clean A4 rendering'}
            </p>
          </div>

          <button
            type="button"
            onClick={onStartCreate}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1 cursor-pointer"
          >
            {lang === 'uz' ? 'Shablonni tanlab boshlash' : 'Select Template'}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templatesList.map((tpl) => (
            <div
              key={tpl.id}
              className="group rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 p-5 space-y-4 transition-all hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="font-bold text-base text-slate-100">{tpl.name}</h3>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-950/60 text-indigo-300 border border-indigo-800/40">
                    {tpl.tag}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{tpl.desc}</p>
              </div>

              {/* Template thumbnail representation */}
              <div className="h-44 rounded-xl bg-slate-950 border border-slate-800 p-3 overflow-hidden flex flex-col justify-between">
                <div className="space-y-1.5 opacity-60">
                  <div className="h-3 w-1/3 bg-indigo-500/40 rounded"></div>
                  <div className="h-2 w-1/2 bg-slate-700 rounded"></div>
                  <div className="h-1.5 w-full bg-slate-800 rounded mt-3"></div>
                  <div className="h-1.5 w-5/6 bg-slate-800 rounded"></div>
                  <div className="h-1.5 w-4/6 bg-slate-800 rounded"></div>
                </div>
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-mono">A4 Ready</span>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectTemplate(tpl.id);
                      onStartCreate();
                    }}
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer transition-colors"
                  >
                    Tanlash
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PRICING SECTION */}
      <section id="pricing" className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
            {t.pricingTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            {t.pricingSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Free Tier */}
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-slate-200">{t.planFreeTitle}</h3>
              <p className="text-xs text-slate-400">{t.planFreeDesc}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-100 font-mono">{t.planFreePrice}</span>
                <span className="text-xs text-slate-500">/ {t.planFreePeriod}</span>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-slate-800 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{t.planFreeFeat1}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{t.planFreeFeat2}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{t.planFreeFeat3}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{t.planFreeFeat4}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onStartCreate}
              className="w-full py-3 rounded-2xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer transition-colors"
            >
              {t.navStartFree}
            </button>
          </div>

          {/* Premium Tier */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-indigo-950/40 via-slate-900 to-slate-900 border-2 border-indigo-500/50 shadow-2xl flex flex-col justify-between space-y-6 relative">
            <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full text-[11px] font-bold bg-indigo-600 text-white shadow-md">
              Tavsiya etiladi
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-lg text-indigo-300">{t.planPremiumTitle}</h3>
              <p className="text-xs text-slate-400">{t.planPremiumDesc}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-100 font-mono">{t.planPremiumPrice}</span>
                <span className="text-xs text-slate-500">/ {t.planPremiumPeriod}</span>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-slate-800 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                  <span>{t.planPremiumFeat1}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                  <span>{t.planPremiumFeat2}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                  <span>{t.planPremiumFeat3}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                  <span>{t.planPremiumFeat4}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                  <span>{t.planPremiumFeat5}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                  <span>{t.planPremiumFeat6}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                  <span>{t.planPremiumFeat7}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onStartCreate}
              className="w-full py-3 rounded-2xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/30 cursor-pointer transition-all hover:scale-102"
            >
              {t.btnUpgrade}
            </button>
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
            {lang === 'uz' ? 'Ko‘p beriladigan savollar' : 'Frequently Asked Questions'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {lang === 'uz' ? 'Rezyume yaratish va tizim bo‘yicha muhim savollarga javoblar' : 'Everything you need to know about our resume platform'}
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-semibold text-slate-100">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-indigo-400' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-400 leading-relaxed border-t border-slate-800/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. FINAL CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900 border border-indigo-800/40 text-center space-y-5">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100">
            {lang === 'uz' ? 'Karyerangizni yangi bosqichga olib chiqing' : 'Elevate Your Career Trajectory Today'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            {lang === 'uz'
              ? 'Minglab mutaxassislar orzularidagi ishga kirish uchun CV Genius AI dan foydalanmoqda.'
              : 'Join thousands of professionals securing interviews with AI-crafted resumes.'}
          </p>
          <button
            type="button"
            onClick={onStartCreate}
            className="px-8 py-3.5 rounded-2xl text-xs sm:text-sm font-bold bg-white text-slate-950 hover:bg-slate-100 shadow-xl inline-flex items-center gap-2 cursor-pointer transition-all hover:scale-102"
          >
            <span>{t.heroCtaCreate}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="no-print border-t border-slate-900 pt-12 pb-8 max-w-7xl mx-auto px-4 sm:px-6 text-xs text-slate-500">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-xs">
              CV
            </div>
            <span className="font-bold text-slate-200">CV Genius AI</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a href="#templates" className="hover:text-slate-300 transition-colors">
              {t.navTemplates}
            </a>
            <a href="#pricing" className="hover:text-slate-300 transition-colors">
              {t.navPricing}
            </a>
            <a href="#faq" className="hover:text-slate-300 transition-colors">
              {t.navFaq}
            </a>
            <button type="button" onClick={onLogin} className="hover:text-slate-300 transition-colors cursor-pointer">
              {t.navLogin}
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-[11px]">
          <span>© 2026 CV Genius AI. Barcha huquqlar himoyalangan.</span>
          <span className="text-slate-600">O‘zbekiston, Toshkent · Version 1.0</span>
        </div>
      </footer>
    </div>
  );
};
