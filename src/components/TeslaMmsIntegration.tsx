import React from "react";

/**
 * TeslaMmsIntegration.tsx
 * ------------------------------------------------------------------
 * Capitolo 4.5 — Ottimizzazione di TESLA tramite il sistema di
 * Subscription dell'MMS (RTCM 13900.0).
 *
 * Mostra come il Subject-Based Addressing (Pub/Sub) dell'MMTP
 * trasforma TESLA da soluzione out-of-band point-to-point a
 * meccanismo multicast nativo, autenticato e bandwidth-optimal.
 * ------------------------------------------------------------------
 */

// ==================================================================
// UTILITY COMPONENTS
// ==================================================================

const SectionTitle: React.FC<{ id: string; children: React.ReactNode }> = ({
  id,
  children,
}) => (
  <h2
    id={id}
      className="scroll-mt-24 text-3xl font-bold text-slate-900 mt-12 mb-4 border-b border-slate-300 pb-2"
  >
    {children}
  </h2>
);

const SubTitle: React.FC<{ id?: string; children: React.ReactNode }> = ({
  id,
  children,
}) => (
  <h3
    id={id}
    className="scroll-mt-24 text-2xl font-semibold text-slate-800 mt-8 mb-3"
  >
    {children}
  </h3>
);

const Paragraph: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-base leading-relaxed text-slate-700 mb-4">
    {children}
  </p>
);

