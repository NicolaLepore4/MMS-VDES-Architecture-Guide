import React, { useState } from 'react';
import { 
  Globe, 
  ShieldCheck, 
  Activity, 
  ChevronRight, 
  ChevronsRight, 
  RefreshCw, 
  Zap, 
  History, 
  Tally5, 
  Cpu, 
  Network, 
  Radio, 
  LandPlot, 
  Anchor, 
  MessageSquare, 
  BookOpen 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, SimPacket } from '../types';
import { TRANSLATIONS } from '../constants';

export const SimulationView = ({ lang }: { lang: Language }) => {
  const t = TRANSLATIONS[lang];
  const [activeScenario, setActiveScenario] = useState<'sat-loss' | 'cyber' | null>(null);
  const [pulsePacket, setPulsePacket] = useState<SimPacket | null>(null);
  const [teslaPacket, setTeslaPacket] = useState<SimPacket | null>(null);
  const [buffer, setBuffer] = useState<SimPacket[]>([]);
  const [logs, setLogs] = useState<{ id: string; msg: string; time: string }[]>([]);
  const [isSimRunning, setIsSimRunning] = useState(false);
  const [simSpeed, setSimSpeed] = useState(800);
  const [distanceFromShore, setDistanceFromShore] = useState(100);
  const [threatLevel, setThreatLevel] = useState(0);
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const addLog = (msg: string) => {
    setLogs(prev => [{ id: Math.random().toString(), msg, time: new Date().toLocaleTimeString() }, ...prev].slice(0, 5));
  };

  const getTheoreticalInsight = (status: string, scenario: string | null) => {
    if (!scenario) return "";
    const insights: Record<string, Record<string, string>> = {
      'agent': {
        'it': 'L\'applicazione genera un payload MMS Security Layer (SMMP) (Secure-JSON) firmato digitalmente.',
        'en': 'Application generates a digitally signed MMS Security Layer (SMMP) (Secure-JSON) payload.'
      },
      'router': {
        'it': scenario === 'cyber' ? 'Il MMS Proxy / Edge Broker genera un pacchetto TESLA per autenticare il flusso AIS.' : 'Il MMS Proxy / Edge Broker incapsula il pacchetto in MMTP (priorità Store & Forward) e seleziona il link ottimale.',
        'en': scenario === 'cyber' ? 'MMS Proxy / Edge Broker generates a TESLA packet to authenticate the AIS stream.' : 'MMS Proxy / Edge Broker encapsulates packet in MMTP (Store & Forward priority) and selects optimal link.'
      },
      'link': {
        'it': 'Il dato viene modulato sul canale radio (VHF o SAT) utilizzando schemi TDMA o Random Access (per SAT).',
        'en': 'Data is modulated on the radio channel (VHF or SAT) using TDMA or Random Access schemes (for SAT).'
      },
      'shore': {
        'it': scenario === 'cyber' ? 'La Shore Base verifica la chiave TESLA ricevuta decalandola temporalmente.' : 'La Shore Base decapsula il pacchetto e verifica l\'identità MRN via MIR tramite certificati X.509.',
        'en': scenario === 'cyber' ? 'Shore Base verifies the received TESLA key by temporally shifting it.' : 'Shore Base decapsulates packet and verifies MRN identity via MIR through X.509 certificates.'
      },
      'dest': {
        'it': 'Il dato raggiunge l\'autorità portuale finale in modo sicuro.',
        'en': 'Data reaches the final port authority securely.'
      }
    };
    return insights[status]?.[lang] || "";
  };

  // Pulse Simulation Logic
  React.useEffect(() => {
    if (!isSimRunning || !activeScenario) return;

    const interval = setInterval(() => {
      // 1. Enviromental Updates
      if (activeScenario === 'sat-loss') setDistanceFromShore(p => Math.max(0, p - 2));
      if (activeScenario === 'cyber') setThreatLevel(p => (p + 15) % 100);

      // SAT Latency Check (Differentiates latency for SAT links)
      if (pulsePacket?.link === 'vdes' && (pulsePacket?.type === 'VDE-SAT' || pulsePacket?.type === 'SAT') && pulsePacket?.status === 'link') {
         // Skip beats to simulate latency
         if (Math.random() > 0.3) return; 
      }

      // 2. Pulse Controller
      if (!pulsePacket && !teslaPacket) {
        // PRIORITY 1: Buffer Drain (Auto-flush when VDE active or other scenario)
        if (buffer.length > 0) {
            const isVdeActive = (activeScenario === 'sat-loss' && distanceFromShore <= 20);
            const isAutoFlush = activeScenario !== 'sat-loss';
            
            if (isVdeActive || isAutoFlush) {
                const [next, ...rest] = buffer;
                setBuffer(rest);
                setPulsePacket({ ...next, status: 'link', link: 'vdes', layer: 'Physical' });
                setActiveNode('link'); // Start visual pulse from link
                addLog(lang === 'it' ? `Scarico Buffer: ${rest.length} rimanenti` : `Buffer Flush: ${rest.length} remaining`);
                return;
            }
        }

        // PRIORITY 2: New Generation
        const isMalicious = activeScenario === 'cyber' && Math.random() > 0.5;
        const type: any = isMalicious ? 'MALICIOUS' : 'POS';
        
        const newPulse: SimPacket = {
          id: Math.random().toString(),
          type,
          status: 'agent',
          link: 'ip',
          label: isMalicious ? 'FAKE_AIS' : 'POS_REPORT',
          layer: 'Application'
        };

        // Scenario Override for blackout
        if (activeScenario === 'sat-loss' && distanceFromShore < 45 && distanceFromShore > 20) {
            addLog(lang === 'it' ? "Blackout SAT -> MMTP Buffer" : "SAT Blackout -> MMTP Buffer");
            setBuffer(prev => [...prev, { ...newPulse, status: 'router' }]);
            return;
        }

        setPulsePacket(newPulse);
        setActiveNode('agent');
      } else {
        // Step the Pulse (AIS/Common or TESLA)
        const sequence: SimPacket['status'][] = ['agent', 'router', 'link', 'shore', 'dest'];
        
        // Handle Parallel TESLA Packet Sequence
        if (activeScenario === 'cyber') {
            if (pulsePacket?.status === 'router' && !teslaPacket && !pulsePacket.isTesla) {
                const newTesla: SimPacket = {
                    id: 'tesla-' + Math.random().toString(),
                    type: 'TESLA',
                    status: 'router',
                    link: 'vdes',
                    label: 'TESLA_KEY',
                    layer: 'Transport',
                    isTesla: true
                };
                setTeslaPacket(newTesla);
                addLog(lang === 'it' ? "Autenticazione: Generata chiave TESLA" : "Auth: TESLA key generated");
                // Move AIS forward immediately, keep TESLA at router for one beat
                const sequence: SimPacket['status'][] = ['agent', 'router', 'link', 'shore', 'dest'];
                const nextStatus = sequence[sequence.indexOf(pulsePacket.status) + 1];
                setPulsePacket({ ...pulsePacket, status: nextStatus, layer: 'Physical' });
                setActiveNode(nextStatus);
                return; 
            }
        }

        // AIS Pulse Step
        if (pulsePacket) {
            const currentIdx = sequence.indexOf(pulsePacket.status);
            if (currentIdx < sequence.length - 1) {
                const nextStatus = sequence[currentIdx + 1];
                setActiveNode(nextStatus);
                let updatedPulse = { ...pulsePacket, status: nextStatus };
                if (nextStatus === 'router') updatedPulse.layer = 'Transport';
                if (nextStatus === 'link') updatedPulse.layer = 'Physical';
                if (nextStatus === 'shore') updatedPulse.layer = 'Data';

                // Cyber Logic: Re-verify if TESLA is present at Shore Base
                if (activeScenario === 'cyber' && nextStatus === 'shore' && pulsePacket.type === 'MALICIOUS') {
                    // In a real scenario, we check if we HAVE the key. 
                    // Here we'll simulate the block if the TESLA pulse hasn't reached/validated or is missing
                    addLog(lang === 'it' ? "🛡️ BLOCCO: Chiave TESLA non valida" : "🛡️ BLOCK: Invalid TESLA key");
                    setPulsePacket(null);
                    setTeslaPacket(null);
                    setTimeout(() => setActiveNode(null), 500);
                    return;
                }
                
                // SAT/VDES Logic
                if (activeScenario === 'sat-loss' && nextStatus === 'link') {
                    updatedPulse.link = (distanceFromShore <= 20) ? 'vdes' : (distanceFromShore >= 45 ? 'ip' : 'queued');
                    if (updatedPulse.link === 'queued') {
                        addLog(lang === 'it' ? "Link SAT assente -> Buffering..." : "SAT link missing -> Buffering...");
                        setBuffer(prev => [...prev, { ...updatedPulse, status: 'router' }]);
                        setPulsePacket(null);
                        setTimeout(() => setActiveNode(null), 500);
                        return;
                    }
                }
                setPulsePacket(updatedPulse);
            } else {
                setPulsePacket(null);
                if (!teslaPacket) {
                    addLog(lang === 'it' ? "Pacchetto consegnato" : "Packet delivered");
                    setActiveNode(null);
                }
            }
        }

        // TESLA Pulse Step (Follows AIS)
        if (teslaPacket) {
            const currentIdx = sequence.indexOf(teslaPacket.status);
            if (currentIdx < sequence.length - 1) {
                const nextStatus = sequence[currentIdx + 1];
                let updatedTesla = { ...teslaPacket, status: nextStatus };
                if (nextStatus === 'link') updatedTesla.layer = 'Physical';
                if (nextStatus === 'shore') updatedTesla.layer = 'Data';
                setTeslaPacket(updatedTesla);
            } else {
                setTeslaPacket(null);
                if (!pulsePacket) {
                    addLog(lang === 'it' ? "Autenticazione TESLA OK" : "TESLA Authentication OK");
                    setActiveNode(null);
                }
            }
        }
      }
    }, simSpeed);

    return () => clearInterval(interval);
  }, [isSimRunning, activeScenario, pulsePacket, teslaPacket, distanceFromShore, buffer, lang, simSpeed]);

  const resetSim = () => {
    setActiveScenario(null);
    setPulsePacket(null);
    setTeslaPacket(null);
    setBuffer([]);
    setLogs([]);
    setIsSimRunning(false);
    setSimSpeed(800);
    setDistanceFromShore(100);
    setThreatLevel(0);
    setActiveNode(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-6 items-stretch">
        <div className="flex-1 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
           <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">{t.simulationView}</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Real-time Logic Visualization</p>
              </div>
              <div className="flex gap-2">
                <div className="bg-slate-100 p-1 rounded-full flex gap-1 mr-2 border border-slate-200">
                    {[
                      { val: 2000, label: t.slowSpeed, icon: <ChevronRight className="w-3 h-3" /> },
                      { val: 800, label: t.normalSpeed, icon: <ChevronRight className="w-3 h-3" /> },
                      { val: 300, label: t.fastSpeed, icon: <ChevronsRight className="w-3 h-3" /> }
                    ].map(s => (
                        <button 
                          key={s.val}
                          onClick={() => setSimSpeed(s.val)}
                          className={`px-3 py-1 rounded-full text-[9px] font-black uppercase transition-all flex items-center gap-1
                            ${simSpeed === s.val ? 'bg-white text-blue-600 shadow-sm border border-blue-100' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            {s.icon}
                            {s.label}
                        </button>
                    ))}
                </div>
                <button 
                  onClick={() => setIsSimRunning(!isSimRunning)}
                  className={`px-6 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${isSimRunning ? 'bg-amber-100 text-amber-600 border border-amber-200' : 'bg-blue-600 text-white shadow-lg'}`}
                >
                  {isSimRunning ? <Tally5 className="w-3.5 h-3.5 rotate-90" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  {isSimRunning ? t.stopSimulation : t.startSimulation}
                </button>
                <button onClick={resetSim} className="p-2 bg-slate-50 text-slate-400 rounded-full hover:bg-red-50 hover:text-red-500 transition-all border border-slate-100">
                  <History className="w-4 h-4" />
                </button>
              </div>
            </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <button 
                onClick={() => { setActiveScenario('sat-loss'); setLogs([]); }}
                className={`p-10 rounded-[2.5rem] border-2 transition-all text-left min-h-[220px] flex flex-col items-start justify-center shadow-sm relative overflow-hidden group
                  ${activeScenario === 'sat-loss' ? 'border-blue-500 bg-blue-50/50 shadow-md translate-y-[-4px]' : 'border-slate-100 hover:border-blue-200 bg-slate-50/30 hover:bg-white'}`}
              >
                <div className={`p-4 rounded-2xl inline-block mb-4 transition-colors ${activeScenario === 'sat-loss' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-blue-500 border border-slate-200'}`}>
                   <Globe className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-slate-900 tracking-tight mb-2 uppercase text-base">
                  {t.satLossScenario}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {lang === 'it' 
                    ? 'Gestione MMS Store & Forward durante il blackout satellitare con scarico dati via VDE-TER.' 
                    : 'MMS Store & Forward handling during SAT blackout with VDE-TER data offload.'}
                </p>
                {activeScenario === 'sat-loss' && (
                  <div className="absolute top-4 right-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                  </div>
                )}
              </button>

              <button 
                onClick={() => { setActiveScenario('cyber'); setLogs([]); }}
                className={`p-10 rounded-[2.5rem] border-2 transition-all text-left min-h-[220px] flex flex-col items-start justify-center shadow-sm relative overflow-hidden group
                  ${activeScenario === 'cyber' ? 'border-red-500 bg-red-50/50 shadow-md translate-y-[-4px]' : 'border-slate-100 hover:border-red-200 bg-slate-50/30 hover:bg-white'}`}
              >
                <div className={`p-4 rounded-2xl inline-block mb-4 transition-colors ${activeScenario === 'cyber' ? 'bg-red-600 text-white shadow-lg' : 'bg-white text-red-500 border border-slate-200'}`}>
                   <ShieldCheck className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-slate-900 tracking-tight mb-2 uppercase text-base">
                  {t.cyberScenario}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {lang === 'it' 
                    ? 'Autenticazione TESLA sull\'Edge Router per la validazione temporale dei messaggi AIS broadcast.' 
                    : 'TESLA Authentication on the Edge Router for temporal validation of broadcast AIS messages.'}
                </p>
                {activeScenario === 'cyber' && (
                  <div className="absolute top-4 right-4">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                  </div>
                )}
              </button>
           </div>
        </div>

        <div className="w-full md:w-80 bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-5">
              <Activity className="w-32 h-32" />
           </div>
           <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-6 py-1 border-b border-white/10 uppercase">Live Metrics</h4>
           <div className="space-y-6 relative z-10 flex-1">
              <div className="space-y-2">
                 <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                    <span>
                        {activeScenario === 'sat-loss' ? t.shipStatus : t.securityStatus}
                    </span>
                    <span className="text-blue-400 font-mono italic">
                        {activeScenario === 'sat-loss' ? `${distanceFromShore}nm` : `${threatLevel}%`}
                    </span>
                 </div>
                 <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full ${activeScenario === 'sat-loss' ? (distanceFromShore < 20 ? 'bg-emerald-500' : 'bg-blue-500') : 
                                       (threatLevel > 50 ? 'bg-red-500' : 'bg-blue-500')}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${activeScenario === 'sat-loss' ? (100 - distanceFromShore) : threatLevel}%` }}
                    />
                 </div>
              </div>

              <div className="space-y-4">
                 <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.linkStatus}</div>
                 <div className="space-y-3">
                    <div className="flex items-center gap-3">
                       <div className={`w-2 h-2 rounded-full ${activeScenario === 'sat-loss' ? (distanceFromShore >= 45 ? 'bg-emerald-500' : 'bg-red-500') : 'bg-emerald-500'}`} />
                       <span className="text-xs font-bold">IP / SAT LINK</span>
                       {activeScenario === 'sat-loss' && distanceFromShore < 45 && <span className="text-[8px] text-red-400 font-bold uppercase animate-pulse">Lost</span>}
                    </div>
                    <div className="flex items-center gap-3">
                       <div className={`w-2 h-2 rounded-full ${distanceFromShore <= 20 || activeScenario === 'cyber' || activeScenario === 'port-density' ? 'bg-emerald-500' : 'bg-slate-700'}`} />
                       <span className="text-xs font-bold">VDES LINK</span>
                       {distanceFromShore <= 20 && <span className="text-[8px] text-emerald-400 font-bold uppercase">Coastal Connected</span>}
                    </div>
                 </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5">
                 <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Protocol Engine</div>
                 <div className="flex items-center gap-2">
                    <ShieldCheck className={`w-4 h-4 ${activeScenario === 'cyber' ? 'text-emerald-400' : 'text-slate-600'}`} />
                    <span className="text-xs font-medium">SMMP Verification: <b className={activeScenario === 'cyber' ? 'text-emerald-400' : 'text-slate-400'}>{activeScenario === 'cyber' ? 'ACTIVE' : 'READY'}</b></span>
                 </div>
              </div>
           </div>

           <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <Tally5 className="w-3 h-3 text-blue-400" />
                <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.simEventLog}</h5>
              </div>
              <div className="space-y-2 max-h-32 overflow-hidden">
                 {logs.map(log => (
                   <motion.div 
                     initial={{ opacity: 0, x: -10 }}
                     animate={{ opacity: 1, x: 0 }}
                     key={log.id} 
                     className="text-[9px] font-medium text-slate-400 flex gap-2"
                   >
                     <span className="text-blue-500 shrink-0">[{log.time}]</span>
                     <span className="truncate">{log.msg}</span>
                   </motion.div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-[3rem] border-2 border-slate-200 h-[500px] relative shadow-inner group">
         <div className="absolute inset-0 bg-blue-100/5" />
         
         <div className="absolute inset-0 flex items-center justify-around px-10">
            {['agent', 'router', 'link', 'shore', 'dest'].map((node, idx) => {
                const nodeIcons = {
                    agent: <Cpu className="w-8 h-8" />,
                    router: <Network className="w-8 h-8" />,
                    link: <Radio className="w-8 h-8" />,
                    shore: <LandPlot className="w-8 h-8" />,
                    dest: <Anchor className="w-8 h-8" />
                };
                const nodeNames = {
                    agent: 'Ship App',
                    router: 'Edge Router',
                    link: 'VHF/SAT Link',
                    shore: 'Shore Base',
                    dest: 'Port Authority'
                };
                const isSelected = activeNode === node;
                
                return (
                    <div key={node} className="relative z-10 flex flex-col items-center gap-4">
                        <motion.div 
                          animate={{ 
                            scale: isSelected ? 1.2 : 1,
                            backgroundColor: isSelected ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 255, 255, 1)',
                            borderColor: isSelected ? 'rgba(59, 130, 246, 0.5)' : '#fff'
                          }}
                          className={`p-6 rounded-[2rem] border-4 shadow-xl transition-all relative
                            ${node === 'router' && buffer.length > 0 ? 'ring-4 ring-amber-400 ring-offset-4' : ''}
                        `}>
                            <div className={isSelected ? 'text-blue-600' : 'text-slate-400'}>
                                {nodeIcons[node as keyof typeof nodeIcons]}
                            </div>
                            
                            {isSelected && (
                                <motion.div 
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black px-4 py-2 rounded-2xl whitespace-nowrap shadow-2xl"
                                >
                                    {getTheoreticalInsight(node, activeScenario)}
                                </motion.div>
                            )}
                        </motion.div>
                        <div className={`text-[10px] font-black uppercase tracking-widest ${isSelected ? 'text-blue-600' : 'text-slate-400'}`}>
                            {nodeNames[node as keyof typeof nodeNames]}
                        </div>
                        
                        {node === 'router' && buffer.length > 0 && (
                            <div className="bg-amber-100 text-amber-600 text-[8px] font-black px-2 py-1 rounded-lg border border-amber-200">
                                BUFFER: {buffer.length}
                            </div>
                        )}
                    </div>
                );
            })}
         </div>

         <div className="absolute inset-x-20 top-1/2 -translate-y-1/2 h-full flex items-center pointer-events-none opacity-20">
            <svg className="w-full h-full overflow-visible">
               <path d="M 50,225 L 950,225" stroke="#3b82f6" strokeWidth="4" strokeDasharray="10,10" fill="none" />
            </svg>
         </div>

         {pulsePacket && (
             <motion.div
               key={pulsePacket.id}
               initial={{ left: '5%', top: '50%', opacity: 0 }}
               animate={{ 
                 left: `${pulsePacket.status === 'agent' ? 10 : 
                          pulsePacket.status === 'router' ? 30 : 
                          pulsePacket.status === 'link' ? 50 : 
                          pulsePacket.status === 'shore' ? 70 : 90}%`, 
                 opacity: 1 
               }}
               transition={{ type: 'spring', damping: 25, stiffness: 120 }}
               className={`absolute -translate-y-1/2 z-30 p-4 rounded-3xl border-4 shadow-2xl flex flex-col items-center gap-2
                ${pulsePacket.type === 'SAR' ? 'bg-red-600 border-red-400 text-white' : 
                  pulsePacket.type === 'MALICIOUS' ? 'bg-slate-900 border-red-500 text-red-500' :
                  'bg-white border-blue-500 text-blue-600'}
               `}
             >
                <div className="flex items-center gap-3">
                    {pulsePacket.type === 'SAR' ? <Zap className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
                    <span className="text-xs font-black uppercase tracking-tight">{pulsePacket.label}</span>
                </div>
                
                {/* Protocol Badge */}
                <div className="flex flex-col items-center gap-1 mt-2">
                    <div className="text-[7px] font-black opacity-50 uppercase tracking-widest">Protocol Layer</div>
                    <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border
                        ${pulsePacket.type === 'SAR' ? 'bg-red-700 border-red-500 text-white' : 'bg-blue-50 border-blue-200 text-blue-700'}
                    `}>
                        {pulsePacket.layer}
                    </div>
                </div>
             </motion.div>
         )}

         {teslaPacket && (
             <motion.div
               key={teslaPacket.id}
               initial={{ left: '30%', top: '40%', opacity: 0, scale: 0.8 }}
               animate={{ 
                 left: `${teslaPacket.status === 'router' ? 30 : 
                          teslaPacket.status === 'link' ? 50 : 
                          teslaPacket.status === 'shore' ? 70 : 90}%`, 
                 opacity: 1,
                 scale: 0.8
               }}
               transition={{ type: 'spring', damping: 20, stiffness: 100 }}
               className="absolute -translate-y-[80px] z-20 p-3 rounded-2xl border-4 shadow-xl flex flex-col items-center gap-1 bg-emerald-600 border-emerald-400 text-white"
             >
                <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[9px] font-black tracking-widest uppercase">TESLA KEY</span>
                </div>
                <div className="text-[7px] font-mono opacity-80">VERIFICATION_TOKEN</div>
             </motion.div>
         )}

         {activeScenario === 'sat-loss' && (
             <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/80 backdrop-blur p-4 rounded-2xl border border-slate-200">
                <div className={`w-3 h-3 rounded-full ${distanceFromShore < 20 ? 'bg-emerald-500' : (distanceFromShore < 45 ? 'bg-red-500' : 'bg-emerald-500')}`} />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                    {distanceFromShore < 20 ? 'VDE Range' : (distanceFromShore < 45 ? 'Blind Spot' : 'SAT Range')}
                </span>
             </div>
         )}
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100 shadow-sm">
           <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h4 className="text-xs font-black text-blue-900 uppercase tracking-widest">Protocol Logic Insight</h4>
           </div>
           <p className="text-sm text-blue-800 leading-relaxed italic font-medium">
               {activeScenario === 'sat-loss' 
                 ? "La logica Pulse dimostra come l'Edge Router non sia un semplice switch, ma un'entità intelligente capace di segmentazione MMTP. Se il raggio SAT è nullo, il pacchetto viene 'congelato' nel Medium-Term Buffer e riattivato solo dopo handshake con la Shore Base via VDE."
                 : activeScenario === 'cyber'
                 ? "Lo scenario Cyber Defense illustra l'autenticazione TESLA (Timed Efficient Stream Loss-tolerant Authentication). L'Edge Router genera pacchetti di autenticazione sincronizzati temporalmente che viaggiano sul VDE-TER. Se il pacchetto AIS non ha una chiave TESLA valida ricevuta correttamente dalla Shore Base, viene scartato per prevenire lo spoofing."
                 : "Seleziona uno scenario per analizzare il flusso dei protocolli in tempo reale."}
           </p>
        </div>
        
        <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-5"><ShieldCheck className="w-24 h-24" /></div>
           <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-6">Stack Transformation</h4>
           <div className="space-y-4">
              <div className="flex items-center justify-between text-[10px] font-bold">
                 <span className="text-slate-500">LAYER</span>
                 <span className="text-slate-500">PROTOCOL</span>
              </div>
              {[
                { l: 'Application', p: 'MMS Security Layer (SMMP)', a: pulsePacket?.layer === 'Application' },
                { l: 'Transport', p: 'MMTP / RMTP', a: pulsePacket?.layer === 'Transport' },
                { l: 'Network', p: 'Edge Routing / IP', a: pulsePacket?.layer === 'Physical' && pulsePacket.link === 'ip' },
                { l: 'Physical', p: 'AIS / VDE', a: pulsePacket?.layer === 'Physical' }
              ].map((row, i) => (
                <div key={i} className={`flex items-center justify-between p-3 rounded-xl border transition-all ${row.a ? 'bg-blue-600 border-blue-400 shadow-lg scale-105' : 'bg-white/5 border-white/5 opacity-40'}`}>
                   <span className="text-[9px] font-black uppercase tracking-tighter">{row.l}</span>
                   <span className="text-[9px] font-mono">{row.p}</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};
