import React, { useState } from 'react';
import { CVData, JobMatchResult, Language } from '../../types';
import { aiService } from '../../services/aiService';
import { Target, CheckCircle, XCircle, Sparkles, Loader2, X, ArrowRight, Lightbulb } from 'lucide-react';

interface JobMatchModalProps {
  cv: CVData;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const JobMatchModal: React.FC<JobMatchModalProps> = ({ cv, isOpen, onClose, lang }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState<JobMatchResult | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleMatch = async () => {
    if (!jobDescription.trim()) return;
    setLoading(true);
    try {
      const matchData = await aiService.matchJob(cv, jobDescription, lang);
      setResult(matchData);
    } catch {
      // Handled
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">
                {lang === 'uz' ? 'Vakansiyaga Moslashtirish (Job Matching)' : 'Job Description Matcher'}
              </h2>
              <p className="text-xs text-slate-400">
                {lang === 'uz'
                  ? 'Vakansiya talablarini kiriting va AI sizning CVingizni taqqoslab beradi'
                  : 'Compare your CV against specific job postings to find skill gaps'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-2 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input box */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">
            {lang === 'uz' ? 'Vakansiya matni yoki talablarini joylang:' : 'Paste Job Description / Vacancy Requirements:'}
          </label>
          <textarea
            rows={4}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder={
              lang === 'uz'
                ? 'Masalan: Bizga 3+ yillik React, TypeScript, Next.js tajribasiga ega, Docker va microservices bilan ishlagan Frontend Engineer kerak...'
                : 'E.g., Seeking Senior Frontend Engineer with 4+ years of React, TypeScript, GraphQL, CI/CD...'
            }
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 leading-relaxed focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />

          <div className="flex justify-between items-center pt-1">
            <button
              type="button"
              onClick={() =>
                setJobDescription(
                  'Bizga kuchli Frontend Dasturchi kerak. Talablar: React, TypeScript, Tailwind CSS, RESTful APIs, Git, Agile metodologiyasi. Docker va Next.js bilish ustunlik beradi.'
                )
              }
              className="text-[11px] text-indigo-400 hover:underline cursor-pointer"
            >
              {lang === 'uz' ? 'Namuna vakansiyani kiritish' : 'Insert sample job'}
            </button>

            <button
              type="button"
              onClick={handleMatch}
              disabled={loading || !jobDescription.trim()}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 inline-flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-40"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {lang === 'uz' ? 'Tahlil qilinmoqda...' : 'Analyzing...'}
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  {lang === 'uz' ? 'Moslikni tekshirish' : 'Match Resume'}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-5 pt-4 border-t border-slate-800">
            {/* Match score */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block mb-0.5">
                  {lang === 'uz' ? 'Vakansiyaga umumiy moslik' : 'Overall Match Score'}
                </span>
                <p className="text-xs text-slate-300 font-medium">{result.verdictUz}</p>
              </div>
              <div className="text-3xl font-black text-indigo-400 font-mono tabular-nums shrink-0 pl-4">
                {result.matchPercentage}%
              </div>
            </div>

            {/* Matching vs Missing Skills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Matching */}
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-2">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" />
                  {lang === 'uz' ? 'Mos kelgan ko‘nikmalar' : 'Matching Skills'} ({result.matchingSkills.length})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {result.matchingSkills.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[11px] bg-emerald-900/40 text-emerald-200 border border-emerald-700/50"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing */}
              <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-2">
                <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" />
                  {lang === 'uz' ? 'Yetishmayotgan talablar' : 'Missing Keywords'} ({result.missingSkills.length})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {result.missingSkills.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[11px] bg-rose-900/40 text-rose-200 border border-rose-700/50"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actionable improvements */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                {lang === 'uz' ? 'Rezyumeni kuchaytirish bo‘yicha aniq tavsiyalar:' : 'Actionable CV Adjustments:'}
              </span>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                {result.actionableImprovements.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
