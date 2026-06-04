import { create } from "zustand";

export type JournalEntry = {
  date: string;
  text: string;
  sentiment: "Positive" | "Neutral" | "Negative" | null;
  emotion?: string;
  insight?: string;
};

export type WeeklyMoodPoint = {
  day: string;
  value: number;
};

export type MusicTrack = {
  id: number;
  title: string;
  artist: string;
  category: string;
  src: string;
  cover: string;
  emoji: string;
};

type EquilibriaState = {
  userName: string;
  todayMood: string | null;
  moodIntensity: number;
  moodNote: string;

  journalEntries: JournalEntry[];
  stressAnswers: unknown[];
  stressLevel: number | null;
  weeklyMoodData: WeeklyMoodPoint[];

  currentTrack: MusicTrack | null;
  audio: HTMLAudioElement | null;
  isPlaying: boolean;
  progress: number;

  setCurrentTrack: (track: MusicTrack | null) => void;
  clearCurrentTrack: () => void;

  setAudio: (audio: HTMLAudioElement | null) => void;
  setIsPlaying: (playing: boolean) => void;
  setProgress: (progress: number) => void;

  setUserName: (name: string) => void;

  setMood: (
    mood: string | null,
    intensity?: number,
    note?: string
  ) => void;

  addJournalEntry: (entry: JournalEntry) => void;

  setStress: (
    answers: unknown[],
    level: number | null
  ) => void;

  clear: () => void;
};

const defaultWeekly: WeeklyMoodPoint[] = [
  { day: "Mon", value: 5 },
  { day: "Tue", value: 4 },
  { day: "Wed", value: 4 },
  { day: "Thu", value: 3 },
  { day: "Fri", value: 5 },
  { day: "Sat", value: 5 },
  { day: "Sun", value: 6 },
];

export const useEquilibriaStore = create<EquilibriaState>(
  (set, get) => ({
    userName: "",
    todayMood: null,
    moodIntensity: 50,
    moodNote: "",

    journalEntries: [],
    stressAnswers: [],
    stressLevel: null,
    weeklyMoodData: defaultWeekly,

    currentTrack: null,
    audio: null,
    isPlaying: false,
    progress: 0,

    setCurrentTrack: (track) =>
      set({
        currentTrack: track,
      }),

    clearCurrentTrack: () => {
      const audio = get().audio;

      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }

      set({
        currentTrack: null,
        audio: null,
        isPlaying: false,
        progress: 0,
      });
    },

    setAudio: (audio) =>
      set({
        audio,
      }),

    setIsPlaying: (playing) =>
      set({
        isPlaying: playing,
      }),

    setProgress: (progress) =>
      set({
        progress,
      }),

    setUserName: (name) =>
      set({
        userName: name.trim() || "Luthfi",
      }),

    setMood: (mood, intensity, note) =>
      set({
        todayMood: mood,
        moodIntensity:
          typeof intensity === "number"
            ? intensity
            : get().moodIntensity,
        moodNote:
          typeof note === "string"
            ? note
            : get().moodNote,
      }),

    addJournalEntry: (entry) =>
      set({
        journalEntries: [
          entry,
          ...get().journalEntries,
        ],
      }),

    setStress: (answers, level) =>
      set({
        stressAnswers: answers,
        stressLevel: level,
      }),

    clear: () => {
      const audio = get().audio;

      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }

      set({
        userName: "",
        todayMood: null,
        moodIntensity: 50,
        moodNote: "",

        journalEntries: [],
        stressAnswers: [],
        stressLevel: null,

        weeklyMoodData: defaultWeekly,

        currentTrack: null,
        audio: null,
        isPlaying: false,
        progress: 0,
      });
    },
  })
);