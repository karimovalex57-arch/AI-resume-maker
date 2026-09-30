import React, { useState } from 'react';
import { CVData, Language, UserProfile } from '../../types';
import { translations } from '../../data/translations';
import {
  FileText,
  Plus,
  Edit3,
  Eye,
  Download,
  Trash2,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Clock,
  Search,
  LayoutTemplate,
  AlertTriangle,
  Printer,
  ChevronRight,
} from 'lucide-react';

interface DashboardProps {
  cvs: CVData[];
  user: UserProfile;
  onCreateCV: () => void;
  onEditCV: (cv: CVData) => void;
  onPreviewCV: (cv: CVData) => void;
  onDeleteCV: (id: string) => void;
  onOpenAts: (cv: CVData) => void;
  onOpenJobMatch: (cv: CVData) => void;
  lang: Language;
}

export const DashboardView: React.FC<DashboardProps> = ({
  cvs,
  user,
  onCreateCV,
  onEditCV,
  onPreviewCV,
  onDeleteCV,
  onOpenAts,
  onOpenJobMatch,
  lang,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const t = translations[lang];

  const filteredCvs = cvs.filter(
    (c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.personalInfo.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.personalInfo.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const completedCount = cvs.filter((c) => c.isCompleted || (c.personalInfo.fullName && c.experiences.length > 0)).length;
  const avgAtsScore = cvs.length > 0 ? Math.round(cvs.reduce((acc, curr) => acc + (curr.atsScore || 85), 0) / cvs.length) : 0;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 bg-indigo-950/60 px-2.5 py-0.5 rounded-full border border-indigo-800/40">
              <Sparkles className="w-3.5 h-3.5" />
              {user.plan === 'premium' ? 'Premium Obuna Faol' : 'Bepul Tarif'}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-100">
              {lang === 'uz' ? `Xush kelibsiz, ${user.name}!` : `Welcome back, ${user.name}!`}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              {lang === 'uz'
                ? 'AI yordamida yaratilgan rezyumelaringizni boshqaring, ATS tahlilini ko‘ring va yangi ish imkoniyatlariga tayyor bo‘ling.'
                : 'Manage your AI-crafted resumes, monitor ATS compliance scores, and unlock career opportunities.'}
            </p>
          </div>

          <button
            type="button"
            onClick={onCreateCV}
            className="px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/30 inline-flex items-center justify-center gap-2 transition-all hover:scale-102 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            {lang === 'uz' ? 'Yangi CV yaratish' : 'Create New CV'}
          </button>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: My CVs */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">
              {lang === 'uz' ? 'Mening CVlarim' : 'Total Resumes'}
            </span>
            <p className="text-2xl font-black text-slate-100 font-mono tabular-nums mt-1">
              {cvs.length}
            </p>
            <span className="text-[11px] text-slate-500">
              {lang === 'uz' ? 'Barcha loyihalar' : 'Active draft & published'}
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Completed CVs */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">
              {lang === 'uz' ? 'Tayyor CVlar' : 'Ready CVs'}
            </span>
            <p className="text-2xl font-black text-emerald-400 font-mono tabular-nums mt-1">
              {completedCount}
            </p>
            <span className="text-[11px] text-slate-500">
              {lang === 'uz' ? 'Chop etishga tayyor' : 'Ready for submission'}
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: AI Suggestions */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">
              {lang === 'uz' ? 'AI Tavsiyalari' : 'AI Insights'}
            </span>
            <p className="text-2xl font-black text-purple-400 font-mono tabular-nums mt-1">
              12 ta
            </p>
            <span className="text-[11px] text-slate-500">
              {lang === 'uz' ? 'Ko‘nikmalar va audit' : 'Available optimizations'}
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4: Average ATS score */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">
              {lang === 'uz' ? 'O‘rtacha ATS balli' : 'Avg ATS Score'}
            </span>
            <p className="text-2xl font-black text-indigo-400 font-mono tabular-nums mt-1">
              {avgAtsScore}%
            </p>
            <span className="text-[11px] text-slate-500">
              {lang === 'uz' ? 'Yuqori moslik' : 'Recruiter pass rate'}
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* CVs Section */}
      <div className="space-y-4">
        {/* Section title & search bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-100">
              {lang === 'uz' ? 'Mening Rezyumelarim' : 'My Resumes'}
            </h2>
            <p className="text-xs text-slate-400">
              {lang === 'uz' ? 'Oxirgi tahrirlangan va saqlangan rezyumelar ro‘yxati' : 'Recent CVs created with CV Genius AI'}
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={lang === 'uz' ? 'CV nomi yoki kasb bo‘yicha izlash...' : 'Search resumes...'}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* CVs Grid */}
        {filteredCvs.length === 0 ? (
          <div className="text-center py-16 rounded-3xl bg-slate-900/40 border border-dashed border-slate-800 space-y-3">
            <FileText className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-sm font-semibold text-slate-300">
              {lang === 'uz' ? 'Hozircha rezyume topilmadi' : 'No resumes found'}
            </p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {lang === 'uz'
                ? 'Birinchi professional rezyumeingizni AI yordamida 5 daqiqada yarating!'
                : 'Start your first resume in 5 minutes with AI guidance.'}
            </p>
            <button
              type="button"
              onClick={onCreateCV}
              className="mt-3 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              {lang === 'uz' ? 'CV yaratish' : 'Create CV'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCvs.map((cv) => (
              <div
                key={cv.id}
                className="group rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 p-5 space-y-4 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Card top */}
                  <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-800/80">
                    <div>
                      <h3 className="font-bold text-sm text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-1">
                        {cv.title || cv.personalInfo.fullName || 'Rezyume'}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                        {cv.personalInfo.jobTitle || 'Mutaxassislik ko‘rsatilmagan'}
                      </p>
                    </div>

                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-indigo-300 capitalize shrink-0">
                      {cv.templateId}
                    </span>
                  </div>

                  {/* Metadata unboxed */}
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-3 font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{lang === 'uz' ? 'Oxirgi tahrir:' : 'Modified:'} {cv.lastModified}</span>
                    <span>·</span>
                    <span className="text-indigo-400 font-semibold">ATS: {cv.atsScore || 90}%</span>
                  </div>

                  {/* Quick AI Action Buttons inside Card */}
                  <div className="flex gap-2 mt-4 pt-3 border-t border-slate-800/60">
                    <button
                      type="button"
                      onClick={() => onOpenAts(cv)}
                      className="flex-1 py-1.5 px-2 rounded-lg bg-indigo-950/40 hover:bg-indigo-900/50 text-indigo-300 border border-indigo-800/40 text-[11px] font-medium inline-flex items-center justify-center gap-1 cursor-pointer transition-colors"
                    >
                      <Sparkles className="w-3 h-3 text-indigo-400" />
                      ATS Tahlil
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenJobMatch(cv)}
                      className="flex-1 py-1.5 px-2 rounded-lg bg-purple-950/40 hover:bg-purple-900/50 text-purple-300 border border-purple-800/40 text-[11px] font-medium inline-flex items-center justify-center gap-1 cursor-pointer transition-colors"
                    >
                      <LayoutTemplate className="w-3 h-3 text-purple-400" />
                      Vakansiya
                    </button>
                  </div>
                </div>

                {/* Card Action Controls */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 gap-1.5">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => onEditCV(cv)}
                      className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-medium inline-flex items-center gap-1 transition-colors cursor-pointer"
                      title={lang === 'uz' ? 'Tahrirlash' : 'Edit'}
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{lang === 'uz' ? 'Tahrirlash' : 'Edit'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onPreviewCV(cv)}
                      className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-medium inline-flex items-center gap-1 transition-colors cursor-pointer"
                      title={lang === 'uz' ? 'Ko‘rish' : 'Preview'}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{lang === 'uz' ? 'Ko‘rish' : 'Preview'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onPreviewCV(cv);
                        setTimeout(() => window.print(), 300);
                      }}
                      className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-medium inline-flex items-center gap-1 transition-colors cursor-pointer"
                      title={lang === 'uz' ? 'PDF yuklab olish' : 'Download PDF'}
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setDeletingId(cv.id)}
                    className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors cursor-pointer"
                    title={lang === 'uz' ? 'O‘chirish' : 'Delete'}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-950/50 border border-rose-900/50 flex items-center justify-center text-rose-400 mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-slate-100">
                {lang === 'uz' ? 'Rezyumeni o‘chirmoqchimisiz?' : 'Delete this resume?'}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'uz'
                  ? 'Ushbu amalni ortga qaytarib bo‘lmaydi. Barcha kiritilgan ma\'lumotlar o‘chiriladi.'
                  : 'This action cannot be undone. All resume content will be permanently removed.'}
              </p>
            </div>
            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setDeletingId(null)}
                className="flex-1 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
              >
                {lang === 'uz' ? 'Bekor qilish' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={() => {
                  onDeleteCV(deletingId);
                  setDeletingId(null);
                }}
                className="flex-1 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white cursor-pointer shadow-sm"
              >
                {lang === 'uz' ? 'Ha, o‘chirish' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
