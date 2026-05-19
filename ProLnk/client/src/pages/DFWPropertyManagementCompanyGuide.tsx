import { useState } from 'react';

function calcValue(units: number, requestsPerUnit: number): { annualCost: string; proLnkSavings: string; features: string[] } {
  const totalRequests = units * requestsPerUnit;
  const avgCostPerRequest = 380;
  const annualCost = totalRequests * avgCostPerRequest;
  const savingsPct = units > 200 ? 0.28 : units > 50 ? 0.22 : 0.15;
  const savings = Math.round(annualCost * savingsPct);

  const fmt = (n: number) => n >= 1000000 ? `$${(n / 1000000).toFixed(1)}M` : `$${n.toLocaleString()}`;

  const features: string[] = [];
  if (units >= 10) features.push('Bulk service request submission — file 10+ requests at once with property codes');
  if (units >= 25) features.push('Preferred contractor network — same vetted pros every time, no repeat vetting');
  if (units >= 50) features.push('Volume pricing — automatic discounts at 50, 100, 250+ units under management');
  if (units >= 100) features.push('Dedicated account manager — single ProLnk contact for your portfolio');
  if (units >= 200) features.push('Custom reporting — service history by property, contractor performance scores');
  if (requestsPerUnit >= 4) features.push('Emergency dispatch priority — your portfolio jumps the queue for urgent requests');
  features.push('Resident satisfaction tracking — post-service surveys sent automatically');
  features.push('Compliance documentation — permits, certificates, and service records stored per property');

  return { annualCost: fmt(annualCost), proLnkSavings: fmt(savings) + '/yr', features };
}

export default function DFWPropertyManagementCompanyGuide() {
  const [units, setUnits] = useState('');
  const [freq, setFreq] = useState('');
  const [result, setResult] = useState<{ annualCost: string; proLnkSavings: string; features: string[] } | null>(null);

  function calculate() {
    const u = parseInt(units, 10);
    const f = parseFloat(freq);
    if (isNaN(u) || isNaN(f) || u <= 0 || f <= 0) return;
    setResult(calcValue(u, f));
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>🏢 DFW Property Management Guide</div>
        <h1 style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.15, marginBottom: 12 }}>How ProLnk Serves <span style={{ color: '#F5E642' }}>DFW Property Managers</span></h1>
        <p style={{ color: '#94A3B8', fontSize: 17, marginBottom: 36 }}>DFW property management companies handle maintenance across dozens or hundreds of properties. ProLnk's portfolio tools turn scattered vendor relationships into a single, efficient system.</p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, border: '1px solid #F5E642', marginBottom: 32 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>📊 The DFW PM Maintenance Problem</div>
          <p style={{ color: '#94A3B8', lineHeight: 1.7, margin: 0 }}>The average DFW property management company manages 3.8 contractor relationships per property category — plumbing, HVAC, electrical, roofing, landscaping. That's 15–25 vendor relationships per property type, each with their own pricing, availability, and quality variance. ProLnk normalizes this into one vetted network with consistent pricing and performance tracking across your entire DFW portfolio.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginBottom: 40 }}>
          {[
            { icon: '📦', title: 'Bulk Service Requests', body: 'Submit service requests for 10, 50, or 200 properties at once. Group by trade, urgency, or geography. ProLnk routes each to the nearest available qualified contractor.' },
            { icon: '🌟', title: 'Preferred Contractor Network', body: 'Once contractors perform well in your portfolio, flag them as Preferred. They get first-look on your future requests. Build relationships at scale without losing accountability.' },
            { icon: '💰', title: 'Volume Pricing', body: 'Portfolio pricing kicks in at 50 units under management. Discounts of 8–22% on service fees depending on volume tier. Annual contracts lock in pricing and priority.' },
            { icon: '📱', title: 'Resident Satisfaction', body: 'Automated post-service surveys sent to residents. Scores tracked per contractor and property. Low scores trigger automatic contractor review and replacement workflow.' },
            { icon: '📋', title: 'Compliance Documentation', body: 'Every permit, inspection certificate, and warranty stored per property in the Home Health Vault. Pull full service history for any property in seconds at lease renewal or sale.' },
            { icon: '⚡', title: 'Emergency Priority', body: 'Portfolio PM accounts get priority routing on emergency requests. Burst capacity for storm events — ProLnk activates regional contractor surge network across DFW.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#111E35', borderRadius: 12, padding: 24, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{card.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, color: '#F5E642' }}>{card.title}</div>
              <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6 }}>{card.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 16, padding: 32, border: '1px solid #F5E642', marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, color: '#F5E642' }}>💼 ProLnk Value Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>Units Under Management</label>
              <input type="number" placeholder="e.g. 75" value={units} onChange={e => setUnits(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EDF5', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>Avg Service Requests per Unit/Year</label>
              <input type="number" placeholder="e.g. 3" value={freq} onChange={e => setFreq(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EDF5', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Calculate ProLnk Value →</button>
          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 12, padding: 24, border: '1px solid #2A4A7F' }}>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 17, marginBottom: 16 }}>Your Portfolio Analysis</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                <div style={{ background: '#111E35', borderRadius: 8, padding: 16 }}><span style={{ color: '#94A3B8', fontSize: 13 }}>ESTIMATED ANNUAL SERVICE SPEND</span><div style={{ color: '#E8EDF5', fontWeight: 700, fontSize: 22, marginTop: 4 }}>{result.annualCost}</div></div>
                <div style={{ background: '#111E35', borderRadius: 8, padding: 16 }}><span style={{ color: '#94A3B8', fontSize: 13 }}>PROLNK ESTIMATED SAVINGS</span><div style={{ color: '#F5E642', fontWeight: 700, fontSize: 22, marginTop: 4 }}>{result.proLnkSavings}</div></div>
              </div>
              <div><span style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 10 }}>PROLNK FEATURES UNLOCKED FOR YOUR PORTFOLIO</span>
                {result.features.map((f, i) => <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}><span style={{ color: '#F5E642' }}>✓</span><span style={{ color: '#E8EDF5', fontSize: 14 }}>{f}</span></div>)}
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🏠', tier: 'Starter Portfolio', range: '10–49 units', price: 'Standard pricing', features: ['Bulk requests up to 10 at once','Basic service history','Email support'] },
            { icon: '🏢', tier: 'Growth Portfolio', range: '50–199 units', price: '8–15% volume discount', features: ['Unlimited bulk requests','Preferred contractor network','Dedicated account rep','Resident satisfaction surveys'] },
          ].map(t => (
            <div key={t.tier} style={{ background: '#111E35', borderRadius: 12, padding: 24, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{t.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 16, marginBottom: 4 }}>{t.tier}</div>
              <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 12 }}>{t.range} · {t.price}</div>
              {t.features.map((f, i) => <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}><span style={{ color: '#F5E642' }}>✓</span><span style={{ color: '#E8EDF5', fontSize: 13 }}>{f}</span></div>)}
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 16, padding: 28, border: '1px solid #1E3A5F', textAlign: 'center' }}>
          <div style={{ fontSize: 26, marginBottom: 12 }}>🏢</div>
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Set Up Your Portfolio Account</h3>
          <p style={{ color: '#94A3B8', marginBottom: 20 }}>DFW property management companies managing 10+ units qualify for ProLnk Portfolio. Talk to our team about volume pricing and onboarding your contractor network.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 32px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Schedule Portfolio Demo →</button>
        </div>
      </div>
    </div>
  );
}
