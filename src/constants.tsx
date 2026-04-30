import React from 'react';
import { 
  Cpu, 
  Network, 
  Radio, 
  Zap, 
  Database, 
  Globe, 
  MessageSquare 
} from 'lucide-react';
import { 
  Language, 
  TranslationSet, 
  ProtocolInfo, 
  VdesChannelInfo, 
  StepInfo 
} from './types';

export const TRANSLATIONS: Record<Language, TranslationSet> = {
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
    messageBroker: "MMS Proxy / Edge Broker",
    storeAndForward: "MMTP Store & Forward",
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
    rmodeSimulator: "Simulatore R-Mode & HDOP",
    hdopTitle: "HDOP (Horizontal Dilution of Precision)",
    accuracyTitle: "Accuratezza Stimata",
    geometryTitle: "Analisi Geometria VDE-TER",
    stationId: "Stazione VDE",
    dragHint: "Trascina le stazioni per cambiare la geometria di posizionamento",
    theoryTitle: "Approfondimento Teorico",
    geometricDilution: "Diluizione della Precisione Geometrica",
    atomicClockTitle: "Il Ruolo degli Orologi Atomici",
    toaDescription: "Il tempo di volo (TOA) viene calcolato misurando il microsecondo di arrivo. 1 µs di errore = 300m di offset.",
    jammingTitle: "Resilienza al Jamming",
    spoofingTitle: "Detection dello Spoofing",
    optimalScenario: "Triangolo Ottimale",
    poorScenario: "Nave Esterna",
    criticalScenario: "Fila Indiana",
    resetMap: "Ripristina Mappa",
    packetDecoder: "Packet Decoder Interattivo",
    decodePayload: "Decostruisci Payload",
    selectTemplate: "Seleziona Template",
    rawPayload: "Payload Originale (JSON)",
    layerSMMP: "Livello 3: MMS Security Layer (SMMP)",
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
    educationalApp: "Applicazione a Scopo Educativo",
    vdeSatView: "Dinamiche VDE-SAT",
    vdeSatSimulator: "Simulatore Satellitare LEO",
    satelliteTitle: "Parametri Satellite",
    dopplerShift: "Spostamento Doppler",
    latencyTitle: "Latenza Spazio-Terra",
    footprintTitle: "Area di Copertura (Footprint)",
    passDuration: "Durata Passaggio",
    accessMode: "Modalità di Accesso",
    randomAccess: "Accesso Casuale (RAC)",
    spreadSpectrumTitle: "Spread Spectrum (E-SSA)",
    locking: "COMPENSAZIONE ATTIVA",
    passStatus: "Stato Passaggio",
    vdeSatExpTitle: "La sfida della velocità: LEO & Doppler",
    vdeSatExpDesc: "A differenza del VDE-TER, il segmento satellitare (VDE-SAT) si affida a costellazioni LEO a 600km. Viaggiando a 8km/s, generano un fortissimo Effetto Doppler.",
    vdeSatDopplerTitle: "Compensazione Doppler",
    vdeSatDopplerDesc: "Lo shift varia da +4kHz a -4kHz. I modem devono ricalcolare la frequenza portante costantemente per mantenere il link attivo.",
    vdeSatLatencyTitle: "Latenza Variabile",
    vdeSatLatencyDesc: "La distanza varia da 600km (zenith) a 3000km (orizzonte), rendendo il TDMA rigido inattuabile in mare aperto.",
    vdeSatEssaTitle: "E-SSA & Collisioni",
    vdeSatEssaDesc: "Con migliaia di navi nello stesso footprint, l'E-SSA permette di recuperare pacchetti sovrapposti 'spalmandoli' su una banda più larga (SF=16).",
    aisCongestionView: "Saturazione AIS",
    aisCongestionSimulator: "MMS Edge Router & Congestione",
    shipDensity: "Densità Traffico Navale",
    slotOccupancy: "Occupazione Slot TDMA",
    radarBlindingRisk: "RISCHIO ACCECAMENTO RADAR",
    mmsEdgeRouter: "MMS Edge Router",
    routingActive: "ROUTING DINAMICO ATTIVO",
    congestionWarning: "IALA WARNING: Carico > 50%",
    congestionCritical: "CRITICO: Sistema Saturo > 80%",
    scenarioMalacca: "Stretto di Malacca",
    scenarioGibraltar: "Stretto di Gibilterra",
    scenarioEnglishChannel: "Canale della Manica",
    aisPriorityTitle: "Priorità Assoluta AIS",
    aisPriorityDesc: "Secondo ITU-R M.2092, l'AIS (Anti-collisione) ha priorità 1. I dati non critici devono essere spostati per evitare di 'accecare' il monitoraggio navale.",
    macLayerTitle: "Protocolli MAC: SOTDMA vs RATDMA",
    macLayerDesc: "L'AIS usa SOTDMA (auto-organizzato). ASM e VDE usano RATDMA (random) o FATDMA (fisso) per non interferire con la sicurezza.",
    routerTitle: "L'Edge Router come Bilanciatore",
    routerDesc: "L'MMS Edge Router devia i messaggi pesanti (meteo, file) dai canali AIS verso ASM o VDE-TER quando rileva congestione.",
    slantRange: "Slant Range (km)",
    elevationAngle: "Angolo Elevazione (°)",
    dopplerTooltip: "Spostamento Doppler: variazione di frequenza dovuta alla velocità relativa del satellite (fino a 7.5 km/s).",
    latencyTooltip: "Latenza di propagazione: ritardo dovuto alla distanza fisica del segnale (2ms - 10ms).",
    passTooltip: "Tempo totale di visibilità del satellite sopra l'orizzonte (tipicamente 12-15 min).",
    modeTooltip: "Metodo di accesso: Slotted-ALOHA ottimizzato per reti satellitari massive.",
    slantTooltip: "Distanza geometrica diretta tra trasmettitore e ricevitore orbitale.",
    elevationTooltip: "Altezza angolare del satellite rispetto al piano dell'orizzonte.",
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
    messageBroker: "MMS Proxy / Edge Broker",
    storeAndForward: "MMTP Store & Forward",
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
    rmodeSimulator: "R-Mode & HDOP Simulator",
    hdopTitle: "HDOP (Horizontal Dilution of Precision)",
    accuracyTitle: "Estimated Accuracy",
    geometryTitle: "VDE-TER Geometry Analysis",
    stationId: "VDE Station",
    dragHint: "Drag stations to change positioning geometry",
    theoryTitle: "Theoretical Deep-Dive",
    geometricDilution: "Geometric Dilution of Precision",
    atomicClockTitle: "The Role of Atomic Clocks",
    toaDescription: "Time of Arrival (TOA) is calculated by measuring the microsecond of arrival. 1 µs error = 300m offset.",
    jammingTitle: "Jamming Resilience",
    spoofingTitle: "Spoofing Detection",
    optimalScenario: "Optimal Triangle",
    poorScenario: "External Vessel",
    criticalScenario: "Collinear Stations",
    resetMap: "Reset Map",
    packetDecoder: "Interactive Packet Decoder",
    decodePayload: "Deconstruct Payload",
    selectTemplate: "Select Template",
    rawPayload: "Original Payload (JSON)",
    layerSMMP: "Level 3: MMS Security Layer (SMMP)",
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
    educationalApp: "Educational Purpose Application",
    vdeSatView: "VDE-SAT Dynamics",
    vdeSatSimulator: "LEO Satellite Simulator",
    satelliteTitle: "Satellite Parameters",
    dopplerShift: "Doppler Shift",
    latencyTitle: "Space-to-Earth Latency",
    footprintTitle: "Coverage Area (Footprint)",
    passDuration: "Pass Duration",
    accessMode: "Access Mode",
    randomAccess: "Random Access (RAC)",
    spreadSpectrumTitle: "Spread Spectrum (E-SSA)",
    locking: "ACTIVE COMPENSATION",
    passStatus: "Pass Status",
    vdeSatExpTitle: "The Speed Challenge: LEO & Doppler",
    vdeSatExpDesc: "Unlike VDE-TER, the satellite segment (VDE-SAT) relies on LEO constellations at 600km. Traveling at 8km/s, they generate a massive Doppler Effect.",
    vdeSatDopplerTitle: "Doppler Compensation",
    vdeSatDopplerDesc: "The shift varies from +4kHz a -4kHz. Modems must constantly recalculate carrier frequency to maintain the link.",
    vdeSatLatencyTitle: "Variable Latency",
    vdeSatLatencyDesc: "Distance varies from 600km (zenith) to 3000km (horizon), making rigid TDMA impractical in open sea.",
    vdeSatEssaTitle: "E-SSA & Collisions",
    vdeSatEssaDesc: "With thousands of ships in the same footprint, E-SSA allows recovering overlapping packets by 'spreading' them across a wider band (SF=16).",
    aisCongestionView: "AIS Saturation",
    aisCongestionSimulator: "MMS Edge Router & Congestion",
    shipDensity: "Naval Traffic Density",
    slotOccupancy: "TDMA Slot Occupancy",
    radarBlindingRisk: "RADAR BLINDING RISK",
    mmsEdgeRouter: "MMS Edge Router",
    routingActive: "DYNAMIC ROUTING ACTIVE",
    congestionWarning: "IALA WARNING: Load > 50%",
    congestionCritical: "CRITICAL: System Saturated > 80%",
    scenarioMalacca: "Strait of Malacca",
    scenarioGibraltar: "Strait of Gibraltar",
    scenarioEnglishChannel: "English Channel",
    aisPriorityTitle: "AIS Absolute Priority",
    aisPriorityDesc: "According to ITU-R M.2092, AIS (Anti-collision) has priority 1. Non-critical data must be moved to avoid 'blinding' naval monitoring.",
    macLayerTitle: "MAC Protocols: SOTDMA vs RATDMA",
    macLayerDesc: "AIS uses SOTDMA (self-organized). ASM and VDE use RATDMA (random) or FATDMA (fixed) to avoid interfering with safety.",
    routerTitle: "The Edge Router as Balancer",
    routerDesc: "The MMS Edge Router diverts heavy messages (weather, files) from AIS channels to ASM or VDE-TER when it detects congestion.",
    slantRange: "Slant Range (km)",
    elevationAngle: "Elevation Angle (°)",
    dopplerTooltip: "Doppler Shift: frequency variation due to relative satellite velocity (up to 7.5 km/s).",
    latencyTooltip: "Propagation Latency: delay due to physical signal distance (2ms - 10ms).",
    passTooltip: "Total satellite visibility time above the horizon (typically 12-15 min).",
    modeTooltip: "Access Method: Slotted-ALOHA optimized for massive satellite networks.",
    slantTooltip: "Direct geometric distance between transmitter and orbital receiver.",
    elevationTooltip: "Angular height of the satellite relative to the horizon plane.",
  }
};

