import { useState } from 'react';

const certifications = [
  { name: 'EPA 608', required: true, cost: 20, time: '1-2 weeks', incomeBoost: 0, description: 'Required by federal law for refrigerant handling. No exceptions.' },
  { name: 'NATE Core', required: false, cost: 250, time: '2-3 months', incomeBoost: 8, description: 'North American Technician Excellence. Industry gold standard.' },
  { name: 'NATE Specialty', required: false, cost: 200, time: '1-2 months', incomeBoost: 7, description: 'Air-to-air heat pump, commercial refrigeration, and more.' },
  { name: 'TDLR HVAC License', required: true, cost: 150, time: '3-6 months', incomeBoost: 0, description: 'Texas Department of Licensing and Regulation. Required to work commercially.' },
  { name: 'ACCA Quality Assured', required: false, cost: 400, time: '3-4 months', incomeBoost: 10, description: 'Air Conditioning Contractors of America premium credential.' },
];

const incomeLevels = [
  { label: 'Uncertified Apprentice', low: 32000, high: 42000 },
  { label: 'EPA 608 + TDLR', low: 45000, high: 58000 },
  { label: 'NATE Certified Technician', low: 58000, high: 78000 },
  { label: 'NATE + Specialty', low: 72000, high: 95000 },
  { label: 'Master HVAC (All Certs)', low: 90000, high: 130000 },
];

export default function DFWHVACCertificationGuide() {
  const [years, setYears] = useState('');
  const [hasCerts, setHasCerts] = useState<string[]>([]);
  const [roadmap, setRoadmap] = useState<null | { next: string[]; incomeBoost: number; totalCost: number; timeline: string }>(null);

  function toggleCert(name: string) {
    setHasCerts(prev => prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]);
  }

  function generateRoadmap() {
    const missing = certifications.filter(c => !hasCerts.includes(c.name));
    const required = missing.filter(c => c.required);
    const optional = missing.filter(c => !c.required);
    const next = [...required.map(c => c.name), ...optional.slice(0, 2).map(c => c.name)];
    const incomeBoost = missing.filter(c => next.includes(c.name)).reduce((sum, c) => sum + c.incomeBoost, 0);
    const totalCost = missing.filter(c => next.includes(c.name)).reduce((sum, c) => sum + c.cost, 0);
    const yr = parseInt(years) || 0;
    const timeline = yr < 1 ? '12-18 months to full certification' : yr < 3 ? '6-12 months to next tier' : '3-6 months to master level';
    setRoadmap({ next, incomeBoost, totalCost, timeline });
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2 }}>PROLNK CONTRACTOR GUIDES — DFW HVAC</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 8px', lineHeight: 1.1 }}>HVAC Certification Guide</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, margin: '0 0 40px' }}>DFW contractors: navigate every credential that moves the needle on income and leads.</p>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>📋 Required vs Optional Certifications</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {certifications.map(cert => (
              <div key={cert.name} style={{ background: '#131f35', borderRadius: 10, padding: '16px 20px', border: cert.required ? '1px solid #F5E642′ : '1px solid #1e3a5f' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: 15 }}>{cert.name}</span>
                    {cert.required && <span style={{ marginLeft: 8, background: '#F5E642', color: '#0A1628', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4 }}>REQUIRED</span>}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#F5E642', fontWeight: 700 }}>${cert.cost}</div>
                    <div style={{ color: '#64748b', fontSize: 12 }}>{cert.time}</div>
                  </div>
                </div>
                <p style={{ color: '#94a3b8', fontSize: 13, margin: '8px 0 0′ }}>{cert.description}</p>
                {cert.incomeBoost > 0 && <div style={{ color: '#4ade80', fontSize: 13, marginTop: 6 }}>📈 +{cert.incomeBoost}% avg income boost</div>}
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>💰 DFW HVAC Income by Certification Level</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {incomeLevels.map((level, i) => (
              <div key={i} style={{ background: '#131f35', borderRadius: 8, padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{level.label}</span>
                <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 15 }}>${level.low.toLocaleString()} – ${level.high.toLocaleString()}/yr</span>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: '#131f35', borderRadius: 14, padding: 28, border: '1px solid #F5E642′ }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🗺️ Your Certification Roadmap</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Years of HVAC experience</label>
            <input type="number" value={years} onChange={e => setYears(e.target.value)} placeholder="e.g. 3″
              style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: 15, boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 10 }}>Certifications you already hold (check all that apply)</label>
            <div style={{ display: 'grid', gap: 8 }}>
              {certifications.map(cert => (
                <label key={cert.name} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                  <input type="checkbox" checked={hasCerts.includes(cert.name)} onChange={() => toggleCert(cert.name)}
                    style={{ width: 16, height: 16, accentColor: '#F5E642′ }} />
                  <span style={{ fontSize: 14 }}>{cert.name}</span>
                </label>
              ))}
            </div>
          </div>
          <button onClick={generateRoadmap}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, border: 'none', borderRadius: 8, padding: '12px 28px', cursor: 'pointer', width: '100%' }}>
            Generate My Roadmap →
          </button>
          {roadmap && (
            <div style={{ marginTop: 24, padding: 20, background: '#0A1628', borderRadius: 10, border: '1px solid #1e3a5f' }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 12, color: '#F5E642′ }}>Your Next Steps:</div>
              {roadmap.next.length === 0 ? (
                <p style={{ color: '#4ade80′ }}>✅ You’re fully certified! Focus on NATE specialty areas to max income.</p>
              ) : (
                <>
                  <ul style={{ color: '#e2e8f0', margin: '0 0 16px', paddingLeft: 20, lineHeight: 1.8 }}>
                    {roadmap.next.map(n => <li key={n}>{n}</li>)}
                  </ul>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ color: '#4ade80', fontWeight: 700, fontSize: 18 }}>+{roadmap.incomeBoost}%</div>
                      <div style={{ color: '#64748b', fontSize: 12 }}>Income boost</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18 }}>${roadmap.totalCost}</div>
                      <div style={{ color: '#64748b', fontSize: 12 }}>Est. total cost</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ color: '#60a5fa', fontWeight: 700, fontSize: 13 }}>{roadmap.timeline}</div>
                      <div style={{ color: '#64748b', fontSize: 12 }}>Timeline</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
