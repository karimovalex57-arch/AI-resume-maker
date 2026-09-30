import React from 'react';
import { CVData } from '../../types';
import { themeMap } from './themeColors';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Calendar, Award, Briefcase, GraduationCap, Code } from 'lucide-react';

interface TemplateProps {
  cv: CVData;
}

export const ModernTemplate: React.FC<TemplateProps> = ({ cv }) => {
  const theme = themeMap[cv.colorTheme || 'blue'];
  const { personalInfo, experiences, educations, skills, languages, certificates, projects } = cv;

  return (
    <div className="w-full bg-white text-slate-800 font-sans p-6 sm:p-8 rounded-sm shadow-sm min-h-[900px] text-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between pb-6 mb-6 border-b border-slate-200 gap-4">
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900" style={{ color: theme.primaryDark }}>
            {personalInfo.fullName || 'Ism Familiya'}
          </h1>
          <p className="text-base font-semibold mt-1" style={{ color: theme.primary }}>
            {personalInfo.jobTitle || 'Mutaxassislik'}
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1.5 mt-3 text-xs text-slate-600">
            {personalInfo.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {personalInfo.location}
              </span>
            )}
            {personalInfo.website && (
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                {personalInfo.website.replace(/^https?:\/\//, '')}
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1">
                <Linkedin className="w-3.5 h-3.5 text-slate-400" />
                {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
              </span>
            )}
            {personalInfo.github && (
              <span className="flex items-center gap-1">
                <Github className="w-3.5 h-3.5 text-slate-400" />
                {personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}
              </span>
            )}
          </div>
        </div>

        {personalInfo.avatarUrl && (
          <img
            src={personalInfo.avatarUrl}
            alt={personalInfo.fullName}
            referrerPolicy="no-referrer"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover border-2 shadow-sm shrink-0"
            style={{ borderColor: theme.border }}
          />
        )}
      </div>

      {/* Main Grid: Left Column (2/3) and Right Sidebar (1/3) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left main content */}
        <div className="md:col-span-2 space-y-6">
          {/* Summary */}
          {personalInfo.summary && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5" style={{ color: theme.primary }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.primary }}></span>
                Professional Xulosa
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed text-justify">
                {personalInfo.summary}
              </p>
            </div>
          )}

          {/* Work Experience */}
          {experiences && experiences.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5" style={{ color: theme.primary }}>
                <Briefcase className="w-3.5 h-3.5" />
                Ish Tajribasi
              </h2>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="relative pl-3 border-l-2" style={{ borderColor: theme.border }}>
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                      <h3 className="font-semibold text-slate-900 text-xs">
                        {exp.position} · <span style={{ color: theme.primaryDark }}>{exp.company}</span>
                      </h3>
                      <span className="text-[11px] text-slate-500 font-mono tabular-nums">
                        {exp.startDate} — {exp.current ? 'Hozirda' : exp.endDate}
                      </span>
                    </div>
                    {exp.location && <p className="text-[11px] text-slate-500">{exp.location}</p>}
                    {exp.responsibilities && (
                      <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                        {exp.responsibilities}
                      </p>
                    )}
                    {exp.achievements && (
                      <p className="text-xs text-slate-700 mt-1 font-medium bg-slate-50 p-1.5 rounded border border-slate-100">
                        <strong className="text-slate-900">Yutuqlar: </strong>{exp.achievements}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5" style={{ color: theme.primary }}>
                <Code className="w-3.5 h-3.5" />
                Asosiy Loyihalar
              </h2>
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id} className="bg-slate-50 p-2.5 rounded border border-slate-100">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-xs text-slate-900">{proj.name}</h3>
                      {proj.projectUrl && (
                        <a
                          href={proj.projectUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] hover:underline"
                          style={{ color: theme.primary }}
                        >
                          Havola ↗
                        </a>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{proj.description}</p>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {proj.technologies.map((t, i) => (
                          <span key={i} className="text-[10px] px-1.5 py-0.5 rounded font-mono bg-white border border-slate-200 text-slate-600">
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

        {/* Right sidebar */}
        <div className="space-y-6">
          {/* Skills */}
          {skills && skills.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5" style={{ color: theme.primary }}>
                <Award className="w-3.5 h-3.5" />
                Ko‘nikmalar
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="text-xs px-2 py-1 rounded font-medium border"
                    style={{ backgroundColor: theme.primaryLight, borderColor: theme.border, color: theme.badgeText }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {educations && educations.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5" style={{ color: theme.primary }}>
                <GraduationCap className="w-3.5 h-3.5" />
                Ta‘lim
              </h2>
              <div className="space-y-3">
                {educations.map((edu) => (
                  <div key={edu.id} className="text-xs">
                    <h3 className="font-semibold text-slate-900">{edu.institution}</h3>
                    <p className="text-slate-700" style={{ color: theme.primaryDark }}>
                      {edu.degree} {edu.fieldOfStudy ? `— ${edu.fieldOfStudy}` : ''}
                    </p>
                    <span className="text-[11px] text-slate-500 font-mono tabular-nums">
                      {edu.startDate} — {edu.endDate}
                    </span>
                    {edu.gpa && <p className="text-[11px] text-slate-600 mt-0.5">GPA: {edu.gpa}</p>}
                    {edu.description && <p className="text-slate-600 mt-1">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages && languages.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: theme.primary }}>
                Tillar
              </h2>
              <div className="space-y-1.5 text-xs">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center text-slate-700 border-b border-slate-100 pb-1">
                    <span className="font-medium">{lang.language}</span>
                    <span className="text-[11px] text-slate-500">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certificates */}
          {certificates && certificates.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: theme.primary }}>
                Sertifikatlar
              </h2>
              <div className="space-y-2 text-xs">
                {certificates.map((cert) => (
                  <div key={cert.id} className="bg-slate-50 p-2 rounded border border-slate-100">
                    <p className="font-semibold text-slate-900">{cert.name}</p>
                    <p className="text-[11px] text-slate-600">{cert.organization} · {cert.issueDate}</p>
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
