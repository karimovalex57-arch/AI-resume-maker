import { CVData } from '../types';

export const sampleCV1: CVData = {
  id: 'cv-sample-1',
  title: 'Senior Frontend Dasturchi',
  templateId: 'modern',
  colorTheme: 'blue',
  lastModified: '2026-09-28',
  createdAt: '2026-09-10',
  isCompleted: true,
  atsScore: 94,
  personalInfo: {
    fullName: 'Jasur Alimov',
    jobTitle: 'Senior Frontend Dasturchi',
    email: 'jasur.alimov@example.uz',
    phone: '+998 90 123 45 67',
    location: 'Toshkent, O\'zbekiston',
    website: 'https://jasuralimov.uz',
    linkedin: 'linkedin.com/in/jasuralimov',
    github: 'github.com/jasuralimov',
    avatarUrl: '/src/assets/images/avatar_professional_1_1790762782018.jpg',
    summary: '6 yildan ortiq tajribaga ega bo\'lgan Senior Frontend Muhandisi. Yuqori yuklamali SaaS mahsulotlari, React va TypeScript ekotizimida murakkab veb-ilovalarni arxitekturasi va optimallashtirish bo\'yicha ixtisoslashgan. Foydalanuvchilar konversiyasini 35% ga oshirgan va yuklanish tezligini 40% ga qisqartirgan.',
  },
  experiences: [
    {
      id: 'exp-1',
      company: 'PayTech Solutions',
      position: 'Lead Frontend Engineer',
      location: 'Toshkent, O\'zbekiston',
      startDate: '2023-03',
      endDate: 'Hozirda',
      current: true,
      responsibilities: '10 kishilik frontend jamoasiga rahbarlik qilish, mikro-frontend arxitekturasini loyihalash va kod sifatini nazorat qilish.',
      achievements: 'Ilovaning Core Web Vitals ko\'rsatkichlarini 98/100 ga yetkazdi; to\'lov interfeysi orqali oylik tranzaksiya hajmini $2.5M ga oshirishga hissa qo\'shdi.',
    },
    {
      id: 'exp-2',
      company: 'Global Cloud Systems',
      position: 'Frontend Dasturchi',
      location: 'Masofaviy (Remote)',
      startDate: '2021-01',
      endDate: '2023-02',
      current: false,
      responsibilities: 'React, Next.js, Redux Toolkit yordamida korporativ CRM va analitika panellarini ishlab chiqish.',
      achievements: 'Katta hajmdagi ma\'lumotlar jadvallarini virtualizatsiya qilish orqali xotira sarfini 50% ga kamaytirdi.',
    },
    {
      id: 'exp-3',
      company: 'Digital Innovation Hub',
      position: 'Junior / Middle Web Developer',
      location: 'Toshkent',
      startDate: '2019-06',
      endDate: '2020-12',
      current: false,
      responsibilities: 'Kompaniya va mijozlar uchun veb-saytlar va e-commerce modullarini yaratish.',
      achievements: '30 dan ortiq muvaffaqiyatli loyihalarni o\'z vaqtida topshirdi.',
    },
  ],
  educations: [
    {
      id: 'edu-1',
      institution: 'Toshkent Axborot Texnologiyalari Universiteti (TATU)',
      degree: 'Bakalavr',
      fieldOfStudy: 'Dasturiy injiniring',
      startDate: '2016-09',
      endDate: '2020-06',
      gpa: '3.8 / 4.0',
      description: 'Axborot xavfsizligi, algoritmlar va ma\'lumotlar tuzilmalari bo\'yicha maxsus kurslar.',
    },
  ],
  skills: [
    { id: 'sk-1', name: 'React & Next.js', level: 'Ekspert', category: 'Dasturlash' },
    { id: 'sk-2', name: 'TypeScript', level: 'Ekspert', category: 'Dasturlash' },
    { id: 'sk-3', name: 'Tailwind CSS', level: 'Ekspert', category: 'Hard Skills' },
    { id: 'sk-4', name: 'Redux & Zustand', level: 'Ilg\'or', category: 'Hard Skills' },
    { id: 'sk-5', name: 'RESTful API & GraphQL', level: 'Ilg\'or', category: 'Hard Skills' },
    { id: 'sk-6', name: 'Jest & Vitest Unit Testlar', level: 'Ilg\'or', category: 'Hard Skills' },
    { id: 'sk-7', name: 'Jamoaviy yetakchilik', level: 'Ilg\'or', category: 'Soft Skills' },
    { id: 'sk-8', name: 'Agile / Scrum', level: 'Ekspert', category: 'Soft Skills' },
  ],
  languages: [
    { id: 'lang-1', language: 'O\'zbek tili', level: 'Ona tili' },
    { id: 'lang-2', language: 'Ingliz tili', level: 'C1' },
    { id: 'lang-3', language: 'Rus tili', level: 'C2' },
  ],
  certificates: [
    {
      id: 'cert-1',
      name: 'Meta Frontend Developer Professional Certificate',
      organization: 'Coursera / Meta',
      issueDate: '2023-05',
      credentialUrl: 'coursera.org/verify/META-FE-9982',
    },
    {
      id: 'cert-2',
      name: 'AWS Certified Cloud Practitioner',
      organization: 'Amazon Web Services',
      issueDate: '2024-01',
      credentialUrl: 'aws.amazon.com/verification',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'FinTech Dashboard Analytics',
      description: 'Moliyaviy operatsiyalar va daromadlarni real vaqtda kuzatish imkoniyatini beruvchi interaktiv tahlil platformasi.',
      technologies: ['React', 'TypeScript', 'Tailwind', 'Chart.js', 'WebSockets'],
      projectUrl: 'https://fintech-demo.uz',
    },
    {
      id: 'proj-2',
      name: 'FastCommerce B2B Marketplace',
      description: 'Katta ulgurji savdo uchun optimallashtirilgan tezkor e-tijorat tizimi.',
      technologies: ['Next.js 14', 'Zustand', 'PostgreSQL', 'Stripe'],
      projectUrl: 'https://fastcommerce.uz',
    },
  ],
};

