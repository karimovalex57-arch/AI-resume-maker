import React from 'react';
import { Certificate, CVData, Language } from '../../types';
import { Award, Plus, Trash2, Link as LinkIcon, Building } from 'lucide-react';

interface StepProps {
  cv: CVData;
  onChange: (updated: CVData) => void;
  lang: Language;
}

export const Step7Certificates: React.FC<StepProps> = ({ cv, onChange, lang }) => {
  const addCertificate = () => {
    const newCert: Certificate = {
      id: `cert-${Date.now()}`,
      name: '',
      organization: '',
      issueDate: '',
      credentialUrl: '',
    };
    onChange({
      ...cv,
      certificates: [...cv.certificates, newCert],
    });
  };

  const updateCertificate = (id: string, field: keyof Certificate, value: string) => {
    onChange({
      ...cv,
      certificates: cv.certificates.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
    });
  };

  const removeCertificate = (id: string) => {
    onChange({
      ...cv,
      certificates: cv.certificates.filter((c) => c.id !== id),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-400" />
            {lang === 'uz' ? 'Sertifikatlar' : lang === 'ru' ? 'Сертификаты' : 'Certificates'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {lang === 'uz'
              ? 'Xalqaro sertifikatlar (Coursera, AWS, Google, IELTS va b.) rezyumeni jiddiy kuchaytiradi.'
              : 'Add professional credentials and verified industry certificates.'}
          </p>
        </div>

        <button
          type="button"
          onClick={addCertificate}
          className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          {lang === 'uz' ? 'Sertifikat qo‘shish' : 'Add Certificate'}
        </button>
      </div>

      {cv.certificates.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-slate-800 rounded-xl bg-slate-900/30">
          <Award className="w-9 h-9 text-slate-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-slate-300">
            {lang === 'uz' ? 'Hozircha sertifikatlar kiritilmagan' : 'No certificates added yet'}
          </p>
          <button
            type="button"
            onClick={addCertificate}
            className="mt-3 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 inline-flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            {lang === 'uz' ? 'Sertifikat qo‘shish' : 'Add Item'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {cv.certificates.map((cert) => (
            <div
              key={cert.id}
              className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) => updateCertificate(cert.id, 'name', e.target.value)}
                  placeholder={lang === 'uz' ? 'Sertifikat nomi (masalan: AWS Solutions Architect)' : 'Certificate Name'}
                  className="bg-transparent font-bold text-xs text-slate-100 placeholder-slate-500 focus:outline-none flex-1 mr-2"
                />
                <button
                  type="button"
                  onClick={() => removeCertificate(cert.id)}
                  className="text-slate-500 hover:text-rose-400 p-1 rounded transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    {lang === 'uz' ? 'Bergan tashkilot' : 'Issuing Organization'}
                  </label>
                  <div className="relative">
                    <Building className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      value={cert.organization}
                      onChange={(e) => updateCertificate(cert.id, 'organization', e.target.value)}
                      placeholder="Meta / Coursera"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    {lang === 'uz' ? 'Berilgan sana' : 'Issue Date'}
                  </label>
                  <input
                    type="text"
                    value={cert.issueDate}
                    onChange={(e) => updateCertificate(cert.id, 'issueDate', e.target.value)}
                    placeholder="2023-05"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 font-mono placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    {lang === 'uz' ? 'Tekshirish havolasi (URL)' : 'Credential URL'}
                  </label>
                  <div className="relative">
                    <LinkIcon className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      value={cert.credentialUrl || ''}
                      onChange={(e) => updateCertificate(cert.id, 'credentialUrl', e.target.value)}
                      placeholder="coursera.org/verify/..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
