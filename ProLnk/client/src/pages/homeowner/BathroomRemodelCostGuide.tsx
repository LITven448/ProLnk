import { useState } from 'react';

const NAVY = '#0A1628';
const YELLOW = '#F5E642';
const MUTED = '#7A8BA8';
const BORDER = '#1E2E45';
const CARD = '#0D1F35';

const tiers = [
  { name: 'Refresh', range: '$3,000–8,000', description: 'New fixtures, paint, vanity, hardware', roi: '70%', time: '1–2 weeks', includes: ['New toilet', 'Vanity + faucet', 'Paint', 'Mirror/lighting', 'Towel bars'] },
  { name: 'Mid-Range', range: '$8,000–20,000', description: 'New tile, shower, tub, all fixtures', roi: '75%', time: '3–5 weeks', includes: ['Full tile shower', 'New tub', 'Vanity with storage', 'Double sink', 'New flooring', 'Updated lighting'] },
  { name: 'Full Gut', range: '$20,000–50,000', description: 'Layout change, custom tile, high-end finishes', roi: '65%', time: '6–10 weeks', includes: ['Custom shower + glass door', 'Soaking tub', 'Heated floors', 'Custom cabinetry', 'Steam shower', 'Spa lighting'] },
];

const rooms = [
  { type: 'Half Bath', sqft: 25, multiplier: 0.6 },
  { type: 'Full Bath (Hall)', sqft: 55, multiplier: 1.0 },
  { type: 'Master Bath', sqft: 100, multiplier: 1.5 },
  { type: 'Master Suite Spa', sqft: 150, multiplier: 2.2 },
];

