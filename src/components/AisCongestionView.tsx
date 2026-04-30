import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  Activity,
  Pause,
  Play,
  Radio,
  AlertTriangle,
  ShieldCheck,
  MessageSquare,
  ShieldAlert,
  Layers,
  Share2,
  Info,
  Waves,
  Anchor,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

/* ─────────────────────────────────────────────────────────────
   TYPES & CONSTANTS
   ───────────────────────────────────────────────────────────── */

type Scenario = 'malacca' | 'gibraltar' | 'channel';
type ChannelKey = 'ais' | 'asm' | 'vde';
type PacketType = 'pos' | 'asm' | 'vde';

interface Packet {
  id: number;
  x: number;
  y: number;
  type: PacketType;
  target: ChannelKey;
  deviated: boolean;
}

interface Occupancy {
  ais: number;
  asm: number;
  vde: number;
}

const DENSITY_PRESETS = [
  { value: 1000, label: 'Normal' },
  { value: 4000, label: 'Medium' },
  { value: 8000, label: 'Heavy' },
  { value: 10000, label: 'Peak' },
] as const;

const CHANNEL_META: Record<
  ChannelKey,
  { label: string; bg: string; glow: string; dot: string }
> = {
  ais: {
    label: 'AIS 1/2 · Priority 1',
    bg: 'bg-indigo-500',
    glow: 'shadow-indigo-500/30',
    dot: '#6366f1',
  },
  asm: {
    label: 'ASM 1/2 · Data',
    bg: 'bg-amber-500',
    glow: 'shadow-amber-500/30',
    dot: '#f59e0b',
  },
  vde: {
    label: 'VDE-TER · Broadband',
    bg: 'bg-blue-500',
    glow: 'shadow-blue-500/30',
    dot: '#3b82f6',
  },
};

const PACKET_COLORS: Record<PacketType, string> = {
  pos: '#ef4444',
  asm: '#f59e0b',
  vde: '#3b82f6',
};

/* ─────────────────────────────────────────────────────────────
   SUB-COMPONENT · DENSITY SLIDER PANEL
   ───────────────────────────────────────────────────────────── */

