import React from 'react';
import { CVData } from '../../types';
import { themeMap } from './themeColors';

interface TemplateProps {
  cv: CVData;
}

export const MinimalTemplate: React.FC<TemplateProps> = ({ cv }) => {
  const theme = themeMap[cv.colorTheme || 'blue'];
  const { personalInfo, experiences, educations, skills, languages, certificates, projects } = cv;

  return (
    <div className="w-full bg-white text-slate-800 font-sans p-8 sm:p-10 rounded-sm shadow-sm min-h-[900px] text-sm">
      {/* Header with Swiss elegance */}
      <div className="border-b border-slate-300 pb-5 mb-6">
        <div className="flex justify-between items-baseline">
          <div>
            <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-slate-950">
              {personalInfo.fullName || 'Ism Familiya'}
            </h1>
            <p className="text-sm font-medium tracking-wide uppercase mt-1" style={{ color: theme.primary }}>
              {personalInfo.jobTitle || 'Mutaxassislik'}
            </p>
          </div>
          {personalInfo.avatarUrl && (
            <img
              src={personalInfo.avatarUrl}
              alt={personalInfo.fullName}
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-full object-cover grayscale"
            />
          )}
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4 text-xs text-slate-500">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>· {personalInfo.phone}</span>}
          {personalInfo.location && <span>· {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>· {personalInfo.linkedin}</span>}
          {personalInfo.website && <span>· {personalInfo.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-3xl">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {experiences && experiences.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1 mb-4">
            Tajriba
          </h2>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                <div className="sm:col-span-1 text-xs text-slate-500 font-mono tabular-nums">
                  {exp.startDate} — {exp.current ? 'Hozirda' : exp.endDate}
                </div>
                <div className="sm:col-span-3">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-semibold text-xs text-slate-900">{exp.position}</h3>
                    <span className="text-xs font-medium" style={{ color: theme.primary }}>{exp.company}</span>
                  </div>
                  {exp.responsibilities && (
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {exp.responsibilities}
                    </p>
                  )}
                  {exp.achievements && (
                    <p className="text-xs text-slate-700 mt-1 italic">
                      Yutuq: {exp.achievements}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {educations && educations.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1 mb-3">
            Ta‘lim
          </h2>
          <div className="space-y-3">
            {educations.map((edu) => (
              <div key={edu.id} className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                <div className="sm:col-span-1 text-slate-500 font-mono tabular-nums">
                  {edu.startDate} — {edu.endDate}
                </div>
                <div className="sm:col-span-3">
                  <h3 className="font-semibold text-slate-900">{edu.institution}</h3>
                  <p className="text-slate-600">{edu.degree} · {edu.fieldOfStudy}</p>
                  {edu.gpa && <p className="text-slate-500 text-[11px]">GPA: {edu.gpa}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills & Languages 2-column bottom */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-slate-200">
        {skills && skills.length > 0 && (
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Ko‘nikmalar
            </h2>
            <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-slate-700">
              {skills.map((s, idx) => (
                <span key={s.id}>
                  {s.name}{idx < skills.length - 1 ? ' ·' : ''}
                </span>
              ))}
            </div>
          </div>
        )}

        {languages && languages.length > 0 && (
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Tillar
            </h2>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-700">
              {languages.map((l, idx) => (
                <span key={l.id}>
                  <strong>{l.language}</strong> ({l.level}){idx < languages.length - 1 ? ' ·' : ''}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
