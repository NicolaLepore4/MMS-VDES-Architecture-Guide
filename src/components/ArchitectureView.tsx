import React from 'react';
import { 
  Cpu, 
  Network, 
  Radio, 
  Zap, 
  Database, 
  Globe, 
  MessageSquare, 
  Anchor, 
  Lock, 
  Info, 
  BookOpen, 
  ExternalLink,
  ChevronRight,
  ChevronsRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { Language, StepInfo, ProtocolInfo } from '../types';
import { TRANSLATIONS, PROTOCOL_DATA, ARCHITECTURE_STEPS } from '../constants';

export const DiagramBlock = ({ title, subtitle, icon, active, highlight, color = "blue", lang }: { title: string; subtitle: string; icon: React.ReactNode; active?: boolean; highlight?: boolean; color?: "blue" | "emerald" | "amber", lang: Language }) => {
  const colorClasses = {
    blue: active ? 'bg-blue-600 border-blue-600 text-white shadow-blue-200' : (highlight ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-slate-100 text-slate-400'),
    emerald: active ? 'bg-emerald-600 border-emerald-600 text-white shadow-emerald-200' : (highlight ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-white border-slate-100 text-slate-400'),
    amber: active ? 'bg-amber-500 border-amber-500 text-white shadow-amber-200' : (highlight ? 'bg-amber-50 border-amber-200 text-amber-600' : 'bg-white border-slate-100 text-slate-400')
  };

  return (
    <div className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center text-center w-full min-w-[140px] max-w-[180px]
      ${colorClasses[color]} ${active ? 'shadow-lg scale-105 z-10' : (highlight ? 'shadow-md scale-100 opacity-100' : 'opacity-60 scale-95')}`}>
      <div className="mb-2">{icon}</div>
      <div className="text-[11px] font-bold leading-tight">{title}</div>
      <div className="text-[9px] font-medium opacity-80 uppercase tracking-tighter mt-1">{subtitle}</div>
    </div>
  );
};

export const DiagramArrow = ({ protocol, active, onClick, color = "blue" }: { protocol: string; active?: boolean; onClick?: () => void; color?: "blue" | "emerald" | "amber" }) => {
  const colors = {
    blue: { text: 'text-blue-600', bg: 'bg-blue-50', line: 'bg-blue-500', pkt: 'bg-blue-400', border: 'border-blue-100' },
    emerald: { text: 'text-emerald-600', bg: 'bg-emerald-50', line: 'bg-emerald-500', pkt: 'bg-emerald-400', border: 'border-emerald-100' },
    amber: { text: 'text-amber-600', bg: 'bg-amber-50', line: 'bg-amber-500', pkt: 'bg-amber-400', border: 'border-amber-100' }
  };
  const theme = colors[color];

  return (
    <div className={`flex flex-col items-center justify-center px-4 flex-1 min-w-[100px] ${onClick ? 'cursor-pointer' : ''}`} onClick={onClick}>
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={active ? { 
          scale: [1, 1.03, 1],
          borderColor: ["rgba(0,0,0,0.1)", "rgba(59,130,246,0.3)", "rgba(0,0,0,0.1)"]
        } : {}}
        transition={{ repeat: Infinity, duration: 3 }}
        className={`text-[9px] font-mono mb-2 text-center font-bold px-3 py-1 rounded-full whitespace-nowrap transition-all z-10
          ${active ? `${theme.text} ${theme.bg} border ${theme.border} shadow-sm` : 'text-slate-300 border-transparent opacity-50'}`}
      >
        {protocol}
      </motion.div>
      <div className="relative w-full h-1 flex items-center">
        <div className={`h-0.5 w-full ${active ? theme.line : 'bg-slate-100'} transition-colors duration-500`} />
        {active && (
          <>
            <motion.div 
              className={`absolute w-3 h-0.5 ${theme.pkt} rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]`}
              animate={{ left: ["-10%", "110%"], opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
            <motion.div 
              className={`absolute w-1.5 h-0.5 ${theme.pkt} rounded-full opacity-60`}
              animate={{ left: ["-10%", "110%"], opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: 0.7 }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export const ConnectionLine = ({ active }: { active: boolean }) => (
  <div className="relative flex-1 flex items-center justify-center min-w-[3rem]">
    <div className={`h-0.5 w-full ${active ? 'bg-blue-500' : 'bg-slate-200'} transition-colors duration-500`} />
    {active && (
      <motion.div 
        layoutId="packet"
        className="absolute w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]"
        animate={{ x: [ -20, 20 ], opacity: [ 0, 1, 0 ] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      />
    )}
  </div>
);

export const DetailCard: React.FC<{ step: StepInfo; onProtocolClick?: (id: string) => void; lang: Language }> = ({ step, onProtocolClick, lang }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
  >
    <div className="p-8">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            {step.icon}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">{step.title[lang]}</h3>
            <p className="text-sm text-slate-500 font-medium">{step.subtitle[lang]}</p>
          </div>
        </div>
      </div>

      {step.protocol && (
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <button 
            onClick={() => onProtocolClick?.(step.protocol!)}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-mono hover:bg-blue-600 transition-colors group"
          >
            <Lock className="w-3.5 h-3.5 group-hover:animate-pulse" />
            {PROTOCOL_DATA[step.protocol]?.name || step.protocol}
          </button>
          
          {step.id === 'edge-router' && (
            <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
               <button 
                onClick={() => (step as any).onRoutingChange?.('vdes')}
                className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${(step as any).routingPref === 'vdes' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 font-medium'}`}
               >
                {TRANSLATIONS[lang].vdesLink}
               </button>
               <button 
                onClick={() => (step as any).onRoutingChange?.('ip')}
                className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${(step as any).routingPref === 'ip' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 font-medium'}`}
               >
                {TRANSLATIONS[lang].ipLink}
               </button>
            </div>
          )}
        </div>
      )}

      <ul className="grid md:grid-cols-2 gap-4">
        {step.details.map((detail, idx) => {
          let finalDetail = detail[lang];
          if (step.id === 'edge-router') {
            if (finalDetail.includes("Smart Routing") && (step as any).routingPref) {
               finalDetail = `${TRANSLATIONS[lang].smartRoutingEnabled}: ${((step as any).routingPref as string).toUpperCase()}`;
            }
          }

          return (
            <li key={idx} className="flex gap-3 text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
              {finalDetail}
            </li>
          );
        })}
      </ul>

      {step.functioning && (
        <div className="mt-8 bg-blue-50/50 rounded-2xl border border-blue-100 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-500 text-white rounded-lg shadow-lg shadow-blue-100">
               <Zap className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">{step.functioning.title[lang]}</h4>
          </div>
          
          <div className="grid gap-4">
            {step.functioning.steps.map((fStep, sIdx) => (
              <div key={sIdx} className="flex gap-4 group">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-white border-2 border-blue-200 flex items-center justify-center text-[10px] font-bold text-blue-500 shadow-sm z-10 group-hover:border-blue-500 transition-colors">
                    {sIdx + 1}
                  </div>
                  {sIdx < (step.functioning?.steps.length ?? 0) - 1 && (
                    <div className="w-0.5 flex-1 bg-blue-100 my-1" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    {fStep[lang]}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-white/60 rounded-xl border border-blue-100 flex items-start gap-3">
             <Info className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
             <p className="text-xs text-slate-500 leading-relaxed italic">
                {lang === 'it' 
                  ? "L'Edge Router è il cuore decisionale dell'MMS: senza di esso, la nave non potrebbe garantire la continuità dei servizi e-Navigation in mare aperto."
                  : "The Edge Router is the decision-making heart of the MMS: without it, the ship could not ensure the continuity of e-Navigation services on the high seas."}
             </p>
          </div>
        </div>
      )}

      {step.resources && step.resources.length > 0 && (
        <div className="mt-8 pt-8 border-t border-slate-100">
          <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-500" />
            {TRANSLATIONS[lang].referenceLibrary}
          </h4>
          <div className="grid sm:grid-cols-2 gap-3">
            {step.resources.map((res, idx) => (
              <a 
                key={idx}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all group"
              >
                <div className="flex flex-col gap-1 overflow-hidden">
                  <span className="text-xs font-bold text-slate-900 truncate group-hover:text-blue-600">{res.title}</span>
                  <span className="text-[10px] text-slate-400 uppercase font-mono">{res.type}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-500 shrink-0" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  </motion.div>
);

export const BlockDiagram = ({ 
  onProtocolClick, 
  routingPref, 
  onRoutingChange ,
  lang,
  activeStepIdx,
  onStepClick
}: { 
  onProtocolClick: (id: string) => void;
  routingPref: 'vdes' | 'ip';
  onRoutingChange: (pref: 'vdes' | 'ip') => void;
  lang: Language;
  activeStepIdx: number;
  onStepClick: (idx: number) => void;
}) => {
  const t = TRANSLATIONS[lang];
  return (
  <div className="bg-white rounded-[2rem] p-12 shadow-sm border border-slate-200 overflow-x-auto relative">
    {/* Global Toggle for Demo */}
    <div className="absolute top-6 right-6 flex bg-slate-100 p-1 rounded-xl border border-slate-200 z-20">
       <button 
        onClick={() => onRoutingChange('vdes')}
        className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all ${routingPref === 'vdes' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}
       >
        {t.vdesLink}
       </button>
       <button 
        onClick={() => onRoutingChange('ip')}
        className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all ${routingPref === 'ip' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}
       >
        {t.ipLink} (VSAT)
       </button>
    </div>

    <div className="min-w-[1050px] space-y-16">
      {/* Visual Diagram - Ship */}
      <div className="relative">
        <div className="absolute -top-6 left-0 text-[10px] font-bold text-slate-300 uppercase tracking-widest bg-white px-2">
          {lang === 'it' ? 'Segmento Nave (Sorgente)' : 'Ship Segment (Source)'}
        </div>
        <div className="flex items-center">
          <div className="flex flex-col gap-2 p-4 bg-slate-50 rounded-2xl border border-slate-100 shadow-inner">
             <div className="text-[9px] font-bold text-slate-400 mb-1 px-1 uppercase tracking-wider">{lang === 'it' ? 'Applicazioni' : 'Applications'}</div>
             <div className="flex gap-2">
                <div className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 shadow-sm flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> ECDIS
                </div>
                <div className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 shadow-sm flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Monitoring
                </div>
                <div className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 shadow-sm flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Weather
                </div>
             </div>
          </div>
          
          <DiagramArrow protocol="SMMP Protocol" active onClick={() => onProtocolClick('SMMP')} />
          
          <div onClick={() => onStepClick(0)} className="cursor-pointer transition-transform hover:scale-105 active:scale-95">
            <DiagramBlock 
              active={activeStepIdx === 0}
              highlight={true}
              color="blue"
              icon={<Cpu className="w-6 h-6" />}
              title="MMS Agent"
              subtitle="MRN Cert (MIR)"
              lang={lang}
            />
          </div>

          <DiagramArrow protocol="MMTP Transport" active onClick={() => onProtocolClick('MMTP')} />

          <div onClick={() => onStepClick(1)} className="relative group cursor-pointer transition-transform hover:scale-105 active:scale-95">
            <DiagramBlock 
              active={activeStepIdx === 1}
              highlight={true}
              color="blue"
              icon={<Network className="w-6 h-6" />}
              title="Edge Router"
              subtitle={routingPref === 'vdes' ? `Selected: VDES` : `Selected: IP`}
              lang={lang}
            />
            {/* Context Tooltip/Control */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
               Smart Routing: {routingPref.toUpperCase()} Active
            </div>
          </div>

          <DiagramArrow 
            protocol={routingPref === 'vdes' ? "IEC 61162-450" : "TCP/IP Tunnel"} 
            active 
            onClick={() => onProtocolClick(routingPref === 'vdes' ? 'IEC 61162-450' : 'MMTP')} 
          />

          <div onClick={() => onStepClick(2)} className="cursor-pointer transition-transform hover:scale-105 active:scale-95">
            <DiagramBlock 
              active={activeStepIdx === 2}
              highlight={routingPref === 'vdes'}
              color="blue"
              icon={<Radio className="w-6 h-6" />}
              title="VDES Modem/PI"
              subtitle={routingPref === 'vdes' ? (lang === 'it' ? "Link Attivo" : "Active Link") : (lang === 'it' ? "Standby" : "Standby")}
              lang={lang}
            />
          </div>
        </div>
        
        {/* Alternative IP Path Visual */}
        {routingPref === 'ip' && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="absolute top-full left-[60%] w-[30%] pt-4"
          >
             <div className="flex flex-col items-center gap-2">
                <div className="text-[9px] font-black text-blue-500 bg-blue-50 px-2 py-0.5 rounded">DIRECT IP LINK</div>
                <div className="w-px h-10 border-l-2 border-dashed border-blue-400" />
             </div>
          </motion.div>
        )}
      </div>

      {/* Over the Air Bridge */}
      <div className="flex items-center justify-center gap-6 py-4 relative">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <button 
          onClick={() => {
            onStepClick(3);
            onProtocolClick('VDES');
          }}
          className={`flex items-center gap-4 px-10 py-5 rounded-[2rem] border transition-all relative group
            ${routingPref === 'vdes' ? (activeStepIdx === 3 ? 'bg-amber-100 border-amber-300 shadow-2xl scale-110' : 'bg-amber-50 border-amber-100 shadow-xl hover:scale-105') : 'bg-slate-50 border-slate-100 opacity-30 grayscale scale-95'}
          `}
        >
           <Zap className={`w-6 h-6 animate-pulse ${routingPref === 'vdes' ? 'text-amber-500' : 'text-slate-400'}`} />
           <div className="text-center">
              <div className="text-xs font-black uppercase tracking-widest mb-1">
                {lang === 'it' ? 'Rete Radio VDES (AIS | ASM | VDE)' : 'VDES Radio Network (AIS | ASM | VDE)'}
              </div>
              <div className="text-[10px] font-mono opacity-60">TERRESTRIAL | SATELLITE</div>
           </div>
           <Zap className={`w-6 h-6 animate-pulse ${routingPref === 'vdes' ? 'text-amber-500' : 'text-slate-400'}`} />
        </button>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </div>

      {/* Shore Segment */}
      <div className="relative">
        <div className="absolute -top-6 left-0 text-[10px] font-bold text-slate-300 uppercase tracking-widest bg-white px-2">
          {lang === 'it' ? 'Segmento Terra (Destinazione)' : 'Shore Segment (Sink)'}
        </div>
        <div className="flex items-center">
          <div onClick={() => onStepClick(4)} className="cursor-pointer transition-transform hover:scale-105 active:scale-95">
            <DiagramBlock 
              active={activeStepIdx === 4}
              highlight={routingPref === 'vdes'}
              color="emerald"
              icon={<Database className="w-6 h-6" />}
              title="Shore Base"
              subtitle={routingPref === 'vdes' ? (lang === 'it' ? "Ricezione Attiva" : "Active Reception") : (lang === 'it' ? "Standby" : "Standby")}
              lang={lang}
            />
          </div>

          <DiagramArrow 
            protocol="Backhaul Link" 
            active={routingPref === 'vdes'} 
            color="emerald" 
            onClick={() => onProtocolClick('MMTP')} 
          />

          <div onClick={() => onStepClick(5)} className="cursor-pointer transition-transform hover:scale-105 active:scale-95">
            <DiagramBlock 
              active={activeStepIdx === 5}
              highlight={true}
              color="emerald"
              icon={<Globe className="w-6 h-6" />}
              title="Router Net"
              subtitle="MMS Backbone (IP)"
              lang={lang}
            />
          </div>

          <DiagramArrow protocol="MMTP / IP" active color="emerald" onClick={() => onProtocolClick('MMTP')} />

          <div className="flex-1 flex flex-col items-center">
             <div onClick={() => onStepClick(6)} className="cursor-pointer transition-transform hover:scale-105 active:scale-95">
               <DiagramBlock 
                active={activeStepIdx === 6}
                highlight={true}
                color="emerald"
                icon={<MessageSquare className="w-6 h-6" />}
                title="Dest. Agent"
                subtitle="VTS / Port Auth"
                lang={lang}
               />
             </div>
             <button 
              onClick={() => onProtocolClick('SMMP')}
              className="text-[9px] font-bold text-emerald-600 mt-3 font-mono hover:bg-emerald-50 px-2 py-0.5 rounded-full transition-colors"
             >
              END-TO-END SMMP
             </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)};
