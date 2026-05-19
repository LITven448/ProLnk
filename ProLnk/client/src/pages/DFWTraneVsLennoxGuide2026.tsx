import { useState } from 'react';

export default function DFWTraneVsLennoxGuide2026() {
  const [priority, setPriority] = useState<string | null>(null);

  const recommendation = () => {
    if (priority === 'efficiency') return { brand: 'Lennox', reason: 'Lennox leads in SEER2 ratings — their XC21 hits 24 SEER2, cutting DFW summer bills significantly.', emoji: '⚡' };
    if (priority === 'reliability') return { brand: 'Trane', reason: 'Trane units are built for heavy Texas summers with fewer breakdowns over a 15-20 year lifespan.', emoji: '🔧' };
    if (priority === 'cost') return { brand: 'Trane', reason: 'Trane offers better upfront value with wide DFW dealer competition keeping install prices lower.', emoji: '💰' };
    return null;
  };

  const rec = recommendation();

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>PROLNK HVAC GUIDE · DFW · 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🥊 Trane vs Lennox in DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Two premium brands. One DFW summer. Here is the real difference.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          <div style={{ background: '#111f3a', borderRadius: 12, padding: 20, borderTop: '3px solid #e53e3e' }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>🔴 Trane</div>
            <ul style={{ color: '#94a3b8', lineHeight: 1.8, paddingLeft: 16, fontSize: 14 }}>
              <li>10-year parts warranty standard</li>
              <li>Built for extreme heat cycles</li>
              <li>Wide DFW dealer network</li>
              <li>Avg price: <strong style={{ color: '#fff' }}>$6,500–8,000 installed</strong></li>
              <li>SEER2: 15.2–21</li>
              <li>Reputation: Most reliable in TX</li>
            </ul>
          </div>
          <div style={{ background: '#111f3a', borderRadius: 12, padding: 20, borderTop: '3px solid #3b82f6' }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>🔵 Lennox</div>
            <ul style={{ color: '#94a3b8', lineHeight: 1.8, paddingLeft: 16, fontSize: 14 }}>
              <li>10-year parts + 5-yr labor option</li>
              <li>Efficiency leader (up to 24 SEER2)</li>
              <li>Quieter operation (as low as 59 dB)</li>
              <li>Avg price: <strong style={{ color: '#fff' }}>$7,000–9,500 installed</strong></li>
              <li>SEER2: 15.2–24</li>
              <li>Reputation: Best efficiency in class</li>
            </ul>
          </div>
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>💡 DFW Climate Context</div>
          <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>Both brands perform well in DFW. Price difference typically runs <strong style={{ color: '#fff' }}>$500–1,500</strong> with Lennox on the higher end due to efficiency tech. Both have strong local dealer presence and parts availability.</p>
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>🎯 What matters most to you?</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {['efficiency', 'reliability', 'cost'].map(p => (
              <button key={p} onClick={() => setPriority(p)} style={{ padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, textTransform: 'capitalize', background: priority === p ? '#F5E642' : '#1e3a5f', color: priority === p ? '#0A1628' : '#fff' }}>{p}</button>
            ))}
          </div>
          {rec && (
            <div style={{ marginTop: 16, background: '#0d2240', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{rec.emoji} Recommendation: {rec.brand}</div>
              <p style={{ color: '#94a3b8', fontSize: 14 }}>{rec.reason}</p>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16, marginBottom: 6 }}>Get DFW-licensed HVAC quotes today</div>
          <div style={{ color: '#1a2f4e', fontSize: 13 }}>ProLnk matches you with vetted local contractors — free, fast, no pressure.</div>
        </div>
      </div>
    </div>
  );
}
