import React from 'react';
import { motion } from 'motion/react';
import {
  Server,
  Database,
  Radio,
  Code,
  BookOpen,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  CheckCircle,
  Info,
  Bookmark,
  Github,
  HardDrive,
  Zap,
  Network,
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

export const VDESControllerIntegration = ({ lang }: { lang: Language }) => {
  const t = TRANSLATIONS[lang];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto px-6 py-10 space-y-10"
    >
       {/* HEADER */}
       <header className="mb-8">
         <h1 className="text-4xl font-extrabold text-slate-900 mt-2 mb-3 leading-tight">
           {t.vdesCtrlView}
         </h1>
        <p className="text-lg text-slate-600 mt-3 leading-relaxed max-w-3xl">
          {t.vdesCtrlSubtitle}
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          <span className="px-3 py-1 text-xs rounded-full bg-emerald-100 text-emerald-800 font-black uppercase tracking-wider">
            Spring Boot
          </span>
          <span className="px-3 py-1 text-xs rounded-full bg-sky-100 text-sky-800 font-black uppercase tracking-wider">
            UDP / IEC 61162-450
          </span>
          <span className="px-3 py-1 text-xs rounded-full bg-violet-100 text-violet-800 font-black uppercase tracking-wider">
            VAtoN
          </span>
          <span className="px-3 py-1 text-xs rounded-full bg-amber-100 text-amber-800 font-black uppercase tracking-wider">
            CML VDES1000
          </span>
          <span className="px-3 py-1 text-xs rounded-full bg-rose-100 text-rose-800 font-black uppercase tracking-wider">
            Ettus USRP E320
          </span>
        </div>
      </header>

      {/* 1. OVERVIEW */}
      <section className="space-y-4">
        <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight uppercase border-b border-slate-200 pb-3">
          1. {t.vdesCtrlOverview}
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed">
          Il <strong>VDES Controller</strong> è un microservizio open-source sviluppato dalla
          ricerca dei <em>General Lighthouse Authorities</em> (GLA-RAD) come parte della loro
          <em> e-Navigation Service Architecture</em>. Il suo scopo è quello di pilotare le
          stazioni radio VDES, traducendo informazioni applicative (tipicamente segnalamenti
          AtoN virtuali) in messaggi AIS/VDES pronti per la trasmissione RF.
        </p>
        <p className="text-sm text-slate-700 leading-relaxed">
          I GLA hanno identificato la fornitura di VAtoN (<em>Virtual Aids to Navigation</em>)
          come uno dei casi d'uso prioritari per le future applicazioni e-Navigation. Poiché i
          requisiti del caso d'uso impongono che la trasmissione avvenga su AIS/VDES, è stato
          introdotto un microservizio capace di interfacciarsi con moduli VDES come il CML
          Microcircuits VDES1000, sfruttando un set predefinito di porte UDP/IP, e di
          trasmettere messaggi tramite i protocolli sentence TSA/VDM e BBM. Per finalità di
          test, il servizio è in grado anche di inviare messaggi AIS usando la piattaforma
          SDR USRP Ettus E320.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mt-6">
          <p className="font-black text-sm text-slate-900 mb-1">{t.vdesCtrlOneLineTitle}</p>
          <p className="text-xs text-slate-700 leading-relaxed">{t.vdesCtrlOneLineDesc}</p>
        </div>
      </section>

      {/* 2. WHY */}
      <section className="space-y-4">
        <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight uppercase border-b border-slate-200 pb-3">
          2. {t.vdesCtrlWhy}
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed">
          {t.vdesCtrlWhyP1}
        </p>
        <p className="text-sm text-slate-700 leading-relaxed">
          {t.vdesCtrlWhyP2}
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4 text-sm text-slate-700">
          <li>{t.vdesCtrlWhyBullet1}</li>
          <li>{t.vdesCtrlWhyBullet2}</li>
          <li>{t.vdesCtrlWhyBullet3}</li>
        </ul>
      </section>

      {/* 3. ARCHITECTURE */}
      <section className="space-y-6">
        <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight uppercase border-b border-slate-200 pb-3">
          3. {t.vdesCtrlArchitecture}
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed">
          Il repository del VDES Controller contiene l'implementazione di un servizio che
          controlla le stazioni AIS VDES, leggendo messaggi tramite l'AtoN Service e
          convertendoli in messaggi AIS prima di passarli alle stazioni VDES via UDP.
          Il microservizio core è costruito sul framework Spring Boot.
        </p>

        <div className="space-y-3">
          <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">
            {t.vdesCtrlStackTitle}
          </h3>
          <pre className="bg-slate-50 border border-slate-200 rounded-xl p-4 overflow-x-auto text-xs font-mono leading-relaxed text-slate-700">
{`┌──────────────────────┐
│   AtoN Service       │  (microservizio S-125)
│   eNav-AtonService   │
└─────────┬────────────┘
          │ REST / Pub-Sub
          ▼
┌──────────────────────┐    ┌──────────────────┐
│   VDES Controller    │◄──►│   Eureka         │ service discovery
│  (Spring Boot 0.0.3) │◄──►│   Keycloak       │ OIDC auth
│   port 8762          │◄──►│   PostgreSQL     │ persistenza
└─────────┬────────────┘    └──────────────────┘
          │ UDP (TSA / VDM / BBM sentence)
          ▼
┌──────────────────────┐
│  CML VDES1000  /     │
│  Ettus USRP E320     │  (test)
└─────────┬────────────┘
          │ VHF — AIS / ASM / VDE
          ▼
┌──────────────────────┐
│   Ricevitori a bordo │
└──────────────────────┘`}
          </pre>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">
            {t.vdesCtrlTechStackTitle}
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-slate-200 rounded-2xl overflow-hidden text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="border border-slate-200 px-4 py-3 text-left font-black text-slate-700 uppercase tracking-wider">
                    Layer
                  </th>
                  <th className="border border-slate-200 px-4 py-3 text-left font-black text-slate-700 uppercase tracking-wider">
                    Tecnologia
                  </th>
                  <th className="border border-slate-200 px-4 py-3 text-left font-black text-slate-700 uppercase tracking-wider">
                    Ruolo
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="bg-white">
                  <td className="border border-slate-200 px-4 py-3 font-bold text-slate-800">Framework</td>
                  <td className="border border-slate-200 px-4 py-3 text-slate-600">Spring Boot 3.x</td>
                  <td className="border border-slate-200 px-4 py-3 text-slate-600">Runtime del microservizio</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-200 px-4 py-3 font-bold text-slate-800">Service discovery</td>
                  <td className="border border-slate-200 px-4 py-3 text-slate-600">Netflix Eureka client</td>
                  <td className="border border-slate-200 px-4 py-3 text-slate-600">Registrazione presso il registry GLA</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-slate-200 px-4 py-3 font-bold text-slate-800">AuthN/AuthZ</td>
                  <td className="border border-slate-200 px-4 py-3 text-slate-600">Keycloak (OIDC)</td>
                  <td className="border border-slate-200 px-4 py-3 text-slate-600">Autenticazione service-to-service</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-200 px-4 py-3 font-bold text-slate-800">Persistence</td>
                  <td className="border border-slate-200 px-4 py-3 text-slate-600">PostgreSQL / MariaDB</td>
                  <td className="border border-slate-200 px-4 py-3 text-slate-600">Stato dei messaggi e configurazioni</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-slate-200 px-4 py-3 font-bold text-slate-800">Monitoring</td>
                  <td className="border border-slate-200 px-4 py-3 text-slate-600">Spring Boot Admin</td>
                  <td className="border border-slate-200 px-4 py-3 text-slate-600">Health check, metrics</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-200 px-4 py-3 font-bold text-slate-800">Transport</td>
                  <td className="border border-slate-200 px-4 py-3 text-slate-600">UDP socket</td>
                  <td className="border border-slate-200 px-4 py-3 text-slate-600">Invio sentence al modem</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-slate-200 px-4 py-3 font-bold text-slate-800">Security</td>
                  <td className="border border-slate-200 px-4 py-3 text-slate-600">SECOMLib (GLA-RAD)</td>
                  <td className="border border-slate-200 px-4 py-3 text-slate-600">Compliance IEC 63173-2</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. PROTOCOLS */}
      <section className="space-y-6">
        <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight uppercase border-b border-slate-200 pb-3">
          4. {t.vdesCtrlProtocols}
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed">
          {t.vdesCtrlProtoDesc}
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-slate-200 rounded-2xl overflow-hidden text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="border border-slate-200 px-4 py-3 text-left font-black text-slate-700 uppercase tracking-wider">
                  Sentence
                </th>
                <th className="border border-slate-200 px-4 py-3 text-left font-black text-slate-700 uppercase tracking-wider">
                  Significato
                </th>
                <th className="border border-slate-200 px-4 py-3 text-left font-black text-slate-700 uppercase tracking-wider">
                  Uso tipico
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr className="bg-white">
                <td className="border border-slate-200 px-4 py-3">
                  <code className="bg-slate-100 px-2 py-1 rounded text-slate-800 font-mono font-bold">
                    !--VDM
                  </code>
                </td>
                <td className="border border-slate-200 px-4 py-3 text-slate-700">
                  VHF Data-link Message
                </td>
                <td className="border border-slate-200 px-4 py-3 text-slate-600">
                  Trasmissione di un payload AIS già incapsulato (es. Msg 21)
                </td>
              </tr>
              <tr className="bg-slate-50">
                <td className="border border-slate-200 px-4 py-3">
                  <code className="bg-slate-100 px-2 py-1 rounded text-slate-800 font-mono font-bold">
                    $--TSA
                  </code>
                </td>
                <td className="border border-slate-200 px-4 py-3 text-slate-700">
                  Transmit Slot Assignment
                </td>
                <td className="border border-slate-200 px-4 py-3 text-slate-600">
                  Istruisce il modem ad usare uno slot TDMA specifico
                </td>
              </tr>
              <tr className="bg-white">
                <td className="border border-slate-200 px-4 py-3">
                  <code className="bg-slate-100 px-2 py-1 rounded text-slate-800 font-mono font-bold">
                    $--BBM
                  </code>
                </td>
                <td className="border border-slate-200 px-4 py-3 text-slate-700">
                  Broadcast Binary Message
                </td>
                <td className="border border-slate-200 px-4 py-3 text-slate-600">
                  Invia un messaggio binario broadcast (ASM, AtoN report)
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">
            4.1 {t.vdesCtrlBBMExample}
          </h3>
          <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 overflow-x-auto text-sm font-mono leading-relaxed">
{`$AIBBM,1,1,0,0,21,177P000P00000000000000000000000000000000000000000000000,4*XX
                  │  │
                  │  └── Payload AIS Msg 21 (AtoN report) in 6-bit ASCII
                  └────── Tipo messaggio binario`}
          </pre>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">
            4.2 {t.vdesCtrlUDPFlow}
          </h3>
          <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 overflow-x-auto text-sm font-mono leading-relaxed">
{`UDP packet ──► VDES1000:60011  (porta TX comandi)
         ◄── VDES1000:60012  (porta RX status)
         ◄── VDES1000:60013  (porta RX traffico ricevuto)`}
          </pre>
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
            <p className="font-black text-sm text-slate-900 mb-1">{t.vdesCtrlPortNoteTitle}</p>
            <p className="text-xs text-slate-700">{t.vdesCtrlPortNoteDesc}</p>
          </div>
        </div>
      </section>

      {/* 5. ATON */}
      <section className="space-y-6">
        <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight uppercase border-b border-slate-200 pb-3">
          5. {t.vdesCtrlAtoN}
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed">
          Il VDES Controller può ricevere le informazioni VAtoN correnti tramite due
          modalità: <strong>polling</strong> dell'endpoint REST dell'AtoN Service, oppure
          <strong> sottoscrizione pub/sub</strong> a un topic. In entrambi i casi il dato
          ricevuto è in formato <code>S-125</code> (AtoN information) e viene tradotto in
          un AIS Message 21 prima della trasmissione.
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-slate-200 rounded-2xl overflow-hidden text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="border border-slate-200 px-4 py-3 text-left font-black text-slate-700 uppercase tracking-wider">
                  Pattern
                </th>
                <th className="border border-slate-200 px-4 py-3 text-left font-black text-slate-700 uppercase tracking-wider">
                  Pro
                </th>
                <th className="border border-slate-200 px-4 py-3 text-left font-black text-slate-700 uppercase tracking-wider">
                  Contro
                </th>
                <th className="border border-slate-200 px-4 py-3 text-left font-black text-slate-700 uppercase tracking-wider">
                  Quando usarlo
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr className="bg-white">
                <td className="border border-slate-200 px-4 py-3 font-bold text-slate-800">
                  {t.vdesCtrlPollingREST}
                </td>
                <td className="border border-slate-200 px-4 py-3 text-slate-600">
                  {t.vdesCtrlPollingPros}
                </td>
                <td className="border border-slate-200 px-4 py-3 text-slate-600">
                  {t.vdesCtrlPollingCons}
                </td>
                <td className="border border-slate-200 px-4 py-3 text-slate-600">
                  {t.vdesCtrlPollingWhen}
                </td>
              </tr>
              <tr className="bg-slate-50">
                <td className="border border-slate-200 px-4 py-3 font-bold text-slate-800">
                  {t.vdesCtrlSubscribe}
                </td>
                <td className="border border-slate-200 px-4 py-3 text-slate-600">
                  {t.vdesCtrlSubscribePros}
                </td>
                <td className="border border-slate-200 px-4 py-3 text-slate-600">
                  {t.vdesCtrlSubscribeCons}
                </td>
                <td className="border border-slate-200 px-4 py-3 text-slate-600">
                  {t.vdesCtrlSubscribeWhen}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">
            5.1 {t.vdesCtrlMappingTitle}
          </h3>
          <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 overflow-x-auto text-sm font-mono leading-relaxed">
{`{
  "atonNumber": "IT-LH-001",
  "name": "Punta Stilo Virtual",
  "position": { "lat": 38.4663, "lon": 16.5811 },
  "type": "VirtualAtoN",
  "status": "Operational"
}
                │
                ▼  (conversione interna del Controller)
AIS Message 21 (Aid-to-Navigation Report)
  type=21, mmsi=992xxxxxx, name="Punta Stilo Virtual",
  lat=38.4663, lon=16.5811, virtual_aton=1, off_position=0`}
          </pre>
        </div>
      </section>

      {/* 6. HARDWARE */}
      <section className="space-y-6">
        <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight uppercase border-b border-slate-200 pb-3">
          6. {t.vdesCtrlHardware}
        </h2>

        <div className="space-y-3">
          <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">
            6.1 {t.vdesCtrlProdPath}
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            Il modem CML Microcircuits VDES1000 è il primo modulo certificato disponibile sul
            mercato. Il Controller invia sentence UDP che il modem incapsula in slot TDMA
            secondo la priorità imposta dalla specifica VDES (AIS &gt; ASM &gt; VDE-TER).
           </p>
         </div>

        <div className="space-y-3">
          <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">
            7.3 {t.vdesCtrlMiddlewareRedefTitle}
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            {t.vdesCtrlMiddlewareRedefP1}
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            {t.vdesCtrlMMSIntegration}
          </p>
        </div>

       </section>

      {/* 7. MMS RELATION */}
      <section className="space-y-6">
        <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight uppercase border-b border-slate-200 pb-3">
          7. {t.vdesCtrlMMSRelation}
        </h2>

        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
          <p className="font-black text-sm text-slate-900 mb-1">{t.vdesCtrlFundamentalTitle}</p>
          <p className="text-xs text-slate-700 leading-relaxed">{t.vdesCtrlFundamentalDesc}</p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">
            7.1 {t.vdesCtrlCompareTitle}
          </h3>
          <pre className="bg-slate-50 border border-slate-200 rounded-xl p-4 overflow-x-auto text-xs font-mono leading-relaxed text-slate-700">
{`STACK MMS STANDARD                 STACK GLA e-NAV (questo capitolo)
┌─────────────────────────┐         ┌─────────────────────────┐
│ Applicazione (S-100)    │         │ AtoN Service (S-125)    │
├─────────────────────────┤         ├─────────────────────────┤
│ MMS Agent               │         │ —  (no agent)           │
├─────────────────────────┤         ├─────────────────────────┤
│ MMTP                    │         │ —  (no MMTP)            │
├─────────────────────────┤         ├─────────────────────────┤
│ MMS Edge Router         │         │ VDES Controller         │
├─────────────────────────┤         ├─────────────────────────┤
│ VDES Modem (M.2092-1)   │         │ VDES1000 / USRP E320    │
├─────────────────────────┤         ├─────────────────────────┤
│ VHF (AIS/ASM/VDE)       │         │ VHF (AIS/ASM/VDE)       │
└─────────────────────────┘         └─────────────────────────┘`}
          </pre>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">
            7.2 {t.vdesCtrlConvergeTitle}
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            {t.vdesCtrlConvergeDesc}
          </p>
        </div>
      </section>

      {/* 8. CONFIG */}
      <section className="space-y-6">
        <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight uppercase border-b border-slate-200 pb-3">
          8. {t.vdesCtrlConfig}
        </h2>

        <div className="space-y-3">
          <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">
            8.1 {t.vdesCtrlConfigExampleTitle}
          </h3>
          <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 overflow-x-auto text-sm font-mono leading-relaxed">
{`# ===== Configuration Variables =====
service.variable.eureka.server.name=eureka.local
service.variable.eureka.server.port=8761
service.variable.keycloak.server.name=keycloak.local
service.variable.keycloak.server.port=8080
service.variable.keycloak.server.realm=enav
service.variable.database.server.name=postgres.local
service.variable.database.server.port=5432

# ===== Service properties =====
server.port=8762
spring.application.name=vdes-ctrl
spring.application.version=0.0.3

# Disable cloud config
spring.cloud.config.enabled=false

# ===== Eureka Client =====
eureka.client.service-url.defaultZone=\\
  http://\${service.variable.eureka.server.name}:\${service.variable.eureka.server.port}/eureka/
eureka.client.registryFetchIntervalSeconds=5
eureka.instance.preferIpAddress=true
eureka.instance.leaseRenewalIntervalInSeconds=10
eureka.instance.metadata-map.startup=\${random.int}

# ===== VDES1000 endpoint (custom) =====
gla.vdes.station.host=192.168.1.50
gla.vdes.station.tx-port=60011
gla.vdes.station.rx-port=60012
gla.vdes.station.aton-poll-interval=PT30S`}
          </pre>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">
            8.2 {t.vdesCtrlQuickStartTitle}
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-slate-700 ml-2">
            <li className="pl-2">
              <strong>{t.vdesCtrlStep1}:</strong>{' '}
              <code className="bg-slate-100 px-2 py-0.5 rounded font-mono">
                git clone https://github.com/gla-rad/eNav-VDESController.git
              </code>
            </li>
            <li className="pl-2">
              <strong>{t.vdesCtrlStep2}:</strong>{' '}
              Eureka (<code>eNav-Eureka</code>) e Keycloak con realm <code>enav</code>
            </li>
            <li className="pl-2">
              <strong>{t.vdesCtrlStep3}:</strong> {t.vdesCtrlStep3}
            </li>
            <li className="pl-2">
              <strong>{t.vdesCtrlStep4}:</strong>{' '}
              <code className="bg-slate-100 px-2 py-0.5 rounded font-mono">
                ./mvnw clean package -DskipTests
              </code>
            </li>
            <li className="pl-2">
              <strong>{t.vdesCtrlStep5}:</strong>{' '}
              <code className="bg-slate-100 px-2 py-0.5 rounded font-mono">
                java -jar target/vdes-ctrl-0.0.3.jar
              </code>
            </li>
            <li className="pl-2">
              <strong>{t.vdesCtrlStep6}:</strong>{' '}
              <code className="bg-slate-100 px-2 py-0.5 rounded font-mono">
                http://eureka.local:8761
              </code>
            </li>
            <li className="pl-2">
              <strong>{t.vdesCtrlStep7}:</strong>{' '}
              <code className="bg-slate-100 px-2 py-0.5 rounded font-mono">
                tcpdump -i any -X port 60011
              </code>
            </li>
          </ol>
        </div>
      </section>

      {/* 9. FLOW */}
      <section className="space-y-4">
        <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight uppercase border-b border-slate-200 pb-3">
          9. {t.vdesCtrlFlow}
        </h2>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 overflow-x-auto text-sm font-mono leading-relaxed">
{`Sequenza temporale:

AtoN Service     VDES Ctrl       VDES1000        VHF Air        Ricevitori bordo
     │              │               │               │                  │
     │— S-125 ─────►│               │               │                  │
     │              │ converte      │               │                  │
     │              │ in AIS Msg21  │               │                  │
     │              │— UDP BBM ────►│               │                  │
     │              │               │ slot TDMA     │                  │
     │              │               │ π/4QPSK       │                  │
     │              │               │── RF VHF ────►│                  │
     │              │               │               │── AIS Msg 21 ───►│
     │              │◄── ACK status │               │                  │`}
        </pre>
      </section>

      {/* 10. PITFALLS */}
      <section className="space-y-4">
        <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight uppercase border-b border-slate-200 pb-3">
          10. {t.vdesCtrlPitfalls}
        </h2>

        <div className="space-y-4">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
            <p className="font-black text-sm text-red-900 mb-1">{t.vdesCtrlPitfall1Title}</p>
            <p className="text-xs text-red-800 leading-relaxed">{t.vdesCtrlPitfall1Desc}</p>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
            <p className="font-black text-sm text-amber-900 mb-1">{t.vdesCtrlPitfall2Title}</p>
            <p className="text-xs text-amber-800 leading-relaxed">{t.vdesCtrlPitfall2Desc}</p>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
            <p className="font-black text-sm text-amber-900 mb-1">{t.vdesCtrlPitfall3Title}</p>
            <p className="text-xs text-amber-800 leading-relaxed">{t.vdesCtrlPitfall3Desc}</p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
            <p className="font-black text-sm text-blue-900 mb-1">{t.vdesCtrlPitfall4Title}</p>
            <p className="text-xs text-blue-800 leading-relaxed">{t.vdesCtrlPitfall4Desc}</p>
          </div>
        </div>
      </section>

      {/* 11. REFERENCES */}
      <section className="space-y-4">
        <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight uppercase border-b border-slate-200 pb-3">
          11. {t.vdesCtrlRefsTitle}
        </h2>
        <ul className="space-y-2 text-sm">
          <li>
            <a
              href="https://github.com/gla-rad/eNav-VDESController"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              gla-rad / eNav-VDESController — Repository ufficiale
            </a>
          </li>
          <li>
            <a
              href="https://github.com/gla-rad/py_vdes1000"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center gap-2"
            >
              <Code className="w-4 h-4" />
              gla-rad / py_vdes1000 — Companion Python package
            </a>
          </li>
          <li>
            <a
              href="https://artifacthub.io/packages/helm/enav-service-architecture/enav"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center gap-2"
            >
              <Bookmark className="w-4 h-4" />
              Helm chart — eNav Service Architecture
            </a>
          </li>
          <li className="text-slate-700">
            📄 ITU-R M.2092-1 — VDES technical characteristics
          </li>
          <li className="text-slate-700">
            📄 IEC 61162-1 / 61162-450 — NMEA sentence over UDP
          </li>
          <li className="text-slate-700">
            📄 RTCM 13900.0 — Maritime Messaging Service Architecture
          </li>
          <li className="text-slate-700">
            📄 IALA G1117 Ed.3 — VDES Overview
          </li>
        </ul>
      </section>

      {/* FOOTER */}
      <footer className="mt-16 pt-6 border-t border-slate-200 text-sm text-slate-500">
        <p>
          {t.vdesCtrlFooter}{' '}
          <a
            href="https://github.com/NicolaLepore4/MMS-VDES-Architecture-Guide"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {t.vdesCtrlEditLink}
          </a>
        </p>
      </footer>
    </motion.div>
  );
};
