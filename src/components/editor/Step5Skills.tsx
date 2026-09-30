import React, { useState } from 'react';
import { CVData, Language, SkillItem } from '../../types';
import { aiService } from '../../services/aiService';
import { Award, Plus, X, Sparkles, Loader2, Check } from 'lucide-react';

interface StepProps {
  cv: CVData;
  onChange: (updated: CVData) => void;
  lang: Language;
}

export const Step5Skills: React.FC<StepProps> = ({ cv, onChange, lang }) => {
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<SkillItem['level']>('Ilg\'or');
  const [loadingAi, setLoadingAi] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

  const addSkill = (name: string, level: SkillItem['level'] = 'Ilg\'or') => {
    if (!name.trim()) return;
    if (cv.skills.some((s) => s.name.toLowerCase() === name.trim().toLowerCase())) return;

    const skill: SkillItem = {
      id: `skill-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      name: name.trim(),
      level,
      category: 'Hard Skills',
    };

    onChange({
      ...cv,
      skills: [...cv.skills, skill],
    });
    setNewSkillName('');
  };

  const removeSkill = (id: string) => {
    onChange({
      ...cv,
      skills: cv.skills.filter((s) => s.id !== id),
    });
  };

  const handleSuggestSkills = async () => {
    setLoadingAi(true);
    try {
      const suggestions = await aiService.suggestSkills({
        jobTitle: cv.personalInfo.jobTitle || 'Dasturchi',
        experiencesSummary: cv.experiences.map((e) => `${e.position} at ${e.company}`).join(', '),
        language: lang,
      });
      // Filter out existing
      const existingNames = new Set(cv.skills.map((s) => s.name.toLowerCase()));
      const filtered = suggestions.filter((s) => !existingNames.has(s.toLowerCase()));
      setAiSuggestions(filtered);
    } catch {
      // Error
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-400" />
            {lang === 'uz' ? 'Ko‘nikmalar' : lang === 'ru' ? 'Навыки' : 'Skills'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {lang === 'uz'
              ? 'ATS filtrlari rezyumedagi ko‘nikmalarni birinchi navbatda tahlil qiladi. Texnik (Hard) va ijtimoiy (Soft) ko‘nikmalarni qo‘shing.'
              : 'Add relevant hard and soft skills. Applicant Tracking Systems specifically index these keywords.'}
          </p>
        </div>

        <button
          type="button"
          onClick={handleSuggestSkills}
          disabled={loadingAi}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 disabled:opacity-50 shadow-sm"
        >
          {loadingAi ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {lang === 'uz' ? 'Qidirilmoqda...' : 'Analyzing...'}
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-purple-200" />
              {lang === 'uz' ? 'AI taklif qilgan ko‘nikmalar' : 'AI Skill Suggestions'}
            </>
          )}
        </button>
      </div>

      {/* AI Suggestions Pill Bar */}
      {aiSuggestions.length > 0 && (
        <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-800/50 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {lang === 'uz' ? 'AI sizning sohangiz uchun tavsiya qilgan ko‘nikmalar:' : 'AI Suggested Skills:'}
            </span>
            <button
              type="button"
              onClick={() => {
                aiSuggestions.forEach((s) => addSkill(s));
                setAiSuggestions([]);
              }}
              className="text-[11px] font-semibold text-purple-300 hover:text-purple-200 underline cursor-pointer"
            >
              {lang === 'uz' ? 'Barchasini qo‘shish' : 'Add All'}
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {aiSuggestions.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  addSkill(s);
                  setAiSuggestions(aiSuggestions.filter((item) => item !== s));
                }}
                className="px-2.5 py-1 rounded-lg text-xs bg-purple-900/60 hover:bg-purple-800/80 text-purple-200 border border-purple-700/60 inline-flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Plus className="w-3 h-3" />
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Add Skill Input Form */}
      <div className="flex flex-col sm:flex-row gap-2.5 p-3 rounded-xl bg-slate-900 border border-slate-800">
        <input
          type="text"
          value={newSkillName}
          onChange={(e) => setNewSkillName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addSkill(newSkillName, newSkillLevel);
            }
          }}
          placeholder={lang === 'uz' ? 'Masalan: React.js, TypeScript, SQL, Figma, Scrum...' : 'E.g., Python, Docker, UX Design...'}
          className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />

        <select
          value={newSkillLevel}
          onChange={(e) => setNewSkillLevel(e.target.value as SkillItem['level'])}
          className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="Boshlang'ich">{lang === 'uz' ? 'Boshlang\'ich' : 'Beginner'}</option>
          <option value="O'rta">{lang === 'uz' ? 'O\'rta' : 'Intermediate'}</option>
          <option value="Ilg'or">{lang === 'uz' ? 'Ilg\'or' : 'Advanced'}</option>
          <option value="Ekspert">{lang === 'uz' ? 'Ekspert' : 'Expert'}</option>
        </select>

        <button
          type="button"
          onClick={() => addSkill(newSkillName, newSkillLevel)}
          className="px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          {lang === 'uz' ? 'Qo‘shish' : 'Add'}
        </button>
      </div>

      {/* Current Skills List */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-slate-300">
            {lang === 'uz' ? 'Rezyumedagi ko‘nikmalar' : 'Added Skills'} ({cv.skills.length})
          </label>
        </div>

        {cv.skills.length === 0 ? (
          <p className="text-xs text-slate-500 py-4 text-center border border-dashed border-slate-800 rounded-xl">
            {lang === 'uz' ? 'Hali ko‘nikma qo‘shilmadi. Yuqoridagi takliflardan yoki formadan foydalaning.' : 'No skills added yet.'}
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {cv.skills.map((skill) => (
              <div
                key={skill.id}
                className="group pl-3 pr-2 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-200 inline-flex items-center gap-2 transition-colors shadow-xs"
              >
                <span className="font-medium">{skill.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                  {skill.level}
                </span>
                <button
                  type="button"
                  onClick={() => removeSkill(skill.id)}
                  className="text-slate-500 hover:text-rose-400 p-0.5 rounded transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
