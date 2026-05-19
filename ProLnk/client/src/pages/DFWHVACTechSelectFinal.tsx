import { useState } from 'react';

const checklistItems = [
  { icon: '📋', label: 'NATE Certification', desc: 'Verify NATE-certified technician — gold standard in DFW HVAC.' },
  { icon: '🪪', label: 'Texas HVAC License', desc: 'All DFW HVAC techs must hold a valid TDLR license. Ask for license number.' },
  { icon: '🛡️', label: 'Liability Insurance', desc: 'Minimum $1M general liability. Protects your DFW home during work.' },
  { icon: '⭐', label: 'Local DFW Reviews', desc: 'Check Google, BBB, Yelp — look for DFW-specific summer heat reviews.' },
  { icon: '📞', label: 'Written Quotes', desc: 'Require itemized written quotes — never verbal only in DFW market.' },
  { icon: '🔧', label: 'Manufacturer Training', desc: 'Trane, Carrier, Lennox — DFW techs should be factory-trained on major brands.' },
];

const situations = [
  { label: 'System replacement — budget unknown', strategy: 'Get 3 competing quotes via ProLnk', advantage: 'ProLnk pre-vets all DFW techs on license, insurance, and reviews before matching.' },
  { label: 'Emergency repair — AC out in July', strategy: 'Use ProLnk urgent match for same-day DFW techs', advantage: 'ProLnk priority routing flags urgent DFW requests to available same-day techs.' },
  { label: 'Annual maintenance tune-up', strategy: 'Schedule preferred tech via ProLnk, lock in rate', advantage: 'ProLnk recurring match keeps your preferred DFW tech year over year.' },
  { label: 'New construction HVAC install', strategy: 'Get design-build proposals from 2–3 DFW contractors', advantage: 'ProLnk sources DFW contractors with new construction HVAC experience.' },
  { label: 'Second opinion on a quote', strategy: 'Request ProLnk blind second quote', advantage: 'ProLnk routes to a different DFW tech to validate pricing and diagnosis.' },
];

export default function DFWHVACTechSelectFinal() {
  const [situation, setSituation] = useState('');
  const [result, setResult] = useState<{ strategy: string; advantage: string } | null>(null);

  function evaluate() {
    const matched = situations.find(s => s.label === situation);
    if (matched) setResult({ strategy: matched.strategy, advantage: matched.advantage });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🔍 HVAC Tech Selection Final Guide — DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 40 }}>How to find and select a DFW HVAC technician — what to verify, what good service looks like, and how ProLnk makes it easier.</p>

        <h2 style={{ color: '#F5E642', marginBottom: 16 }}>✅ DFW Tech Verification Checklist</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 48 }}>
          {checklistItems.map(item => (
            <div key={item.label} style={{ background: '#0f2035', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>{item.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2035', borderRadius: 16, padding: 32, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', marginBottom: 24 }}>🏡 Your DFW Tech Selection Strategy</h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#94a3b8', fontSize: 14, display: 'block', marginBottom: 8 }}>Your DFW situation</label>
            <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 15 }}>
              <option value=''>Select situation…</option>
              {situations.map(s => <option key={s.label}>{s.label}</option>)}
            </select>
          </div>
          <button onClick={evaluate} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '14px 32px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 16 }}>Get Strategy →</button>
          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 12, padding: 20, border: '1px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🎯 {result.strategy}</div>
              <div style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 8 }}>ProLnk advantage: {result.advantage}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
