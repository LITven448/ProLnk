import { useState } from 'react';

const flueTypes = [
  {
    label: 'B-vent (metal double-wall)',
    efficiencies: [
      { range: '80% AFUE', compatible: true, note: 'B-vent is designed for 80% furnaces — direct reuse possible if liner is intact', cost: '$0–$300 inspection' },
      { range: '90%+ AFUE', compatible: false, note: 'Cannot reuse B-vent. High-efficiency condensing furnaces need PVC or CPVC two-pipe system', cost: '$600–$1,800 for PVC install' },
    ],
  },
  {
    label: 'Single-wall metal flue',
    efficiencies: [
      { range: '80% AFUE', compatible: false, note: 'Single-wall not allowed indoors per DFW code. Upgrade to B-vent required', cost: '$400–$900′ },
      { range: '90%+ AFUE', compatible: false, note: 'Replace entirely with two-pipe PVC venting', cost: '$700–$2,000′ },
    ],
  },
  {
    label: 'Masonry chimney flue',
    efficiencies: [
      { range: '80% AFUE', compatible: true, note: 'Can re-line with flexible aluminum liner — required in DFW for modern 80% units', cost: '$500–$1,200 for liner' },
      { range: '90%+ AFUE', compatible: false, note: 'Do not use chimney for condensing furnace — condensate damages masonry. Run PVC through wall or roof', cost: '$800–$2,200′ },
    ],
  },
  {
    label: 'PVC two-pipe (existing)',
    efficiencies: [
      { range: '80% AFUE', compatible: false, note: 'PVC was installed for a 90%+ furnace — replacing with 80% means flue rework', cost: '$400–$800′ },
      { range: '90%+ AFUE', compatible: true, note: 'Reuse existing PVC if diameter and termination meet new equipment specs', cost: '$0–$200 inspection' },
    ],
  },
];

export default function DFWHVACFlueAndVentGuide() {
  const [flueIdx, setFlueIdx] = useState<number | null>(null);
  const [effIdx, setEffIdx] = useState<number | null>(null);

  const result = flueIdx !== null && effIdx !== null ? flueTypes[flueIdx].efficiencies[effIdx] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ marginBottom: 12 }}>
          <span style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW HVAC Guide</span>
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#FFFFFF', marginBottom: 12, lineHeight: 1.2 }}>
          🏭 Furnace Flue & Venting Guide for DFW
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 40, lineHeight: 1.7 }}>
          When DFW homeowners upgrade from an 80% to 90%+ efficiency furnace, the flue system usually can't be reused. This is one of the most commonly missed costs in an HVAC replacement quote.
        </p>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: '16px 24px', marginBottom: 32 }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 15, marginBottom: 4 }}>🌡️ DFW Efficiency Requirement</div>
          <div style={{ color: '#0A1628', fontSize: 14 }}>Texas requires a minimum 80% AFUE furnace. High-efficiency 96%+ AFUE units are common in DFW for gas savings — but always require a two-pipe PVC venting system, regardless of what's existing.</div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 20 }}>🎯 Compatibility Checker</h2>

          <div style={{ marginBottom: 20 }}>
            <div style={{ color: '#FFFFFF', fontWeight: 700, marginBottom: 10 }}>Step 1: What flue type is in your DFW home now?</div>
            <div style={{ display: 'grid', gap: 8 }}>
              {flueTypes.map((f, i) => (
                <button
                  key={i}
                  onClick={() => { setFlueIdx(i); setEffIdx(null); }}
                  style={{
                    background: flueIdx === i ? '#1A3A6B' : '#0A1628',
                    border: '2px solid ' + (flueIdx === i ? '#F5E642′ : '#1E3A5F'),
                    borderRadius: 8,
                    padding: '12px 16px',
                    color: '#E8EDF5',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: 14,
                    fontWeight: flueIdx === i ? 700 : 400,
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {flueIdx !== null && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ color: '#FFFFFF', fontWeight: 700, marginBottom: 10 }}>Step 2: New furnace efficiency tier?</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {flueTypes[flueIdx].efficiencies.map((e, i) => (
                  <button
                    key={i}
                    onClick={() => setEffIdx(i)}
                    style={{
                      background: effIdx === i ? '#1A3A6B' : '#0A1628',
                      border: '2px solid ' + (effIdx === i ? '#F5E642′ : '#1E3A5F'),
                      borderRadius: 8,
                      padding: '12px 16px',
                      color: '#E8EDF5',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: 14,
                      fontWeight: effIdx === i ? 700 : 400,
                    }}
                  >
                    {e.range}
                  </button>
                ))}
              </div>
            </div>
          )}

          {result && (
            <div style={{ background: result.compatible ? '#0A2E1A' : '#7F1D1D', borderRadius: 12, padding: '20px 24px' }}>
              <div style={{ color: result.compatible ? '#86EFAC' : '#FCA5A5', fontWeight: 800, fontSize: 16, marginBottom: 8 }}>
                {result.compatible ? '✅ Compatible — with conditions' : '❌ Not compatible — venting upgrade required'}
              </div>
              <div style={{ color: result.compatible ? '#86EFAC' : '#FCA5A5', fontSize: 14, marginBottom: 8 }}>{result.note}</div>
              <div style={{ color: '#F5E642', fontSize: 14 }}>Estimated cost: {result.cost}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 16, padding: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🏭</div>
          <h3 style={{ color: '#0A1628', fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Get a Venting Assessment with Your Quote</h3>
          <p style={{ color: '#0A1628', fontSize: 15, marginBottom: 0 }}>DFW HVAC contractors on ProLnk inspect your existing flue and include accurate venting costs in every quote — no surprises.</p>
        </div>
      </div>
    </div>
  );
}