export const PROTOCOL_DATA: Record<string, ProtocolInfo> = {
  'SMMP': {
    id: 'smmp',
    name: 'MMS Security Layer (SMMP)',
    description: {
      it: 'Protocollo di alto livello che garantisce l\'integrità end-to-end e il non ripudiamento dei messaggi marittimi tramite certificati X.509 e MIR.',
      en: 'High-level protocol ensuring end-to-end integrity and non-repudiation of maritime messages via X.509 certificates and MIR.'
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
      { it: "Gestione centralizzata delle identità tramite Maritime Identity Registry (MIR).", en: "Centralized identity management via Maritime Identity Registry (MIR)." },
      { it: "Uso di certificati X.509 per la mutua autenticazione e firma dei dati.", en: "Use of X.509 certificates for mutual authentication and data signing." },
      { it: "Protezione delle chiavi private in hardware sicuro (HSM/TEE).", en: "Protection of private keys in secure hardware (HSM/TEE)." },
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
      { field: 'Training Sequence', description: { it: 'Preambolo per la sincronizzazione del simbolo radio.', en: 'Preamble for radio symbol synchronization.' }, size: '24-72 bits' },
      { field: 'FEC bits', description: { it: 'Ridondanza Forward Error Correction per la correzione errori.', en: 'Forward Error Correction redundancy for error correction.' }, size: 'Variable (LDPC)' },
      { field: 'Slot Number', description: { it: 'Intervallo temporale assegnato per la trasmissione radio.', en: 'Time slot assigned for radio transmission.' }, size: 'NA' },
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

export const VDES_STRUCTURE_DATA: VdesChannelInfo[] = [
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

export const ARCHITECTURE_STEPS: StepInfo[] = [
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
      { it: "Involucro: Viene creato un 'Secure Package' che incapsula il contenuto original.", en: "Encapsulation: A 'Secure Package' is created, encapsulating the original content." },
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
    title: { it: "MMS Proxy / Edge Broker (Ship)", en: "MMS Proxy / Edge Broker (Ship)" },
    subtitle: { it: "MMS Proxy / Edge Broker", en: "MMS Proxy / Edge Broker" },
    protocol: 'MMTP',
    icon: <Network className="w-6 h-6" />,
    resources: [
      { title: 'IALA G1117: MMS Architecture', url: 'https://www.navcen.uscg.gov/sites/default/files/pdf/AIS/G1117-Ed3.0-VHF-Data-Exchange-System-VDES-Overview.pdf', type: 'spec' },
      { title: 'MMTP Specification (MCP Core)', url: 'https://maritimeconnectivity.net/wp-content/uploads/2023/02/MCP-Concept-v2.pdf', type: 'spec' }
    ],
    details: [
      { it: "Interfacce di Comunicazione: Supporta link IP (VSAT, 4G/5G, Wi-Fi) e canali radio VDES (AIS, ASM, VDE-TER, VDE-SAT).", en: "Communication Interfaces: Supports IP links (VSAT, 4G/5G, Wi-Fi) and VDES radio channels (AIS, ASM, VDE-TER, VDE-SAT)." },
      { it: "Iscrizione (Pub/Sub): L'Agent si registra al Broker per inviare/ricevere messaggi su 'topic' specifici.", en: "Subscription (Pub/Sub): The Agent registers with the Broker to send/receive messages on specific 'topics'." },
      { it: "Smart Routing: Sceglie automaticamente tra VDE-TER (costiero) e VDE-SAT (alto mare) o canali IP se disponibili.", en: "Smart Routing: Automatically chooses between VDE-TER (coastal) and VDE-SAT (high seas) or IP channels if available." },
      { it: "Accodamento Store & Forward: Garantisce la persistenza del messaggio (MMTP) nel buffer locale fino all'ACK di ricezione dal destinatario.", en: "Store & Forward Queuing: Guarantees message persistence (MMTP) in local buffer until reception ACK is received from recipient." }
    ],
    functioning: {
      title: { it: "Analisi Funzionamento MMS Proxy / Edge Broker", en: "MMS Proxy / Edge Broker Operational Analysis" },
      steps: [
        { it: "Store & Forward: Gestisce la persistenza e la priorità dei messaggi, garantendo la consegna anche in caso di blackout link momentanei.", en: "Store & Forward: Manages message persistence and priority, ensuring delivery even during temporary link blackouts." },
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
