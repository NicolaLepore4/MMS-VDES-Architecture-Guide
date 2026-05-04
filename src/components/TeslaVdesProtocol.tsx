import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

export const TeslaVdesProtocol = ({ lang }: { lang: Language }) => {
  const t = TRANSLATIONS[lang];

  const SimpleTable = ({
    headers,
    rows,
  }: {
    headers: string[];
    rows: string[][];
  }) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full border border-slate-200 rounded-2xl overflow-hidden text-sm">
        <thead className="bg-slate-50">
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                className="border border-slate-200 px-4 py-3 text-left font-black text-slate-700 uppercase tracking-wider"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {rows.map((row, i) => (
            <tr
              key={i}
              className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="border border-slate-200 px-4 py-2 align-top text-slate-700"
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
          {t.teslaTitle}
        </h1>
        <p className="text-lg text-slate-600 mt-3 leading-relaxed max-w-3xl">
          {t.teslaSubtitle}
        </p>

        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md text-sm">
          <p className="font-semibold mb-1">📘 Fonte</p>
          <p className="italic text-slate-700">{t.teslaSource}</p>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-800 font-black uppercase tracking-wider">
            TESLA
          </span>
          <span className="px-3 py-1 text-xs rounded-full bg-emerald-100 text-emerald-800 font-black uppercase tracking-wider">
            RFC 4082
          </span>
          <span className="px-3 py-1 text-xs rounded-full bg-violet-100 text-violet-800 font-black uppercase tracking-wider">
            IALA G1192
          </span>
          <span className="px-3 py-1 text-xs rounded-full bg-amber-100 text-amber-800 font-black uppercase tracking-wider">
            Out-of-band
          </span>
          <span className="px-3 py-1 text-xs rounded-full bg-rose-100 text-rose-800 font-black uppercase tracking-wider">
            Backward compatible
          </span>
        </div>
      </header>

      {/* 1. Problem */}
      <section className="space-y-4">
        <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight uppercase border-b border-slate-200 pb-3">
          {t.teslaProblemTitle}
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed mb-4">
          {t.teslaProblemP1}
        </p>
        <div className="border-l-4 p-4 my-6 rounded-r-lg bg-red-50 border-red-500">
          <p className="font-semibold mb-1 text-sm text-red-900">
            {t.teslaProblemCalloutTitle}
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-red-800">
            <li>{t.teslaProblemCallout1}</li>
            <li>{t.teslaProblemCallout2}</li>
            <li>{t.teslaProblemCallout3}</li>
            <li>{t.teslaProblemCallout4}</li>
          </ul>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed mb-4">
          {t.teslaProblemP2}
        </p>
      </section>

      {/* 2. State of the Art */}
      <section className="space-y-6">
        <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight uppercase border-b border-slate-200 pb-3">
          {t.teslaSotaTitle}
        </h2>
        <SimpleTable
          headers={[
            t.teslaSotaHeader1,
            t.teslaSotaHeader2,
            t.teslaSotaHeader3,
            t.teslaSotaHeader4,
          ]}
          rows={[
            [
              t.teslaSotaRow1Col1,
              t.teslaSotaRow1Col2,
              t.teslaSotaRow1Col3,
              t.teslaSotaRow1Col4,
            ],
            [
              t.teslaSotaRow2Col1,
              t.teslaSotaRow2Col2,
              t.teslaSotaRow2Col3,
              t.teslaSotaRow2Col4,
            ],
            [
              t.teslaSotaRow3Col1,
              t.teslaSotaRow3Col2,
              t.teslaSotaRow3Col3,
              t.teslaSotaRow3Col4,
            ],
          ]}
        />
        <div className="border-l-4 p-4 my-6 rounded-r-lg bg-blue-50 border-blue-500">
          <p className="font-semibold mb-1 text-sm text-blue-900">
            {t.teslaSotaCalloutTitle}
          </p>
          <p className="text-sm leading-relaxed text-blue-800">
            {t.teslaSotaCalloutContent}
          </p>
        </div>
      </section>

      {/* 3. TESLA Intro */}
      <section className="space-y-4">
        <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight uppercase border-b border-slate-200 pb-3">
          {t.teslaTeslaIntroTitle}
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed mb-4">
          {t.teslaTeslaIntroP1}
        </p>
        <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-4">
          {t.teslaSub1Title}
        </h3>
        <p className="text-sm text-slate-700 leading-relaxed mb-4">
          {t.teslaTeslaP2}
        </p>
        <div className="bg-slate-100 border border-slate-200 rounded-md p-3 my-4 text-center font-mono text-slate-900">
          {t.teslaTeslaFormula}
        </div>
        <p className="text-sm text-slate-700 leading-relaxed mb-4">
          {t.teslaTeslaP3}
        </p>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 overflow-x-auto text-sm my4">
          <code>{t.teslaTeslaCodeBlock1}</code>
        </pre>
      </section>

      {/* 4. Middleware */}
      <section className="space-y-6">
        <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight uppercase border-b border-slate-200 pb-3">
          {t.teslaMiddlewareTitle}
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed mb-4">
          {t.teslaMiddlewareP1}
        </p>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 overflow-x-auto text-sm my-4">
          <code>{t.teslaMiddlewareCodeBlock}</code>
        </pre>
        <div className="border-l-4 p-4 my-6 rounded-r-lg bg-emerald-50 border-emerald-500">
          <p className="font-semibold mb-1 text-sm text-emerald-900">
            {t.teslaOutOfBandTitle}
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-emerald-800">
            <li>{t.teslaOutOfBand1}</li>
            <li>{t.teslaOutOfBand2}</li>
            <li>{t.teslaOutOfBand3}</li>
            <li>{t.teslaOutOfBand4}</li>
          </ul>
        </div>
        <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-4">
          {t.teslaSub2Title}
        </h3>
        <SimpleTable
          headers={[t.teslaTable2Header1, t.teslaTable2Header2, t.teslaTable2Header3]}
          rows={[
            [t.teslaTable2Row1Col1, t.teslaTable2Row1Col2, t.teslaTable2Row1Col3],
            [t.teslaTable2Row2Col1, t.teslaTable2Row2Col2, t.teslaTable2Row2Col3],
          ]}
        />
      </section>

      {/* 5. Parameters */}
      <section className="space-y-6">
        <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight uppercase border-b border-slate-200 pb-3">
          {t.teslaParamsTitle}
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed mb-4">
          {t.teslaParamsP1}
        </p>
        <SimpleTable
          headers={[t.teslaTable3Header1, t.teslaTable3Header2, t.teslaTable3Header3]}
          rows={[
            [t.teslaTable3Row1Col1, t.teslaTable3Row1Col2, t.teslaTable3Row1Col3],
            [t.teslaTable3Row2Col1, t.teslaTable3Row2Col2, t.teslaTable3Row2Col3],
            [t.teslaTable3Row3Col1, t.teslaTable3Row3Col2, t.teslaTable3Row3Col3],
          ]}
        />
        <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-4">
          {t.teslaSub3Title1}
        </h3>
        <p className="text-sm text-slate-700 leading-relaxed mb-4">
          {t.teslaParamsP2}
        </p>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 overflow-x-auto text-sm my-4">
          <code>{t.teslaCodeBlock4}</code>
        </pre>
        <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-4">
          {t.teslaSub3Title2}
        </h3>
        <SimpleTable
          headers={[
            t.teslaTable4Header1,
            t.teslaTable4Header2,
            t.teslaTable4Header3,
            t.teslaTable4Header4,
          ]}
          rows={[
            [
              t.teslaTable4Row1Col1,
              t.teslaTable4Row1Col2,
              t.teslaTable4Row1Col3,
              t.teslaTable4Row1Col4,
            ],
            [
              t.teslaTable4Row2Col1,
              t.teslaTable4Row2Col2,
              t.teslaTable4Row2Col3,
              t.teslaTable4Row2Col4,
            ],
            [
              t.teslaTable4Row3Col1,
              t.teslaTable4Row3Col2,
              t.teslaTable4Row3Col3,
              t.teslaTable4Row3Col4,
            ],
          ]}
        />
        <div className="border-l-4 p-4 my-6 rounded-r-lg bg-amber-50 border-amber-500">
          <p className="font-semibold mb-1 text-sm text-amber-900">
            {t.teslaCallout2Title}
          </p>
          <p className="text-sm leading-relaxed text-amber-800">
            {t.teslaCallout2Content}
          </p>
        </div>
      </section>

      {/* 6. Messages */}
      <section className="space-y-6">
        <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight uppercase border-b border-slate-200 pb-3">
          {t.teslaMessagesTitle}
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed mb-4">
          {t.teslaMessagesP1}
        </p>
        <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-4">
          {t.teslaSub4Title1}
        </h3>
        <SimpleTable
          headers={[
            t.teslaTable5Header1,
            t.teslaTable5Header2,
            t.teslaTable5Header3,
            t.teslaTable5Header4,
          ]}
          rows={[
            [
              t.teslaTable5Row1Col1,
              t.teslaTable5Row1Col2,
              t.teslaTable5Row1Col3,
              t.teslaTable5Row1Col4,
            ],
            [
              t.teslaTable5Row2Col1,
              t.teslaTable5Row2Col2,
              t.teslaTable5Row2Col3,
              t.teslaTable5Row2Col4,
            ],
            [
              t.teslaTable5Row3Col1,
              t.teslaTable5Row3Col2,
              t.teslaTable5Row3Col3,
              t.teslaTable5Row3Col4,
            ],
          ]}
        />
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 overflow-x-auto text-sm my-4">
          <code>{t.teslaCodeBlock5}</code>
        </pre>
        <div className="border-l-4 p-4 my-6 rounded-r-lg bg-blue-50 border-blue-500">
          <p className="font-semibold mb-1 text-sm text-blue-900">
            {t.teslaCallout3Title}
          </p>
          <p className="text-sm leading-relaxed text-blue-800">
            {t.teslaCallout3Content}
          </p>
        </div>
        <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-4">
          {t.teslaSub4Title2}
        </h3>
        <SimpleTable
          headers={[
            t.teslaTable6Header1,
            t.teslaTable6Header2,
            t.teslaTable6Header3,
            t.teslaTable6Header4,
          ]}
          rows={[
            [
              t.teslaTable6Row1Col1,
              t.teslaTable6Row1Col2,
              t.teslaTable6Row1Col3,
              t.teslaTable6Row1Col4,
            ],
            [
              t.teslaTable6Row2Col1,
              t.teslaTable6Row2Col2,
              t.teslaTable6Row2Col3,
              t.teslaTable6Row2Col4,
            ],
            [
              t.teslaTable6Row3Col1,
              t.teslaTable6Row3Col2,
              t.teslaTable6Row3Col3,
              t.teslaTable6Row3Col4,
            ],
          ]}
        />
        <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-4">
          {t.teslaSub4Title3}
        </h3>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 overflow-x-auto text-sm my-4">
          <code>{t.teslaCodeBlock6}</code>
        </pre>
        <div className="border-l-4 p-4 my-6 rounded-r-lg bg-emerald-50 border-emerald-500">
          <p className="font-semibold mb-1 text-sm text-emerald-900">
            {t.teslaCallout4Title}
          </p>
          <p className="text-sm leading-relaxed text-emerald-800">
            {t.teslaCallout4Content}
          </p>
        </div>
      </section>

      {/* 7. Sender */}
      <section className="space-y-4">
        <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight uppercase border-b border-slate-200 pb-3">
          {t.teslaSenderTitle}
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed mb-4">
          {t.teslaSenderP1}
        </p>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 overflow-x-auto text-sm my-4">
          <code>{t.teslaCodeBlock7}</code>
        </pre>
        <div className="border-l-4 p-4 my-6 rounded-r-lg bg-amber-50 border-amber-500">
          <p className="font-semibold mb-1 text-sm text-amber-900">
            {t.teslaCallout5Title}
          </p>
          <p className="text-sm leading-relaxed text-amber-800">
            {t.teslaCallout5Content}
          </p>
        </div>
      </section>

      {/* 8. Receiver */}
      <section className="space-y-6">
        <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight uppercase border-b border-slate-200 pb-3">
          {t.teslaReceiverTitle}
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed mb-4">
          {t.teslaReceiverP1}
        </p>
        <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-4">
          {t.teslaSub5Title1}
        </h3>
        <SimpleTable
          headers={[
            t.teslaTable7Header1,
            t.teslaTable7Header2,
            t.teslaTable7Header3,
            t.teslaTable7Header4,
          ]}
          rows={[
            [
              t.teslaTable7Row1Col1,
              t.teslaTable7Row1Col2,
              t.teslaTable7Row1Col3,
              t.teslaTable7Row1Col4,
            ],
            [
              t.teslaTable7Row2Col1,
              t.teslaTable7Row2Col2,
              t.teslaTable7Row2Col3,
              t.teslaTable7Row2Col4,
            ],
          ]}
        />
        <p className="text-sm text-slate-700 leading-relaxed mb-4">
          {t.teslaReceiverP2}
        </p>
        <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-4">
          {t.teslaSub5Title2}
        </h3>
        <SimpleTable
          headers={[t.teslaTable8Header1, t.teslaTable8Header2, t.teslaTable8Header3]}
          rows={[
            [t.teslaTable8Row1Col1, t.teslaTable8Row1Col2, t.teslaTable8Row1Col3],
            [t.teslaTable8Row2Col1, t.teslaTable8Row2Col2, t.teslaTable8Row2Col3],
            [t.teslaTable8Row3Col1, t.teslaTable8Row3Col2, t.teslaTable8Row3Col3],
            [t.teslaTable8Row4Col1, t.teslaTable8Row4Col2, t.teslaTable8Row4Col3],
          ]}
        />
        <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-4">
          {t.teslaSub5Title3}
        </h3>
        <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 overflow-x-auto text-sm my-4">
          <code>{t.teslaCodeBlock8}</code>
        </pre>
        <div className="border-l-4 p-4 my-6 rounded-r-lg bg-rose-50 border-rose-500">
          <p className="font-semibold mb-1 text-sm text-rose-900">
            {t.teslaCallout6Title}
          </p>
          <p className="text-sm leading-relaxed text-rose-800">
            {t.teslaCallout6Content}
          </p>
        </div>
      </section>

      {/* 9. Performance */}
      <section className="space-y-6">
        <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight uppercase border-b border-slate-200 pb-3">
          {t.teslaPerfTitle}
        </h2>
        <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-4">
          {t.teslaPerfSub1}
        </h3>
        <SimpleTable
          headers={[t.teslaTable9Header1, t.teslaTable9Header2, t.teslaTable9Header3]}
          rows={[
            [t.teslaTable9Row1Col1, t.teslaTable9Row1Col2, t.teslaTable9Row1Col3],
            [t.teslaTable9Row2Col1, t.teslaTable9Row2Col2, t.teslaTable9Row2Col3],
            [t.teslaTable9Row3Col1, t.teslaTable9Row3Col2, t.teslaTable9Row3Col3],
            [t.teslaTable9Row4Col1, t.teslaTable9Row4Col2, t.teslaTable9Row4Col3],
          ]}
        />
        <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-4">
          {t.teslaPerfSub2}
        </h3>
        <div className="border-l-4 p-4 my-6 rounded-r-lg bg-blue-50 border-blue-500">
          <p className="font-semibold mb-1 text-sm text-blue-900">
            {t.teslaCallout7Title}
          </p>
          <p className="text-sm leading-relaxed text-blue-800">
            {t.teslaCallout7Content}
          </p>
        </div>
        <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-4">
          {t.teslaPerfSub3}
        </h3>
        <SimpleTable
          headers={[t.teslaTable10Header1, t.teslaTable10Header2, t.teslaTable10Header3]}
          rows={[
            [t.teslaTable10Row1Col1, t.teslaTable10Row1Col2, t.teslaTable10Row1Col3],
            [t.teslaTable10Row2Col1, t.teslaTable10Row2Col2, t.teslaTable10Row2Col3],
            [t.teslaTable10Row3Col1, t.teslaTable10Row3Col2, t.teslaTable10Row3Col3],
          ]}
        />
      </section>

      {/* 10. Security */}
      <section className="space-y-6">
        <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight uppercase border-b border-slate-200 pb-3">
          {t.teslaSecTitle}
        </h2>
        <SimpleTable
          headers={[
            t.teslaSecTableHeader1,
            t.teslaSecTableHeader2,
            t.teslaSecTableHeader3,
          ]}
          rows={[
            [
              t.teslaSecTableRow1Col1,
              t.teslaSecTableRow1Col2,
              t.teslaSecTableRow1Col3,
            ],
            [
              t.teslaSecTableRow2Col1,
              t.teslaSecTableRow2Col2,
              t.teslaSecTableRow2Col3,
            ],
            [
              t.teslaSecTableRow3Col1,
              t.teslaSecTableRow3Col2,
              t.teslaSecTableRow3Col3,
            ],
            [
              t.teslaSecTableRow4Col1,
              t.teslaSecTableRow4Col2,
              t.teslaSecTableRow4Col3,
            ],
            [
              t.teslaSecTableRow5Col1,
              t.teslaSecTableRow5Col2,
              t.teslaSecTableRow5Col3,
            ],
          ]}
        />
        <div className="border-l-4 p-4 my-6 rounded-r-lg bg-indigo-50 border-indigo-500">
          <p className="font-semibold mb-1 text-sm text-indigo-900">
            {t.teslaCallout8Title}
          </p>
          <p className="text-sm leading-relaxed text-indigo-800">
            {t.teslaCallout8Content}
          </p>
        </div>
      </section>

      {/* 11. Takeaways */}
      <section className="space-y-4">
        <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight uppercase border-b border-slate-200 pb-3">
          {t.teslaTakeawaysTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="font-bold text-blue-900 mb-2">{t.teslaCard1Title}</p>
            <p className="text-sm text-blue-800">{t.teslaCard1Text}</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <p className="font-bold text-emerald-900 mb-2">{t.teslaCard2Title}</p>
            <p className="text-sm text-emerald-800">{t.teslaCard2Text}</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="font-bold text-amber-900 mb-2">{t.teslaCard3Title}</p>
            <p className="text-sm text-amber-800">{t.teslaCard3Text}</p>
          </div>
          <div className="bg-rose-50 border border-rose-200 rounded-lg p-4">
            <p className="font-bold text-rose-900 mb-2">{t.teslaCard4Title}</p>
            <p className="text-sm text-rose-800">{t.teslaCard4Text}</p>
          </div>
        </div>
        <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-4">
          {t.teslaQuizTitle}
        </h3>
        <ol className="list-decimal list-inside space-y-2 text-sm text-slate-700 mb-4">
          <li>{t.teslaQuiz1}</li>
          <li>{t.teslaQuiz2}</li>
          <li>{t.teslaQuiz3}</li>
          <li>{t.teslaQuiz4}</li>
          <li>{t.teslaQuiz5}</li>
          <li>{t.teslaQuiz6}</li>
        </ol>
      </section>

      {/* 12. References */}
      <section className="space-y-4">
        <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight uppercase border-b border-slate-200 pb-3">
          {t.teslaRefsTitle}
        </h2>
        <ul className="space-y-2 text-sm">
          <li>
            <a
              href="https://datatracker.ietf.org/doc/html/rfc4082"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {t.teslaRef1Text}
            </a>
          </li>
          <li>
            <a
              href="https://datatracker.ietf.org/doc/html/rfc2104"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {t.teslaRef2Text}
            </a>
          </li>
          <li className="text-slate-700">{t.teslaRef3Text}</li>
          <li className="text-slate-700">{t.teslaRef4Text}</li>
          <li className="text-slate-700">{t.teslaRef5Text}</li>
          <li className="text-slate-700">{t.teslaRef6Text}</li>
          <li className="text-slate-700">{t.teslaRef7Text}</li>
          <li className="text-slate-700">{t.teslaRef8Text}</li>
        </ul>
       </section>
     </motion.div>
   );
 };

export default TeslaVdesProtocol;
