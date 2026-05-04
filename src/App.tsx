import React, { useState } from 'react';
import { 
  Layout, 
  Radio, 
  Zap, 
  Radar, 
  Globe, 
  Activity, 
  Cpu, 
  Anchor, 
  CircleX, 
  Lock, 
  ShieldCheck, 
  Info, 
  AlertTriangle, 
  Ship, 
  Layers, 
  MessageSquare,
  Server
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Types
import { 
  Language, 
  VdesChannelInfo, 
  ProtocolInfo 
} from './types';

// Constants
import { 
  TRANSLATIONS, 
  ARCHITECTURE_STEPS, 
  PROTOCOL_DATA 
} from './constants';

// Components
import { ProtocolModal } from './components/ProtocolModal';
import { SimulationView } from './components/SimulationView';
import { BlockDiagram, DetailCard } from './components/ArchitectureView';
import { VdesStructureDiagram, VdesChannelDetail } from './components/VdesView';
import { PacketDecoderView } from './components/PacketDecoderView';
import { VdeSatView } from './components/VdeSatView';
import { AisCongestionView } from './components/AisCongestionView';
import { RModePntView } from './components/RModePntView';
import { VDESControllerIntegration } from './components/VDESControllerIntegration';
import { TeslaVdesProtocol } from './components/TeslaVdesProtocol';
import TeslaMmsIntegration from './components/TeslaMmsIntegration';

export default function App() {
  const [viewMode, setViewMode] = useState<'architecture' | 'vdes' | 'simulation' | 'rmode' | 'decoder' | 'vdesat' | 'ais-congestion' | 'vdes-controller' | 'tesla-vdes' | 'tesla-mms-integration'>('architecture');
  const [lang, setLang] = useState<Language>('it');
  const t = TRANSLATIONS[lang];
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [activeChannel, setActiveChannel] = useState<VdesChannelInfo | null>(null);
  const [selectedProtocol, setSelectedProtocol] = useState<ProtocolInfo | null>(null);
  const [routingPref, setRoutingPref] = useState<'vdes' | 'ip'>('vdes');
  
  const currentStep = ARCHITECTURE_STEPS[activeStepIdx];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 pb-20">
      {/* Header */}
      <header className="maritime-gradient text-white pt-12 pb-8 px-6 shadow-lg mb-8 relative overflow-hidden">
        {/* Navigation & Language Control */}
        <div className="absolute top-6 right-6 flex items-center gap-4 z-50">
          {/* View Toggles */}
          <div className="flex bg-white/10 rounded-full p-1 backdrop-blur-md border border-white/20">
             <button 
               onClick={() => setViewMode('architecture')}
               className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all flex items-center gap-2 ${viewMode === 'architecture' ? 'bg-white text-slate-900 shadow-lg' : 'text-white hover:bg-white/5'}`}
             >
               <Layout className="w-3.5 h-3.5" />
               <span className="hidden sm:inline">{t.architectureView}</span>
             </button>
             <button 
               onClick={() => setViewMode('vdes')}
               className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all flex items-center gap-2 ${viewMode === 'vdes' ? 'bg-white text-slate-900 shadow-lg' : 'text-white hover:bg-white/5'}`}
             >
               <Radio className="w-3.5 h-3.5" />
               <span className="hidden sm:inline">{t.vdesStructureView}</span>
             </button>
             <button 
               onClick={() => setViewMode('simulation')}
               className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all flex items-center gap-2 ${viewMode === 'simulation' ? 'bg-white text-slate-900 shadow-lg' : 'text-white hover:bg-white/5'}`}
             >
               <Zap className="w-3.5 h-3.5" />
               <span className="hidden sm:inline">{t.simulationView}</span>
             </button>
             <button 
               onClick={() => setViewMode('rmode')}
               className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all flex items-center gap-2 ${viewMode === 'rmode' ? 'bg-white text-slate-900 shadow-lg' : 'text-white hover:bg-white/5'}`}
             >
               <Radar className="w-3.5 h-3.5" />
               <span className="hidden sm:inline">{t.rmodeTitle}</span>
             </button>
              <button 
                onClick={() => setViewMode('vdesat')}
                className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all flex items-center gap-2 ${viewMode === 'vdesat' ? 'bg-white text-slate-900 shadow-lg' : 'text-white hover:bg-white/5'}`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.vdeSatView}</span>
              </button>
              <button 
                onClick={() => setViewMode('vdes-controller')}
                className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all flex items-center gap-2 ${viewMode === 'vdes-controller' ? 'bg-white text-slate-900 shadow-lg' : 'text-white hover:bg-white/5'}`}
              >
                <Server className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">VDES Controller</span>
               </button>
                <button 
                  onClick={() => setViewMode('tesla-vdes')}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all flex items-center gap-2 ${viewMode === 'tesla-vdes' ? 'bg-white text-slate-900 shadow-lg' : 'text-white hover:bg-white/5'}`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">TESLA</span>
                </button>
                <button 
                  onClick={() => setViewMode('tesla-mms-integration')}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all flex items-center gap-2 ${viewMode === 'tesla-mms-integration' ? 'bg-white text-slate-900 shadow-lg' : 'text-white hover:bg-white/5'}`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">TESLA+MMS</span>
                </button>
               <button 
                 onClick={() => setViewMode('ais-congestion')}
                className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all flex items-center gap-2 ${viewMode === 'ais-congestion' ? 'bg-white text-slate-900 shadow-lg' : 'text-white hover:bg-white/5'}`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.aisCongestionView}</span>
              </button>
             <button 
               onClick={() => setViewMode('decoder')}
               className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all flex items-center gap-2 ${viewMode === 'decoder' ? 'bg-white text-slate-900 shadow-lg' : 'text-white hover:bg-white/5'}`}
             >
               <Cpu className="w-3.5 h-3.5" />
               <span className="hidden sm:inline">Decoder</span>
             </button>
          </div>

          {/* Language Switcher */}
          <div className="flex bg-white/10 rounded-full p-1 backdrop-blur-md border border-white/20">
            <button 
              onClick={() => setLang('it')}
              className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'it' ? 'bg-white text-slate-900 shadow-lg' : 'text-white hover:bg-white/5'}`}
            >
              ITA
            </button>
            <button 
              onClick={() => setLang('en')}
              className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${lang === 'en' ? 'bg-white text-slate-900 shadow-lg' : 'text-white hover:bg-white/5'}`}
            >
              ENG
            </button>
          </div>
        </div>

        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Anchor className="w-64 h-64 -rotate-12 translate-x-12 -translate-y-12" />
        </div>
        
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg backdrop-blur-sm border border-blue-400/20">
                 <Anchor className="text-blue-400 w-8 h-8" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight">{t.title}</h1>
            </div>
            <p className="text-blue-100/70 max-w-2xl leading-relaxed text-lg">
              {t.subtitle}
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6">
        <AnimatePresence mode="wait">
          {viewMode === 'architecture' ? (
            <motion.div 
              key="architecture"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-12"
            >
              <section className="w-full">
                <BlockDiagram 
                  onProtocolClick={id => {
                    setSelectedProtocol(PROTOCOL_DATA[id]);
                  }} 
                  routingPref={routingPref}
                  onRoutingChange={(pref) => setRoutingPref(pref)}
                  lang={lang}
                  activeStepIdx={activeStepIdx}
                  onStepClick={(idx) => setActiveStepIdx(idx)}
                />
              </section>

              <AnimatePresence mode="wait">
                <DetailCard 
                  key={ARCHITECTURE_STEPS[activeStepIdx].id} 
                  step={{ ...currentStep, routingPref, onRoutingChange: setRoutingPref } as any} 
                  onProtocolClick={id => setSelectedProtocol(PROTOCOL_DATA[id])}
                  lang={lang}
                />
              </AnimatePresence>
            </motion.div>
          ) : viewMode === 'vdes' ? (
            <motion.div 
              key="vdes-structure"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between mb-2 px-2">
                <div>
                   <h2 className="text-2xl font-black text-slate-900 tracking-tight">{t.vdesDescription}</h2>
                   <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">ITU-R M.2092-1 Standard Layout</p>
                </div>
              </div>

              <VdesStructureDiagram 
                lang={lang} 
                onChannelClick={setActiveChannel} 
              />

              <AnimatePresence>
                {activeChannel && (
                  <VdesChannelDetail 
                    activeChannel={activeChannel}
                    onClose={() => setActiveChannel(null)}
                    onProtocolClick={(id) => setSelectedProtocol(PROTOCOL_DATA[id])}
                    lang={lang}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          ) : viewMode === 'rmode' ? (
            <motion.div
              key="rmode"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <RModePntView lang={lang} />
            </motion.div>
          ) : viewMode === 'decoder' ? (
            <motion.div
              key="decoder"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
            >
              <PacketDecoderView lang={lang} />
            </motion.div>
           ) : viewMode === 'vdesat' ? (
             <motion.div
               key="vdesat"
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
             >
               <VdeSatView lang={lang} />
             </motion.div>
            ) : viewMode === 'vdes-controller' ? (
              <motion.div
                key="vdes-controller"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <VDESControllerIntegration lang={lang} />
              </motion.div>
            ) : viewMode === 'tesla-vdes' ? (
              <motion.div
                key="tesla-vdes"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <TeslaVdesProtocol lang={lang} />
              </motion.div>
            ) : viewMode === 'tesla-mms-integration' ? (
              <motion.div
                key="tesla-mms-integration"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <TeslaMmsIntegration />
              </motion.div>
            ) : viewMode === 'ais-congestion' ? (
            <motion.div
              key="ais-congestion"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <AisCongestionView lang={lang} />
            </motion.div>
          ) : (
            <motion.div
              key="simulation"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <SimulationView lang={lang} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedProtocol && (
            <ProtocolModal 
              protocol={selectedProtocol} 
              onClose={() => setSelectedProtocol(null)} 
              lang={lang}
            />
          )}
        </AnimatePresence>

        {/* Glossario e concetti base */}
        <section className="grid lg:grid-cols-3 gap-8 mt-16">
          <div className="lg:col-span-3 grid md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 rounded-lg"><ShieldCheck className="text-blue-500 w-5 h-5" /></div>
                <h4 className="font-bold text-slate-900">E-Navigation ready</h4>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                {lang === 'it' 
                  ? 'Standardizzazione internazionale per lo scambio sicuro di dati critici come rotte e bollettini meteo tra nave e autorità costiere.'
                  : 'International standardization for secure exchange of critical data such as routes and weather bulletins between ships and shore authorities.'}
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-50 rounded-lg"><Lock className="text-amber-500 w-5 h-5" /></div>
                <h4 className="font-bold text-slate-900">MRN & Identity</h4>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                {lang === 'it'
                  ? 'Ogni nave ha un Maritime Resource Name univoco (validato dal MIR) che garantisce che il messaggio provenga da una fonte certificata.'
                  : 'Each vessel has a unique Maritime Resource Name (validated by MIR) which ensures the message comes from a certified source.'}
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-50 rounded-lg"><Info className="text-emerald-500 w-5 h-5" /></div>
                <h4 className="font-bold text-slate-900">{lang === 'it' ? 'Potenza VDES' : 'VDES Power'}</h4>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                {lang === 'it'
                  ? 'Offre canali digitali dedicati ad alta velocità, superando i limiti del classico AIS e abilitando nuovi servizi interattivi.'
                  : 'Offers dedicated high-speed digital channels, overcoming the limits of traditional AIS and enabling new interactive services.'}
              </p>
            </div>
          </div>

          {/* Technical Glossary Footer */}
          <div className="lg:col-span-3 bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
             <div className="absolute bottom-0 right-0 p-10 opacity-5"><Zap className="w-32 h-32" /></div>
             <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
               <Layers className="text-blue-400 w-6 h-6" /> {lang === 'it' ? 'Glossario dei Protocolli' : 'Protocol Glossary'}
             </h2>
             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    <span className="text-blue-400 font-mono text-sm font-bold">SMMP</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {lang === 'it' ? 'Secure Maritime Messaging Protocol. Criptazione e firma digitale end-to-end.' : 'Secure Maritime Messaging Protocol. End-to-end encryption and digital signature.'}
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    <span className="text-blue-400 font-mono text-sm font-bold">MMTP</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {lang === 'it' ? 'Maritime Messaging Transport Protocol. Smistamento e trasporto fisico dei pacchetti.' : 'Maritime Messaging Transport Protocol. Physical packet sorting and transport.'}
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    <span className="text-blue-400 font-mono text-sm font-bold">IEC 61162-450</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {lang === 'it' ? 'Standard Ethernet Multicast per la rete locale di bordo per dati digitali.' : 'Ethernet Multicast standard for the onboard local network for digital data.'}
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    <span className="text-blue-400 font-mono text-sm font-bold">VDE-TER/SAT</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {lang === 'it' ? 'Strato radio (Physical Layer) del VDES per trasmissioni terrestri e satellitari.' : 'Radio layer (Physical Layer) of VDES for terrestrial and satellite transmissions.'}
                  </p>
                </div>
             </div>
          </div>
        </section>
      </main>

      {/* Footer / Disclaimer */}
      <footer className="bg-slate-50 border-t border-slate-200 mt-20 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-12">
            <div className="max-w-md">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-blue-600 text-white rounded-lg">
                  <Ship className="w-5 h-5" />
                </div>
                <span className="text-sm font-black text-slate-900 tracking-tight uppercase">MMS Explorer</span>
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                {t.educationalApp}. Built for technical training and architectural visualization of VDES/MMS standards.
              </p>
            </div>
            
            <div className="max-w-xl bg-white p-6 rounded-2xl border border-slate-200">
              <h4 className="flex items-center gap-2 text-[10px] font-black text-slate-900 uppercase tracking-widest mb-3">
                <AlertTriangle className="w-3 h-3 text-amber-500" />
                {t.disclaimerTitle}
              </h4>
              <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic">
                {t.disclaimerText}
              </p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">© 2026 Maritime Systems Operational Guide</span>
            <div className="flex gap-6">
               <span className="text-[10px] font-black text-slate-400">IALA G1139 Compliant</span>
               <span className="text-[10px] font-black text-slate-400">SMMP/MMTP v1.0</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