export const sampleCV2: CVData = {
  id: 'cv-sample-2',
  title: 'Mahsulot Menejeri (Product Manager)',
  templateId: 'minimal',
  colorTheme: 'purple',
  lastModified: '2026-09-25',
  createdAt: '2026-09-15',
  isCompleted: true,
  atsScore: 91,
  personalInfo: {
    fullName: 'Malika Karimova',
    jobTitle: 'Senior Product Manager',
    email: 'malika.karimova@example.uz',
    phone: '+998 93 987 65 43',
    location: 'Toshkent, O\'zbekiston',
    website: 'https://malikakarimova.com',
    linkedin: 'linkedin.com/in/malikakarimova',
    avatarUrl: '/src/assets/images/avatar_professional_2_1790762794525.jpg',
    summary: 'Mijozlarga yo\'naltirilgan, ma\'lumotlar tahliliga asoslangan 5+ yillik tajribaga ega B2B/B2C Mahsulot Menejeri. G\'oyadan boshlab to $1M+ daromad keltiruvchi raqamli servislar ishga tushirilishigacha bo\'lgan bosqichlarni muvaffaqiyatli boshqargan.',
  },
  experiences: [
    {
      id: 'exp-201',
      company: 'U-Commerce Group',
      position: 'Lead Product Manager',
      location: 'Toshkent',
      startDate: '2022-08',
      endDate: 'Hozirda',
      current: true,
      responsibilities: 'Mahsulot strategiyasini shakllantirish, mijozlar tadqiqoti (CustDev) o\'tkazish, OKR va KPI ko\'rsatkichlarini boshqarish.',
      achievements: 'Mobil ilovaning MAU ko\'rsatkichini 120,000 dan 450,000 taga oshirdi va retention ko\'rsatkichini 22% ga ko\'tardi.',
    },
    {
      id: 'exp-202',
      company: 'EduSmart Technologies',
      position: 'Product Manager',
      location: 'Toshkent',
      startDate: '2020-04',
      endDate: '2022-07',
      current: false,
      responsibilities: 'Ta\'lim platformasining monetizatsiya va o\'quvchi tajribasi (UX) yo\'nalishlarini boshqarish.',
      achievements: 'A/B testlar orqali pullik obunaga o\'tish konversiyasini 18% ga oshirdi.',
    },
  ],
  educations: [
    {
      id: 'edu-201',
      institution: 'Vestminster Xalqaro Universiteti Toshkentda (WIUT)',
      degree: 'Bakalavr',
      fieldOfStudy: 'Biznes Boshqaruvi va Iqtisodiyot',
      startDate: '2016-09',
      endDate: '2020-06',
      gpa: 'First Class Honours',
    },
  ],
  skills: [
    { id: 'sk-201', name: 'Product Roadmapping', level: 'Ekspert', category: 'Hard Skills' },
    { id: 'sk-202', name: 'CustDev & User Interviews', level: 'Ekspert', category: 'Hard Skills' },
    { id: 'sk-203', name: 'A/B Testing & Mixpanel', level: 'Ilg\'or', category: 'Hard Skills' },
    { id: 'sk-204', name: 'Figma & Prototyping', level: 'Ilg\'or', category: 'Asboblar' },
    { id: 'sk-205', name: 'Jira & Agile Sprint Planning', level: 'Ekspert', category: 'Asboblar' },
    { id: 'sk-206', name: 'Biznes Modellash', level: 'Ilg\'or', category: 'Hard Skills' },
  ],
  languages: [
    { id: 'lang-201', language: 'O\'zbek tili', level: 'Ona tili' },
    { id: 'lang-202', language: 'Ingliz tili', level: 'C1' },
    { id: 'lang-203', language: 'Rus tili', level: 'C1' },
  ],
  certificates: [
    {
      id: 'cert-201',
      name: 'Product Management Certified (PMC)',
      organization: 'Product School',
      issueDate: '2022-09',
    },
  ],
  projects: [
    {
      id: 'proj-201',
      name: 'SmartLoyalty Cashback Platform',
      description: 'Retail tarmoqlari uchun sun\'iy intellekt asosida sodiqlik va cashback dasturi.',
      technologies: ['Product Strategy', 'Figma', 'SQL', 'Mixpanel'],
    },
  ],
};

