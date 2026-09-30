import React from 'react';
import { CVData, Language, ProjectItem } from '../../types';
import { Code, Plus, Trash2, Globe } from 'lucide-react';

interface StepProps {
  cv: CVData;
  onChange: (updated: CVData) => void;
  lang: Language;
}

export const Step8Projects: React.FC<StepProps> = ({ cv, onChange, lang }) => {
  const addProject = () => {
    const newProject: ProjectItem = {
      id: `proj-${Date.now()}`,
      name: '',
      description: '',
      technologies: ['React', 'TypeScript'],
      projectUrl: '',
    };
    onChange({
      ...cv,
      projects: [...cv.projects, newProject],
    });
  };

  const updateProject = (id: string, field: keyof ProjectItem, value: any) => {
    onChange({
      ...cv,
      projects: cv.projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    });
  };

  const removeProject = (id: string) => {
    onChange({
      ...cv,
      projects: cv.projects.filter((p) => p.id !== id),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Code className="w-5 h-5 text-indigo-400" />
            {lang === 'uz' ? 'Loyihalar' : lang === 'ru' ? 'Проекты' : 'Projects'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {lang === 'uz'
              ? 'Yaratgan veb-ilovalaringiz, startaplar yoki ochiq kodli ishlaringizni ko‘rsating.'
              : 'Showcase applications, freelance systems, or open-source repositories.'}
          </p>
        </div>

        <button
          type="button"
          onClick={addProject}
          className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          {lang === 'uz' ? 'Loyiha qo‘shish' : 'Add Project'}
        </button>
      </div>

      {cv.projects.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-slate-800 rounded-xl bg-slate-900/30">
          <Code className="w-9 h-9 text-slate-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-slate-300">
            {lang === 'uz' ? 'Hozircha loyihalar qo‘shilmagan' : 'No projects listed yet'}
          </p>
          <button
            type="button"
            onClick={addProject}
            className="mt-3 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 inline-flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            {lang === 'uz' ? 'Loyiha qo‘shish' : 'Add Project'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {cv.projects.map((proj) => (
            <div
              key={proj.id}
              className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <input
                  type="text"
                  value={proj.name}
                  onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                  placeholder={lang === 'uz' ? 'Loyiha nomi (masalan: FinTech SaaS Platform)' : 'Project Name'}
                  className="bg-transparent font-bold text-xs text-slate-100 placeholder-slate-500 focus:outline-none flex-1 mr-2"
                />
                <button
                  type="button"
                  onClick={() => removeProject(proj.id)}
                  className="text-slate-500 hover:text-rose-400 p-1 rounded transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    {lang === 'uz' ? 'Loyiha tavsifi va natijasi' : 'Description'}
                  </label>
                  <textarea
                    rows={2}
                    value={proj.description}
                    onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                    placeholder={
                      lang === 'uz'
                        ? 'Masalan: Tranzaksiyalarni real vaqtda kuzatish va analitika paneli. 50,000+ faol foydalanuvchiga ega.'
                        : 'E.g., Real-time financial analytics dashboard serving 50k+ active users.'
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    {lang === 'uz' ? 'Ishlatilgan texnologiyalar (vergul bilan)' : 'Technologies (comma-separated)'}
                  </label>
                  <input
                    type="text"
                    value={proj.technologies.join(', ')}
                    onChange={(e) =>
                      updateProject(
                        proj.id,
                        'technologies',
                        e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                      )
                    }
                    placeholder="React, TypeScript, Tailwind, Node.js"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    {lang === 'uz' ? 'Loyiha havolasi (Live URL / GitHub)' : 'Project URL'}
                  </label>
                  <div className="relative">
                    <Globe className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      value={proj.projectUrl || ''}
                      onChange={(e) => updateProject(proj.id, 'projectUrl', e.target.value)}
                      placeholder="https://fintech-demo.uz"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
