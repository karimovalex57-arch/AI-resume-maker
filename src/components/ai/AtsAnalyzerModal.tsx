import React, { useState, useEffect } from 'react';
import { AtsAnalysisResult, CVData, Language } from '../../types';
import { aiService } from '../../services/aiService';
import { translations } from '../../data/translations';
import { Sparkles, CheckCircle2, AlertTriangle, AlertCircle, X, ShieldAlert, Loader2 } from 'lucide-react';

interface AtsModalProps {
  cv: CVData;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const AtsAnalyzerModal: React.FC<AtsModalProps> = ({ cv, isOpen, onClose, lang }) => {
  const [analysis, setAnalysis] = useState<AtsAnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);

  const t = translations[lang];

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      aiService
        .analyzeAts(cv, lang)
        .then((res) => setAnalysis(res))
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [isOpen, cv, lang]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">
                {lang === 'uz' ? 'ATS Muvofiqlik Tahlili' : 'ATS Readiness Analysis'}
              </h2>
              <p className="text-xs text-slate-400">
                {cv.title || cv.personalInfo.fullName}
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

        {loading ? (
          <div className="py-16 text-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-400 mx-auto" />
            <p className="text-sm font-medium text-slate-300">
              {lang === 'uz' ? 'Rezyume ATS algoritmlari orqali tekshirilmoqda...' : 'Analyzing CV with ATS heuristics...'}
            </p>
            <p className="text-xs text-slate-500">
              {lang === 'uz' ? 'Formatlash, kalit so‘zlar va tajriba yutuqlari o‘rganilmoqda' : 'Auditing keywords and formatting structure'}
            </p>
          </div>
        ) : analysis ? (
          <div className="space-y-6">
            {/* Top Score Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950/40 border border-indigo-900/40 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="relative flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full border-4 border-indigo-500/30 flex items-center justify-center">
                    <span className="text-2xl font-black text-indigo-400 font-mono tabular-nums">
                      {analysis.score}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">/100</span>
                  </div>
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 mb-1">
                    Daraja: {analysis.grade}
                  </div>
                  <h3 className="text-sm font-bold text-slate-100">
                    {analysis.score >= 85
                      ? (lang === 'uz' ? 'Yuqori moslik darajasi' : 'Excellent ATS Pass Rate')
                      : (lang === 'uz' ? 'Yaxshi, lekin yaxshilash mumkin' : 'Good with room for improvement')}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {analysis.score >= 85
                      ? (lang === 'uz' ? 'HR avtomatlashtirilgan filtrlaridan muammosiz o‘tadi.' : 'Will successfully pass automated recruiter scans.')
                      : (lang === 'uz' ? 'Quyidagi tavsiyalarni qo‘llash orqali ballni 95+ ga oshiring.' : 'Apply suggestions below to boost rating to 95+.')}
                  </p>
                </div>
              </div>
            </div>

            {/* Breakdown meters */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <span className="text-slate-400 block mb-1">{lang === 'uz' ? 'Kalit so‘zlar' : 'Keywords'}</span>
                <span className="text-base font-bold text-slate-100 font-mono tabular-nums">{analysis.breakdown.keywords}%</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <span className="text-slate-400 block mb-1">{lang === 'uz' ? 'Formatlash' : 'Formatting'}</span>
                <span className="text-base font-bold text-slate-100 font-mono tabular-nums">{analysis.breakdown.formatting}%</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <span className="text-slate-400 block mb-1">{lang === 'uz' ? 'Ko‘nikmalar chuqurligi' : 'Skills Depth'}</span>
                <span className="text-base font-bold text-slate-100 font-mono tabular-nums">{analysis.breakdown.skillsDepth}%</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <span className="text-slate-400 block mb-1">{lang === 'uz' ? 'Yutuqlar ta\'siri' : 'Experience Impact'}</span>
                <span className="text-base font-bold text-slate-100 font-mono tabular-nums">{analysis.breakdown.experienceImpact}%</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:col-span-2">
                <span className="text-slate-400 block mb-1">{lang === 'uz' ? 'Bo‘limlar to‘liqligi' : 'Section Completeness'}</span>
                <span className="text-base font-bold text-slate-100 font-mono tabular-nums">{analysis.breakdown.completeness}%</span>
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="space-y-4">
              {/* Strengths */}
              {analysis.strengths.length > 0 && (
                <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-2">
                  <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    {lang === 'uz' ? 'Kuchli tomonlari' : 'Strengths'}
                  </h4>
                  <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                    {analysis.strengths.map((str, i) => (
                      <li key={i}>{str}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recommendations */}
              {analysis.recommendations.length > 0 && (
                <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-900/40 space-y-2">
                  <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    {lang === 'uz' ? 'Tavsiya etilgan yaxshilanishlar' : 'Suggested Recommendations'}
                  </h4>
                  <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                    {analysis.recommendations.map((rec, i) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Missing information if any */}
              {analysis.missingInformation.length > 0 && (
                <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-2">
                  <h4 className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    {lang === 'uz' ? 'Yetishmayotgan muhim ma\'lumotlar' : 'Missing Information'}
                  </h4>
                  <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                    {analysis.missingInformation.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Mandatory Disclaimer */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <p>
                {lang === 'uz'
                  ? 'Izoh: Ushbu ball ATS tizimlari uchun tavsiyaviy baho bo\'lib, 100% kafolat bermaydi, balki avtomatlashtirilgan saralashdan muvaffaqiyatli o\'tish ehtimolini oshiradi.'
                  : 'Important Note: This score is an automated estimation based on ATS criteria and does not guarantee job placement, but significantly improves recruiter visibility.'}
              </p>
            </div>
          </div>
        ) : null}

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
          >
            {lang === 'uz' ? 'Tushunarli' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
