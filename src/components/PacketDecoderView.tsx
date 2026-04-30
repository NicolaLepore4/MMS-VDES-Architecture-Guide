import React, { useState } from 'react';
import { 
  Radio, 
  Network, 
  Layers, 
  Globe, 
  Lock, 
  ExternalLink, 
  Cpu 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

export const PacketDecoderView = ({ lang }: { lang: Language }) => {
  const t = TRANSLATIONS[lang];
  const [payload, setPayload] = useState('{"route_id": "R-101", "destination": "GENOA", "eta": "2024-05-12T14:00Z"}');
  const [activeLayer, setActiveLayer] = useState<1 | 2 | 3>(3);
  const [stack, setStack] = useState<'vdes' | 'ethernet' | 'backhaul' | 'onenet'>('vdes');

  const templates = [
    { label: lang === 'it' ? 'Rotta (URN)' : 'Route (URN)', data: '{"route_id": "R-101", "destination": "GENOA", "eta": "2024-05-12T14:00Z", "vessel_urn": "urn:mrn:mms:vessel:247123400"}' },
    { label: 'Meteo (URN)', data: '{"station": "PORT_A", "temp": 18, "wind": 12, "vis": 10, "sender_urn": "urn:mrn:mms:station:2470001"}' },
    { label: lang === 'it' ? 'Posizione' : 'Position', data: '{"mmsi": 247123400, "lat": 44.38, "lon": 8.94, "sog": 12.5, "urn": "urn:mrn:mms:vessel:247123400"}' },
    { label: 'Alert', data: '{"type": "DISTRESS", "mmsi": 247123400, "priority": "CRITICAL", "id_urn": "urn:mrn:mms:vessel:247123400"}' }
  ];

  const getSMMP = () => {
    try {
      const data = JSON.parse(payload);
      return JSON.stringify({
        header: {
          protocol: "MMS Security Layer (SMMP)",
          v: "1.0",
          sender: "urn:mrn:mms:vessel:247123400",
          validation: "MIR / X.509",
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
    } else if (stack === 'ethernet' || stack === 'onenet') {
      const header = stack === 'onenet' ? '[NMEA OneNet (IPv6) HEADER]\nEncapsulation: Direct IP DataGram\nNo fragmentation (Native IPv6)\n' : '[IEC-61162-450 HEADER]\nUdPbCx,v:1,n:1,s:MMS,dst:ALL,c:1*';
      return `${stack === 'onenet' ? '' : '[UDP HEADER]\nSrcPort: 61162, DstPort: 61162\nMulticast: 239.192.0.1\n\n'}${header}${Math.floor(Math.random()*99)}\n\n[PAYLOAD BINARY]\n${btoa(raw).substr(0, 100)}...`;
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
                  { id: 'onenet', label: 'NMEA OneNet (IPv6)', icon: <Layers className="w-3 h-3" /> },
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
                        (stack === 'ethernet' || stack === 'onenet' ? 'UDP / IPv6 MULTICAST' : t.radioSentences)}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">
                       {activeLayer === 3 ? 'X.509 / ECC' : 
                        activeLayer === 2 ? (stack === 'vdes' ? 'MMTP / VDES' : 'MMTP / IP') : 
                        (stack === 'ethernet' ? 'LWE / 61162-450' : stack === 'onenet' ? 'NMEA ONENET' : stack === 'backhaul' ? 'TCP/IP BACKHAUL' : 'VDES-TER / AIS')}
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
                          {stack === 'ethernet' ? 'IEC 61162-450' : stack === 'onenet' ? 'OneNet (IPv6)' : stack === 'vdes' ? 'IALA G1139' : 'TCP/IP Backhaul'}
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
