"use client";

"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  MoreVertical,
  Play,
  Pause,
  Search,
  SkipBack,
  SkipForward,
} from "lucide-react";

import {
  useEquilibriaStore,
  type MusicTrack,
} from "@/lib/store";
const ALL_TRACKS: MusicTrack[] = [
  {
    id: 1,
    title: "Waterfalls",
    artist: "Nature",
    category: "Nature",
    src: "/Nature/waterfalls.mp3",
    cover: "/covers/waterfalls.jpg",
    emoji: "🏔️",
  },
  {
    id: 2,
    title: "Soft Rain",
    artist: "Ambient",
    category: "Nature",
    src: "/Nature/soft rain.mp3",
    cover: "/covers/soft-rain.jpg",
    emoji: "🌧️",
  },
  {
    id: 3,
    title: "Wind",
    artist: "Nature",
    category: "Nature",
    src: "/Nature/wind.mp3",
    cover: "/covers/wind.jpg",
    emoji: "🌬️",
  },
  {
    id: 4,
    title: "Deep Space Sleep",
    artist: "Sleep",
    category: "Sleep",
    src: "/Sleep/deep space sleep.mp3",
    cover: "/covers/deep-space.jpg",
    emoji: "🪐",
  },
  {
    id: 5,
    title: "Delta Waves",
    artist: "Sleep",
    category: "Sleep",
    src: "/Sleep/delta waves.mp3",
    cover: "/covers/delta-waves.jpg",
    emoji: "🌊",
  },
  {
    id: 6,
    title: "White Noise",
    artist: "Sleep",
    category: "Sleep",
    src: "/Sleep/white noise.mp3",
    cover: "/covers/white-noise.jpg",
    emoji: "🌙",
  },
  {
    id: 7,
    title: "Brown Noise",
    artist: "Focus",
    category: "Focus",
    src: "/Focus/Brown Noise.mp3",
    cover: "/covers/brown-noise.jpg",
    emoji: "🎯",
  },
  {
    id: 8,
    title: "Lofi Music",
    artist: "Focus",
    category: "Focus",
    src: "/Focus/Lofi-Music.mp3",
    cover: "/covers/lofi-music.jpg",
    emoji: "📚",
  },
  {
    id: 9,
    title: "Lofi Study Calm",
    artist: "Focus",
    category: "Focus",
    src: "/Focus/Lofi-Study-Calm.mp3",
    cover: "/covers/lofi-study.jpg",
    emoji: "☕",
  },
  {
    id: 10,
    title: "Calm Piano",
    artist: "Instrumental",
    category: "Calm",
    src: "/Calm/Calm Piano.mp3",
    cover: "/covers/calm-piano.jpg",
    emoji: "🎹",
  },
  {
    id: 11,
    title: "Flute Meditation",
    artist: "Meditation",
    category: "Calm",
    src: "/Calm/flute meditation.mp3",
    cover: "/covers/flute.jpg",
    emoji: "🎵",
  },
  {
    id: 12,
    title: "Tibetan Bowls",
    artist: "Meditation",
    category: "Calm",
    src: "/Calm/Tibetan Bowls.mp3",
    cover: "/covers/tibetan.jpg",
    emoji: "🔔",
  },
];


function Card(props: { children: React.ReactNode; className?: string }) {
  return (
    <div className={["rounded-[16px] bg-eq-card p-4 shadow-sm ring-1 ring-black/5", props.className ?? ""].join(" ")}>
      {props.children}
    </div>
  );
}

