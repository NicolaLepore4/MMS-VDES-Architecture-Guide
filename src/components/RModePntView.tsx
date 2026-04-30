import React, { useState } from 'react';
import { 
  Clock, 
  ShieldCheck, 
  AlertTriangle, 
  Ship, 
  Radio 
} from 'lucide-react';
import { motion } from 'motion/react';
import { Language, BaseStation } from '../types';
import { TRANSLATIONS } from '../constants';

export const RModePntView = ({ lang }: { lang: Language }) => {
  const t = TRANSLATIONS[lang];
  const [gnssStatus, setGnssStatus] = useState<'healthy' | 'lost' | 'spoofed'>('healthy');
  const SHIP_POS = { x: 400, y: 300 }; // Center of the 800x600 SVG
  
  const [stations, setStations] = useState<BaseStation[]>([
    { id: 'ST-1', x: 200, y: 150, active: true },
    { id: 'ST-2', x: 600, y: 150, active: true },
    { id: 'ST-3', x: 400, y: 500, active: true }
  ]);
  
  const [draggedId, setDraggedId] = useState<string | null>(null);

  // Math Engine: HDOP Calculation
  const calculateHDOP = () => {
    const activeStations = stations.filter(s => s.active);
    if (activeStations.length < 2) return 99.9;

    const G = activeStations.map(s => {
      const dx = s.x - SHIP_POS.x;
      const dy = s.y - SHIP_POS.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist === 0) return [0, 0];
      return [dx / dist, dy / dist];
    });

    let sxx = 0, syy = 0, sxy = 0;
    G.forEach(([ux, uy]) => {
      sxx += ux * ux;
      syy += uy * uy;
      sxy += ux * uy;
    });

    const det = (sxx * syy) - (sxy * sxy);
    if (Math.abs(det) < 0.0001) return 99.9;

    const c11 = syy / det;
    const c22 = sxx / det;
    const hdop = Math.sqrt(c11 + c22);
    return Math.min(hdop, 20);
  };

  const hdop = calculateHDOP();
  const accuracy = hdop * 22.4; 

  const getStatusColor = (val: number) => {
    if (val < 1.5) return 'text-emerald-500';
    if (val < 3.0) return 'text-amber-500';
    return 'text-red-500';
  };

  const applyPreset = (type: 'optimal' | 'poor' | 'critical') => {
    switch(type) {
      case 'optimal':
        setStations([
          { id: 'ST-1', x: 200, y: 150, active: true },
          { id: 'ST-2', x: 600, y: 150, active: true },
          { id: 'ST-3', x: 400, y: 550, active: true }
        ]);
        break;
      case 'poor':
        setStations([
          { id: 'ST-1', x: 50, y: 50, active: true },
          { id: 'ST-2', x: 100, y: 100, active: true },
          { id: 'ST-3', x: 150, y: 150, active: true }
        ]);
        break;
      case 'critical':
        setStations([
          { id: 'ST-1', x: 100, y: SHIP_POS.y, active: true },
          { id: 'ST-2', x: 700, y: SHIP_POS.y, active: true },
        ]);
        break;
    }
  };

  const handleDragUpdate = (id: string, x: number, y: number) => {
    setStations(prev => prev.map(s => s.id === id ? { ...s, x, y } : s));
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
        {/* Section 1: GNSS & Scenario Context */}
        <section className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Clock className="w-64 h-64" />
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
                        <Clock className="w-8 h-8" />
                    </div>
                    <div>
                       <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t.pntTitle}</h2>
                       <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-1">Hardware-Level Synchronization</p>
                    </div>
                </div>

                <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-sm">
                    {(['healthy', 'lost', 'spoofed'] as const).map((status) => (
                        <button
                            key={status}
                            onClick={() => setGnssStatus(status)}
                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                gnssStatus === status 
                                    ? status === 'healthy' ? 'bg-emerald-500 text-white shadow-lg' : status === 'lost' ? 'bg-red-500 text-white shadow-lg' : 'bg-amber-500 text-white shadow-lg'
                                    : 'text-slate-400 hover:text-slate-600'
                            }`}
                        >
                            {status === 'healthy' ? (lang === 'it' ? 'GNSS OK' : 'GNSS OK') : status === 'lost' ? (lang === 'it' ? 'GNSS PERSO' : 'GNSS LOST') : (lang === 'it' ? 'GNSS SPOOFED' : 'GNSS SPOOFED')}
                        </button>
                    ))}
                </div>
            </div>

            <div className={`p-8 rounded-[2.5rem] border-2 transition-all flex flex-col md:flex-row items-center gap-8 ${
                gnssStatus === 'healthy' ? 'bg-emerald-50/20 border-emerald-500/10' : 
                gnssStatus === 'lost' ? 'bg-red-50/30 border-red-500/20' : 
                'bg-amber-50/30 border-amber-500/20'
            }`}>
               <div className={`p-6 rounded-[2rem] border-4 shadow-xl transition-all ${gnssStatus === 'healthy' ? 'bg-white border-emerald-500 text-emerald-500' : 'bg-slate-900 border-red-500 text-red-500'}`}>
                  {gnssStatus === 'healthy' ? <ShieldCheck className="w-12 h-12" /> : <AlertTriangle className="w-12 h-12 animate-pulse" />}
               </div>
               <div className="flex-1 space-y-2">
                  <h4 className="text-lg font-black text-slate-900 uppercase">
                     {gnssStatus === 'healthy' ? (lang === 'it' ? 'Stato Integrale' : 'System Integral') : (lang === 'it' ? 'Failover Navigazione Necessario' : 'PNT Failover Required')}
                  </h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                     {gnssStatus === 'healthy' 
                        ? (lang === 'it' ? 'Il segnale GNSS è stabile. R-Mode in standby come riferimento di verifica secondario.' : 'GNSS signal stable. R-Mode in standby as secondary verification reference.')
                        : gnssStatus === 'lost'
                        ? (lang === 'it' ? 'Segnale GNSS assente (Jamming). Il VDES attiva la navigazione autonoma via R-Mode terrestri.' : 'GNSS signal lost (Jamming). VDES triggers autonomous navigation via terrestrial R-Mode.')
                        : (lang === 'it' ? 'Rilevato Spoofing. Multilaterazione R-Mode utilizzata per invalidare i dati satellitari falsi.' : 'Spoofing detected. R-Mode multilateration used to invalidate false satellite data.')
                     }
                  </p>
               </div>
            </div>
        </section>

        {/* Section 2: Interactive HDOP Simulator */}
        <section className="space-y-8">
           <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">{t.rmodeSimulator}</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">{t.dragHint}</p>
                  </div>
                  <div className="flex gap-2">
                      <button onClick={() => applyPreset('optimal')} className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase border border-emerald-100 hover:bg-emerald-100 transition-all">
                        {t.optimalScenario}
                      </button>
                      <button onClick={() => applyPreset('poor')} className="px-4 py-2 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black uppercase border border-amber-100 hover:bg-amber-100 transition-all">
                        {t.poorScenario}
                      </button>
                      <button onClick={() => applyPreset('critical')} className="px-4 py-2 bg-red-50 text-red-600 rounded-full text-[10px] font-black uppercase border border-red-100 hover:bg-red-100 transition-all">
                        {t.criticalScenario}
                      </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                     <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t.hdopTitle}</div>
                     <div className={`text-4xl font-black ${getStatusColor(hdop)}`}>
                        {hdop.toFixed(2)}
                     </div>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                     <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t.accuracyTitle}</div>
                     <div className="text-4xl font-black text-slate-900">
                        ±{accuracy.toFixed(1)}m
                     </div>
                  </div>
                  <div className="p-6 bg-slate-900 rounded-3xl border border-white/5 text-white flex flex-col justify-center">
                     <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">TOA Precision</span>
                     </div>
                     <p className="text-[10px] leading-relaxed text-slate-300">
                        {t.toaDescription}
                     </p>
                  </div>
                </div>
              </div>
           </div>

           <div className="flex flex-col xl:flex-row gap-8">
              <div className="flex-1 bg-slate-100 rounded-[3rem] border-2 border-slate-200 aspect-[4/3] relative shadow-inner overflow-hidden cursor-crosshair">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                   <svg width="100%" height="100%">
                     <pattern id="grid-pnt" width="40" height="40" patternUnits="userSpaceOnUse">
                       <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                     </pattern>
                     <rect width="100%" height="100%" fill="url(#grid-pnt)" />
                   </svg>
                </div>

                <svg 
                  viewBox="0 0 800 600" 
                  className="w-full h-full relative z-10 select-none"
                  onMouseMove={(e) => {
                    if (draggedId) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const scaleX = 800 / rect.width;
                      const scaleY = 600 / rect.height;
                      const x = (e.clientX - rect.left) * scaleX;
                      const y = (e.clientY - rect.top) * scaleY;
                      handleDragUpdate(draggedId, Math.max(20, Math.min(780, x)), Math.max(20, Math.min(580, y)));
                    }
                  }}
                  onMouseUp={() => setDraggedId(null)}
                  onMouseLeave={() => setDraggedId(null)}
                >
                  {stations.filter(s => s.active).map(s => (
                     <line 
                       key={`line-${s.id}`}
                       x1={SHIP_POS.x} y1={SHIP_POS.y}
                       x2={s.x} y2={s.y}
                       stroke={draggedId === s.id ? '#3b82f6' : '#94a3b8'}
                       strokeWidth={draggedId === s.id ? "2" : "1"}
                       strokeDasharray="4,4"
                       className="transition-all"
                     />
                  ))}

                  <motion.circle 
                    cx={SHIP_POS.x} cy={SHIP_POS.y}
                    animate={{ r: hdop * 30 }}
                    fill={hdop < 1.5 ? "rgba(16, 185, 129, 0.1)" : hdop < 3.0 ? "rgba(245, 158, 11, 0.1)" : "rgba(239, 68, 68, 0.1)"}
                    stroke={hdop < 1.5 ? "#10b981" : hdop < 3.0 ? "#f59e0b" : "#ef4444"}
                    strokeWidth="2"
                    strokeDasharray="5,3"
                  />
                  
                  <g transform={`translate(${SHIP_POS.x - 20}, ${SHIP_POS.y - 20})`}>
                     <rect width="40" height="40" rx="10" fill="#0f172a" />
                     <Ship className="w-10 h-10 p-2 text-white" />
                  </g>

                  {stations.map(s => (
                    <g 
                      key={s.id} 
                      transform={`translate(${s.x - 25}, ${s.y - 25})`}
                      onMouseDown={() => setDraggedId(s.id)}
                      className="cursor-pointer group"
                    >
                       <motion.rect 
                         width="50" height="50" rx="15" 
                         fill={draggedId === s.id ? "#3b82f6" : "#fff"}
                         stroke={draggedId === s.id ? "#2563eb" : "#e2e8f0"}
                         strokeWidth="2"
                         className="shadow-lg group-hover:shadow-2xl transition-all"
                       />
                       <Radio className={`w-12 h-12 p-3 ${draggedId === s.id ? 'text-white' : 'text-slate-600'}`} />
                       <text y="70" x="25" textAnchor="middle" className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{s.id}</text>
                    </g>
                  ))}
                </svg>
              </div>

              <div className="w-full xl:w-96 space-y-6">
                 <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                    <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-6 py-1 border-b border-white/10">{t.theoryTitle}</h4>
                    <div className="space-y-6">
                       <section className="space-y-3">
                          <h5 className="text-xs font-black uppercase text-white">{t.geometricDilution}</h5>
                          <p className="text-[11px] leading-relaxed text-slate-400 font-medium">
                             {lang === 'it' 
                               ? "HDOP minimizzato quando le stazioni formano un triangolo equilatero attorno alla nave."
                               : "HDOP is minimized when stations form an equilateral triangle around the ship."}
                          </p>
                       </section>
                       <section className="space-y-3">
                          <h5 className="text-xs font-black uppercase text-white">{t.atomicClockTitle}</h5>
                          <p className="text-[11px] leading-relaxed text-slate-400 font-medium">
                             {t.toaDescription}
                          </p>
                       </section>
                    </div>
                 </div>
              </div>
           </div>
        </section>
    </div>
  );
};
