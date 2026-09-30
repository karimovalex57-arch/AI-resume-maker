export type Language = 'uz' | 'en' | 'ru';

export type TemplateId = 'modern' | 'minimal' | 'corporate' | 'creative' | 'executive' | 'student';

export type ColorTheme = 'blue' | 'purple' | 'emerald' | 'slate' | 'amber' | 'rose';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  plan: 'free' | 'premium';
  joinedDate: string;
  language: Language;
  theme: 'dark' | 'light';
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  responsibilities: string;
  achievements?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  current?: boolean;
  description?: string;
  gpa?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level: 'Boshlang\'ich' | 'O\'rta' | 'Ilg\'or' | 'Ekspert' | 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category?: 'Hard Skills' | 'Soft Skills' | 'Dasturlash' | 'Asboblar' | 'General';
}

export interface LanguageSkill {
  id: string;
  language: string;
  level: 'Ona tili' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'Native' | 'Fluent' | 'Intermediate' | 'Basic';
}

export interface Certificate {
  id: string;
  name: string;
  organization: string;
  issueDate: string;
  credentialUrl?: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  projectUrl?: string;
  githubUrl?: string;
}

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  avatarUrl?: string;
  summary: string;
}

export interface CVData {
  id: string;
  title: string;
  templateId: TemplateId;
  colorTheme: ColorTheme;
  lastModified: string;
  createdAt: string;
  isCompleted: boolean;
  personalInfo: PersonalInfo;
  experiences: WorkExperience[];
  educations: Education[];
  skills: SkillItem[];
  languages: LanguageSkill[];
  certificates: Certificate[];
  projects: ProjectItem[];
  atsScore?: number;
}

export interface CoverLetterData {
  id: string;
  title: string;
  targetCompany: string;
  jobPosition: string;
  jobDescription?: string;
  userExperienceHighlights?: string;
  tone: 'professional' | 'confident' | 'enthusiastic' | 'creative';
  generatedContent: string;
  createdAt: string;
  lastModified: string;
}

export interface AtsAnalysisResult {
  score: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D';
  breakdown: {
    keywords: number;
    formatting: number;
    skillsDepth: number;
    experienceImpact: number;
    completeness: number;
  };
  strengths: string[];
  weaknesses: string[];
  missingInformation: string[];
  recommendations: string[];
  suggestedKeywords: string[];
}

export interface JobMatchResult {
  matchPercentage: number;
  matchingSkills: string[];
  missingSkills: string[];
  suggestedKeywords: string[];
  actionableImprovements: string[];
  verdictUz: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  suggestedAction?: {
    type: 'apply_summary' | 'add_skill' | 'improve_experience';
    payload: string;
    label: string;
  };
}
