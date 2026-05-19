import { useState } from 'react';

export default function DFWCarrierVsYorkGuide2026() {
  const [homeSize, setHomeSize] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);

  const recommendation = () => {
    if (!homeSize || !budget) return null;
    if (budget === 'tight') return { brand: 'York', reason: 'York delivers solid SEER2 compliance with a lower install cost — ideal when budget is the primary driver.', emoji: '💚' };
    if (homeSize === 'large' && budget === 'flexible') return { brand: 'Carrier', reason: 'Carrier’s Infinity series handles large DFW homes efficiently with best-in-class zoning support.', emoji: '⭐' };
    return { brand: 'Carrier', reason: 'Carrier offers better long-term parts availability across DFW and a premium brand that holds resale value.', emoji: '🏅' };
  };

  const rec = recommendation();

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>PROLNK HVAC GUIDE · DFW · 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🥊 Carrier vs York in DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Premium vs value. Both SEER2 compliant. Which fits your DFW home?</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          <div style={{ background: '#111f3a', borderRadius: 12, padding: 20, borderTop: '3px solid #3b82f6′ }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>🔵 Carrier</div>
            <ul style={{ color: '#94a3b8', lineHeight: 1.8, paddingLeft: 16, fontSize: 14 }}>
              <li>Premium brand, strong brand equity</li>
              <li>Excellent parts availability in DFW</li>
              <li>Infinity series: best zoning</li>
              <li>Avg price: <strong style={{ color: '#fff' }}>$6,800–9,000 installed</strong></li>
              <li>SEER2: 15.2–21</li>
              <li>10-year parts warranty</li>
            </ul>
          </div>
          <div style={{ background: '#111f3a', borderRadius: 12, padding: 20, borderTop: '3px solid #10b981′ }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>🟢 York</div>
            <ul style={{ color: '#94a3b8', lineHeight: 1.8, paddingLeft: 16, fontSize: 14 }}>
              <li>Best value in its tier</li>
              <li>Solid warranty: 10 yr parts, 1 yr labor</li>
              <li>Quieter than most at mid-range</li>
              <li>Avg price: <strong style={{ color: '#fff' }}>$5,500–7,500 installed</strong></li>
              <li>SEER2: 15.2–19</li>
              <li>JCI-backed (Johnson Controls)</li>
            </ul>
          </div>
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>📊 DFW Contractor Preference</div>
          <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>In DFW, Carrier has the largest authorized dealer network. York is popular with independent contractors for competitive pricing. Both are fully SEER2 compliant as of 2026 Texas regulations.</p>
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>🏠 Tell us about your situation</div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Home size:</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {['small', 'medium', 'large'].map(s => (
                <button key={s} onClick={() => setHomeSize(s)} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, textTransform: 'capitalize', background: homeSize === s ? '#F5E642′ : '#1e3a5f', color: homeSize === s ? '#0A1628' : '#fff' }}>{s}</button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Budget flexibility:</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {['tight', 'moderate', 'flexible'].map(b => (
                <button key={b} onClick={() => setBudget(b)} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, textTransform: 'capitalize', background: budget === b ? '#F5E642′ : '#1e3a5f', color: budget === b ? '#0A1628' : '#fff' }}>{b}</button>
              ))}
            </div>
          </div>
          {rec && (
            <div style={{ marginTop: 16, background: '#0d2240', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{rec.emoji} Recommendation: {rec.brand}</div>
              <p style={{ color: '#94a3b8', fontSize: 14 }}>{rec.reason}</p>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16, marginBottom: 6 }}>Compare real DFW quotes in minutes</div>
          <div style={{ color: '#1a2f4e', fontSize: 13 }}>ProLnk connects you with licensed Carrier and York dealers in your DFW zip code.</div>
        </div>
      </div>
    </div>
  );
}
