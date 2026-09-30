import React, { useState } from 'react';
import { CVData, Language, WorkExperience } from '../../types';
import { aiService } from '../../services/aiService';
import { Briefcase, Plus, Trash2, Sparkles, Loader2, Calendar, Building, MapPin } from 'lucide-react';

interface StepProps {
  cv: CVData;
  onChange: (updated: CVData) => void;
  lang: Language;
}

export const Step3Experience: React.FC<StepProps> = ({ cv, onChange, lang }) => {
  const [improvingId, setImprovingId] = useState<string | null>(null);

  const addExperience = () => {
    const newExp: WorkExperience = {
      id: `exp-${Date.now()}`,
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      responsibilities: '',
      achievements: '',
    };
    onChange({
      ...cv,
      experiences: [newExp, ...cv.experiences],
    });
  };

  const updateExperience = (id: string, field: keyof WorkExperience, value: any) => {
    onChange({
      ...cv,
      experiences: cv.experiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    });
  };

  const removeExperience = (id: string) => {
    onChange({
      ...cv,
      experiences: cv.experiences.filter((exp) => exp.id !== id),
    });
  };

  const handleAiImprove = async (id: string, text: string, role: string) => {
    if (!text.trim()) return;
    setImprovingId(id);
    try {
      const improved = await aiService.improveExperience({
        text,
        role,
        language: lang,
      });
      updateExperience(id, 'responsibilities', improved);
    } catch {
      // Error handled
    } finally {
      setImprovingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-400" />
            {lang === 'uz' ? 'Ish tajribasi' : lang === 'ru' ? 'Опыт работы' : 'Work Experience'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {lang === 'uz'
              ? 'Eng oxirgi ish joyingizdan boshlab tartib bilan kiriting. AI jumlalaringizni professional tarzda kuchaytirib beradi.'
              : 'Add your career history in reverse chronological order. Use AI to transform duties into quantifiable achievements.'}
          </p>
        </div>

        <button
          type="button"
          onClick={addExperience}
          className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          {lang === 'uz' ? 'Yangi ish qo‘shish' : 'Add Experience'}
        </button>
      </div>

      {cv.experiences.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-slate-800 rounded-xl bg-slate-900/30">
          <Briefcase className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <p className="text-sm font-medium text-slate-300">
            {lang === 'uz' ? 'Hozircha ish tajribasi kiritilmagan' : 'No experience added yet'}
          </p>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {lang === 'uz'
              ? 'Talabalar amaliyot (internship) yoki shartnoma asosidagi loyihalarni kiritishlari mumkin.'
              : 'Students and graduates can add internships or freelance projects.'}
          </p>
          <button
            type="button"
            onClick={addExperience}
            className="mt-4 px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            {lang === 'uz' ? 'Ish qo‘shish' : 'Add Job'}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {cv.experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/90 space-y-4 shadow-sm relative group"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                <span className="text-xs font-bold text-indigo-400">
                  #{index + 1} {exp.position || (lang === 'uz' ? 'Lavozim' : 'Role')} {exp.company ? `· ${exp.company}` : ''}
                </span>
                <button
                  type="button"
                  onClick={() => removeExperience(exp.id)}
                  className="text-slate-400 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-950/30 transition-colors cursor-pointer"
                  title={lang === 'uz' ? 'O‘chirish' : 'Delete'}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Company */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {lang === 'uz' ? 'Kompaniya yoki tashkilot nomi' : 'Company'} *
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      placeholder="PayTech Solutions"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {/* Position */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {lang === 'uz' ? 'Lavozim' : 'Position / Job Title'} *
                  </label>
                  <input
                    type="text"
                    value={exp.position}
                    onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                    placeholder="Lead Frontend Engineer"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {lang === 'uz' ? 'Joylashuv' : 'Location'}
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={exp.location || ''}
                      onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                      placeholder="Toshkent, O‘zbekiston yoki Remote"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {/* Dates & Currently working */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      {lang === 'uz' ? 'Boshlanish sanasi' : 'Start Date'}
                    </label>
                    <input
                      type="text"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                      placeholder="2022-03"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      {lang === 'uz' ? 'Tugash sanasi' : 'End Date'}
                    </label>
                    <input
                      type="text"
                      disabled={exp.current}
                      value={exp.current ? (lang === 'uz' ? 'Hozirda' : 'Present') : exp.endDate}
                      onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                      placeholder="2024-05"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`current-${exp.id}`}
                  checked={exp.current}
                  onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                  className="rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
                <label htmlFor={`current-${exp.id}`} className="text-xs text-slate-300 cursor-pointer">
                  {lang === 'uz' ? 'Hozirda shu yerda ishlayman' : 'I currently work here'}
                </label>
              </div>

              {/* Responsibilities with AI Improve Button */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-slate-300">
                    {lang === 'uz' ? 'Vazifalar va majburiyatlar' : 'Responsibilities'}
                  </label>
                  <button
                    type="button"
                    onClick={() => handleAiImprove(exp.id, exp.responsibilities, exp.position)}
                    disabled={improvingId === exp.id || !exp.responsibilities.trim()}
                    className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1 cursor-pointer disabled:opacity-40"
                  >
                    {improvingId === exp.id ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin" />
                        {lang === 'uz' ? 'AI ishlamoqda...' : 'Improving...'}
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3 h-3 text-purple-400" />
                        {lang === 'uz' ? 'AI bilan yaxshilash' : 'Improve with AI'}
                      </>
                    )}
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={exp.responsibilities}
                  onChange={(e) => updateExperience(exp.id, 'responsibilities', e.target.value)}
                  placeholder={
                    lang === 'uz'
                      ? 'Masalan: 10 kishilik dasturchilar jamoasiga yetakchilik qilish, mikro-frontend arxitekturasini yaratish...'
                      : 'E.g., Led a team of 10 developers, designed scalable micro-frontend architecture...'
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 placeholder-slate-500 leading-relaxed focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              {/* Achievements */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {lang === 'uz' ? 'Asosiy yutuqlar (natijalar va raqamlar)' : 'Key Achievements'}
                </label>
                <textarea
                  rows={2}
                  value={exp.achievements || ''}
                  onChange={(e) => updateExperience(exp.id, 'achievements', e.target.value)}
                  placeholder={
                    lang === 'uz'
                      ? 'Masalan: Core Web Vitals ko‘rsatkichini 98/100 ga yetkazdi; tranzaksiya hajmini $2.5M ga oshirishga erishdi.'
                      : 'E.g., Increased app performance score to 98/100, contributed to $2.5M in revenue.'
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 placeholder-slate-500 leading-relaxed focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
