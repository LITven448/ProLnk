import { useState } from 'react';

export default function DFWWindHailDeductibleGuide2026() {
  const [homeValue, setHomeValue] = useState(385000);
  const [deductiblePct, setDeductiblePct] = useState(2);
  const [hasIRRoof, setHasIRRoof] = useState(false);

  const outOfPocket = Math.round(homeValue * deductiblePct / 100);
  const roofDiscount = hasIRRoof ? Math.round(homeValue * 0.008 * 0.25) : 0;
  const basePremium = Math.round(homeValue / 1000 * 8.3);
  const adjPremium = Math.round(basePremium * (deductiblePct === 1 ? 1.12 : deductiblePct === 2 ? 1.0 : deductiblePct === 3 ? 0.93 : 0.87) - roofDiscount);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13 }}>⛈️ DFW WIND & HAIL DEDUCTIBLE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Wind & Hail Deductible Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>
          Texas policies have a <strong style={{ color: '#F5E642' }}>separate wind/hail deductible</strong> — 1-5% of dwelling value. On a $385K home that's $3,850–$19,250 out of pocket.
        </p>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>⚠️ How Texas Wind/Hail Deductibles Work</h2>
          {[
            { icon: '📄', title: 'Separate from your main deductible', desc: 'Your $2,500 standard deductible does NOT apply to wind/hail claims in Texas' },
            { icon: '📊', title: 'Percentage-based, not flat dollar', desc: '2% of $400K dwelling = $8,000 you pay before insurance kicks in' },
            { icon: '🌪️', title: 'Triggers: named storms + wind events', desc: 'Any wind damage, hail, or tornado — not just named hurricanes' },
            { icon: '🏘️', title: 'TDI regulates minimums', desc: 'Texas Dept of Insurance sets rules — insurers can go higher, not lower' },
          ].map(c => (
            <div key={c.title} style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 20 }}>{c.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{c.title}</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{c.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🧮 Out-of-Pocket Risk Calculator</h2>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, color: '#94a3b8' }}>Home Value: ${homeValue.toLocaleString()}</label>
            <input type="range" min={150000} max={800000} step={5000} value={homeValue}
              onChange={e => setHomeValue(+e.target.value)}
              style={{ width: '100%', accentColor: '#F5E642', marginTop: 6 }} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, color: '#94a3b8' }}>Wind/Hail Deductible: {deductiblePct}%</label>
            <input type="range" min={1} max={5} step={1} value={deductiblePct}
              onChange={e => setDeductiblePct(+e.target.value)}
              style={{ width: '100%', accentColor: '#F5E642', marginTop: 6 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748b' }}>
              <span>1% (Higher premium)</span><span>5% (Lower premium)</span>
            </div>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, cursor: 'pointer' }}>
            <input type="checkbox" checked={hasIRRoof} onChange={e => setHasIRRoof(e.target.checked)} style={{ accentColor: '#F5E642' }} />
            <span style={{ fontSize: 13 }}>Impact-resistant (Class 4) roof installed</span>
          </label>
          <div style={{ background: '#1a2f55', borderRadius: 8, padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 15 }}>
              <span style={{ color: '#94a3b8' }}>Your out-of-pocket risk</span>
              <span style={{ color: '#ef4444', fontWeight: 800, fontSize: 18 }}>${outOfPocket.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14 }}>
              <span style={{ color: '#94a3b8' }}>Est. annual premium</span>
              <span style={{ color: '#fff' }}>${adjPremium.toLocaleString()}/yr</span>
            </div>
            {hasIRRoof && <div style={{ color: '#22c55e', fontSize: 13 }}>✅ IR roof saving ~${roofDiscount.toLocaleString()}/yr</div>}
          </div>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#F5E642' }}>🛡️ Impact-Resistant Roof Discounts</h2>
          {['Class 4 IR roof can save 20-30% on wind/hail portion of premium','Must be UL 2218 tested — get documentation from contractor','Submit to insurer with roof certificate — discounts applied at renewal','Average $8-12K install cost; ROI in 5-7 years via insurance savings'].map(t => (
            <div key={t} style={{ display: 'flex', gap: 10, marginBottom: 10, fontSize: 13 }}>
              <span>✅</span><span style={{ color: '#94a3b8' }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
