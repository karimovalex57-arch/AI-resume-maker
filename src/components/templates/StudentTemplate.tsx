import React from 'react';
import { CVData } from '../../types';
import { themeMap } from './themeColors';
import { GraduationCap, Award, BookOpen, Code, Mail, Phone, MapPin, Globe } from 'lucide-react';

interface TemplateProps {
  cv: CVData;
}

export const StudentTemplate: React.FC<TemplateProps> = ({ cv }) => {
  const theme = themeMap[cv.colorTheme || 'emerald'];
  const { personalInfo, experiences, educations, skills, languages, certificates, projects } = cv;

  return (
    <div className="w-full bg-white text-slate-800 font-sans p-6 sm:p-8 rounded-sm shadow-sm min-h-[900px] text-sm">
      {/* Student/Graduate Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-5 mb-5 border-b-2" style={{ borderColor: theme.border }}>
        <div>
          <span className="text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded" style={{ backgroundColor: theme.primaryLight, color: theme.primaryDark }}>
            Talaba / Yosh Mutaxassis
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
            {personalInfo.fullName || 'Ism Familiya'}
          </h1>
          <p className="text-sm font-semibold" style={{ color: theme.primary }}>
            {personalInfo.jobTitle || 'Talaba / Junior Mutaxassis'}
          </p>

          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-slate-600">
            {personalInfo.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-slate-400" />{personalInfo.email}</span>}
            {personalInfo.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-slate-400" />{personalInfo.phone}</span>}
            {personalInfo.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-400" />{personalInfo.location}</span>}
            {personalInfo.website && <span className="flex items-center gap-1"><Globe className="w-3 h-3 text-slate-400" />{personalInfo.website}</span>}
          </div>
        </div>

        {personalInfo.avatarUrl && (
          <img
            src={personalInfo.avatarUrl}
            alt={personalInfo.fullName}
            referrerPolicy="no-referrer"
            className="w-20 h-20 rounded-xl object-cover border-2 shadow-xs"
            style={{ borderColor: theme.border }}
          />
        )}
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-5 bg-slate-50 p-3 rounded-lg border border-slate-100">
          <p className="text-xs text-slate-700 leading-relaxed">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Education First for Students */}
      {educations && educations.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5" style={{ color: theme.primaryDark }}>
            <GraduationCap className="w-4 h-4" />
            Ta‘lim & Akademik Natijalar
          </h2>
          <div className="space-y-3">
            {educations.map((edu) => (
              <div key={edu.id} className="p-3 rounded-lg border border-slate-100 bg-white">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-xs text-slate-900">{edu.institution}</h3>
                  <span className="text-[11px] font-mono text-slate-500 tabular-nums">{edu.startDate} – {edu.endDate}</span>
                </div>
                <p className="text-xs font-medium" style={{ color: theme.primary }}>{edu.degree} · {edu.fieldOfStudy}</p>
                {edu.gpa && <p className="text-[11px] font-semibold text-emerald-700 mt-0.5">GPA: {edu.gpa}</p>}
                {edu.description && <p className="text-xs text-slate-600 mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Academic Projects */}
      {projects && projects.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5" style={{ color: theme.primaryDark }}>
            <Code className="w-4 h-4" />
            Amaliy va Kurs Loyihalari
          </h2>
          <div className="space-y-2.5">
            {projects.map((proj) => (
              <div key={proj.id} className="p-3 rounded-lg border border-slate-100 bg-slate-50">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-xs text-slate-900">{proj.name}</h3>
                  {proj.projectUrl && (
                    <a href={proj.projectUrl} target="_blank" rel="noreferrer" className="text-[11px] hover:underline" style={{ color: theme.primary }}>
                      Demo ko‘rish ↗
                    </a>
                  )}
                </div>
                <p className="text-xs text-slate-600 mt-0.5">{proj.description}</p>
                {proj.technologies && proj.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {proj.technologies.map((t, idx) => (
                      <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200 font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience & Internships */}
      {experiences && experiences.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5" style={{ color: theme.primaryDark }}>
            <BookOpen className="w-4 h-4" />
            Amaliyot & Ish Tajribasi
          </h2>
          <div className="space-y-3">
            {experiences.map((exp) => (
              <div key={exp.id} className="border-l-2 pl-3" style={{ borderColor: theme.border }}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-xs text-slate-900">{exp.position} — {exp.company}</h3>
                  <span className="text-[11px] font-mono text-slate-500 tabular-nums">{exp.startDate} – {exp.endDate}</span>
                </div>
                {exp.responsibilities && <p className="text-xs text-slate-600 mt-0.5">{exp.responsibilities}</p>}
                {exp.achievements && <p className="text-xs text-slate-700 italic mt-0.5">Yutuq: {exp.achievements}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills & Languages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-200">
        {skills && skills.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: theme.primaryDark }}>
              Ko‘nikmalar
            </h2>
            <div className="flex flex-wrap gap-1">
              {skills.map((s) => (
                <span
                  key={s.id}
                  className="text-xs px-2 py-0.5 rounded font-medium border"
                  style={{ backgroundColor: theme.primaryLight, borderColor: theme.border, color: theme.badgeText }}
                >
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {languages && languages.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: theme.primaryDark }}>
              Tillar
            </h2>
            <div className="space-y-1 text-xs text-slate-700">
              {languages.map((l) => (
                <div key={l.id} className="flex justify-between">
                  <span className="font-medium">{l.language}</span>
                  <span className="text-slate-500">{l.level}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
