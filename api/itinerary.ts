import type { IncomingMessage, ServerResponse } from 'http';
import { generateItinerary } from '../server/geminiService.ts';
import {
  type ActivityPreferenceKey,
  type DurationMinutes,
  type MoodKey,
} from '../src/shared/itineraryTypes.ts';

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

async function readJsonBody(req: IncomingMessage): Promise<Record<string, unknown>> {
  const reqWithBody = req as IncomingMessage & { body?: unknown };
  if (reqWithBody.body && typeof reqWithBody.body === 'object') {
    return reqWithBody.body as Record<string, unknown>;
  }

  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw) return {};
  return JSON.parse(raw) as Record<string, unknown>;
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    return;
  }

  try {
    const body = await readJsonBody(req);

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

    res.statusCode = 200;
    res.end(JSON.stringify(result));
  } catch (error) {
    console.error('Vercel /api/itinerary error:', error);
    res.statusCode = 500;
    res.end(
      JSON.stringify({
        error: '行程生成時發生暫時性錯誤，請稍後再試。',
      })
    );
  }
}
