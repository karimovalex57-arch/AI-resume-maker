import React, { useState } from 'react';
import { CVData, Language, CoverLetterData } from '../../types';
import { aiService } from '../../services/aiService';
import { sampleCoverLetter } from '../../data/sampleCVs';
import { FileText, Sparkles, Copy, Check, Download, Printer, Loader2, ArrowLeft } from 'lucide-react';

interface CoverLetterProps {
  cvs: CVData[];
  onBack: () => void;
  lang: Language;
}

export const CoverLetterStudio: React.FC<CoverLetterProps> = ({ cvs, onBack, lang }) => {
  const [targetCompany, setTargetCompany] = useState('PayTech Solutions');
  const [jobPosition, setJobPosition] = useState('Lead Frontend Engineer');
  const [jobDescription, setJobDescription] = useState('React, TypeScript, jamoa yetakchiligi va SaaS mahsulotlarini rivojlantirish.');
  const [userExperience, setUserExperience] = useState('6+ yillik tajriba, 10 kishilik jamoa yetakchisi, Core Web Vitals 98/100.');
  const [tone, setTone] = useState<CoverLetterData['tone']>('professional');
  const [generatedLetter, setGeneratedLetter] = useState(sampleCoverLetter.generatedContent);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const content = await aiService.generateCoverLetter({
        targetCompany,
        jobPosition,
        jobDescription,
        userExperienceHighlights: userExperience,
        tone,
        language: lang,
      });
      setGeneratedLetter(content);
    } catch {
      // Handled
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownloadTxt = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedLetter], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${targetCompany}-${jobPosition}-CoverLetter.txt`;
    document.body.appendChild(element);
    element.click();
    element.remove();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between no-print">
        <button
          type="button"
          onClick={onBack}
          className="text-xs font-medium text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-900 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          {lang === 'uz' ? 'Kabinetga qaytish' : 'Back to Dashboard'}
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 inline-flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? (lang === 'uz' ? 'Nusxalandi!' : 'Copied!') : (lang === 'uz' ? 'Nusxalash' : 'Copy')}
          </button>
          <button
            type="button"
            onClick={handleDownloadTxt}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            TXT
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            PDF / Chop etish
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs Form (5 cols) */}
        <div className="lg:col-span-5 space-y-4 no-print">
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div>
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                {lang === 'uz' ? 'AI Ilhom Xati (Cover Letter) Parametrlari' : 'Cover Letter Parameters'}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {lang === 'uz'
                  ? 'Kompaniya va lavozim ma\'lumotlarini kiriting, AI ta\'sirli xat tayyorlaydi.'
                  : 'Enter company and vacancy details to generate a tailored cover letter.'}
              </p>
            </div>

            {/* Target Company */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {lang === 'uz' ? 'Kompaniya nomi' : 'Target Company'} *
              </label>
              <input
                type="text"
                value={targetCompany}
                onChange={(e) => setTargetCompany(e.target.value)}
                placeholder="PayTech Solutions"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Job Position */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {lang === 'uz' ? 'Lavozim nomi' : 'Job Position'} *
              </label>
              <input
                type="text"
                value={jobPosition}
                onChange={(e) => setJobPosition(e.target.value)}
                placeholder="Lead Frontend Engineer"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Job Description Context */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {lang === 'uz' ? 'Vakansiya talablari (qisqacha)' : 'Job Requirements Context'}
              </label>
              <textarea
                rows={3}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="React, TypeScript, mikro-frontendlar, jamoaviy yetakchilik..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 placeholder-slate-500 leading-relaxed focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* User Experience Highlights */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {lang === 'uz' ? 'O‘zingizning asosiy yutuqlaringiz' : 'Candidate Experience Highlights'}
              </label>
              <textarea
                rows={3}
                value={userExperience}
                onChange={(e) => setUserExperience(e.target.value)}
                placeholder="6+ yillik tajriba, Core Web Vitals 98/100, $2.5M tranzaksiya hajmi..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 placeholder-slate-500 leading-relaxed focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Tone selector */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                {lang === 'uz' ? 'Xat ohangi (Tone)' : 'Letter Tone'}
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {(['professional', 'confident', 'enthusiastic', 'creative'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTone(t)}
                    className={`px-3 py-1.5 rounded-lg border text-left capitalize transition-colors cursor-pointer ${
                      tone === t
                        ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 font-semibold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Action button */}
            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading || !targetCompany || !jobPosition}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-600/25 inline-flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-40"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {lang === 'uz' ? 'AI ilhom xatini yozmoqda...' : 'Generating Cover Letter...'}
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  {lang === 'uz' ? 'Xatni AI bilan yaratish' : 'Generate with AI'}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Output Sheet (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white text-slate-900 rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-200 min-h-[600px] flex flex-col justify-between">
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4 flex justify-between items-baseline">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {targetCompany}
                  </h3>
                  <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mt-0.5">
                    {jobPosition} uchun Ilhom Xati
                  </p>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  {new Date().toISOString().split('T')[0]}
                </span>
              </div>

              {/* Editable Content */}
              <textarea
                value={generatedLetter}
                onChange={(e) => setGeneratedLetter(e.target.value)}
                rows={16}
                className="w-full bg-transparent text-xs sm:text-sm text-slate-800 leading-relaxed focus:outline-none resize-none"
              />
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>CV Genius AI Cover Letter Studio</span>
              <span>A4 Format Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
