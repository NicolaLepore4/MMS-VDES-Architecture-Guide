import React from 'react';
import { 
  BookOpen, 
  ShieldCheck, 
  MessageSquare, 
  ExternalLink, 
  Layers 
} from 'lucide-react';
import { motion } from 'motion/react';
import { Language, ProtocolInfo } from '../types';
import { TRANSLATIONS } from '../constants';

export const ProtocolModal = ({ protocol, onClose, lang }: { protocol: ProtocolInfo; onClose: () => void; lang: Language }) => {
  const t = TRANSLATIONS[lang];
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-blue-950/40 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 30 }}
        className="bg-white rounded-[2rem] shadow-2xl w-full max-w-5xl overflow-hidden border border-slate-200"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex h-full max-h-[90vh]">
          {/* Left Sidebar: Context & Security */}
          <div className="w-1/3 bg-slate-50 border-r border-slate-100 p-8 flex flex-col overflow-y-auto">
            <div className="mb-10">
              <div className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded inline-block mb-3 uppercase tracking-widest border border-blue-100">
                {t.engineeringNote}
              </div>
              <h3 className="text-3xl font-black text-slate-900 leading-tight mb-4 tracking-tight">{protocol.name}</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">{protocol.description[lang]}</p>
            </div>

            <div className="space-y-8 mt-6">
              {/* Resources / Documentation Section */}
              {protocol.resources && protocol.resources.length > 0 && (
                <section className="space-y-4">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-blue-500" /> {t.referenceLibrary}
                  </h4>
                  <div className="grid gap-2">
                    {protocol.resources.map((res, idx) => (
                      <a 
                        key={idx}
                        href={res.url}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between p-3 bg-white rounded-xl border border-slate-100 hover:border-blue-200 hover:shadow-sm transition-all"
                      >
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[10px] font-bold text-slate-700 line-clamp-1 group-hover:text-blue-600 transition-colors">{res.title}</span>
                          <span className="text-[8px] font-black uppercase text-slate-400 tracking-tighter">
                            {res.type === 'spec' ? t.specification : res.type === 'paper' ? 'Research Paper' : res.type === 'use-case' ? 'Pilot / Use Case' : 'Industry Link'}
                          </span>
                        </div>
                        <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-blue-500 transition-colors" />
                      </a>
                    ))}
                  </div>
                </section>
              )}

              <section className="space-y-4">
                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <ShieldCheck className="w-3.5 h-3.5 text-blue-500" /> {t.securityCompliance}
                 </h4>
                 <div className="space-y-3">
                   {protocol.securityConsiderations.map((sec, idx) => (
                      <div key={idx} className="text-[11px] text-slate-600 leading-relaxed bg-white p-4 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
                         <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                         {sec[lang]}
                      </div>
                   ))}
                 </div>
              </section>

              <section className="space-y-4">
                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <MessageSquare className="w-3.5 h-3.5 text-blue-500" /> {t.useCases}
                 </h4>
                 <div className="grid gap-2">
                   {protocol.useCases.map((useCase, idx) => (
                      <div key={idx} className="text-[10px] font-bold text-slate-500 bg-slate-200/40 px-3 py-2 rounded-lg border border-slate-200/50">
                         {useCase[lang]}
                      </div>
                   ))}
                 </div>
              </section>
            </div>
            
            <div className="mt-auto pt-8">
               <button 
                  onClick={onClose}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2"
                >
                  {t.closeDocumentation}
                </button>
            </div>
          </div>

          {/* Right Content: Packet Architecture */}
          <div className="flex-1 p-10 overflow-y-auto bg-white">
            <div className="flex justify-between items-center mb-10 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 text-white rounded-lg shadow-lg shadow-blue-100">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest">{t.protocolArchitecture}</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{t.bitLevelMapping}</p>
                </div>
              </div>
              {protocol.id === 'mmtp' && (
                 <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 flex items-center gap-2 animate-pulse">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                   {t.smartRoutingEnabled}
                 </div>
              )}
            </div>

            <div className="space-y-12">
              {/* Optimized Encapsulation Stack (Visual Layering) */}
              {protocol.encapsulationStack && (
                <section>
                  <h5 className="text-[10px] font-black text-slate-400 uppercase mb-6 tracking-widest">{t.encapsulationHierarchy}</h5>
                  <div className="relative flex flex-col items-center">
                    {protocol.encapsulationStack.map((layer, idx) => (
                      <div 
                        key={idx} 
                        className="w-full flex flex-col items-center group"
                        style={{ zIndex: protocol.encapsulationStack!.length - idx }}
                      >
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className={`w-full relative px-6 py-4 rounded-2xl border transition-all duration-300
                            ${idx === 0 ? 'bg-blue-600 border-blue-700 text-white shadow-xl' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white'}
                          `}
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                               <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black border
                                 ${idx === 0 ? 'bg-blue-500 border-blue-400 text-white' : 'bg-white border-slate-200 text-slate-400'}
                               `}>
                                 {protocol.encapsulationStack!.length - idx}
                               </div>
                               <span className="text-xs font-black tracking-tight">{layer}</span>
                            </div>
                            <span className={`text-[8px] font-black uppercase tracking-widest opacity-60
                               ${idx === 0 ? 'text-blue-200' : 'text-slate-400'}
                            `}>
                              {idx === 0 ? t.innerCore : idx === protocol.encapsulationStack!.length - 1 ? t.carrierLayer : t.middleware}
                            </span>
                          </div>
                        </motion.div>
                        {idx < protocol.encapsulationStack!.length - 1 && (
                          <div className="w-px h-6 bg-gradient-to-b from-blue-200 to-slate-100" />
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Optimized Header Detail Table */}
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1 h-4 bg-blue-600 rounded-full" />
                  <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.payloadSpecs}</h5>
                </div>
                <div className="bg-slate-50 rounded-[2rem] border border-slate-100 overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-white border-b border-slate-100">
                        <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-r border-slate-100 text-center">{t.packetField}</th>
                        <th className="px-6 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-r border-slate-100 text-center">{t.bitByteSize}</th>
                        <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{t.logicDescription}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {protocol.packetStructure.map((field, idx) => (
                        <tr key={idx} className="border-b border-slate-100 last:border-0 group hover:bg-white transition-all cursor-default">
                          <td className="px-8 py-6 border-r border-slate-100">
                            <div className="flex items-center gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 scale-0 group-hover:scale-100 transition-transform" />
                              <div className="text-[11px] font-black text-slate-800 font-mono tracking-tight group-hover:text-blue-600 transition-colors uppercase">{field.field}</div>
                            </div>
                          </td>
                          <td className="px-6 py-6 border-r border-slate-100 text-center">
                            <span className="text-[10px] font-black font-mono text-blue-600 bg-blue-50/50 px-2 py-1 rounded-md border border-blue-100/50 ring-2 ring-blue-50/20 ">
                              {field.size || 'N/A'}
                            </span>
                          </td>
                          <td className="px-8 py-6">
                            <p className="text-[11px] font-medium text-slate-500 leading-relaxed group-hover:text-slate-700 transition-colors">{field.description[lang]}</p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
