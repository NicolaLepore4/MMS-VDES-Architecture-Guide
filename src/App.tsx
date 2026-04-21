/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Ship, 
  LandPlot, 
  Radio, 
  ArrowRight, 
  ShieldCheck, 
  Network, 
  Cpu, 
  Anchor, 
  Globe,
  Database,
  Lock,
  MessageSquare,
  Zap,
  Info,
  Layers,
  Layout,
  CircleX,
  BookOpen,
  ExternalLink,
  Activity,
  History,
  Radar,
  Tally5,
  RefreshCw,
  Waves,
  ChevronRight,
  ChevronsRight,
  Clock,
  Crosshair,
  Signal,
  Satellite,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

type ComponentId = 'agent' | 'edge-router' | 'vdes-modem' | 'vde-air' | 'shore-base' | 'shore-router' | 'dest-agent';

type Language = 'it' | 'en';

interface TranslationSet {
  title: string;
  subtitle: string;
  engineeringNote: string;
  securityCompliance: string;
  useCases: string;
  closeDocumentation: string;
  protocolArchitecture: string;
  bitLevelMapping: string;
  smartRoutingEnabled: string;
  encapsulationHierarchy: string;
  payloadSpecs: string;
  packetField: string;
  bitByteSize: string;
  logicDescription: string;
  referenceLibrary: string;
  innerCore: string;
  carrierLayer: string;
  middleware: string;
  ipLink: string;
  vdesLink: string;
  activeProtocol: string;
  details: string;
  smartRoutingNote: string;
  specification: string;
  vdesDescription: string;
  architectureView: string;
  vdesStructureView: string;
  frequency: string;
  channel: string;
  purpose: string;
  modulation: string;
  technology: string;
  upperLeg: string;
  lowerLeg: string;
  simplex: string;
  power: string;
  functioningLogic: string;
  routingLogic: string;
  messageBroker: string;
  storeAndForward: string;
  failoverMechanisms: string;
  confidentiality: string;
  integrity: string;
  availability: string;
  securityAnalysis: string;
  simulationView: string;
  activeScenario: string;
  satLossScenario: string;
  cyberScenario: string;
  startSimulation: string;
  stopSimulation: string;
  simEventLog: string;
  coastalRange: string;
  deepSea: string;
  shipStatus: string;
  linkStatus: string;
  securityStatus: string;
  priorityLevel: string;
  slowSpeed: string;
  normalSpeed: string;
  fastSpeed: string;
  pauseSim: string;
  resumeSim: string;
  rmodeTitle: string;
  pntTitle: string;
}

const TRANSLATIONS: Record<Language, TranslationSet> = {
  it: {
    title: "MMS / VDES Architecture Explorer",
    subtitle: "Analisi tecnica del flusso dati marittimo e dell'incapsulamento dei protocolli",
    engineeringNote: "MMS Engineering Note",
    securityCompliance: "Sicurezza e Conformità",
    useCases: "Casi d'Uso",
    closeDocumentation: "Chiudi Documentazione",
    protocolArchitecture: "Architettura del Protocollo",
    bitLevelMapping: "Mappatura a livello di bit & Incapsulamento",
    smartRoutingEnabled: "SMART ROUTING ABILITATO",
    encapsulationHierarchy: "Gerarchia di Incapsulamento Dati",
    payloadSpecs: "Specifiche del Payload",
    packetField: "Campo Pacchetto",
    bitByteSize: "Dimensione Bit/Byte",
    logicDescription: "Descrizione Logica",
    referenceLibrary: "Libreria di Riferimento",
    innerCore: "Inner Core",
    carrierLayer: "Carrier Layer",
    middleware: "Middleware",
    ipLink: "LINK IP",
    vdesLink: "LINK VDES",
    activeProtocol: "Protocollo Attivo",
    details: "Dettagli Architettura",
    smartRoutingNote: "Seleziona il link di comunicazione prioritario per il router di bordo.",
    specification: "Specifica Ufficiale",
    vdesDescription: "Struttura dei Canali VDES",
    architectureView: "Architettura di Flusso",
    vdesStructureView: "Struttura VDES",
    frequency: "Frequenza",
    channel: "Canale",
    purpose: "Scopo",
    modulation: "Modulazione",
    technology: "Tecnologia",
    upperLeg: "Upper Leg (Shore-to-Ship)",
    lowerLeg: "Lower Leg (Ship-to-Shore)",
    simplex: "Simplex / Direct",
    power: "Potenza",
    functioningLogic: "Logica di Funzionamento",
    routingLogic: "Logica di Routing Intelligente",
    messageBroker: "MMS Message Broker",
    storeAndForward: "Store & Forward",
    failoverMechanisms: "Meccanismi di Failover",
    confidentiality: "Confidenzialità",
    integrity: "Integrità",
    availability: "Disponibilità",
    securityAnalysis: "Analisi Sicurezza & Trust",
    simulationView: "Simulatore di Scenari",
    activeScenario: "Scenario Attivo",
    satLossScenario: "Perdita Segnale Satellitare",
    cyberScenario: "Difesa Cyber (Spoofing)",
    startSimulation: "Avvia Simulazione",
    stopSimulation: "Sospendi Simulazione",
    simEventLog: "Registro Eventi Live",
    coastalRange: "Zona Costiera",
    deepSea: "Alto Mare",
    shipStatus: "Stato Nave",
    linkStatus: "Stato Collegamenti",
    securityStatus: "Stato Sicurezza",
    priorityLevel: "Livello Priorità",
    slowSpeed: "Lento",
    normalSpeed: "Normale",
    fastSpeed: "Veloce",
    pauseSim: "Pausa",
    resumeSim: "Riprendi",
    rmodeTitle: "R-Mode & Backup PNT",
    pntTitle: "Ricezione GNSS & Clock",
    packetDecoder: "Packet Decoder Interattivo",
    decodePayload: "Decostruisci Payload",
    selectTemplate: "Seleziona Template",
    rawPayload: "Payload Originale (JSON)",
    layerSMMP: "Livello 3: SMMP (Sicurezza)",
    layerMMTP: "Livello 2: MMTP (Trasporto)",
    layerNMEA: "Livello 1: NMEA (Fisico)",
    encryptionKey: "Chiave di Firma",
    routingHeader: "Header di Routing",
    radioSentences: "Frasi Radio Modem",
    stackType: "Tipo di Pila Protocollare",
    vdesStack: "Pila VDES (Radio)",
    ethernetStack: "Pila Ethernet (IEC-61162-450)",
    backhaulStack: "Pila Backhaul (IP)",
    layerTransport: "Livello 2: MMTP / IP",
    layerPhysical: "Livello 1: Ethernet / UDP",
    endToEnd: "Fine-a-Fine",
    hopByHop: "Tratta-Tratta",
    protocolIndependenceTitle: "Perché SMMP e MMTP sono sempre presenti?",
    protocolIndependenceDesc: "SMMP e MMTP sono i livelli 'nativi' del sistema MMS. Garantiscono che l'identità (URN) e la sicurezza del messaggio rimangano invariate dalla sorgente alla destinazione, indipendentemente dal fatto che il messaggio viaggi via radio o via cavo. Solo i livelli 1 e 2 cambiano per adattarsi al mezzo fisico.",
    disclaimerTitle: "Disclaimer Legale e Informativo",
    disclaimerText: "Questo sito è uno strumento didattico e simulativo. I riferimenti a standard internazionali (IALA, IEC, ITU) e ad aziende del settore (es. Sternula) sono forniti esclusivamente a scopo illustrativo e informativo. Non esiste alcuna affiliazione ufficiale o sponsorizzazione. Tutti i marchi, i nomi dei prodotti e i loghi appartengono ai rispettivi proprietari.",
    educationalApp: "Applicazione a Scopo Educativo"
  },
  en: {
    title: "MMS / VDES Architecture Explorer",
    subtitle: "Technical analysis of maritime data flow and protocol encapsulation",
    engineeringNote: "MMS Engineering Note",
    securityCompliance: "Security Compliance",
    useCases: "Use Cases",
    closeDocumentation: "Close Documentation",
    protocolArchitecture: "Protocol Architecture",
    bitLevelMapping: "Bit-Level Mapping & Encapsulation",
    smartRoutingEnabled: "SMART ROUTING ENABLED",
    encapsulationHierarchy: "Data Encapsulation Hierarchy",
    payloadSpecs: "Payload Specifications",
    packetField: "Packet Field",
    bitByteSize: "Bit/Byte Size",
    logicDescription: "Logic Description",
    referenceLibrary: "Reference Library",
    innerCore: "Inner Core",
    carrierLayer: "Carrier Layer",
    middleware: "Middleware",
    ipLink: "IP LINK",
    vdesLink: "VDES LINK",
    activeProtocol: "Active Protocol",
    details: "Architecture Details",
    smartRoutingNote: "Select the priority communication link for the onboard router.",
    specification: "Official Specification",
    vdesDescription: "VDES Channel Structure",
    architectureView: "Flow Architecture",
    vdesStructureView: "VDES Structure",
    frequency: "Frequency",
    channel: "Channel",
    purpose: "Purpose",
    modulation: "Modulation",
    technology: "Technology",
    upperLeg: "Upper Leg (Shore-to-Ship)",
    lowerLeg: "Lower Leg (Ship-to-Shore)",
    simplex: "Simplex / Direct",
    power: "Power",
    functioningLogic: "Operational Logic",
    routingLogic: "Intelligent Routing Logic",
    messageBroker: "MMS Message Broker",
    storeAndForward: "Store & Forward",
    failoverMechanisms: "Failover Mechanisms",
    confidentiality: "Confidentiality",
    integrity: "Integrity",
    availability: "Availability",
    securityAnalysis: "Security & Trust Analysis",
    simulationView: "Scenario Simulator",
    activeScenario: "Active Scenario",
    satLossScenario: "Satellite Signal Loss",
    cyberScenario: "Cyber Defense (Spoofing)",
    startSimulation: "Start Simulation",
    stopSimulation: "Pause Simulation",
    simEventLog: "Live Event Log",
    coastalRange: "Coastal Range",
    deepSea: "Deep Sea",
    shipStatus: "Ship Status",
    linkStatus: "Links Status",
    securityStatus: "Security Status",
    priorityLevel: "Priority Level",
    slowSpeed: "Slow",
    normalSpeed: "Normal",
    fastSpeed: "Fast",
    pauseSim: "Pause",
    resumeSim: "Resume",
    rmodeTitle: "R-Mode & PNT Backup",
    pntTitle: "GNSS & Clock Reception",
    packetDecoder: "Interactive Packet Decoder",
    decodePayload: "Deconstruct Payload",
    selectTemplate: "Select Template",
    rawPayload: "Original Payload (JSON)",
    layerSMMP: "Level 3: SMMP (Security)",
    layerMMTP: "Level 2: MMTP (Transport)",
    layerNMEA: "Level 1: NMEA (Physical)",
    encryptionKey: "Signature Key",
    routingHeader: "Routing Header",
    radioSentences: "Radio Modem Sentences",
    stackType: "Protocol Stack Type",
    vdesStack: "VDES Stack (Radio)",
    ethernetStack: "Ethernet Stack (IEC-61162-450)",
    backhaulStack: "Backhaul Stack (IP)",
    layerTransport: "Level 2: MMTP / IP",
    layerPhysical: "Level 1: Ethernet / UDP",
    endToEnd: "End-to-End",
    hopByHop: "Hop-by-Hop",
    protocolIndependenceTitle: "Why are SMMP and MMTP always present?",
    protocolIndependenceDesc: "SMMP and MMTP are the 'native' MMS layers. They ensure the message's identity (URN) and security remain unchanged from source to destination, whether the message travels via radio or wire. Only levels 1 and 2 change to adapt to the physical medium.",
    disclaimerTitle: "Legal & Informational Disclaimer",
    disclaimerText: "This website is an educational and simulation tool. References to international standards (IALA, IEC, ITU) and industry companies (e.g., Sternula) are provided solely for illustrative and informational purposes. No official affiliation or sponsorship exists. All trademarks, product names, and logos belong to their respective owners.",
    educationalApp: "Educational Purpose Application"
  }
};

