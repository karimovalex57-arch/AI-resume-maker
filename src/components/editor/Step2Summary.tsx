import React, { useState } from 'react';
import { CVData, Language } from '../../types';
import { aiService } from '../../services/aiService';
import { FileText, Sparkles, Loader2, Check } from 'lucide-react';

interface StepProps {
  cv: CVData;
  onChange: (updated: CVData) => void;
  lang: Language;
}

export const Step2Summary: React.FC<StepProps> = ({ cv, onChange, lang }) => {
  const [loading, setLoading] = useState(false);
  const [tone, setTone] = useState<'professional' | 'executive' | 'creative'>('professional');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleAiGenerate = async () => {
    setLoading(true);
    setStatusMessage(null);
    try {
      const summary = await aiService.generateSummary({
        jobTitle: cv.personalInfo.jobTitle || 'Mutaxassis',
        keySkills: cv.skills.map((s) => s.name).slice(0, 5),
        language: lang,
      });

      onChange({
        ...cv,
        personalInfo: {
          ...cv.personalInfo,
          summary,
        },
      });
      setStatusMessage(lang === 'uz' ? 'AI orqali xulosa muvaffaqiyatli yaratildi!' : 'Summary generated successfully by AI!');
      setTimeout(() => setStatusMessage(null), 3000);
    } catch {
      setStatusMessage(lang === 'uz' ? 'Kutilmagan xatolik yuz berdi' : 'Failed to generate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            {lang === 'uz' ? 'Professional xulosa' : lang === 'ru' ? 'О себе (Summary)' : 'Professional Summary'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {lang === 'uz'
              ? 'Rezyumening eng birinchi o‘qiladigan qismi. O‘z yutuqlaringiz va asosiy maqsadlaringizni 3-4 jumlada ifodalang.'
              : 'The first hook recruiters read. Summarize your top value proposition in 3-4 impactful sentences.'}
          </p>
        </div>

        {/* AI Action Button */}
        <button
          type="button"
          onClick={handleAiGenerate}
          disabled={loading}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-purple-500 text-white shadow-md shadow-indigo-600/20 inline-flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50 shrink-0"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {lang === 'uz' ? 'AI yozmoqda...' : 'Generating...'}
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-indigo-200" />
              {lang === 'uz' ? 'AI bilan yozish' : lang === 'ru' ? 'Написать с ИИ' : 'Write with AI'}
            </>
          )}
        </button>
      </div>

      {statusMessage && (
        <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-800 text-xs text-emerald-300 flex items-center gap-2">
          <Check className="w-4 h-4" />
          {statusMessage}
        </div>
      )}

      {/* Textarea */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <label className="font-medium text-slate-300">
            {lang === 'uz' ? 'Xulosa matni' : 'Summary Text'}
          </label>
          <span className="text-slate-500 font-mono tabular-nums text-[11px]">
            {cv.personalInfo.summary?.length || 0} / 500 belgi
          </span>
        </div>

        <textarea
          rows={6}
          value={cv.personalInfo.summary || ''}
          onChange={(e) =>
            onChange({
              ...cv,
              personalInfo: {
                ...cv.personalInfo,
                summary: e.target.value,
              },
            })
          }
          placeholder={
            lang === 'uz'
              ? 'Masalan: 5 yillik tajribaga ega bo\'lgan Senior Frontend Dasturchi. Yuqori yuklamali SaaS mahsulotlarini React va TypeScript yordamida ishlab chiqishga ixtisoslashgan. Foydalanuvchilar konversiyasini 30% ga oshirgan...'
              : 'E.g., Results-oriented Senior Software Engineer with 5+ years of experience delivering scalable enterprise cloud applications...'
          }
          className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-3.5 text-xs text-slate-100 placeholder-slate-500 leading-relaxed focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      {/* Tips box */}
      <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 text-xs text-slate-400 space-y-1.5">
        <p className="font-semibold text-slate-300">💡 Professional maslahat:</p>
        <p>• O‘zingizning yillik tajribangiz va mutaxassisligingiz bilan boshlang.</p>
        <p>• Aniq raqamlar yoki foizlar keltiring (masalan: "daromadni 20% ga oshirdi", "10 kishilik jamoani boshqardi").</p>
        <p>• "Mehnatkash", "punktual" kabi umumiy so‘zlar o‘rniga aniq ko‘nikmalarni ko‘rsating.</p>
      </div>
    </div>
  );
};