const Callout: React.FC<{
  type?: "info" | "warning" | "success" | "danger";
  title: string;
  children: React.ReactNode;
}> = ({ type = "info", title, children }) => {
  const palette: Record<string, string> = {
    info: "border-blue-500 bg-blue-50 text-blue-900",
    warning: "border-amber-500 bg-amber-50 text-amber-900",
    success: "border-emerald-500 bg-emerald-50 text-emerald-900",
    danger: "border-rose-500 bg-rose-50 text-rose-900",
  };
  return (
    <div className={`border-l-4 p-4 my-6 rounded-r-md ${palette[type]}`}>
      <p className="font-semibold mb-1">{title}</p>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
};

const CodeBlock: React.FC<{ language?: string; children: string }> = ({
  language = "text",
  children,
}) => (
   <pre className="bg-slate-800 text-slate-100 rounded-lg p-4 overflow-x-auto text-sm my-4 shadow-md">
    <code className={`language-${language}`}>{children}</code>
  </pre>
);

const Table: React.FC<{
  headers: string[];
  rows: (string | React.ReactNode)[][];
}> = ({ headers, rows }) => (
  <div className="overflow-x-auto my-6">
      <table className="min-w-full border-collapse border border-slate-300 text-sm">
      <thead className="bg-slate-100">
        <tr>
          {headers.map((h) => (
            <th
              key={h}
                className="border border-slate-300 px-3 py-2 text-left font-semibold"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="odd:bg-white even:bg-slate-50"
            >
            {row.map((cell, j) => (
                <td
                  key={j}
                  className="border border-slate-300 px-3 py-2 align-top"
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const TOC: React.FC = () => (
    <nav className="bg-slate-50 border border-slate-200 rounded-lg p-4 my-6">
        <p className="font-semibold text-slate-800 mb-2">
      📑 Indice della sezione
    </p>
        <ol className="list-decimal list-inside space-y-1 text-sm text-blue-700">
      <li><a href="#problem" className="hover:underline">Il problema dell'out-of-band non autenticato</a></li>
      <li><a href="#mms-stack" className="hover:underline">Architettura MMS: gerarchia e componenti</a></li>
      <li><a href="#mmtp" className="hover:underline">MMTP & SMMP: il livello di trasporto</a></li>
      <li><a href="#pubsub" className="hover:underline">Subject-Based Addressing (Pub/Sub)</a></li>
      <li><a href="#tesla-mms" className="hover:underline">TESLA su MMS: il flusso completo</a></li>
      <li><a href="#comparison" className="hover:underline">Confronto: TESLA puro vs TESLA+MMS</a></li>
      <li><a href="#security-gain" className="hover:underline">Guadagni di sicurezza</a></li>
      <li><a href="#takeaway" className="hover:underline">Conclusioni e raccomandazioni</a></li>
    </ol>
  </nav>
);

// ==================================================================
// SVG DIAGRAMS
// ==================================================================

/**
 * Diagramma 1: Stack gerarchico MMS (3 livelli)
 */
const MMSStackDiagram: React.FC = () => (
  <div className="my-6 flex justify-center">
    <svg viewBox="0 0 700 480" className="w-full max-w-3xl">
      {/* Background */}
      <rect width="700" height="480" fill="transparent" />

      {/* Layer 3: Application + Agent */}
      <g>
        <rect x="50" y="20" width="600" height="100" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
        <text x="350" y="45" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e40af">LIVELLO 1 — APPLICAZIONE + MMS AGENT</text>
        
        <rect x="80" y="60" width="160" height="50" rx="4" fill="#fff" stroke="#2563eb" />
        <text x="160" y="80" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e3a8a">ECDIS</text>
        <text x="160" y="98" textAnchor="middle" fontSize="9" fill="#475569">Software navigazione</text>
        
        <rect x="270" y="60" width="160" height="50" rx="4" fill="#fff" stroke="#2563eb" />
        <text x="350" y="80" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e3a8a">Auth Interceptor</text>
        <text x="350" y="98" textAnchor="middle" fontSize="9" fill="#475569">TESLA logic</text>
        
        <rect x="460" y="60" width="160" height="50" rx="4" fill="#fff" stroke="#2563eb" />
        <text x="540" y="80" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e3a8a">Weather Service</text>
        <text x="540" y="98" textAnchor="middle" fontSize="9" fill="#475569">App meteo</text>
      </g>

      {/* Arrows down */}
      <line x1="160" y1="120" x2="160" y2="155" stroke="#475569" strokeWidth="2" markerEnd="url(#arrow)" />
      <line x1="350" y1="120" x2="350" y2="155" stroke="#475569" strokeWidth="2" markerEnd="url(#arrow)" />
      <line x1="540" y1="120" x2="540" y2="155" stroke="#475569" strokeWidth="2" markerEnd="url(#arrow)" />
      <text x="365" y="140" fontSize="10" fill="#64748b" fontStyle="italic">MMTP</text>

      {/* Layer 2: Edge Router */}
      <g>
        <rect x="50" y="160" width="600" height="120" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
        <text x="350" y="185" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#166534">LIVELLO 2 — MMS EDGE ROUTER (a bordo / shore)</text>
        
        <rect x="80" y="200" width="540" height="65" rx="4" fill="#fff" stroke="#16a34a" />
        <text x="350" y="218" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#14532d">Local Message Broker</text>
        
        <rect x="100" y="228" width="120" height="28" rx="3" fill="#bbf7d0" />
        <text x="160" y="246" textAnchor="middle" fontSize="9" fill="#14532d">Auth MIR</text>
        
        <rect x="240" y="228" width="120" height="28" rx="3" fill="#bbf7d0" />
        <text x="300" y="246" textAnchor="middle" fontSize="9" fill="#14532d">Subscription Mgmt</text>
        
        <rect x="380" y="228" width="120" height="28" rx="3" fill="#bbf7d0" />
        <text x="440" y="246" textAnchor="middle" fontSize="9" fill="#14532d">Store &amp; Forward</text>
        
        <rect x="520" y="228" width="90" height="28" rx="3" fill="#bbf7d0" />
        <text x="565" y="246" textAnchor="middle" fontSize="9" fill="#14532d">Cert Cache</text>
      </g>

      {/* Arrow down */}
      <line x1="350" y1="280" x2="350" y2="320" stroke="#475569" strokeWidth="2" markerEnd="url(#arrow)" />
      <text x="370" y="305" fontSize="10" fill="#64748b" fontStyle="italic">VDE-TER / VDE-SAT / IP</text>

      {/* Layer 1: Router Network */}
      <g>
        <rect x="50" y="325" width="600" height="130" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
        <text x="350" y="350" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#92400e">LIVELLO 3 — MMS ROUTER NETWORK (globale, decentralizzato)</text>
        
        <circle cx="160" cy="400" r="30" fill="#fff" stroke="#d97706" strokeWidth="2" />
        <text x="160" y="395" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#92400e">Router</text>
        <text x="160" y="408" textAnchor="middle" fontSize="9" fill="#92400e">VTS-EU</text>
        
        <circle cx="280" cy="400" r="30" fill="#fff" stroke="#d97706" strokeWidth="2" />
        <text x="280" y="395" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#92400e">Router</text>
        <text x="280" y="408" textAnchor="middle" fontSize="9" fill="#92400e">SAT-LEO</text>
        
        <circle cx="400" cy="400" r="30" fill="#fff" stroke="#d97706" strokeWidth="2" />
        <text x="400" y="395" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#92400e">Router</text>
        <text x="400" y="408" textAnchor="middle" fontSize="9" fill="#92400e">VTS-IT</text>
        
        <circle cx="520" cy="400" r="30" fill="#fff" stroke="#d97706" strokeWidth="2" />
        <text x="520" y="395" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#92400e">Router</text>
        <text x="520" y="408" textAnchor="middle" fontSize="9" fill="#92400e">VTS-DK</text>
        
        {/* Connecting lines between routers */}
        <line x1="190" y1="400" x2="250" y2="400" stroke="#d97706" strokeWidth="2" strokeDasharray="4" />
        <line x1="310" y1="400" x2="370" y2="400" stroke="#d97706" strokeWidth="2" strokeDasharray="4" />
        <line x1="430" y1="400" x2="490" y2="400" stroke="#d97706" strokeWidth="2" strokeDasharray="4" />
        <line x1="160" y1="430" x2="400" y2="430" stroke="#d97706" strokeWidth="1" strokeDasharray="3" />
        <line x1="280" y1="430" x2="520" y2="430" stroke="#d97706" strokeWidth="1" strokeDasharray="3" />
        <text x="350" y="447" textAnchor="middle" fontSize="9" fill="#92400e" fontStyle="italic">Mesh decentralizzato + roaming + queue persistenti</text>
      </g>

      {/* Arrow marker */}
      <defs>
        <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#475569" />
        </marker>
      </defs>
    </svg>
  </div>
);

/**
 * Diagramma 2: Confronto Unicast vs Pub/Sub
 */
const UnicastVsPubSubDiagram: React.FC = () => (
  <div className="my-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
    {/* UNICAST */}
    <div className="border border-rose-300 rounded-lg p-4 bg-rose-50">
          <h4 className="text-center font-bold text-rose-800 mb-3">
        ❌ Unicast TESLA "out-of-band" puro
      </h4>
      <svg viewBox="0 0 380 280" className="w-full">
        {/* Sender */}
        <rect x="20" y="120" width="80" height="50" rx="6" fill="#dc2626" />
        <text x="60" y="142" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white">Nave A</text>
        <text x="60" y="158" textAnchor="middle" fontSize="9" fill="white">(sender)</text>

        {/* Receivers */}
        {[
          { y: 30, label: "Nave B" },
          { y: 90, label: "Nave C" },
          { y: 150, label: "Nave D" },
          { y: 210, label: "Nave E" },
        ].map((r, i) => (
          <g key={i}>
            <rect x="280" y={r.y} width="80" height="40" rx="6" fill="#fca5a5" stroke="#991b1b" />
            <text x="320" y={r.y + 25} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#7f1d1d">
              {r.label}
            </text>
            <line
              x1="100"
              y1="145"
              x2="280"
              y2={r.y + 20}
              stroke="#dc2626"
              strokeWidth="2"
              markerEnd="url(#redarrow)"
            />
            <text x="190" y={140 + (r.y - 120) * 0.3} fontSize="9" fill="#991b1b" fontWeight="bold">
              TX #{i + 1}
            </text>
          </g>
        ))}

        <defs>
          <marker id="redarrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#dc2626" />
          </marker>
        </defs>
      </svg>
      <p className="text-xs text-center mt-2 text-rose-900">
        <strong>4 trasmissioni VHF</strong> per la stessa chiave K<sub>i</sub>.
        <br />
        Spreco di banda × N navi.
      </p>
    </div>

    {/* PUB/SUB */}
    <div className="border border-emerald-300 rounded-lg p-4 bg-emerald-50">
      <h4 className="text-center font-bold text-emerald-800 mb-3">
        ✅ Pub/Sub TESLA via MMS
      </h4>
      <svg viewBox="0 0 380 280" className="w-full">
        {/* Sender */}
        <rect x="20" y="120" width="80" height="50" rx="6" fill="#16a34a" />
        <text x="60" y="142" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white">Nave A</text>
        <text x="60" y="158" textAnchor="middle" fontSize="9" fill="white">(publisher)</text>

        {/* Subject "broker" cloud */}
        <ellipse cx="190" cy="145" rx="55" ry="35" fill="#fde68a" stroke="#d97706" strokeWidth="2" />
        <text x="190" y="140" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#92400e">SUBJECT</text>
        <text x="190" y="155" textAnchor="middle" fontSize="8" fill="#92400e">..VDES:Crypto:</text>
        <text x="190" y="165" textAnchor="middle" fontSize="8" fill="#92400e">TeslaKeys</text>

        {/* Single broadcast line */}
        <line x1="100" y1="145" x2="135" y2="145" stroke="#16a34a" strokeWidth="3" markerEnd="url(#greenarrow)" />
        <text x="105" y="135" fontSize="9" fill="#14532d" fontWeight="bold">PUB</text>

        {/* Subscribers (dashed lines = passive listening) */}
        {[
          { y: 30, label: "Nave B" },
          { y: 90, label: "Nave C" },
          { y: 150, label: "Nave D" },
          { y: 210, label: "Nave E" },
        ].map((r, i) => (
          <g key={i}>
            <rect x="280" y={r.y} width="80" height="40" rx="6" fill="#bbf7d0" stroke="#14532d" />
            <text x="320" y={r.y + 25} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#14532d">
              {r.label}
            </text>
            <line
              x1="245"
              y1="145"
              x2="280"
              y2={r.y + 20}
              stroke="#16a34a"
              strokeWidth="1.5"
              strokeDasharray="4"
              markerEnd="url(#greenarrow)"
            />
          </g>
        ))}

        <text x="190" y="265" textAnchor="middle" fontSize="9" fontStyle="italic" fill="#14532d">
          1 sola TX VHF → N receivers
        </text>

        <defs>
          <marker id="greenarrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#16a34a" />
          </marker>
        </defs>
      </svg>
      <p className="text-xs text-center mt-2 text-emerald-900">
        <strong>1 sola trasmissione VHF</strong>, distribuzione automatica via Edge Router.
        <br />
        Banda costante indipendentemente dal numero di navi.
      </p>
    </div>
  </div>
);

/**
 * Diagramma 3: Sequenza Pub/Sub TESLA dettagliata
 */
const PubSubSequenceDiagram: React.FC = () => (
  <div className="my-6 overflow-x-auto">
    <svg viewBox="0 0 900 540" className="w-full min-w-[800px]">
      {/* Lifelines */}
      {[
        { x: 90, label: "Auth Interceptor", sub: "(MMS Agent — Sender)", color: "#2563eb" },
        { x: 260, label: "Edge Router A", sub: "(nave sender)", color: "#16a34a" },
        { x: 430, label: "MMS Router Net", sub: "(VDE-TER backbone)", color: "#d97706" },
        { x: 600, label: "Edge Router B", sub: "(nave receiver)", color: "#16a34a" },
        { x: 800, label: "TESLA Verifier", sub: "(MMS Agent — Receiver)", color: "#2563eb" },
      ].map((l, i) => (
        <g key={i}>
          <rect x={l.x - 70} y={20} width={140} height={40} rx={4} fill={l.color} />
          <text x={l.x} y={40} textAnchor="middle" fontSize="11" fontWeight="bold" fill="white">
            {l.label}
          </text>
          <text x={l.x} y={54} textAnchor="middle" fontSize="9" fill="white">
            {l.sub}
          </text>
          <line x1={l.x} y1={60} x2={l.x} y2={520} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3" />
        </g>
      ))}

      {/* SETUP PHASE */}
      <rect x="50" y="80" width="820" height="20" fill="#fef3c7" stroke="#d97706" />
      <text x="460" y="94" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#92400e">
        ═══ FASE 1 — SUBSCRIPTION SETUP ═══
      </text>

      {/* B subscribes */}
      <line x1="800" y1="115" x2="600" y2="115" stroke="#0891b2" strokeWidth="2" markerEnd="url(#bluearrow)" />
      <text x="700" y="110" textAnchor="middle" fontSize="9" fill="#0e7490">SUBSCRIBE("..VDES:Crypto:TeslaKeys")</text>

      <line x1="600" y1="135" x2="430" y2="135" stroke="#0891b2" strokeWidth="2" markerEnd="url(#bluearrow)" />
      <text x="515" y="130" textAnchor="middle" fontSize="9" fill="#0e7490">propaga sottoscrizione su Router Network</text>

      {/* PUBLISH PHASE */}
      <rect x="50" y="160" width="820" height="20" fill="#fef3c7" stroke="#d97706" />
      <text x="460" y="174" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#92400e">
        ═══ FASE 2 — PUBLISH (interval i+2) ═══
      </text>

      {/* Sender publishes */}
      <line x1="90" y1="195" x2="260" y2="195" stroke="#2563eb" strokeWidth="2" markerEnd="url(#bluearrow)" />
      <text x="175" y="190" textAnchor="middle" fontSize="9" fill="#1e3a8a" fontWeight="bold">
        PUBLISH(subject, K_i, sig_MIR)
      </text>

      {/* Edge Router auth */}
      <rect x="225" y="205" width="70" height="30" fill="#dcfce7" stroke="#16a34a" />
      <text x="260" y="220" textAnchor="middle" fontSize="9" fill="#14532d">verify</text>
      <text x="260" y="232" textAnchor="middle" fontSize="9" fill="#14532d">MIR cert</text>

      {/* Forward to Router Network */}
      <line x1="260" y1="255" x2="430" y2="255" stroke="#16a34a" strokeWidth="2" markerEnd="url(#greenarrow2)" />
      <text x="345" y="250" textAnchor="middle" fontSize="9" fill="#14532d">MMTP frame con K_i</text>

      {/* RADIO TX */}
      <rect x="50" y="280" width="820" height="20" fill="#fee2e2" stroke="#dc2626" />
      <text x="460" y="294" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#991b1b">
        ═══ FASE 3 — VHF BROADCAST (1 sola TX) ═══
      </text>

      <line x1="430" y1="320" x2="600" y2="320" stroke="#dc2626" strokeWidth="3" markerEnd="url(#redarrow2)" />
      <text x="515" y="313" textAnchor="middle" fontSize="9" fill="#991b1b" fontWeight="bold">
        VDE-TER Channel: 1 single broadcast → ∞ receivers
      </text>
      <text x="515" y="337" textAnchor="middle" fontSize="8" fill="#991b1b" fontStyle="italic">
        (il segnale è captato da TUTTE le navi nel range, non solo da B)
      </text>

      {/* DELIVERY PHASE */}
      <rect x="50" y="355" width="820" height="20" fill="#fef3c7" stroke="#d97706" />
      <text x="460" y="369" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#92400e">
        ═══ FASE 4 — LOCAL DELIVERY ═══
      </text>

      {/* Receiver Edge Router lookup */}
      <rect x="565" y="385" width="70" height="40" fill="#dcfce7" stroke="#16a34a" />
      <text x="600" y="400" textAnchor="middle" fontSize="9" fill="#14532d">match</text>
      <text x="600" y="412" textAnchor="middle" fontSize="9" fill="#14532d">subject</text>
      <text x="600" y="422" textAnchor="middle" fontSize="9" fill="#14532d">subscription</text>

      <line x1="600" y1="445" x2="800" y2="445" stroke="#2563eb" strokeWidth="2" markerEnd="url(#bluearrow)" />
      <text x="700" y="440" textAnchor="middle" fontSize="9" fill="#1e3a8a">DELIVER(K_i) → buffer TESLA</text>

      {/* Verification */}
      <rect x="765" y="460" width="70" height="40" fill="#dbeafe" stroke="#2563eb" />
      <text x="800" y="475" textAnchor="middle" fontSize="9" fill="#1e3a8a">verify</text>
      <text x="800" y="487" textAnchor="middle" fontSize="9" fill="#1e3a8a">chain &amp;</text>
      <text x="800" y="497" textAnchor="middle" fontSize="9" fill="#1e3a8a">HMAC</text>

      <defs>
        <marker id="bluearrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#2563eb" />
        </marker>
        <marker id="greenarrow2" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#16a34a" />
        </marker>
        <marker id="redarrow2" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#dc2626" />
        </marker>
      </defs>
    </svg>
  </div>
);


/**
 * Diagramma 5: Subject string anatomy
 */
  const SubjectAnatomy: React.FC = () => (
    <div className="my-6 bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-300 rounded-lg p-6">
      <h4 className="text-center font-bold text-indigo-900 mb-4">
      Anatomia di una Subject String MMS
    </h4>
    <div className="font-mono text-center text-2xl mb-4 text-slate-800">
      <span className="text-slate-400">..</span>
      <span className="text-slate-400">:</span>
        <span className="bg-blue-200 px-2 py-1 rounded">VDES</span>
      <span className="text-slate-400">:</span>
      <span className="bg-emerald-200 px-2 py-1 rounded">Crypto</span>
      <span className="text-slate-400">:</span>
      <span className="bg-amber-200 px-2 py-1 rounded">TeslaKeys</span>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
      <div className="bg-blue-100 p-3 rounded">
        <p className="font-bold text-blue-900">VDES</p>
        <p className="text-xs text-blue-800">
          Namespace tecnologico (top-level): identifica il dominio del bearer.
        </p>
      </div>
      <div className="bg-emerald-100 p-3 rounded">
        <p className="font-bold text-emerald-900">Crypto</p>
        <p className="text-xs text-emerald-800">
          Categoria semantica: distingue messaggi crittografici da nav-data, weather, ecc.
        </p>
      </div>
      <div className="bg-amber-100 p-3 rounded">
        <p className="font-bold text-amber-900">TeslaKeys</p>
        <p className="text-xs text-amber-800">
          Tipo di messaggio specifico: chiave TESLA disclosed (vs MAC, vs Refill).
        </p>
      </div>
    </div>
      <p className="text-xs text-center text-indigo-800 mt-4 italic">
      Convenzione gerarchica simile a MQTT topics: permette wildcard subscription (es.{" "}
      <code>..:VDES:Crypto:*</code>).
    </p>
  </div>
);

// ==================================================================
// MAIN PAGE
// ==================================================================

const TeslaMmsIntegration: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 text-slate-800">
      {/* HEADER */}
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-slate-900 mt-2">
          TESLA + <span className="text-blue-600">MMS Subscription</span>:
          dall'out-of-band al Pub/Sub nativo
        </h1>
        <p className="text-lg text-slate-600 mt-3">
          Come l'integrazione del <strong>Subject-Based Addressing</strong> dell'MMTP
          (RTCM 13900.0) trasforma TESLA da soluzione punto-punto non autenticata a
          meccanismo multicast nativo, autenticato e bandwidth-optimal.
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">
            RTCM 13900.0
          </span>
          <span className="px-2 py-1 text-xs rounded bg-emerald-100 text-emerald-800">
            MMTP Pub/Sub
          </span>
          <span className="px-2 py-1 text-xs rounded bg-violet-100 text-violet-800">
            MIR Authentication
          </span>
          <span className="px-2 py-1 text-xs rounded bg-amber-100 text-amber-800">
            Multicast nativo
          </span>
        </div>
      </header>

      <TOC />

      {/* 1. PROBLEM */}
      <SectionTitle id="problem">1. Il problema dell'out-of-band non autenticato</SectionTitle>

      <Paragraph>
        Nell'implementazione TESLA descritta, i Key packet e i MAC
        packet viaggiano su un canale VDE-TER parallelo, ma il meccanismo di
        distribuzione è essenzialmente <strong>broadcast non gestito</strong>: il
        modem trasmette il pacchetto in chiaro nell'etere e ogni receiver decide
        autonomamente se elaborarlo.
      </Paragraph>

      <Callout type="warning" title="⚠️ Tre limiti strutturali dell'out-of-band puro">
        <ul className="list-disc list-inside space-y-2 mt-2">
          <li>
            <strong>Nessuna autenticazione del publisher</strong> a livello di
            trasporto: chiunque può iniettare un Key packet falso, costringendo i
            receiver a scartare per chain validation (ma con costo computazionale
            non trascurabile).
          </li>
          <li>
            <strong>Nessuna gestione roaming</strong>: una nave che attraversa due
            zone VTS perde la sincronizzazione TESLA finché non ri-bootstrappa via PKI.
          </li>
          <li>
            <strong>Nessuna persistenza</strong>: se la nave è momentaneamente
            disconnessa (ombra di un'isola, dietro un container), perde Key packet
            irrecuperabilmente, con conseguente impossibilità di verificare i MAC
            bufferizzati.
          </li>
        </ul>
      </Callout>

      <Paragraph>
        L'<strong>MMS</strong>, definito dallo standard <strong>RTCM 13900.0</strong>
        e integrato nella Maritime Connectivity Platform (MCP), risolve tutti e tre
        questi problemi nativamente — perché è progettato esattamente come{" "}
        <em>middleware decentralizzato e agnostico rispetto al mezzo fisico</em>{" "}
        (IP, VDE-TER, VDE-SAT).
      </Paragraph>

      {/* 2. MMS STACK */}
      <SectionTitle id="mms-stack">2. Architettura MMS: gerarchia e componenti</SectionTitle>

      <Paragraph>
        L'architettura MMS è strutturata su <strong>tre livelli gerarchici</strong>{" "}
        per separare rigorosamente la logica applicativa, il brokering locale e il
        routing globale.
      </Paragraph>

      <MMSStackDiagram />

      <SubTitle>2.1 Livello 1 — Application + MMS Agent</SubTitle>

      <Paragraph>
        L'<strong>MMS Agent</strong> è la libreria software client integrata
        direttamente all'interno delle applicazioni. Per il nostro caso d'uso, il{" "}
        <em>Auth Interceptor</em> TESLA che agiva come container Dockerizzato
        diventa esso stesso un MMS Agent.
      </Paragraph>

      <Table
        headers={["Caratteristica", "Dettaglio"]}
        rows={[
          [
            "Identità",
            "Certificato X.509 emesso dal MIR, legato a un MRN univoco (es. urn:mrn:mcp:vessel:nl:lepore01)",
          ],
          [
            "Autenticazione",
            "Bidirezionale via MIR durante l'handshake con l'Edge Router",
          ],
          [
            "Modalità anonima",
            "Possibile per soli receiver (non può pubblicare)",
          ],
          [
            "Protocollo upstream",
            "MMTP verso l'Edge Router locale",
          ],
        ]}
      />

      <SubTitle>2.2 Livello 2 — MMS Edge Router</SubTitle>

      <Paragraph>
        L'<strong>Edge Router</strong> è il nodo di rete installato fisicamente sulla
        nave (o a terra). È <em>indipendente dalle singole applicazioni</em> e gestisce
        tutto il traffico LAN locale. Funziona come <strong>Message Broker</strong>{" "}
        dei suoi Agent.
      </Paragraph>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
        <div className="bg-emerald-50 border border-emerald-300 rounded p-3">
          <p className="font-bold text-emerald-900 mb-1">🔐 Autenticazione locale</p>
          <p className="text-sm">
            Verifica il certificato MIR di ogni Agent prima di permettere
            pubblicazione/ricezione.
          </p>
        </div>
        <div className="bg-emerald-50 border border-emerald-300 rounded p-3">
          <p className="font-bold text-emerald-900 mb-1">📥 Subscription Delegation</p>
          <p className="text-sm">
            Si abbona ai flussi globali <em>per conto</em> degli Agent locali, riducendo
            duplicazioni di traffico radio.
          </p>
        </div>
        <div className="bg-emerald-50 border border-emerald-300 rounded p-3">
          <p className="font-bold text-emerald-900 mb-1">🔁 Store-and-Forward</p>
          <p className="text-sm">
            Mette in coda i pacchetti ricevuti e li distribuisce a tutti gli Agent locali
            iscritti a quel subject.
          </p>
        </div>
        <div className="bg-emerald-50 border border-emerald-300 rounded p-3">
          <p className="font-bold text-emerald-900 mb-1">🌐 Bearer Abstraction</p>
          <p className="text-sm">
            Astrae il bearer (IP/VDE-TER/VDE-SAT) presentando un'interfaccia unificata
            agli Agent.
          </p>
        </div>
      </div>

      <SubTitle>2.3 Livello 3 — MMS Router Network</SubTitle>

      <Paragraph>
        Un <strong>ecosistema decentralizzato</strong> di router interconnessi (sia a
        terra che via satellite). Le sue responsabilità includono il routing tra
        domini, il mantenimento delle code persistenti per le sottoscrizioni, e la
        gestione del <em>roaming</em> quando una nave passa dalla copertura di
        un'antenna all'altra.
      </Paragraph>

      <Callout type="info" title="🌍 Decentralizzazione = resilienza">
        Non esiste un singolo punto di fallimento. Se il router VTS-Italia va offline,
        i messaggi vengono ruotati attraverso VTS-EU o un router satellitare. La nave
        non se ne accorge.
      </Callout>

      {/* 3. MMTP */}
      <SectionTitle id="mmtp">3. MMTP & SMMP: il livello di trasporto</SectionTitle>

      <Paragraph>
        I dati si muovono nella gerarchia MMS tramite due protocolli complementari.
      </Paragraph>

      <Table
        headers={["Protocollo", "Funzione", "Garanzie"]}
        rows={[
          [
            <strong key="m">MMTP</strong>,
            "Trasporto di base (Maritime Messaging Transport Protocol)",
            "Routing, indirizzamento, store-and-forward, autenticazione MIR",
          ],
          [
            <strong key="s">SMMP</strong>,
            "Layer di sicurezza opzionale (Secure Maritime Messaging Protocol)",
            "Confidenzialità, integrità, non-ripudio, prova di ricezione",
          ],
        ]}
      />

      <SubTitle>3.1 Le due tipologie di indirizzamento MMTP</SubTitle>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="border-2 border-blue-400 rounded-lg p-4 bg-blue-50">
          <h4 className="font-bold text-blue-900 mb-2">
            🎯 Direct Messaging (Unicast)
          </h4>
          <p className="text-sm mb-3">
            Indirizzamento <strong>point-to-point</strong>. Il mittente conosce
            esattamente l'MRN del destinatario.
          </p>
          <CodeBlock language="text">{`Destination: urn:mrn:mcp:vessel:nl:lepore01
Payload:     <encrypted message>
Auth:        MIR cert of sender`}</CodeBlock>
          <p className="text-xs text-blue-800 italic mt-2">
            Uso tipico: messaggi privati nave-nave, comandi VTS specifici.
          </p>
        </div>

        <div className="border-2 border-emerald-400 rounded-lg p-4 bg-emerald-50">
          <h4 className="font-bold text-emerald-900 mb-2">
            📡 Subject-Based Addressing (Pub/Sub)
          </h4>
          <p className="text-sm mb-3">
            Indirizzamento per <strong>argomento</strong>. Mittente e destinatari
            sono completamente disaccoppiati.
          </p>
          <CodeBlock language="text">{`Subject:  ..:VDES:Crypto:TeslaKeys
Payload:  <K_i + sig>
Auth:     MIR cert of publisher`}</CodeBlock>
          <p className="text-xs text-emerald-800 italic mt-2">
            Uso tipico: avvisi ai naviganti, dati meteo, <strong>chiavi TESLA</strong>.
          </p>
        </div>
      </div>

      {/* 4. PUB/SUB */}
      <SectionTitle id="pubsub">4. Subject-Based Addressing in dettaglio</SectionTitle>

      <Paragraph>
        Nel paradigma Pub/Sub, i messaggi multicast non puntano a un MRN specifico,
        ma a una <strong>stringa identificativa dell'argomento</strong> (subject string).
        Questo disaccoppiamento è il vero abilitatore dell'efficienza multicast.
      </Paragraph>

      <SubjectAnatomy />

      <SubTitle>4.1 Esempio standard: l'Autorità Marittima Danese (DMA)</SubTitle>

      <Paragraph>
        Lo standard RTCM 13900.0 cita esplicitamente questo caso d'uso. La DMA non
        invia gli Avvisi ai Naviganti (NW — Navigational Warnings) singolarmente a
        ogni nave: pubblica un'unica copia sul subject{" "}
        <code className="bg-slate-200 px-2 py-1 rounded">
          ..:Navelink:DMA:NW
        </code>
        . Qualsiasi nave entri in acque danesi sottoscrive quel subject tramite il
        proprio Edge Router e riceve automaticamente tutti gli avvisi.
      </Paragraph>

      <CodeBlock language="text">{`
Pubblicazione DMA:
  ┌──────────────┐
  │  DMA Server  │ ──PUB──► subject: ..:Navelink:DMA:NW
  └──────────────┘            payload: "Avviso #2026/47 — Mine clearance area..."

Sottoscrizioni implicite:
  Nave 1 (in DK) ──SUB──► ..:Navelink:DMA:NW   ✓ riceve
  Nave 2 (in DK) ──SUB──► ..:Navelink:DMA:NW   ✓ riceve
  Nave 3 (in IT) ──SUB──► ..:Navelink:IT:NW    ✗ NON riceve (subject diverso)
`}</CodeBlock>

      <SubTitle>4.2 Confronto visuale: Unicast vs Pub/Sub</SubTitle>

      <UnicastVsPubSubDiagram />

      {/* 5. TESLA + MMS */}
      <SectionTitle id="tesla-mms">5. TESLA su MMS: il flusso completo</SectionTitle>

      <Paragraph>
        Applicando l'MMTP Pub/Sub all'implementazione TESLA, superiamo
        contemporaneamente i limiti della trasmissione out-of-band non autenticata e
        del sovraccarico di banda. Vediamo il flusso passo-passo.
      </Paragraph>

      <SubTitle>5.1 Definizione dei subject TESLA</SubTitle>

      <Paragraph>
        Definiamo una gerarchia di subject coerente con la convenzione MMS:
      </Paragraph>

      <Table
        headers={["Subject String", "Tipo TESLA", "Frequenza"]}
        rows={[
          [
            <code key="1">..:VDES:Crypto:Bootstrap:&lt;MRN&gt;</code>,
            "Type 1-3 (Announcement, Sync Req/Resp)",
            "Una tantum per sessione",
          ],
          [
            <code key="2">..:VDES:Crypto:MAC:&lt;MRN&gt;</code>,
            "Type 4 (MAC packet)",
            "Per ogni messaggio AIS (alta frequenza)",
          ],
          [
            <code key="3">..:VDES:Crypto:TeslaKeys:&lt;MRN&gt;</code>,
            "Type 5 (Key disclosure)",
            "1 ogni base interval (3s)",
          ],
          [
            <code key="4">..:VDES:Crypto:Refill:&lt;MRN&gt;</code>,
            "Type 6 (Chain re-keying)",
            "Ogni 24h",
          ],
        ]}
      />

      <Callout type="success" title="🎯 Vantaggio della gerarchia per-MRN">
        Includendo l'MRN del publisher nel subject, ogni receiver può sottoscrivere
        selettivamente solo le navi di interesse (es. quelle nel proprio raggio di 20
        miglia). Si possono anche usare wildcard:{" "}
        <code>..:VDES:Crypto:TeslaKeys:*</code> per ricevere tutte le chiavi di tutte
        le navi.
      </Callout>

      <SubTitle>5.2 Sequenza completa Pub/Sub TESLA</SubTitle>

      <PubSubSequenceDiagram />

      <SubTitle>5.3 Le quattro fasi nel dettaglio</SubTitle>

      <div className="space-y-4 my-6">
        <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r">
          <p className="font-bold text-blue-900">
            ① Subscription Setup (una tantum)
          </p>
          <p className="text-sm mt-2">
            Il TESLA Verifier (MMS Agent della nave receiver) chiede al proprio Edge
            Router locale di sottoscrivere il subject{" "}
            <code>..:VDES:Crypto:TeslaKeys:&lt;MRN_sender&gt;</code>. L'Edge Router
            propaga la sottoscrizione al Router Network, che memorizza l'interesse
            persistentemente — anche se la nave si disconnette temporaneamente.
          </p>
        </div>

        <div className="border-l-4 border-emerald-500 bg-emerald-50 p-4 rounded-r">
          <p className="font-bold text-emerald-900">
            ② Publish (a fine intervallo i+2)
          </p>
          <p className="text-sm mt-2">
            L'Auth Interceptor della nave sender (MMS Agent) genera il pacchetto Type
            5 contenente K<sub>i</sub> e lo invia al proprio Edge Router con
            l'istruzione "Pubblica al subject TeslaKeys". L'Edge Router{" "}
            <strong>verifica il certificato MIR</strong> del publisher prima di
            accettare la pubblicazione: questo elimina lo spoofing di Key packet che
            era possibile nel modello out-of-band puro.
          </p>
        </div>

        <div className="border-l-4 border-rose-500 bg-rose-50 p-4 rounded-r">
          <p className="font-bold text-rose-900">
            ③ VHF Broadcast (1 sola TX)
          </p>
          <p className="text-sm mt-2">
            L'Edge Router del sender inoltra il frame MMTP al modem VDES, che lo
            trasmette nell'etere <strong>una sola volta</strong> sul canale VDE-TER.
            Tutte le navi nel range, indipendentemente dal loro numero, captano il
            segnale.
          </p>
        </div>

        <div className="border-l-4 border-amber-500 bg-amber-50 p-4 rounded-r">
          <p className="font-bold text-amber-900">
            ④ Local Delivery
          </p>
          <p className="text-sm mt-2">
            L'Edge Router della nave receiver, sapendo di avere una subscription
            attiva su quel subject, estrae il payload e lo instrada via LAN al
            TESLA Verifier (Auth Interceptor). Il Verifier completa la chain
            validation e l'HMAC verification dei MAC bufferizzati.
          </p>
        </div>
      </div>

      {/* 6. COMPARISON */}
      <SectionTitle id="comparison">6. Confronto: TESLA puro vs TESLA+MMS</SectionTitle>

      <Table
        headers={["Aspetto", "TESLA out-of-band puro", "TESLA + MMS Pub/Sub"]}
        rows={[
          [
            "Autenticazione publisher",
            "❌ Solo via chain validation (post-disclosure)",
            "✅ Verifica MIR cert all'Edge Router (pre-broadcast)",
          ],
          [
            "Resilienza a disconnessione",
            "❌ Key packet persi irrecuperabilmente",
            "✅ Code persistenti nel Router Network",
          ],
          [
            "Roaming VTS",
            "❌ Richiede ri-bootstrap PKI",
            "✅ Trasparente al cambio router",
          ],
          [
            "Filtraggio selettivo",
            "❌ Tutti ricevono tutto",
            "✅ Subscribe per-MRN o wildcard",
          ],
          [
            "Banda VHF per N navi",
            "❌ O(N) — lineare",
            "✅ O(1) — costante",
          ],
          [
            "Spoofing di Key packet",
            "⚠️ Possibile (rifiutato post-validation)",
            "✅ Rifiutato a livello Edge Router",
          ],
          [
            "Time-shifting attack",
            "⚠️ Possibile su clock drift",
            "✅ Mitigato dal SMMP non-repudiation",
          ],
          [
            "Compatibilità standard",
            "⚠️ Ad-hoc, non standardizzato",
            "✅ Conforme RTCM 13900.0 + IALA G1192",
          ],
          [
            "Cross-bearer (IP/VDE-TER/VDE-SAT)",
            "❌ Solo VDE-TER",
            "✅ Bearer-agnostic (anche backup IP)",
          ],
        ]}
      />

      <SectionTitle id="security-gain">7. Guadagni di sicurezza</SectionTitle>

      <Paragraph>
        Oltre all'efficienza, l'integrazione MMS aggiunge <strong>tre layer di
        sicurezza</strong> non disponibili nell'out-of-band puro.
      </Paragraph>

      <div className="space-y-4 my-6">
        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r">
          <p className="font-bold text-emerald-900 mb-1">
            🛡️ Layer 1: Publisher authentication (MIR)
          </p>
          <p className="text-sm">
            L'Edge Router rifiuta qualsiasi tentativo di pubblicazione su{" "}
            <code>..:VDES:Crypto:TeslaKeys</code> da parte di Agent senza certificato
            MIR valido. Un attaccante non può semplicemente trasmettere Key packet
            falsi: deve prima compromettere un MIR cert, evento auditabile e
            revocabile.
          </p>
        </div>

        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r">
          <p className="font-bold text-emerald-900 mb-1">
            🛡️ Layer 2: Non-repudiation (SMMP opzionale)
          </p>
          <p className="text-sm">
            Attivando SMMP sul subject TESLA, ogni Key packet pubblicato è firmato
            digitalmente dal publisher. In caso di disputa (es. una nave nega di aver
            inviato un MAC), si ha prova crittografica forense. Utile per indagini
            post-incidente.
          </p>
        </div>

        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r">
          <p className="font-bold text-emerald-900 mb-1">
            🛡️ Layer 3: ACL per subject (autorizzazione)
          </p>
          <p className="text-sm">
            Il Router Network può applicare politiche di Access Control: solo navi
            registrate (con MMSI valido nel MIR) possono pubblicare su subject{" "}
            <code>VDES:Crypto:*</code>. Mitiga il problema Sybil a livello
            organizzativo, non a livello protocollare.
          </p>
        </div>
      </div>

      <Callout type="info" title="🔄 Defense in depth: i due livelli si rinforzano">
        L'autenticazione MIR a livello MMTP <strong>non sostituisce</strong> la chain
        validation TESLA: la rinforza. Anche se un attaccante riuscisse a compromettere
        un MIR cert, dovrebbe comunque conoscere la catena hash per produrre Key
        packet validi. I due meccanismi operano in serie.
      </Callout>

      {/* 9. CONCLUSION */}
      <SectionTitle id="takeaway">8. Conclusioni e raccomandazioni</SectionTitle>

      <div className="bg-gradient-to-br from-blue-50 to-emerald-50 border-2 border-blue-300 rounded-lg p-6 my-6">
        <h4 className="text-xl font-bold text-blue-900 mb-4">
          🎯 Le 5 ragioni per integrare TESLA con MMS
        </h4>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>
            <strong>Efficienza radio O(1)</strong>: la banda non scala col numero di
            navi.
          </li>
          <li>
            <strong>Autenticazione preventiva</strong>: lo spoofing di Key packet è
            bloccato a livello Edge Router, non solo post-validation.
          </li>
          <li>
            <strong>Resilienza nativa</strong>: code persistenti gestiscono
            disconnessioni temporanee senza perdere chiavi.
          </li>
          <li>
            <strong>Compatibilità standard</strong>: si allinea a RTCM 13900.0,
            IALA G1192 e MCP — pronto per certificazione SOLAS 2028.
          </li>
          <li>
            <strong>Cross-bearer</strong>: lo stesso subject funziona su VDE-TER,
            VDE-SAT e backup IP, abilitando ridondanza automatica.
          </li>
        </ol>
      </div>

      <Callout type="warning" title="⚠️ Trade-off da considerare">
        L'integrazione richiede:
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>
            Una <strong>infrastruttura MMS operativa</strong> (Edge Router certificati,
            Router Network attivo) — al momento ancora in fase di rollout.
          </li>
          <li>
            <strong>Bootstrap MIR</strong> per ogni nave (vetting process MCP).
          </li>
          <li>
            <strong>Latenza aggiuntiva</strong> per la propagazione delle subscription
            (tipicamente &lt;1s, ma da considerare).
          </li>
        </ul>
        Per il deployment pre-2028, è ragionevole supportare <strong>entrambe</strong>{" "}
        le modalità: out-of-band puro come fallback, MMS Pub/Sub come modalità
        preferita quando disponibile.
      </Callout>

      <SubTitle>9.1 Roadmap di adozione proposta</SubTitle>

      <CodeBlock language="text">{`
Fase 1 (oggi):       TESLA out-of-band su VDE-TER (paper attuale)
                     ↓
Fase 2 (2026-2027):  Dual-mode: out-of-band + MMS opzionale
                     ↓
Fase 3 (2028+):      MMS Pub/Sub come default, out-of-band deprecato
                     ↓
Fase 4 (post-quantum): Migrazione bootstrap a ML-DSA + TESLA invariato
`}</CodeBlock>

      {/* REFERENCES */}
      <SectionTitle id="refs">10. Riferimenti</SectionTitle>

        <ul className="list-disc list-inside space-y-1 text-sm text-blue-700">
        <li>
          <a
            href="https://www.rtcm.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            RTCM 13900.0 — Maritime Messaging Service Architecture (RTCM)
          </a>
        </li>
        <li>
          <a
            href="https://maritimeconnectivity.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Maritime Connectivity Platform (MCP) — Official Documentation
          </a>
        </li>
        <li>IALA Guideline G1192 — VDES Authentication Techniques (2025)</li>
        <li>IALA Guideline G1117 Ed.3 — VDES Overview</li>
        <li>IALA Guideline G1183 — MCP Maritime Identity Registry</li>
        <li>ITU-R M.2092-1 — VDES technical characteristics</li>
        <li>RFC 4082 — TESLA Broadcast Authentication Protocol</li>
        <li>Capitolo 3 di questa guida — Architettura MMS</li>
        <li>Capitolo 4.4 di questa guida — TESLA Protocol Implementation</li>
      </ul>
    </div>
  );
};

export default TeslaMmsIntegration;