type LocalizedString = { it: string; en: string };

interface StepInfo {
  id: ComponentId;
  title: LocalizedString;
  subtitle: LocalizedString;
  details: LocalizedString[];
  protocol?: string;
  icon: React.ReactNode;
  resources?: Resource[];
  functioning?: {
    title: LocalizedString;
    steps: LocalizedString[];
  };
}

interface Resource {
  title: string;
  url: string;
  type: 'spec' | 'paper' | 'use-case' | 'industry';
}

// --- Simulation Components ---

interface SimPacket {
  id: string;
  type: 'SAR' | 'MET' | 'POS' | 'MALICIOUS' | 'TESLA';
  status: 'agent' | 'router' | 'link' | 'shore' | 'dest';
  link: 'vdes' | 'ip' | 'queued' | 'dropped';
  label: string;
  layer: 'Application' | 'Transport' | 'Physical' | 'Data';
  verified?: boolean;
  isTesla?: boolean;
}

const SimulationView = ({ lang }: { lang: Language }) => {
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
        'it': 'L\'applicazione genera un payload SMMP (Secure-JSON) firmato digitalmente.',
        'en': 'Application generates a digitally signed SMMP (Secure-JSON) payload.'
      },
      'router': {
        'it': scenario === 'cyber' ? 'L\'Edge Router genera un pacchetto TESLA per autenticare il flusso AIS.' : 'L\'Edge Router incapsula il pacchetto in MMTP e seleziona il link ottimale.',
        'en': scenario === 'cyber' ? 'Edge Router generates a TESLA packet to authenticate the AIS stream.' : 'Edge Router encapsulates packet in MMTP and selects optimal link.'
      },
      'link': {
        'it': 'Il dato viene modulato sul canale radio (VHF o SAT).',
        'en': 'Data is modulated on the radio channel (VHF or SAT).'
      },
      'shore': {
        'it': scenario === 'cyber' ? 'La Shore Base verifica la chiave TESLA ricevuta decalandola temporalmente.' : 'La Shore Base decapsula il pacchetto e verifica l\'identità MRN via MIR.',
        'en': scenario === 'cyber' ? 'Shore Base verifies the received TESLA key by temporally shifting it.' : 'Shore Base decapsulates packet and verifies MRN identity via MIR.'
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
                  {isSimRunning ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5" />}
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
                { l: 'Application', p: 'SMMP (JSON/CBOR)', a: pulsePacket?.layer === 'Application' },
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

interface Resource {
  title: string;
  url: string;
  type: 'spec' | 'paper' | 'use-case' | 'industry';
}

interface ProtocolInfo {
  id: string;
  name: string;
  description: LocalizedString;
  packetStructure: {
    field: string;
    description: LocalizedString;
    size?: string;
  }[];
  useCases: LocalizedString[];
  securityConsiderations: LocalizedString[];
  encapsulationStack?: string[];
  resources?: Resource[];
  functioning?: {
    title: LocalizedString;
    steps: LocalizedString[];
  };
}

// --- Data ---

const PROTOCOL_DATA: Record<string, ProtocolInfo> = {
  'SMMP': {
    id: 'smmp',
    name: 'SMMP (Secure Maritime Messaging Protocol)',
    description: {
      it: 'Protocollo di alto livello che garantisce l\'integrità end-to-end e il non ripudiamento dei messaggi marittimi.',
      en: 'High-level protocol ensuring end-to-end integrity and non-repudiation of maritime messages.'
    },
    encapsulationStack: ['Digital Signature', 'Payload (JSON/CBOR)', 'SMMP Header'],
    resources: [
      { title: 'IALA G1117: MMS Overview', url: 'https://www.navcen.uscg.gov/sites/default/files/pdf/AIS/G1117-Ed3.0-VHF-Data-Exchange-System-VDES-Overview.pdf', type: 'spec' },
      { title: 'VDES Authentication (ION Paper)', url: 'https://navi.ion.org/content/72/1/navi.681', type: 'paper' },
      { title: 'RTCM MMS Standard Update', url: 'https://www.sternula.com/news/rtcm-publishes-a-new-standard/', type: 'spec' },
      { title: 'Piloting S-124 Alerts via VDES', url: 'https://interreg-baltic.eu/project-pilots/madame/from-plotting-to-piloting-delivering-s-124-navigational-warnings-over-vdes-mms-pilot-in-denmark/', type: 'use-case' }
    ],
    packetStructure: [
      { field: 'Source MRN', description: { it: 'Identità univoca della nave mittente (Maritime Resource Name).', en: 'Unique identity of the sending vessel (Maritime Resource Name).' }, size: 'Variable' },
      { field: 'Body Type', description: { it: 'Definisce la grammatica del contenuto (es. VTS_Report_v1).', en: 'Defines the content grammar (e.g., VTS_Report_v1).' }, size: '1 byte' },
      { field: 'Encrypted Data', description: { it: 'Payload cifrato con algoritmo AES-256-GCM.', en: 'Payload encrypted with AES-256-GCM algorithm.' }, size: 'Up to 1MB' },
      { field: 'Auth Tag/MAC', description: { it: 'Tag di autenticazione per validare il mittente e il dato.', en: 'Authentication tag to validate the sender and data.' }, size: '128 bits' }
    ],
    useCases: [
      { it: "Trasmissione di piani di rotta sensibili.", en: "Transmission of sensitive route plans." },
      { it: "Autorizzazioni portuali e clearing doganale.", en: "Port authorizations and customs clearing." },
      { it: "Comunicazioni critiche nave-nave per prevenzione collisioni.", en: "Critical ship-to-ship communications for collision avoidance." }
    ],
    securityConsiderations: [
      { it: "Protezione delle chiavi private in hardware sicuro (HSM/TEE).", en: "Protection of private keys in secure hardware (HSM/TEE)." },
      { it: "Validazione costante tramite Maritime Identity Registry (MIR).", en: "Constant validation via Maritime Identity Registry (MIR)." },
      { it: "Meccanismi di revoca immediata dei certificati compromessi.", en: "Immediate revocation mechanisms for compromised certificates." }
    ]
  },
  'MMTP': {
    id: 'mmtp',
    name: 'MMTP (Maritime Messaging Transport Protocol)',
    description: {
      it: 'Protocollo di trasporto ottimizzato per link marittimi instabili, basato su logica Publish/Subscribe.',
      en: 'Transport protocol optimized for unstable maritime links, based on Publish/Subscribe logic.'
    },
    encapsulationStack: ['SMMP (Full Package)', 'MMTP Header'],
    resources: [
      { title: 'MCP Concept (Maritime Connectivity)', url: 'https://maritimeconnectivity.net/wp-content/uploads/2023/02/MCP-Concept-v2.pdf', type: 'spec' },
      { title: 'Sternula: Leading MMS Operator', url: 'https://www.sternula.com/', type: 'industry' },
      { title: 'Sternula MMS Proxy Shore', url: 'https://www.sternula.com/sternula-mms-proxy-shore/', type: 'industry' },
      { title: 'IALA MCP Test Instance', url: 'https://www.iala.int/technical/mcp-test-instance/', type: 'use-case' }
    ],
    packetStructure: [
      { field: 'Version', description: { it: 'Versione del protocollo per retro-compatibilità.', en: 'Protocol version for backward compatibility.' }, size: '4 bits' },
      { field: 'Recipient MRN', description: { it: 'MRN del destinatario o del Gateway di routing.', en: 'Recipient MRN or routing Gateway.' }, size: 'Variable' },
      { field: 'QoS Flags', description: { it: 'Priorità e politiche di Store-and-Forward.', en: 'Priority and Store-and-Forward policies.' }, size: '1 byte' },
      { field: 'Packet ID', description: { it: 'ID unico per la gestione dei duplicati e riassemblaggio.', en: 'Unique ID for duplicate management and reassembly.' }, size: '2 bytes' }
    ],
    useCases: [
      { it: "Canale sicuro per notifiche meteo e avvisi ai naviganti.", en: "Secure channel for weather notifications and notices to mariners." },
      { it: "Bufferizzazione messaggi durante navigazione oceanica (SAT-only).", en: "Message buffering during oceanic navigation (SAT-only)." },
      { it: "Routing multi-hop attraverso stazioni Shore-Base concatenate.", en: "Multi-hop routing through chained Shore-Base stations." }
    ],
    securityConsiderations: [
      { it: "Saturazione del broker tramite pacchetti malformati (DoS).", en: "Broker saturation via malformed packets (DoS)." },
      { it: "Analisi del traffico tramite i metadati di routing visibili.", en: "Traffic analysis through visible routing metadata." },
      { it: "Necessità di autenticazione mutua tra nodi Edge e Shore.", en: "Need for mutual authentication between Edge and Shore nodes." }
    ]
  },
  'IEC 61162-450': {
    id: 'lwe',
    name: 'IEC 61162-450 (Lightweight Ethernet)',
    description: {
      it: 'Protocollo standard per la distribuzione di dati marittimi su reti LAN Ethernet Gigabit.',
      en: 'Standard protocol for distributing maritime data over Gigabit Ethernet LANs.'
    },
    encapsulationStack: ['MMTP Data', 'LWE (UdPb+) Header', 'UDP/IP', 'Ethernet'],
    resources: [
      { title: 'IEC 61162-450: LWE Standard', url: 'https://webstore.iec.ch/publication/60907', type: 'spec' },
      { title: 'VDES Integration in Ship Projects', url: 'https://prepare-ships.eu/media/2022/06/IEC-TC80-WG15-Mtg43-PrepareShips-Saab-rev-1.pdf', type: 'industry' },
      { title: 'Technical Specification Example', url: 'https://adr-docs.karlerss.com/qkDaWKQe3oCOzFLLHvD6ulhK1CKC4emN/Annex%201%20Technical%20Specification.pdf', type: 'paper' }
    ],
    packetStructure: [
      { field: 'NMEA TAG Block', description: { it: 'Metadati NMEA per identificazione sorgente e timestamp.', en: 'NMEA metadata for source identification and timestamp.' }, size: 'Variable' },
      { field: 'Destination Port', description: { it: 'Porta multicast standard per il gruppo marittimo.', en: 'Standard multicast port for the maritime group.' }, size: '2 bytes' },
      { field: 'UdPb+ Header', description: { it: 'Identificatore di pacchetto ed etichetta di servizio marittimo.', en: 'Packet identifier and maritime service label.' }, size: 'Variable' },
      { field: 'Checksum (FCS)', description: { it: 'Controllo ciclico di ridondanza (CRC) per la trama fisica.', en: 'Cyclic Redundancy Check (CRC) for the physical frame.' }, size: '2 bytes' }
    ],
    useCases: [
      { it: "Connessione tra MMS Router e radar/sensori di bordo.", en: "Connection between MMS Router and onboard radar/sensors." },
      { it: "Distribuzione centralizzata di dati GNSS alla plancia.", en: "Centralized distribution of GNSS data to the bridge." },
      { it: "Monitoraggio integrato dei sistemi nave (Shore-to-Ship link).", en: "Integrated monitoring of ship systems (Shore-to-Ship link)." }
    ],
    securityConsiderations: [
      { it: "Mancanza di crittografia nativa (richiede isolamento fisico/VLAN).", en: "Lack of native encryption (requires physical isolation/VLAN)." },
      { it: "Rischio di spoofing di sorgenti dati critiche all'interno della LAN.", en: "Risk of spoofing critical data sources within the LAN." },
      { it: "Necessità di firewalling verso reti non-operational (es. Crew Wi-Fi).", en: "Need for firewalling towards non-operational networks (e.g., Crew Wi-Fi)." }
    ]
  },
  'VDES': {
    id: 'vde',
    name: 'VDES (VHF Data Exchange System)',
    description: {
      it: 'Sistema radio di nuova generazione che integra AIS e ASM con canali dati ad alta velocità (VDE).',
      en: 'Next-generation radio system integrating AIS and ASM with high-speed data channels (VDE).'
    },
    encapsulationStack: ['MMS Data Segment', 'Data Link Layer (FEC)', 'TDMA Access', 'VHF Carrier'],
    resources: [
      { title: 'ITU Rec. M.2092 (Technical Standard)', url: 'https://www.itu.int/rec/R-REC-M.2092', type: 'spec' },
      { title: 'IALA VDES FAQ & Connectivity', url: 'https://www.iala.int/technical/connectivity/vdes-vhf-data-exchange-system/', type: 'industry' },
      { title: 'VDES Technology Roadmap', url: 'https://apps.dtic.mil/sti/trecms/pdf/AD1135170.pdf', type: 'spec' },
      { title: 'VDE-Terrestrial Channel Assessment', url: 'https://www.researchgate.net/publication/374517832_VDE-Terrestrial_Channel_Performance_Assessment', type: 'paper' },
      { title: 'VDE-SAT Performance Analysis', url: 'https://www.researchgate.net/publication/371358560_VDE-SAT_Link_ID_20_performance_assessment_under_different_random_access_conditions', type: 'paper' },
      { title: 'R-Mode Positioning Performance', url: 'https://elib.dlr.de/199225/1/navigation2021.pdf', type: 'paper' },
      { title: 'IHO Report on e-Navigation', url: 'https://legacy.iho.int/mtg_docs/com_wg/NIPWG/NIPWG5/Report-e-Navigation-Underway-International-2018-final.pdf', type: 'industry' },
      { title: 'Sternula: Satellite MMS Connectivity', url: 'https://www.sternula.com/', type: 'industry' }
    ],
    packetStructure: [
      { field: 'Training Bits', description: { it: 'Sequenza fissa per la sincronizzazione del ricevitore.', en: 'Fixed sequence for receiver synchronization.' }, size: '24 bits' },
      { field: 'Slot Number', description: { it: 'Intervallo temporale assegnato per la trasmissione radio.', en: 'Time slot assigned for radio transmission.' }, size: 'NA' },
      { field: 'FEC bits', description: { it: 'Ridondanza per la correzione degli errori di segnale radio.', en: 'Redundancy for radio signal error correction.' }, size: 'Variable' },
      { field: 'Channel ID', description: { it: 'Identificativo del canale logico (VDE1, VDE2, ecc.).', en: 'Logical channel identifier (VDE1, VDE2, etc.).' }, size: '4 bits' }
    ],
    useCases: [
      { it: "Trasmissione messaggi di testo e binari via radio VHF.", en: "Transmission of text and binary messages via VHF radio." },
      { it: "Update satellitare dei sistemi di navigazione in alto mare.", en: "Satellite update of navigation systems on the high seas." },
      { it: "Supporto alla navigazione autonoma tramite link VDE-SAT.", en: "Autonomous navigation support via VDE-SAT link." }
    ],
    securityConsiderations: [
      { it: "Disturbo intenzionale del segnale (Jamming) a lungo raggio.", en: "Intentional long-range signal jamming." },
      { it: "Intercettazione dei dati radio (richiede cifratura SMMP superiore).", en: "Interception of radio data (requires upper-layer SMMP encryption)." },
      { it: "Saturazione dei time-slot radio tramite spoofing AIS.", en: "Radio time-slot saturation via AIS spoofing." }
    ]
  }
};

interface VdesChannelInfo {
  id: string;
  name: string;
  type: 'AIS' | 'ASM' | 'VDE-TER' | 'VDE-SAT';
  leg: 'upper' | 'lower' | 'simplex';
  frequency: string;
  channel: string;
  bandwidth: string;
  modulation: string;
  power: string;
  accessMethod: string;
  details: LocalizedString[];
  protocol: string;
  security: {
    confidentiality: LocalizedString;
    integrity: LocalizedString;
    availability: LocalizedString;
    notes: LocalizedString;
  };
}

const VDES_STRUCTURE_DATA: VdesChannelInfo[] = [
  {
    id: 'ais1',
    name: 'AIS 1',
    type: 'AIS',
    leg: 'simplex',
    frequency: '161.975 MHz',
    channel: 'CH 2087',
    bandwidth: '25 kHz',
    modulation: 'GMSK',
    power: '12.5W / 2W',
    accessMethod: 'SOTDMA',
    protocol: 'AIS',
    details: [
      { it: "Standard AIS legacy per messaggi di posizione classe A/B.", en: "Legacy AIS standard for class A/B position messages." },
      { it: "Critico per la sicurezza: navigazione e anticollisione.", en: "Critical for safety: navigation and collision avoidance." }
    ],
    security: {
      confidentiality: { it: "Nessuna (Broadcast pubblico)", en: "None (Public Broadcast)" },
      integrity: { it: "Bassa (Checksum CRC16, no firma)", en: "Low (CRC16 Checksum, no signature)" },
      availability: { it: "Alta (SOTDMA), ma vulnerabile a Jamming/Spoofing", en: "High (SOTDMA), but vulnerable to Jamming/Spoofing" },
      notes: { it: "Il protocollo AIS originale non prevede sicurezza crittografica. L'integrità è garantita solo a livello di errore bit.", en: "Original AIS protocol lacks cryptographic security. Integrity is only guaranteed at bit-error level." }
    }
  },
  {
    id: 'ais2',
    name: 'AIS 2',
    type: 'AIS',
    leg: 'simplex',
    frequency: '162.025 MHz',
    channel: 'CH 2088',
    bandwidth: '25 kHz',
    modulation: 'GMSK',
    power: '12.5W / 2W',
    accessMethod: 'SOTDMA',
    protocol: 'AIS',
    details: [
      { it: "Canale secondario per ridondanza e gestione slot TDMA.", en: "Secondary channel for redundancy and TDMA slot management." },
      { it: "Utilizzato per messaggi critici di sicurezza della navigazione.", en: "Used for critical navigation safety messages." }
    ],
    security: {
      confidentiality: { it: "Nessuna (Ricezione libera)", en: "None (Free Reception)" },
      integrity: { it: "Bassa (Checksum legacy)", en: "Low (Legacy Checksum)" },
      availability: { it: "Sempre attivo (Safety standard)", en: "Always active (Safety standard)" },
      notes: { it: "Richiede l'uso di MMS/SMMP per aggiungere strati di identità certificata.", en: "Requires MMS/SMMP to add certified identity layers." }
    }
  },
  {
    id: 'asm1',
    name: 'ASM 1',
    type: 'ASM',
    leg: 'simplex',
    frequency: '161.950 MHz',
    channel: 'CH 2027',
    bandwidth: '25 kHz',
    modulation: 'π/4-QPSK / 8-PSK',
    power: '12.5W',
    accessMethod: 'RATDMA / FATDMA',
    protocol: 'ASM',
    details: [
      { it: "Application Specific Messages (ASM) per dati non legati alla posizione.", en: "Application Specific Messages (ASM) for non-position data." },
      { it: "Efficienza spettrale migliorata rispetto all'AIS classico.", en: "Improved spectral efficiency compared to classic AIS." }
    ],
    security: {
      confidentiality: { it: "Selettiva (supporta payload cifrati SMMP)", en: "Selective (supports SMMP encrypted payloads)" },
      integrity: { it: "Alta (tramite firma digitale dell'MMS Agent)", en: "High (via MMS Agent digital signature)" },
      availability: { it: "Ottima (TDMA dedicato)", en: "Excellent (Dedicated TDMA)" },
      notes: { it: "Progettato per messaggi binari sicuri; previene l'intercettazione dei dati sensibili non-AIS.", en: "Designed for secure binary messages; prevents interception of sensitive non-AIS data." }
    }
  },
  {
    id: 'asm2',
    name: 'ASM 2',
    type: 'ASM',
    leg: 'simplex',
    frequency: '162.000 MHz',
    channel: 'CH 2028',
    bandwidth: '25 kHz',
    modulation: 'π/4-QPSK / 8-PSK',
    power: '12.5W',
    accessMethod: 'RATDMA / FATDMA',
    protocol: 'ASM',
    details: [
      { it: "Canale dedicato per messaggi binari marittimi complessi.", en: "Dedicated channel for complex maritime binary messages." },
      { it: "Supporto per query marittime e risposte automatizzate.", en: "Support for maritime queries and automated responses." }
    ],
    security: {
      confidentiality: { it: "Alta (Cifratura End-to-End)", en: "High (End-to-End Encryption)" },
      integrity: { it: "Verificata (MRN Identity Check)", en: "Verified (MRN Identity Check)" },
      availability: { it: "Robusta contro interferenze co-canale", en: "Robust against co-channel interference" },
      notes: { it: "Indispensabile per il 'closed group messaging' tra navi flotta o autorità.", en: "Indispensable for 'closed group messaging' between fleet ships or authorities." }
    }
  },
  {
    id: 'vdeter-lower',
    name: 'VDE-TER Lower',
    type: 'VDE-TER',
    leg: 'lower',
    frequency: '157.200 - 157.325 MHz',
    channel: 'CH 1024-1026, 1084-1086',
    bandwidth: '50/100 kHz',
    modulation: 'π/4-QPSK / 8-PSK / 16-QAM',
    power: 'Varies',
    accessMethod: 'CSMA / TDMA',
    protocol: 'VDES',
    details: [
      { it: "Trasmissione Nave-verso-Terra (Uplink).", en: "Ship-to-Shore transmission (Uplink)." },
      { it: "Supporta burst di dati ad alta velocità per report complessi.", en: "Supports high-speed data bursts for complex reports." }
    ],
    security: {
      confidentiality: { it: "Opzionale (supporta AES-256 via SMMP)", en: "Optional (supports AES-256 via SMMP)" },
      integrity: { it: "Certificata (Ed25519 o RSA signatures)", en: "Certified (Ed25519 or RSA signatures)" },
      availability: { it: "Adattiva (Modulazione variabile)", en: "Adaptive (Variable modulation)" },
      notes: { it: "Il backbone dell'e-Navigation; la cifratura del payload è opzionale ma raccomandata per dati sensibili. L'autenticazione MRN rimane il pilastro del trust.", en: "The e-Navigation backbone; payload encryption is optional but recommended for sensitive data. MRN authentication remains the pillar of trust." }
    }
  },
  {
    id: 'vdeter-upper',
    name: 'VDE-TER Upper',
    type: 'VDE-TER',
    leg: 'upper',
    frequency: '161.800 - 161.925 MHz',
    channel: 'CH 2024-2026, 2084-2086',
    bandwidth: '50/100 kHz',
    modulation: 'π/4-QPSK / 8-PSK / 16-QAM',
    power: 'Higher (Shore Base)',
    accessMethod: 'Scheduled (Broadcast)',
    protocol: 'VDES',
    details: [
      { it: "Trasmissione Terra-verso-Nave (Downlink).", en: "Shore-to-Ship transmission (Downlink)." },
      { it: "Update di massa per carte elettroniche e bollettini.", en: "Bulk updates for electronic charts and bulletins." }
    ],
    security: {
      confidentiality: { it: "Opzionale (Cifratura di gruppo autorità/nave)", en: "Optional (Authority-to-Ship group encryption)" },
      integrity: { it: "Hardware enforced (HSM a terra)", en: "Hardware enforced (Shore HSM)" },
      availability: { it: "Priorità costante per messaggi d'urgenza", en: "Constant priority for urgency messages" },
      notes: { it: "Canale per la distribuzione di correzioni cartografiche; la cifratura non è obbligatoria per permettere la ricezione aperta di bollettini meteo pubblici.", en: "Channel for distribution of cartographic corrections; encryption is not mandatory to allow open reception of public weather bulletins." }
    }
  },
  {
    id: 'vdesat-up',
    name: 'VDE-SAT Uplink',
    type: 'VDE-SAT',
    leg: 'lower',
    frequency: '157.1875 - 157.3375 MHz',
    channel: 'MSS Upstream',
    bandwidth: '50/100 kHz',
    modulation: 'π/4-QPSK',
    power: 'Satellite Optimized',
    accessMethod: 'Random Access / Slotted ALOHA',
    protocol: 'VDES',
    details: [
      { it: "Link dalla nave verso la costellazione satellitare.", en: "Link from the ship to the satellite constellation." },
      { it: "Gestione attiva del Doppler per velocità orbitale.", en: "Active Doppler management for orbital velocity." }
    ],
    security: {
      confidentiality: { it: "Cifratura Sat-Link nativa + SMMP", en: "Native Sat-Link encryption + SMMP" },
      integrity: { it: "Resiliente (Multiprodocol integrity checks)", en: "Resilient (Multiprotocol integrity checks)" },
      availability: { it: "Globale (immune da interferenze terrestri)", en: "Global (immune from terrestrial interference)" },
      notes: { it: "Consente la connettività MMS anche in mezzo all'oceano con standard di sicurezza elevati.", en: "Enables MMS connectivity even in the middle of the ocean with high security standards." }
    }
  },
  {
    id: 'vdesat-down',
    name: 'VDE-SAT Downlink',
    type: 'VDE-SAT',
    leg: 'upper',
    frequency: '161.7875 - 161.9375 MHz',
    channel: 'MSS Downstream',
    bandwidth: '50/100 kHz',
    modulation: 'π/4-QPSK',
    power: 'Space Segment',
    accessMethod: 'TDM',
    protocol: 'VDES',
    details: [
      { it: "Ricezione satellitare globale in mare aperto.", en: "Global satellite reception in the open sea." },
      { it: "Copertura mondiale per servizi MMS non terrestri.", en: "Worldwide coverage for non-terrestrial MMS services." }
    ],
    security: {
      confidentiality: { it: "Oscuramento payload satellitare", en: "Satellite payload obfuscation" },
      integrity: { it: "End-to-End verified (Ship Agent side)", en: "End-to-End verified (Ship Agent side)" },
      availability: { it: "Resilienza orbitale (Costellazione LEOS)", en: "Orbital resilience (LEOS constellation)" },
      notes: { it: "Protegge i dati delle autorità da intercettazioni maligne nello spazio VHF.", en: "Protects authority data from malicious interceptions in VHF space." }
    }
  }
];

const VdesStructureDiagram = ({ onChannelClick, lang }: { onChannelClick: (ch: VdesChannelInfo) => void, lang: Language }) => {
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

const ARCHITECTURE_STEPS: StepInfo[] = [
  {
    id: 'agent',
    title: { it: "MMS Agent", en: "MMS Agent" },
    subtitle: { it: "Applicazione di Bordo", en: "Onboard Application" },
    protocol: 'SMMP',
    icon: <Cpu className="w-6 h-6" />,
    resources: [
      { title: 'IALA G1117: VDES & MMS Overview', url: 'https://www.navcen.uscg.gov/sites/default/files/pdf/AIS/G1117-Ed3.0-VHF-Data-Exchange-System-VDES-Overview.pdf', type: 'spec' },
      { title: 'IALA G1139: The Maritime Connectivity Platform', url: 'https://www.iala.int/technical/connectivity/the-maritime-connectivity-platform/', type: 'spec' }
    ],
    details: [
      { it: "Processo: L'app passa l'oggetto dati (es. rotta) all'MMS Agent tramite libreria locale.", en: "Process: The app passes the data object (e.g. route) to the MMS Agent via local library." },
      { it: "Cifratura: L'Agent firma il messaggio con il certificato privato (MRN) assicurando che solo il destinatario con la chiave pubblica possa validarlo.", en: "Encryption: The Agent signs the message with the private certificate (MRN) ensuring only the recipient with the public key can validate it." },
      { it: "Involucro: Viene creato un 'Secure Package' che incapsula il contenuto originale.", en: "Encapsulation: A 'Secure Package' is created, encapsulating the original content." },
      { it: "Identità: La validazione avviene interrogando il MIR per confermare che l'MRN sia autorizzato e attivo.", en: "Identity: Validation occurs by querying the MIR to confirm that the MRN is authorized and active." }
    ],
    functioning: {
      title: { it: "Analisi Operativa Agente MMS", en: "MMS Agent Operational Analysis" },
      steps: [
        { it: "Generazione Identità: L'agente recupera le chiavi crittografiche associate all'MRN della nave dal modulo di sicurezza di bordo.", en: "Identity Generation: The agent retrieves cryptographic keys associated with the vessel's MRN from the onboard security module." },
        { it: "Firma e Integrità: Applica una firma digitale SMMP al payload, garantendo l'origine e l'inalterabilità del dato durante il transito.", en: "Signature & Integrity: Applies an SMMP digital signature to the payload, ensuring origin and unalterability of the data during transit." },
        { it: "Handshake Locale: Negozia la connessione con l'Edge Router per lo scarico dei messaggi in coda.", en: "Local Handshake: Negotiates connection with the Edge Router for offloading queued messages." }
      ]
    }
  },
  {
    id: 'edge-router',
    title: { it: "MMS Edge Router (Ship)", en: "MMS Edge Router (Ship)" },
    subtitle: { it: "Local Message Broker", en: "Local Message Broker" },
    protocol: 'MMTP',
    icon: <Network className="w-6 h-6" />,
    resources: [
      { title: 'IALA G1117: MMS Architecture', url: 'https://www.navcen.uscg.gov/sites/default/files/pdf/AIS/G1117-Ed3.0-VHF-Data-Exchange-System-VDES-Overview.pdf', type: 'spec' },
      { title: 'MMTP Specification (MCP Core)', url: 'https://maritimeconnectivity.net/wp-content/uploads/2023/02/MCP-Concept-v2.pdf', type: 'spec' }
    ],
    details: [
      { it: "Interfacce di Comunicazione: Supporta link IP (VSAT, 4G/5G, Wi-Fi) e canali radio VDES (AIS, ASM, VDE-TER, VDE-SAT).", en: "Communication Interfaces: Supports IP links (VSAT, 4G/5G, Wi-Fi) and VDES radio channels (AIS, ASM, VDE-TER, VDE-SAT)." },
      { it: "Iscrizione (Pub/Sub): L'Agent si registra al Router per inviare/ricevere messaggi su 'topic' specifici.", en: "Subscription (Pub/Sub): The Agent registers with the Router to send/receive messages on specific 'topics'." },
      { it: "Smart Routing: Sceglie automaticamente tra VDE-TER (costiero) e VDE-SAT (alto mare) o canali IP se disponibili.", en: "Smart Routing: Automatically chooses between VDE-TER (coastal) and VDE-SAT (high seas) or IP channels if available." },
      { it: "Accodamento Store & Forward: Se nessun link è attivo, salva il pacchetto MMTP in memoria locale fino al ripristino del segnale.", en: "Store & Forward Queuing: If no link is active, it saves the MMTP packet in local memory until the signal is restored." }
    ],
    functioning: {
      title: { it: "Analisi Funzionamento Edge Router", en: "Edge Router Operational Analysis" },
      steps: [
        { it: "Monitoraggio Link: Il router scansiona costantemente i canali VDE e i link IP, misurando latenza e potenza del segnale.", en: "Link Monitoring: The router constantly scans VDE channels and IP links, measuring latency and signal strength." },
        { it: "Selezione Dinamica: In base alla priorità del messaggio (Safety vs Operational), decide se usare il link radio a costo zero (VDES) o il link satellitare dati (VSAT).", en: "Dynamic Selection: Based on message priority (Safety vs Operational), it decides whether to use the zero-cost radio link (VDES) or the satellite data link (VSAT)." },
        { it: "Smistamento Pacchetti: Incapsula i dati SMMP in contenitori MMTP ottimizzati per il link scelto, gestendo frammentazione e buffering.", en: "Packet Sorting: Encapsulates SMMP data in MMTP containers optimized for the chosen link, managing fragmentation and buffering." }
      ]
    }
  },
  {
    id: 'vdes-modem',
    title: { it: "VDES Controller / PI", en: "VDES Controller / PI" },
    subtitle: { it: "Interfaccia Radio", en: "Radio Interface" },
    protocol: 'IEC 61162-450',
    icon: <Radio className="w-6 h-6" />,
    resources: [
      { title: 'IEC 61162-450: LWE Standard', url: 'https://webstore.iec.ch/publication/60907', type: 'spec' },
      { title: 'NMEA OneNet & VDES Interaction', url: 'https://nmea.org/nmea-onenet/', type: 'industry' }
    ],
    details: [
      { it: "Incapsulamento Ethernet: I pacchetti MMTP sono inseriti in frame UDP Multicast secondo lo standard IEC 61162-450.", en: "Ethernet Encapsulation: MMTP packets are inserted into UDP Multicast frames according to the IEC 61162-450 standard." },
      { it: "Traduzione NMEA: La Presentation Interface (PI) 'spezza' il dato binario in stringhe ASCII standardizzate (frasi NMEA).", en: "NMEA Translation: The Presentation Interface (PI) 'splits' binary data into standardized ASCII strings (NMEA sentences)." },
      { it: "Sincronizzazione: Il modem assicura che i dati siano pronti per il 'Time Slot' VDE corretto (protocollo TDMA).", en: "Synchronization: The modem ensures data is ready for the correct VDE 'Time Slot' (TDMA protocol)." },
      { it: "Checksum: Viene aggiunto un controllo di errore a livello NMEA per garantire l'integrità dei dati via cavo.", en: "Checksum: An error check is added at the NMEA level to ensure data integrity over the cable." }
    ],
    functioning: {
      title: { it: "Analisi Logica Controller VDES", en: "VDES Controller Logical Analysis" },
      steps: [
        { it: "Frammentazione MMTP: Divide il pacchetto MMTP in segmenti NMEA (frasi !VD??) compatibili con il bit-rate radio.", en: "MMTP Fragmentation: Splits the MMTP packet into NMEA segments (!VD?? sentences) compatible with the radio bit-rate." },
        { it: "Bufferizzazione TDMA: Sincronizza l'invio dei dati con il clock GPS per colpire esattamente lo slot temporale assegnato.", en: "TDMA Buffering: Synchronizes data sending with the GPS clock to strike the assigned time slot exactly." },
        { it: "Controllo Flusso: Regola la velocità di trasmissione verso il modem fisico per evitare overflow dei buffer radio.", en: "Flow Control: Regulates the transmission speed to the physical modem to avoid radio buffer overflow." }
      ]
    }
  },
  {
    id: 'vde-air',
    title: { it: "VDES Network (Over-the-Air)", en: "VDES Network (Over-the-Air)" },
    subtitle: { it: "Trasmissione Link Layer", en: "Link Layer Transmission" },
    protocol: 'VDES',
    icon: <Zap className="w-6 h-6" />,
    resources: [
      { title: 'ITU-R M.2092-1: Technical characteristics for VDES', url: 'https://www.itu.int/rec/R-REC-M.2092', type: 'spec' },
      { title: 'IALA G1139: VDES Technical Standards', url: 'https://www.iala.int/technical/connectivity/vdes-vhf-data-exchange-system/', type: 'spec' }
    ],
    details: [
      { it: "Modulazione Radio: I dati digitali sono convertiti in segnali radio VHF modulati (es. QPSK o 16-QAM).", en: "Radio Modulation: Digital data is converted into modulated VHF radio signals (e.g., QPSK or 16-QAM)." },
      { it: "Frammentazione: Il modem divide il messaggio in piccoli blocchi radio ottimizzati per resistere alle interferenze marine.", en: "Fragmentation: The modem divides the message into small radio blocks optimized to withstand marine interference." },
      { it: "Link Layer: Vengono aggiunti byte di Forward Error Correction (FEC) per ricostruire pacchetti persi durante la navigazione.", en: "Link Layer: Forward Error Correction (FEC) bytes are added to reconstruct packets lost during navigation." },
      { it: "Trasparenza: Lo strato radio non legge il contenuto SMMP/MMTP, agisce solo come un 'tunnel' di trasporto.", en: "Transparency: The radio layer does not read the SMMP/MMTP content, it only acts as a transport 'tunnel'." }
    ],
    functioning: {
      title: { it: "Analisi Trasmissione Fisica", en: "Physical Transmission Analysis" },
      steps: [
        { it: "Adaptive Modulation: Sistema che adegua la velocità (QPSK -> 16QAM) in base alle condizioni meteorologiche mare/aria.", en: "Adaptive Modulation: System that adjusts speed (QPSK -> 16QAM) based on sea/air weather conditions." },
        { it: "Forward Error Correction: Inserisce bit ridondanti per permettere al ricevitore di correggere errori causati da multi-path e rumore.", en: "Forward Error Correction: Inserts redundant bits to allow the receiver to correct errors caused by multi-path and noise." },
        { it: "Slot Management: Gestisce la collisione dei pacchetti in aree ad alta densità (es. Stretto di Singapore).", en: "Slot Management: Manages packet collisions in high-density areas (e.g., Singapore Strait)." }
      ]
    }
  },
  {
    id: 'shore-base',
    title: { it: "VDES Shore Station", en: "VDES Shore Station" },
    subtitle: { it: "Punto di Ricezione Terrestre", en: "Terrestrial Reception Point" },
    protocol: 'VDES',
    icon: <Database className="w-6 h-6" />,
    resources: [
      { title: 'IALA G1139: Shore Station Guidelines', url: 'https://www.iala.int/technical/connectivity/vdes-vhf-data-exchange-system/', type: 'spec' },
      { title: 'VDE-Terrestrial Performance Assessment', url: 'https://www.researchgate.net/publication/374517832_VDE-Terrestrial_Channel_Performance_Assessment', type: 'paper' }
    ],
    details: [
      { it: "De-modulazione: La stazione base riceve le onde radio e le riconverte in bit digitali.", en: "Demodulation: The base station receives radio waves and converts them back into digital bits." },
      { it: "Riassemblaggio: Le frasi NMEA ricevute via radio vengono ricomposte per formare il pacchetto MMTP originale.", en: "Reassembly: NMEA sentences received via radio are recomposed to form the original MMTP packet." },
      { it: "Connessione Backhaul: I dati vengono instradati via fibra ottica o reti terrestri verso il cloud MMS.", en: "Backhaul Connection: Data is routed via optical fiber or terrestrial networks to the MMS cloud." },
      { it: "Monitoraggio: La stazione di terra logga la qualità del segnale (RSSI) per ottimizzare la rete costiera.", en: "Monitoring: The shore station logs signal quality (RSSI) to optimize the coastal network." }
    ],
    functioning: {
      title: { it: "Analisi Ricezione Terrestre", en: "Terrestrial Reception Analysis" },
      steps: [
        { it: "Signal Cleaning: Filtra il rumore elettromagnetico costiero per isolare i burst di dati VDES deboli dalla nave lontana.", en: "Signal Cleaning: Filters coastal electromagnetic noise to isolate weak VDES data bursts from distant ships." },
        { it: "Ack Generation: Se richiesto, genera un messaggio di ricevuta radio (ACK) da inviare alla nave nel primo slot disponibile.", en: "Ack Generation: If requested, generates a radio acknowledgment (ACK) to be sent to the ship in the first available slot." },
        { it: "IP Gateway: Converte il flusso seriale radio in pacchetti TCP/IP standard per la rete MMTP core.", en: "IP Gateway: Converts the radio serial stream into standard TCP/IP packets for the core MMTP network." }
      ]
    }
  },
  {
    id: 'shore-router',
    title: { it: "Shore Router Network", en: "Shore Router Network" },
    subtitle: { it: "Distribuzione Terrestre", en: "Terrestrial Distribution" },
    protocol: 'MMTP',
    icon: <Globe className="w-6 h-6" />,
    resources: [
      { title: 'IALA G1139: MCP Guidelines', url: 'https://maritimeconnectivity.net/wp-content/uploads/2023/02/MCP-Concept-v2.pdf', type: 'spec' },
      { title: 'IALA G1117: Shore Network MMS', url: 'https://www.navcen.uscg.gov/sites/default/files/pdf/AIS/G1117-Ed3.0-VHF-Data-Exchange-System-VDES-Overview.pdf', type: 'spec' }
    ],
    details: [
      { it: "Reti Integrate: Collega stazioni base VDES e router terrestri via IP (Fibra, MPLS) e satellitare.", en: "Integrated Networks: Connects VDES base stations and terrestrial routers via IP (Fiber, MPLS) and satellite." },
      { it: "Mesh Discovery: I router di terra comunicano tra loro per trovare la posizione corrente della nave (MRN).", en: "Mesh Discovery: Shore routers communicate with each other to find the vessel's current position (MRN)." },
      { it: "Consegna Garantita: Il protocollo MMTP assicura che il messaggio arrivi anche se la nave si sposta tra zone VDE-TER diverse.", en: "Guaranteed Delivery: The MMTP protocol ensures the message arrives even if the ship moves between different VDE-TER zones." },
      { it: "Interoperabilità: I dati sono resi disponibili alle autorità (VTS, Dogane) via API HTTPS o bridge legati all'identità MRN.", en: "Interoperability: Data is made available to authorities (VTS, Customs) via HTTPS APIs or bridges linked to the MRN identity." }
    ],
    functioning: {
      title: { it: "Analisi Rete Backbone MMS", en: "MMS Backbone Network Analysis" },
      steps: [
        { it: "Roaming Management: Gestisce il passaggio della nave da una Shore-Station ad un'altra mantenendo la sessione MMTP attiva.", en: "Roaming Management: Manages ship handover from one Shore-Station to another keeping the MMTP session active." },
        { it: "Load Balancing: Distribuisce il carico di traffico dei messaggi marittimi su diversi nodi router mondiali.", en: "Load Balancing: Distributes maritime message traffic load across different global router nodes." },
        { it: "Identity Verification: Consulta il MIR per confermare che i dati provengano da una sorgente valida a livello di rete IP.", en: "Identity Verification: Consults the MIR to confirm data originates from a valid source at the IP network level." }
      ]
    }
  },
  {
    id: 'dest-agent',
    title: { it: "MMS Agent Destinatario", en: "MMS Agent Destination" },
    subtitle: { it: "App Port Authority / VTS", en: "Port Authority / VTS App" },
    protocol: 'SMMP',
    icon: <MessageSquare className="w-6 h-6" />,
    resources: [
      { title: 'IALA G1117: MMS Security Overview', url: 'https://www.navcen.uscg.gov/sites/default/files/pdf/AIS/G1117-Ed3.0-VHF-Data-Exchange-System-VDES-Overview.pdf', type: 'spec' },
      { title: 'MCP Identity Registry Specification', url: 'https://maritimeconnectivity.net/wp-content/uploads/2023/02/MCP-Concept-v2.pdf', type: 'spec' }
    ],
    details: [
      { it: "Validazione: L'Agenziale riceve il pacchetto e contatta il MIR per verificare la firma del mittente.", en: "Validation: The Agent receives the packet and contacts the MIR to verify the sender's signature." },
      { it: "Decifratura: Utilizzando la propria chiave privata e la chiave pubblica del mittente, l'Agent estrae il dato originale.", en: "Decryption: Using its private key and the sender's public key, the Agent extracts the original data." },
      { it: "Notifica: Viene generato un messaggio di 'Acknowledgment' (ACK) firmato digitalmente.", en: "Notification: A digitally signed 'Acknowledgment' (ACK) message is generated." },
      { it: "Conclusione: Il dato pulito (es. la rotta della nave) viene visualizzato sullo schermo dell'operatore portuale.", en: "Conclusion: Clean data (e.g., the ship's route) is displayed on the port operator's screen." }
    ],
    functioning: {
      title: { it: "Analisi Ricezione Destinatario", en: "Recipient Reception Analysis" },
      steps: [
        { it: "Packet Unwrapping: Estrazione del payload SMMP dal contenitore MMTP ricevuto.", en: "Packet Unwrapping: Extraction of the SMMP payload from the received MMTP container." },
        { it: "Trust Verification: Conferma finale dell'identità MRN del mittente tramite certificato digitale (End-to-End).", en: "Trust Verification: Final confirmation of sender MRN identity via digital certificate (End-to-End)." },
        { it: "ACK Emission: Invio automatico della notifica di consegna al mittente tramite lo stesso canale MMTP.", en: "ACK Emission: Automatic delivery notification send to the sender via the same MMTP channel." }
      ]
    }
  }
];

// --- Specialized Components ---

const DiagramBlock = ({ title, subtitle, icon, active, highlight, color = "blue", lang }: { title: string; subtitle: string; icon: React.ReactNode; active?: boolean; highlight?: boolean; color?: "blue" | "emerald" | "amber", lang: Language }) => {
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

const ProtocolModal = ({ protocol, onClose, lang }: { protocol: ProtocolInfo; onClose: () => void; lang: Language }) => {
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
)};

const DiagramArrow = ({ protocol, active, onClick, color = "blue" }: { protocol: string; active?: boolean; onClick?: () => void; color?: "blue" | "emerald" | "amber" }) => {
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

const ConnectionLine = ({ active }: { active: boolean }) => (
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

const DetailCard: React.FC<{ step: StepInfo; onProtocolClick?: (id: string) => void; lang: Language }> = ({ step, onProtocolClick, lang }) => (
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

const BlockDiagram = ({ 
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

const PacketDecoderView = ({ lang }: { lang: Language }) => {
  const t = TRANSLATIONS[lang];
  const [payload, setPayload] = useState('{"route_id": "R-101", "destination": "GENOA", "eta": "2024-05-12T14:00Z"}');
  const [activeLayer, setActiveLayer] = useState<1 | 2 | 3>(3);
  const [stack, setStack] = useState<'vdes' | 'ethernet' | 'backhaul'>('vdes');

  const templates = [
    { label: lang === 'it' ? 'Rotta' : 'Route', data: '{"route_id": "R-101", "destination": "GENOA", "eta": "2024-05-12T14:00Z"}' },
    { label: 'Meteo', data: '{"station": "PORT_A", "temp": 18, "wind": 12, "vis": 10}' },
    { label: lang === 'it' ? 'Posizione' : 'Position', data: '{"mmsi": 247123400, "lat": 44.38, "lon": 8.94, "sog": 12.5}' },
    { label: 'Alert', data: '{"type": "DISTRESS", "mmsi": 247123400, "priority": "CRITICAL"}' }
  ];

  const getSMMP = () => {
    try {
      const data = JSON.parse(payload);
      return JSON.stringify({
        header: {
          protocol: "SMMP",
          v: "1.0",
          sender: "urn:mrn:mms:vessel:247123400",
          sig: "sha256:8f3c...b2e1"
        },
        payload: data
      }, null, 2);
    } catch { return "Invalid JSON"; }
  };

  const getMMTP = () => {
    try {
      const smmp = JSON.parse(getSMMP());
      return JSON.stringify({
        mmtp_header: {
          msg_id: "mms-" + Math.random().toString(36).substr(2, 9),
          qos: stack === 'backhaul' ? 0 : 1,
          hop_limit: stack === 'vdes' ? 3 : 5,
          created: new Date().toISOString(),
          stack: stack.toUpperCase()
        },
        body: smmp
      }, null, 2);
    } catch { return "Error encoding MMTP"; }
  };

  const getLayer1 = () => {
    const raw = getMMTP();
    if (stack === 'vdes') {
      const chunks = raw.match(/.{1,40}/g) || [];
      return chunks.map((chunk, i) => `!VDE,${chunks.length},${i+1},0,A,${btoa(chunk).substr(0, 30)},0*${Math.floor(Math.random()*99)}`).join('\n');
    } else if (stack === 'ethernet') {
      return `[UDP HEADER]\nSrcPort: 61162, DstPort: 61162\nMulticast: 239.192.0.1\n\n[IEC-61162-450 HEADER]\nUdPbCx,v:1,n:1,s:MMS,dst:ALL,c:1*${Math.floor(Math.random()*99)}\n\n[PAYLOAD BINARY]\n${btoa(raw).substr(0, 100)}...`;
    } else {
      return `[TCP/IP HEADER]\nSrc: 10.0.0.1, Dst: 8.8.8.8 (Backhaul Gateway)\nMTU: 1500, TTL: 64\n\n[TLS 1.3 RECORD LAYER]\nVersion: TLS 1.3 (0x0304)\nContent Type: Application Data (23)\nLength: ${raw.length + 32}\n\n[ENCRYPTED PAYLOAD]\n${btoa(raw).substr(0, 80)}...`;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3 space-y-6">
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">{t.packetDecoder}</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Interactive Stack Analysis</p>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.stackType}</label>
              <div className="flex flex-col gap-2">
                {[
                  { id: 'vdes', label: t.vdesStack, icon: <Radio className="w-3 h-3" /> },
                  { id: 'ethernet', label: t.ethernetStack, icon: <Network className="w-3 h-3" /> },
                  { id: 'backhaul', label: t.backhaulStack, icon: <Globe className="w-3 h-3" /> }
                ].map(s => (
                  <button
                    key={s.id}
                    onClick={() => setStack(s.id as any)}
                    className={`px-4 py-3 rounded-xl border transition-all text-left flex items-center gap-3
                      ${stack === s.id ? 'bg-blue-600 border-blue-500 text-white shadow-md' : 'bg-slate-50 border-slate-100 text-slate-600 hover:border-blue-200'}`}
                  >
                    {s.icon}
                    <span className="text-[10px] font-bold uppercase">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.selectTemplate}</label>
              <div className="grid grid-cols-2 gap-2">
                {templates.map(tmp => (
                  <button
                    key={tmp.label}
                    onClick={() => setPayload(tmp.data)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-[10px] font-bold hover:bg-blue-50 hover:border-blue-200 transition-all text-slate-600"
                  >
                    {tmp.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.rawPayload}</label>
              <textarea
                value={payload}
                onChange={(e) => setPayload(e.target.value)}
                className="w-full h-32 p-4 rounded-2xl bg-slate-50 border border-slate-100 font-mono text-[10px] focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none shadow-inner"
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <div className="flex bg-slate-100 p-1 rounded-2xl gap-1 mb-6">
               {[3, 2, 1].map((lv) => {
                 let label = "";
                 if (lv === 3) label = t.layerSMMP;
                 else if (lv === 2) label = stack === 'vdes' ? t.layerMMTP : t.layerTransport;
                 else label = stack === 'vdes' ? t.layerNMEA : t.layerPhysical;

                 return (
                   <button
                     key={lv}
                     onClick={() => setActiveLayer(lv as 1|2|3)}
                     className={`flex-1 py-3 rounded-xl text-[10px] font-bold uppercase transition-all flex flex-col items-center justify-center gap-1
                       ${activeLayer === lv ? 'bg-white text-blue-600 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                   >
                     <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${activeLayer === lv ? 'bg-blue-500' : 'bg-slate-300'}`} />
                        {label}
                     </div>
                     <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-black ${activeLayer === lv ? 'bg-blue-50 text-blue-500' : 'bg-slate-50 text-slate-300'}`}>
                        {lv > 1 ? t.endToEnd : t.hopByHop}
                     </span>
                   </button>
                 );
               })}
            </div>

            <div className="flex-1 bg-slate-900 rounded-[2rem] p-8 relative overflow-hidden flex flex-col min-h-[400px]">
               <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none text-white">
                 {activeLayer === 3 ? <Lock className="w-32 h-32" /> : 
                  activeLayer === 2 ? <Network className="w-32 h-32" /> : 
                  <Radio className="w-32 h-32" />}
               </div>

               <div className="relative z-10 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">
                       {activeLayer === 3 ? t.encryptionKey : 
                        activeLayer === 2 ? (stack === 'backhaul' ? 'IP DATA_GRAM' : t.routingHeader) : 
                        (stack === 'ethernet' ? 'UDP MULTICAST' : t.radioSentences)}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">
                       {activeLayer === 3 ? 'X.509 / ECC' : 
                        activeLayer === 2 ? (stack === 'vdes' ? 'MMTP / VDES' : 'MMTP / IP') : 
                        (stack === 'ethernet' ? 'LWE / 61162-450' : stack === 'backhaul' ? 'TCP/IP BACKHAUL' : 'VDES-TER / AIS')}
                    </span>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${activeLayer}-${stack}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex-1 font-mono text-[10px] leading-relaxed overflow-y-auto max-h-[300px] scrollbar-hide text-blue-50 pr-4"
                    >
                      <pre className="whitespace-pre-wrap brightness-125">
                        {activeLayer === 3 ? getSMMP() : 
                         activeLayer === 2 ? getMMTP() : 
                         getLayer1()}
                      </pre>
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-3 gap-4">
                     <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                        <div className="text-[8px] font-black text-slate-500 uppercase mb-1">Overhead</div>
                        <div className="text-sm font-black text-blue-400">+{activeLayer === 3 ? '12%' : activeLayer === 2 ? '8%' : '4%'}</div>
                     </div>
                     <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                        <div className="text-[8px] font-black text-slate-500 uppercase mb-1">Standard</div>
                        <div className="text-[10px] font-black text-emerald-400">
                          {stack === 'ethernet' ? 'IEC 61162-450' : stack === 'vdes' ? 'IALA G1139' : 'TCP/IP Backhaul'}
                        </div>
                     </div>
                     <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                        <div className="text-[8px] font-black text-slate-500 uppercase mb-1">MTU Status</div>
                        <div className="text-sm font-black text-amber-400">{activeLayer === 1 && stack === 'vdes' ? 'Fragmented' : 'Optimal'}</div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 p-10 opacity-5"><Cpu className="w-48 h-48" /></div>
           <div className="grid lg:grid-cols-2 gap-12 relative z-10">
              <div className="max-w-2xl">
                 <h4 className="text-xl font-black mb-4 tracking-tight uppercase">{lang === 'it' ? 'Come funziona la decostruzione?' : 'How does deconstruction work?'}</h4>
                 <p className="text-sm text-slate-400 leading-relaxed font-medium">
                    {lang === 'it' 
                      ? "Il Packet Decoder simula il lavoro svolto dall'Edge Router e dal Modem VDES. Quando invii un dato, esso non viaggia mai 'nudo'. Viene prima firmato digitalmente (SMMP) per la sicurezza, poi avvolto in un contenitore di trasporto (MMTP) che indica la sorgente URN e lo scopo, e infine spezzettato in frasi binarie per essere trasmesso sulle frequenze radio VHF."
                      : "The Packet Decoder simulates the work performed by the Edge Router and the VDES Modem. When you send data, it never travels 'naked'. It is first digitally signed (SMMP) for security, then wrapped in a transport container (MMTP) indicating the source URN and purpose, and finally chopped into binary sentences to be transmitted on VHF radio frequencies."}
                 </p>
              </div>
              <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10">
                 <h5 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-6">Specifiche di Riferimento</h5>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: 'IALA Guideline G1139', sub: 'VDES technical spec', url: 'https://www.iala-aism.org/' },
                      { label: 'IEC 61162-450', sub: 'LWE Networking', url: 'https://www.iec.ch/' },
                      { label: 'ITU-R M.2092-1', sub: 'VHF Data Exchange System', url: 'https://www.itu.int/' },
                      { label: 'IALA Guideline G1117', sub: 'MMS Service structure', url: 'https://www.iala-aism.org/' }
                    ].map(ref => (
                      <a 
                        key={ref.label}
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all border border-transparent hover:border-blue-500/30 group"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-black">{ref.label}</span>
                          <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-blue-400" />
                        </div>
                        <div className="text-[8px] text-slate-500 font-bold uppercase">{ref.sub}</div>
                      </a>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-xl">
           <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12"><Globe className="w-48 h-48" /></div>
           <div className="relative z-10">
              <h4 className="text-xl font-black mb-4 tracking-tight uppercase">{t.protocolIndependenceTitle}</h4>
              <p className="text-sm text-blue-50 leading-relaxed font-medium">
                 {t.protocolIndependenceDesc}
              </p>
              <div className="mt-8 flex gap-4">
                 <div className="px-4 py-2 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest">E2E Immutable</div>
                 <div className="px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-full text-[10px] font-black uppercase tracking-widest">Agnostic Transport</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const RModePntView = ({ lang }: { lang: Language }) => {
  const t = TRANSLATIONS[lang];
  const [gnssStatus, setGnssStatus] = useState<'healthy' | 'lost' | 'spoofed'>('healthy');

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
        {/* Section 1: GNSS & Clock */}
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

            <div className="grid md:grid-cols-2 gap-12 relative z-10">
                <div className="space-y-6">
                    <div className="p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100 relative overflow-hidden group hover:shadow-md transition-all">
                        <div className="absolute top-0 right-0 p-4 opacity-5"><Cpu className="w-24 h-24" /></div>
                        <h3 className="text-lg font-black text-blue-900 mb-4 uppercase">VDES Hardware (Transponder)</h3>
                        <p className="text-sm text-blue-800 leading-relaxed font-medium">
                            {lang === 'it' 
                                ? "È l'hardware VDES a ricevere direttamente il segnale GNSS e il clock. Integra un ricevitore (GPS/Galileo) per calcolare posizione e tempo UTC."
                                : "The VDES hardware itself receives the GNSS signal and clock. It integrates a receiver (GPS/Galileo) to calculate position and UTC time."}
                        </p>
                        <div className="mt-6 flex gap-4">
                            <div className="flex-1 p-4 bg-white/60 rounded-2xl border border-blue-200 text-center">
                                <div className="text-[10px] font-black text-blue-400 uppercase mb-1">Time Sync</div>
                                <div className="text-xs font-bold text-blue-900">TDMA Slots</div>
                            </div>
                            <div className="flex-1 p-4 bg-white/60 rounded-2xl border border-blue-200 text-center">
                                <div className="text-[10px] font-black text-blue-400 uppercase mb-1">PNT Data</div>
                                <div className="text-xs font-bold text-blue-900">Navigation</div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 relative overflow-hidden opacity-80 group hover:opacity-100 transition-all">
                        <div className="absolute top-0 right-0 p-4 opacity-5"><Network className="w-24 h-24" /></div>
                        <h3 className="text-lg font-black text-slate-900 mb-4 uppercase">MMS Edge Router</h3>
                        <p className="text-sm text-slate-600 leading-relaxed font-medium">
                            {lang === 'it'
                                ? "Opera a livello software superiore. Non gestisce la modulazione fisica o la sincronizzazione radio, si occupa dell'instradamento IP e code messaggi."
                                : "Operates at a higher software level. It does not handle physical modulation or radio sync; it manages IP routing and message queues."}
                        </p>
                    </div>
                </div>

                <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden flex flex-col">
                    <div className="absolute top-0 right-0 p-6 opacity-10"><Zap className="w-40 h-40" /></div>
                    <h4 className="text-blue-400 font-black uppercase text-[10px] tracking-widest mb-6 py-1 border-b border-white/10 uppercase">Security State</h4>
                    
                    <div className="flex-1 space-y-6">
                        <div className={`p-6 rounded-3xl border-2 transition-all ${
                            gnssStatus === 'healthy' ? 'bg-emerald-500/10 border-emerald-500/30' : 
                            gnssStatus === 'lost' ? 'bg-red-500/10 border-red-500/30' : 
                            'bg-amber-500/10 border-amber-500/30'
                        }`}>
                            <div className="flex items-center gap-3 mb-3">
                                {gnssStatus === 'healthy' ? <ShieldCheck className="w-5 h-5 text-emerald-400" /> : <AlertTriangle className="w-5 h-5 text-red-400 animate-pulse" />}
                                <span className={`text-xs font-black uppercase tracking-widest ${gnssStatus === 'healthy' ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {gnssStatus === 'healthy' ? 'System Integral' : 'PNT Failover Required'}
                                </span>
                            </div>
                            <p className="text-xs text-slate-300 font-medium leading-relaxed">
                                {gnssStatus === 'healthy' 
                                    ? (lang === 'it' ? 'Il segnale GNSS è stabile. R-Mode in standby come riferimento di verifica secondario.' : 'GNSS signal stable. R-Mode in standby as secondary verification reference.')
                                    : gnssStatus === 'lost'
                                    ? (lang === 'it' ? 'Segnale GNSS assente (Jamming). Il VDES attiva la navigazione autonoma via R-Mode terrestri.' : 'GNSS signal lost (Jamming). VDES triggers autonomous navigation via terrestrial R-Mode.')
                                    : (lang === 'it' ? 'Rilevato Spoofing. Multilaterazione R-Mode utilizzata per invalidare i dati satellitari falsi.' : 'Spoofing detected. R-Mode multilateration used to invalidate false satellite data.')
                                }
                            </p>
                        </div>

                        <ul className="space-y-4">
                            {[
                                { it: "Sincronizzazione TDMA: Il clock UTC è vitale per trasmettere nei precisi slot temporali.", en: "TDMA Sync: UTC clock is vital for transmitting in precise time slots." },
                                { it: "Misurazione TOA: La precisione temporale permette di misurare i tempi di volo (Time of Arrival).", en: "TOA Measurement: Temporal precision allows measuring Time of Arrival." }
                            ].map((item, i) => (
                                <li key={i} className="flex gap-4 items-start">
                                    <div className="p-1.5 bg-blue-500/20 rounded-lg text-blue-400"><ShieldCheck className="w-4 h-4" /></div>
                                    <p className="text-xs font-medium text-slate-400 leading-relaxed">{item[lang]}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        {/* Section 2: R-Mode */}
        <section className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
            <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
                    <Globe className="w-8 h-8" />
                </div>
                <div>
                   <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t.rmodeTitle}</h2>
                   <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-1">Autonomous Terrestrial Positioning</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className={`p-8 rounded-[2.5rem] border-2 transition-all space-y-4 shadow-sm ${gnssStatus !== 'healthy' ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-100'}`}>
                    <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-2 shadow-sm">
                        <Signal className="w-6 h-6" />
                    </div>
                    <h3 className="font-black text-slate-900 uppercase text-xs">1. Ranging Signal</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                        {lang === 'it'
                            ? "Le stazioni costiere trasmettono segnali temporizzati con estrema precisione sui canali VDE-TER terrestri."
                            : "Coastal stations transmit extremely precise timed signals on terrestrial VDE-TER channels."}
                    </p>
                </div>

                <div className={`p-8 rounded-[2.5rem] border-2 transition-all space-y-4 shadow-sm ${gnssStatus !== 'healthy' ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-100'}`}>
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-2 shadow-sm">
                        <Crosshair className="w-6 h-6" />
                    </div>
                    <h3 className="font-black text-slate-900 uppercase text-xs">2. Automatic Trigger</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                        {lang === 'it'
                            ? "Si attiva se il GNSS è oscurato (Jamming) o falsificato (Spoofing). Il ricevitore rileva l'anomalia e calcola il TOA."
                            : "Triggers if GNSS is obscured (Jamming) or falsified (Spoofing). The receiver detects the anomaly and calculates TOA."}
                    </p>
                </div>

                <div className={`p-8 rounded-[2.5rem] border-2 transition-all space-y-4 shadow-sm ${gnssStatus !== 'healthy' ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-100'}`}>
                    <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-2 shadow-sm">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="font-black text-slate-900 uppercase text-xs">3. Positioning Logic</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                        {lang === 'it'
                            ? "Con 3+ stazioni: posizionamento autonomo via multilaterazione. Con 1-2 stazioni: verifica integrità dei dati GNSS."
                            : "With 3+ stations: autonomous positioning via multilateration. With 1-2 stations: GNSS data integrity check."}
                    </p>
                </div>
            </div>
            
            <div className="mt-8 p-1 bg-slate-50 rounded-[4rem] border border-slate-200 overflow-hidden shadow-inner relative">
                 <div className="p-8 flex items-center justify-between border-b border-slate-200 bg-white relative z-20">
                    <div className="flex items-center gap-3">
                        <Radar className="w-5 h-5 text-blue-600 animate-pulse" />
                        <span className="text-xs font-black text-slate-900 uppercase tracking-widest">Live R-Mode Schematic</span>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border transition-all ${
                            gnssStatus === 'healthy' ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 
                            gnssStatus === 'lost' ? 'bg-red-50 border-red-200 text-red-600' : 
                            'bg-amber-50 border-amber-200 text-amber-600'
                        }`}>
                            {gnssStatus === 'healthy' ? <Satellite className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                            <span className="text-[10px] font-black uppercase tracking-tighter">POS Source: {gnssStatus === 'healthy' ? 'GNSS' : 'R-MODE (Backup)'}</span>
                        </div>

                        <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400">
                            <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-blue-500 rounded-full" /> Ship</div>
                            <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-emerald-500 rounded-full" /> Base</div>
                        </div>
                    </div>
                 </div>

                 <div className="h-[500px] relative flex flex-col items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:32px_32px]" />
                    
                    {/* GNSS Satellite */}
                    <motion.div 
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 6, repeat: Infinity }}
                        className="absolute top-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
                    >
                        <div className={`p-4 rounded-3xl border-2 transition-all ${
                            gnssStatus === 'healthy' ? 'bg-blue-50 border-blue-200 text-blue-600' : 
                            gnssStatus === 'lost' ? 'bg-slate-100 border-slate-200 text-slate-300 opacity-50' : 
                            'bg-amber-50 border-amber-200 text-amber-500'
                        }`}>
                            <Satellite className="w-10 h-10" />
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-widest mt-2 ${gnssStatus === 'healthy' ? 'text-blue-500' : 'text-slate-400'}`}>GNSS Constellation</span>
                        
                        {/* GNSS Signal Line */}
                        <div className="relative h-24 w-px bg-slate-100 overflow-hidden mt-2">
                             {gnssStatus !== 'lost' && (
                                <motion.div 
                                    animate={{ y: ['-100%', '100%'] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    className={`absolute inset-0 w-full h-12 ${gnssStatus === 'healthy' ? 'bg-gradient-to-b from-transparent via-blue-400 to-transparent' : 'bg-gradient-to-b from-transparent via-amber-400 to-transparent'}`}
                                />
                             )}
                             {gnssStatus === 'lost' && <div className="absolute inset-0 bg-red-400/20" />}
                        </div>
                        {gnssStatus === 'lost' && <AlertTriangle className="w-5 h-5 text-red-500 absolute top-40" />}
                    </motion.div>

                    <div className="relative z-10 flex flex-col md:flex-row gap-24 items-center mt-20">
                        <motion.div 
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 4, repeat: Infinity }}
                          className="relative"
                        >
                            <div className={`w-28 h-28 rounded-full blur-2xl absolute -inset-6 transition-all duration-1000 ${
                                gnssStatus === 'healthy' ? 'bg-blue-600/10' : 'bg-emerald-600/20'
                            }`} />
                            <div className={`w-16 h-16 rounded-[2rem] shadow-2xl flex items-center justify-center text-white relative z-10 transition-all duration-500 ${
                                gnssStatus === 'healthy' ? 'bg-blue-600 shadow-blue-200' : 'bg-emerald-600 shadow-emerald-200 border-2 border-emerald-400'
                            }`}>
                                <Ship className="w-8 h-8" />
                            </div>
                            <div className="absolute top-18 left-1/2 -translate-x-1/2 text-[10px] font-black text-blue-600 bg-white px-3 py-1 rounded-full border border-blue-100 shadow-sm whitespace-nowrap">OB-VDES (RX)</div>
                        </motion.div>

                        <div className="flex flex-col gap-10">
                            {[1,2,3].map(i => (
                                <div key={i} className="flex items-center gap-6 group">
                                    <div className="relative h-px bg-slate-200 overflow-hidden" style={{width: '220px'}}>
                                        <motion.div 
                                          initial={{ x: '100%' }}
                                          animate={{ x: '-100%' }}
                                          transition={{ 
                                            duration: gnssStatus === 'healthy' ? 4 : 2, 
                                            repeat: Infinity, 
                                            delay: i * 0.8, 
                                            ease: "linear" 
                                          }}
                                          className={`absolute inset-0 w-32 ${
                                            gnssStatus === 'healthy' ? 'bg-gradient-to-r from-transparent via-slate-300 to-transparent' : 'bg-gradient-to-r from-transparent via-emerald-500 to-transparent'
                                          }`}
                                        />
                                    </div>
                                    <div className="relative">
                                        <div className={`w-12 h-12 bg-white rounded-2xl border transition-all duration-500 flex items-center justify-center ${
                                            gnssStatus !== 'healthy' ? 'border-emerald-500 text-emerald-600 shadow-lg shadow-emerald-100' : 'border-slate-100 text-slate-400 shadow-sm'
                                        }`}>
                                            <LandPlot className="w-6 h-6" />
                                        </div>
                                        <div className={`absolute -right-32 top-1/2 -translate-y-1/2 text-[9px] font-black transition-colors ${
                                            gnssStatus !== 'healthy' ? 'text-emerald-600' : 'text-slate-400'
                                        }`}>SHORE BASE 0{i}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                 </div>
            </div>
        </section>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [viewMode, setViewMode] = useState<'architecture' | 'vdes' | 'simulation' | 'rmode' | 'decoder'>('architecture');
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
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="bg-white rounded-[2rem] shadow-2xl border border-slate-200 p-10 overflow-hidden relative mt-4 mx-2"
                  >
                    <button 
                      onClick={() => setActiveChannel(null)}
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
                          onClick={() => setSelectedProtocol(PROTOCOL_DATA[activeChannel.protocol])}
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
