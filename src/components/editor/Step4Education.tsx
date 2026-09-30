import React from 'react';
import { CVData, Education, Language } from '../../types';
import { GraduationCap, Plus, Trash2, School, BookOpen } from 'lucide-react';

interface StepProps {
  cv: CVData;
  onChange: (updated: CVData) => void;
  lang: Language;
}

export const Step4Education: React.FC<StepProps> = ({ cv, onChange, lang }) => {
  const addEducation = () => {
    const newEdu: Education = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      description: '',
      gpa: '',
    };
    onChange({
      ...cv,
      educations: [...cv.educations, newEdu],
    });
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    onChange({
      ...cv,
      educations: cv.educations.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    });
  };

  const removeEducation = (id: string) => {
    onChange({
      ...cv,
      educations: cv.educations.filter((edu) => edu.id !== id),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-400" />
            {lang === 'uz' ? 'Ta‘lim' : lang === 'ru' ? 'Образование' : 'Education'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {lang === 'uz'
              ? 'Universitet, kollej yoki akademik darajalaringizni kiriting.'
              : 'Add your university degree, college, or academic training.'}
          </p>
        </div>

        <button
          type="button"
          onClick={addEducation}
          className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          {lang === 'uz' ? 'Ta‘lim qo‘shish' : 'Add Education'}
        </button>
      </div>

      {cv.educations.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-slate-800 rounded-xl bg-slate-900/30">
          <GraduationCap className="w-9 h-9 text-slate-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-slate-300">
            {lang === 'uz' ? 'Hozircha ta‘lim ma\'lumoti kiritilmagan' : 'No education records yet'}
          </p>
          <button
            type="button"
            onClick={addEducation}
            className="mt-3 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 inline-flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            {lang === 'uz' ? 'Ta‘lim qo‘shish' : 'Add Record'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {cv.educations.map((edu, idx) => (
            <div
              key={edu.id}
              className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/90 space-y-4 shadow-sm"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                <span className="text-xs font-bold text-indigo-400">
                  #{idx + 1} {edu.institution || (lang === 'uz' ? 'O‘quv dargohi' : 'Institution')}
                </span>
                <button
                  type="button"
                  onClick={() => removeEducation(edu.id)}
                  className="text-slate-400 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-950/30 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Institution */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {lang === 'uz' ? 'Universitet yoki ta‘lim muassasasi' : 'Institution / University'} *
                  </label>
                  <div className="relative">
                    <School className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                      placeholder="Toshkent Axborot Texnologiyalari Universiteti (TATU)"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {/* Degree */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {lang === 'uz' ? 'Daraja' : 'Degree'} *
                  </label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    placeholder="Bakalavr, Magistr yoki Mutaxassis"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                {/* Field of Study */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {lang === 'uz' ? 'Mutaxassislik / Yo‘nalish' : 'Field of Study'}
                  </label>
                  <div className="relative">
                    <BookOpen className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={edu.fieldOfStudy}
                      onChange={(e) => updateEducation(edu.id, 'fieldOfStudy', e.target.value)}
                      placeholder="Dasturiy injiniring yoki Axborot tizimlari"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {/* Dates */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {lang === 'uz' ? 'Boshlanish sanasi' : 'Start Date'}
                  </label>
                  <input
                    type="text"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                    placeholder="2018-09"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 font-mono placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {lang === 'uz' ? 'Tugash sanasi' : 'Graduation Date'}
                  </label>
                  <input
                    type="text"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                    placeholder="2022-06 yoki Kutilayotgan yil"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 font-mono placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                {/* GPA */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    GPA {lang === 'uz' ? '(ixtiyoriy)' : '(Optional)'}
                  </label>
                  <input
                    type="text"
                    value={edu.gpa || ''}
                    onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                    placeholder="3.8 / 4.0 yoki A‘lo baholar"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 font-mono placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {lang === 'uz' ? 'Qo‘shimcha tavsif (yutuqlar, ilmiy ishlar)' : 'Description'}
                  </label>
                  <textarea
                    rows={2}
                    value={edu.description || ''}
                    onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                    placeholder={
                      lang === 'uz'
                        ? 'Algoritmlar, ma\'lumotlar bazasi va dasturlash bo‘yicha maxsus chuqurlashtirilgan dastur.'
                        : 'Focused on algorithms, data structures, and software architecture.'
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
