import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import {
  Satellite,
  Pause,
  Play,
  RefreshCw,
  Zap,
  Globe,
  Activity,
  Clock,
  Layers,
  ShieldCheck,
  Info,
  ArrowUp,
  ArrowDown,
  Waves,
  Radio,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import {
  calculateSlantRange,
  calculateDopplerShift,
  calculateElevationAngle,
  SPEED_OF_LIGHT_KMS,
} from '../utils/physics';

/* ─────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────── */

type TabKey = 'doppler' | 'latency' | 'essa';
type Phase = 'rising' | 'approaching' | 'zenith' | 'receding' | 'setting';

interface Collision {
  id: number;
  x: number;
  recovered: boolean;
}

interface Packet {
  id: number;
  direction: 'uplink' | 'downlink';
  progress: number;
}

interface TableRow {
  label: { it: string; en: string };
  value: { it: string; en: string };
}

/* ─────────────────────────────────────────────────────────────
   CONSTANTS
   ───────────────────────────────────────────────────────────── */

const SPEED_OPTIONS = [1, 5, 10] as const;
const TAB_OPTIONS: { key: TabKey; it: string; en: string }[] = [
  { key: 'doppler', it: 'Effetto Doppler', en: 'Doppler Effect' },
  { key: 'latency', it: 'Latenza & TDMA', en: 'Latency & TDMA' },
  { key: 'essa', it: 'E-SSA & Collisioni', en: 'E-SSA & Collisions' },
];

const STATIC_STARS = Array.from({ length: 60 }).map((_, i) => ({
  id: i,
  top: Math.random() * 100,
  left: Math.random() * 100,
  duration: 2 + Math.random() * 3,
  delay: Math.random() * 3,
  size: Math.random() > 0.85 ? 1 : 0.5,
}));

/* ─────────────────────────────────────────────────────────────
   ID GENERATOR (collision-safe)
   ───────────────────────────────────────────────────────────── */

let idCounter = 0;
const nextId = () => {
  idCounter += 1;
  return idCounter;
};

/* ─────────────────────────────────────────────────────────────
   SUB-COMPONENT · TELEMETRY ITEM
   ───────────────────────────────────────────────────────────── */

const TelemetryItem = ({
  label,
  value,
  unit,
  icon: Icon,
  tooltip,
  colorClass = 'text-white',
}: {
  label: string;
  value: string | number;
  unit: string;
  icon?: React.ComponentType<{ className?: string }>;
  tooltip?: string;
  colorClass?: string;
}) => (
  <div className="group relative p-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 transition-all hover:bg-white/10 hover:border-white/20">
    <div className="flex items-center justify-between mb-1.5">
      <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest truncate">
        {label}
      </div>
      {Icon && <Icon className="w-3.5 h-3.5 text-slate-500 shrink-0" />}
    </div>
    <div className={`text-xl font-black tabular-nums ${colorClass}`}>
      {value}
      <span className="text-[10px] opacity-50 font-bold ml-1">{unit}</span>
    </div>

    {tooltip && (
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-52 p-3 bg-slate-950 border border-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-2xl">
        <p className="text-[9px] text-slate-300 leading-relaxed font-semibold">
          {tooltip}
        </p>
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-slate-950" />
      </div>
    )}
  </div>
);

/* ─────────────────────────────────────────────────────────────
   SUB-COMPONENT · COMPARISON TABLE
   ───────────────────────────────────────────────────────────── */

const ComparisonTable = ({
  data,
  lang,
}: {
  data: TableRow[];
  lang: Language;
}) => (
  <div className="border border-slate-100 rounded-2xl overflow-hidden">
    <div className="grid grid-cols-2 bg-slate-50 px-4 py-2.5 border-b border-slate-100">
      <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
        {lang === 'it' ? 'Parametro' : 'Parameter'}
      </div>
      <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest text-right">
        {lang === 'it' ? 'Valore / Impatto' : 'Value / Impact'}
      </div>
    </div>
    {data.map((item, i) => (
      <div
        key={i}
        className="grid grid-cols-2 px-4 py-3 bg-white border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors gap-3"
      >
        <div className="text-[11px] font-black text-slate-700 uppercase tracking-tight truncate">
          {item.label[lang]}
        </div>
        <div className="text-[11px] font-bold text-slate-500 text-right truncate">
          {item.value[lang]}
        </div>
      </div>
    ))}
  </div>
);

/* ─────────────────────────────────────────────────────────────
   SUB-COMPONENT · ANIMATED COUNTER
   ───────────────────────────────────────────────────────────── */

const useSmoothValue = (target: number, factor = 0.18) => {
  const [val, setVal] = useState(target);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    let current = val;
    const step = () => {
      current = current + (target - current) * factor;
      if (Math.abs(current - target) < 0.01) {
        setVal(target);
        return;
      }
      setVal(current);
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return val;
};

/* ─────────────────────────────────────────────────────────────
   MAIN SIMULATOR
   ───────────────────────────────────────────────────────────── */

export const VdeSatSimulator = ({ lang }: { lang: Language }) => {
  const t = TRANSLATIONS[lang];
  const [isPlaying, setIsPlaying] = useState(false);
  const [passProgress, setPassProgress] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [activeTab, setActiveTab] = useState<TabKey>('doppler');
  const [collisions, setCollisions] = useState<Collision[]>([]);
  const [packets, setPackets] = useState<Packet[]>([]);

  /* ── Refs to avoid stale closures in rAF ── */
  const lastTimeRef = useRef<number>(0);
  const requestRef = useRef<number>(0);
  const stateRef = useRef({ isPlaying, speed, passProgress });
  stateRef.current = { isPlaying, speed, passProgress };

  /* ── Main animation loop (rAF, no stale closure) ── */
  useEffect(() => {
    const animate = (time: number) => {
      const dt = lastTimeRef.current ? time - lastTimeRef.current : 16;
      lastTimeRef.current = time;
      const { isPlaying: playing, speed: spd, passProgress: prog } = stateRef.current;

      if (playing) {
        // Pass progress
        setPassProgress((prev) => {
          const inc = 0.00003 * spd * (dt / 16);
          const next = prev + inc;
          return next > 1 ? 0 : next;
        });

        // Spawn packets (~ every 200ms at speed 1)
        if (Math.random() > 0.97) {
          setPackets((prev) => [
            ...prev.slice(-12),
            {
              id: nextId(),
              direction: Math.random() > 0.5 ? 'uplink' : 'downlink',
              progress: 0,
            },
          ]);
        }

        // Spawn collisions (rarer)
        if (Math.random() > 0.992) {
          const id = nextId();
          const satX = 100 + prog * 800;
          const recovered = Math.random() > 0.3;
          setCollisions((prev) => [...prev, { id, x: satX, recovered }]);
          window.setTimeout(() => {
            setCollisions((prev) => prev.filter((c) => c.id !== id));
          }, 2500);
        }
      }

      // Always advance packet progress (even when paused, they fade out)
      setPackets((prev) =>
        prev
          .map((p) => ({ ...p, progress: p.progress + 0.022 * (dt / 16) }))
          .filter((p) => p.progress < 1)
      );

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(requestRef.current);
      lastTimeRef.current = 0;
    };
  }, []);

  /* ── Memoized physics ── */
  const physics = useMemo(() => {
    const slantRange = calculateSlantRange(passProgress);
    const dopplerShiftHz = calculateDopplerShift(passProgress);
    const latencyMs = (slantRange / SPEED_OF_LIGHT_KMS) * 1000;
    const elevation = calculateElevationAngle(passProgress);
    const satX = 100 + passProgress * 800;
    const satY = 100 - (1 - Math.pow((passProgress - 0.5) * 2, 2)) * 60;

    let phase: Phase;
    if (passProgress < 0.15) phase = 'rising';
    else if (passProgress < 0.4) phase = 'approaching';
    else if (passProgress < 0.6) phase = 'zenith';
    else if (passProgress < 0.85) phase = 'receding';
    else phase = 'setting';

    return { slantRange, dopplerShiftHz, latencyMs, elevation, satX, satY, phase };
  }, [passProgress]);

  /* ── Smoothed display values ── */
  const smoothDoppler = useSmoothValue(physics.dopplerShiftHz / 1000);
  const smoothLatency = useSmoothValue(physics.latencyMs);
  const smoothSlant = useSmoothValue(physics.slantRange);
  const smoothElevation = useSmoothValue(physics.elevation);

  /* ── Narrative ── */
  const narrative = useMemo(() => {
    const map: Record<Phase, { it: string; en: string; tone: string }> = {
      rising: {
        it: 'Sorgenza · Acquisizione link all\'orizzonte',
        en: 'Rising · Link acquisition at horizon',
        tone: 'text-blue-300',
      },
      approaching: {
        it: 'Avvicinamento · Doppler positivo, latenza in calo',
        en: 'Approaching · Positive Doppler, decreasing latency',
        tone: 'text-emerald-300',
      },
      zenith: {
        it: 'Zenith · Segnale massimo, shift Doppler nullo',
        en: 'Zenith · Maximum signal, zero Doppler shift',
        tone: 'text-white',
      },
      receding: {
        it: 'Allontanamento · Doppler negativo, latenza crescente',
        en: 'Receding · Negative Doppler, increasing latency',
        tone: 'text-amber-300',
      },
      setting: {
        it: 'Tramonto · Perdita link per curvatura terrestre',
        en: 'Setting · Link loss due to earth curvature',
        tone: 'text-orange-300',
      },
    };
    return map[physics.phase];
  }, [physics.phase]);

  /* ── Handlers ── */
  const handleReset = useCallback(() => {
    setPassProgress(0);
    setIsPlaying(false);
    setPackets([]);
    setCollisions([]);
  }, []);

  /* ── Pass duration display ── */
  const passMin = Math.floor(passProgress * 15);
  const passSec = Math.floor((passProgress * 15 * 60) % 60);

  return (
    <div className="space-y-8">
      {/* ─────────────  SCENE  ───────────── */}
      <div className="relative bg-slate-900 rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-blue-900/30" />
        <div className="absolute inset-0 pointer-events-none">
          {STATIC_STARS.map((s) => (
            <motion.div
              key={s.id}
              className="absolute bg-white rounded-full"
              style={{
                top: `${s.top}%`,
                left: `${s.left}%`,
                width: `${s.size * 2}px`,
                height: `${s.size * 2}px`,
              }}
              animate={{ opacity: [0.15, 0.85, 0.15] }}
              transition={{
                duration: s.duration,
                repeat: Infinity,
                delay: s.delay,
              }}
            />
          ))}
        </div>

        {/* Header */}
        <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 px-8 py-6 border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 rounded-2xl border border-blue-400/30">
              <Satellite className="w-7 h-7 text-blue-400" />
            </div>
            <div className="flex items-center gap-6">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-black text-white tracking-tight uppercase leading-none">
                  {t.vdeSatSimulator}
                </h3>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[8px] font-black text-emerald-400/80 uppercase tracking-[0.25em]">
                    ITU-R M.2092 · LEO {600} km
                  </span>
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="hidden lg:block h-8 w-px bg-white/10 mx-2" />

              {/* Orbital Narrative (Relocated to Header) */}
              <div className="hidden sm:flex flex-col min-w-[240px]">
                <span className="text-[7px] font-black text-blue-400 uppercase tracking-[0.3em] mb-1">
                  Orbital Narrative
                </span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={physics.phase}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className={`text-[11px] font-black uppercase tracking-tight ${narrative.tone}`}
                  >
                    {narrative[lang]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 backdrop-blur">
              {SPEED_OPTIONS.map((s) => (
                <button
                  key={s}
                  aria-label={`Set speed to ${s}x`}
                  onClick={() => setSpeed(s)}
                  className={`px-3 py-1.5 rounded-lg text-[9px] font-black transition-all ${
                    speed === s
                      ? 'bg-white text-slate-900 shadow-lg'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
            <button
              aria-label={isPlaying ? 'Pause' : 'Play'}
              onClick={() => setIsPlaying(!isPlaying)}
              className={`p-3 rounded-full shadow-xl transition-all ${
                isPlaying
                  ? 'bg-amber-500 text-white shadow-amber-500/30'
                  : 'bg-emerald-500 text-white shadow-emerald-500/30'
              }`}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </button>
            <button
              aria-label="Reset"
              onClick={handleReset}
              className="p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all border border-white/10"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stage area */}
        <div className="relative">
          {/* SVG canvas */}
          <div className="relative h-[360px] sm:h-[400px] w-full">
            <svg
              viewBox="0 0 1000 300"
              preserveAspectRatio="xMidYMid slice"
              className="absolute inset-0 w-full h-full"
            >
              <defs>
                <linearGradient id="beam-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
                </linearGradient>
                <radialGradient id="ship-glow">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
                <filter id="sat-glow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Earth atmosphere glow */}
              <motion.path
                d="M 0 280 Q 500 310 1000 280"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="10"
                opacity="0.1"
                animate={{ opacity: [0.08, 0.18, 0.08] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              <path
                d="M 0 280 Q 500 300 1000 280"
                fill="rgba(15, 23, 42, 0.8)"
                stroke="rgba(59,130,246,0.4)"
                strokeWidth="3"
              />

              {/* Ship */}
              <g transform="translate(500, 260)">
                <circle cx="0" cy="18" r="55" fill="url(#ship-glow)" opacity="0.2" />
                <motion.g
                  animate={{ y: [0, -1.5, 0], rotate: [-0.5, 0.5, -0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <path d="M -28 0 L 28 0 L 18 14 L -18 14 Z" fill="#3b82f6" />
                  <rect x="-7" y="-11" width="14" height="11" fill="#fff" />
                </motion.g>
              </g>

              {/* Orbit path */}
              <path
                d="M 50 120 Q 500 20 950 120"
                fill="none"
                stroke="white"
                strokeWidth="1"
                strokeDasharray="3,8"
                opacity="0.06"
              />

              {/* Trail */}
              <motion.path
                d={`M 50 120 Q ${(50 + physics.satX) / 2} 30 ${physics.satX} ${physics.satY}`}
                fill="none"
                stroke="#60a5fa"
                strokeWidth="2"
                strokeDasharray="2,4"
                opacity="0.25"
              />

              {/* Footprint */}
              <motion.ellipse
                cx={physics.satX}
                cy="282"
                rx="55"
                ry="4"
                fill="none"
                stroke="#60a5fa"
                strokeWidth="1.5"
                animate={{ rx: [50, 70, 50], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />

              {/* Beam cone */}
              <path
                d={`M ${physics.satX} ${physics.satY} L ${physics.satX - 90} 280 L ${physics.satX + 90} 280 Z`}
                fill="url(#beam-grad)"
                opacity="0.12"
              />

              {/* Range dynamic line */}
              <line
                x1={physics.satX}
                y1={physics.satY}
                x2="500"
                y2="260"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1"
                strokeDasharray="3,4"
              />

              {/* Satellite body */}
              <motion.g
                transform={`translate(${physics.satX}, ${physics.satY}) rotate(${(passProgress - 0.5) * 30})`}
              >
                <rect
                  x="-18"
                  y="-18"
                  width="36"
                  height="36"
                  rx="9"
                  fill="#1e293b"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  filter="url(#sat-glow)"
                />
                {/* Solar panels */}
                <rect x="-30" y="-6" width="10" height="12" fill="#3b82f6" opacity="0.5" />
                <rect x="20" y="-6" width="10" height="12" fill="#3b82f6" opacity="0.5" />
                {/* Center indicator */}
                <circle r="3" fill="#60a5fa" />

                {/* Doppler waves with deformation */}
                {isPlaying && (
                  <>
                    <motion.circle
                      r="22"
                      fill="none"
                      stroke="#60a5fa"
                      strokeWidth="1"
                      style={{
                        scaleX: 1 + Math.abs(physics.dopplerShiftHz / 8000),
                        scaleY: 1 - Math.abs(physics.dopplerShiftHz / 16000),
                      }}
                      animate={{ opacity: [0.5, 0], scale: [0.8, 1.6] }}
                      transition={{ duration: 1.4, repeat: Infinity }}
                    />
                    <motion.circle
                      r="22"
                      fill="none"
                      stroke="#60a5fa"
                      strokeWidth="1"
                      style={{
                        scaleX: 1 + Math.abs(physics.dopplerShiftHz / 8000),
                        scaleY: 1 - Math.abs(physics.dopplerShiftHz / 16000),
                      }}
                      animate={{ opacity: [0.5, 0], scale: [0.8, 1.6] }}
                      transition={{
                        duration: 1.4,
                        repeat: Infinity,
                        delay: 0.7,
                      }}
                    />
                  </>
                )}
              </motion.g>

              {/* Packets */}
              <AnimatePresence>
                {packets.map((p) => {
                  const startX = p.direction === 'uplink' ? 500 : physics.satX;
                  const startY = p.direction === 'uplink' ? 260 : physics.satY;
                  const endX = p.direction === 'uplink' ? physics.satX : 500;
                  const endY = p.direction === 'uplink' ? physics.satY : 260;
                  const cx = startX + (endX - startX) * p.progress;
                  const cy = startY + (endY - startY) * p.progress;
                  const color = p.direction === 'uplink' ? '#fbbf24' : '#60a5fa';
                  const opacity =
                    p.progress < 0.1
                      ? p.progress * 10
                      : p.progress > 0.9
                      ? (1 - p.progress) * 10
                      : 1;

                  return (
                    <g key={p.id}>
                      <circle
                        cx={cx}
                        cy={cy}
                        r="4"
                        fill={color}
                        opacity={opacity}
                        filter="url(#sat-glow)"
                      />
                      <circle
                        cx={cx}
                        cy={cy}
                        r="8"
                        fill="none"
                        stroke={color}
                        strokeWidth="1"
                        opacity={opacity * 0.4}
                      />
                    </g>
                  );
                })}
              </AnimatePresence>

              {/* Collisions */}
              <AnimatePresence>
                {collisions.map((c) => (
                  <motion.g
                    key={c.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 2 }}
                    exit={{ opacity: 0, scale: 4 }}
                    transform={`translate(${c.x}, 280)`}
                    transition={{ duration: 0.8 }}
                  >
                    <circle
                      r="12"
                      fill="none"
                      stroke={c.recovered ? '#10b981' : '#ef4444'}
                      strokeWidth="2"
                    />
                    {c.recovered && (
                      <motion.path
                        d="M -4 0 L -1 3 L 4 -3"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                      />
                    )}
                  </motion.g>
                ))}
              </AnimatePresence>
            </svg>

            {/* Legend top-right (overlay, no overlap) */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 items-end pointer-events-none z-10">
              <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="text-[8px] font-black text-white/80 uppercase tracking-widest">
                  Uplink
                </span>
              </div>
              <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                <span className="text-[8px] font-black text-white/80 uppercase tracking-widest">
                  Downlink
                </span>
              </div>
              <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="text-[8px] font-black text-white/80 uppercase tracking-widest">
                  E-SSA Recovery
                </span>
              </div>
            </div>

            {/* Live alerts */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
              <AnimatePresence>
                {collisions.slice(-2).map((c) => (
                  <motion.div
                    key={c.id}
                    role="status"
                    aria-live="polite"
                    initial={{ opacity: 0, x: -30, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.85 }}
                    className={`bg-slate-950/80 backdrop-blur-xl border px-3 py-2 rounded-xl flex items-center gap-3 shadow-2xl ${
                      c.recovered
                        ? 'border-emerald-500/40'
                        : 'border-red-500/40'
                    }`}
                  >
                    <div
                      className={`p-1.5 rounded-lg ${
                        c.recovered
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex flex-col">
                      <span
                        className={`text-[9px] font-black uppercase tracking-widest ${
                          c.recovered ? 'text-emerald-300' : 'text-red-300'
                        }`}
                      >
                        {c.recovered ? 'Link Restored' : 'Packet Lost'}
                      </span>
                      <span className="text-[7px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                        {c.recovered ? 'E-SSA SF=16' : 'Interference'}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>



            {/* Pass duration mini (Bottom Right) */}
            <div className="absolute bottom-6 right-6 z-10 bg-slate-950/60 backdrop-blur-xl border border-white/10 px-5 py-3 rounded-2xl flex items-center gap-4 shadow-2xl">
              <Clock className="w-4 h-4 text-blue-400" />
              <div className="flex flex-col">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                  {t.passDuration}
                </span>
                <span className="text-xs font-black text-white tabular-nums tracking-wider">
                  {String(passMin).padStart(2, '0')}:
                  {String(passSec).padStart(2, '0')} / 15:00
                </span>
              </div>
            </div>
          </div>

          {/* Telemetry strip (now in flow, no overlap) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 px-6 pb-6 pt-2">
            <TelemetryItem
              label={t.dopplerShift}
              value={`${smoothDoppler > 0 ? '+' : ''}${smoothDoppler.toFixed(2)}`}
              unit="kHz"
              icon={Waves}
              tooltip={t.dopplerTooltip}
              colorClass={smoothDoppler > 0 ? 'text-blue-400' : 'text-orange-400'}
            />
            <TelemetryItem
              label={t.latencyTitle}
              value={smoothLatency.toFixed(2)}
              unit="ms"
              icon={Clock}
              tooltip={t.latencyTooltip}
            />
            <TelemetryItem
              label={t.slantRange}
              value={Math.round(smoothSlant)}
              unit="km"
              icon={ArrowUp}
              tooltip={t.slantTooltip}
            />
            <TelemetryItem
              label={t.elevationAngle}
              value={Math.round(smoothElevation)}
              unit="°"
              icon={ArrowDown}
              tooltip={t.elevationTooltip}
            />
            <TelemetryItem
              label={t.accessMode}
              value="E-SSA"
              unit="RAC"
              icon={ShieldCheck}
              tooltip={t.modeTooltip}
              colorClass="text-emerald-400"
            />
          </div>
        </div>
      </div>

      {/* ─────────────  EXPLANATORY GRID  ───────────── */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Tabs */}
        <div className="col-span-full flex bg-slate-100 p-1.5 rounded-3xl border border-slate-200 gap-1">
          {TAB_OPTIONS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab.key
                  ? 'bg-white text-slate-900 shadow-lg'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab[lang]}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {activeTab === 'doppler' && (
              <motion.div
                key="doppler-card"
                initial={{ opacity: 0, scale: 0.97, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.03, filter: 'blur(8px)' }}
                transition={{ duration: 0.35 }}
                className="bg-white p-8 lg:p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6"
              >
                <div className="flex items-start gap-5">
                  <div className="p-3.5 bg-blue-50 text-blue-600 rounded-2xl shrink-0">
                    <Activity className="w-7 h-7" />
                  </div>
                  <div className="space-y-3 min-w-0">
                    <h4 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight uppercase leading-tight">
                      {t.vdeSatExpTitle}
                    </h4>
                    <p className="text-[13px] text-slate-500 leading-relaxed font-medium">
                      {lang === 'it'
                        ? "A differenza del VDE-TER, il segmento satellitare si affida a costellazioni LEO. Viaggiando a velocità orbitali di circa 7.5 km/s (come un treno proiettile ultra-rapido), si verifica un fenomeno fisico chiamato Shift Doppler, simile alla variazione di tono che sentiamo quando un'ambulanza ci sfreccia accanto."
                        : "Unlike VDE-TER, the satellite segment relies on LEO constellations. Travelling at orbital speeds of about 7.5 km/s (like an ultra-fast bullet train), a physical phenomenon called Doppler Shift occurs, similar to the pitch change we hear when an ambulance speeds past us."}
                    </p>
                  </div>
                </div>

                <div className="p-5 bg-slate-900 text-white rounded-2xl border border-white/10 italic text-[12px] leading-relaxed">
                  "
                  {lang === 'it'
                    ? "In avvicinamento, le onde radio vengono 'compresse' aumentando la frequenza. Superato lo zenith, iniziano a 'distendersi', abbassando la frequenza percepita."
                    : "When approaching, radio waves are 'compressed', increasing frequency. Once past the zenith, they begin to 'stretch', lowering the perceived frequency."}
                  "
                </div>

                <ComparisonTable
                  lang={lang}
                  data={[
                    {
                      label: { it: 'Shift Massimo', en: 'Max Shift' },
                      value: {
                        it: '± 4 kHz @ 162 MHz',
                        en: '± 4 kHz @ 162 MHz',
                      },
                    },
                    {
                      label: {
                        it: 'Velocità Relativa',
                        en: 'Relative Velocity',
                      },
                      value: {
                        it: '7.5 km/s · 27.000 km/h',
                        en: '7.5 km/s · 27,000 km/h',
                      },
                    },
                    {
                      label: { it: 'Impatto Modem', en: 'Modem Impact' },
                      value: {
                        it: 'Tracking AFC necessario',
                        en: 'AFC Tracking required',
                      },
                    },
                  ]}
                />
              </motion.div>
            )}

            {activeTab === 'latency' && (
              <motion.div
                key="latency-card"
                initial={{ opacity: 0, scale: 0.97, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.03, filter: 'blur(8px)' }}
                transition={{ duration: 0.35 }}
                className="bg-white p-8 lg:p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6"
              >
                <div className="flex items-start gap-5">
                  <div className="p-3.5 bg-amber-50 text-amber-600 rounded-2xl shrink-0">
                    <Clock className="w-7 h-7" />
                  </div>
                  <div className="space-y-3 min-w-0">
                    <h4 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight uppercase leading-tight">
                      {lang === 'it'
                        ? 'Latenza Spazio-Terra: Sfida TDMA'
                        : 'Space-Ground Latency: TDMA Challenge'}
                    </h4>
                    <p className="text-[13px] text-slate-500 leading-relaxed font-medium">
                      {lang === 'it'
                        ? "La latenza in VDE-SAT è dovuta al tempo di volo del segnale. Immagina una telefonata transatlantica anni '90 con il classico 'eco': è lo stesso principio. Poiché il satellite si muove, la distanza (Slant Range) cambia ogni secondo, rendendo la sincronizzazione TDMA tradizionale estremamente complessa."
                        : "Latency in VDE-SAT is caused by signal flight time. Think of a 90s transatlantic phone call with the classic 'echo': it's the same principle. Since the satellite moves, distance (Slant Range) changes every second, making traditional TDMA synchronization extremely complex."}
                    </p>
                  </div>
                </div>

                <p className="text-[12px] leading-relaxed text-slate-600 font-medium border-l-4 border-amber-300 pl-5 italic">
                  "
                  {lang === 'it'
                    ? 'Secondo ITU-R M.2092, la variazione di latenza tra zenith (600 km) e orizzonte (3.000 km) richiede finestre temporali di guardia (Guard Times) molto ampie.'
                    : 'According to ITU-R M.2092, latency variation between zenith (600 km) and horizon (3,000 km) requires very wide guard time windows.'}
                  "
                </p>

                <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                  <div className="flex justify-between items-center mb-5">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                      Slant Range vs Latency
                    </span>
                    <span className="text-xs font-black text-slate-900 tabular-nums">
                      {smoothLatency.toFixed(2)} ms
                    </span>
                  </div>
                  <div className="h-20 flex items-end gap-1">
                    {Array.from({ length: 40 }).map((_, i) => {
                      const isActive = i / 40 < passProgress;
                      const h = Math.max(
                        10,
                        Math.sin(i * 0.1 + passProgress * 5) * 50 + 50
                      );
                      return (
                        <div
                          key={i}
                          className={`flex-1 rounded-t-sm transition-all duration-300 ${
                            isActive ? 'bg-amber-500' : 'bg-slate-200'
                          }`}
                          style={{
                            height: `${h}%`,
                            opacity: isActive ? 1 : 0.4,
                          }}
                        />
                      );
                    })}
                  </div>
                </div>

                <ComparisonTable
                  lang={lang}
                  data={[
                    {
                      label: { it: 'Latenza @ Zenith', en: 'Latency @ Zenith' },
                      value: { it: '~ 2 ms (600 km)', en: '~ 2 ms (600 km)' },
                    },
                    {
                      label: {
                        it: 'Latenza @ Orizzonte',
                        en: 'Latency @ Horizon',
                      },
                      value: {
                        it: '~ 10 ms (3.000 km)',
                        en: '~ 10 ms (3,000 km)',
                      },
                    },
                    {
                      label: { it: 'Soluzione', en: 'Solution' },
                      value: {
                        it: 'Random Access (E-SSA)',
                        en: 'Random Access (E-SSA)',
                      },
                    },
                  ]}
                />
              </motion.div>
            )}

            {activeTab === 'essa' && (
              <motion.div
                key="essa-card"
                initial={{ opacity: 0, scale: 0.97, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.03, filter: 'blur(8px)' }}
                transition={{ duration: 0.35 }}
                className="bg-white p-8 lg:p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6"
              >
                <div className="flex items-start gap-5">
                  <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-2xl shrink-0">
                    <Zap className="w-7 h-7" />
                  </div>
                  <div className="space-y-3 min-w-0">
                    <h4 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight uppercase leading-tight">
                      {t.vdeSatEssaTitle}
                    </h4>
                    <p className="text-[13px] text-slate-500 leading-relaxed font-medium">
                      {lang === 'it'
                        ? "L'Enhanced Spread Spectrum ALOHA (E-SSA) è la 'magia' che permette al VDE-SAT di gestire migliaia di navi. Invece di aspettare uno slot libero (che non ci sarebbe mai), le navi trasmettono 'spalmando' il segnale con un fattore di espansione (SF=16). È come se 16 persone parlassero contemporaneamente con frequenze vocali diverse: un computer potente può isolare ogni singola voce."
                        : "Enhanced Spread Spectrum ALOHA (E-SSA) is the 'magic' that allows VDE-SAT to handle thousands of ships. Instead of waiting for a free slot (which would never be available), ships transmit by 'spreading' the signal with a spreading factor (SF=16). It's as if 16 people spoke simultaneously with different vocal frequencies: a powerful computer can isolate each voice."}
                    </p>
                  </div>
                </div>

                <div className="bg-emerald-900 p-6 lg:p-7 rounded-[2rem] text-white relative overflow-hidden">
                  <div className="absolute -right-8 -top-8 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl" />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 bg-white/10 rounded-xl">
                        <Layers className="w-5 h-5" />
                      </div>
                      <h5 className="font-black uppercase text-[11px] tracking-widest">
                        Despreading & Interference Cancellation
                      </h5>
                    </div>
                    <p className="text-[11px] leading-relaxed text-emerald-100/90 mb-5 font-medium">
                      {lang === 'it'
                        ? "Il ricevitore satellitare utilizza algoritmi di cancellazione iterativa dell'interferenza. Una volta decodificato un messaggio forte, lo 'sottrae' dal rumore totale per far emergere i messaggi più deboli sottostanti."
                        : "The satellite receiver uses iterative interference cancellation algorithms. Once a strong message is decoded, it is 'subtracted' from the total noise to reveal weaker underlying messages."}
                    </p>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                        className="w-1/3 h-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent rounded-full"
                      />
                    </div>
                  </div>
                </div>
                <ComparisonTable
                  lang={lang}
                  data={[
                    {
                      label: {
                        it: 'Spreading Factor',
                        en: 'Spreading Factor',
                      },
                      value: {
                        it: 'SF = 16 (chip rate)',
                        en: 'SF = 16 (chip rate)',
                      },
                    },
                    {
                      label: { it: 'Tasso recupero', en: 'Recovery Rate' },
                      value: {
                        it: '~ 70% in scenari saturi',
                        en: '~ 70% in saturated scenarios',
                      },
                    },
                    {
                      label: { it: 'Protocollo MAC', en: 'MAC Protocol' },
                      value: {
                        it: 'Random Access Channel',
                        en: 'Random Access Channel',
                      },
                    },
                  ]}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Side column */}
        <div className="space-y-6">
          {/* ITU-R Metrics */}
          <div className="bg-slate-900 rounded-[2rem] p-7 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Globe className="w-32 h-32" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-5 pb-3 border-b border-white/10">
                <Radio className="w-3.5 h-3.5 text-blue-400" />
                <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest">
                  ITU-R Physical Metrics
                </h4>
              </div>
              <ul className="space-y-3.5">
                {[
                  {
                    label: 'Modulation',
                    val: 'π/4-QPSK · E-SSA',
                    color: 'text-blue-400',
                  },
                  {
                    label: 'SF Factor',
                    val: '16 (Spreading)',
                    color: 'text-emerald-400',
                  },
                  {
                    label: 'FEC Rate',
                    val: '1/2 LDPC Code',
                    color: 'text-amber-400',
                  },
                  {
                    label: 'Uplink Power',
                    val: '12.5 W (Nominal)',
                    color: 'text-white',
                  },
                  {
                    label: 'Frequency',
                    val: '161.7 – 161.9 MHz',
                    color: 'text-white',
                  },
                ].map((stat) => (
                  <li
                    key={stat.label}
                    className="flex justify-between items-center text-[10px] font-bold gap-3"
                  >
                    <span className="text-slate-500 uppercase tracking-widest truncate">
                      {stat.label}
                    </span>
                    <span className={`${stat.color} truncate`}>{stat.val}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Didactic card */}
          <div className="bg-white rounded-[2rem] p-7 border border-slate-200 shadow-sm group hover:border-blue-500/40 transition-colors">
            <div className="flex items-center gap-2 mb-3 text-blue-600">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                {lang === 'it' ? 'Didattica Attiva' : 'Active Learning'}
              </span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-500 font-medium">
              {lang === 'it'
                ? "Hai notato come lo Slant Range aumenti drasticamente all'orizzonte? Questo causa il fenomeno del path-loss, richiedendo che la nave trasmetta con la massima potenza permessa dal protocollo VDES."
                : 'Did you notice how Slant Range increases drastically at the horizon? This causes path-loss, requiring the ship to transmit with the maximum power allowed by the VDES protocol.'}
            </p>
            <button className="w-full mt-5 py-3.5 bg-slate-100 rounded-2xl text-[10px] font-black text-slate-900 uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-sm">
              {lang === 'it' ? 'Scarica manuale tecnico' : 'Download technical manual'}
            </button>
          </div>

          {/* Key Facts */}
          <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-[2rem] p-7 border border-blue-100/50">
            <div className="flex items-center gap-2 mb-4 text-blue-700">
              <Info className="w-3.5 h-3.5" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                {lang === 'it' ? 'Fatti chiave' : 'Key Facts'}
              </span>
            </div>
            <ul className="space-y-3">
              {[
                {
                  k: lang === 'it' ? 'Quota orbita' : 'Orbit altitude',
                  v: '~ 600 km',
                },
                {
                  k: lang === 'it' ? 'Durata pass' : 'Pass duration',
                  v: '10 – 15 min',
                },
                {
                  k: lang === 'it' ? 'Navi/footprint' : 'Ships per footprint',
                  v: '≤ 22.000',
                },
              ].map((f) => (
                <li
                  key={f.k}
                  className="flex justify-between items-center text-[10px] font-black gap-3"
                >
                  <span className="text-slate-600 uppercase tracking-widest truncate">
                    {f.k}
                  </span>
                  <span className="text-slate-900 tabular-nums shrink-0">
                    {f.v}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   PUBLIC VIEW WRAPPER
   ───────────────────────────────────────────────────────────── */

export const VdeSatView = ({ lang }: { lang: Language }) => {
  return (
    <div className="space-y-10 animate-in fade-in duration-1000 slide-in-from-bottom-8">
      {/* Hero */}
      <section className="bg-white p-10 lg:p-12 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-[0.04] rotate-12 pointer-events-none">
          <Satellite className="w-64 h-64" />
        </div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <div className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-widest">
              {lang === 'it' ? 'Modulo Avanzato' : 'Advanced Module'}
            </div>
            <div className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Space Segment Evolution
            </span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-[1.1] mb-5 uppercase">
            {lang === 'it'
              ? "Navigazione Globale: Oltre l'Orizzonte con VDE-SAT"
              : 'Global Navigation: Beyond the Horizon with VDE-SAT'}
          </h2>

          <p className="text-base lg:text-lg text-slate-500 font-medium leading-relaxed mb-8 italic">
            {lang === 'it'
              ? "Mentre il VDE-TER copre le coste, il VDE-SAT porta la connettività MMS nel cuore dell'oceano, affrontando sfide fisiche uniche: velocità orbitali di 28.000 km/h e latenze variabili."
              : 'While VDE-TER covers the coasts, VDE-SAT brings MMS connectivity to the heart of the ocean, tackling unique physical challenges: orbital speeds of 28,000 km/h and variable latencies.'}
          </p>

          <div className="flex items-center gap-6 lg:gap-8 py-7 border-t border-slate-100 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                  {lang === 'it' ? 'Copertura' : 'Coverage'}
                </div>
                <div className="text-[11px] font-black text-slate-900 uppercase">
                  {lang === 'it' ? 'Globale · Deep Sea' : 'Global · Deep Sea'}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
                <Activity className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                  {lang === 'it' ? 'Protocollo' : 'Protocol'}
                </div>
                <div className="text-[11px] font-black text-slate-900 uppercase">
                  E-SSA · Slotted ALOHA
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                  {lang === 'it' ? 'Standard' : 'Standard'}
                </div>
                <div className="text-[11px] font-black text-slate-900 uppercase">
                  ITU-R M.2092
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VdeSatSimulator lang={lang} />
    </div>
  );
};