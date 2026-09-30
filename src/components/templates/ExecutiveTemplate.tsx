import React from 'react';
import { CVData } from '../../types';
import { themeMap } from './themeColors';

interface TemplateProps {
  cv: CVData;
}

export const ExecutiveTemplate: React.FC<TemplateProps> = ({ cv }) => {
  const theme = themeMap[cv.colorTheme || 'slate'];
  const { personalInfo, experiences, educations, skills, languages, certificates, projects } = cv;

  return (
    <div className="w-full bg-white text-slate-800 font-sans p-8 sm:p-10 shadow-sm min-h-[900px] text-sm">
      {/* Executive Header with classic serif-inspired elegance */}
      <div className="text-center border-b-2 pb-6 mb-6" style={{ borderColor: theme.primary }}>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-slate-900">
          {personalInfo.fullName || 'Ism Familiya'}
        </h1>
        <p className="text-sm font-semibold tracking-widest uppercase mt-1" style={{ color: theme.primary }}>
          {personalInfo.jobTitle || 'Executive / Boshqaruvchi'}
        </p>

        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 mt-3 text-xs text-slate-600">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && <span>| {personalInfo.phone}</span>}
          {personalInfo.email && <span>| {personalInfo.email}</span>}
          {personalInfo.linkedin && <span>| {personalInfo.linkedin}</span>}
        </div>
      </div>

      {/* Executive Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-xs font-serif font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
            Rahbarlik va Strategik Xulosa
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Leadership Experience */}
      {experiences && experiences.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-serif font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3">
            Boshqaruv va Professional Tajriba
          </h2>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-xs text-slate-950">
                    {exp.position} · <span className="font-semibold text-slate-700">{exp.company}</span>
                  </h3>
                  <span className="text-xs font-mono text-slate-600 tabular-nums">
                    {exp.startDate} – {exp.current ? 'Hozirgi vaqt' : exp.endDate}
                  </span>
                </div>
                {exp.responsibilities && (
                  <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                    {exp.responsibilities}
                  </p>
                )}
                {exp.achievements && (
                  <div className="mt-1 pl-3 border-l-2 text-xs text-slate-800" style={{ borderColor: theme.primary }}>
                    <strong>Moliyaviy va operatsion natijalar: </strong>
                    {exp.achievements}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {educations && educations.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-serif font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2.5">
            Oliy Ma‘lumot & Akademik Darajalar
          </h2>
          <div className="space-y-2 text-xs">
            {educations.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-slate-900">{edu.institution}</span> — {edu.degree} ({edu.fieldOfStudy})
                </div>
                <span className="text-slate-600 font-mono tabular-nums">{edu.startDate} – {edu.endDate}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Core Competencies (Skills) & Board / Languages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-3 border-t border-slate-200">
        {skills && skills.length > 0 && (
          <div>
            <h2 className="text-xs font-serif font-bold uppercase tracking-wider text-slate-900 mb-2">
              Asosiy Vakolatlar
            </h2>
            <div className="grid grid-cols-2 gap-1 text-xs text-slate-700">
              {skills.map((s) => (
                <div key={s.id} className="flex items-center gap-1.5">
                  <span className="text-slate-400">▪</span>
                  <span>{s.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {languages && languages.length > 0 && (
          <div>
            <h2 className="text-xs font-serif font-bold uppercase tracking-wider text-slate-900 mb-2">
              Til Bilish Salohiyati
            </h2>
            <div className="space-y-1 text-xs text-slate-700">
              {languages.map((l) => (
                <div key={l.id} className="flex justify-between">
                  <span className="font-semibold">{l.language}</span>
                  <span className="text-slate-600">{l.level}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
