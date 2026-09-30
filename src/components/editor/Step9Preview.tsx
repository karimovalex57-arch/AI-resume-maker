import React, { useState } from 'react';
import { CVData, Language, TemplateId, ColorTheme } from '../../types';
import { CVRenderer } from '../templates/CVRenderer';
import { Download, Printer, Share2, Copy, Check, Eye, Palette, LayoutTemplate } from 'lucide-react';

interface StepProps {
  cv: CVData;
  onChange: (updated: CVData) => void;
  lang: Language;
}

export const Step9Preview: React.FC<StepProps> = ({ cv, onChange, lang }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const templates: { id: TemplateId; nameUz: string; nameEn: string; desc: string }[] = [
    { id: 'modern', nameUz: 'Modern (Zamonaviy)', nameEn: 'Modern Two-Column', desc: 'Eng ommabop 2-ustunli dizayn' },
    { id: 'minimal', nameUz: 'Minimal (Ixcham)', nameEn: 'Clean Minimal', desc: 'Shveytsariya tipografik uslubi' },
    { id: 'corporate', nameUz: 'Corporate (Korporativ)', nameEn: 'Corporate Header', desc: 'Katta kompaniyalar va banklar uchun' },
    { id: 'creative', nameUz: 'Creative (Ijodiy)', nameEn: 'Creative Portfolio', desc: 'Dizaynerlar va IT startaplar uchun' },
    { id: 'executive', nameUz: 'Executive (Boshqaruv)', nameEn: 'Executive Leadership', desc: 'Rahbarlar va tajribali mutaxassislar' },
    { id: 'student', nameUz: 'Student (Talaba)', nameEn: 'Academic / Graduate', desc: 'Ta\'lim va loyihalarga urg‘u berilgan' },
  ];

  const colors: { id: ColorTheme; name: string; bg: string }[] = [
    { id: 'blue', name: 'Sapphire Blue', bg: '#2563eb' },
    { id: 'purple', name: 'Royal Purple', bg: '#7c3aed' },
    { id: 'emerald', name: 'Emerald Green', bg: '#059669' },
    { id: 'slate', name: 'Charcoal Slate', bg: '#334155' },
    { id: 'amber', name: 'Amber Gold', bg: '#d97706' },
    { id: 'rose', name: 'Rose Red', bg: '#e11d48' },
  ];

  const handleDownloadPdf = () => {
    // Uses the browser print pipeline styled with @media print for pixel-perfect vector A4 PDF
    window.print();
  };

  const handleShareLink = () => {
    const fakeShareUrl = `${window.location.origin}/preview/${cv.id}`;
    navigator.clipboard.writeText(fakeShareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(cv, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${cv.personalInfo.fullName || 'resume'}-cv.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* Top action banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Eye className="w-5 h-5 text-indigo-400" />
            {lang === 'uz' ? 'Yakuniy ko‘rish va yuklab olish' : 'Final Preview & Export'}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {lang === 'uz'
              ? 'CV tayyor! A4 formatida sifatli PDF sifatida saqlang yoki chop eting.'
              : 'Your CV is ready! Export as A4 PDF or print directly.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Download PDF button */}
          <button
            type="button"
            onClick={handleDownloadPdf}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 inline-flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            {lang === 'uz' ? 'PDF yuklab olish' : 'Download PDF'}
          </button>

          {/* Print button */}
          <button
            type="button"
            onClick={handleDownloadPdf}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            {lang === 'uz' ? 'Chop etish' : 'Print CV'}
          </button>

          {/* Share button */}
          <button
            type="button"
            onClick={() => setShowShareModal(true)}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            {lang === 'uz' ? 'Ulashish' : 'Share'}
          </button>
        </div>
      </div>

      {/* Template & Color Selector Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
        {/* Template switcher */}
        <div>
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-2">
            <LayoutTemplate className="w-3.5 h-3.5 text-indigo-400" />
            {lang === 'uz' ? 'Shablonni almashtirish:' : 'Change Template:'}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {templates.map((tpl) => (
              <button
                key={tpl.id}
                type="button"
                onClick={() => onChange({ ...cv, templateId: tpl.id })}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium text-left border transition-all cursor-pointer truncate ${
                  cv.templateId === tpl.id
                    ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {tpl.nameUz.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Color theme switcher */}
        <div>
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-2">
            <Palette className="w-3.5 h-3.5 text-indigo-400" />
            {lang === 'uz' ? 'Rang aksenti:' : 'Accent Color:'}
          </label>
          <div className="flex items-center gap-3">
            {colors.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => onChange({ ...cv, colorTheme: c.id })}
                title={c.name}
                className={`w-7 h-7 rounded-full transition-transform cursor-pointer relative ${
                  cv.colorTheme === c.id ? 'ring-2 ring-white scale-110' : 'hover:scale-105 opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: c.bg }}
              >
                {cv.colorTheme === c.id && (
                  <Check className="w-3.5 h-3.5 text-white absolute inset-0 m-auto" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Rendered CV Document */}
      <div id="printable-cv-area" className="w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-2xl bg-white text-slate-900 border border-slate-200">
        <CVRenderer cv={cv} />
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-slate-100">
              {lang === 'uz' ? 'CV havolasini ulashish' : 'Share Resume Link'}
            </h3>
            <p className="text-xs text-slate-400">
              {lang === 'uz'
                ? 'Ushbu havola orqali istalgan kishi sizning rezyumeingizni to‘g‘ridan-to‘g‘ri onlayn ko‘rishi mumkin:'
                : 'Anyone with this link can view your published resume online:'}
            </p>

            <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800 text-xs text-slate-300">
              <span className="truncate flex-1 font-mono text-[11px] text-slate-400">
                {window.location.origin}/cv/{cv.id}
              </span>
              <button
                type="button"
                onClick={handleShareLink}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold inline-flex items-center gap-1 cursor-pointer shrink-0"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedLink ? (lang === 'uz' ? 'Nusxalandi!' : 'Copied!') : (lang === 'uz' ? 'Nusxalash' : 'Copy')}
              </button>
            </div>

            <div className="pt-2 flex justify-between">
              <button
                type="button"
                onClick={handleExportJson}
                className="text-xs text-indigo-400 hover:underline cursor-pointer"
              >
                {lang === 'uz' ? 'JSON nusxasini yuklash' : 'Export JSON Backup'}
              </button>

              <button
                type="button"
                onClick={() => setShowShareModal(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
              >
                {lang === 'uz' ? 'Yopish' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
