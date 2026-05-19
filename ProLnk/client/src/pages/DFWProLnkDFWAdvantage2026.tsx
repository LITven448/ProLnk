import { useState } from 'react';

const stakeholders = [
  { id: 'homeowner', label: '🏠 I am a DFW Homeowner', guide: ['DFW has the most expansive clay soil in the US — foundation movement is near-universal, not exceptional', 'DFW leads the US in hail frequency — roofing claims are a DFW constant, not a one-time event', '9-month cooling season: HVAC failure is not a summer inconvenience, it is a health risk in DFW heat', 'DFW is the fastest-growing US metro — finding trusted contractors is harder than in any other city', 'ProLnk fills the gap: Charter-verified pros with background checks, trade verification, and reviews' ]},
  { id: 'pro', label: '🔧 I am a DFW Pro', guide: ['DFW contractor shortage is severe — demand outpaces supply in HVAC, foundation, and roofing', 'DFW hail season (March–October) generates 200–400% surge in roofing and gutter demand', 'Summer HVAC failures: DFW averages 60+ days above 100°F — HVAC pro is essential, not optional', 'Foundation market: $2–15B annually in DFW alone — most expansive clay market in North America', 'ProLnk Charter pros get first access to this demand — largest local market for your trade in the US' ]},
  { id: 'investor', label: '💼 I am an Investor', guide: ['DFW is the #1 US metro for home service demand density: clay, hail, heat, and growth combined', '3.7M+ homes in DFW metro — even 1% market penetration = 37,000 homes in Health Vault', 'DFW growth rate: 100,000+ new residents per year = continuous new homeowner demand', 'Contractor shortage creates supply-side urgency — pros are motivated to pay for verified leads', 'DFW launch validates unit economics at scale before national expansion — ideal seed market' ]},
  { id: 'recruit', label: '📣 I am recruiting DFW Pros', guide: ['Every DFW trade is underserved — HVAC, foundation, roofing, plumbing, electrical, pest', 'Referral pitch: Charter rate locked at $149/mo, earns 12% direct commission from Day 1', 'Your subscription override: recruit a Charter pro = $17.88/mo ongoing from their subscription', 'Your job override: recruit 5 pros averaging $5,000/mo in matches = $280/mo passive income', 'DFW is the easiest market to recruit in — demand is obvious, contractor pain is universal' ]},
];

const dfwStats = [
  { icon: '🌍', label: 'Clay Soil Rank', value: '#1 US', note: 'Most expansive in America' },
  { icon: '⛈️', label: 'Hail Frequency', value: '#1 US', note: 'Hail capital of North America' },
  { icon: '☀️', label: 'Cooling Season', value: '9 months', note: '60+ days above 100°F' },
  { icon: '📈', label: 'Metro Growth', value: '100K+/yr', note: 'New residents annually' },
];

export default function DFWProLnkDFWAdvantage2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const current = stakeholders.find(s => s.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🌟</div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#F5E642', margin: '0 0 0.5rem' }}>ProLnk DFW Advantage Guide 2026</h1>
          <p style={{ color: '#9CA3AF', margin: 0, fontSize: '0.95rem' }}>Why DFW is the perfect launch market — and what that means for you.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {dfwStats.map((stat, i) => (
            <div key={i} style={{ background: '#111D35', borderRadius: 10, padding: '1rem', border: '1px solid #1E2D4A', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{stat.icon}</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#F5E642' }}>{stat.value}</div>
              <div style={{ fontSize: '0.8rem', color: '#E8EAF0', fontWeight: 600 }}>{stat.label}</div>
              <div style={{ fontSize: '0.75rem', color: '#6B7A99' }}>{stat.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1E2D4A' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', marginTop: 0, marginBottom: '1rem' }}>👤 What is your role?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {stakeholders.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id === selected ? null : s.id)}
                style={{ background: selected === s.id ? '#F5E642' : '#1A2A45', color: selected === s.id ? '#0A1628' : '#E8EAF0', border: '2px solid' + (selected === s.id ? ' #F5E642' : ' #2A3A55'), borderRadius: 8, padding: '0.75rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, textAlign: 'left' }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {current && (
          <div style={{ background: '#111D35', borderRadius: 12, padding: '1.5rem', border: '2px solid #F5E642', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#F5E642', marginTop: 0, marginBottom: '1rem' }}>🌟 Your DFW Advantage Guide</h3>
            <ul style={{ margin: 0, padding: '0 0 0 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {current.guide.map((tip, i) => (
                <li key={i} style={{ color: '#CBD5E1', lineHeight: 1.5, fontSize: '0.9rem' }}>{tip}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
          <p style={{ margin: 0, color: '#0A1628', fontWeight: 700, fontSize: '0.95rem' }}>🚀 Join ProLnk — Built for DFW's Unique Home Service Market</p>
          <p style={{ margin: '0.5rem 0 0', color: '#1A2A45', fontSize: '0.85rem' }}>prolnk.io · Charter spots limited to 500 pros</p>
        </div>
      </div>
    </div>
  );
}