import { useState } from 'react';

const ages = [
  { id: 'pre1980', label: '🏚️ Pre-1980 (High Leak Potential)', score: 'High', savings: '20–30%', issues: 'Knob-and-tube wiring penetrations, no house wrap, minimal attic insulation, large gaps at top plates', cost: '$2,000–$6,000 air sealing' },
  { id: '1980s', label: '🏠 1980–2000 (Moderate Leakage)', score: 'Moderate', savings: '15–20%', issues: 'Recessed lights, attic hatch, fireplace dampers, band joists — common culprits for this era', cost: '$1,500–$3,500 air sealing' },
  { id: '2000s', label: '🏡 2001–2015 (Lower Leakage)', score: 'Low-Moderate', savings: '10–15%', issues: 'Electrical outlets, plumbing penetrations, recessed lights — newer homes still have 20–30% of gains', cost: '$800–$2,000 air sealing' },
  { id: 'new', label: '🆕 2016+ (Newer Code)', score: 'Low', savings: '5–10%', issues: 'Minor penetrations from trades — still worth a blower door test to find and fix builder misses', cost: '$400–$1,200 air sealing' },
];

export default function DFWBlowerDoorTestGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const match = ages.find(a => a.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🔍</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Blower Door Test Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Air sealing your DFW home saves 15–20% on electric bills. A blower door test finds every leak.</p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, margin: '0 0 12px' }}>📊 Test Basics</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'Test Cost', value: '$300–$500′ },
              { label: 'Who Performs', value: 'RESNET Rater' },
              { label: 'Typical DFW ACH50', value: '5–12 ACH50′ },
              { label: 'Target ACH50', value: '< 3 ACH50′ },
            ].map(item => (
              <div key={item.label} style={{ background: '#1a2f4a', borderRadius: 8, padding: '10px 14px' }}>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>{item.label}</div>
                <div style={{ color: '#F5E642', fontSize: 18, fontWeight: 700 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, margin: '0 0 12px' }}>🏠 Select Your Home Age</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {ages.map(a => (
              <button key={a.id} onClick={() => setSelected(a.id === selected ? null : a.id)}
                style={{ background: selected === a.id ? '#F5E642′ : '#1a2f4a', color: selected === a.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '12px 16px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                {a.label}
              </button>
            ))}
          </div>
          {match && (
            <div style={{ marginTop: 16, background: '#1a2f4a', borderRadius: 10, padding: 16, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>Air Sealing Opportunity: {match.score} | Potential Savings: {match.savings}</div>
              <div style={{ color: '#e2e8f0', fontSize: 14, marginBottom: 8 }}>{match.issues}</div>
              <div style={{ color: '#F5E642', fontSize: 13 }}>💰 Air Sealing Cost: {match.cost}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, margin: '0 0 12px' }}>📍 Top DFW Air Leak Locations</h2>
          {[
            { spot: 'Attic Hatch', icon: '🚪', desc: 'Often unsealed — loses conditioned air equivalent to leaving a window open all summer.' },
            { spot: 'Recessed Lights', icon: '💡', desc: 'Older IC-rated fixtures have large gaps. Seal with airtight covers from the attic.' },
            { spot: 'HVAC Penetrations', icon: '🔧', desc: 'Ducts passing through attic floor — foam and mastic these gaps for big gains.' },
            { spot: 'Electrical Outlets', icon: '🔌', desc: 'Exterior walls — foam gaskets behind cover plates, $2 each, big cumulative impact.' },
          ].map(s => (
            <div key={s.spot} style={{ background: '#1a2f4a', borderRadius: 8, padding: '10px 14px', marginBottom: 10, display: 'flex', gap: 12 }}>
              <div style={{ fontSize: 22 }}>{s.icon}</div>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700 }}>{s.spot}</div>
                <div style={{ color: '#e2e8f0', fontSize: 13, marginTop: 2 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
