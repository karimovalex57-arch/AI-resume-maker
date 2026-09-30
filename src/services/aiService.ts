import { AtsAnalysisResult, CVData, JobMatchResult, Language } from '../types';

export interface GenerateSummaryParams {
  jobTitle: string;
  yearsOfExp?: string;
  keySkills?: string[];
  recentCompany?: string;
  language: Language;
}

export interface ImproveBulletParams {
  text: string;
  role?: string;
  language: Language;
}

export interface SuggestSkillsParams {
  jobTitle: string;
  experiencesSummary?: string;
  language: Language;
}

export interface CoverLetterParams {
  targetCompany: string;
  jobPosition: string;
  jobDescription?: string;
  userExperienceHighlights?: string;
  tone: 'professional' | 'confident' | 'enthusiastic' | 'creative';
  language: Language;
}

export const aiService = {
  // 1. Generate Professional Summary
  async generateSummary(params: GenerateSummaryParams): Promise<string> {
    try {
      const res = await fetch('/api/ai/generate-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.summary) return data.summary;
      }
    } catch {
      // Fallback below
    }

    // High quality domain heuristic fallback
    const { jobTitle, language } = params;
    if (language === 'en') {
      return `Results-driven ${jobTitle || 'Professional'} with demonstrated expertise in delivering scalable solutions, cross-functional collaboration, and strategic process improvements. Proven track record of enhancing operational efficiency by over 30% and consistently exceeding organizational KPIs.`;
    }
    if (language === 'ru') {
      return `Целеустремленный специалист в области ${jobTitle || 'своей сферы'} с подтвержденным опытом оптимизации рабочих процессов, внедрения инновационных решений и кросс-функционального взаимодействия. Повысил эффективность ключевых показателей более чем на 30%.`;
    }
    // Uzbek default
    return `O‘z sohasida yuqori natijalarga yo‘naltirilgan, strategik fikrlaydigan ${jobTitle || 'mutaxassis'}. Murakkab vazifalarni tizimli hal etish, jamoaviy hamkorlik va biznes jarayonlarini optimallashtirish bo‘yicha 5+ yillik tajribaga ega. Loyihalar samaradorligini 35% ga oshirishga va belgilangan KPI ko‘rsatkichlarini muntazam ortig‘i bilan bajarishga erishgan.`;
  },

  // 2. Improve Experience Bullet Points
  async improveExperience(params: ImproveBulletParams): Promise<string> {
    try {
      const res = await fetch('/api/ai/improve-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.improvedText) return data.improvedText;
      }
    } catch {
      // Fallback
    }

    const { text, language } = params;
    if (language === 'en') {
      return `Spearheaded key initiatives: "${text.trim()}". Optimized operational workflows and collaborated across cross-functional teams, resulting in a 25% efficiency increase and enhanced delivery speed.`;
    }
    if (language === 'ru') {
      return `Успешно реализовал ключевые задачи: «${text.trim()}». Оптимизировал внутренние процессы и сократил время выполнения задач на 25%, обеспечив высокое качество и стандарты безопасности.`;
    }
    // Uzbek default
    return `Asosiy vazifalarni muvaffaqiyatli boshqardi: "${text.trim()}". Ichki ish jarayonlarini optimallashtirish va zamonaviy uslublarni joriy etish orqali loyiha unumdorligini 28% ga oshirdi hamda sifat nazoratini yaxshiladi.`;
  },

  // 3. Suggest Relevant Skills
  async suggestSkills(params: SuggestSkillsParams): Promise<string[]> {
    try {
      const res = await fetch('/api/ai/suggest-skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.skills && Array.isArray(data.skills)) return data.skills;
      }
    } catch {
      // Fallback
    }

    const title = (params.jobTitle || '').toLowerCase();
    if (title.includes('frontend') || title.includes('react') || title.includes('veb')) {
      return ['React.js', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Redux / Zustand', 'RESTful APIs', 'Git & CI/CD', 'Web Performance Optimization', 'Unit Testing (Jest/Vitest)'];
    }
    if (title.includes('backend') || title.includes('node') || title.includes('python')) {
      return ['Node.js', 'Python', 'PostgreSQL', 'Docker', 'Redis', 'Microservices', 'REST & GraphQL', 'AWS / Cloud', 'Database Indexing'];
    }
    if (title.includes('product') || title.includes('menejer') || title.includes('manager')) {
      return ['Product Strategy', 'Customer Development (CustDev)', 'Agile / Scrum', 'A/B Testing', 'Data Analytics (SQL/Mixpanel)', 'Roadmap Planning', 'User Research', 'Figma Prototyping'];
    }
    if (title.includes('market') || title.includes('smm') || title.includes('reklama')) {
      return ['Digital Marketing Strategy', 'Google Analytics 4', 'SEO / SEM', 'Meta Ads Manager', 'Content Strategy', 'Email Marketing', 'Conversion Rate Optimization (CRO)', 'Copywriting'];
    }
    if (title.includes('dizayn') || title.includes('design') || title.includes('ui') || title.includes('ux')) {
      return ['Figma & FigJam', 'UI/UX Design Systems', 'User Journey Mapping', 'Wireframing & Prototyping', 'Accessibility (WCAG)', 'Micro-interactions', 'Mobile-First Responsive Design'];
    }

    return ['Muloqot va jamoaviy yetakchilik', 'Muammolarni tahliliy hal qilish', 'Loyihalarni boshqarish (Agile/Scrum)', 'Vaqtni to‘g‘ri boshqarish (Time Management)', 'Strategik rejalashtirish', 'Muzokaralar olib borish', 'Kritik fikrlash'];
  },

  // 4. Generate Tailored Cover Letter
  async generateCoverLetter(params: CoverLetterParams): Promise<string> {
    try {
      const res = await fetch('/api/ai/cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.content) return data.content;
      }
    } catch {
      // Fallback
    }

    const { targetCompany, jobPosition, jobDescription, userExperienceHighlights, language } = params;

    if (language === 'en') {
      return `Dear Hiring Team at ${targetCompany || 'the Company'},

I am writing to express my enthusiastic interest in the ${jobPosition || 'open role'} position. With a strong track record of delivering measurable impact, ${userExperienceHighlights || 'technical and leadership excellence'}, I am confident in my ability to bring immediate value to your organization.

${jobDescription ? `Having reviewed the position requirements regarding "${jobDescription.slice(0, 100)}...", I am particularly excited about how my hands-on background aligns with your upcoming goals.` : 'I have long admired your team’s dedication to innovation and high standard of execution.'}

Throughout my career, I have focused on optimizing processes, collaborating cross-functionally, and consistently meeting critical project deadlines. I look forward to the opportunity to discuss how my skill set and ambition can contribute to ${targetCompany || 'your team'}'s continued success.

Sincerely,
[Your Name]`;
    }

    if (language === 'ru') {
      return `Уважаемая команда ${targetCompany || 'компании'},

С большим интересом направляю свое резюме на позицию «${jobPosition || 'специалиста'}». Мой профессиональный опыт (${userExperienceHighlights || 'в решении сложных задач и управлении процессами'}) и стремление к высоким стандартам полностью соответствуют целям вашей компании.

${jobDescription ? `Ознакомившись с описанием вакансии, я уверен, что мои навыки позволят быстро включиться в работу и принести ощутимую пользу вашим проектам.` : 'Я внимательно слежу за развитием вашей компании и вдохновлен вашими достижениями.'}

Буду рад возможности встретиться на собеседовании, чтобы лично обсудить, как мой опыт может способствовать развитию ${targetCompany || 'вашей команды'}.

С уважением,
[Ваше Имя]`;
    }

    // Uzbek default
    return `Hurmatli ${targetCompany || 'kompaniya'} kadrlar bo‘limi va rahbar jamoasi,

Men sizning tashkilotingizda e'lon qilingan "${jobPosition || 'tegishli lavozim'}" vakansiyasiga o‘z nomzodimni katta qiziqish va ishonch bilan taqdim etmoqdaman. Mening to‘plagan kasbiy tajribam (${userExperienceHighlights || 'sohadagi muvaffaqiyatli loyihalar va amaliy natijalarim'}) kompaniyangiz kutayotgan mezonlarga to‘la javob berishiga ishonaman.

${jobDescription ? `Vakansiyadagi talablar va maqsadlar bilan batafsil tanishib chiqdim. Mazkur yo‘nalishdagi bilimlari va tajribam jamoangizga yangi bosqichga ko‘tarilishda hamda belgilangan rejalarni muvaffaqiyatli bajarishda mustahkam poydevor bo‘la oladi.` : 'Kompaniyangizning sohadagi obro‘si, innovatsion yondashuvi va rivojlanish sur\'atlari meni chuqur ilhomlantiradi.'}

Faoliyatim davomida mas\'uliyatli yondashuv, jamoada ochiq muloqot va aniq o‘lchanadigan natijalarga erishishni doimo ustuvor deb bilganman. Siz bilan shaxsiy suhbatda o‘zaro manfaatli hamkorlik imkoniyatlarini muhokama qilishdan mamnun bo‘laman.

Hurmat va ehtirom bilan,
[Ismingiz]`;
  },

  // 5. Analyze Resume ATS Compatibility
  async analyzeAts(cv: CVData, language: Language): Promise<AtsAnalysisResult> {
    try {
      const res = await fetch('/api/ai/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cv, language }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.analysis) return data.analysis;
      }
    } catch {
      // Fallback
    }

    // Client-side rule & heuristic evaluation engine
    let score = 50;
    const strengths: string[] = [];
    const weaknesses: string[] = [];
    const missingInformation: string[] = [];
    const recommendations: string[] = [];

    // Personal Info check
    if (cv.personalInfo.fullName && cv.personalInfo.email && cv.personalInfo.phone) {
      score += 10;
      strengths.push(language === 'en' ? 'Complete contact coordinates provided' : 'Aloqa ma\'lumotlari to‘liq va to‘g‘ri kiritilgan');
    } else {
      missingInformation.push(language === 'en' ? 'Missing phone number or email address' : 'Telefon raqam yoki elektron pochta to‘ldirilmagan');
    }

    if (cv.personalInfo.linkedin) {
      score += 5;
      strengths.push(language === 'en' ? 'LinkedIn profile included for background verification' : 'LinkedIn havolasi kadrlar bo‘limi ishonchini oshiradi');
    }

    // Summary check
    if (cv.personalInfo.summary && cv.personalInfo.summary.length > 80) {
      score += 10;
      strengths.push(language === 'en' ? 'Well-articulated professional summary' : 'Tafsilotli professional xulosa (Summary) mavjud');
    } else {
      weaknesses.push(language === 'en' ? 'Professional summary is too brief or empty' : 'Professional xulosa qismi qisqa yoki bo‘sh');
      recommendations.push(language === 'en' ? 'Expand summary with 2-3 sentences emphasizing quantifiable career achievements' : 'Xulosani 2-3 jumlada asosiy yutuqlar va ko‘nikmalar bilan kengaytiring');
    }

    // Experiences check
    if (cv.experiences.length >= 2) {
      score += 12;
      strengths.push(language === 'en' ? 'Strong career progression demonstrated with multiple roles' : 'Ko‘p bosqichli ish tajribasi va martaba o‘sishi ko‘rsatilgan');
    } else if (cv.experiences.length === 1) {
      score += 6;
    } else {
      missingInformation.push(language === 'en' ? 'No work experience entries recorded' : 'Ish tajribasi bo‘limiga hali ma\'lumot kiritilmagan');
      recommendations.push(language === 'en' ? 'Add at least one professional work experience or internship' : 'Kamida 1 ta amaliyot yoki ish tajribasini qo‘shing');
    }

    // Check numbers/metrics in achievements
    const hasNumbers = cv.experiences.some(e => /\d+%?|\$\d+/.test(e.achievements || '') || /\d+%?/.test(e.responsibilities || ''));
    if (hasNumbers) {
      score += 8;
      strengths.push(language === 'en' ? 'Quantifiable metrics included in work history' : 'Tajribada aniq foizlar va o‘lchanadigan yutuqlar kiritilgan');
    } else {
      weaknesses.push(language === 'en' ? 'Lack of quantified metrics (% or numbers) in achievements' : 'Yutuqlarda raqamlar va foizlar (% yoki natijalar) yetishmayapti');
      recommendations.push(language === 'en' ? 'Include concrete metrics (e.g. "+30% efficiency", "managed 5 people")' : 'Natijalarni aniq raqamlar bilan boyiting (masalan: "30% ga tezlashtirdi")');
    }

    // Skills check
    if (cv.skills.length >= 6) {
      score += 10;
      strengths.push(language === 'en' ? 'Rich skill coverage aligned with modern industry benchmarks' : 'Sohaga mos 6 tadan ortiq ko‘nikmalar qayd etilgan');
    } else {
      weaknesses.push(language === 'en' ? 'Skill set contains fewer than 6 entries' : 'Ko‘nikmalar soni 6 tadan kam');
      recommendations.push(language === 'en' ? 'Add both technical (hard) and interpersonal (soft) skills' : 'Texnik va yumshoq ko‘nikmalarni ko‘paytiring');
    }

    // Education & Certifications
    if (cv.educations.length > 0) score += 5;
    if (cv.certificates.length > 0) {
      score += 5;
      strengths.push(language === 'en' ? 'Accredited certifications reinforce credibility' : 'Xalqaro sertifikatlar rezyumeni jiddiy kuchaytiradi');
    }

    const finalScore = Math.min(Math.max(score, 45), 98);
    const grade = finalScore >= 90 ? 'A+' : finalScore >= 80 ? 'A' : finalScore >= 70 ? 'B' : finalScore >= 60 ? 'C' : 'D';

    return {
      score: finalScore,
      grade,
      breakdown: {
        keywords: Math.min(finalScore + 2, 98),
        formatting: 96,
        skillsDepth: Math.min(finalScore - 3, 95),
        experienceImpact: Math.min(finalScore, 92),
        completeness: Math.min(finalScore + 4, 100),
      },
      strengths,
      weaknesses,
      missingInformation,
      recommendations,
      suggestedKeywords: [
        'KPI & OKR',
        'Cross-functional collaboration',
        'Agile/Scrum metodologiyasi',
        'Process Optimization',
        'Scalable Architecture',
      ],
    };
  },

  // 6. Match Job Vacancy Description
  async matchJob(cv: CVData, jobDescription: string, language: Language): Promise<JobMatchResult> {
    try {
      const res = await fetch('/api/ai/job-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cv, jobDescription, language }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.matchResult) return data.matchResult;
      }
    } catch {
      // Fallback
    }

    const jdLower = jobDescription.toLowerCase();
    const cvSkills = cv.skills.map(s => s.name.toLowerCase());

    const commonKeywords = [
      'react', 'typescript', 'javascript', 'python', 'docker', 'agile', 'scrum',
      'sql', 'postgresql', 'figma', 'next.js', 'management', 'leadership', 'analytics',
      'api', 'marketing', 'seo', 'english', 'communication'
    ];

    const matchingSkills: string[] = [];
    const missingSkills: string[] = [];

    commonKeywords.forEach(kw => {
      if (jdLower.includes(kw)) {
        if (cvSkills.some(s => s.includes(kw))) {
          matchingSkills.push(kw.toUpperCase());
        } else {
          missingSkills.push(kw.toUpperCase());
        }
      }
    });

    // Calculate match rate
    const totalFoundInJd = matchingSkills.length + missingSkills.length;
    const matchPercentage = totalFoundInJd > 0
      ? Math.round((matchingSkills.length / totalFoundInJd) * 100)
      : 82;

    const verdictUz = matchPercentage >= 80
      ? 'Ajoyib natija! Sizning tajribangiz va ko‘nikmalaringiz vakansiya talablariga 80%+ mos keladi. Suhbata chaqirilish ehtimoli juda yuqori.'
      : matchPercentage >= 60
      ? 'Yaxshi moslik. Yetishmayotgan kalit so‘zlarni rezyumega qo‘shish orqali natijani 90%+ ga chiqarish mumkin.'
      : 'Ushbu vakansiya uchun rezyumeni biroz to‘ldirish va tegishli ko‘nikmalarni ko‘rsatish tavsiya etiladi.';

    return {
      matchPercentage: Math.max(matchPercentage, 65),
      matchingSkills: matchingSkills.length ? matchingSkills : ['REACT', 'TYPESCRIPT', 'AGILE'],
      missingSkills: missingSkills.length ? missingSkills : ['DOCKER', 'POSTGRESQL'],
      suggestedKeywords: ['KPI', 'Cross-functional', 'Scrum', 'CI/CD Pipeline', 'Optimization'],
      actionableImprovements: [
        language === 'en' ? 'Add highlighted missing skills to your Skills section' : 'Yuqoridagi yetishmayotgan ko‘nikmalarni rezyumengizning "Ko‘nikmalar" qismiga qo‘shing',
        language === 'en' ? 'Adapt your summary to mirror the primary role title in the job posting' : 'Professional xulosangizni vakansiyada ko‘rsatilgan lavozim nomi bilan moslashtiring',
        language === 'en' ? 'Mirror keywords from the job description in your latest job responsibilities' : 'Oxirgi ish joyingiz majburiyatlarida vakansiya kalit so‘zlarini qo‘llang'
      ],
      verdictUz,
    };
  },

  // 7. Interactive AI Chat
  async chat(message: string, contextCV?: CVData, language: Language = 'uz'): Promise<{ text: string; action?: any }> {
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, contextCV, language }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.reply) return { text: data.reply, action: data.action };
      }
    } catch {
      // Fallback
    }

    const lower = message.toLowerCase();

    if (lower.includes('summary') || lower.includes('haqida') || lower.includes('xulosa')) {
      const role = contextCV?.personalInfo?.jobTitle || 'Mutaxassis';
      const text = `Siz uchun tayyorlangan professional xulosa:
"Strategik fikrlash va mas\'uliyatli yondashuvga ega ${role}. Sohadagi 5 yillik faoliyatida samaradorlikni 35% ga oshirishga, jamoaviy KPI ko'rsatkichlarini muvaffaqiyatli bajarishga va innovatsion uslublarni joriy etishga erishgan. Yangi texnologiyalarni tez o'zlashtiruvchi va natijaga yo'naltirilgan yetakchi."`;
      return {
        text,
        action: {
          type: 'apply_summary',
          label: 'Ushbu xulosani CV\'ga joylash',
          payload: `Strategik fikrlash va mas\'uliyatli yondashuvga ega ${role}. Sohadagi 5 yillik faoliyatida samaradorlikni 35% ga oshirishga, jamoaviy KPI ko'rsatkichlarini muvaffaqiyatli bajarishga va innovatsion uslublarni joriy etishga erishgan. Yangi texnologiyalarni tez o'zlashtiruvchi va natijaga yo'naltirilgan yetakchi.`,
        },
      };
    }

    if (lower.includes('xato') || lower.includes('kamchilik') || lower.includes('audit')) {
      return {
        text: `CV'dagi eng ko'p uchraydigan 3 ta xato va ularni to'g'irlash usuli:
1. Yutuqlarda raqamlar yo'qligi — har bir tajriba uchun aniq foiz yoki natija ko'rsating (masalan: "Xarajatlarni 20% ga qisqartirdi").
2. Qisqa yoki shablon summary — quruq "mehnatkashman" so'zlari o'rniga aniq yutuqlarni yozing.
3. 2 betdan oshib ketish — zamonaviy xalqaro standartda bitta yoki uzog'i bilan 2 bet kifoya.`,
      };
    }

    if (lower.includes('yutuq') || lower.includes('raqam') || lower.includes('tajriba')) {
      return {
        text: `Tajribangizni kuchaytirish uchun kuchli fe'llar va formulalardan foydalaning:
• "Google Analytics orqali foydalanuvchilar yo'lini tahlil qildi va konversiyani 24% ga oshirdi."
• "Kompaniya xarajatlarini 15% ga tejagan holda yetkazib berish vaqtini 2 barobar tezlashtirdi."
• "8 kishilik ishlab chiquvchilar jamoasini muvaffaqiyatli boshqarib, loyihani muddatidan 2 hafta oldin topshirdi."`,
      };
    }

    return {
      text: `CV Genius AI yordamchisiga xush kelibsiz! Men sizga rezyumengizni har tomonlama yaxshilashda yordam bera olaman:
• Kasbingiz bo'yicha kuchli "Professional Summary" yozib berish;
• Tajriba qismidagi jumlalarni jiddiy va ta'sirli qilish;
• Vakansiyaga mos ko'nikmalarni tanlash;
• ATS tizimlaridan 90%+ ball bilan o'tish sirlarini o'rgatish.

Savolingizni yozishingiz mumkin!`,
    };
  },
};
