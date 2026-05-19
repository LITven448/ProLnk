import { useState } from 'react';

const issues = [
  { issue: 'Deferred Foundation Repair', impact: -40000, range: '$30K-$50K', icon: '🏗️', detail: 'Active cracks without repair docs trigger immediate discount. Fix + engineer letter recovers most of it.' },
  { issue: 'Outdated HVAC (10+ years)', impact: -15000, range: '$10K-$20K', icon: '❄️', detail: 'Buyers price in replacement cost. DFW heat makes HVAC a dealbreaker, not a negotiation point.' },
  { issue: 'Damaged/Aging Roof', impact: -18000, range: '$12K-$25K', icon: '🏠', detail: 'Instant red flag in inspections. Most buyers demand replacement or credit before close.' },
  { issue: 'Poor Curb Appeal', impact: -14000, range: '$8K-$20K', icon: '🌿', detail: 'Online listings die in the thumbnail. DFW buyers prescreen on Zillow photos before visiting.' },
  { issue: 'Outdated Electrical Panel', impact: -8000, range: '$5K-$12K', icon: '⚡', detail: 'Pre-2000 panels raise insurance flags. Some buyers can\’t get coverage, killing the deal.' },
  { issue: 'No Insulation / Poor Energy Score', impact: -6000, range: '$4K-$8K', icon: '🌡️', detail: 'DFW utility bills are high. Buyers factor monthly cost into their max offer.' },
  { issue: 'Outdated Kitchen (20+ years)', impact: -12000, range: '$8K-$16K', icon: '🍳', detail: 'Laminate counters and drop ceilings still visible in older DFW homes — priced in.' },
  { issue: 'HOA Violations / Liens', impact: -20000, range: '$10K-$30K+', icon: '📋', detail: 'Title issues and pending violations can make home unfinanceable without resolution.' },
];

export default function DFWHomeValueDecreasers2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const selectedIssue = issues.find(i => i.issue === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>DFW REAL ESTATE · 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>📉 DFW Home Value Decreasers 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.7 }}>
          In DFW, foundation issues alone can slash $30-50K off your sale price. Buyers in the 2026 market are
          inspection-savvy and priced-in on every deferred item. Know what hurts before you list.
        </p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 Condition Issue → Value Impact</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 16 }}>Select an issue to see estimated value impact:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
            {issues.map(i => (
              <button
                key={i.issue}
                onClick={() => setSelected(selected === i.issue ? null : i.issue)}
                style={{
                  background: selected === i.issue ? '#ef4444′ : '#1a3a5c',
                  color: '#fff', border: 'none', borderRadius: 8,
                  padding: '8px 12px', cursor: 'pointer', fontSize: 12, fontWeight: 600
                }}
              >{i.icon} {i.issue}</button>
            ))}
          </div>
          {selectedIssue && (
            <div style={{ background: '#1a3a5c', borderRadius: 10, padding: 16, borderLeft: '4px solid #ef4444′ }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#ef4444', marginBottom: 4 }}>
                -{Math.abs(selectedIssue.impact / 1000).toFixed(0)}K avg ({selectedIssue.range})
              </div>
              <div style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.6 }}>{selectedIssue.detail}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>💡 DFW 2026 Buyer Behavior</h2>
          {[
            'Buyers use inspection reports as negotiation weapons — not just safety checks',
            'Cash buyers in DFW skip appraisal but not inspection — they still demand credits',
            'Foundation issues in Dallas clay soil are expected — but undocumented ones = instant discount',
            '73% of DFW contracts in 2026 include inspection contingency (up from 61% in 2021)',
          ].map(t => (
            <div key={t} style={{ color: '#94a3b8', fontSize: 14, marginBottom: 10, paddingLeft: 12, borderLeft: '2px solid #ef4444′ }}>{t}</div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16 }}>🏠 Know Your Home's True Value Before Listing</div>
          <div style={{ color: '#1a3a5c', fontSize: 13, marginTop: 6 }}>ProLnk factors in condition and DFW-specific risk signals</div>
        </div>
      </div>
    </div>
  );
}