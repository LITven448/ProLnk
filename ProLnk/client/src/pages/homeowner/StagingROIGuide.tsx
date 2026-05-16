import { useState } from 'react';

const STAGING_OPTIONS = [
  { level: 'DIY Staging', cost: '$0–500', desc: 'Declutter, clean, rearrange. Works best in occupied homes.', roi: '$8,000–14,000' },
  { level: 'Staging Consultation', cost: '$300–800', desc: 'Stager walks through, tells you what to do. You execute.', roi: '$10,000–20,000' },
  { level: 'Full Occupied Staging', cost: '$1,000–3,000', desc: 'Stager edits your furniture, adds accessories.', roi: '$14,000–28,000' },
  { level: 'Full Vacant Staging', cost: '$2,500–8,000', desc: 'Stager brings furniture and accessories. Essential for empty homes.', roi: '$18,000–35,000' },
];

const ROI_ELEMENTS = [
  { item: 'Professional Cleaning', cost: '$150–300', impact: 'Significant perceived value increase — first impressions are everything.' },
  { item: 'Fresh Neutral Paint', cost: '$800–2,500', impact: 'Eliminates buyer objections about color choices.' },
  { item: 'Landscaping Cleanup', cost: '$200–600', impact: 'Curb appeal drives more showings — buyers decide from the driveway.' },
  { item: 'Decluttering', cost: '$0–300 (donate/storage)', impact: 'Makes spaces feel larger — buyers buy space, not stuff.' },
  { item: 'Warm White LED Bulbs', cost: '$50–100', impact: 'Transforms atmosphere — cool lighting kills perceived warmth.' },
];

const DFW_PRIORITIES = [
  'Remove all personal photos — DFW buyers are buying the home, not your life',
  'Update kitchen hardware if outdated — easy win at $100–300',
  'Stage your outdoor living area — DFW buyers LOVE outdoor space',
  'Ensure all window treatments are matching and clean',
];

function getStagingLevel(sqft: number, months: number) {
  if (months <= 1) return { level: 'Full Vacant Staging', costLow: 2500, costHigh: 8000, roiLow: 18000, roiHigh: 35000 };
  if (sqft > 3000) return { level: 'Full Occupied Staging', costLow: 1000, costHigh: 3000, roiLow: 14000, roiHigh: 28000 };
  if (sqft > 1800) return { level: 'Staging Consultation', costLow: 300, costHigh: 800, roiLow: 10000, roiHigh: 20000 };
  return { level: 'DIY Staging', costLow: 0, costHigh: 500, roiLow: 8000, roiHigh: 14000 };
}