const DensityPanel = ({
  value,
  onChange,
  label,
}: {
  value: number;
  onChange: (v: number) => void;
  label: string;
}) => (
  <div className="bg-slate-900/70 backdrop-blur-2xl border border-white/10 p-6 rounded-[2rem] shadow-2xl">
    <div className="flex justify-between items-baseline mb-5">
      <span className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">
        {label}
      </span>
      <motion.span
        key={value}
        initial={{ scale: 1.15, color: '#a5b4fc' }}
        animate={{ scale: 1, color: '#ffffff' }}
        className="text-2xl font-black tabular-nums"
      >
        {value.toLocaleString()}
      </motion.span>
    </div>

    <div className="relative h-2 bg-white/5 rounded-full mb-6 overflow-hidden">
      <motion.div
        className="absolute h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.6)]"
        animate={{ width: `${(value / 10000) * 100}%` }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      />
      <input
        type="range"
        min={100}
        max={10000}
        step={100}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        aria-label="Ship density"
      />
    </div>

    <div className="grid grid-cols-4 gap-2">
      {DENSITY_PRESETS.map((p) => (
        <button
          key={p.value}
          onClick={() => onChange(p.value)}
          className={`py-2 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all border ${
            value === p.value
              ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300'
              : 'bg-white/5 border-transparent text-white/40 hover:text-white hover:bg-white/10'
          }`}
        >
          {p.label}
        </button>
      ))}
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────────
   SUB-COMPONENT · OCCUPANCY METER
   ───────────────────────────────────────────────────────────── */

const OccupancyMeter = ({
  occupancy,
  label,
}: {
  occupancy: Occupancy;
  label: string;
}) => {
  const getStatusColor = (val: number) =>
    val > 80 ? 'text-red-400' : val > 50 ? 'text-amber-400' : 'text-emerald-400';

  const channels: { key: ChannelKey; val: number }[] = [
    { key: 'ais', val: occupancy.ais },
    { key: 'asm', val: occupancy.asm },
    { key: 'vde', val: occupancy.vde },
  ];

  return (
    <div className="bg-slate-900/70 backdrop-blur-2xl border border-white/10 p-6 rounded-[2rem] shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Radio className="w-4 h-4 text-indigo-400" />
        <span className="text-[10px] font-black text-white uppercase tracking-widest">
          {label}
        </span>
      </div>

      <div className="space-y-5">
        {channels.map((ch) => {
          const meta = CHANNEL_META[ch.key];
          return (
            <div key={ch.key}>
              <div className="flex justify-between text-[8px] font-black uppercase mb-2">
                <span className="text-slate-400 tracking-widest">
                  {meta.label}
                </span>
                <span className={`tabular-nums ${getStatusColor(ch.val)}`}>
                  {Math.round(ch.val)}%
                </span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${meta.bg} ${meta.glow} shadow-lg rounded-full`}
                  animate={{ width: `${ch.val}%` }}
                  transition={{ type: 'spring', stiffness: 80, damping: 18 }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   SUB-COMPONENT · ROUTER TOGGLE
   ───────────────────────────────────────────────────────────── */

const RouterToggle = ({
  active,
  onToggle,
  label,
  activeLabel,
}: {
  active: boolean;
  onToggle: () => void;
  label: string;
  activeLabel: string;
}) => (
  <div
    className={`bg-slate-900/70 backdrop-blur-2xl border p-5 rounded-[2rem] shadow-2xl transition-all duration-500 ${
      active ? 'border-indigo-400/50 bg-indigo-500/10' : 'border-white/10'
    }`}
  >
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={`p-2.5 rounded-xl border shrink-0 transition-all duration-500 ${
            active
              ? 'bg-indigo-500 text-white border-indigo-400 shadow-lg shadow-indigo-500/40'
              : 'bg-white/5 border-white/10 text-white/30'
          }`}
        >
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="flex flex-col min-w-0">
          <span
            className={`text-[10px] font-black uppercase tracking-widest truncate ${
              active ? 'text-indigo-300' : 'text-white/50'
            }`}
          >
            {label}
          </span>
          <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-0.5 truncate">
            {active ? activeLabel : 'Manual Override'}
          </span>
        </div>
      </div>
      <button
        onClick={onToggle}
        aria-label="Toggle MMS Edge Router"
        className={`w-12 h-6 rounded-full relative shrink-0 transition-all duration-500 ${
          active ? 'bg-indigo-500' : 'bg-white/10'
        }`}
      >
        <motion.div
          className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-xl"
          animate={{ x: active ? 24 : 0 }}
          transition={{ type: 'spring', stiffness: 350, damping: 22 }}
        />
      </button>
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────────── */

export const AisCongestionView = ({ lang }: { lang: Language }) => {
  const t = TRANSLATIONS[lang];
  const [shipDensity, setShipDensity] = useState(2000);
  const [scenario, setScenario] = useState<Scenario>('malacca');
  const [isPlaying, setIsPlaying] = useState(true);
  const [mmsActive, setMmsActive] = useState(false);
  const [occupancy, setOccupancy] = useState<Occupancy>({
    ais: 0,
    asm: 0,
    vde: 0,
  });
  const [packets, setPackets] = useState<Packet[]>([]);

  const animationRef = useRef<number | null>(null);
  const lastTickRef = useRef<number>(0);

  /* ── Simulation loop (requestAnimationFrame for smoothness) ── */
  useEffect(() => {
    if (!isPlaying) return;

    const tick = (now: number) => {
      if (now - lastTickRef.current >= 100) {
        lastTickRef.current = now;

        // Compute target loads
        const aisTarget = Math.min(
          100,
          (shipDensity / 100) * (mmsActive ? 0.35 : 1.0)
        );
        const asmTarget = Math.min(
          100,
          mmsActive ? shipDensity / 200 : 5 + shipDensity / 1000
        );
        const vdeTarget = Math.min(
          100,
          mmsActive ? shipDensity / 150 : 2 + shipDensity / 2000
        );

        // Smooth lerp
        setOccupancy((prev) => ({
          ais: prev.ais + (aisTarget - prev.ais) * 0.15,
          asm: prev.asm + (asmTarget - prev.asm) * 0.15,
          vde: prev.vde + (vdeTarget - prev.vde) * 0.15,
        }));

        // Spawn packets
        if (Math.random() > 0.55) {
          const id = now + Math.random();
          const startX = 60 + Math.random() * 880;
          const startY = 360 + Math.random() * 120;
          const r = Math.random();
          const pType: PacketType = r > 0.8 ? 'vde' : r > 0.6 ? 'asm' : 'pos';
          let target: ChannelKey = 'ais';
          let deviated = false;
          if (mmsActive && pType !== 'pos') {
            target = pType === 'asm' ? 'asm' : 'vde';
            deviated = true;
          }
          setPackets((prev) => [
            ...prev.slice(-25),
            { id, x: startX, y: startY, type: pType, target, deviated },
          ]);
        }
      }
      animationRef.current = requestAnimationFrame(tick);
    };

    animationRef.current = requestAnimationFrame(tick);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, shipDensity, mmsActive]);

  /* ── Auto-cleanup old packets ── */
  useEffect(() => {
    const interval = setInterval(() => {
      const cutoff = performance.now() - 2000;
      setPackets((prev) => prev.filter((p) => p.id > cutoff));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  /* ── Auto-suggest router when critical ── */
  const isCritical = occupancy.ais > 80;
  const isWarning = occupancy.ais > 50 && occupancy.ais <= 80;

  /* ── Narrative ── */
  const narrative = useMemo(() => {
    if (isCritical)
      return lang === 'it'
        ? 'CRITICO · IALA Warning: rischio accecamento radar. Attivare il Router.'
        : 'CRITICAL · IALA Warning: radar blinding risk. Activate the Router.';
    if (isWarning)
      return lang === 'it'
        ? 'ATTENZIONE · Carico AIS elevato. Spostare i dati non critici.'
        : 'WARNING · High AIS load. Offload non-critical data.';
    if (mmsActive)
      return lang === 'it'
        ? 'PROTETTO · MMS Edge Router attivo. Canali AIS decongestionati.'
        : 'PROTECTED · MMS Edge Router active. AIS channels decongested.';
    return lang === 'it'
      ? 'NORMALE · Traffico fluido. Tutti i servizi operativi.'
      : 'NORMAL · Smooth traffic. All services operational.';
  }, [isCritical, isWarning, mmsActive, lang]);

  const narrativeTone = isCritical
    ? 'border-red-500/40 text-red-100'
    : isWarning
    ? 'border-amber-500/40 text-amber-100'
    : mmsActive
    ? 'border-indigo-400/40 text-indigo-100'
    : 'border-emerald-500/40 text-emerald-100';

  /* ── Pre-computed ship sprites (stable seed) ── */
  const shipSprites = useMemo(() => {
    return Array.from({ length: 150 }).map((_, i) => {
      const seed = i * 42.8;
      return {
        id: i,
        xBase: (seed % 100) * 10,
        yBase: 380 + (seed % 28) * 6,
        duration: 8 + (seed % 5),
        delay: seed % 10,
      };
    });
  }, []);

  const visibleShipsCount = Math.floor(shipDensity / 60);

  /* ── Handlers ── */
  const handleScenarioChange = useCallback(
    (s: Scenario) => setScenario(s),
    []
  );

  const scenarioLabel = useMemo(() => {
    return scenario === 'malacca'
      ? t.scenarioMalacca
      : scenario === 'gibraltar'
      ? t.scenarioGibraltar
      : t.scenarioEnglishChannel;
  }, [scenario, t]);

  return (
    <div className="space-y-10 pb-20">
      {/* ─────────────  HERO + SIMULATOR  ───────────── */}
      <section className="relative bg-slate-900 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
        {/* Header bar */}
        <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 px-8 py-6 border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-500/20 rounded-2xl border border-indigo-400/30">
              <Activity className="w-7 h-7 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white tracking-tight uppercase leading-none">
                {t.aisCongestionSimulator}
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[8px] font-black text-emerald-400/80 uppercase tracking-[0.25em]">
                  Real-time Congestion Matrix · {scenarioLabel}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur">
              {(['malacca', 'gibraltar', 'channel'] as Scenario[]).map((s) => (
                <button
                  key={s}
                  onClick={() => handleScenarioChange(s)}
                  className={`px-3.5 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all ${
                    scenario === s
                      ? 'bg-indigo-500 text-white shadow-lg'
                      : 'text-white/40 hover:text-white'
                  }`}
                >
                  {s === 'malacca'
                    ? t.scenarioMalacca
                    : s === 'gibraltar'
                    ? t.scenarioGibraltar
                    : t.scenarioEnglishChannel}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              className={`p-3 rounded-full shadow-2xl transition-all ${
                isPlaying
                  ? 'bg-amber-500/90 text-white shadow-amber-500/30'
                  : 'bg-emerald-500/90 text-white shadow-emerald-500/30'
              }`}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </button>
          </div>
        </div>

        {/* Body grid: HUD left | Map center | HUD right */}
        <div className="grid grid-cols-12 gap-6 p-6">
          {/* LEFT HUD */}
          <aside className="col-span-12 xl:col-span-3 space-y-4 z-20">
            <DensityPanel
              value={shipDensity}
              onChange={setShipDensity}
              label={t.shipDensity}
            />

            <RouterToggle
              active={mmsActive}
              onToggle={() => setMmsActive(!mmsActive)}
              label={t.mmsEdgeRouter}
              activeLabel={t.routingActive}
            />

            {/* Tip card */}
            <div className="bg-white/5 border border-white/10 p-5 rounded-[2rem]">
              <div className="flex items-center gap-2 mb-2 text-indigo-400">
                <Info className="w-3.5 h-3.5" />
                <span className="text-[8px] font-black uppercase tracking-widest">
                  {lang === 'it' ? 'Suggerimento' : 'Hint'}
                </span>
              </div>
              <p className="text-[10px] text-white/60 leading-relaxed font-medium">
                {lang === 'it'
                  ? "Aumenta la densità oltre 8.000 navi e attiva il Router per vedere come VDES protegge l'AIS."
                  : 'Push density above 8,000 ships and toggle the Router to see VDES protecting AIS.'}
              </p>
            </div>
          </aside>

          {/* CENTRAL MAP */}
          <div className="col-span-12 xl:col-span-6 relative h-[480px] bg-[#070b14] rounded-[2.5rem] overflow-hidden border border-white/10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(99,102,241,0.08)_0%,transparent_70%)]" />

            <svg
              viewBox="0 0 1000 480"
              preserveAspectRatio="xMidYMid slice"
              className="absolute inset-0 w-full h-full"
            >
              {/* Coastlines */}
              <g opacity="0.45">
                <path
                  d="M 0 40 Q 300 110 500 70 T 1000 90 L 1000 0 L 0 0 Z"
                  fill="rgba(30,58,138,0.25)"
                  stroke="#1e3a8a"
                  strokeWidth="2"
                />
                <path
                  d="M 0 440 Q 300 350 600 400 T 1000 360 L 1000 480 L 0 480 Z"
                  fill="rgba(30,58,138,0.25)"
                  stroke="#1e3a8a"
                  strokeWidth="2"
                />
              </g>

              {/* Shipping lane */}
              <path
                d="M 0 240 L 1000 240"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="120"
              />

              {/* Channels HUD */}
              <g transform="translate(380, 18)">
                <rect
                  width="240"
                  height="56"
                  rx="18"
                  fill="rgba(15,23,42,0.85)"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1.5"
                />
                <text
                  x="120"
                  y="20"
                  textAnchor="middle"
                  className="text-[9px] font-black fill-white/40 uppercase tracking-[0.3em]"
                >
                  VDES Spectrum
                </text>
                {(['ais', 'asm', 'vde'] as const).map((c, i) => (
                  <g
                    key={c}
                    transform={`translate(${30 + i * 65}, 40)`}
                  >
                    <circle r="3.5" fill={CHANNEL_META[c].dot} />
                    <text
                      x="9"
                      y="3.5"
                      className="text-[8px] font-black fill-white/80 uppercase tracking-widest"
                    >
                      {c.toUpperCase()}
                    </text>
                  </g>
                ))}
              </g>

              {/* Ships */}
              <g>
                {shipSprites.slice(0, visibleShipsCount).map((s) => (
                  <motion.rect
                    key={s.id}
                    width="5"
                    height="2"
                    rx="1"
                    fill={isCritical ? '#ef4444' : '#6366f1'}
                    initial={{ x: s.xBase, y: s.yBase, opacity: 0 }}
                    animate={{
                      x: [s.xBase, s.xBase + 60],
                      opacity: [0, 0.5, 0.5, 0],
                    }}
                    transition={{
                      duration: s.duration,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: s.delay,
                    }}
                  />
                ))}
              </g>

              {/* Router shield line (when active) */}
              {mmsActive && (
                <motion.line
                  x1="0"
                  y1="120"
                  x2="1000"
                  y2="120"
                  stroke="rgba(99,102,241,0.25)"
                  strokeWidth="1"
                  strokeDasharray="4,8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              )}

              {/* Packets */}
              <AnimatePresence>
                {packets.map((p) => {
                  const targetY =
                    p.target === 'ais' ? 50 : p.target === 'asm' ? 30 : 12;
                  const color = PACKET_COLORS[p.type];

                  return (
                    <motion.g key={p.id}>
                      <motion.line
                        x1={p.x}
                        y1={p.y}
                        x2={p.x}
                        y2={p.y}
                        stroke={color}
                        strokeWidth="1.5"
                        strokeDasharray="2,3"
                        opacity="0"
                        animate={{ y2: targetY, opacity: [0, 0.45, 0] }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                      />
                      <motion.circle
                        r="3.5"
                        fill={color}
                        initial={{ cx: p.x, cy: p.y, opacity: 0 }}
                        animate={{
                          cx: p.x,
                          cy: targetY,
                          opacity: [0, 1, 1, 0],
                          scale: [1, 1.2, 0.8],
                        }}
                        transition={{ duration: 1.4, ease: 'circOut' }}
                      />
                      {p.deviated && (
                        <motion.g
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <circle
                            cx={p.x}
                            cy="120"
                            r="14"
                            fill="rgba(99,102,241,0.06)"
                            stroke="rgba(99,102,241,0.3)"
                            strokeWidth="1"
                          />
                          <motion.circle
                            cx={p.x}
                            cy="120"
                            r="3"
                            fill="#6366f1"
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 2.2, 0] }}
                            transition={{ duration: 0.45, delay: 0.4 }}
                          />
                        </motion.g>
                      )}
                    </motion.g>
                  );
                })}
              </AnimatePresence>

              {/* Radar blinding overlay */}
              <defs>
                <radialGradient id="noise-grad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#070b14" stopOpacity="0" />
                </radialGradient>
              </defs>
              <AnimatePresence>
                {isCritical && (
                  <motion.rect
                    width="1000"
                    height="480"
                    fill="url(#noise-grad)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </AnimatePresence>
            </svg>

            {/* Map mini-stats overlay */}
            <div className="absolute top-4 left-4 flex items-center gap-3 bg-slate-900/70 backdrop-blur-xl border border-white/10 px-3 py-2 rounded-2xl">
              <Anchor className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-[9px] font-black text-white tabular-nums">
                {visibleShipsCount}
              </span>
              <span className="text-[7px] font-black text-white/40 uppercase tracking-widest">
                {lang === 'it' ? 'Navi attive' : 'Active ships'}
              </span>
            </div>

            {/* Narrative HUD inside map */}
            <div className="absolute bottom-4 left-4 right-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={narrative}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className={`bg-slate-900/80 backdrop-blur-2xl border ${narrativeTone} px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-4`}
                >
                  <div className="p-2 bg-white/5 rounded-xl shrink-0">
                    <MessageSquare className="w-4 h-4 text-white/80" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-[0.12em] leading-snug">
                    {narrative}
                  </span>
                  <motion.div
                    className="ml-auto w-2 h-2 rounded-full bg-current shrink-0"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT HUD */}
          <aside className="col-span-12 xl:col-span-3 space-y-4 z-20">
            <OccupancyMeter occupancy={occupancy} label={t.slotOccupancy} />

            {/* Inline alarm */}
            <AnimatePresence>
              {(isWarning || isCritical) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`p-4 rounded-2xl border flex items-center gap-3 ${
                    isCritical
                      ? 'bg-red-500/15 border-red-500/40'
                      : 'bg-amber-500/15 border-amber-500/40'
                  }`}
                >
                  <div
                    className={`p-2 rounded-xl shrink-0 ${
                      isCritical
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}
                  >
                    <AlertTriangle
                      className={`w-4 h-4 ${
                        isCritical ? 'animate-pulse' : ''
                      }`}
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span
                      className={`text-[9px] font-black uppercase tracking-widest ${
                        isCritical ? 'text-red-300' : 'text-amber-300'
                      }`}
                    >
                      {isCritical
                        ? t.congestionCritical
                        : t.congestionWarning}
                    </span>
                    {isCritical && (
                      <span className="text-[7px] font-bold text-red-400/70 uppercase mt-1 tracking-widest">
                        Radar Blinding Risk
                      </span>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Live wave indicator */}
            <div className="bg-slate-900/70 backdrop-blur-2xl border border-white/10 p-5 rounded-[2rem]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Waves className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="text-[9px] font-black text-white uppercase tracking-widest">
                    {lang === 'it' ? 'Flusso Pacchetti' : 'Packet Flow'}
                  </span>
                </div>
                <span className="text-[9px] font-black text-white/40 tabular-nums">
                  {packets.length}/25
                </span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 via-amber-500 to-blue-500 rounded-full"
                  animate={{ width: `${(packets.length / 25) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ─────────────  THEORY GRID  ───────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: ShieldAlert,
            title: t.aisPriorityTitle,
            desc: t.aisPriorityDesc,
            iconBg: 'bg-indigo-500/10',
            iconColor: 'text-indigo-500',
            blob: 'bg-indigo-500/10',
          },
          {
            icon: Layers,
            title: t.macLayerTitle,
            desc: t.macLayerDesc,
            iconBg: 'bg-amber-500/10',
            iconColor: 'text-amber-500',
            blob: 'bg-amber-500/10',
          },
          {
            icon: Share2,
            title: t.routerTitle,
            desc: t.routerDesc,
            iconBg: 'bg-blue-500/10',
            iconColor: 'text-blue-500',
            blob: 'bg-blue-500/10',
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all group overflow-hidden relative"
          >
            <div
              className={`absolute -right-6 -top-6 w-28 h-28 ${card.blob} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`}
            />
            <div
              className={`relative w-14 h-14 ${card.iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-500`}
            >
              <card.icon className={`w-7 h-7 ${card.iconColor}`} />
            </div>
            <h4 className="relative text-lg font-black text-slate-900 mb-3 uppercase tracking-tight leading-tight">
              {card.title}
            </h4>
            <p className="relative text-[12.5px] text-slate-500 leading-relaxed font-semibold">
              {card.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* ─────────────  DEEP DIVE: MAC PROTOCOLS  ───────────── */}
      <div className="bg-slate-900 rounded-[3rem] p-10 lg:p-14 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-7">
            <div className="flex items-center gap-4">
              <div className="w-10 h-1 bg-indigo-500 rounded-full" />
              <span className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em]">
                Advanced Technical Matrix
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-white uppercase tracking-tight leading-[1.05]">
              SOTDMA vs RATDMA
              <br />
              <span className="text-slate-600">
                {lang === 'it'
                  ? 'L\'intelligenza del Livello MAC'
                  : 'The MAC Layer Intelligence'}
              </span>
            </h2>
            <p className="text-base lg:text-lg text-slate-400 font-medium leading-relaxed">
              {lang === 'it'
                ? 'Per prevenire la sovrapposizione radio, il VDES utilizza algoritmi di accesso differenziati. Mentre l\'AIS garantisce slot certi, i canali dati si adattano dinamicamente al carico del sistema.'
                : 'To prevent radio overlap, VDES uses differentiated access algorithms. While AIS guarantees certain slots, data channels dynamically adapt to system load.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white/5 border border-white/10 p-5 rounded-2xl hover:border-indigo-500/40 transition-colors">
                <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest block mb-3">
                  Standard Safety · SOTDMA
                </span>
                <p className="text-[11px] text-white/70 font-medium leading-relaxed">
                  {lang === 'it'
                    ? 'Le navi prenotano slot futuri durante la trasmissione corrente. Prevedibile, robusto, ideale per anti-collisione.'
                    : 'Ships reserve future slots during current transmissions. Predictable, robust, ideal for collision avoidance.'}
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 p-5 rounded-2xl hover:border-amber-500/40 transition-colors">
                <span className="text-[9px] font-black text-amber-400 uppercase tracking-widest block mb-3">
                  High Capacity · RATDMA
                </span>
                <p className="text-[11px] text-white/70 font-medium leading-relaxed">
                  {lang === 'it'
                    ? 'Accesso casuale per pacchetti dati estemporanei. Massimizza l\'uso della banda per ASM e VDE.'
                    : 'Random access for sporadic data packets. Maximizes bandwidth usage for ASM and VDE.'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-6 flex flex-col gap-3">
            <div className="flex items-center gap-3 border-b border-white/5 pb-3 mb-1">
              <div className="w-2 h-2 rounded-full bg-indigo-500" />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">
                Protocol Evolution Table
              </span>
            </div>
            {[
              {
                p: 'SOTDMA',
                use: 'Safety / AIS',
                logic: 'Self-Organizing',
                priority: 'Critical',
                priorityColor: 'text-red-400',
              },
              {
                p: 'RATDMA',
                use: 'ASM / Intermittent',
                logic: 'Random Access',
                priority: 'Medium',
                priorityColor: 'text-amber-400',
              },
              {
                p: 'FATDMA',
                use: 'Fixed Base Stations',
                logic: 'Assigned Blocks',
                priority: 'High',
                priorityColor: 'text-indigo-400',
              },
              {
                p: 'MITDMA',
                use: 'Long Files / VDE',
                logic: 'Multi-slot Concat.',
                priority: 'Low',
                priorityColor: 'text-slate-500',
              },
            ].map((row, i) => (
              <div
                key={i}
                className="flex justify-between items-center py-3 px-5 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors gap-3"
              >
                <div className="min-w-0">
                  <span className="text-indigo-400 text-xs font-black">
                    {row.p}
                  </span>
                  <span className="text-[10px] text-slate-500 font-bold block mt-0.5 truncate">
                    {row.use}
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-white text-[10px] font-black uppercase tracking-widest">
                    {row.logic}
                  </span>
                  <span
                    className={`block text-[8px] font-black mt-0.5 uppercase tracking-widest ${row.priorityColor}`}
                  >
                    {row.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};