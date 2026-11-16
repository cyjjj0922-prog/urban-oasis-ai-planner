import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { generateItinerary } from './server/geminiService.ts';
import {
  type ActivityPreferenceKey,
  type DurationMinutes,
  type MoodKey,
} from './src/shared/itineraryTypes.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VALID_MOODS = new Set<MoodKey>([
  'stressed',
  'spacing_out',
  'photography',
  'dating',
  'culture',
]);

const VALID_DURATIONS = new Set<DurationMinutes>([30, 60, 120]);

const VALID_PREFERENCES = new Set<ActivityPreferenceKey>([
  'lakeside_walk',
  'heritage_architecture',
  'photo_spots',
  'cafe_rest',
]);

async function startServer() {
  const app = express();
  const port = Number(process.env.PORT) || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json());

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true });
  });

  app.post('/api/itinerary', async (req, res) => {
    try {
      const body = (req.body ?? {}) as {
        mood?: string;
        duration?: number;
        preferences?: string[];
        variantSeed?: number;
      };

      const mood: MoodKey = VALID_MOODS.has(body.mood as MoodKey)
        ? (body.mood as MoodKey)
        : 'spacing_out';

      const parsedDuration = Number(body.duration) as DurationMinutes;
      const duration: DurationMinutes = VALID_DURATIONS.has(parsedDuration)
        ? parsedDuration
        : 60;

      const rawPrefs = Array.isArray(body.preferences) ? body.preferences : [];
      const preferences: ActivityPreferenceKey[] = rawPrefs.filter(
        (pref): pref is ActivityPreferenceKey =>
          VALID_PREFERENCES.has(pref as ActivityPreferenceKey)
      );

      const safePreferences: ActivityPreferenceKey[] =
        preferences.length > 0 ? preferences : ['lakeside_walk'];

      const variantSeed = Number.isFinite(Number(body.variantSeed))
        ? Math.max(0, Math.floor(Number(body.variantSeed)))
        : 0;

      const result = await generateItinerary({
        mood,
        duration,
        preferences: safePreferences,
        variantSeed,
      });

      res.json(result);
    } catch (error) {
      console.error('Failed to handle /api/itinerary:', error);
      res.status(500).json({
        error: '行程生成時發生暫時性錯誤，請稍後再試。',
      });
    }
  });

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distDir)) {
      app.use(express.static(distDir));
      app.get('*', (_req, res) => {
        res.sendFile(path.join(distDir, 'index.html'));
      });
    }
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

startServer();
