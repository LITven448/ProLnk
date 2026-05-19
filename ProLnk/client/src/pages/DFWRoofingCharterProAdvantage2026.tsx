import { useState } from 'react';

export default function DFWRoofingCharterProAdvantage2026() {
  const [situation, setSituation] = useState('');
  const [result, setResult] = useState('');

  const situations = [
    { id: 'storm', label: '⛈️ Storm Chaser / Insurance Roofing' },
    { id: 'retail', label: '🏠 Retail Residential Roofer' },
    { id: 'commercial', label: '🏢 Commercial Roofing' },
    { id: 'new', label: '🆕 New Roofing Business' },
  ];

  const results: Record<string, string> = {
    storm: 'Hail season (April-June) drives DFW roofing demand 400%. Charter pros get first match on every storm-area homeowner. 12% on $15K insurance job = $1,800. No $50-75/lead fees like Angi.',
    retail: 'Retail roofing in DFW is relationship-driven. Charter priority matching + no per-lead fees means higher margin on every job. 12% commission + network overrides from crews you recruit.',
    commercial: 'Commercial roofing avg $80K-$200K. Charter priority for commercial inquiries + 12% = $9,600-$24,000 per job commission. Build your network of commercial crews for passive override income.',
    new: 'Lock $149/mo Charter rate before it closes. DFW roofing market is $1.0B/yr and hail season creates predictable demand spikes. Priority matching gives new businesses equal footing with established shops.',
  };

  function calculate() {
    if (situation) setResult(results[situation]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>PROLNK CHARTER — DFW ROOFING</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Charter Roofing Pro Advantage Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>DFW roofing market is $1.0B/yr. Hail season. Charter pros get there first — no per-lead fees.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 24, borderLeft: '4px solid #F5E642' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>⛈️ DFW Hail Season = Predictable Demand</div>
          <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>
            April through June, DFW averages 8-12 significant hail events. Each event generates 500-2,000 homeowner insurance claims. Angi and HomeAdvisor charge $50-75/lead during this period. ProLnk Charter pros pay zero per-lead fees.
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '⚡', label: 'Priority Match Queue', desc: 'First contact on every roofing inquiry — hail events go to Charter pros first' },
            { icon: '🚫', label: 'No Per-Lead Fees', desc: 'vs Angi $50-75/lead — Charter pros keep every dollar of margin' },
            { icon: '💰', label: '12% Commission', desc: 'Avg DFW roofing job $15K × 12% = $1,800 per closed job' },
            { icon: '🌐', label: 'Network Override', desc: 'Recruit roofing crews — earn 7% on their commissions forever' },
          ].map(c => (
            <div key={c.label} style={{ background: '#112240', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4, color: '#F5E642' }}>{c.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🏠 Your Charter Roofing Advantage</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16, fontSize: 14 }}>Select your roofing situation:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => { setSituation(s.id); setResult(''); }}
                style={{ background: situation === s.id ? '#F5E642' : '#1e3a5f', color: situation === s.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', textAlign: 'left', fontWeight: 600 }}>
                {s.label}
              </button>
            ))}
          </div>
          <button onClick={calculate} disabled={!situation}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 800, cursor: situation ? 'pointer' : 'not-allowed', opacity: situation ? 1 : 0.5 }}>
            Show My Charter Advantage →
          </button>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 18, borderLeft: '4px solid #F5E642' }}>
              <p style={{ color: '#fff', lineHeight: 1.6 }}>{result}</p>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 4 }}>🚨 Charter Closes at 500 Applications</div>
          <div style={{ fontSize: 14 }}>DFW roofers — hail season demand is predictable. Your Charter position should be too.</div>
        </div>
      </div>
    </div>
  );
}