export default function StagingROIGuide() {
  const [sqft, setSqft] = useState('');
  const [timeline, setTimeline] = useState('');
  const [result, setResult] = useState<ReturnType<typeof getStagingLevel> | null>(null);

  function calculate() {
    const s = parseInt(sqft);
    const t = parseInt(timeline);
    if (!s || !t) return;
    setResult(getStagingLevel(s, t));
  }

  return (
    <div style={{ background: '#0f0f0f', minHeight: '100vh', color: '#e5e5e5', fontFamily: 'system-ui, sans-serif', padding: '0 0 80px' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', padding: '60px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🏠</div>
        <h1 style={{ fontSize: 'clamp(24px, 5vw, 40px)', fontWeight: 800, color: '#fff', margin: '0 0 16px', lineHeight: 1.2 }}>
          Home Staging ROI Guide
        </h1>
        <p style={{ fontSize: 18, color: '#a0c4ff', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
          Every Dollar Spent Returns $2–4 at Closing
        </p>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
        {/* The Math */}
        <div style={{ background: '#1a1a2e', border: '1px solid #2a2a4e', borderRadius: 16, padding: 32, margin: '40px 0' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#a0c4ff', margin: '0 0 16px' }}>📊 The Staging Math</h2>
          <p style={{ color: '#ccc', lineHeight: 1.8, margin: 0 }}>
            Staged homes in DFW sell for <strong style={{ color: '#fff' }}>6% more</strong> and <strong style={{ color: '#fff' }}>73% faster</strong> than unstaged homes.
            Average staging cost: <strong style={{ color: '#4ade80' }}>$1,500–5,000</strong>.
            Average additional return: <strong style={{ color: '#4ade80' }}>$14,000–35,000</strong>.
          </p>
        </div>

        {/* Staging Options */}
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#fff', margin: '40px 0 20px' }}>Staging Options</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {STAGING_OPTIONS.map(opt => (
            <div key={opt.level} style={{ background: '#1a1a2e', border: '1px solid #2a2a4e', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#a0c4ff', marginBottom: 8 }}>{opt.level}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#4ade80', marginBottom: 8 }}>{opt.cost}</div>
              <div style={{ fontSize: 13, color: '#aaa', marginBottom: 12, lineHeight: 1.5 }}>{opt.desc}</div>
              <div style={{ fontSize: 13, color: '#fbbf24' }}>Projected return: {opt.roi}</div>
            </div>
          ))}
        </div>

        {/* ROI by Element */}
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#fff', margin: '48px 0 20px' }}>ROI by Staging Element</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {ROI_ELEMENTS.map(el => (
            <div key={el.item} style={{ background: '#1a1a2e', border: '1px solid #2a2a4e', borderRadius: 12, padding: 20, display: 'flex', gap: 20, alignItems: 'flex-start' }}>
              <div style={{ minWidth: 120, fontSize: 13, fontWeight: 700, color: '#4ade80' }}>{el.cost}</div>
              <div>
                <div style={{ fontWeight: 600, color: '#fff', marginBottom: 4 }}>{el.item}</div>
                <div style={{ fontSize: 13, color: '#aaa', lineHeight: 1.5 }}>{el.impact}</div>
              </div>
            </div>
          ))}
        </div>

        {/* DFW Priorities */}
        <div style={{ background: '#1a2a1a', border: '1px solid #2a4a2a', borderRadius: 16, padding: 32, margin: '40px 0' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#4ade80', margin: '0 0 16px' }}>🤠 DFW-Specific Staging Priorities</h2>
          <ul style={{ margin: 0, padding: '0 0 0 20px' }}>
            {DFW_PRIORITIES.map((p, i) => (
              <li key={i} style={{ color: '#ccc', lineHeight: 1.8, marginBottom: 8 }}>{p}</li>
            ))}
          </ul>
        </div>

        {/* Budget Planner */}
        <div style={{ background: '#16213e', border: '2px solid #0f3460', borderRadius: 16, padding: 32, margin: '40px 0' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>🧮 Staging Budget Planner</h2>
          <p style={{ color: '#aaa', margin: '0 0 24px', fontSize: 14 }}>Enter your home details to get a personalized staging recommendation.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#a0c4ff', marginBottom: 6 }}>Home Square Footage</label>
              <input
                type="number"
                value={sqft}
                onChange={e => setSqft(e.target.value)}
                placeholder="e.g. 2400"
                style={{ width: '100%', background: '#0f0f0f', border: '1px solid #333', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 15, boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#a0c4ff', marginBottom: 6 }}>Timeline to List (months)</label>
              <input
                type="number"
                value={timeline}
                onChange={e => setTimeline(e.target.value)}
                placeholder="e.g. 2"
                style={{ width: '100%', background: '#0f0f0f', border: '1px solid #333', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 15, boxSizing: 'border-box' }}
              />
            </div>
          </div>
          <button
            onClick={calculate}
            style={{ background: '#4ade80', color: '#000', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}
          >
            Get Recommendation
          </button>
          {result && (
            <div style={{ marginTop: 24, background: '#0f1a0f', border: '1px solid #4ade80', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#4ade80', marginBottom: 12 }}>✅ Recommended: {result.level}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <div style={{ fontSize: 12, color: '#aaa', marginBottom: 4 }}>ESTIMATED COST</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>${result.costLow.toLocaleString()}–${result.costHigh.toLocaleString()}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: '#aaa', marginBottom: 4 }}>PROJECTED ADDITIONAL RETURN</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#fbbf24' }}>${result.roiLow.toLocaleString()}–${result.roiHigh.toLocaleString()}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
