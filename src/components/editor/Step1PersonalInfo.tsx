import React, { useRef } from 'react';
import { CVData, Language } from '../../types';
import { translations } from '../../data/translations';
import { User, Briefcase, Mail, Phone, MapPin, Globe, Linkedin, Github, Upload, Camera } from 'lucide-react';

interface StepProps {
  cv: CVData;
  onChange: (updated: CVData) => void;
  lang: Language;
}

export const Step1PersonalInfo: React.FC<StepProps> = ({ cv, onChange, lang }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = translations[lang];
  const { personalInfo } = cv;

  const updateField = (field: keyof typeof personalInfo, value: string) => {
    onChange({
      ...cv,
      personalInfo: {
        ...personalInfo,
        [field]: value,
      },
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          updateField('avatarUrl', reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <User className="w-5 h-5 text-indigo-400" />
          {lang === 'uz' ? 'Shaxsiy ma\'lumotlar' : lang === 'ru' ? 'Личные данные' : 'Personal Information'}
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          {lang === 'uz'
            ? 'Ish beruvchilar siz bilan bog‘lanishi uchun to‘g‘ri va amaldagi ma\'lumotlarni kiriting.'
            : 'Enter accurate and up-to-date contact information so recruiters can easily reach you.'}
        </p>
      </div>

      {/* Avatar Section */}
      <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
        <div className="relative group">
          {personalInfo.avatarUrl ? (
            <img
              src={personalInfo.avatarUrl}
              alt="Avatar"
              className="w-20 h-20 rounded-xl object-cover border-2 border-indigo-500/50 shadow-md"
            />
          ) : (
            <div className="w-20 h-20 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
              <Camera className="w-8 h-8" />
            </div>
          )}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 bg-black/50 text-white rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium cursor-pointer"
          >
            {lang === 'uz' ? 'O‘zgartirish' : 'Change'}
          </button>
        </div>

        <div className="space-y-2 text-center sm:text-left">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            {lang === 'uz' ? 'Rasm yuklash (JPG, PNG)' : 'Upload Photo'}
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => updateField('avatarUrl', '/src/assets/images/avatar_professional_1_1790762782018.jpg')}
              className="text-[11px] text-indigo-400 hover:underline cursor-pointer"
            >
              {lang === 'uz' ? 'Namuna 1' : 'Sample 1'}
            </button>
            <span className="text-slate-600">·</span>
            <button
              type="button"
              onClick={() => updateField('avatarUrl', '/src/assets/images/avatar_professional_2_1790762794525.jpg')}
              className="text-[11px] text-indigo-400 hover:underline cursor-pointer"
            >
              {lang === 'uz' ? 'Namuna 2' : 'Sample 2'}
            </button>
            {personalInfo.avatarUrl && (
              <>
                <span className="text-slate-600">·</span>
                <button
                  type="button"
                  onClick={() => updateField('avatarUrl', '')}
                  className="text-[11px] text-rose-400 hover:underline cursor-pointer"
                >
                  {lang === 'uz' ? 'O‘chirish' : 'Remove'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            {lang === 'uz' ? 'To‘liq ism sharifingiz' : 'Full Name'} *
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={personalInfo.fullName}
              onChange={(e) => updateField('fullName', e.target.value)}
              placeholder="Jasur Alimov"
              className="w-full bg-slate-900 border border-slate-700/80 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Job Title */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            {lang === 'uz' ? 'Kasb yoki ixtisoslik' : 'Job Title'} *
          </label>
          <div className="relative">
            <Briefcase className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={personalInfo.jobTitle}
              onChange={(e) => updateField('jobTitle', e.target.value)}
              placeholder="Senior Frontend Dasturchi"
              className="w-full bg-slate-900 border border-slate-700/80 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            {lang === 'uz' ? 'Elektron pochta' : 'Email Address'} *
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="email"
              value={personalInfo.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="jasur.alimov@example.uz"
              className="w-full bg-slate-900 border border-slate-700/80 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            {lang === 'uz' ? 'Telefon raqam' : 'Phone Number'} *
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="tel"
              value={personalInfo.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              placeholder="+998 90 123 45 67"
              className="w-full bg-slate-900 border border-slate-700/80 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            {lang === 'uz' ? 'Shahar, Davlat' : 'Location (City, Country)'}
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={personalInfo.location}
              onChange={(e) => updateField('location', e.target.value)}
              placeholder="Toshkent, O‘zbekiston"
              className="w-full bg-slate-900 border border-slate-700/80 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            LinkedIn {lang === 'uz' ? 'profili' : 'Profile'}
          </label>
          <div className="relative">
            <Linkedin className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={personalInfo.linkedin || ''}
              onChange={(e) => updateField('linkedin', e.target.value)}
              placeholder="linkedin.com/in/jasuralimov"
              className="w-full bg-slate-900 border border-slate-700/80 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Website */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            {lang === 'uz' ? 'Shaxsiy veb-sayt / Portfolio' : 'Website / Portfolio'}
          </label>
          <div className="relative">
            <Globe className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={personalInfo.website || ''}
              onChange={(e) => updateField('website', e.target.value)}
              placeholder="https://jasuralimov.uz"
              className="w-full bg-slate-900 border border-slate-700/80 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* GitHub */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            GitHub
          </label>
          <div className="relative">
            <Github className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={personalInfo.github || ''}
              onChange={(e) => updateField('github', e.target.value)}
              placeholder="github.com/jasuralimov"
              className="w-full bg-slate-900 border border-slate-700/80 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
