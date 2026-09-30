import React, { useState, useEffect } from 'react';
import { CVData, Language } from '../../types';
import { translations } from '../../data/translations';
import { Step1PersonalInfo } from './Step1PersonalInfo';
import { Step2Summary } from './Step2Summary';
import { Step3Experience } from './Step3Experience';
import { Step4Education } from './Step4Education';
import { Step5Skills } from './Step5Skills';
import { Step6Languages } from './Step6Languages';
import { Step7Certificates } from './Step7Certificates';
import { Step8Projects } from './Step8Projects';
import { Step9Preview } from './Step9Preview';
import { CVRenderer } from '../templates/CVRenderer';
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Award,
  Languages,
  Code,
  Eye,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Download,
  Save,
  SplitSquareVertical,
} from 'lucide-react';

interface CVEditorProps {
  initialCV: CVData;
  onSave: (cv: CVData) => void;
  onBackToDashboard: () => void;
  lang: Language;
}

export const CVEditor: React.FC<CVEditorProps> = ({ initialCV, onSave, onBackToDashboard, lang }) => {
  const [cv, setCv] = useState<CVData>(initialCV);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showLivePreview, setShowLivePreview] = useState<boolean>(true);
  const [lastSavedTime, setLastSavedTime] = useState<string>('Hozir');
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const t = translations[lang];

  // Auto-save logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSaving(true);
      const updated = {
        ...cv,
        lastModified: new Date().toISOString().split('T')[0],
      };
      onSave(updated);
      setIsSaving(false);
      const now = new Date();
      setLastSavedTime(
        `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
      );
    }, 1200);

    return () => clearTimeout(timer);
  }, [cv]);

  const steps = [
    { num: 1, titleUz: 'Shaxsiy', titleEn: 'Personal', icon: User },
    { num: 2, titleUz: 'Xulosa', titleEn: 'Summary', icon: FileText },
    { num: 3, titleUz: 'Tajriba', titleEn: 'Experience', icon: Briefcase },
    { num: 4, titleUz: 'Ta‘lim', titleEn: 'Education', icon: GraduationCap },
    { num: 5, titleUz: 'Ko‘nikmalar', titleEn: 'Skills', icon: Award },
    { num: 6, titleUz: 'Tillar', titleEn: 'Languages', icon: Languages },
    { num: 7, titleUz: 'Sertifikat', titleEn: 'Certificates', icon: Award },
    { num: 8, titleUz: 'Loyihalar', titleEn: 'Projects', icon: Code },
    { num: 9, titleUz: 'Ko‘rish', titleEn: 'Preview', icon: Eye },
  ];

  const handleNext = () => {
    if (currentStep < 9) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onBackToDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Editor Sub-Header */}
      <div className="no-print sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToDashboard}
              className="text-xs font-medium text-slate-400 hover:text-slate-200 px-2.5 py-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              {lang === 'uz' ? 'Kabinetga qaytish' : 'Back to Dashboard'}
            </button>
            <div className="h-4 w-px bg-slate-800 hidden sm:block"></div>
            <span className="text-xs font-semibold text-slate-200 truncate max-w-xs">
              {cv.title || cv.personalInfo.fullName || 'Yangi CV'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Auto-save status */}
            <span className="text-[11px] text-slate-400 hidden sm:inline-flex items-center gap-1 font-mono">
              <Save className="w-3.5 h-3.5 text-emerald-400" />
              {isSaving
                ? (lang === 'uz' ? 'Saqlanmoqda...' : 'Saving...')
                : `${lang === 'uz' ? 'Saqlandi' : 'Saved'} (${lastSavedTime})`}
            </span>

            {/* Split screen toggle for desktop */}
            <button
              type="button"
              onClick={() => setShowLivePreview(!showLivePreview)}
              className={`hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                showLivePreview
                  ? 'bg-indigo-600/20 border-indigo-500/40 text-indigo-300'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <SplitSquareVertical className="w-3.5 h-3.5" />
              {showLivePreview
                ? (lang === 'uz' ? 'Jonli ko‘rish faol' : 'Live Preview On')
                : (lang === 'uz' ? 'Jonli ko‘rish' : 'Live Preview')}
            </button>

            {/* Quick print button */}
            <button
              type="button"
              onClick={() => window.print()}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              PDF
            </button>
          </div>
        </div>

        {/* Step Progress Pills Bar */}
        <div className="max-w-7xl mx-auto mt-3 overflow-x-auto pb-1 scrollbar-none">
          <div className="flex items-center gap-1.5 min-w-max">
            {steps.map((s) => {
              const Icon = s.icon;
              const isActive = currentStep === s.num;
              const isPast = currentStep > s.num;

              return (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => setCurrentStep(s.num)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                      : isPast
                      ? 'bg-slate-800/80 text-emerald-400 hover:bg-slate-800'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  {isPast ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Icon className="w-3.5 h-3.5" />}
                  <span>
                    {s.num}. {lang === 'uz' ? s.titleUz : s.titleEn}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content: Split Screen or Single view */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        <div className={`grid gap-6 ${showLivePreview && currentStep !== 9 ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'}`}>
          {/* Form Step Column */}
          <div className={`${showLivePreview && currentStep !== 9 ? 'lg:col-span-7' : 'w-full max-w-4xl mx-auto'}`}>
            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-5 sm:p-8 shadow-xl">
              {currentStep === 1 && <Step1PersonalInfo cv={cv} onChange={setCv} lang={lang} />}
              {currentStep === 2 && <Step2Summary cv={cv} onChange={setCv} lang={lang} />}
              {currentStep === 3 && <Step3Experience cv={cv} onChange={setCv} lang={lang} />}
              {currentStep === 4 && <Step4Education cv={cv} onChange={setCv} lang={lang} />}
              {currentStep === 5 && <Step5Skills cv={cv} onChange={setCv} lang={lang} />}
              {currentStep === 6 && <Step6Languages cv={cv} onChange={setCv} lang={lang} />}
              {currentStep === 7 && <Step7Certificates cv={cv} onChange={setCv} lang={lang} />}
              {currentStep === 8 && <Step8Projects cv={cv} onChange={setCv} lang={lang} />}
              {currentStep === 9 && <Step9Preview cv={cv} onChange={setCv} lang={lang} />}

              {/* Navigation buttons at bottom */}
              <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  {currentStep === 1 ? (lang === 'uz' ? 'Bekor qilish' : 'Cancel') : (lang === 'uz' ? 'Oldingisi' : 'Previous')}
                </button>

                <div className="text-xs text-slate-500 font-mono">
                  {currentStep} / 9
                </div>

                {currentStep < 9 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 inline-flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    {lang === 'uz' ? 'Keyingisi' : 'Next Step'}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      onSave({ ...cv, isCompleted: true });
                      onBackToDashboard();
                    }}
                    className="px-5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30 inline-flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {lang === 'uz' ? 'Yakunlash va Saqlash' : 'Finish & Save'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Real-time Right Split Screen Live Preview */}
          {showLivePreview && currentStep !== 9 && (
            <div className="hidden lg:block lg:col-span-5 sticky top-28 self-start">
              <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-4 shadow-xl space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                  <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-indigo-400" />
                    {lang === 'uz' ? 'Jonli natija (Real-time)' : 'Live Preview'}
                  </span>
                  <span className="font-mono text-[11px] text-slate-500">A4 Standart</span>
                </div>

                {/* Scaled resume container to fit neatly beside editor */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-700/50 max-h-[750px] overflow-y-auto transform origin-top">
                  <CVRenderer cv={cv} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
