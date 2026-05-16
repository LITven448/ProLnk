import { useState } from 'react';

const areas = [
  {
    id: 'dallas-core',
    label: 'Dallas Core',
    coverage: 'Full coverage active',
    partners: 38,
    trades: ['HVAC', 'Plumbing', 'Electrical', 'Roofing'],
    expect: 'Fastest match times in the network — typically under 4 hours. Charter Pro density is highest here. Homeowners matched to 3+ verified pros per request.',
  },
  {
    id: 'fort-worth',
    label: 'Fort Worth',
    coverage: 'Coverage expanding',
    partners: 24,
    trades: ['HVAC', 'Plumbing', 'Electrical'],
    expect: 'Strong core coverage, outer zip codes still growing. Average match time 6-8 hours. 2 qualified pros per request minimum guaranteed.',
  },
  {
    id: 'frisco-mckinney',
    label: 'Frisco / McKinney',
    coverage: 'High growth zone',
    partners: 19,
    trades: ['HVAC', 'Roofing', 'General'],
    expect: 'Fastest growing area in our network. New charter pros onboarding weekly. Match quality improving month over month. Priority queue for homeowners who joined waitlist pre-launch.',
  },
  {
    id: 'arlington-mansfield',
    label: 'Arlington / Mansfield',
    coverage: 'Solid mid-tier coverage',
    partners: 17,
    trades: ['HVAC', 'Plumbing', 'Electrical', 'Foundation'],
    expect: 'Reliable matching in all major trades. Foundation and drainage specialists available — unique to this zone. Expect 6-10 hour match times outside peak periods.',
  },
  {
    id: 'plano-allen',
    label: 'Plano / Allen',
    coverage: 'Full coverage active',
    partners: 22,
    trades: ['HVAC', 'Plumbing', 'Electrical', 'Roofing'],
    expect: 'High-income homeowner zone with strong pro density. Average job value higher here — pros actively prioritize. Match times under 5 hours typical.',
  },
  {
    id: 'denton-lewisville',
    label: 'Denton / Lewisville',
    coverage: 'Partial — growing',
    partners: 11,
    trades: ['HVAC', 'Plumbing'],
    expect: 'HVAC and plumbing coverage available now. Electrical and roofing being added through Q3 2026. Homeowners get early-adopter status — first matched when new pros join your zip.',
  },
];

export default function DFWProLnkDFWNetwork2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = areas.find(a => a.id === selected);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
          PROLNK DFW — 2026 NETWORK UPDATE
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>
          DFW Network State: 2026
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 12, lineHeight: 1.6 }}>
          Charter waitlist: <span style={{ color: '#F5E642', fontWeight: 700 }}>347 / 500 spots filled</span>. Network growing fast across all DFW zones.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
          {[{ label: 'Charter Pros', val: '131' }, { label: 'DFW Areas', val: '6' }, { label: 'Trades Active', val: '7' }].map(s => (
            <div key={s.label} style={{ background: '#0F2040', border: '1px solid #1E3A5F', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ color: '#F5E642', fontSize: 28, fontWeight: 800 }}>{s.val}</div>
              <div style={{ color: '#64748B', fontSize: 13 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 16 }}>Select your DFW area for network coverage details:</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10, marginBottom: 32 }}>
          {areas.map(a => (
            <button
              key={a.id}
              onClick={() => setSelected(selected === a.id ? null : a.id)}
              style={{
                background: selected === a.id ? '#F5E642' : '#0F2040',
                color: selected === a.id ? '#0A1628' : '#fff',
                border: '1px solid',
                borderColor: selected === a.id ? '#F5E642' : '#1E3A5F',
                borderRadius: 10,
                padding: '12px 14px',
                textAlign: 'left',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 13,
              }}
            >
              📍 {a.label}
              <div style={{ fontWeight: 400, fontSize: 11, marginTop: 4, opacity: 0.8 }}>{a.coverage}</div>
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#0F2040', border: '1px solid #1E3A5F', borderRadius: 14, padding: 28, marginBottom: 24 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>{active.label}</h2>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 16 }}>{active.partners} Charter Partners Active</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
              {active.trades.map(t => (
                <span key={t} style={{ background: '#1E3A5F', borderRadius: 6, padding: '4px 10px', fontSize: 12, fontWeight: 600 }}>{t}</span>
              ))}
            </div>
            <p style={{ color: '#CBD5E1', lineHeight: 1.7, fontSize: 15 }}>{active.expect}</p>
          </div>
        )}
      </div>
    </div>
  );
}
