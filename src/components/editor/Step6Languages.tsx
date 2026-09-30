import React, { useState } from 'react';
import { CVData, Language, LanguageSkill } from '../../types';
import { Languages, Plus, Trash2 } from 'lucide-react';

interface StepProps {
  cv: CVData;
  onChange: (updated: CVData) => void;
  lang: Language;
}

export const Step6Languages: React.FC<StepProps> = ({ cv, onChange, lang }) => {
  const [newLang, setNewLang] = useState('');
  const [newLevel, setNewLevel] = useState<LanguageSkill['level']>('C1');

  const addLanguage = (name: string, level: LanguageSkill['level']) => {
    if (!name.trim()) return;
    const item: LanguageSkill = {
      id: `lang-${Date.now()}`,
      language: name.trim(),
      level,
    };
    onChange({
      ...cv,
      languages: [...cv.languages, item],
    });
    setNewLang('');
  };

  const removeLanguage = (id: string) => {
    onChange({
      ...cv,
      languages: cv.languages.filter((l) => l.id !== id),
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <Languages className="w-5 h-5 text-indigo-400" />
          {lang === 'uz' ? 'Tillar' : lang === 'ru' ? 'Языки' : 'Languages'}
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          {lang === 'uz'
            ? 'Qaysi tillarda erkin muloqot qila olasiz? Xalqaro CEFR darajalari (A1 - C2) yoki Ona tili.'
            : 'Specify language proficiencies and CEFR levels.'}
        </p>
      </div>

      {/* Add form */}
      <div className="flex flex-col sm:flex-row gap-2.5 p-3 rounded-xl bg-slate-900 border border-slate-800">
        <input
          type="text"
          value={newLang}
          onChange={(e) => setNewLang(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addLanguage(newLang, newLevel);
            }
          }}
          placeholder={lang === 'uz' ? 'Masalan: Ingliz tili, Nemis tili, Rus tili...' : 'E.g., English, German...'}
          className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />

        <select
          value={newLevel}
          onChange={(e) => setNewLevel(e.target.value as LanguageSkill['level'])}
          className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="Ona tili">{lang === 'uz' ? 'Ona tili' : 'Native'}</option>
          <option value="C2">C2 (Professional / Bilimdon)</option>
          <option value="C1">C1 (Ilg‘or / Advanced)</option>
          <option value="B2">B2 (O‘rta-yuqori / Upper-Int)</option>
          <option value="B1">B1 (O‘rta / Intermediate)</option>
          <option value="A2">A2 (Boshlang‘ich / Elementary)</option>
          <option value="A1">A1 (Boshlang‘ich)</option>
        </select>

        <button
          type="button"
          onClick={() => addLanguage(newLang, newLevel)}
          className="px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          {lang === 'uz' ? 'Qo‘shish' : 'Add'}
        </button>
      </div>

      {/* Languages List */}
      <div className="space-y-2">
        {cv.languages.map((l) => (
          <div
            key={l.id}
            className="flex items-center justify-between p-3 rounded-xl bg-slate-900/70 border border-slate-800"
          >
            <div className="flex items-center gap-3">
              <span className="font-semibold text-xs text-slate-100">{l.language}</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-indigo-300 font-mono">
                {l.level}
              </span>
            </div>
            <button
              type="button"
              onClick={() => removeLanguage(l.id)}
              className="text-slate-500 hover:text-rose-400 p-1 rounded transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
