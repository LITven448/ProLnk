import { useState } from 'react';

const homeProfiles = [
  { label: 'Small home under 1,500 sq ft — 1 system', systems: 1, sizeFactor: 0.85 },
  { label: 'Mid-size 1,500-2,500 sq ft — 1 system', systems: 1, sizeFactor: 1.0 },
  { label: 'Large 2,500-4,000 sq ft — 1-2 systems', systems: 1.5, sizeFactor: 1.15 },
  { label: 'Large 4,000+ sq ft — 2+ systems', systems: 2, sizeFactor: 1.30 },
];

const systemAges = [
  { label: 'New (0-5 years)', repairFactor: 0.2, note: 'Mostly warranty-covered; minimal out-of-pocket' },
  { label: 'Mid-life (6-10 years)', repairFactor: 0.6, note: 'Some minor repairs expected annually' },
  { label: 'Aging (11-15 years)', repairFactor: 1.0, note: 'Regular repairs; plan for bigger costs' },
  { label: 'End-of-life (16+ years)', repairFactor: 1.8, note: 'High repair frequency; replacement may cost less' },
];

const costBreakdown = [
  { item: '🔧 Biannual tune-ups (spring + fall)', low: 150, high: 250, note: 'Per unit; DFW standard is 2x/year minimum' },
  { item: '🌬️ Filters (MERV 8-11, monthly replacement)', low: 60, high: 150, note: 'DFW dust and pollen demand frequent replacement' },
  { item: '💧 Drain line cleaning / treatment', low: 0, high: 80, note: 'Often included in tune-up; DFW humidity makes this critical' },
  { item: '🧊 Refrigerant check (if needed)', low: 0, high: 300, note: 'Only if leak suspected; not routine' },
  { item: '⚡ Minor electrical / capacitor repairs', low: 0, high: 250, note: 'Capacitors fail frequently in DFW heat — $80-250 each' },
  { item: '🛡️ Service agreement / maintenance plan', low: 150, high: 350, note: 'Optional but often cheaper than individual service calls' },
];

export default function DFWHVACMaintenanceCost() {
  const [profile, setProfile] = useState('');
  const [age, setAge] = useState('');
  const [result, setResult] = useState<{ low: number; high: number; note: string } | null>(null);

  function calculate() {
    const p = homeProfiles.find(h => h.label === profile);
    const a = systemAges.find(s => s.label === age);
    if (!p || !a) return;
    const baseLow = 300;
    const baseHigh = 730;
    const repairs = { low: 0, high: 500 };
    const low = Math.round((baseLow * p.sizeFactor * p.systems) + (repairs.low * a.repairFactor));
    const high = Math.round((baseHigh * p.sizeFactor * p.systems) + (repairs.high * a.repairFactor));
    setResult({ low, high, note: a.note });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif', color: '#E8EDF5' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>💰</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
          DFW HVAC Maintenance Cost Calculator
        </h1>
        <p style={{ color: '#9AAFC4', marginBottom: 16 }}>
          What DFW homeowners actually spend on HVAC maintenance each year — not national averages, but real DFW data. Know your budget before the season hits.
        </p>
        <div style={{ background: '#1A2B45', borderRadius: 8, padding: '10px 16px', marginBottom: 24, fontSize: 14, color: '#F5E642' }}>
          📊 DFW average: $600-1,400/year per household — vs $350-600 national average. Higher runtime = higher maintenance cost.
        </div>
        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>What's Included in DFW HVAC Maintenance</h2>
        <div style={{ display: 'grid', gap: 8, marginBottom: 28 }}>
          {costBreakdown.map(item => (
            <div key={item.item} style={{ background: '#1A2B45', borderRadius: 8, padding: '12px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 3 }}>{item.item}</div>
                  <div style={{ color: '#9AAFC4', fontSize: 13 }}>{item.note}</div>
                </div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap' }}>
                  ${item.low === 0 ? '0' : item.low}–${item.high}
                </div>
              </div>
            </div>
          ))}
        </div>
        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>Estimate Your Annual DFW Cost</h2>
        <div style={{ background: '#1A2B45', borderRadius: 8, padding: 24, marginBottom: 24 }}>
          <label style={{ display: 'block', marginBottom: 16 }}>
            <div style={{ marginBottom: 6, fontSize: 14, color: '#9AAFC4' }}>Your DFW home profile</div>
            <select value={profile} onChange={e => setProfile(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: 6, background: '#0A1628', color: '#E8EDF5', border: '1px solid #2A4A6B' }}>
              <option value="">Select home profile</option>
              {homeProfiles.map(p => <option key={p.label} value={p.label}>{p.label}</option>)}
            </select>
          </label>
          <label style={{ display: 'block', marginBottom: 20 }}>
            <div style={{ marginBottom: 6, fontSize: 14, color: '#9AAFC4' }}>System age</div>
            <select value={age} onChange={e => setAge(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: 6, background: '#0A1628', color: '#E8EDF5', border: '1px solid #2A4A6B' }}>
              <option value="">Select system age</option>
              {systemAges.map(a => <option key={a.label} value={a.label}>{a.label}</option>)}
            </select>
          </label>
          <button onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
            Calculate My Cost
          </button>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 8, padding: 20 }}>
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <div style={{ color: '#9AAFC4', fontSize: 14 }}>Estimated Annual DFW Maintenance Cost</div>
                <div style={{ color: '#F5E642', fontSize: 36, fontWeight: 700, margin: '8px 0' }}>
                  ${result.low.toLocaleString()} – ${result.high.toLocaleString()}
                </div>
                <div style={{ color: '#9AAFC4', fontSize: 14 }}>per year</div>
              </div>
              <div style={{ background: '#1A2B45', borderRadius: 8, padding: 12, fontSize: 14, color: '#E8EDF5' }}>
                💡 {result.note}
              </div>
            </div>
          )}
        </div>
        <div style={{ background: '#1A2B45', borderRadius: 8, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Find a DFW Maintenance Plan</div>
          <div style={{ color: '#9AAFC4', fontSize: 14 }}>ProLnk connects you with vetted DFW HVAC pros offering maintenance agreements — compare plans and pricing.</div>
        </div>
      </div>
    </div>
  );
}
