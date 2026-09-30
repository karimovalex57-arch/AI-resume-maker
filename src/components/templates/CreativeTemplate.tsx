import React from 'react';
import { CVData } from '../../types';
import { themeMap } from './themeColors';
import { Sparkles, Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface TemplateProps {
  cv: CVData;
}

export const CreativeTemplate: React.FC<TemplateProps> = ({ cv }) => {
  const theme = themeMap[cv.colorTheme || 'purple'];
  const { personalInfo, experiences, educations, skills, languages, certificates, projects } = cv;

  return (
    <div className="w-full bg-slate-50 text-slate-800 font-sans shadow-sm min-h-[900px] text-sm overflow-hidden border border-slate-200">
      {/* Creative Header with angled badge */}
      <div className="p-8 bg-white border-b border-slate-200 relative">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold mb-2" style={{ backgroundColor: theme.primaryLight, color: theme.primaryDark }}>
              <Sparkles className="w-3 h-3" />
              Creative Portfolio CV
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
              {personalInfo.fullName || 'Ism Familiya'}
            </h1>
            <p className="text-base font-bold mt-0.5" style={{ color: theme.primary }}>
              {personalInfo.jobTitle || 'Mutaxassislik'}
            </p>
          </div>

          {personalInfo.avatarUrl && (
            <img
              src={personalInfo.avatarUrl}
              alt={personalInfo.fullName}
              referrerPolicy="no-referrer"
              className="w-24 h-24 rounded-2xl object-cover shadow-md border-2"
              style={{ borderColor: theme.primary }}
            />
          )}
        </div>

        {/* Contacts */}
        <div className="flex flex-wrap gap-4 mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600">
          {personalInfo.email && <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-slate-400" />{personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-slate-400" />{personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" />{personalInfo.location}</span>}
          {personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin className="w-3.5 h-3.5 text-slate-400" />{personalInfo.linkedin}</span>}
          {personalInfo.website && <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5 text-slate-400" />{personalInfo.website}</span>}
        </div>
      </div>

      {/* Content grid */}
      <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {personalInfo.summary && (
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
              <h2 className="text-xs font-black uppercase tracking-wider mb-2" style={{ color: theme.primary }}>
                G‘oya & Yondashuv
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed">
                {personalInfo.summary}
              </p>
            </div>
          )}

          {/* Experience timeline */}
          {experiences && experiences.length > 0 && (
            <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
              <h2 className="text-xs font-black uppercase tracking-wider mb-4" style={{ color: theme.primary }}>
                Karyera Bosqichlari
              </h2>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="relative pl-4 border-l-2" style={{ borderColor: theme.primary }}>
                    <div className="flex flex-col sm:flex-row justify-between">
                      <h3 className="font-bold text-xs text-slate-900">{exp.position}</h3>
                      <span className="text-[11px] font-mono text-slate-500 tabular-nums">
                        {exp.startDate} – {exp.current ? 'Hozirda' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-xs font-semibold" style={{ color: theme.primaryDark }}>{exp.company}</p>
                    {exp.responsibilities && (
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {exp.responsibilities}
                      </p>
                    )}
                    {exp.achievements && (
                      <p className="text-xs font-medium text-slate-800 mt-1.5 bg-slate-50 p-2 rounded border border-slate-100">
                        ⚡ {exp.achievements}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
              <h2 className="text-xs font-black uppercase tracking-wider mb-3" style={{ color: theme.primary }}>
                Kreativ Loyihalar
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-3 rounded-lg border border-slate-100 bg-slate-50">
                    <h3 className="font-bold text-xs text-slate-900">{proj.name}</h3>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">{proj.description}</p>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {proj.technologies.map((t, idx) => (
                          <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded font-mono bg-white text-slate-600 border border-slate-200">
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
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Skills */}
          {skills && skills.length > 0 && (
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
              <h2 className="text-xs font-black uppercase tracking-wider mb-3" style={{ color: theme.primary }}>
                Ko‘nikmalar
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s) => (
                  <span
                    key={s.id}
                    className="text-xs px-2 py-1 rounded-md font-medium"
                    style={{ backgroundColor: theme.primaryLight, color: theme.primaryDark }}
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {educations && educations.length > 0 && (
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
              <h2 className="text-xs font-black uppercase tracking-wider mb-3" style={{ color: theme.primary }}>
                Ta‘lim
              </h2>
              <div className="space-y-2.5">
                {educations.map((e) => (
                  <div key={e.id} className="text-xs">
                    <p className="font-bold text-slate-900">{e.institution}</p>
                    <p className="text-slate-600">{e.degree} · {e.fieldOfStudy}</p>
                    <span className="text-[11px] text-slate-400 font-mono tabular-nums">{e.startDate} – {e.endDate}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages && languages.length > 0 && (
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
              <h2 className="text-xs font-black uppercase tracking-wider mb-2" style={{ color: theme.primary }}>
                Tillar
              </h2>
              <div className="space-y-1 text-xs">
                {languages.map((l) => (
                  <div key={l.id} className="flex justify-between text-slate-700">
                    <span className="font-medium">{l.language}</span>
                    <span className="text-slate-500">{l.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
