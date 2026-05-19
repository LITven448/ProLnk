import { useState } from 'react';

const barTypes: Record<string, { description: string; plumbing: string; permit: string; storage: string }> = {
  dry: {
    description: 'Dry bar with under-counter beverage fridge, wine storage, glassware display — no plumbing required',
    plumbing: 'No plumbing needed — just dedicated 20-amp circuit for refrigeration',
    permit: 'No permit required for dry bar in DFW — cosmetic renovation only',
    storage: 'DFW climate tip: wine stored above 72°F degrades fast — dedicated wine fridge required (not standard fridge)',
  },
  wet: {
    description: 'Full wet bar with sink, under-counter ice maker, dishwasher, and refrigeration — DFW entertainer standard',
    plumbing: 'Plumbing rough-in required: hot/cold supply + drain — $1,200–$2,800 in DFW depending on distance to main',
    permit: 'Building permit required in most DFW municipalities for plumbing work — timeline 2–4 weeks',
    storage: 'DFW climate: sealed wine cellar or temp-controlled cabinet required for serious collection (65°F ideal)',
  },
  outdoor: {
    description: 'Covered outdoor bar for DFW patio — summer entertaining staple, requires weatherproof materials',
    plumbing: 'Outdoor plumbing line extension: $1,500–$3,500 — DFW freeze protection (pipe insulation + shutoff) required',
    permit: 'DFW outdoor kitchen permits typically required — many HOAs also require architectural approval',
    storage: 'DFW outdoor storage: UV-resistant cabinet doors + lockable — summer heat requires shaded storage only',
  },
};

const entertainingRecs: Record<string, string> = {
  casual: 'Beverage fridge + small ice maker + 6-stool seating — functional and low-maintenance',
  entertainer: 'Full wet bar + kegerator + 8–12 seat bar counter — DFW game day and dinner party ready',
  collector: 'Temperature-controlled wine storage (200+ bottle) + tasting bar — DFW luxury resale driver',
};

const costMap: Record<string, Record<string, string>> = {
  small: { dry: '$4,000–$9,000', wet: '$9,000–$18,000', outdoor: '$12,000–$22,000' },
  medium: { dry: '$7,000–$14,000', wet: '$14,000–$28,000', outdoor: '$20,000–$38,000' },
  large: { dry: '$12,000–$22,000', wet: '$22,000–$45,000', outdoor: '$30,000–$60,000' },
};

export default function DFWBarGuide() {
  const [space, setSpace] = useState('');
  const [barType, setBarType] = useState('');
  const [entertaining, setEntertaining] = useState('');
  const [result, setResult] = useState<null | { description: string; plumbing: string; permit: string; storage: string; rec: string; cost: string }>(null);

  function calculate() {
    if (!space || !barType || !entertaining) return;
    const bar = barTypes[barType];
    const rec = entertainingRecs[entertaining];
    const cost = costMap[space][barType];
    setResult({ ...bar, rec, cost });
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#E8E8E8', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🍷</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>DFW Bar Room Guide</h1>
          <p style={{ color: '#9AA5B4', fontSize: 16 }}>DFW entertaining culture is serious — a great bar space is a resale and lifestyle investment.</p>
        </div>

        <div style={{ backgroundColor: '#111F35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16 }}>🌡️ DFW Climate Considerations for Bars</h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {['Wine stored above 68°F ages poorly — DFW summer attics reach 140°F, never store wine there','Outdoor bars need freeze protection for pipes — DFW gets 3–5 hard freezes per year','Kegerator needs insulated tap lines in DFW summer heat — foam lines prevent warm pours','DFW HOA rules often govern outdoor bar visibility — check CC&Rs before building'].map(tip => (
              <li key={tip} style={{ display: 'flex', gap: 10 }}>
                <span style={{ color: '#F5E642', flexShrink: 0 }}>✓</span>
                <span style={{ color: '#CBD5E0', fontSize: 14 }}>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ backgroundColor: '#111F35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 20 }}>🔧 Bar Configurator</h2>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#9AA5B4', marginBottom: 8, fontSize: 14 }}>Available Space</label>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {[['small','📦 Compact (under 80 sq ft)'],['medium','🏠 Medium (80–200 sq ft)'],['large','🏢 Large (200+ sq ft)']].map(([key, label]) => (
                <button key={key} onClick={() => setSpace(key)}
                  style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: space === key ? '#F5E642' : '#1E3A5F', backgroundColor: space === key ? '#F5E6421A' : 'transparent', color: space === key ? '#F5E642' : '#9AA5B4', cursor: 'pointer', fontSize: 13 }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#9AA5B4', marginBottom: 8, fontSize: 14 }}>Bar Type</label>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {[['dry','🍾 Dry Bar'],['wet','🚿 Full Wet Bar'],['outdoor','🌿 Outdoor Bar']].map(([key, label]) => (
                <button key={key} onClick={() => setBarType(key)}
                  style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: barType === key ? '#F5E642' : '#1E3A5F', backgroundColor: barType === key ? '#F5E6421A' : 'transparent', color: barType === key ? '#F5E642' : '#9AA5B4', cursor: 'pointer', fontSize: 13 }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#9AA5B4', marginBottom: 8, fontSize: 14 }}>Entertaining Style</label>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {[['casual','🎉 Casual / Family'],['entertainer','🏈 Serious Entertainer'],['collector','🍷 Wine / Spirits Collector']].map(([key, label]) => (
                <button key={key} onClick={() => setEntertaining(key)}
                  style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: entertaining === key ? '#F5E642' : '#1E3A5F', backgroundColor: entertaining === key ? '#F5E6421A' : 'transparent', color: entertaining === key ? '#F5E642' : '#9AA5B4', cursor: 'pointer', fontSize: 13 }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <button onClick={calculate}
            style={{ width: '100%', padding: '14px', backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 16, borderRadius: 8, border: 'none', cursor: 'pointer' }}>
            Design My DFW Bar →
          </button>
        </div>

        {result && (
          <div style={{ backgroundColor: '#1E3A5F', borderRadius: 12, padding: 24, border: '2px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', marginBottom: 16 }}>🍷 Your DFW Bar Plan</h3>
            {[['🏗️ Bar Configuration', result.description],['🔧 Configuration Recommendation', result.rec],['🚿 Plumbing Requirements', result.plumbing],['📋 Permit Requirements', result.permit],['🌡️ DFW Storage Solution', result.storage],['💵 Estimated DFW Cost', result.cost]].map(([label, value]) => (
              <div key={label as string} style={{ marginBottom: 14 }}>
                <div style={{ color: '#9AA5B4', fontSize: 12, marginBottom: 4 }}>{label}</div>
                <div style={{ color: '#E8E8E8', fontSize: 14, lineHeight: 1.5 }}>{value as string}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
