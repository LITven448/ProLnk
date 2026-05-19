import { useState } from 'react';

export default function DFWSunroomCosts2026() {
  const [sunroomType, setSunroomType] = useState<'three' | 'four'>('four');
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');

  const costs: Record<string, Record<string, string>> = {
    three: { small: '$12,000–$18,000', medium: '$18,000–$25,000', large: '$25,000–$35,000' },
    four: { small: '$28,000–$38,000', medium: '$38,000–$50,000', large: '$50,000–$70,000' },
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 14, marginBottom: 8 }}>🏠 DFW HOME GUIDES 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>DFW Sunroom Addition Cost Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Sunroom costs in Dallas-Fort Worth — why 4-season is almost always the right choice here.</p>

        <div style={{ background: '#f97316', borderRadius: 10, padding: 16, marginBottom: 24, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{ fontSize: 24 }}>☀️</div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>DFW Reality Check: 3-Season Sunrooms</div>
            <div style={{ fontSize: 13, color: '#fff' }}>A 3-season (screened) sunroom is unusable July–September in DFW. Peak heat hits 105°F+ and humidity makes it unbearable. Most DFW homeowners regret choosing 3-season. Budget for 4-season if you want year-round use.</div>
          </div>
        </div>

        <div style={{ background: '#111e33', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>⚙️ Estimate Your DFW Sunroom Cost</h2>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>Sunroom Type</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {(['three', 'four'] as const).map(t => (
                <button key={t} onClick={() => setSunroomType(t)} style={{ padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', background: sunroomType === t ? '#F5E642' : '#1e2d45', color: sunroomType === t ? '#0A1628' : '#fff', fontWeight: 600 }}>
                  {t === 'three' ? '3-Season (Screened)' : '4-Season (Climate Control)'}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>Size</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {(['small', 'medium', 'large'] as const).map(s => (
                <button key={s} onClick={() => setSize(s)} style={{ padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', background: size === s ? '#F5E642' : '#1e2d45', color: size === s ? '#0A1628' : '#fff', fontWeight: 600 }}>
                  {s === 'small' ? '10×12' : s === 'medium' ? '12×16' : '16×20+'}
                </button>
              ))}
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 4 }}>Estimated DFW Cost</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: '#F5E642' }}>{costs[sunroomType][size]}</div>
            <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>Foundation + HVAC extension included in 4-season estimate</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {[
            { icon: '❄️', title: 'HVAC Extension', desc: '4-season requires HVAC extension or mini-split. DFW summers demand proper cooling. Budget $3,000–6,000.' },
            { icon: '🪟', title: 'Low-E Glass', desc: 'DFW sunrooms need Low-E insulated glass to block UV and reduce heat gain. Standard glass fails here.' },
            { icon: '🏗', title: 'Foundation Options', desc: 'Slab extension most common in DFW. Pier options available on sloped lots. Geotechnical may be needed.' },
            { icon: '📋', title: 'Permits Required', desc: 'All sunroom additions require permit. Adds 3–6 weeks. DFW cities vary on inspection requirements.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#111e33', borderRadius: 10, padding: 18 }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>{c.title}</div>
              <div style={{ fontSize: 13, color: '#94a3b8' }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, marginBottom: 6 }}>Get DFW Sunroom Quotes</div>
          <div style={{ color: '#1e2d45', fontSize: 13 }}>ProLnk connects you with DFW sunroom specialists — free estimates, vetted contractors.</div>
        </div>
      </div>
    </div>
  );
}
