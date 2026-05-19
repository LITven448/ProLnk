import { useState } from 'react';

export default function DFWFoundationCharterProAdvantage2026() {
  const [situation, setSituation] = useState('');
  const [result, setResult] = useState('');

  const situations = [
    { id: 'solo', label: '🔨 Solo Foundation Contractor' },
    { id: 'crew', label: '👷 Have a Crew (3-10 people)' },
    { id: 'company', label: '🏢 Established Foundation Company' },
    { id: 'new', label: '🆕 New to Foundation Work' },
  ];

  const results: Record<string, string> = {
    solo: 'Charter priority matching puts you first for the $8K-$18K pier-and-beam jobs. 12% on $12K avg = $1,440/job. Lock $149/mo before the waitlist closes at 500.',
    crew: 'Your crew multiplies Charter value. Each foundation tech you recruit earns 7% network override. 5 crew members on ProLnk × $12K avg job = $4,200/mo network income.',
    company: 'Charter gives your company permanent first-mover advantage in DFW’s $1.1B/yr foundation market. Priority queue + 12% commission + subscription overrides compound daily.',
    new: 'Start Charter now while the rate is locked at $149/mo. DFW foundation market is massive — expansive clay soil means every neighborhood is a potential customer. Build your pipeline early.',
  };

  function calculate() {
    if (situation) setResult(results[situation]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>PROLNK CHARTER — DFW FOUNDATION</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Charter Foundation Pro Advantage Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>DFW foundation repair is a $1.1B/yr market. Charter pros get there first.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 24, borderLeft: '4px solid #F5E642′ }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>🏗️ Why DFW Foundation Market is Unique</div>
          <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>
            Dallas-Fort Worth sits on expansive clay soil (Blackland Prairie). Soil shrinks in drought, swells in rain — creating constant foundation movement across all 7M+ residents. Every neighborhood is a repeat customer market.
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '⚡', label: 'Priority Match Queue', desc: 'Charter pros matched first for every foundation inquiry in your service area' },
            { icon: '🔒', label: '$149/mo Locked', desc: 'Avg foundation job = $12,000. Your 12% commission = $1,440 per closed job' },
            { icon: '💰', label: '12% Commission Rate', desc: 'vs 7% at Founding tier — $3,000 more per year on just 10 jobs' },
            { icon: '🌐', label: 'Network Override', desc: 'Recruit other foundation pros — earn 7% on their job commissions forever' },
          ].map(c => (
            <div key={c.label} style={{ background: '#112240', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4, color: '#F5E642′ }}>{c.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🔨 Your Charter Advantage</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16, fontSize: 14 }}>Select your situation:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => { setSituation(s.id); setResult(''); }}
                style={{ background: situation === s.id ? '#F5E642′ : '#1e3a5f', color: situation === s.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', textAlign: 'left', fontWeight: 600 }}>
                {s.label}
              </button>
            ))}
          </div>
          <button onClick={calculate} disabled={!situation}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 800, cursor: situation ? 'pointer' : 'not-allowed', opacity: situation ? 1 : 0.5 }}>
            Show My Charter Advantage →
          </button>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 18, borderLeft: '4px solid #F5E642′ }}>
              <p style={{ color: '#fff', lineHeight: 1.6 }}>{result}</p>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 4 }}>🚨 Charter Closes at 500 Applications</div>
          <div style={{ fontSize: 14 }}>DFW foundation pros — first movers capture the compounding advantage.</div>
        </div>
      </div>
    </div>
  );
}
