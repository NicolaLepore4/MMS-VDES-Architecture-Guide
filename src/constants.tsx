import React from 'react';
import { 
  Cpu, 
  Network, 
  Radio, 
  Zap, 
  Database, 
  Globe, 
  MessageSquare,
  Server,
  Lock
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
    // ── VDES Controller Integration ──
    vdesCtrlView: "Integrazione VDES Controller",
    vdesCtrlChapter: "Capitolo 5 · Implementazioni di riferimento",
    vdesCtrlOverview: "Panoramica del VDES Controller",
    vdesCtrlWhy: "Perché integrare il VDES Controller",
    vdesCtrlArchitecture: "Architettura del microservizio",
    vdesCtrlProtocols: "Protocolli di trasmissione: VDM, TSA, BBM",
    vdesCtrlAtoN: "Integrazione con AtoN Service",
    vdesCtrlHardware: "Integrazione hardware: VDES1000 ed E320",
    vdesCtrlMMSRelation: "Relazione con l'architettura MMS",
    vdesCtrlConfig: "Configurazione e deploy",
    vdesCtrlFlow: "Flusso end-to-end di trasmissione VAtoN",
    vdesCtrlPitfalls: "Errori comuni da evitare",
    vdesCtrlRefs: "Riferimenti",
    vdesCtrlSubtitle: "Come il microservizio open-source dei General Lighthouse Authorities (GLA-RAD) si inserisce nell'architettura VDES e quale ruolo svolge rispetto allo stack MMS.",
    vdesCtrlOneLineTitle: "In una frase",
    vdesCtrlOneLineDesc: "Il VDES Controller è il driver software lato shore che converte dati S-125 (AtoN) in messaggi AIS Tipo 21 e li consegna via UDP al modem radio.",
    vdesCtrlStackTitle: "Diagramma di contesto",
    vdesCtrlTechStackTitle: "Stack tecnologico",
    vdesCtrlWhyP1: "Lo standard MMS (RTCM 13900.0) descrive l'architettura logica per il trasferimento sicuro di messaggi marittimi su VDES, ma non specifica come pilotare il modem fisico. Il VDES Controller è proprio uno dei pochi esempi open-source che mostra come 'chiudere il cerchio' tra il livello applicativo (servizi S-100) e l'hardware radio.",
    vdesCtrlWhyP2: "Studiarlo è quindi utile per tre motivi:",
    vdesCtrlWhyBullet1: "capire come si materializza in pratica un sentence VDM/TSA/BBM",
    vdesCtrlWhyBullet2: "vedere un caso d'uso reale di Spring Boot in ambito marittimo",
    vdesCtrlWhyBullet3: "distinguere chiaramente il ruolo di un transmission controller da quello di un MMS Edge Router",
    vdesCtrlProtoDesc: "Il Controller comunica con il modem inviando sentence NMEA (IEC 61162-1) incapsulati in datagrammi UDP (IEC 61162-450). I tre tipi principali utilizzati sono:",
    vdesCtrlBBMExample: "Esempio di sentence BBM",
    vdesCtrlUDPFlow: "Flusso UDP a livello pacchetto",
    vdesCtrlPortNoteTitle: "Nota sulle porte",
    vdesCtrlPortNoteDesc: "Le porte UDP sono configurabili tramite application.properties. I valori sopra sono indicativi e dipendono dal firmware del VDES1000 e dalla configurazione del Controller.",
    vdesCtrlPollingREST: "Polling REST",
    vdesCtrlPollingPros: "Semplice, stateless, debug facile",
    vdesCtrlPollingCons: "Latenza, carico costante",
    vdesCtrlPollingWhen: "Ambienti di test o flotta piccola",
    vdesCtrlSubscribe: "Subscribe (pub/sub)",
    vdesCtrlSubscribePros: "Real-time, efficiente",
    vdesCtrlSubscribeCons: "Richiede broker (Kafka/AMQP)",
    vdesCtrlSubscribeWhen: "Produzione su scala",
    vdesCtrlMappingTitle: "Mapping S-125 → AIS Msg 21",
    vdesCtrlProdPath: "Path di produzione — CML VDES1000",
    vdesCtrlTestPath: "Path di test — Ettus USRP E320",
    vdesCtrlE320AdvTitle: "Vantaggio didattico dell'E320",
    vdesCtrlE320AdvDesc: "Permette di studiare il livello fisico VDES senza acquistare un modem certificato, e di catturare il segnale RF con strumenti come GQRX o Inspectrum.",
    vdesCtrlPyVdesTitle: "Componente complementare: py_vdes1000",
    vdesCtrlPyVdesDesc: "Il GLA-RAD pubblica anche un package Python (py_vdes1000) per interagire direttamente con il transceiver, utile come banco di prova prima di integrare il microservizio Java. Include esempi (minimal_tx.py, vdes_tx_app.py, vdes_rx_app.py) per trasmettere AIS, VDES-ASM e VDE.",
    vdesCtrlFundamentalTitle: "Distinzione fondamentale",
    vdesCtrlFundamentalDesc: "Il VDES Controller NON è un MMS Agent e NON implementa MMTP. È un transmission controller che opera al livello immediatamente sopra il modem, non al livello messaggistica applicativa.",
    vdesCtrlCompareTitle: "Confronto fra i due stack",
    vdesCtrlConvergeTitle: "Punti di possibile convergenza",
    vdesCtrlConvergeDesc: "In un'installazione futura completamente conforme a RTCM 13900.0, il VDES Controller potrebbe essere usato come 'driver' sotto l'MMS Edge Router VDES-enabled. La specifica MMS richiede che la nave sia equipaggiata con un Edge Router VDES-enabled, un modem VDES conforme a ITU-R M.2092-1, e che si trovi in un'area di copertura VDES Network MMS-enabled. Il VDES Controller può ricoprire il ruolo di driver del modem in tale catena.",
    vdesCtrlConfigExampleTitle: "Esempio di application.properties",
    vdesCtrlQuickStartTitle: "Quick-start in 7 passi",
    vdesCtrlStep1: "Clona il repo",
    vdesCtrlStep2: "Avvia Eureka e Keycloak con realm enav",
    vdesCtrlStep3: "Configura application.properties",
    vdesCtrlStep4: "Build con Maven",
    vdesCtrlStep5: "Run",
    vdesCtrlStep6: "Verifica registrazione",
    vdesCtrlStep7: "Cattura UDP con tcpdump",
    vdesCtrlFlowTitle: "Flusso end-to-end di trasmissione VAtoN",
    vdesCtrlFlowSeq: "Sequenza temporale:",
    vdesCtrlPitfallsTitle: "Errori comuni da evitare",
    vdesCtrlPitfall1Title: "❌ Confondere VDES Controller e MMS Agent",
    vdesCtrlPitfall1Desc: "Sono livelli diversi. L'MMS Agent vive nello stack RTCM 13900.0; il VDES Controller è un componente lato shore della service architecture GLA.",
    vdesCtrlPitfall2Title: "⚠️ Ignorare la priorità AIS > ASM > VDE-TER",
    vdesCtrlPitfall2Desc: "La specifica VDES impone che la trasmissione AIS abbia priorità su VDES ASM e VDE-TER. Il Controller non bypassa questa regola: se invii troppi BBM, gli AIS position report restano dominanti.",
    vdesCtrlPitfall3Title: "⚠️ Hardware first-generation",
    vdesCtrlPitfall3Desc: "Il VDES1000 first-generation non trasmette su canali multipli simultaneamente: la capacità totale è limitata a 2.250 slot/min su tutti i canali VDES.",
    vdesCtrlPitfall4Title: "ℹ️ SECOM ≠ MMS authentication",
    vdesCtrlPitfall4Desc: "La sicurezza applicativa (SECOMLib, IEC 63173-2) opera a livello HTTPS fra microservizi. L'autenticazione VDES su radio (es. TESLA) è un altro layer e non è gestita dal Controller.",
    vdesCtrlRefsTitle: "Riferimenti",
    vdesCtrlFooter: "📘 MMS-VDES Architecture Guide — Capitolo 5.2 ·",
    vdesCtrlEditLink: "Edita questa pagina su GitHub",

    // ── TESLA Protocol (Chapter 4.4) ──
    teslaChapter: "Capitolo 4.4 · Sicurezza e autenticazione VDES",
    teslaTitle: "Il protocollo TESLA per autenticazione broadcast su VDES",
    teslaSubtitle: "Come adattare il protocollo Timed Efficient Stream Loss-tolerant Authentication ai vincoli del canale VHF marittimo, garantendo autenticazione crittografica con piena retrocompatibilità AIS.",
    teslaSource: "📘 Nicola Lepore, Tesi di Laurea, Università di Pisa",
    teslaEditLink: "Edita questa pagina su GitHub",
    teslaFooterCredit: "Basato sulla tesi di Nicola Lepore — Università di Pisa, CNIT, Leonardo S.p.A.",

    // 1. Problem
    teslaProblemTitle: "1. Il problema dell'autenticazione AIS/VDES",
    teslaProblemP1: "I sistemi AIS e VDES sono stati progettati con priorità sulla disponibilità del dato, non sulla sua autenticità. Questo li rende vulnerabili ad attacchi di spoofing, in cui un attaccante può fabbricare scenari di navigazione fittizi: navi inesistenti, posizioni alterate, AtoN virtuali fasulli.",
    teslaProblemCalloutTitle: "⚠️ Vulnerabilità strutturali del VDES",
    teslaProblemCallout1: "I formati AIS legacy sono immutabili per ragioni di retrocompatibilità.",
    teslaProblemCallout2: "Le firme digitali (anche ECDSA) occupano una percentuale proibitiva degli slot VDES.",
    teslaProblemCallout3: "Il VDE-TER Link 11 ha un MTU di soli 38 byte.",
    teslaProblemCallout4: "Una validazione PKI in tempo reale via VHF è operativamente impraticabile.",
    teslaProblemP2: "La linea guida IALA G1192 (2025) ha formalizzato il consenso regolatorio: l'autenticazione deve essere fuori banda, separata dai dati di navigazione, e basata su meccanismi a catena di chiavi tipo TESLA.",

    // 2. State of the Art
    teslaSotaTitle: "2. Stato dell'arte: PKI vs TESLA",
    teslaSotaHeader1: "Approccio",
    teslaSotaHeader2: "Pro",
    teslaSotaHeader3: "Contro",
    teslaSotaHeader4: "Idoneità VDES",
    teslaSotaRow1Col1: "TLS / SECOM (IEC 63173-2)",
    teslaSotaRow1Col2: "Maturo, standardizzato, end-to-end",
    teslaSotaRow1Col3: "Verbosità JSON, handshake costoso",
    teslaSotaRow1Col4: "❌ Solo broadband IP",
    teslaSotaRow2Col1: "ECDSA P-256 su VHF",
    teslaSotaRow2Col2: "Non-ripudio, asimmetrico",
    teslaSotaRow2Col3: "72 byte/firma → frammentazione",
    teslaSotaRow2Col4: "⚠️ Marginale",
    teslaSotaRow3Col1: "TESLA (RFC 4082)",
    teslaSotaRow3Col2: "Overhead minimo, broadcast nativo",
    teslaSotaRow3Col3: "Latenza di verifica strutturale",
    teslaSotaRow3Col4: "✅ Ideale per VDE-TER",
    teslaSotaCalloutTitle: "Perché TESLA vince su VDES",
    teslaSotaCalloutContent: "TESLA usa solo primitive simmetriche (SHA-256, HMAC) per l'autenticazione operativa. Una sola chiave rivelata autentica decine di messaggi: il costo per messaggio diventa marginale.",

    // 3. TESLA Intro
    teslaTeslaIntroTitle: "3. Introduzione al protocollo TESLA",
    teslaTeslaIntroP1: "TESLA (Timed Efficient Stream Loss-tolerant Authentication) è un protocollo di autenticazione broadcast basato su asimmetria temporale: usa MAC simmetrici, ma rivela le chiavi solo dopo che i messaggi sono stati trasmessi. L'attaccante non può forgiare MAC validi perché al momento della trasmissione non conosce ancora la chiave.",
    teslaSub1Title: "3.1 La hash chain (one-way key chain)",
    teslaTeslaP2: "Il sender genera una catena di chiavi applicando ripetutamente SHA-256 a partire da un seme casuale:",
    teslaTeslaFormula: "K<sub>i</sub> = H(K<sub>i+1</sub>) &nbsp; con &nbsp; H = SHA-256",
    teslaTeslaP3: "Le chiavi vengono usate in ordine inverso rispetto alla generazione: K<sub>0</sub> è la commitment pubblica (radice di fiducia), poi vengono rivelate K<sub>1</sub>, K<sub>2</sub>, K<sub>3</sub>... Ogni chiave ricevuta può essere validata risalendo la catena fino a K<sub>0</sub>.",
    teslaTeslaCodeBlock1: `Generazione (sender):
  seed → K_N → K_{N-1} → ... → K_2 → K_1 → K_0
                                               ↑
                                           commitment

Disclosure (broadcast):
  t=0:    K_0 (pubblicata via PKI)
  t=3s:   ...messaggi autenticati con K_1...
  t=6s:   K_1 rivelata     ← receiver può ora verificare
  t=9s:   K_2 rivelata
  ...`,

    // 4. Middleware
    teslaMiddlewareTitle: "4. Architettura middleware out-of-band",
    teslaMiddlewareP1: "Il cuore dell'implementazione è un Auth Interceptor System Dockerizzato, ospitato su un dispositivo esterno fisicamente isolato dal transceiver VDES. Funziona come proxy trasparente sul backbone Ethernet IEC 61162-450, intercettando il traffico UDP per eseguire la logica TESLA in un ambiente isolato.",
    teslaMiddlewareCodeBlock: `        ┌─────────────────────────────────────────────────────┐
        │            AUTH INTERCEPTOR SYSTEM                   │
        │              (Docker container)                      │
        │                                                      │
        │  ┌──────────────────┐      ┌──────────────────┐    │
        │  │ Sender Interface │      │ Receiver Interf. │    │
        │  │                  │      │                  │    │
        │  │ • intercetta AIS │      │ • Data Buffer    │    │
        │  │ • genera MAC     │      │ • MAC Buffer     │    │
        │  │ • rivela chiavi  │      │ • verifier       │    │
        │  └────────┬─────────┘      └────────┬─────────┘    │
        └───────────┼─────────────────────────┼──────────────┘
                    │                         │
                    ▼ UDP (IEC 61162-450)     ▲
        ┌──────────────────────────────────────────────────┐
        │              VDES TRANSCEIVER (legacy)            │
        │           AIS Channel  │  VDE-TER Channel         │
        └────────┬─────────────────────────┬───────────────┘
                 │ AIS data                │ TESLA auth
                 ▼ (canale legacy)         ▼ (canale parallelo)
                        VHF
`,
    teslaOutOfBandTitle: "✅ Vantaggi dell'approccio out-of-band",
    teslaOutOfBand1: "Zero modifiche al firmware certificato dei modem VDES.",
    teslaOutOfBand2: "I dati AIS viaggiano sul canale legacy: i ricevitori non-VDES funzionano normalmente.",
    teslaOutOfBand3: "I MAC TESLA viaggiano in parallelo su VDE-TER: solo le stazioni VDES-capable li validano.",
    teslaOutOfBand4: "Piena conformità SOLAS e IALA senza ricertificazione hardware.",
    teslaSub2Title: "4.1 Le due interfacce logiche",
    teslaTable2Header1: "Interfaccia",
    teslaTable2Header2: "Funzione",
    teslaTable2Header3: "Buffer / Output",
    teslaTable2Row1Col1: "Receiver",
    teslaTable2Row1Col2: "Intercetta traffico in ingresso, verifica autenticità",
    teslaTable2Row1Col3: "Dual buffer (data + MAC), rilascia solo dati validati",
    teslaTable2Row2Col1: "Sender",
    teslaTable2Row2Col2: "Intercetta AIS in uscita, genera MAC TESLA paralleli",
    teslaTable2Row2Col3: "Trasmissione su VDE-TER, AIS forwardato invariato",

    // 5. Parameters
    teslaParamsTitle: "5. Parametri di protocollo",
    teslaParamsP1: "Tre parametri temporali determinano il trade-off sicurezza/latenza. Sono stati calibrati sui requisiti operativi di IALA G1192.",
    teslaTable3Header1: "Parametro",
    teslaTable3Header2: "Valore",
    teslaTable3Header3: "Razionale",
    teslaTable3Row1Col1: "Base Interval",
    teslaTable3Row1Col2: "3 secondi",
    teslaTable3Row1Col3: "Sotto i 10s richiesti da G1192; finestra di verifica 3–6s",
    teslaTable3Row2Col1: "Disclosure Delay (d)",
    teslaTable3Row2Col2: "2 intervalli",
    teslaTable3Row2Col3: "Gestisce l'effetto grey-zone causato da RTT variabile",
    teslaTable3Row3Col1: "Hash Chain Length",
    teslaTable3Row3Col2: "28.800 chiavi",
    teslaTable3Row3Col3: "24h di operatività continua; rigenerazione in ~5.4s su CPU mid-range",
    teslaSub3Title1: "5.1 Il \"grey-zone effect\" e perché d=2",
    teslaParamsP2: "Un pacchetto trasmesso al confine di uno slot temporale i può, a seconda del ritardo di propagazione, essere ricevuto nello slot i o nello slot i+1. Con d=2, quando la chiave K<sub>i</sub> viene rivelata all'intervallo i+2, il ricevitore tenta l'autenticazione sia degli slot i sia degli i+1, eliminando l'incertezza temporale.",
    teslaCodeBlock4: `Timeline ricevitore:

  Slot i        Slot i+1      Slot i+2
  ┌──────┐      ┌──────┐      ┌──────┐
  │ MAC  │      │ MAC  │      │ K_i  │ ← chiave rivelata
  │ data │      │ data │      └──┬───┘
  └──────┘      └──────┘         │
     ▲             ▲             │
     │             │             │
     └─────────────┴─────────────┘
       finestra di verifica duale
       (slot i + slot i+1)
`,
    teslaSub3Title2: "5.2 Primitive crittografiche",
    teslaTable4Header1: "Primitiva",
    teslaTable4Header2: "Algoritmo",
    teslaTable4Header3: "Output",
    teslaTable4Header4: "Troncato a",
    teslaTable4Row1Col1: "Hash chain",
    teslaTable4Row1Col2: "SHA-256",
    teslaTable4Row1Col3: "32 byte",
    teslaTable4Row1Col4: "32 byte (full)",
    teslaTable4Row2Col1: "MAC",
    teslaTable4Row2Col2: "HMAC-SHA256",
    teslaTable4Row2Col3: "32 byte",
    teslaTable4Row2Col4: "16 byte (sicurezza 2¹²⁸)",
    teslaTable4Row3Col1: "Linking structure",
    teslaTable4Row3Col2: "SHA-256",
    teslaTable4Row3Col3: "32 byte",
    teslaTable4Row3Col4: "8 byte (~1.8×10¹⁹ valori)",
    teslaCallout2Title: "🔍 Perché si tronca?",
    teslaCallout2Content: "Il truncamento è obbligato dal MTU di 38 byte del VDE-TER Link 11. Un MAC full-length forzerebbe la frammentazione, annullando il principale vantaggio di TESLA: la trasmissione atomica.",

    // 6. Messages
    teslaMessagesTitle: "6. Tipi di messaggio e strutture binarie",
    teslaMessagesP1: "Il protocollo definisce sei tipi di messaggio, divisi in bootstrap phase (autenticati via PKI) e operational phase (autenticati via TESLA).",
    teslaSub4Title1: "6.1 Bootstrap Phase — three-way handshake",
    teslaTable5Header1: "Tipo",
    teslaTable5Header2: "Nome",
    teslaTable5Header3: "Dimensione",
    teslaTable5Header4: "Contenuto chiave",
    teslaTable5Row1Col1: "1",
    teslaTable5Row1Col2: "Announcement",
    teslaTable5Row1Col3: "1137 byte",
    teslaTable5Row1Col4: "Cert X.509 (CXF), firma ECDSA, timestamp",
    teslaTable5Row2Col1: "2",
    teslaTable5Row2Col2: "Sync Request",
    teslaTable5Row2Col3: "1196 byte",
    teslaTable5Row2Col4: "TESLA params + commitment K₀ + temporal chain",
    teslaTable5Row3Col1: "3",
    teslaTable5Row3Col2: "Sync Response",
    teslaTable5Row3Col3: "1141 byte",
    teslaTable5Row3Col4: "Echo timestamp → mutua autenticazione",
    teslaCodeBlock5: `Three-way handshake con catena temporale:

   Station A                              Station B
       │                                       │
       │── Announcement (t_A) ────────────────►│
       │                                       │
       │◄─── Sync Request (t_r=t_A, t_B, K₀) ──│
       │                                       │
       │── Sync Response (t_s=t_B) ───────────►│
       │                                       │
   ✓ commitment validati                ✓ commitment validati
       │                                       │
       └────── transizione a operational ──────┘
`,
    teslaCallout3Title: "🔗 Temporal chaining",
    teslaCallout3Content: "Ogni messaggio del handshake è crittograficamente legato al timestamp del messaggio precedente. Un attacco di replay rompe la catena perché il timestamp non corrisponde più alla sessione corrente.",
    teslaSub4Title2: "6.2 Operational Phase — autenticazione ad alta frequenza",
    teslaTable6Header1: "Tipo",
    teslaTable6Header2: "Nome",
    teslaTable6Header3: "Dimensione",
    teslaTable6Header4: "Funzione",
    teslaTable6Row1Col1: "4",
    teslaTable6Row1Col2: "MAC packet",
    teslaTable6Row1Col3: "30 byte",
    teslaTable6Row1Col4: "Autenticatore di un singolo messaggio AIS",
    teslaTable6Row2Col1: "5",
    teslaTable6Row2Col2: "Key packet",
    teslaTable6Row2Col3: "36 byte",
    teslaTable6Row2Col4: "Rivela K<sub>i</sub> all'intervallo i+2 (autentica TUTTI i MAC dell'intervallo)",
    teslaTable6Row3Col1: "6",
    teslaTable6Row3Col2: "Refill packet",
    teslaTable6Row3Col3: "36 byte",
    teslaTable6Row3Col4: "Re-keying automatico senza ri-bootstrap PKI",
    teslaSub4Title3: "6.3 Anatomia del MAC packet (Type 4)",
    teslaCodeBlock6: `Offset | Lunghezza | Campo                  | Descrizione
-------+-----------+------------------------+----------------------------------
  0   |   2 byte  | Key Index (i)          | Indice intervallo TESLA
  2   |   4 byte  | Source Identifier      | MMSI o ID stazione
  6   |   8 byte  | Linking Structure      | SHA-256(AIS_msg) truncato a 64-bit
 14   |  16 byte  | Truncated HMAC         | HMAC-SHA256(K_i, msg) truncato 128-bit
-------+-----------+------------------------+----------------------------------
TOTALE:   30 byte                            ← entra in MTU 38B atomicamente!
`,
    teslaCallout4Title: "🎯 La proprietà critica: trasmissione atomica",
    teslaCallout4Content: "Un approccio PKI puro richiederebbe 103 byte (21B AIS + 72B ECDSA + 10B cert ref), forzando la frammentazione in 3-4 pacchetti. Con un packet error rate del 10% tipico VHF, la probabilità di ricevere tutti i frammenti scende al 65.6%. Un MAC TESLA atomico ha invece il 90% di success rate.",

    // 7. Sender
    teslaSenderTitle: "7. Implementazione del sender",
    teslaSenderP1: "Il sender opera come intercettore trasparente tra la sorgente AIS e il modulo VDES. Implementa un loop continuo che processa ogni intervallo di 3 secondi indipendentemente.",
    teslaCodeBlock7: `Pseudocodice del loop sender:

while True:
    K_i = chain.get_current_key()                # chiave dell'intervallo i

    for ais_msg in capture_during_interval():
        link  = SHA256(ais_msg)[:8]               # 8-byte linking structure
        mac   = HMAC_SHA256(K_i, SHA256(ais_msg))[:16]
        
        # MAC packet (30 byte, atomico) → VDE-TER
        send_via_vde_ter(MACPacket(i, src_id, link, mac))
        
        # AIS originale invariato → canale AIS legacy
        forward_to_legacy(ais_msg)

    if i > disclosure_delay:                      # i.e., i ≥ 2
        K_disclosed = chain.get_key(i - 2)
        send_via_vde_ter(KeyPacket(i-2, K_disclosed))

    if i >= chain_length - 2:                     # ~28798
        trigger_refill()                          # genera nuova catena

    sleep_until_next_interval()
`,
    teslaCallout5Title: "🔄 Re-keying senza bootstrap PKI",
    teslaCallout5Content: "Quando la catena si avvicina all'esaurimento, il sender genera una nuova catena e trasmette un Refill packet contenente il nuovo commitment K'₀ autenticato con una delle ultime chiavi della catena uscente. Si crea così continuità crittografica attraverso i confini delle catene, permettendo operatività indefinita con un solo bootstrap PKI iniziale.",

    // 8. Receiver
    teslaReceiverTitle: "8. Implementazione del receiver",
    teslaReceiverP1: "Il receiver implementa un sistema di verifica asincrona costruito attorno a due buffer logici indipendenti che gestiscono il disaccoppiamento temporale tra arrivo dati e disponibilità chiave.",
    teslaSub5Title1: "8.1 Architettura dual-buffer",
    teslaTable7Header1: "Buffer",
    teslaTable7Header2: "Indicizzato per",
    teslaTable7Header3: "Contenuto",
    teslaTable7Header4: "Finalità",
    teslaTable7Row1Col1: "Data Buffer",
    teslaTable7Row1Col2: "Linking structure (8B hash)",
    teslaTable7Row1Col3: "Payload AIS + indici presunti per ogni peer",
    teslaTable7Row1Col4: "Memorizza dati in attesa del MAC e della chiave",
    teslaTable7Row2Col1: "MAC Buffer",
    teslaTable7Row2Col2: "Per peer + key index",
    teslaTable7Row2Col3: "MAC + linking + timestamp ricezione",
    teslaTable7Row2Col4: "Memorizza autenticatori in attesa della chiave",
    teslaReceiverP2: "Poiché i pacchetti dati arrivano senza attribuzione di sorgente autenticata (conseguenza dell'architettura out-of-band), il receiver deve fare associazione speculativa: per ogni pacchetto AIS registra l'indice presunto per ciascun peer attualmente sincronizzato.",
    teslaSub5Title2: "8.2 Esempio di Data Buffer",
    teslaTable8Header1: "Linking Structure",
    teslaTable8Header2: "Payload",
    teslaTable8Header3: "Indici peer presunti",
    teslaTable8Row1Col1: "0x0FEE2B",
    teslaTable8Row1Col2: "DATA",
    teslaTable8Row1Col3: "A:102 B:107 C:100",
    teslaTable8Row2Col1: "0xCF5747",
    teslaTable8Row2Col2: "DATA",
    teslaTable8Row2Col3: "A:102 B:107 C:100",
    teslaTable8Row3Col1: "0xA781C1",
    teslaTable8Row3Col2: "DATA",
    teslaTable8Row3Col3: "A:102 B:106 C:99",
    teslaTable8Row4Col1: "0x840462",
    teslaTable8Row4Col2: "DATA",
    teslaTable8Row4Col3: "A:101 B:106 C:99",
    teslaSub5Title3: "8.3 Pipeline di verifica",
    teslaCodeBlock8: `1. Arrivo DATA packet:
   ├─ calcola linking = SHA256(payload)[:8]
   └─ inserisci in Data Buffer con indici presunti per ogni peer

2. Arrivo MAC packet:
   ├─ check finestra temporale (anti early-disclosure attack)
   └─ inserisci in MAC Buffer del peer specificato

3. Arrivo KEY packet:
   ├─ valida chain: SHA256^i(K_i) ?= K_0   (o vs chiave precedente)
   ├─ retrieve MAC Buffer per slot i E slot i+1 (grey-zone)
   ├─ per ogni MAC:
   │    ├─ cerca data nel Data Buffer per linking structure
   │    ├─ check temporal alignment (peer presunto ≈ key index)
   │    ├─ ricomputa: HMAC(K_i, SHA256(data))[:16]
   │    └─ confronta con MAC ricevuto
   └─ se match → AUTENTICATO → forward a application layer
`,
    teslaCallout6Title: "🛡️ Resilienza DoS",
    teslaCallout6Content: "Il dual-buffer è progettato per essere resistente a flood DoS. In caso di flood di MAC packet, il traffico è isolato in un singolo time slot. Al termine dello slot, le entry pendenti vengono purgate, evitando che il carico computazionale si propaghi a slot futuri.",

    // 9. Performance
    teslaPerfTitle: "9. Performance: PKI vs TESLA",
    teslaPerfSub1: "9.1 Latenza di autenticazione",
    teslaTable9Header1: "Metrica",
    teslaTable9Header2: "PKI puro (ECDSA)",
    teslaTable9Header3: "TESLA",
    teslaTable9Row1Col1: "Latenza teorica",
    teslaTable9Row1Col2: "~110 ms",
    teslaTable9Row1Col3: "3-6 s (strutturale)",
    teslaTable9Row2Col1: "Success rate (PER 10%)",
    teslaTable9Row2Col2: "65.6% (4 frammenti)",
    teslaTable9Row2Col3: "90% (atomico)",
    teslaTable9Row3Col1: "Latenza pratica (34% fallisce)",
    teslaTable9Row3Col2: "Illimitata",
    teslaTable9Row3Col3: "Deterministica 3-6s",
    teslaTable9Row4Col1: "Compatibilità ciclo AIS (2-10s)",
    teslaTable9Row4Col2: "❌ Frammentato",
    teslaTable9Row4Col3: "✅ Allineato",
    teslaPerfSub2: "9.2 Efficienza di canale",
    teslaCallout7Title: "📉 -62.5% di occupazione canale",
    teslaCallout7Content: "TESLA lega l'autenticazione agli intervalli temporali (binding 1:N): una singola chiave rivelata valida TUTTI i messaggi inviati nello stesso intervallo. PKI invece lega ogni firma a un singolo messaggio (binding 1:1). Più traffico c'è, più TESLA è efficiente.",
    teslaPerfSub3: "9.3 Scalabilità computazionale",
    teslaTable10Header1: "Scenario: 500 navi @ 1 msg/s",
    teslaTable10Header2: "PKI (ECDSA)",
    teslaTable10Header3: "TESLA",
    teslaTable10Row1Col1: "Tempo per verifica",
    teslaTable10Row1Col2: "4.1 ms",
    teslaTable10Row1Col3: "0.015 ms",
    teslaTable10Row2Col1: "Carico CPU aggregato",
    teslaTable10Row2Col2: "2.05 s/s",
    teslaTable10Row2Col3: "7.5 ms/s",
    teslaTable10Row3Col1: "Utilizzo CPU",
    teslaTable10Row3Col2: "205% ❌ impossibile",
    teslaTable10Row3Col3: "<1% ✅",

    // 10. Security
    teslaSecTitle: "10. Proprietà di sicurezza",
    teslaSecTableHeader1: "Attacco",
    teslaSecTableHeader2: "Mitigazione TESLA",
    teslaSecTableHeader3: "Verifica sperimentale",
    teslaSecTableRow1Col1: "Replay",
    teslaSecTableRow1Col2: "Indici di chiave assoluti basati sul tempo: messaggi obsoleti rifiutati",
    teslaSecTableRow1Col3: "100% rejection rate",
    teslaSecTableRow2Col1: "Modification",
    teslaSecTableRow2Col2: "HMAC invalidato da qualsiasi alterazione",
    teslaSecTableRow2Col3: "100% detection",
    teslaSecTableRow3Col1: "Wormhole / tunneling",
    teslaSecTableRow3Col2: "Acceptance window di 1 intervallo: pacchetti tunnelati arrivano in ritardo e sono scartati",
    teslaSecTableRow3Col3: "100% detection",
    teslaSecTableRow4Col1: "Bootstrap replay",
    teslaSecTableRow4Col2: "Temporal chaining nei tre messaggi del handshake",
    teslaSecTableRow4Col3: "100% rejection",
    teslaSecTableRow5Col1: "MAC spoofing",
    teslaSecTableRow5Col2: "Senza chiave non rivelata, MAC validi non forgiabili",
    teslaSecTableRow5Col3: "Pacchetti spoofati correttamente scartati",
    teslaCallout8Title: "🔮 Post-quantum readiness",
    teslaCallout8Content: "La fase operativa di TESLA si basa esclusivamente su primitive simmetriche (SHA-256, HMAC-SHA256), che restano resistenti agli algoritmi quantistici noti (es. Grover dimezza solo la sicurezza effettiva). Solo il bootstrap PKI richiederebbe migrazione a schemi post-quantum (es. ML-DSA / Dilithium).",

    // 11. Takeaways
    teslaTakeawaysTitle: "11. Takeaway didattici",
    teslaCard1Title: "🔑 Asimmetria temporale",
    teslaCard1Text: "TESLA sostituisce l'asimmetria crittografica (chiavi pubbliche/private) con un'asimmetria temporale: la stessa chiave simmetrica diventa 'pubblica' solo dopo la trasmissione del messaggio.",
    teslaCard2Title: "🚢 Out-of-band = retrocompatibilità",
    teslaCard2Text: "Separare dati e autenticazione su canali diversi è ciò che permette di aggiungere sicurezza senza modificare hardware certificato e senza rompere i ricevitori legacy.",
    teslaCard3Title: "⏱️ Latenza ≠ inutilità",
    teslaCard3Text: "6 secondi di ritardo sembrano molti, ma allineati al ciclo AIS (2-10s) sono irrilevanti: un dato verificato in 6s è meglio di uno non verificato o perso per frammentazione.",
    teslaCard4Title: "✂️ Truncamento è ingegneria",
    teslaCard4Text: "Troncare HMAC a 16 byte e linking a 8 byte non è 'indebolimento': è un'analisi rigorosa del trade-off tra spazio (MTU 38B) e sicurezza effettiva (2¹²⁸ resta infattibile).",
    teslaQuizTitle: "11.1 Quiz di autovalutazione",
    teslaQuiz1: "Perché il disclosure delay è impostato a 2 intervalli e non a 1?",
    teslaQuiz2: "Quale primitiva crittografica è usata per la hash chain e perché è 'one-way'?",
    teslaQuiz3: "Quanti byte occupa un MAC packet e perché esattamente quel valore?",
    teslaQuiz4: "Cosa succede se un Key packet viene perso in trasmissione?",
    teslaQuiz5: "Come fa il Refill packet a evitare un nuovo bootstrap PKI?",
     teslaQuiz6: "Perché un attacco wormhole fallisce contro questa implementazione?",

     // 12. References
     teslaRefsTitle: "12. Riferimenti",
     teslaRef1Text: "RFC 4082 — TESLA Broadcast Authentication Protocol (Perrig et al.)",
     teslaRef2Text: "RFC 2104 — HMAC: Keyed-Hashing for Message Authentication",
     teslaRef3Text: "IALA Guideline G1192 — VDES Authentication Techniques (Ed. 1.0, 2025)",
     teslaRef4Text: "ITU-R M.2092-1 — VDES technical characteristics",
     teslaRef5Text: "ITU-R M.1371-5 — AIS technical characteristics",
     teslaRef6Text: "IEC 61162-450:2018 — Maritime Ethernet interconnection",
     teslaRef7Text: "IEC 63173-2:2022 — SECOM",
     teslaRef8Text: "NIST FIPS 180-4 — Secure Hash Standard; NIST FIPS 186-4 — Digital Signature Standard; RFC 5280 — X.509 PKI certificate profile",

    // ── TESLA MMS Integration (Chapter 4.4 extensions) ──
    teslaMMSTitle: "13. Integrazione TESLA con MMS (RTCM 13900.0)",
    teslaMMSIntro: "Il protocollo TESLA può essere integrato nativamente all'interno dello stack MMS, diventando un layer di autenticazione distribuito tramite i meccanismi di pub/sub e subject-based addressing definiti da RTCM 13900.0.",
    teslaMMSKeyDistTitle: "Distribuzione K₀ via MMS Subject Subscription",
    teslaMMSKeyDist: "Il commitment K₀ viene pubblicato sul topic MMS dedicato tesla/commitments/{MRN}. Ogni nodo che desidera verificare i messaggi di una stazione si iscrive a quel topic; il MMS Edge Router si occupa del routing basato sull'identità MRN.",
    teslaMMSKeyPacketsTitle: "Key Packet come MMTP Subscribe-by-Subject",
    teslaMMSKeyPackets: "I key packet sono incapsulati in messaggi MMTP con campi Subject e Recipient MRN, permettendo al Receiver di filtrare automaticamente le chiavi rilevanti senza processare l'intero flusso VDES.",
    teslaMMSBootstrapTitle: "Bootstrap PKI con Maritime Identity Registry (MIR)",
    teslaMMSBootstrap: "La fiducia iniziale si basa sui certificati X.509 emessi dal MIR. K₀ è firmato dal MIR e distribuito come attributo del profilo navale; non è necessario un PKI separato.",
    teslaMMSECOMTitle: "SECOM Gateway: bridging IP↔VDES per sincronizzazione cross-bearer",
    teslaMMSECOM: "Il SECOM Gateway (IEC 63173-2) fa da bridge tra il mondo IP (MMTP) e il mondo VDES (IEC 61162-450), garantendo che le chiavi TESLA possano essere scambiate anche su link satellitari o terrestri in modo trasparente.",
    teslaUMLTitle: "Diagramma UML di integrazione MMS",
    teslaUMLDiagram: `@startuml
!define RECTANGLE class

RECTANGLE "MMS Agent" as AGENT
RECTANGLE "TESLA Auth" as TESLA
RECTANGLE "MMS Edge Router" as ROUTER
RECTANGLE "Router Network" as NET

AGENT -> ROUTER : MMTP (SMMP payload)\nwith TESLA MAC
ROUTER -> TESLA : Subscribe\ntesla/commitments/{MRN}
TESLA --> ROUTER : Key Packet\n(MMTP)
ROUTER -> NET : Forward\nMMTP
NET --> ROUTER : ACK / NACK

note top of AGENT\nGenerates SMMP messages\nwith TESLA MAC
end note

note top of TESLA\nHash chain generation,\nkey disclosure, MAC verify
end note

@enduml`,

    // ── VDES Controller as MMS Edge Router Extension ──
    vdesCtrlMiddlewareRedefTitle: "Ridefinizione del middleware: MMS Edge Router VDES-enabled",
    vdesCtrlMiddlewareRedefP1: "L'Auth Interceptor Dockerizzato viene riformulato come estensione diretta dell'MMS Edge Router definito da RTCM 13900.0, invece che come componente separato. Questo allinea l'implementazione alla roadmap IMO/IALA e riutilizza il trust framework MCP.",
    vdesCtrlMMSIntegration: "Il Edge Router espone un plugin VDES che gestisce la conversione S-125→AIS21 e l'invio UDP al modem, mentre la logica TESLA (se abilitata) viene agganciata come filtro sul flusso MMTP in uscita.",

    // ── TESLA Section 14 ──
    teslaMiddlewareRedefTitle: "14. Ridefinizione del middleware: MMS Edge Router VDES-enabled",
    teslaAlignTitle: "Allineamento con la roadmap IMO/IALA",
    teslaAlignText: "Riformulando l'Auth Interceptor come estensione dell'MMS Edge Router, l'implementazione si allinea alla roadmap IMO/IALA per l'e-Navigation, garantendo interoperabilità con gli standard internazionali.",
    teslaReuseTitle: "Riuso del trust framework MCP",
    teslaReuseText: "Il progetto riutilizza il Maritime Connectivity Platform (MCP) trust framework per l'autenticazione dei nodi, evitando duplicazioni e semplificando la gestione delle identità.",
    teslaPublishTitle: "Pubblicazione TESLA come servizio MMS",
    teslaPublishText: "Il servizio TESLA (generazione catene, rivelazione chiavi) viene esposto come servizio MMS tramite soggetti dedicati, consentendo a tutti i nodi abilitati di sottoscrivere e consumare le chiavi in modo standardizzato.",
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
    // ── VDES Controller Integration ──
    vdesCtrlView: "VDES Controller Integration",
    vdesCtrlChapter: "Chapter 5 · Reference Implementations",
    vdesCtrlOverview: "VDES Controller Overview",
    vdesCtrlWhy: "Why Integrate the VDES Controller",
    vdesCtrlArchitecture: "Microservice Architecture",
    vdesCtrlProtocols: "Transmission Protocols: VDM, TSA, BBM",
    vdesCtrlAtoN: "AtoN Service Integration",
    vdesCtrlHardware: "Hardware Integration: VDES1000 & E320",
    vdesCtrlMMSRelation: "Relationship with MMS Architecture",
    vdesCtrlConfig: "Configuration & Deployment",
    vdesCtrlFlow: "End-to-End VAtoN Transmission Flow",
    vdesCtrlPitfalls: "Common Pitfalls",
    vdesCtrlRefs: "References",
    vdesCtrlSubtitle: "How the open-source microservice from General Lighthouse Authorities (GLA-RAD) fits into the VDES architecture and its role in the MMS stack.",
    vdesCtrlOneLineTitle: "In a Nutshell",
    vdesCtrlOneLineDesc: "The VDES Controller is the shore-side software driver that converts S-125 (AtoN) data into AIS Message 21 and delivers it via UDP to the radio modem.",
    vdesCtrlStackTitle: "Context Diagram",
    vdesCtrlTechStackTitle: "Technology Stack",
    vdesCtrlWhyP1: "The MMS standard (RTCM 13900.0) describes the logical architecture for secure maritime message transfer over VDES, but does not specify how to drive the physical modem. The VDES Controller is one of the few open-source examples showing how to 'close the loop' between the application layer (S-100 services) and the radio hardware.",
    vdesCtrlWhyP2: "It is therefore useful to study for three reasons:",
    vdesCtrlWhyBullet1: "understand how a VDM/TSA/BBM sentence is materialised in practice",
    vdesCtrlWhyBullet2: "see a real-world use case of Spring Boot in the maritime domain",
    vdesCtrlWhyBullet3: "clearly distinguish the role of a transmission controller from an MMS Edge Router",
    vdesCtrlProtoDesc: "The Controller communicates with the modem by sending NMEA sentences (IEC 61162-1) encapsulated in UDP datagrams (IEC 61162-450). The three main types used are:",
    vdesCtrlBBMExample: "BBM Sentence Example",
    vdesCtrlUDPFlow: "UDP Packet Flow",
    vdesCtrlPortNoteTitle: "Note on Ports",
    vdesCtrlPortNoteDesc: "UDP ports are configurable via application.properties. The values above are indicative and depend on VDES1000 firmware and Controller configuration.",
    vdesCtrlPollingREST: "Polling REST",
    vdesCtrlPollingPros: "Simple, stateless, easy debugging",
    vdesCtrlPollingCons: "Latency, constant load",
    vdesCtrlPollingWhen: "Test environments or small fleet",
    vdesCtrlSubscribe: "Subscribe (pub/sub)",
    vdesCtrlSubscribePros: "Real-time, efficient",
    vdesCtrlSubscribeCons: "Requires broker (Kafka/AMQP)",
    vdesCtrlSubscribeWhen: "Production at scale",
    vdesCtrlMappingTitle: "S-125 → AIS Msg 21 Mapping",
    vdesCtrlProdPath: "Production Path — CML VDES1000",
    vdesCtrlTestPath: "Test Path — Ettus USRP E320",
    vdesCtrlE320AdvTitle: "Educational Advantage of E320",
    vdesCtrlE320AdvDesc: "Allows studying the VDES physical layer without purchasing a certified modem, and capturing RF signals with tools like GQRX or Inspectrum.",
    vdesCtrlPyVdesTitle: "Complementary Component: py_vdes1000",
    vdesCtrlPyVdesDesc: "The GLA-RAD also publishes a Python package (py_vdes1000) to interact directly with the transceiver, useful as a test bench before integrating the Java microservice. Includes examples (minimal_tx.py, vdes_tx_app.py, vdes_rx_app.py) for transmitting AIS, VDES-ASM, and VDE.",
    vdesCtrlFundamentalTitle: "Fundamental Distinction",
    vdesCtrlFundamentalDesc: "The VDES Controller is NOT an MMS Agent and does NOT implement MMTP. It is a transmission controller operating at the layer immediately above the modem, not at the application messaging layer.",
    vdesCtrlCompareTitle: "Stack Comparison",
    vdesCtrlConvergeTitle: "Possible Convergence Points",
    vdesCtrlConvergeDesc: "In a future installation fully compliant with RTCM 13900.0, the VDES Controller could be used as a 'driver' under the MMS Edge Router VDES-enabled. The MMS specification requires the vessel to be equipped with a VDES-enabled Edge Router, a VDES modem compliant with ITU-R M.2092-1, and to be within a VDES Network MMS-enabled coverage area. The VDES Controller can cover the modem driver role in such a chain.",
    vdesCtrlConfigExampleTitle: "application.properties Example",
    vdesCtrlQuickStartTitle: "7-Step Quick Start",
    vdesCtrlStep1: "Clone the repo",
    vdesCtrlStep2: "Start Eureka and Keycloak with realm enav",
    vdesCtrlStep3: "Configure application.properties",
    vdesCtrlStep4: "Build with Maven",
    vdesCtrlStep5: "Run",
    vdesCtrlStep6: "Verify registration",
    vdesCtrlStep7: "Capture UDP with tcpdump",
    vdesCtrlFlowTitle: "End-to-End VAtoN Transmission Flow",
    vdesCtrlFlowSeq: "Timeline:",
    vdesCtrlPitfallsTitle: "Common Pitfalls",
    vdesCtrlPitfall1Title: "❌ Confusing VDES Controller with MMS Agent",
    vdesCtrlPitfall1Desc: "They are different layers. The MMS Agent lives in the RTCM 13900.0 stack; the VDES Controller is a shore-side component of the GLA service architecture.",
    vdesCtrlPitfall2Title: "⚠️ Ignoring AIS > ASM > VDE-TER priority",
    vdesCtrlPitfall2Desc: "The VDES specification mandates that AIS transmission has priority over VDES ASM and VDE-TER. The Controller does not bypass this rule: if you send too many BBM, AIS position reports remain dominant.",
    vdesCtrlPitfall3Title: "⚠️ First-generation hardware",
    vdesCtrlPitfall3Desc: "First-generation VDES1000 cannot transmit on multiple channels simultaneously: total capacity is limited to 2,250 slots/min across all VDES channels.",
    vdesCtrlPitfall4Title: "ℹ️ SECCOM ≠ MMS authentication",
    vdesCtrlPitfall4Desc: "Application security (SECOMLib, IEC 63173-2) operates at HTTPS level between microservices. VDES radio authentication (e.g., TESLA) is a separate layer and is not handled by the Controller.",
    vdesCtrlRefsTitle: "References",
    vdesCtrlFooter: "📘 MMS-VDES Architecture Guide — Chapter 5.2 ·",
    vdesCtrlEditLink: "Edit this page on GitHub",

    // ── TESLA Protocol (Chapter 4.4) ──
    teslaChapter: "Chapter 4.4 · VDES Security & Authentication",
    teslaTitle: "The TESLA Protocol for Broadcast Authentication on VDES",
    teslaSubtitle: "How to adapt the Timed Efficient Stream Loss-tolerant Authentication protocol to the constraints of the maritime VHF channel, ensuring cryptographic authentication with full AIS backward compatibility.",
    teslaSource: "📘 Nicola Lepore, Master's Thesis, University of Pisa",
    teslaEditLink: "Edit this page on GitHub",
    teslaFooterCredit: "Based on the master's thesis by Nicola Lepore — University of Pisa, CNIT, Leonardo S.p.A.",

    // 1. Problem
    teslaProblemTitle: "1. The AIS/VDES Authentication Problem",
    teslaProblemP1: "AIS and VDES systems were designed with priority on data availability, not on authenticity. This makes them vulnerable to spoofing attacks, where an attacker can fabricate fake navigation scenarios: non-existent vessels, altered positions, phony virtual AtoNs.",
    teslaProblemCalloutTitle: "⚠️ Structural Vulnerabilities of VDES",
    teslaProblemCallout1: "Legacy AIS formats are immutable for backward compatibility reasons.",
    teslaProblemCallout2: "Digital signatures (even ECDSA) occupy a prohibitive percentage of VDES slots.",
    teslaProblemCallout3: "VDE-TER Link 11 has an MTU of only 38 bytes.",
    teslaProblemCallout4: "Real-time PKI validation over VHF is operationally impractical.",
    teslaProblemP2: "The IALA Guideline G1192 (2025) formalized the regulatory consensus: authentication must be out-of-band, separate from navigation data, and based on TESLA-like key-chain mechanisms.",

    // 2. State of the Art
    teslaSotaTitle: "2. State of the Art: PKI vs TESLA",
    teslaSotaHeader1: "Approach",
    teslaSotaHeader2: "Pros",
    teslaSotaHeader3: "Cons",
    teslaSotaHeader4: "VDES Suitability",
    teslaSotaRow1Col1: "TLS / SECOM (IEC 63173-2)",
    teslaSotaRow1Col2: "Mature, standardized, end-to-end",
    teslaSotaRow1Col3: "JSON verbosity, costly handshake",
    teslaSotaRow1Col4: "❌ Broadband IP only",
    teslaSotaRow2Col1: "ECDSA P-256 over VHF",
    teslaSotaRow2Col2: "Non-repudiation, asymmetric",
    teslaSotaRow2Col3: "72 byte/signature → fragmentation",
    teslaSotaRow2Col4: "⚠️ Marginal",
    teslaSotaRow3Col1: "TESLA (RFC 4082)",
    teslaSotaRow3Col2: "Minimal overhead, native broadcast",
    teslaSotaRow3Col3: "Structural verification latency",
    teslaSotaRow3Col4: "✅ Ideal for VDE-TER",
    teslaSotaCalloutTitle: "Why TESLA wins on VDES",
    teslaSotaCalloutContent: "TESLA uses only symmetric primitives (SHA-256, HMAC) for operational authentication. A single revealed key authenticates dozens of messages: the per-message cost becomes marginal.",

    // 3. TESLA Intro
    teslaTeslaIntroTitle: "3. Introduction to the TESLA Protocol",
    teslaTeslaIntroP1: "TESLA (Timed Efficient Stream Loss-tolerant Authentication) is a broadcast authentication protocol based on temporal asymmetry: it uses symmetric MACs, but reveals keys only after the messages have been transmitted. An attacker cannot forge valid MACs because at transmission time the key is not yet known.",
    teslaSub1Title: "3.1 The hash chain (one-way key chain)",
    teslaTeslaP2: "The sender generates a chain of keys by repeatedly applying SHA-256 starting from a random seed:",
    teslaTeslaFormula: "K<sub>i</sub> = H(K<sub>i+1</sub>) &nbsp; with &nbsp; H = SHA-256",
    teslaTeslaP3: "Keys are used in reverse order of generation: K<sub>0</sub> is the public commitment (trust root), then K<sub>1</sub>, K<sub>2</sub>, K<sub>3</sub>... are revealed one by one. Each received key can be validated by climbing the chain back to K<sub>0</sub>.",
    teslaTeslaCodeBlock1: `Generation (sender):
  seed → K_N → K_{N-1} → ... → K_2 → K_1 → K_0
                                               ↑
                                           commitment

Disclosure (broadcast):
  t=0:    K_0 (published via PKI)
  t=3s:   ...messages authenticated with K_1...
  t=6s:   K_1 revealed     ← receiver can now verify
  t=9s:   K_2 revealed
  ...`,

    // 4. Middleware
    teslaMiddlewareTitle: "4. Out-of-band Middleware Architecture",
    teslaMiddlewareP1: "The core of the implementation is a Dockerized Auth Interceptor System, hosted on an external device physically isolated from the VDES transceiver. It acts as a transparent proxy on the IEC 61162-450 Ethernet backbone, intercepting UDP traffic to run TESLA logic in an isolated environment.",
    teslaMiddlewareCodeBlock: `        ┌─────────────────────────────────────────────────────┐
        │            AUTH INTERCEPTOR SYSTEM                   │
        │              (Docker container)                      │
        │                                                      │
        │  ┌──────────────────┐      ┌──────────────────┐    │
        │  │ Sender Interface │      │ Receiver Interf. │    │
        │  │                  │      │                  │    │
        │  │ • intercept AIS  │      │ • Data Buffer    │    │
        │  │ • generate MAC   │      │ • MAC Buffer     │    │
        │  │ • reveal keys    │      │ • verifier       │    │
        │  └────────┬─────────┘      └────────┬─────────┘    │
        └───────────┼─────────────────────────┼──────────────┘
                    │                         │
                    ▼ UDP (IEC 61162-450)     ▲
        ┌──────────────────────────────────────────────────┐
        │              VDES TRANSCEIVER (legacy)            │
        │           AIS Channel  │  VDE-TER Channel         │
        └────────┬─────────────────────────┬───────────────┘
                 │ AIS data                │ TESLA auth
                 ▼ (legacy channel)         ▼ (parallel channel)
                        VHF
`,
    teslaOutOfBandTitle: "✅ Benefits of the out-of-band approach",
    teslaOutOfBand1: "Zero changes to certified VDES modem firmware.",
    teslaOutOfBand2: "AIS data travels on the legacy channel: non-VDES receivers work normally.",
    teslaOutOfBand3: "TESLA MACs travel in parallel on VDE-TER: only VDES-capable stations validate them.",
    teslaOutOfBand4: "Full SOLAS and IALA compliance without hardware re-certification.",
    teslaSub2Title: "4.1 The Two Logical Interfaces",
    teslaTable2Header1: "Interface",
    teslaTable2Header2: "Function",
    teslaTable2Header3: "Buffer / Output",
    teslaTable2Row1Col1: "Receiver",
    teslaTable2Row1Col2: "Intercepts incoming traffic, verifies authenticity",
    teslaTable2Row1Col3: "Dual buffer (data + MAC), releases only validated data",
    teslaTable2Row2Col1: "Sender",
    teslaTable2Row2Col2: "Intercepts outbound AIS, generates parallel TESLA MACs",
    teslaTable2Row2Col3: "Transmission over VDE-TER, AIS forwarded unchanged",

    // 5. Parameters
    teslaParamsTitle: "5. Protocol Parameters",
    teslaParamsP1: "Three temporal parameters determine the security/latency trade-off. They have been calibrated to IALA G1192 operational requirements.",
    teslaTable3Header1: "Parameter",
    teslaTable3Header2: "Value",
    teslaTable3Header3: "Rationale",
    teslaTable3Row1Col1: "Base Interval",
    teslaTable3Row1Col2: "3 seconds",
    teslaTable3Row1Col3: "Below 10s required by G1192; verification window 3–6s",
    teslaTable3Row2Col1: "Disclosure Delay (d)",
    teslaTable3Row2Col2: "2 intervals",
    teslaTable3Row2Col3: "Manages grey-zone effect caused by variable RTT",
    teslaTable3Row3Col1: "Hash Chain Length",
    teslaTable3Row3Col2: "28,800 keys",
    teslaTable3Row3Col3: "24h continuous operation; regeneration in ~5.4s on mid-range CPU",
    teslaSub3Title1: "5.1 The \"grey-zone effect\" and why d=2",
    teslaParamsP2: "A packet transmitted at the boundary of time slot i may, depending on propagation delay, be received in slot i or slot i+1. With d=2, when key K<sub>i</sub> is revealed at interval i+2, the receiver attempts authentication for both slot i and slot i+1, eliminating temporal uncertainty.",
    teslaCodeBlock4: `Receiver timeline:

  Slot i        Slot i+1      Slot i+2
  ┌──────┐      ┌──────┐      ┌──────┐
  │ MAC  │      │ MAC  │      │ K_i  │ ← key revealed
  │ data │      │ data │      └──┬───┘
  └──────┘      └──────┘         │
     ▲             ▲             │
     │             │             │
     └─────────────┴─────────────┘
       dual verification window
       (slot i + slot i+1)
`,
    teslaSub3Title2: "5.2 Cryptographic Primitives",
    teslaTable4Header1: "Primitive",
    teslaTable4Header2: "Algorithm",
    teslaTable4Header3: "Output",
    teslaTable4Header4: "Truncated to",
    teslaTable4Row1Col1: "Hash chain",
    teslaTable4Row1Col2: "SHA-256",
    teslaTable4Row1Col3: "32 bytes",
    teslaTable4Row1Col4: "32 bytes (full)",
    teslaTable4Row2Col1: "MAC",
    teslaTable4Row2Col2: "HMAC-SHA256",
    teslaTable4Row2Col3: "32 bytes",
    teslaTable4Row2Col4: "16 bytes (128-bit security)",
    teslaTable4Row3Col1: "Linking structure",
    teslaTable4Row3Col2: "SHA-256",
    teslaTable4Row3Col3: "32 bytes",
    teslaTable4Row3Col4: "8 bytes (~1.8×10¹⁹ values)",
    teslaCallout2Title: "🔍 Why truncate?",
    teslaCallout2Content: "Truncation is mandatory due to the 38-byte MTU of VDE-TER Link 11. A full-length MAC would force fragmentation, cancelling TESLA's main advantage: atomic transmission.",

    // 6. Messages
    teslaMessagesTitle: "6. Message Types & Binary Structures",
    teslaMessagesP1: "The protocol defines six message types, split into bootstrap phase (PKI-authenticated) and operational phase (TESLA-authenticated).",
    teslaSub4Title1: "6.1 Bootstrap Phase — three-way handshake",
    teslaTable5Header1: "Type",
    teslaTable5Header2: "Name",
    teslaTable5Header3: "Size",
    teslaTable5Header4: "Key Content",
    teslaTable5Row1Col1: "1",
    teslaTable5Row1Col2: "Announcement",
    teslaTable5Row1Col3: "1137 bytes",
    teslaTable5Row1Col4: "X.509 Cert (CXF), ECDSA signature, timestamp",
    teslaTable5Row2Col1: "2",
    teslaTable5Row2Col2: "Sync Request",
    teslaTable5Row2Col3: "1196 bytes",
    teslaTable5Row2Col4: "TESLA params + commitment K₀ + temporal chain",
    teslaTable5Row3Col1: "3",
    teslaTable5Row3Col2: "Sync Response",
    teslaTable5Row3Col3: "1141 bytes",
    teslaTable5Row3Col4: "Echo timestamp → mutual authentication",
    teslaCodeBlock5: `Three-way handshake with temporal chaining:

   Station A                              Station B
       │                                       │
       │── Announcement (t_A) ────────────────►│
       │                                       │
       │◄─── Sync Request (t_r=t_A, t_B, K₀) ──│
       │                                       │
       │── Sync Response (t_s=t_B) ───────────►│
       │                                       │
   ✓ commitments validated                ✓ commitments validated
       │                                       │
       └───────── transition to operational ──┘
`,
    teslaCallout3Title: "🔗 Temporal chaining",
    teslaCallout3Content: "Each handshake message is cryptographically linked to the previous message's timestamp. A replay attack breaks the chain because the timestamp no longer matches the current session.",
    teslaSub4Title2: "6.2 Operational Phase — high-frequency authentication",
    teslaTable6Header1: "Type",
    teslaTable6Header2: "Name",
    teslaTable6Header3: "Size",
    teslaTable6Header4: "Function",
    teslaTable6Row1Col1: "4",
    teslaTable6Row1Col2: "MAC packet",
    teslaTable6Row1Col3: "30 bytes",
    teslaTable6Row1Col4: "Authenticator for a single AIS message",
    teslaTable6Row2Col1: "5",
    teslaTable6Row2Col2: "Key packet",
    teslaTable6Row2Col3: "36 bytes",
    teslaTable6Row2Col4: "Reveals K_i at interval i+2 (authenticates ALL MACs of that interval)",
    teslaTable6Row3Col1: "6",
    teslaTable6Row3Col2: "Refill packet",
    teslaTable6Row3Col3: "36 bytes",
    teslaTable6Row3Col4: "Automatic re-keying without re-bootstrap PKI",
    teslaSub4Title3: "6.3 MAC Packet Anatomy (Type 4)",
    teslaCodeBlock6: `Offset | Length | Field                  | Description
-------+--------+------------------------+-----------------------------------
  0   |  2 B   | Key Index (i)          | TESLA interval index
  2   |  4 B   | Source Identifier      | MMSI or station ID
  6   |  8 B   | Linking Structure      | SHA-256(AIS_msg) truncated to 64-bit
 14   | 16 B   | Truncated HMAC         | HMAC-SHA256(K_i, msg) truncated 128-bit
-------+--------+------------------------+-----------------------------------
TOTAL:   30 bytes                           ← fits in 38B MTU atomically!
`,
    teslaCallout4Title: "🎯 Critical property: atomic transmission",
    teslaCallout4Content: "A pure PKI approach would require 103 bytes (21B AIS + 72B ECDSA + 10B cert ref), forcing fragmentation into 3-4 packets. With a typical VHF packet error rate of 10%, the probability of receiving all fragments drops to 65.6%. A TESLA atomic MAC achieves a 90% success rate.",

    // 7. Sender
    teslaSenderTitle: "7. Sender Implementation",
    teslaSenderP1: "The sender operates as a transparent interceptor between the AIS source and the VDES module. It implements a continuous loop that processes each 3-second interval independently.",
    teslaCodeBlock7: `Sender loop pseudocode:

while True:
    K_i = chain.get_current_key()                # key for interval i

    for ais_msg in capture_during_interval():
        link  = SHA256(ais_msg)[:8]               # 8-byte linking structure
        mac   = HMAC_SHA256(K_i, SHA256(ais_msg))[:16]

        # MAC packet (30 B, atomic) → VDE-TER
        send_via_vde_ter(MACPacket(i, src_id, link, mac))

        # Original AIS unchanged → legacy AIS channel
        forward_to_legacy(ais_msg)

    if i > disclosure_delay:                      # i.e., i ≥ 2
        K_disclosed = chain.get_key(i - 2)
        send_via_vde_ter(KeyPacket(i-2, K_disclosed))

    if i >= chain_length - 2:                     # ~28798
        trigger_refill()                          # generate new chain

    sleep_until_next_interval()
`,
    teslaCallout5Title: "🔄 Re-keying without PKI bootstrap",
    teslaCallout5Content: "When the chain nears exhaustion, the sender generates a new chain and transmits a Refill packet containing the new commitment K'₀ authenticated with one of the last keys of the outgoing chain. This creates cryptographic continuity across chain boundaries, enabling indefinite operation with only an initial PKI bootstrap.",

    // 8. Receiver
    teslaReceiverTitle: "8. Receiver Implementation",
    teslaReceiverP1: "The receiver implements an asynchronous verification system built around two independent logical buffers that manage the temporal decoupling between data arrival and key availability.",
    teslaSub5Title1: "8.1 Dual-buffer Architecture",
    teslaTable7Header1: "Buffer",
    teslaTable7Header2: "Indexed by",
    teslaTable7Header3: "Content",
    teslaTable7Header4: "Purpose",
    teslaTable7Row1Col1: "Data Buffer",
    teslaTable7Row1Col2: "Linking structure (8B hash)",
    teslaTable7Row1Col3: "AIS payload + presumed indices per peer",
    teslaTable7Row1Col4: "Stores data awaiting MAC and key",
    teslaTable7Row2Col1: "MAC Buffer",
    teslaTable7Row2Col2: "Per-peer + key index",
    teslaTable7Row2Col3: "MAC + linking + reception timestamp",
    teslaTable7Row2Col4: "Stores authenticators awaiting key",
    teslaReceiverP2: "Since data packets arrive without authenticated source attribution (a consequence of the out-of-band architecture), the receiver must perform speculative association: for each AIS packet it records the presumed index for each currently synchronized peer.",
    teslaSub5Title2: "8.2 Data Buffer Example",
    teslaTable8Header1: "Linking Structure",
    teslaTable8Header2: "Payload",
    teslaTable8Header3: "Presumed Peer Indices",
    teslaTable8Row1Col1: "0x0FEE2B",
    teslaTable8Row1Col2: "DATA",
    teslaTable8Row1Col3: "A:102 B:107 C:100",
    teslaTable8Row2Col1: "0xCF5747",
    teslaTable8Row2Col2: "DATA",
    teslaTable8Row2Col3: "A:102 B:107 C:100",
    teslaTable8Row3Col1: "0xA781C1",
    teslaTable8Row3Col2: "DATA",
    teslaTable8Row3Col3: "A:102 B:106 C:99",
    teslaTable8Row4Col1: "0x840462",
    teslaTable8Row4Col2: "DATA",
    teslaTable8Row4Col3: "A:101 B:106 C:99",
    teslaSub5Title3: "8.3 Verification Pipeline",
    teslaCodeBlock8: `1. DATA packet arrival:
   ├─ compute linking = SHA256(payload)[:8]
   └─ insert into Data Buffer with presumed indices for each peer

2. MAC packet arrival:
   ├─ check temporal window (anti early-disclosure attack)
   └─ insert into MAC Buffer of the specified peer

3. KEY packet arrival:
   ├─ validate chain: SHA256^i(K_i) ?= K_0   (or vs previous key)
   ├─ retrieve MAC Buffer for slot i AND slot i+1 (grey-zone)
   ├─ for each MAC:
   │    ├─ locate data in Data Buffer by linking structure
   │    ├─ check temporal alignment (presumed peer ≈ key index)
   │    ├─ recompute: HMAC(K_i, SHA256(data))[:16]
   │    └─ compare with received MAC
   └─ if match → AUTHENTICATED → forward to application layer
`,
    teslaCallout6Title: "🛡️ DoS Resilience",
    teslaCallout6Content: "The dual-buffer is designed to be DoS-flood resistant. In case of MAC packet flood, traffic is isolated in a single time slot. At slot end, pending entries are purged, preventing computational load from propagating to future slots.",

    // 9. Performance
    teslaPerfTitle: "9. Performance: PKI vs TESLA",
    teslaPerfSub1: "9.1 Authentication Latency",
    teslaTable9Header1: "Metric",
    teslaTable9Header2: "Pure PKI (ECDSA)",
    teslaTable9Header3: "TESLA",
    teslaTable9Row1Col1: "Theoretical latency",
    teslaTable9Row1Col2: "~110 ms",
    teslaTable9Row1Col3: "3-6 s (structural)",
    teslaTable9Row2Col1: "Success rate (PER 10%)",
    teslaTable9Row2Col2: "65.6% (4 fragments)",
    teslaTable9Row2Col3: "90% (atomic)",
    teslaTable9Row3Col1: "Practical latency (34% fail)",
    teslaTable9Row3Col2: "Unbounded",
    teslaTable9Row3Col3: "Deterministic 3-6s",
    teslaTable9Row4Col1: "AIS cycle compatibility (2-10s)",
    teslaTable9Row4Col2: "❌ Fragmented",
    teslaTable9Row4Col3: "✅ Aligned",
    teslaPerfSub2: "9.2 Channel Efficiency",
    teslaCallout7Title: "📉 -62.5% channel occupancy",
    teslaCallout7Content: "TESLA binds authentication to time intervals (1:N binding): a single revealed key validates ALL messages sent in the same interval. PKI instead binds each signature to a single message (1:1). The more traffic, the more efficient TESLA becomes.",
    teslaPerfSub3: "9.3 Computational Scalability",
    teslaTable10Header1: "Scenario: 500 ships @ 1 msg/s",
    teslaTable10Header2: "PKI (ECDSA)",
    teslaTable10Header3: "TESLA",
    teslaTable10Row1Col1: "Verification time",
    teslaTable10Row1Col2: "4.1 ms",
    teslaTable10Row1Col3: "0.015 ms",
    teslaTable10Row2Col1: "Aggregate CPU load",
    teslaTable10Row2Col2: "2.05 s/s",
    teslaTable10Row2Col3: "7.5 ms/s",
    teslaTable10Row3Col1: "CPU utilization",
    teslaTable10Row3Col2: "205% ❌ impossible",
    teslaTable10Row3Col3: "<1% ✅",

    // 10. Security
    teslaSecTitle: "10. Security Properties",
    teslaSecTableHeader1: "Attack",
    teslaSecTableHeader2: "TESLA Mitigation",
    teslaSecTableHeader3: "Experimental Verification",
    teslaSecTableRow1Col1: "Replay",
    teslaSecTableRow1Col2: "Absolute key indices based on time: obsolete messages rejected",
    teslaSecTableRow1Col3: "100% rejection rate",
    teslaSecTableRow2Col1: "Modification",
    teslaSecTableRow2Col2: "HMAC invalidated by any alteration",
    teslaSecTableRow2Col3: "100% detection",
    teslaSecTableRow3Col1: "Wormhole / tunneling",
    teslaSecTableRow3Col2: "Acceptance window of 1 interval: tunneled packets arrive late and are discarded",
    teslaSecTableRow3Col3: "100% detection",
    teslaSecTableRow4Col1: "Bootstrap replay",
    teslaSecTableRow4Col2: "Temporal chaining in the three handshake messages",
    teslaSecTableRow4Col3: "100% rejection",
    teslaSecTableRow5Col1: "MAC spoofing",
    teslaSecTableRow5Col2: "Without unrevealed key, valid MACs cannot be forged",
    teslaSecTableRow5Col3: "Spoofed packets correctly discarded",
    teslaCallout8Title: "🔮 Post-quantum readiness",
    teslaCallout8Content: "TESLA's operational phase relies exclusively on symmetric primitives (SHA-256, HMAC-SHA256), which remain resistant to known quantum algorithms (e.g., Grover only halves effective security). Only the PKI bootstrap would require migration to post-quantum schemes (e.g., ML-DSA / Dilithium).",

    // 11. Takeaways
    teslaTakeawaysTitle: "11. Educational Takeaways",
    teslaCard1Title: "🔑 Temporal Asymmetry",
    teslaCard1Text: "TESLA replaces cryptographic asymmetry (public/private keys) with temporal asymmetry: the same symmetric key becomes 'public' only after message transmission.",
    teslaCard2Title: "🚢 Out-of-band = backward compatibility",
    teslaCard2Text: "Separating data and authentication over different channels is what allows adding security without modifying certified hardware and without breaking legacy receivers.",
    teslaCard3Title: "⏱️ Latency ≠ pointlessness",
    teslaCard3Text: "6 seconds of delay seem long, but aligned to AIS cycle (2-10s) they are negligible: a datum verified in 6s is better than an unverified or lost one due to fragmentation.",
    teslaCard4Title: "✂️ Truncation is engineering",
    teslaCard4Text: "Truncating HMAC to 16 bytes and linking to 8 bytes is not 'weakening': it is a rigorous trade-off analysis between space (38B MTU) and effective security (2¹²⁸ remains infeasible).",
    teslaQuizTitle: "11.1 Self-assessment Quiz",
    teslaQuiz1: "Why is disclosure delay set to 2 intervals and not 1?",
    teslaQuiz2: "Which cryptographic primitive is used for the hash chain and why is it 'one-way'?",
    teslaQuiz3: "How many bytes does a MAC packet occupy and why exactly that value?",
    teslaQuiz4: "What happens if a Key packet is lost in transmission?",
    teslaQuiz5: "How does the Refill packet avoid a new PKI bootstrap?",
    teslaQuiz6: "Why does a wormhole attack fail against this implementation?",

    // 12. References
    teslaRefsTitle: "12. References",
    teslaRef1Text: "RFC 4082 — TESLA Broadcast Authentication Protocol (Perrig et al.)",
    teslaRef2Text: "RFC 2104 — HMAC: Keyed-Hashing for Message Authentication",
    teslaRef3Text: "IALA Guideline G1192 — VDES Authentication Techniques (Ed. 1.0, 2025)",
    teslaRef4Text: "ITU-R M.2092-1 — VDES technical characteristics",
    teslaRef5Text: "ITU-R M.1371-5 — AIS technical characteristics",
    teslaRef6Text: "IEC 61162-450:2018 — Maritime Ethernet interconnection",
    teslaRef7Text: "IEC 63173-2:2022 — SECOM",
     teslaRef8Text: "NIST FIPS 180-4 — Secure Hash Standard; NIST FIPS 186-4 — Digital Signature Standard; RFC 5280 — X.509 PKI certificate profile",

    // ── TESLA MMS Integration (Chapter 4.4 extensions) ──
    teslaMMSTitle: "13. TESLA Integration with MMS (RTCM 13900.0)",
    teslaMMSIntro: "The TESLA protocol can be natively integrated within the MMS stack, becoming a distributed authentication layer via the pub/sub and subject-based addressing mechanisms defined by RTCM 13900.0.",
    teslaMMSKeyDistTitle: "K₀ Distribution via MMS Subject Subscription",
    teslaMMSKeyDist: "The commitment K₀ is published on the dedicated MMS topic tesla/commitments/{MRN}. Any node wishing to verify messages from a station subscribes to that topic; the MMS Edge Router handles routing based on MRN identity.",
    teslaMMSKeyPacketsTitle: "Key Packet as MMTP Subscribe-by-Subject",
    teslaMMSKeyPackets: "Key packets are encapsulated in MMTP messages with Subject and Recipient MRN fields, allowing the Receiver to automatically filter relevant keys without processing the entire VDES stream.",
    teslaMMSBootstrapTitle: "PKI Bootstrap with Maritime Identity Registry (MIR)",
    teslaMMSBootstrap: "Initial trust is based on X.509 certificates issued by the MIR. K₀ is signed by the MIR and distributed as a vessel profile attribute; no separate PKI is needed.",
    teslaMMSECOMTitle: "SECOM Gateway: bridging IP↔VDES for cross-bearer sync",
    teslaMMSECOM: "The IEC 63173-2 SECOM Gateway bridges between the IP world (MMTP) and the VDES world (IEC 61162-450), ensuring TESLA keys can be exchanged even over satellite or terrestrial links transparently.",
    teslaUMLTitle: "MMS Integration UML Diagram",
    teslaUMLDiagram: `@startuml
!define RECTANGLE class

RECTANGLE "MMS Agent" as AGENT
RECTANGLE "TESLA Auth" as TESLA
RECTANGLE "MMS Edge Router" as ROUTER
RECTANGLE "Router Network" as NET

AGENT -> ROUTER : MMTP (SMMP payload)\\nwith TESLA MAC
ROUTER -> TESLA : Subscribe\\ntesla/commitments/{MRN}
TESLA --> ROUTER : Key Packet\n(MMTP)
ROUTER -> NET : Forward\nMMTP
NET --> ROUTER : ACK / NACK

note top of AGENT
Generates SMMP messages
with TESLA MAC
end note

note top of TESLA
Hash chain generation,
key disclosure, MAC verify
end note

@enduml`,

    // ── VDES Controller as MMS Edge Router Extension ──
    vdesCtrlMiddlewareRedefTitle: "Middleware Redefinition: MMS Edge Router VDES-enabled",
    vdesCtrlMiddlewareRedefP1: "The Dockerized Auth Interceptor is reformulated as a direct extension of the RTCM 13900.0 MMS Edge Router, rather than a separate component. This aligns the implementation with the IMO/IALA roadmap and reuses the MCP trust framework.",
    vdesCtrlMMSIntegration: "The Edge Router exposes a VDES plugin that handles S-125→AIS21 conversion and UDP delivery to the modem, while TESLA logic (if enabled) is hooked as a filter on the outbound MMTP flow.",

    // ── TESLA Section 14 ──
    teslaMiddlewareRedefTitle: "14. Middleware Redefinition: MMS Edge Router VDES-enabled",
    teslaAlignTitle: "Alignment with IMO/IALA Roadmap",
    teslaAlignText: "By reformulating the Auth Interceptor as an extension of the MMS Edge Router, the implementation aligns with the IMO/IALA e-Navigation roadmap, ensuring interoperability with international standards.",
    teslaReuseTitle: "Reuse of MCP Trust Framework",
    teslaReuseText: "The project reuses the Maritime Connectivity Platform (MCP) trust framework for node authentication, avoiding duplication and simplifying identity management.",
    teslaPublishTitle: "Publishing TESLA as an MMS Service",
    teslaPublishText: "The TESLA service (chain generation, key disclosure) is exposed as an MMS service via dedicated subjects, allowing all enabled nodes to subscribe and consume keys in a standards-based manner.",
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
      id: 'tesla-auth',
      title: { it: "TESLA Auth", en: "TESLA Auth" },
      subtitle: { it: "Authentication Layer", en: "Authentication Layer" },
      icon: <Lock className="w-6 h-6" />,
      details: [
        { it: "Genera MAC TESLA per messaggi VDES in uscita.", en: "Generates TESLA MACs for outbound VDES messages." },
        { it: "Verifica MAC su messaggi VDES in ingresso.", en: "Verifies MACs on inbound VDES messages." },
        { it: "Gestisce la distribuzione delle chiavi via MMTP.", en: "Manages key distribution via MMTP." }
      ],
      functioning: {
        title: { it: "Funzionamento TESLA", en: "TESLA Operation" },
        steps: [
          { it: "Ricezione K₀ dal MIR tramite MMS subscription.", en: "Receives K₀ from MIR via MMS subscription." },
          { it: "Generazione catena hash e calcolo MAC.", en: "Generates hash chain and computes MAC." },
          { it: "Rivelazione chiavi periodica via MMTP.", en: "Periodic key disclosure via MMTP." }
        ]
      }
    },
    {
      id: 'vdes-controller',
     title: { it: "VDES Controller", en: "VDES Controller" },
     subtitle: { it: "Transmission Driver", en: "Transmission Driver" },
     protocol: 'UDP / IEC 61162-450',
     icon: <Server className="w-6 h-6" />,
     resources: [
       { title: 'GLA-RAD eNav-VDESController', url: 'https://github.com/gla-rad/eNav-VDESController', type: 'industry' },
       { title: 'IALA G1117: VDES Overview', url: 'https://www.navcen.uscg.gov/sites/default/files/pdf/AIS/G1117-Ed3.0-VHF-Data-Exchange-System-VDES-Overview.pdf', type: 'spec' }
     ],
     details: [
       { it: "Conversione S-125: Riceve dati AtoN dal servizio AtoN (REST/pub-sub) e li converte in AIS Message 21.", en: "S-125 Conversion: Receives AtoN data from AtoN Service (REST/pub-sub) and converts it to AIS Message 21." },
       { it: "Invio UDP: Gestisce l'invio delle sentence BBM al modem VDES1000 tramite socket UDP.", en: "UDP Transmission: Handles sending BBM sentences to VDES1000 modem via UDP socket." },
       { it: "Controllo TDMA: Gestisce il controllo degli slot TDMA per garantire la priorità AIS.", en: "TDMA Control: Manages TDMA slot control to ensure AIS priority." }
     ],
     functioning: {
       title: { it: "Funzionamento VDES Controller", en: "VDES Controller Operation" },
       steps: [
         { it: "Ricezione S-125: Riceve il payload AtoN tramite polling REST o sottoscrizione pub/sub.", en: "S-125 Reception: Receives AtoN payload via REST polling or pub/sub subscription." },
         { it: "Conversione: Traduce il JSON S-125 in AIS Message 21 (tipo 21) con campi MMSI, nome, posizione.", en: "Conversion: Translates S-125 JSON into AIS Message 21 (type 21) with MMSI, name, position fields." },
         { it: "Invio UDP: Incapsula il messaggio in sentence BBM e lo invia al modem sulla porta configurabile (default 60011).", en: "UDP Transmission: Encapsulates the message into BBM sentences and sends it to the modem on the configurable port (default 60011)." }
       ]
     }
   },
   {
     id: 'vdes-modem',
     title: { it: "VDES Modem / PI", en: "VDES Modem / PI" },
     subtitle: { it: "Interfaccia Radio Hardware", en: "Radio Hardware Interface" },
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
       { it: "Checksum: Viene aggiunto un controllo di erro a livello NMEA per garantire l'integrità dei dati via cavo.", en: "Checksum: An error check is added at the NMEA level to ensure data integrity over the cable." }
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