export default function MusicPage() {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState("All");
  const currentTrack = useEquilibriaStore((s) => s.currentTrack);
const setCurrentTrack = useEquilibriaStore((s) => s.setCurrentTrack);
const setAudio = useEquilibriaStore(
  (s) => s.setAudio
);

const isPlaying = useEquilibriaStore((s) => s.isPlaying);
const setIsPlaying = useEquilibriaStore((s) => s.setIsPlaying);

const progress = useEquilibriaStore((s) => s.progress);
const setProgress = useEquilibriaStore((s) => s.setProgress);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const progressInterval = React.useRef<NodeJS.Timeout | null>(null);

  const categories = ["All", "Nature", "Sleep", "Focus", "Calm"];

  const filteredTracks = ALL_TRACKS.filter((t) => {
    const matchCat = activeCategory === "All" || t.category === activeCategory;
    const matchQ = query === "" || t.title.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  const clearProgress = () => {
    if (progressInterval.current) clearInterval(progressInterval.current);
  };

  const startProgress = (audio: HTMLAudioElement) => {
    clearProgress();
    progressInterval.current = setInterval(() => {
      if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
    }, 500);
  };

  const playTrack = (track: MusicTrack) => {
    if (currentTrack?.id === track.id) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
        clearProgress();
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
        if (audioRef.current) startProgress(audioRef.current);
      }
      return;
    }
    audioRef.current?.pause();
    clearProgress();
    setProgress(0);
    const audio = new Audio(track.src);
    audio.volume = 0.8;
    audioRef.current = audio;
setAudio(audio);
    audio.play().catch(() => {});
    audio.onended = () => {
      const idx = ALL_TRACKS.findIndex((t) => t.id === track.id);
      playTrack(ALL_TRACKS[(idx + 1) % ALL_TRACKS.length]);
    };
    setCurrentTrack(track);
    setIsPlaying(true);
    startProgress(audio);
  };

  const skipTrack = (dir: "prev" | "next") => {
    if (!currentTrack) return;
    const idx = ALL_TRACKS.findIndex((t) => t.id === currentTrack.id);
    const next = dir === "next"
      ? ALL_TRACKS[(idx + 1) % ALL_TRACKS.length]
      : ALL_TRACKS[(idx - 1 + ALL_TRACKS.length) % ALL_TRACKS.length];
    playTrack(next);
  };

  React.useEffect(() => {
    return () => { audioRef.current?.pause(); clearProgress(); };
  }, []);

  return (
    <main className="bg-eq-bg px-5 py-6 space-y-5 flex flex-col music-page pb-40">
      <header className="flex items-center gap-3">
        <button type="button" onClick={() => router.back()}
          className="inline-flex size-10 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-black/5 hover:bg-white/90">
          <ArrowLeft className="size-5 text-eq-text" />
        </button>
        <h1 className="flex-1 text-center text-sm font-semibold text-eq-text">Relax music</h1>
        <div className="size-10" />
      </header>

      <label className="flex items-center gap-2 rounded-[16px] bg-white px-4 py-3 shadow-sm ring-1 ring-black/5">
        <Search className="size-5 text-eq-text-muted" />
        <input value={query} onChange={(e) => setQuery(e.target.value)}
          placeholder="Search music, artist, or mood"
          className="w-full bg-transparent text-sm text-eq-text outline-none placeholder:text-eq-text-muted" />
      </label>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-eq-text">Categories</h2>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map((c) => (
            <button key={c} type="button" onClick={() => setActiveCategory(c)}
              className={["rounded-[14px] px-4 py-2.5 text-xs font-semibold shadow-sm ring-1 whitespace-nowrap transition-colors",
                activeCategory === c ? "bg-eq-primary text-white ring-eq-primary" : "bg-eq-card text-eq-text ring-black/5"].join(" ")}>
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-3 flex-1">
        <h2 className="text-sm font-semibold text-eq-text">
          {activeCategory === "All" ? "All Tracks" : activeCategory}
          <span className="ml-1.5 text-xs font-normal text-eq-text-muted">({filteredTracks.length})</span>
        </h2>
        <div className="space-y-3">
          {filteredTracks.map((track) => {
            const isActive = currentTrack?.id === track.id;
            return (
              <Card key={track.id} className={["flex items-center gap-3", isActive ? "ring-2 ring-eq-primary/40" : ""].join(" ")}>
                <div className={["size-14 rounded-[14px] flex items-center justify-center text-2xl",
                  isActive ? "bg-eq-primary/10" : "bg-white/70 ring-1 ring-black/5"].join(" ")}>
                  {track.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={["text-sm font-semibold truncate", isActive ? "text-eq-primary" : "text-eq-text"].join(" ")}>
                    {track.title}
                  </p>
                  <p className="text-xs text-eq-text-muted">{track.artist}</p>
                  {isActive && (
                    <div className="mt-1.5 h-1 w-full rounded-full bg-black/10">
                      <div className="h-1 rounded-full bg-eq-primary transition-all duration-500" style={{ width: `${progress}%` }} />
                    </div>
                  )}
                </div>
                <button type="button" onClick={() => playTrack(track)}
                  className={["grid size-10 place-items-center rounded-full shadow-sm ring-1 transition-colors",
                    isActive && isPlaying ? "bg-eq-primary ring-eq-primary text-white" : "bg-white ring-black/10 text-eq-text"].join(" ")}>
                  {isActive && isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
                </button>
                <button type="button" className="grid size-10 place-items-center rounded-full bg-white/70 ring-1 ring-black/10">
                  <MoreVertical className="size-5 text-eq-text-muted" />
                </button>
              </Card>
            );
          })}
        </div>
      </section>

      
    </main>
  );
}