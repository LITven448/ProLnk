import { useState } from 'react';

export default function DFWHomeSellingGuide2026() {
  const [condition, setCondition] = useState('good');

  const priorities: Record<string, { item: string; impact: string; cost: string }[]> = {
    excellent: [
      { item: 'Professional photography', impact: 'More showings', cost: '$300-500' },
      { item: 'Deep clean + deodorize', impact: 'Better first impressions', cost: '$200-400' },
      { item: 'Curb appeal touch-up', impact: 'Online click-through', cost: '$500-1,000' },
    ],
    good: [
      { item: 'Fresh neutral paint', impact: '+$8K avg return', cost: '$2,500' },
      { item: 'HVAC service', impact: 'Prevents inspection flags', cost: '$150' },
      { item: 'Landscaping refresh', impact: 'First impression', cost: '$800-1,500' },
      { item: 'Home Health Vault docs', impact: 'Commands 2-4% premium', cost: 'Free with ProLnk' },
    ],
    fair: [
      { item: 'Foundation inspection', impact: 'Prevent deal killers', cost: '$300' },
      { item: 'Roof certification', impact: 'Buyer confidence', cost: '$150' },
      { item: 'HVAC replacement eval', impact: 'Negotiation power', cost: '$100' },
      { item: 'Full repaint interior', impact: 'Modern neutral appeal', cost: '$4,000' },
      { item: 'Home Health Vault docs', impact: 'Disclose, command trust', cost: 'Free with ProLnk' },
    ],
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>🏠</div>
          <h1 style={{ fontSize: '1.8rem', color: '#F5E642', margin: '0.5rem 0' }}>DFW Home Selling Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Your playbook for selling in the Dallas-Fort Worth market</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '📅', label: 'Best Time to Sell', value: 'March – June', sub: 'Spring = peak demand' },
            { icon: '⏱', label: 'Avg Days on Market', value: '32 days', sub: 'DFW 2026 average' },
            { icon: '💰', label: 'Pricing Strategy', value: 'List 2-3% above target', sub: 'Room to negotiate' },
            { icon: '📋', label: 'Health Vault Premium', value: '+2-4% sale price', sub: 'Documented homes command more' },
          ].map((s) => (
            <div key={s.label} style={{ background: '#112240', borderRadius: 12, padding: '1.25rem', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: '1.5rem' }}>{s.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: 4 }}>{s.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1rem', marginTop: 2 }}>{s.value}</div>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginTop: 0 }}>🔧 Pre-Listing Priority List</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1rem' }}>Select your home condition:</p>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            {['excellent', 'good', 'fair'].map((c) => (
              <button key={c} onClick={() => setCondition(c)} style={{ padding: '0.4rem 1rem', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', background: condition === c ? '#F5E642' : '#1e3a5f', color: condition === c ? '#0A1628' : '#fff' }}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </button>
            ))}
          </div>
          {priorities[condition].map((p, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0', borderBottom: '1px solid #1e3a5f' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{p.item}</div>
                <div style={{ color: '#22c55e', fontSize: '0.75rem' }}>{p.impact}</div>
              </div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.85rem' }}>{p.cost}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.25rem', border: '1px solid #F5E642', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem' }}>🔐</div>
          <p style={{ color: '#F5E642', fontWeight: 700, margin: '0.5rem 0 0.25rem' }}>Home Health Vault Documentation</p>
          <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: 0 }}>Documented homes sell for 2-4% more in DFW. ProLnk stores your repair history, permits, and warranties — free for homeowners.</p>
        </div>
      </div>
    </div>
  );
}

