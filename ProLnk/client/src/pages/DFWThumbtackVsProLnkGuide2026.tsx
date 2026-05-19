import { useState } from 'react';

const comparisons = [
  { label: 'Pricing Model', thumbtack: 'Pay per quote sent ($15–50 each)', prolnk: 'Flat $149/mo subscription' },
  { label: 'Lead Exclusivity', thumbtack: 'Non-exclusive, race to respond', prolnk: 'Exclusive match window' },
  { label: 'Pro Vetting', thumbtack: 'Basic profile, self-reported', prolnk: 'License, insurance, background check' },
  { label: 'Network Income', thumbtack: 'None', prolnk: '5 streams: job, recruit, subscription, homeowner, origination' },
  { label: 'Predictability', thumbtack: 'Highly variable monthly cost', prolnk: 'Fixed $149/mo, Charter locked' },
  { label: 'Quality of Leads', thumbtack: 'Tire-kickers, price shoppers', prolnk: 'Verified homeowners, service intent confirmed' },
];

export default function DFWThumbtackVsProLnkGuide2026() {
  const [jobs, setJobs] = useState(20);
  const thumbtackCost = jobs * 32;
  const prolnkCost = 149;
  const savings = thumbtackCost - prolnkCost;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ fontSize: '2.5rem' }}>📊</span>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0' }}>ProLnk vs Thumbtack — DFW 2026</h1>
          <p style={{ color: '#94a3b8', maxWidth: 580, margin: '0 auto' }}>
            Stop paying $15–50 per quote. See how ProLnk's flat model saves DFW pros thousands annually.
          </p>
        </div>

        <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
          {comparisons.map((row) => (
            <div key={row.label} style={{ display: 'grid', gridTemplateColumns: '160px 1fr 1fr', gap: '1rem', alignItems: 'center', background: '#1e293b', borderRadius: 10, padding: '1rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.85rem' }}>{row.label}</div>
              <div style={{ background: '#0f172a', borderRadius: 8, padding: '0.6rem', color: '#f87171', fontSize: '0.85rem' }}>
                <span style={{ fontWeight: 700 }}>Thumbtack: </span>{row.thumbtack}
              </div>
              <div style={{ background: '#0f172a', borderRadius: 8, padding: '0.6rem', color: '#4ade80', fontSize: '0.85rem' }}>
                <span style={{ fontWeight: 700 }}>ProLnk: </span>{row.prolnk}
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: '1.5rem', border: '2px solid #F5E642' }}>
          <h3 style={{ color: '#F5E642', marginTop: 0 }}>💸 Monthly Cost Calculator</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>How many quotes do you send per month on Thumbtack?</p>
          <input type="range" min={5} max={60} value={jobs} onChange={(e) => setJobs(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#F5E642', marginBottom: '1rem' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
            <span>5 quotes</span><span style={{ color: '#F5E642', fontWeight: 700 }}>{jobs} quotes/mo</span><span>60 quotes</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            {[['Thumbtack Cost', `$${thumbtackCost.toLocaleString()}`, '#ef4444'], ['ProLnk Cost', `$${prolnkCost}`, '#22c55e'], ['Monthly Savings', `$${savings > 0 ? savings.toLocaleString() : 0}`, '#F5E642']].map(([label, val, color]) => (
              <div key={String(label)} style={{ background: '#0f172a', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
                <div style={{ color: String(color), fontSize: '1.6rem', fontWeight: 700 }}>{val}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{label}</div>
              </div>
            ))}
          </div>
          {savings > 0 && (
            <p style={{ color: '#4ade80', textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem' }}>
              ✅ ProLnk saves you ${(savings * 12).toLocaleString()} per year — plus network income on top
            </p>
          )}
        </div>

        <p style={{ textAlign: 'center', color: '#F5E642', marginTop: '2rem', fontSize: '0.9rem' }}>
          🔒 Charter spots limited to 500 DFW pros — join at prolnk.io before it closes
        </p>
      </div>
    </div>
  );
}