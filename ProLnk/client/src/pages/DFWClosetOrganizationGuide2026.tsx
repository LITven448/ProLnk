import { useState } from 'react';

export default function DFWClosetOrganizationGuide2026() {
  const [closetType, setClosetType] = useState('walkin');
  const [budget, setBudget] = useState(3000);

  const getSolution = (type: string, b: number) => {
    if (type === 'walkin') {
      if (b < 2000) return { label: 'IKEA PAX System', desc: 'DIY-friendly, customizable, moisture-resistant options available', cost: '$800-$1,800′ };
      if (b < 5000) return { label: 'Container Store Elfa', desc: 'Adjustable, professional-grade, lifetime guarantee', cost: '$2,000-$4,500′ };
      return { label: 'Full Custom Built-In', desc: 'Solid wood or plywood, humidity-resistant finish for DFW climate', cost: '$4,000-$8,000+' };
    }
    if (b < 1500) return { label: 'Basic Reach-In Organizer', desc: 'Double hang + shelf kit, painted MDF', cost: '$300-$1,200′ };
    if (b < 3500) return { label: 'Elfa Reach-In System', desc: 'Floor-to-ceiling tracks, adjustable shelving', cost: '$1,200-$3,000′ };
    return { label: 'Custom Reach-In Conversion', desc: 'Built-in look, integrated lighting, cedar lining option', cost: '$2,500-$5,000′ };
  };

  const solution = getSolution(closetType, budget);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600 }}>🏠 PROLNK DFW GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Closet Organization Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Custom closets in DFW — from IKEA PAX to full custom, optimized for Texas humidity.</p>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>👗 Closet Type</h2>
          <div style={{ display: 'flex', gap: 8 }}>
            {[{ id: 'walkin', label: '🚶 Walk-In' }, { id: 'reachin', label: '🚪 Reach-In' }].map((opt) => (
              <button key={opt.id} onClick={() => setClosetType(opt.id)}
                style={{ padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
                  background: closetType === opt.id ? '#F5E642′ : '#0f172a', color: closetType === opt.id ? '#0A1628' : '#fff' }}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 4 }}>💰 Your Budget</h2>
          <input type="range" min={500} max={9000} step={250} value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            style={{ width: '100%', marginBottom: 8, accentColor: '#F5E642′ }} />
          <div style={{ textAlign: 'center', color: '#F5E642', fontWeight: 700, fontSize: 20, marginBottom: 16 }}>${budget.toLocaleString()}</div>
          <div style={{ background: '#0f172a', borderRadius: 8, padding: 16 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{solution.label}</div>
            <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>{solution.desc}</div>
            <div style={{ color: '#F5E642', fontWeight: 600 }}>Range: {solution.cost}</div>
          </div>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📊 System Comparison</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            {[
              { label: 'IKEA PAX', price: '$800-$1,800', pro: 'Affordable, DIY', con: 'Limited depth options' },
              { label: 'Elfa System', price: '$2K-$4.5K', pro: 'Adjustable forever', con: 'Requires pro install' },
              { label: 'Full Custom', price: '$4K-$8K+', pro: 'Perfect fit + finish', con: 'Highest cost' },
            ].map((sys) => (
              <div key={sys.label} style={{ background: '#0f172a', borderRadius: 8, padding: 12 }}>
                <div style={{ fontWeight: 700, marginBottom: 4, fontSize: 13 }}>{sys.label}</div>
                <div style={{ color: '#F5E642', fontSize: 12, marginBottom: 4 }}>{sys.price}</div>
                <div style={{ fontSize: 11, color: '#4ade80', marginBottom: 2 }}>+ {sys.pro}</div>
                <div style={{ fontSize: 11, color: '#f87171′ }}>- {sys.con}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🌡️ DFW Climate Tips</h2>
          {[
            'DFW humidity (avg 65%) can warp solid wood — use plywood or moisture-resistant MDF.',
            'Cedar lining naturally repels insects and manages humidity.',
            'Avoid carpet in closets — LVP or tile is easier to clean and more durable.',
            'LED lighting reduces heat buildup (important in DFW summers).',
            'Seasonal clothing rotation matters less in DFW — mild winters allow year-round access.',
          ].map((tip) => (
            <div key={tip} style={{ fontSize: 13, color: '#cbd5e1', marginBottom: 8, paddingLeft: 12, borderLeft: '2px solid #F5E642′ }}>{tip}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
