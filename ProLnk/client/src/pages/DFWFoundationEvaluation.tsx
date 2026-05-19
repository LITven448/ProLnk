import { useState } from 'react';

const engineerChecks = [
  { item: 'Elevation survey', detail: 'Digital readings at 12–20 points across the slab to measure differential settlement (inches)' },
  { item: 'Crack mapping', detail: 'Documents crack width, direction, and pattern to determine if structural or cosmetic' },
  { item: 'Soil assessment', detail: 'Evaluates soil type and moisture conditions — critical in DFW expansive clay' },
  { item: 'Drainage review', detail: 'Grade, downspout discharge, and root proximity that influence future movement' },
  { item: 'Interior inspection', detail: 'Door sticking, floor slope, wall crack patterns — building movement signatures' },
  { item: 'Written PE report', detail: 'Stamped report with measured findings, diagnosis, and recommendation (if any)' },
];

const companyChecks = [
  { item: 'Sales presentation', detail: 'Typically free — they want to sell you piers; their inspection is not independent' },
  { item: 'Pier count estimate', detail: 'How many piers they recommend and at what price — not a diagnosis, a quote' },
  { item: 'No elevation data', detail: 'Most foundation companies do not take elevation readings — they eyeball and quote' },
];

const normalVsActive = [
  { label: 'Normal', sign: 'Hairline cracks (<1/16") in drywall near doors and windows — seasonal shrink/expand' },
  { label: 'Normal', sign: 'Slight door stick in summer (high humidity) that resolves in fall' },
  { label: 'Normal', sign: 'Diagonal crack at window corner (stair-step pattern, fine width)' },
  { label: 'Active', sign: 'Crack wider than 1/4" or crack that has grown since last observation' },
  { label: 'Active', sign: 'Doors or windows that will no longer close or latch regardless of season' },
  { label: 'Active', sign: 'Crack runs from foundation to roofline — story-height fracture' },
  { label: 'Active', sign: 'Separation between slab and wall (gap visible at floor level)' },
];

export default function DFWFoundationEvaluation() {
  const [symptoms, setSymptoms] = useState({ cracks: false, doors: false, slopes: false, gaps: false });
  const [showResult, setShowResult] = useState(false);

  const toggle = (key: keyof typeof symptoms) => setSymptoms(prev => ({ ...prev, [key]: !prev[key] }));

  const symptomCount = Object.values(symptoms).filter(Boolean).length;
  const evalType = symptomCount >= 3 ? 'Structural engineer (PE) — independent report required before any company quote' : symptomCount >= 1 ? 'Structural engineer recommended — do not start with foundation company' : 'Monitor symptoms for 1 season — photograph any cracks with a coin for scale reference';
  const urgency = symptomCount >= 3 ? '🔴 Urgent — active movement likely, get PE evaluation within 2 weeks' : symptomCount >= 1 ? '🟡 Recommended — PE evaluation before next major rain season' : '🟢 Routine — document current state, recheck in 6 months';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2 }}>DFW HOME GUIDE</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Foundation Evaluation Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.7 }}>
          DFW sits on expansive clay soil — foundations move every year. The critical question: is it normal seasonal movement or active structural failure? The type of evaluator you hire changes everything.
        </p>

        <div style={{ background: '#ef444415', border: '1px solid #ef444440', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ef4444', marginBottom: '0.75rem' }}>⚠️ Structural Engineer vs Foundation Company — Critical Difference</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>
            A structural engineer (PE) is an independent professional who provides a diagnosis. A foundation company provides a free inspection as part of a sales process. Always get the PE report first. Foundation companies have a financial incentive to recommend piers — engineers do not. A PE report costs $400–$800 and can save you from a $20,000 unnecessary repair.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ background: '#1e293b', borderRadius: 10, padding: '1rem' }}>
            <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.75rem', fontSize: '0.9rem' }}>🏛️ Structural Engineer Checks</div>
            {engineerChecks.map((c, i) => <div key={i} style={{ marginBottom: '0.6rem' }}><div style={{ fontWeight: 600, fontSize: '0.8rem', color: '#e2e8f0' }}>{c.item}</div><div style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.4 }}>{c.detail}</div></div>)}
          </div>
          <div style={{ background: '#1e293b', borderRadius: 10, padding: '1rem' }}>
            <div style={{ fontWeight: 700, color: '#94a3b8', marginBottom: '0.75rem', fontSize: '0.9rem' }}>🏢 Foundation Company "Inspection"</div>
            {companyChecks.map((c, i) => <div key={i} style={{ marginBottom: '0.6rem' }}><div style={{ fontWeight: 600, fontSize: '0.8rem', color: '#e2e8f0' }}>{c.item}</div><div style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.4 }}>{c.detail}</div></div>)}
            <div style={{ marginTop: '0.5rem', padding: '0.6rem', background: '#0A1628', borderRadius: 6, fontSize: '0.75rem', color: '#94a3b8' }}>Get PE report first. Then get 3 company bids if repair is warranted.</div>
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642' }}>📊 Normal Settlement vs Active Movement</h2>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {normalVsActive.map((item, i) => (
              <div key={i} style={{ background: '#1e293b', borderRadius: 8, padding: '0.75rem 1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ padding: '0.2rem 0.5rem', borderRadius: 4, fontSize: '0.75rem', fontWeight: 700, background: item.label === 'Normal' ? '#16a34a20' : '#ef444420', color: item.label === 'Normal' ? '#4ade80' : '#f87171', minWidth: 55, textAlign: 'center' }}>{item.label}</div>
                <div style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.4 }}>{item.sign}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642' }}>🧮 What Type of Evaluation Do You Need?</h2>
          <div style={{ marginBottom: '1rem' }}>
            {[['cracks', '🪟 Cracks at door/window corners or in drywall'], ['doors', '🚪 Doors or windows that stick or won\’t close properly'], ['slopes', '📐 Noticeable floor slope (marble rolls across room)'], ['gaps', '🔓 Gap between baseboard and floor or wall and ceiling']].map(([key, label]) => (
              <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '0.5rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={symptoms[key as keyof typeof symptoms]} onChange={() => toggle(key as keyof typeof symptoms)} style={{ width: 18, height: 18 }} />
                {label}
              </label>
            ))}
          </div>
          <button onClick={() => setShowResult(true)} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, border: 'none', borderRadius: 8, padding: '0.75rem 1.5rem', cursor: 'pointer', fontSize: '0.95rem' }}>Get My Evaluation Plan →</button>
          {showResult && (
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#0A1628', borderRadius: 8, borderLeft: '3px solid #F5E642' }}>
              <div style={{ marginBottom: '0.5rem' }}><strong>Urgency:</strong> {urgency}</div>
              <div style={{ marginBottom: '0.5rem' }}><strong>Recommended:</strong> {evalType}</div>
              <div><strong>DFW PE evaluation cost:</strong> $400–$800 — worth every dollar before committing to repair</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