export const sampleCoverLetter = {
  id: 'cl-sample-1',
  title: 'PayTech Solutions uchun Ilhom Xati',
  targetCompany: 'PayTech Solutions',
  jobPosition: 'Lead Frontend Engineer',
  jobDescription: 'Bizga React, TypeScript va mikro-frontendlar bilan ishlash tajribasiga ega, jamoani boshqara oladigan yetakchi dasturchi kerak.',
  userExperienceHighlights: '6+ yillik tajriba, 10 kishilik jamoa yetakchiligi, Core Web Vitals 98/100.',
  tone: 'professional' as const,
  generatedContent: `Hurmatli PayTech Solutions jamoasi va kadrlar bo‘limi,

Men sizning kompaniyangizdagi "Lead Frontend Engineer" vakansiyasini katta qiziqish va ilhom bilan o‘rganib chiqdim. O‘tgan 6 yildan ortiq davr mobaynida fintech va yuqori yuklamali SaaS mahsulotlarini ishlab chiqishda to‘plagan tajribam hamda jamoaviy yetakchilik ko‘nikmalarim sizning jamoangiz kutayotgan talablarga to‘liq mos kelishiga ishonaman.

Oldingi loyihalarimda men mikro-frontend arxitekturasini noldan loyihalashtirish, ilova yuklanish tezligini 40% ga qisqartirish va to‘lov konversiyalarini sezilarli darajada oshirish bo‘yicha muvaffaqiyatli natijalarga erishdim. Ayniqsa, kod sifati, avtomatlashtirilgan testlar va ishlab chiquvchilar tajribasini (Developer Experience) rivojlantirishga alohida e'tibor qarataman.

PayTech Solutions kompaniyasining moliyaviy texnologiyalar sohasidagi innovatsiyalari va bozorga olib kirayotgan yangi yechimlari meni hayratga soladi. Mening tajribam jamoangizga yangi bosqichga ko‘tarilishda va foydalanuvchilar uchun qulay, ishonchli tizimlarni yaratishda xizmat qiladi deb umid qilaman.

Siz bilan suhbatda mening tajribam va kompaniyangiz maqsadlarini batafsil muhokama qilishdan mamnun bo‘laman.

Ehtirom bilan,
Jasur Alimov`,
  createdAt: '2026-09-28',
  lastModified: '2026-09-28',
};
