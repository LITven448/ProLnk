import { useState } from 'react';

const systemAges = ['Under 8 years', '8–12 years', '12–15 years', '15–18 years', 'Over 18 years'];
const repairQuotes = ['Under $500', '$500–$1,000', '$1,000–$2,000', '$2,000–$3,500', 'Over $3,500'];
const dfwTimings = ['January–March (now)', 'April (pre-season)', 'May (early summer)', 'June–August (peak DFW heat)', 'September–December (off-season)'];

function getReplacementAssessment(age: string, repairQuote: string, timing: string) {
  const ageNum = age.includes('Under 8') ? 6 : age.includes('8–12') ? 10 : age.includes('12–15') ? 13 : age.includes('15–18') ? 16 : 20;
  const quoteNum = repairQuote.includes('Under') ? 400 : repairQuote.includes('500–1') ? 750 : repairQuote.includes('1,000–2') ? 1500 : repairQuote.includes('2,000') ? 2750 : 4500;
  const ruleScore = quoteNum * ageNum;
  const replace = ruleScore > 5000 || ageNum >= 18;
  const isPeak = timing.includes('June') || timing.includes('July') || timing.includes('August');
  const isPreSeason = timing.includes('April') || timing.includes('January') || timing.includes('March');
  const decision = replace ? '🔄 Replace — $5,000 Rule Triggered' : '🔧 Repair — Rule Supports Repair Now';
  const ruleCalc = `$${quoteNum.toLocaleString()} repair × ${ageNum} years = ${ruleScore.toLocaleString()} (${ruleScore > 5000 ? 'exceeds $5K → Replace' : 'under $5K → Repair OK'})`;
  const timingAdvice = isPeak
    ? '⚠️ DFW Peak: Replacement during June–August means 1–3 week delays + premium pricing. If possible, do a temp repair now and replace in fall.'
    : isPreSeason
    ? '✅ Ideal DFW timing: January–April installations have best availability, best pricing, and you\’re ready before summer heat.'
    : '✅ Good timing: Fall and early spring installations avoid DFW summer rush.';
  const dfwCost = '2026 DFW replacement cost: $4,200–$8,500 for 3–5 ton split system including labor. 2-stage or inverter systems run $6,500–$12,000.';
  return { decision, ruleCalc, timingAdvice, dfwCost };
}

export default function DFWHVACReplacementTimingGuide2026() {
  const [age, setAge] = useState('');
  const [quote, setQuote] = useState('');
  const [timing, setTiming] = useState('');
  const [result, setResult] = useState<ReturnType<typeof getReplacementAssessment> | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EFF8', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>DFW HVAC GUIDE — 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>🏠 Replace vs Repair — DFW 2026</h1>
        <p style={{ color: '#8BA0B8', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
          The $5,000 Rule plus DFW timing makes this decision straightforward — if you run the math. Replacing during DFW peak summer is the worst time. Replacing before is the best investment you can make.
        </p>

        <div style={{ background: '#0F2240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📐 The $5,000 Rule</h2>
          <div style={{ color: '#C8D8E8', lineHeight: 1.8 }}>
            <p><strong style={{ color: '#E8EFF8′ }}>Formula:</strong> Repair Cost × System Age = Score</p>
            <p style={{ marginTop: 8 }}>If the score exceeds <strong style={{ color: '#F5E642′ }}>$5,000</strong>, replace. If it’s under, repair and monitor.</p>
            <p style={{ marginTop: 8 }}>Example: $800 repair × 10 years = $8,000 → Replace</p>
            <p style={{ marginTop: 4 }}>Example: $400 repair × 8 years = $3,200 → Repair OK</p>
          </div>
        </div>

        <div style={{ background: '#0F2240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📅 DFW Timing Matters More Than Most Markets</h2>
          <ul style={{ color: '#C8D8E8', lineHeight: 2, paddingLeft: 20 }}>
            <li><strong style={{ color: '#E8EFF8′ }}>Jan–April:</strong> Best pricing, best availability, crews ready. Do it now if you can.</li>
            <li><strong style={{ color: '#E8EFF8′ }}>May:</strong> Last chance before summer rush — book immediately</li>
            <li><strong style={{ color: '#E8EFF8′ }}>June–August:</strong> 1–3 week wait times, premium pricing, worst time</li>
            <li><strong style={{ color: '#E8EFF8′ }}>Sept–Dec:</strong> Great availability, good pricing, prepare for next summer</li>
            <li>DFW 2026: Equipment lead times have improved but 2-stage units still 1–2 week lead times</li>
          </ul>
        </div>

        <div style={{ background: '#0F2240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🔍 Run My DFW Replace vs Repair Analysis</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#8BA0B8', fontSize: 13, marginBottom: 8 }}>SYSTEM AGE</label>
            <select value={age} onChange={e => setAge(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EFF8', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
              <option value="">Select age...</option>
              {systemAges.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#8BA0B8', fontSize: 13, marginBottom: 8 }}>REPAIR QUOTE RECEIVED</label>
            <select value={quote} onChange={e => setQuote(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EFF8', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
              <option value="">Select repair quote range...</option>
              {repairQuotes.map(q => <option key={q} value={q}>{q}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#8BA0B8', fontSize: 13, marginBottom: 8 }}>DFW TIMING — WHEN CAN YOU REPLACE?</label>
            <select value={timing} onChange={e => setTiming(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EFF8', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
              <option value="">Select timing window...</option>
              {dfwTimings.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <button onClick={() => { if (age && quote && timing) setResult(getReplacementAssessment(age, quote, timing)); }} disabled={!age || !quote || !timing} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', opacity: (!age || !quote || !timing) ? 0.5 : 1 }}>
            Run Replace vs Repair Analysis
          </button>
        </div>

        {result && (
          <div style={{ background: '#0F2240', borderRadius: 12, padding: 24, borderLeft: '4px solid #F5E642′ }}>
            <h3 style={{ color: '#F5E642', marginBottom: 16 }}>📊 DFW Replace vs Repair Decision</h3>
            <div style={{ marginBottom: 16, fontSize: 18, fontWeight: 800, color: '#FFFFFF' }}>{result.decision}</div>
            <div style={{ marginBottom: 12, padding: 12, background: '#0A1628', borderRadius: 8, color: '#C8D8E8', fontSize: 14 }}>📐 Rule: {result.ruleCalc}</div>
            <div style={{ marginBottom: 12, padding: 12, background: '#0A1628', borderRadius: 8, color: '#C8D8E8', fontSize: 14 }}>{result.timingAdvice}</div>
            <div style={{ marginTop: 8, color: '#8BA0B8', fontSize: 13 }}>{result.dfwCost}</div>
          </div>
        )}
      </div>
    </div>
  );
}
