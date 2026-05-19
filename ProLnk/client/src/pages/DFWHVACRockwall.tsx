import { useState } from 'react';

const systemAges = ['Under 5 years', '5-9 years', '10-14 years', '15-19 years', '20+ years'];
const sqftRanges = ['Under 1,500 sqft', '1,500–2,500 sqft', '2,500–3,500 sqft', '3,500–5,000 sqft', '5,000+ sqft'];

function getUrgency(age: string, sqft: string): { label: string; color: string; detail: string; cost: string } {
  const isLarge = sqft === '3,500–5,000 sqft' || sqft === '5,000+ sqft';
  if (age === 'Under 5 years') return { label: 'Low Urgency — Maintain Regularly', color: '#22c55e', detail: 'Your system is relatively new. Schedule annual tune-ups and replace filters every 60-90 days in Rockwall humidity.', cost: '$150–$300/yr maintenance' };
  if (age === '5-9 years') return { label: 'Monitor — Mid-Life Stage', color: '#22c55e', detail: 'Rockwall lake humidity accelerates coil corrosion. Get a full coil inspection and check refrigerant levels this season.', cost: '$200–$500 tune-up + inspection' };
  if (age === '10-14 years') {
    if (isLarge) return { label: 'Plan Replacement Soon', color: '#F5E642', detail: 'Large homes in Rockwall run HVAC hard year-round. At 10+ years on a larger system, efficiency drops significantly.', cost: 'Budget $12,000–$22,000′ };
    return { label: 'Watch Closely', color: '#F5E642', detail: 'Approaching the 15-year mark where most Rockwall systems fail. Get an efficiency audit — cooling costs may justify early replacement.', cost: '$8,000–$16,000 to replace' };
  }
  if (age === '15-19 years') return { label: 'Replace This Season', color: '#f97316', detail: 'Rockwall homes built in the 2000s-2010s boom are hitting this window now. R-22 refrigerant is obsolete. Replace before peak summer.', cost: '$9,000–$18,000 installed' };
  return { label: 'Urgent — Replace Immediately', color: '#ef4444', detail: 'A 20+ year system in DFW heat and Rockwall lake humidity is operating at 40-50% efficiency. Every month costs more in energy bills.', cost: '$10,000–$22,000 installed' };
}

export default function DFWHVACRockwall() {
  const [systemAge, setSystemAge] = useState('');
  const [sqft, setSqft] = useState('');
  const result = systemAge && sqft ? getUrgency(systemAge, sqft) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: 'white', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 12 }}>
          <span style={{ background: '#F5E642', color: '#0A1628', padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 700 }}>
            🌊 Rockwall, TX
          </span>
        </div>

        <h1 style={{ fontSize: 42, fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>
          Rockwall TX HVAC —{' '}
          <span style={{ color: '#F5E642′ }}>Lakeside Community Specialists</span>
        </h1>

        <p style={{ fontSize: 18, color: '#94a3b8', lineHeight: 1.7, marginBottom: 40, maxWidth: 700 }}>
          Rockwall's Lake Ray Hubbard location creates a unique humidity challenge on top of brutal DFW summers.
          Most of the community was built 2000–2020, meaning thousands of HVAC systems are now entering
          the replacement window simultaneously.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 48 }}>
          {[
            { icon: '💧', title: 'Lakeside Humidity Experts', desc: 'Lake Ray Hubbard adds 10-15% more humidity than inland DFW suburbs. Your HVAC works harder and coils corrode faster here.' },
            { icon: '🌡️', title: '2000s-2020s Home Specialists', desc: 'Rockwall grew fast. Most systems in the community are now 10-20 years old — prime replacement territory.' },
            { icon: '⚡', title: 'Energy Efficiency Upgrades', desc: 'Modern 18-20 SEER systems cut energy bills 30-40% vs 10-12 SEER units installed in early 2000s subdivisions.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#111f3a', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{card.icon}</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, color: '#F5E642′ }}>{card.title}</h3>
              <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.6 }}>{card.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#111f3a', borderRadius: 16, padding: 36, border: '1px solid #1e3a5f', marginBottom: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>❄️ HVAC Replacement Urgency Calculator</h2>
          <p style={{ color: '#94a3b8', marginBottom: 28 }}>
            Enter your system details to see your replacement urgency and estimated budget for a Rockwall home.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#F5E642′ }}>
                System Age
              </label>
              <select
                value={systemAge}
                onChange={e => setSystemAge(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #2d4a7a', borderRadius: 8, color: 'white', fontSize: 15 }}
              >
                <option value="">Select system age...</option>
                {systemAges.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#F5E642′ }}>
                Home Size
              </label>
              <select
                value={sqft}
                onChange={e => setSqft(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #2d4a7a', borderRadius: 8, color: 'white', fontSize: 15 }}
              >
                <option value="">Select home size...</option>
                {sqftRanges.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 24, borderLeft: `4px solid ${result.color}` }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8', marginBottom: 4 }}>URGENCY LEVEL</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: result.color, marginBottom: 10 }}>{result.label}</div>
              <p style={{ color: '#cbd5e1', lineHeight: 1.6, marginBottom: 12 }}>{result.detail}</p>
              <div style={{ display: 'inline-block', background: '#111f3a', padding: '8px 16px', borderRadius: 8, fontSize: 14, color: '#F5E642', fontWeight: 700 }}>
                💰 {result.cost}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#111f3a', borderRadius: 16, padding: 36, border: '1px solid #1e3a5f', marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>📊 Rockwall HVAC Service Costs</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { service: 'Annual Tune-Up', range: '$89–$149', note: 'Filter, coil, refrigerant check' },
              { service: 'Coil Cleaning', range: '$150–$400', note: 'Critical in lake humidity' },
              { service: 'Refrigerant Recharge', range: '$200–$600', note: 'R-410A or R-22 legacy' },
              { service: 'Full System Replace', range: '$8,000–$22,000', note: 'Installed, permitted' },
            ].map(item => (
              <div key={item.service} style={{ background: '#0A1628', borderRadius: 10, padding: 18 }}>
                <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 4 }}>{item.service}</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#F5E642′ }}>{item.range}</div>
                <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{item.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0d2240', borderRadius: 12, padding: 20, marginBottom: 48, border: '1px solid #1e3a5f' }}>
          <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            <span style={{ color: '#F5E642', fontWeight: 700 }}>🌊 Rockwall Lake Fact:</span> Homes within 2 miles of Lake Ray Hubbard
            experience 15-20% higher HVAC run times compared to inland DFW. Coils corrode 30% faster due to airborne moisture.
            Factor this into your replacement timeline.
          </p>
        </div>

        <div style={{ textAlign: 'center', background: '#111f3a', borderRadius: 16, padding: 40, border: '2px solid #F5E642′ }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>❄️</div>
          <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 12 }}>Get Rockwall HVAC Quotes Today</h2>
          <p style={{ color: '#94a3b8', marginBottom: 24 }}>Compare bids from Rockwall-area HVAC pros before the summer heat hits. ProLnk makes it fast.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', padding: '16px 40px', borderRadius: 10, fontWeight: 800, fontSize: 17, border: 'none', cursor: 'pointer' }}>
            Get Free Quotes
          </button>
        </div>

      </div>
    </div>
  );
}
