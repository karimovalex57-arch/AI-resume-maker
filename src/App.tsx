/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CVData, Language, UserProfile, TemplateId } from './types';
import { sampleCV1, sampleCV2 } from './data/sampleCVs';
import { Navbar } from './components/navbar/Navbar';
import { LandingPage } from './components/landing/LandingPage';
import { DashboardView } from './components/dashboard/DashboardView';
import { CVEditor } from './components/editor/CVEditor';
import { CoverLetterStudio } from './components/ai/CoverLetterStudio';
import { SettingsView } from './components/settings/SettingsView';
import { PricingView } from './components/pricing/PricingView';
import { AtsAnalyzerModal } from './components/ai/AtsAnalyzerModal';
import { JobMatchModal } from './components/ai/JobMatchModal';
import { AuthModal } from './components/auth/AuthModal';
import { FloatingAiChat } from './components/ai/FloatingAiChat';
import { translations } from './data/translations';

type ViewMode = 'landing' | 'dashboard' | 'editor' | 'cover-letter' | 'settings' | 'pricing';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('landing');
  const [lang, setLang] = useState<Language>('uz');
  const [isDark, setIsDark] = useState<boolean>(true);

  // User state
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('cv_genius_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return {
      id: 'usr-default',
      name: 'Jasur Alimov',
      email: 'jasur.alimov@example.uz',
      avatarUrl: '/src/assets/images/avatar_professional_1_1790762782018.jpg',
      plan: 'premium',
      joinedDate: '2026-09-10',
      language: 'uz',
      theme: 'dark',
    };
  });

  // CVs state
  const [cvs, setCvs] = useState<CVData[]>(() => {
    const saved = localStorage.getItem('cv_genius_cvs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return [sampleCV1, sampleCV2];
  });

  // Active CV being edited or previewed
  const [activeCV, setActiveCV] = useState<CVData>(sampleCV1);

  // Modals state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [atsModalCV, setAtsModalCV] = useState<CVData | null>(null);
  const [jobMatchCV, setJobMatchCV] = useState<CVData | null>(null);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('cv_genius_cvs', JSON.stringify(cvs));
  }, [cvs]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('cv_genius_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('cv_genius_user');
    }
  }, [user]);

  // Sync dark theme class on document element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleToggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleCreateNewCV = (preferredTemplate?: TemplateId) => {
    const newCv: CVData = {
      id: `cv-${Date.now()}`,
      title: lang === 'uz' ? 'Yangi Rezyume' : 'New Resume',
      templateId: preferredTemplate || 'modern',
      colorTheme: 'blue',
      lastModified: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString().split('T')[0],
      isCompleted: false,
      atsScore: 82,
      personalInfo: {
        fullName: user?.name || '',
        jobTitle: '',
        email: user?.email || '',
        phone: '',
        location: '',
        summary: '',
      },
      experiences: [],
      educations: [],
      skills: [],
      languages: [
        { id: 'l-1', language: lang === 'uz' ? 'O\'zbek tili' : 'English', level: 'Ona tili' },
      ],
      certificates: [],
      projects: [],
    };

    setActiveCV(newCv);
    setCvs((prev) => [newCv, ...prev]);
    setCurrentView('editor');
  };

  const handleEditCV = (cv: CVData) => {
    setActiveCV(cv);
    setCurrentView('editor');
  };

  const handlePreviewCV = (cv: CVData) => {
    setActiveCV(cv);
    setCurrentView('editor');
  };

  const handleDeleteCV = (id: string) => {
    setCvs((prev) => prev.filter((c) => c.id !== id));
  };

  const handleSaveCV = (updatedCV: CVData) => {
    setActiveCV(updatedCV);
    setCvs((prev) => prev.map((c) => (c.id === updatedCV.id ? updatedCV : c)));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Universal Top Navigation */}
      {currentView !== 'editor' && (
        <Navbar
          currentView={currentView}
          onNavigate={(view) => setCurrentView(view)}
          user={user}
          onLoginClick={() => setAuthModalOpen(true)}
          onLogoutClick={() => setUser(null)}
          lang={lang}
          onLangChange={setLang}
          isDark={isDark}
          onToggleTheme={handleToggleTheme}
        />
      )}

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingPage
            onStartCreate={() => {
              if (!user) {
                setAuthModalOpen(true);
              } else {
                handleCreateNewCV();
              }
            }}
            onViewTemplates={() => {
              const el = document.getElementById('templates');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            onSelectTemplate={(tplId) => handleCreateNewCV(tplId)}
            onLogin={() => setAuthModalOpen(true)}
            lang={lang}
          />
        )}

        {currentView === 'dashboard' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <DashboardView
              cvs={cvs}
              user={user || {
                id: 'guest',
                name: 'Mehmon Foydalanuvchi',
                email: 'guest@example.uz',
                plan: 'free',
                joinedDate: '2026-09-30',
                language: lang,
                theme: 'dark',
              }}
              onCreateCV={() => handleCreateNewCV()}
              onEditCV={handleEditCV}
              onPreviewCV={handlePreviewCV}
              onDeleteCV={handleDeleteCV}
              onOpenAts={(cv) => setAtsModalCV(cv)}
              onOpenJobMatch={(cv) => setJobMatchCV(cv)}
              lang={lang}
            />
          </div>
        )}

        {currentView === 'editor' && (
          <CVEditor
            initialCV={activeCV}
            onSave={handleSaveCV}
            onBackToDashboard={() => setCurrentView('dashboard')}
            lang={lang}
          />
        )}

        {currentView === 'cover-letter' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <CoverLetterStudio
              cvs={cvs}
              onBack={() => setCurrentView('dashboard')}
              lang={lang}
            />
          </div>
        )}

        {currentView === 'settings' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <SettingsView
              user={user || {
                id: 'usr-1',
                name: 'Jasur Alimov',
                email: 'jasur.alimov@example.uz',
                plan: 'premium',
                joinedDate: '2026-09-10',
                language: lang,
                theme: 'dark',
              }}
              onUpdateUser={(u) => setUser(u)}
              onDeleteAccount={() => {
                setUser(null);
                setCvs([]);
                setCurrentView('landing');
              }}
              onBack={() => setCurrentView('dashboard')}
              lang={lang}
              onLangChange={setLang}
              isDark={isDark}
              onToggleTheme={handleToggleTheme}
            />
          </div>
        )}

        {currentView === 'pricing' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <PricingView
              user={user || {
                id: 'guest',
                name: 'Foydalanuvchi',
                email: 'user@example.uz',
                plan: 'free',
                joinedDate: '2026-09-30',
                language: lang,
                theme: 'dark',
              }}
              onUpgrade={() => {
                if (user) {
                  setUser({ ...user, plan: 'premium' });
                }
              }}
              lang={lang}
            />
          </div>
        )}
      </main>

      {/* Floating AI Chat Assistant */}
      <FloatingAiChat
        currentCV={activeCV}
        onApplySummary={(summaryText) => {
          handleSaveCV({
            ...activeCV,
            personalInfo: {
              ...activeCV.personalInfo,
              summary: summaryText,
            },
          });
        }}
        lang={lang}
      />

      {/* ATS Compliance Scanner Modal */}
      {atsModalCV && (
        <AtsAnalyzerModal
          cv={atsModalCV}
          isOpen={!!atsModalCV}
          onClose={() => setAtsModalCV(null)}
          lang={lang}
        />
      )}

      {/* Job Description Vacancy Matching Modal */}
      {jobMatchCV && (
        <JobMatchModal
          cv={jobMatchCV}
          isOpen={!!jobMatchCV}
          onClose={() => setJobMatchCV(null)}
          lang={lang}
        />
      )}

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={(authedUser) => {
          setUser(authedUser);
          setCurrentView('dashboard');
        }}
        lang={lang}
      />
    </div>
  );
}
