import { useState } from 'react';
import { FestivalConceptSection } from './components/FestivalConceptSection.tsx';
import { Footer } from './components/Footer.tsx';
import { Header } from './components/Header.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { PlannerSection } from './components/PlannerSection.tsx';
import { SpotShowcaseSection } from './components/SpotShowcaseSection.tsx';
import {
  type ActivityPreferenceKey,
  type DurationMinutes,
  type MoodKey,
} from './shared/itineraryTypes.ts';

const DEFAULT_MOOD: MoodKey = 'stressed';
const DEFAULT_DURATION: DurationMinutes = 60;
const DEFAULT_PREFERENCES: ActivityPreferenceKey[] = [
  'lakeside_walk',
  'heritage_architecture',
];

export default function App() {
  const [mood, setMood] = useState<MoodKey>(DEFAULT_MOOD);
  const [duration, setDuration] = useState<DurationMinutes>(DEFAULT_DURATION);
  const [preferences, setPreferences] =
    useState<ActivityPreferenceKey[]>(DEFAULT_PREFERENCES);

  const handleTogglePreference = (pref: ActivityPreferenceKey) => {
    setPreferences((prev) =>
      prev.includes(pref)
        ? prev.filter((item) => item !== pref)
        : [...prev, pref]
    );
  };

  const handleSelectSpotlight = (pref: ActivityPreferenceKey) => {
    setPreferences((prev) => (prev.includes(pref) ? prev : [pref, ...prev]));
    const plannerEl = document.getElementById('planner');
    plannerEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleResetAll = () => {
    setMood(DEFAULT_MOOD);
    setDuration(DEFAULT_DURATION);
    setPreferences(DEFAULT_PREFERENCES);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1E2722]">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <SpotShowcaseSection onSelectSpotlight={handleSelectSpotlight} />
        <PlannerSection
          mood={mood}
          duration={duration}
          preferences={preferences}
          onChangeMood={setMood}
          onChangeDuration={setDuration}
          onTogglePreference={handleTogglePreference}
          onResetAll={handleResetAll}
        />
        <FestivalConceptSection />
      </main>
      <Footer />
    </div>
  );
}
