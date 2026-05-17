import { useState } from 'react';

const ages = [
  { id: 'new-0-10', label: 'Foundation 0-10 years old', risk: 'low', guide: 'Carbonation depth typically 1-3mm. Rebar protection intact. Maintain crack sealing to prevent CO2 ingress. No intervention needed.' },
  { id: 'mid-10-30', label: 'Foundation 10-30 years old', risk: 'moderate', guide: 'Carbonation may reach 5-15mm in DFW conditions. Inspect surface cracks annually — seal any crack wider than 0.3mm to slow carbonation front.' },
  { id: 'older-30-50', label: 'Foundation 30-50 years old', risk: 'elevated', guide: 'Carbonation front may be approaching rebar cover depth. Extract core samples if active cracking observed. Carbonation-resistant sealers can slow progression.' },
  { id: 'historic-50plus', label: 'Foundation 50+ years old', risk: 'high', guide: 'High probability carbonation has reached rebar in DFW climate. Watch for rust staining at cracks (rebar corrosion). Structural engineer assessment recommended.' },
  { id: 'cracked-any', label: 'Any age with surface cracks', risk: 'elevated', guide: 'Cracks accelerate carbonation — CO2 penetrates along crack planes. Seal cracks immediately. DFW rain carries carbonic acid that deepens crack-related carbonation.' },
];

const riskColor = { low: '#22c55e', moderate: '#f59e0b', elevated: '#ef4444', high: '#dc2626' };

export default function DFWFoundationConcreteCarbon2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = ages.find(a => a.id === selected);

  const facts = [
    { icon: '🧪', title: 'What is Carbonation', body: 'CO2 reacts with calcium hydroxide in concrete, forming calcium carbonate. This lowers concrete pH from ~12.5 to ~8, removing rebar\'s chemical corrosion protection.' },
    { icon: '🌧️', title: 'DFW Accelerants', body: 'DFW humidity and rainfall carry dissolved CO2 (carbonic acid). High moisture cycles in DFW clay soils increase carbonation rate vs dry climates.' },
    { icon: '📏', title: 'Carbonation Depth', body: 'Advances ~1mm/year in exposed concrete. DFW\'s wet-dry cycles can push 1.5-2mm/year on uncoated or cracked surfaces.' },
    { icon: '⚠️', title: 'When It Matters', body: 'Problem begins when carbonation front reaches rebar (typically 20-40mm cover). Rebar then corrodes, expanding and cracking the concrete above it.' },
    { icon: '🏠', title: 'DFW Older Homes', body: 'Pre-1980 DFW foundations used lower concrete cover specs. 50+ year foundations in Oak Cliff, East Dallas, and older suburbs are most at risk.' },
    { icon: '🛡️', title: 'Prevention', body: 'Silane/siloxane penetrating sealers slow carbonation. Crack sealing is highest priority — cracks allow deep CO2 penetration in DFW weather cycles.' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', padding: '6px 14px', borderRadius: 4, display: 'inline-block', fontSize: 12, fontWeight: 700, marginBottom: 12 }}>
          DFW FOUNDATION 2026
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Concrete Carbonation & Foundation Guide — Dallas-Fort Worth</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, lineHeight: 1.6 }}>
          How concrete ages in DFW: carbonation chemistry, rebar protection loss, DFW climate acceleration factors, and age-based risk assessment.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12, marginBottom: 28 }}>
          {facts.map(f => (
            <div key={f.title} style={{ background: '#1e2d45', borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4, color: '#F5E642' }}>{f.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>{f.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 10, padding: 24, marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🔍 Foundation Age → Carbonation Risk Guide</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {ages.map(a => (
              <button key={a.id} onClick={() => setSelected(a.id)}
                style={{ background: selected === a.id ? '#F5E642' : '#0A1628', color: selected === a.id ? '#0A1628' : '#fff', border: '1px solid #2d3f5a', borderRadius: 8, padding: '12px 16px', textAlign: 'left', cursor: 'pointer', fontWeight: 600 }}>
                {a.label}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ marginTop: 16, background: '#0d1f2e', border: `1px solid ${riskColor[result.risk as keyof typeof riskColor]}`, borderRadius: 8, padding: 16 }}>
              <div style={{ fontWeight: 700, color: riskColor[result.risk as keyof typeof riskColor], marginBottom: 6, textTransform: 'uppercase', fontSize: 12 }}>
                {result.risk} risk
              </div>
              <div style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.6 }}>{result.guide}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 8, padding: 16, fontSize: 13, color: '#94a3b8' }}>
          <strong style={{ color: '#F5E642' }}>ProLnk Tip:</strong> DFW has thousands of 40-60 year old slab foundations. Carbonation-related rebar corrosion is an underdiagnosed cause of foundation cracking. Foundation pros who mention carbonation testing stand out from competition.
        </div>
      </div>
    </div>
  );
}