export default function BathroomRemodelCostGuide() {
  const [tier, setTier] = useState(1);
  const [room, setRoom] = useState(1);
  const [laborPct, setLaborPct] = useState(45);
  const [activeTier, setActiveTier] = useState(0);

  const t = tiers[tier];
  const r = rooms[room];
  const [lo, hi] = t.range.replace(/\$/g,'').split('–').map(s => parseInt(s.replace(',','')));
  const adjLo = Math.round(lo * r.multiplier / 500) * 500;
  const adjHi = Math.round(hi * r.multiplier / 500) * 500;
  const avgCost = (adjLo + adjHi) / 2;
  const laborCost = Math.round(avgCost * laborPct / 100 / 100) * 100;
  const materialCost = avgCost - laborCost;

  return (
    <div style={{ background: NAVY, minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🚿</div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: YELLOW, margin: '0 0 12px' }}>DFW Bathroom Remodel Cost Guide 2026</h1>
          <p style={{ color: MUTED, fontSize: 18 }}>3-tier pricing, room-by-room adjustments, and an interactive cost estimator</p>
        </div>

        {/* DFW Context */}
        <div style={{ background: CARD, borderRadius: 16, border: `1px solid ${BORDER}`, padding: 24, marginBottom: 32, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px,1fr))', gap: 20 }}>
          {[
            { stat: '$12,000', label: 'DFW avg mid-range bath remodel' },
            { stat: '75%', label: 'ROI on DFW mid-range bath' },
            { stat: '8–12 wks', label: 'Typical DFW contractor waitlist' },
            { stat: '60%', label: 'DFW homeowners plan remodel in 2 yrs' },
          ].map(s => (
            <div key={s.stat} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: YELLOW }}>{s.stat}</div>
              <div style={{ color: MUTED, fontSize: 13, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tier Cards */}
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ color: YELLOW, fontSize: 22, fontWeight: 700 }}>📊 Remodel Tiers</h2>
          <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
            {tiers.map((t,i) => (
              <button key={t.name} onClick={() => setActiveTier(i)} style={{ flex: 1, padding: '10px 4px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: activeTier === i ? 700 : 400, background: activeTier === i ? YELLOW : CARD, color: activeTier === i ? NAVY : MUTED, fontSize: 14 }}>
                {t.name}
              </button>
            ))}
          </div>
          {(() => { const t = tiers[activeTier]; return (
            <div style={{ background: CARD, borderRadius: 16, border: `1px solid ${BORDER}`, padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: YELLOW }}>{t.range}</div>
                  <div style={{ color: MUTED }}>{t.description}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#4ADE80', fontWeight: 700 }}>ROI: {t.roi}</div>
                  <div style={{ color: MUTED, fontSize: 14 }}>Timeline: {t.time}</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px,1fr))', gap: 8 }}>
                {t.includes.map(item => (
                  <div key={item} style={{ background: 'rgba(245,230,66,0.08)', borderRadius: 8, padding: '8px 12px', color: '#E8EDF3', fontSize: 14 }}>
                    ✓ {item}
                  </div>
                ))}
              </div>
            </div>
          );})()}
        </div>

        {/* Cost Estimator */}
        <div style={{ background: CARD, borderRadius: 16, border: `1px solid ${BORDER}`, padding: 28, marginBottom: 32 }}>
          <h2 style={{ color: YELLOW, fontSize: 22, fontWeight: 700, marginTop: 0 }}>💰 Personalized Cost Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', color: MUTED, marginBottom: 8, fontSize: 14 }}>Remodel Tier</label>
              <select value={tier} onChange={e => setTier(+e.target.value)} style={{ width: '100%', background: NAVY, border: `1px solid ${BORDER}`, color: '#fff', padding: 10, borderRadius: 8 }}>
                {tiers.map((t,i) => <option key={t.name} value={i}>{t.name} ({t.range})</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: MUTED, marginBottom: 8, fontSize: 14 }}>Room Type</label>
              <select value={room} onChange={e => setRoom(+e.target.value)} style={{ width: '100%', background: NAVY, border: `1px solid ${BORDER}`, color: '#fff', padding: 10, borderRadius: 8 }}>
                {rooms.map((r,i) => <option key={r.type} value={i}>{r.type} (~{r.sqft} sq ft)</option>)}
              </select>
            </div>
            <div style={{ gridColumn: '1/-1′ }}>
              <label style={{ display: 'block', color: MUTED, marginBottom: 8, fontSize: 14 }}>Labor %: <strong style={{ color: '#fff' }}>{laborPct}%</strong> (DFW avg: 40–50%)</label>
              <input type="range" min={30} max={60} step={5} value={laborPct} onChange={e => setLaborPct(+e.target.value)} style={{ width: '100%', accentColor: YELLOW }} />
            </div>
          </div>
          <div style={{ background: NAVY, borderRadius: 12, padding: 24 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 16, textAlign: 'center' }}>
              <div><div style={{ color: MUTED, fontSize: 13 }}>Materials</div><div style={{ color: '#fff', fontWeight: 700, fontSize: 20 }}>${materialCost.toLocaleString()}</div></div>
              <div><div style={{ color: MUTED, fontSize: 13 }}>Labor</div><div style={{ color: '#fff', fontWeight: 700, fontSize: 20 }}>${laborCost.toLocaleString()}</div></div>
              <div><div style={{ color: MUTED, fontSize: 13 }}>Avg ROI</div><div style={{ color: '#4ADE80', fontWeight: 700, fontSize: 20 }}>{t.roi}</div></div>
            </div>
            <div style={{ textAlign: 'center', borderTop: `1px solid ${BORDER}`, paddingTop: 16 }}>
              <div style={{ color: MUTED, fontSize: 14, marginBottom: 4 }}>{r.type} — {t.name} Remodel</div>
              <div style={{ fontSize: 40, fontWeight: 800, color: YELLOW }}>${adjLo.toLocaleString()} – ${adjHi.toLocaleString()}</div>
              <div style={{ color: MUTED, fontSize: 13, marginTop: 8 }}>DFW contractor lead time: {t.time}</div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', background: CARD, borderRadius: 16, padding: 32, border: `1px solid ${BORDER}` }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🔧</div>
          <h3 style={{ color: '#fff', margin: '0 0 8px' }}>Find a vetted DFW bathroom remodeler</h3>
          <p style={{ color: MUTED, marginBottom: 20 }}>Get 3 quotes from ProLnk-verified contractors in your area. Background-checked, licensed, and rated.</p>
          <a href="/" style={{ background: YELLOW, color: NAVY, padding: '14px 32px', borderRadius: 50, fontWeight: 700, textDecoration: 'none', fontSize: 16 }}>Get Free Quotes →</a>
        </div>
      </div>
    </div>
  );
}
