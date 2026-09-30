import React from 'react';
import { CVData } from '../../types';
import { themeMap } from './themeColors';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface TemplateProps {
  cv: CVData;
}

export const CorporateTemplate: React.FC<TemplateProps> = ({ cv }) => {
  const theme = themeMap[cv.colorTheme || 'blue'];
  const { personalInfo, experiences, educations, skills, languages, certificates, projects } = cv;

  return (
    <div className="w-full bg-white text-slate-800 font-sans shadow-sm min-h-[900px] text-sm overflow-hidden">
      {/* Corporate Navy/Accent Header Bar */}
      <div className="p-6 sm:p-8 text-white" style={{ backgroundColor: theme.primaryDark }}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-normal uppercase">
              {personalInfo.fullName || 'Ism Familiya'}
            </h1>
            <p className="text-sm font-medium tracking-wider text-slate-200 uppercase mt-0.5">
              {personalInfo.jobTitle || 'Mutaxassislik'}
            </p>
          </div>
          {personalInfo.avatarUrl && (
            <img
              src={personalInfo.avatarUrl}
              alt={personalInfo.fullName}
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded object-cover border-2 border-white/50"
            />
          )}
        </div>

        {/* Contact details ribbon */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mt-4 pt-3 border-t border-white/20 text-xs text-white/90">
          {personalInfo.email && (
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1.5">
              <Linkedin className="w-3.5 h-3.5" />
              {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              {personalInfo.website}
            </span>
          )}
        </div>
      </div>

      {/* Main Body */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Executive Summary */}
        {personalInfo.summary && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 pb-1 mb-2" style={{ borderColor: theme.primary }}>
              Kasbiy Tavsif
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed text-justify">
              {personalInfo.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {experiences && experiences.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 pb-1 mb-3" style={{ borderColor: theme.primary }}>
              Mehnat Faoliyati
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-baseline">
                    <h3 className="font-bold text-slate-900 text-xs">
                      {exp.position} — <span className="font-semibold" style={{ color: theme.primaryDark }}>{exp.company}</span>
                    </h3>
                    <span className="text-[11px] text-slate-600 font-mono tabular-nums">
                      {exp.startDate} – {exp.current ? 'Hozirgi vaqtgacha' : exp.endDate}
                    </span>
                  </div>
                  {exp.location && <p className="text-[11px] text-slate-500">{exp.location}</p>}
                  {exp.responsibilities && (
                    <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                      {exp.responsibilities}
                    </p>
                  )}
                  {exp.achievements && (
                    <p className="text-xs text-slate-800 mt-1 font-medium bg-slate-50 p-1.5 border-l-2" style={{ borderColor: theme.primary }}>
                      <strong>Asosiy natijalar: </strong>{exp.achievements}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education & Qualifications */}
        {educations && educations.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 pb-1 mb-3" style={{ borderColor: theme.primary }}>
              Ma‘lumoti
            </h2>
            <div className="space-y-3">
              {educations.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline text-xs">
                  <div>
                    <h3 className="font-bold text-slate-900">{edu.institution}</h3>
                    <p className="text-slate-700">{edu.degree} — {edu.fieldOfStudy}</p>
                    {edu.description && <p className="text-slate-500 text-[11px] mt-0.5">{edu.description}</p>}
                  </div>
                  <span className="text-[11px] text-slate-600 font-mono tabular-nums shrink-0">
                    {edu.startDate} – {edu.endDate}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2-column: Skills & Languages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {skills && skills.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 pb-1 mb-2.5" style={{ borderColor: theme.primary }}>
                Kasbiy Ko‘nikmalar
              </h2>
              <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-700">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.primary }}></span>
                    <span className="truncate">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {languages && languages.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 pb-1 mb-2.5" style={{ borderColor: theme.primary }}>
                Til Bilish Darajasi
              </h2>
              <div className="space-y-1.5 text-xs text-slate-700">
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
    </div>
  );
};
