import { useState } from 'react';

export default function DFWTreeRemovalGuide() {
  const [height, setHeight] = useState('');
  const [diameter, setDiameter] = useState('');

  const getEstimate = () => {
    const h = parseInt(height);
    const d = parseInt(diameter);
    if (isNaN(h) || isNaN(d) || h <= 0 || d <= 0) return null;

    let low = 0, high = 0;
    if (h < 20) { low = 300; high = 700; }
    else if (h < 40) { low = 700; high = 1500; }
    else if (h < 60) { low = 1500; high = 3000; }
    else { low = 3000; high = 10000; }

    const stumpLow = d < 12 ? 75 : d < 24 ? 125 : 200;
    const stumpHigh = d < 12 ? 125 : d < 24 ? 200 : 250;

    const needsPermit = d >= 8;
    const permitCities = d >= 8 ? ['Dallas (Urban Forest Management)', 'Frisco (Tree Preservation Ordinance)', 'Plano (12″+ DBH approval required)'] : [];

    return { low, high, stumpLow, stumpHigh, needsPermit, permitCities, totalLow: low + stumpLow, totalHigh: high + stumpHigh };
  };

  const estimate = getEstimate();

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', fontFamily: "'Inter', sans-serif", color: '#f1f5f9′ }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '60px 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌳</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
            DFW Tree Removal Guide
          </h1>
          <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 560, margin: '0 auto' }}>
            When to remove, when to keep it, what it costs, and what permits you need in Dallas-Fort Worth.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          <div style={{ background: '#1e293b', borderRadius: 16, padding: 24, border: '1px solid #ef4444′ }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#f87171′ }}>
              ✂️ When to REMOVE
            </h2>
            {[
              { icon: '💀', text: 'Dead or more than 50% dead — immediate safety risk' },
              { icon: '↗️', text: 'Significant lean toward home (greater than 15 degrees)' },
              { icon: '⛈️', text: 'Major storm damage — broken leader or major structural branch' },
              { icon: '🍄', text: 'Disease spread risk — oak wilt, cotton root rot (contact with healthy trees = spread)' },
              { icon: '🏗️', text: 'Root damage to foundation, sewer lines, or major hardscape' },
            ].map(r => (
              <div key={r.text} style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>{r.icon}</span>
                <span style={{ color: '#cbd5e0', fontSize: 14, lineHeight: 1.5 }}>{r.text}</span>
              </div>
            ))}
          </div>
          <div style={{ background: '#1e293b', borderRadius: 16, padding: 24, border: '1px solid #22c55e' }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#4ade80′ }}>
              🛑 When NOT to Remove
            </h2>
            {[
              { icon: '🍂', text: 'Just because it drops leaves or seed pods — messy but normal' },
              { icon: '📏', text: 'Because it’s big — a large healthy tree adds $10,000–$30,000 in property value' },
              { icon: '😰', text: 'Just because you’re scared of it — get an ISA certified arborist assessment first' },
            ].map(r => (
              <div key={r.text} style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>{r.icon}</span>
                <span style={{ color: '#cbd5e0', fontSize: 14, lineHeight: 1.5 }}>{r.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginBottom: 32, border: '1px solid #f59e0b' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: '#fbbf24′ }}>
            📋 DFW Permit Requirements
          </h2>
          <p style={{ color: '#94a3b8', marginBottom: 16, lineHeight: 1.7 }}>
            Most DFW cities require permits for removing trees 8 inches or larger in diameter (measured at breast height, 4.5 feet from ground). Penalty for unpermitted removal: <strong style={{ color: '#f1f5f9′ }}>$500–$5,000</strong>. Always check before you cut.
          </p>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              { city: 'Dallas', rule: 'Dallas Urban Forest Management requires permit for "significant trees"' },
              { city: 'Frisco', rule: 'Tree Preservation Ordinance — permit required for removal of any "protected tree"' },
              { city: 'Plano', rule: 'City approval required for trees 12″ DBH or larger' },
              { city: 'Other DFW cities', rule: 'Verify with your city’s planning/development department before removal' },
            ].map(c => (
              <div key={c.city} style={{ display: 'flex', gap: 12, padding: 14, background: '#0f172a', borderRadius: 10 }}>
                <div style={{ fontWeight: 700, color: '#fbbf24', minWidth: 100, fontSize: 14 }}>{c.city}</div>
                <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.5 }}>{c.rule}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>
            💰 Cost Guide — DFW Tree Removal
          </h2>
          {[
            { size: 'Small tree (under 20 ft)', low: '$300', high: '$700′ },
            { size: 'Medium tree (20–40 ft)', low: '$700', high: '$1,500′ },
            { size: 'Large tree (40–60 ft)', low: '$1,500', high: '$3,000′ },
            { size: 'Very large tree (60 ft+)', low: '$3,000', high: '$10,000′ },
            { size: 'Emergency / storm-fallen', low: '$500', high: '$2,000′ },
            { size: 'Stump grinding (add-on)', low: '$75', high: '$250′ },
          ].map(c => (
            <div key={c.size} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #334155′ }}>
              <div style={{ color: '#cbd5e0', fontSize: 15 }}>{c.size}</div>
              <div style={{ fontWeight: 700, color: '#60a5fa', fontSize: 15 }}>{c.low} – {c.high}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>
            🌳 Interactive Cost Estimator
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: 14, marginBottom: 8 }}>Tree Height (feet)</label>
              <input
                type="number"
                value={height}
                onChange={e => setHeight(e.target.value)}
                placeholder="e.g. 45″
                style={{ width: '100%', padding: '14px 16px', borderRadius: 10, border: '2px solid #334155', background: '#0f172a', color: '#f1f5f9', fontSize: 16, boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: 14, marginBottom: 8 }}>Trunk Diameter at 4.5ft (inches)</label>
              <input
                type="number"
                value={diameter}
                onChange={e => setDiameter(e.target.value)}
                placeholder="e.g. 14″
                style={{ width: '100%', padding: '14px 16px', borderRadius: 10, border: '2px solid #334155', background: '#0f172a', color: '#f1f5f9', fontSize: 16, boxSizing: 'border-box' }}
              />
            </div>
          </div>

          {estimate && (
            <div style={{ background: '#0f172a', borderRadius: 12, padding: 24, border: '2px solid #3b82f6′ }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                <div style={{ textAlign: 'center', padding: 16, background: '#1e293b', borderRadius: 10 }}>
                  <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 4 }}>Removal</div>
                  <div style={{ fontWeight: 800, fontSize: 22, color: '#60a5fa' }}>${estimate.low.toLocaleString()}–${estimate.high.toLocaleString()}</div>
                </div>
                <div style={{ textAlign: 'center', padding: 16, background: '#1e293b', borderRadius: 10 }}>
                  <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 4 }}>+ Stump Grinding</div>
                  <div style={{ fontWeight: 800, fontSize: 22, color: '#60a5fa' }}>${estimate.stumpLow}–${estimate.stumpHigh}</div>
                </div>
              </div>
              <div style={{ textAlign: 'center', padding: 16, background: '#1e3a5f', borderRadius: 10, marginBottom: 16, border: '1px solid #3b82f6′ }}>
                <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 4 }}>Estimated Total</div>
                <div style={{ fontWeight: 800, fontSize: 28, color: '#60a5fa' }}>${estimate.totalLow.toLocaleString()}–${estimate.totalHigh.toLocaleString()}</div>
              </div>
              {estimate.needsPermit && (
                <div style={{ background: '#451a03', border: '1px solid #f59e0b', borderRadius: 10, padding: 16 }}>
                  <div style={{ fontWeight: 700, color: '#fbbf24', marginBottom: 8 }}>⚠️ Permit Likely Required</div>
                  <p style={{ color: '#fcd34d', fontSize: 14, margin: 0 }}>
                    Trunk is {diameter}" DBH — most DFW cities require permits for trees 8″+ diameter. Verify with your city before removal. Unpermitted removal: $500–$5,000 fine.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', background: '#14532d', borderRadius: 16, padding: 40, border: '1px solid #22c55e' }}>
          <h3 style={{ fontSize: 26, fontWeight: 700, marginBottom: 12 }}>
            Find a Certified Arborist Through TrustyPro
          </h3>
          <p style={{ color: '#86efac', marginBottom: 24 }}>
            Every TrustyPro tree contractor is ISA-certified, insured, and familiar with DFW permit requirements.
          </p>
          <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: '#22c55e', color: '#0f172a', fontWeight: 800, fontSize: 18, padding: '14px 40px', borderRadius: 50, textDecoration: 'none' }}>
            Join the Waitlist →
          </a>
        </div>

      </div>
    </div>
  );
}
