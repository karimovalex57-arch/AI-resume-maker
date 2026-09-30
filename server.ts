import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize GoogleGenAI if GEMINI_API_KEY is present
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// 1. Generate Summary
app.post('/api/ai/generate-summary', async (req: Request, res: Response) => {
  const { jobTitle, yearsOfExp, keySkills, language = 'uz' } = req.body;
  if (!ai) {
    return res.status(200).json({ summary: null, source: 'fallback' });
  }

  try {
    const prompt = `Write a powerful, executive 3-4 sentence professional resume summary for a "${jobTitle}".
${yearsOfExp ? `Experience: ${yearsOfExp}.` : ''}
${keySkills?.length ? `Key skills: ${keySkills.join(', ')}.` : ''}
Language: Write the entire summary in ${language === 'uz' ? 'Uzbek (o\'zbek tilida)' : language === 'ru' ? 'Russian' : 'English'}.
Focus on quantifiable metrics, leadership, problem solving, and modern industry impact. Do NOT include placeholder tags. Return only the summary text.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    const summary = response.text?.trim() || null;
    return res.json({ summary, source: 'gemini' });
  } catch (error) {
    console.error('Gemini generate-summary error:', error);
    return res.json({ summary: null, source: 'fallback' });
  }
});

// 2. Improve Bullet Points
app.post('/api/ai/improve-text', async (req: Request, res: Response) => {
  const { text, role, language = 'uz' } = req.body;
  if (!ai || !text) {
    return res.status(200).json({ improvedText: null, source: 'fallback' });
  }

  try {
    const prompt = `Rewrite and dramatically elevate the following resume job bullet point/responsibility into a high-impact, action-verb driven accomplishment:
"${text}"
Role context: ${role || 'Professional'}.
Target Language: ${language === 'uz' ? 'Uzbek (o\'zbek tilida)' : language === 'ru' ? 'Russian' : 'English'}.
Requirements:
- Start with a strong action verb.
- Emphasize quantifiable business outcomes, efficiency gains, or technical excellence.
- Make it punchy and professional.
- Return ONLY the improved bullet point string, nothing else.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    const improvedText = response.text?.trim() || null;
    return res.json({ improvedText, source: 'gemini' });
  } catch (error) {
    console.error('Gemini improve-text error:', error);
    return res.json({ improvedText: null, source: 'fallback' });
  }
});

// 3. Suggest Skills
app.post('/api/ai/suggest-skills', async (req: Request, res: Response) => {
  const { jobTitle, language = 'uz' } = req.body;
  if (!ai || !jobTitle) {
    return res.status(200).json({ skills: null, source: 'fallback' });
  }

  try {
    const prompt = `List 8-10 essential modern hard and soft skills for a "${jobTitle}".
Language: ${language === 'uz' ? 'Uzbek/English technical terms standard in the market' : language === 'ru' ? 'Russian' : 'English'}.
Format: Return as a clean JSON array of strings: ["Skill 1", "Skill 2", ...]. Only output the JSON array.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text?.trim() || '[]');
    return res.json({ skills: parsed, source: 'gemini' });
  } catch (error) {
    console.error('Gemini suggest-skills error:', error);
    return res.json({ skills: null, source: 'fallback' });
  }
});

// 4. Generate Cover Letter
app.post('/api/ai/cover-letter', async (req: Request, res: Response) => {
  const { targetCompany, jobPosition, jobDescription, userExperienceHighlights, tone = 'professional', language = 'uz' } = req.body;
  if (!ai) {
    return res.status(200).json({ content: null, source: 'fallback' });
  }

  try {
    const prompt = `Write a persuasive, tailored cover letter for:
Company: ${targetCompany || 'the target company'}
Position: ${jobPosition || 'the advertised position'}
Job description context: ${jobDescription || 'Standard industry requirements'}
Candidate highlights: ${userExperienceHighlights || 'Proven track record of success and adaptability'}
Tone: ${tone}
Language: ${language === 'uz' ? 'Uzbek (o\'zbek tilida)' : language === 'ru' ? 'Russian' : 'English'}
Structure: Salutation, compelling opening hook, 2 body paragraphs highlighting quantifiable achievements and cultural match, call to action, and professional closing.
Return ONLY the formatted letter text.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    return res.json({ content: response.text?.trim() || null, source: 'gemini' });
  } catch (error) {
    console.error('Gemini cover-letter error:', error);
    return res.json({ content: null, source: 'fallback' });
  }
});

// 5. Interactive Chat
app.post('/api/ai/chat', async (req: Request, res: Response) => {
  const { message, contextCV, language = 'uz' } = req.body;
  if (!ai) {
    return res.status(200).json({ reply: null, source: 'fallback' });
  }

  try {
    const systemPrompt = `You are CV Genius AI, a world-class executive resume strategist and career coach.
You give actionable, concise advice on CV optimization, bullet point rewriting, ATS passing strategies, and interview preparation.
Context resume: Job title: "${contextCV?.personalInfo?.jobTitle || 'N/A'}", current experience: ${contextCV?.experiences?.length || 0} jobs.
Default language: ${language === 'uz' ? 'Uzbek' : language === 'ru' ? 'Russian' : 'English'}.
Keep responses helpful, structured with bullet points where appropriate, and friendly.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: message,
      config: {
        systemInstruction: systemPrompt,
      },
    });

    return res.json({ reply: response.text?.trim(), source: 'gemini' });
  } catch (error) {
    console.error('Gemini chat error:', error);
    return res.json({ reply: null, source: 'fallback' });
  }
});

// Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CV Genius AI server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
