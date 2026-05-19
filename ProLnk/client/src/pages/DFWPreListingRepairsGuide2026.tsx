import { useState } from 'react';

export default function DFWPreListingRepairsGuide2026() {
  const [age, setAge] = useState('10-20');
  const [cond, setCond] = useState('average');

  const matrix: Record<string, Record<string, { repair: string; cost: string; roi: string }[]>> = {
    '0-10': {
      excellent: [
        { repair: 'HVAC tune-up', cost: '$150', roi: '20x' },
        { repair: 'Fresh caulk baths/kitchen', cost: '$200', roi: '15x' },
        { repair: 'Curb appeal planting', cost: '$500', roi: '8x' },
      ],
      average: [
        { repair: 'Interior repaint neutral', cost: '$2,500', roi: '3.2x' },
        { repair: 'HVAC service', cost: '$150', roi: '20x' },
        { repair: 'Garage door tune-up', cost: '$100', roi: '10x' },
      ],
      poor: [
        { repair: 'Interior repaint', cost: '$2,500', roi: '3.2x' },
        { repair: 'Flooring refresh', cost: '$3,000', roi: '2.5x' },
        { repair: 'HVAC service + cert', cost: '$200', roi: '18x' },
        { repair: 'Exterior power wash', cost: '$300', roi: '5x' },
      ],
    },
    '10-20': {
      excellent: [
        { repair: 'HVAC service', cost: '$150', roi: '20x' },
        { repair: 'Roof inspection cert', cost: '$150', roi: '12x' },
        { repair: 'Fresh paint high-traffic', cost: '$1,200', roi: '4x' },
      ],
      average: [
        { repair: 'HVAC service', cost: '$150', roi: '20x' },
        { repair: 'Full interior repaint', cost: '$2,500', roi: '3.2x' },
        { repair: 'Roof inspection', cost: '$150', roi: '12x' },
        { repair: 'Plumbing inspection', cost: '$200', roi: '8x' },
      ],
      poor: [
        { repair: 'Foundation inspection', cost: '$300', roi: 'Critical' },
        { repair: 'HVAC replacement eval', cost: '$100', roi: 'Critical' },
        { repair: 'Full repaint', cost: '$2,500', roi: '3.2x' },
        { repair: 'Roof cert or replace', cost: '$150-8K', roi: 'Critical' },
      ],
    },
    '20+': {
      excellent: [
        { repair: 'Foundation inspection', cost: '$300', roi: 'Critical' },
        { repair: 'HVAC service/replace', cost: '$150-5K', roi: 'Critical' },
        { repair: 'Electrical panel check', cost: '$200', roi: '10x' },
      ],
      average: [
        { repair: 'Foundation inspection', cost: '$300', roi: 'Critical' },
        { repair: 'Full interior repaint', cost: '$2,500', roi: '3.2x' },
        { repair: 'HVAC full service', cost: '$300', roi: '15x' },
        { repair: 'Roof inspection', cost: '$150', roi: 'Critical' },
      ],
      poor: [
        { repair: 'Foundation inspection', cost: '$300', roi: 'Critical' },
        { repair: 'Roof replacement', cost: '$8,000', roi: 'Critical' },
        { repair: 'HVAC replacement', cost: '$5,000', roi: 'Critical' },
        { repair: 'Full repaint', cost: '$4,000', roi: '3.2x' },
        { repair: 'Electrical update', cost: '$1,500', roi: '5x' },
      ],
    },
  };

  const rows = matrix[age]?.[cond] ?? [];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>🔨</div>
          <h1 style={{ fontSize: '1.8rem', color: '#F5E642', margin: '0.5rem 0′ }}>DFW Pre-Listing Repairs Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Ranked by ROI — what actually moves the needle in DFW</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '2rem' }}>
          {[
            { icon: '❄️', label: 'HVAC Service', ret: '20x return', cost: '$150′ },
            { icon: '🎨', label: 'Neutral Repaint', ret: '3.2x return', cost: '$2,500′ },
            { icon: '🏠', label: 'Roof Certification', ret: 'Deal saver', cost: '$150′ },
          ].map((s) => (
            <div key={s.label} style={{ background: '#112240', borderRadius: 12, padding: '1rem', border: '1px solid #1e3a5f', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem' }}>{s.icon}</div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', marginTop: 4 }}>{s.label}</div>
              <div style={{ color: '#22c55e', fontSize: '0.75rem' }}>{s.ret}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.85rem', marginTop: 2 }}>{s.cost}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginTop: 0 }}>📊 ROI Repair Ranking</h2>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <div>
              <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: 4 }}>Home Age</div>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                {['0-10', '10-20', '20+'].map((a) => (
                  <button key={a} onClick={() => setAge(a)} style={{ padding: '0.3rem 0.75rem', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', background: age === a ? '#F5E642′ : '#1e3a5f', color: age === a ? '#0A1628' : '#fff' }}>{a} yrs</button>
                ))}
              </div>
            </div>
            <div>
              <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: 4 }}>Condition</div>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                {['excellent', 'average', 'poor'].map((c) => (
                  <button key={c} onClick={() => setCond(c)} style={{ padding: '0.3rem 0.75rem', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', background: cond === c ? '#F5E642′ : '#1e3a5f', color: cond === c ? '#0A1628' : '#fff' }}>{c.charAt(0).toUpperCase() + c.slice(1)}</button>
                ))}
              </div>
            </div>
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 0', borderBottom: '1px solid #1e3a5f' }}>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>#{i + 1} {r.repair}</div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <span style={{ color: '#22c55e', fontSize: '0.8rem', fontWeight: 700 }}>ROI {r.roi}</span>
                <span style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.85rem' }}>{r.cost}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.25rem', border: '1px solid #F5E642', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem' }}>🔐</div>
          <p style={{ color: '#F5E642', fontWeight: 700, margin: '0.5rem 0 0.25rem' }}>Document Every Repair in Home Health Vault</p>
          <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: 0 }}>If foundation was repaired, show the warranty. Buyers pay more when documentation proves the work was done right.</p>
        </div>
      </div>
    </div>
  );
}

