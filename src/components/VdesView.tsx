import React from 'react';
import { 
  Radio, 
  ArrowRight, 
  CircleX, 
  Lock, 
  ShieldCheck, 
  Info 
} from 'lucide-react';
import { motion } from 'motion/react';
import { Language, VdesChannelInfo } from '../types';
import { TRANSLATIONS, VDES_STRUCTURE_DATA, PROTOCOL_DATA } from '../constants';

export const VdesStructureDiagram = ({ onChannelClick, lang }: { onChannelClick: (ch: VdesChannelInfo) => void, lang: Language }) => {
  const t = TRANSLATIONS[lang];
  
  const legs = [
    { id: 'upper', name: t.upperLeg, color: 'text-blue-600 bg-blue-50' },
    { id: 'simplex', name: t.simplex, color: 'text-amber-600 bg-amber-50' },
    { id: 'lower', name: t.lowerLeg, color: 'text-emerald-600 bg-emerald-50' }
  ];

  return (
    <div className="space-y-12">
      {legs.map((leg) => (
        <section key={leg.id} className="space-y-6">
          <div className="flex items-center gap-4 px-4">
             <div className="flex-1 h-px bg-slate-200" />
             <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full border border-current bg-white shadow-sm ${leg.color}`}>
                {leg.name}
             </h3>
             <div className="flex-1 h-px bg-slate-200" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-2">
            {VDES_STRUCTURE_DATA.filter(ch => ch.leg === leg.id).map((ch) => (
              <motion.div
                key={ch.id}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onChannelClick(ch)}
                className="cursor-pointer group relative h-full"
              >
                <div className={`h-full p-5 rounded-3xl border-2 bg-white transition-all
                  ${ch.type === 'AIS' ? 'border-amber-100/50 hover:border-amber-400' : 
                    ch.type === 'ASM' ? 'border-blue-100/50 hover:border-blue-400' : 
                    'border-emerald-100/50 hover:border-emerald-400'}
                 shadow-sm hover:shadow-xl hover:bg-slate-50/30 group-active:scale-95`}
                >
                  <div className={`text-[10px] font-black uppercase mb-3 px-2 py-0.5 rounded inline-block
                    ${ch.type === 'AIS' ? 'bg-amber-50 text-amber-600' : 
                      ch.type === 'ASM' ? 'bg-blue-50 text-blue-600' : 
                      'bg-emerald-50 text-emerald-600'}`}
                  >
                    {ch.type}
                  </div>
                  
                  <h4 className="text-sm font-black text-slate-800 mb-1 tracking-tight">{ch.name}</h4>
                  
                  <div className="mt-4 space-y-3">
                     <div className="space-y-1">
                        <div className="text-[8px] font-black text-slate-300 uppercase tracking-widest">{t.frequency}</div>
                        <div className="text-[10px] font-mono font-bold text-slate-600">{ch.frequency}</div>
                     </div>
                     <div className="space-y-1">
                        <div className="text-[8px] font-black text-slate-300 uppercase tracking-widest">{t.channel}</div>
                        <div className="text-[10px] font-bold text-slate-400 truncate">{ch.channel}</div>
                     </div>
                  </div>
                  
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                    <div className="p-2 bg-slate-900 text-white rounded-xl shadow-lg">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export const VdesChannelDetail = ({ 
  activeChannel, 
  onClose, 
  onProtocolClick, 
  lang 
}: { 
  activeChannel: VdesChannelInfo; 
  onClose: () => void; 
  onProtocolClick: (id: string) => void;
  lang: Language;
}) => {
  const t = TRANSLATIONS[lang];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white rounded-[2rem] shadow-2xl border border-slate-200 p-10 overflow-hidden relative mt-4 mx-2"
    >
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 p-2 bg-slate-50 text-slate-400 rounded-full hover:bg-red-50 hover:text-red-500 transition-all border border-slate-100"
      >
        <CircleX className="w-5 h-5" />
      </button>

      <div className="flex flex-col md:flex-row gap-12">
        <div className="w-full md:w-1/3 space-y-6">
          <div className={`p-4 rounded-3xl inline-block
            ${activeChannel.type === 'AIS' ? 'bg-amber-50 text-amber-600' : 
              activeChannel.type === 'ASM' ? 'bg-blue-50 text-blue-600' : 
              'bg-emerald-50 text-emerald-600'}`}
          >
            <Radio className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-900 leading-tight mb-2 tracking-tighter">
              {activeChannel.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-lg uppercase tracking-widest">
                {activeChannel.type}
              </span>
              <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-lg uppercase tracking-widest">
                {activeChannel.bandwidth} BW
              </span>
            </div>
          </div>

          <div className="space-y-4 pt-4">
             <div className="flex justify-between items-center py-3 border-b border-slate-100">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.frequency}</span>
               <span className="text-xs font-mono font-bold text-slate-900">{activeChannel.frequency}</span>
             </div>
             <div className="flex justify-between items-center py-3 border-b border-slate-100">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.channel}</span>
               <span className="text-xs font-mono font-bold text-slate-900">{activeChannel.channel}</span>
             </div>
             <div className="flex justify-between items-center py-3 border-b border-slate-100">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.modulation}</span>
               <span className="text-xs font-bold text-blue-600">{activeChannel.modulation}</span>
             </div>
             <div className="flex justify-between items-center py-3 border-b border-slate-100">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.power}</span>
               <span className="text-xs font-bold text-slate-600">{activeChannel.power}</span>
             </div>
             <div className="flex justify-between items-center py-3 border-b border-slate-100">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Access</span>
               <span className="text-xs font-bold text-slate-600">{activeChannel.accessMethod}</span>
             </div>
          </div>

          <button 
            onClick={() => onProtocolClick(activeChannel.protocol)}
            className="w-full flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-xl shadow-slate-200"
          >
            <Lock className="w-4 h-4" />
            {t.details} {activeChannel.protocol}
          </button>
        </div>

        <div className="flex-1 space-y-8">
          <div>
            <h4 className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">{t.purpose}</h4>
            <div className="grid gap-3">
               {activeChannel.details.map((detail, dIdx) => (
                 <div key={dIdx} className="flex gap-4 bg-slate-50/50 p-5 rounded-2xl border border-slate-100 group hover:border-blue-200 transition-all shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0 group-hover:scale-125 transition-transform" />
                    <p className="text-sm font-medium text-slate-600 leading-relaxed italic">"{detail[lang]}"</p>
                 </div>
               ))}
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-[2.5rem] text-white border border-slate-800 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12">
                <ShieldCheck className="w-24 h-24" />
             </div>
             <h5 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-6 flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
               {t.securityAnalysis}
             </h5>
             <div className="space-y-5 relative z-10">
                <div className="flex items-start gap-4">
                   <div className="text-[10px] w-24 shrink-0 font-bold text-slate-500 uppercase py-1">{t.confidentiality}</div>
                   <div className="text-sm font-medium text-slate-200">{activeChannel.security.confidentiality[lang]}</div>
                </div>
                <div className="flex items-start gap-4">
                   <div className="text-[10px] w-24 shrink-0 font-bold text-slate-500 uppercase py-1">{t.integrity}</div>
                   <div className="text-sm font-medium text-slate-200">{activeChannel.security.integrity[lang]}</div>
                </div>
                <div className="flex items-start gap-4">
                   <div className="text-[10px] w-24 shrink-0 font-bold text-slate-500 uppercase py-1">{t.availability}</div>
                   <div className="text-sm font-medium text-slate-200">{activeChannel.security.availability[lang]}</div>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-800">
                   <p className="text-xs text-slate-400 leading-relaxed italic">
                     "{activeChannel.security.notes[lang]}"
                   </p>
                </div>
             </div>
          </div>

          <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100">
             <div className="flex items-center gap-3 mb-4">
               <Info className="w-4 h-4 text-amber-500" />
               <h5 className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Engineering Fact</h5>
             </div>
             <p className="text-xs text-amber-700 leading-relaxed font-medium">
               {activeChannel.type === 'AIS' 
                 ? "AIS remains the core safety system. VDES offloads non-essential data to ASM and VDE channels to prevent AIS slot saturation near busy ports."
                 : activeChannel.type === 'ASM'
                 ? "ASM channels use 16-QAM or π/4-QPSK for better spectral efficiency compared to AIS GMSK."
                 : "VDE channels are the high-speed backbone of the maritime cloud, supporting agile bandwidth and adaptive modulation."}
             </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
