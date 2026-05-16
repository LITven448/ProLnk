import { useState } from 'react';

const timelines = [
  { id: '30days', label: 'Must sell within 30 days' },
  { id: '90days', label: '60-90 day window' },
  { id: 'flexible', label: 'Flexible (6+ months)' },
  { id: 'rent', label: 'Considering renting instead' },
];

const guides: Record<string, { steps: string[]; tip: string }> = {
  30days: {
    steps: [
      '🚨 Price aggressively: 3-5% below market to attract immediate offers',
      '🔧 ProLnk priority repairs only — cosmetic issues buyers overlook at right price',
      '🏦 Ask employer about relocation bridge loan to cover mortgage gap',
      '📋 Seller leaseback: close fast, stay 30-60 days while settling new city',
      '💰 Capital gains exclusion still valid if lived in 2 of last 5 years',
    ],
    tip: 'An iBuyer offer (Opendoor, Offerpad) in DFW closes in 14-30 days — tradeoff is 4-8% discount.',
  },
  90days: {
    steps: [
      '📅 List 60-70 days before must-close date to allow 30-day escrow',
      '🔧 ProLnk handles pre-listing repairs in 2-3 weeks — don't delay',
      '💰 Standard sale likely nets more than iBuyer in 90-day window',
      '📋 Review relocation package: many cover closing costs, commission, temp housing',
      '🏦 Bridge loan covers new home down payment if DFW home hasn't closed yet',
    ],
    tip: 'DFW average days-on-market 2026: 32 days — 90-day window is very workable.',
  },
  flexible: {
    steps: [
      '📈 List at peak spring season (March-May) for max DFW buyer traffic',
      '🔧 Full repair and staging investment pays back in DFW's competitive market',
      '💰 Negotiate relocation package to include duplicate housing allowance',
      '📋 Consider 1031 exchange if buying investment property in new city',
      '🏦 Rate lock your new mortgage before selling DFW home',
    ],
    tip: 'With 6+ months, full market prep consistently outperforms fast-sale options by 8-15%.',
  },
  rent: {
    steps: [
      '💰 DFW rent-vs-sell: positive cash flow in most DFW submarkets in 2026',
      '🔧 ProLnk brings property to rental-ready condition fast',
      '📋 Property management cost: 8-10% of rent in DFW',
      '⚠️ You must re-establish primary residence exclusion if you sell later',
      '🏦 Distance management is feasible with good PM company — evaluate honestly',
    ],
    tip: 'Keep the DFW home if you plan to return within 3 years and cash flow is positive.',
  },
};

export default function DFWJobRelocationHomeGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>✈️</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, marginBottom: 8 }}>DFW Job Relocation Home Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>
          Selling your DFW home for a job relocation — timeline pressure, relocation packages, and bridge loan options.
        </p>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📌 DFW Relocation Market Facts</h2>
          <ul style={{ color: '#cbd5e1', lineHeight: 1.9, paddingLeft: 20 }}>
            <li>DFW average days on market 2026: ~32 days</li>
            <li>Relocation packages typically cover: closing costs, commission, 60-day temp housing</li>
            <li>Bridge loans: 6-12 month terms, ~1-2% above prime rate in DFW</li>
            <li>Leaseback agreements: common in DFW — buyer waits 30-60 days for possession</li>
          </ul>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>⏱️ Select Your Timeline</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {timelines.map(t => (
            <button key={t.id} onClick={() => setSelected(t.id)} style={{
              background: selected === t.id ? '#F5E642' : '#1e3a5f',
              color: selected === t.id ? '#0A1628' : '#fff',
              border: 'none', borderRadius: 10, padding: '14px 16px',
              cursor: 'pointer', fontWeight: 600, fontSize: 14, textAlign: 'left'
            }}>{t.label}</button>
          ))}
        </div>

        {selected && guides[selected] && (
          <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: '#F5E642', marginBottom: 16 }}>📋 Action Guide</h3>
            <ul style={{ color: '#cbd5e1', lineHeight: 2, paddingLeft: 20 }}>
              {guides[selected].steps.map((step, i) => <li key={i}>{step}</li>)}
            </ul>
            <div style={{ marginTop: 20, background: '#162944', borderRadius: 8, padding: 14 }}>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>💡 DFW Tip: </span>
              <span style={{ color: '#94a3b8' }}>{guides[selected].tip}</span>
            </div>
          </div>
        )}

        <div style={{ marginTop: 32, background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#0A1628', fontWeight: 700, marginBottom: 8 }}>Need fast repairs before relocating from DFW?</p>
          <p style={{ color: '#1e3a5f', fontSize: 14 }}>ProLnk gets you vetted contractor quotes in 24 hours — no time wasted.</p>
        </div>
      </div>
    </div>
  );
}
