import { useState } from 'react';

const tiers = [
  {
    name: 'Charter', badge: '🏆', price: 149, color: '#F5E642', textColor: '#0A1628',
    locked: true, matchPriority: 'Tier 1 — Top of Queue', directCommission: '12% → 70%',
    networkOverride: '7% / 4% / 2% / 1%', subscriptionOverride: '12% / 6% / 3% / 1.5%',
    originationRights: '1.5%', slots: 'First 500 pros only',
    perks: [
      'Price locked forever — can never increase',
      'Highest match priority in your ZIP',
      'Maximum network override rates',
      'Founding member badge on profile',
      'Priority support queue',
    ],
  },
  {
    name: 'Founding', badge: '⭐', price: 199, color: '#3b82f6', textColor: '#fff',
    locked: false, matchPriority: 'Tier 2', directCommission: '10% → 65%',
    networkOverride: '5% / 3% / 1.5% / 0.75%', subscriptionOverride: '10% / 5% / 2.5% / 1.25%',
    originationRights: '1.25%', slots: 'Pros 501–2,125',
    perks: [
      'Founding member status',
      'Strong network override rates',
      'Competitive match priority',
      'Access to all 5 income streams',
      'Standard support',
    ],
  },
  {
    name: 'L3', badge: '🔵', price: 249, color: '#8b5cf6', textColor: '#fff',
    locked: false, matchPriority: 'Tier 3', directCommission: '8% → 58%',
    networkOverride: '4% / 2% / 1% / 0.5%', subscriptionOverride: '8% / 4% / 2% / 1%',
    originationRights: '1%', slots: 'Open enrollment',
    perks: [
      'Standard match access',
      'Moderate override rates',
      'All 5 income streams',
      'Standard support',
      'No founding status',
    ],
  },
  {
    name: 'L4', badge: '⚪', price: 299, color: '#6b7280', textColor: '#fff',
    locked: false, matchPriority: 'Tier 4 — Base Priority', directCommission: '6% → 50%',
    networkOverride: '3% / 1.5% / 0.75% / 0.375%', subscriptionOverride: '6% / 3% / 1.5% / 0.75%',
    originationRights: '0.75%', slots: 'Open enrollment',
    perks: [
      'Base match access',
      'Entry-level override rates',
      'All 5 income streams',
      'Standard support',
      'Highest monthly fee',
    ],
  },
];

const rows = [
  { label: 'Monthly Fee', key: 'price' },
  { label: 'Match Priority', key: 'matchPriority' },
  { label: 'Direct Commission', key: 'directCommission' },
  { label: 'Network Override (4 levels)', key: 'networkOverride' },
  { label: 'Subscription Override', key: 'subscriptionOverride' },
  { label: 'Origination Rights', key: 'originationRights' },
  { label: 'Price Locked?', key: 'locked' },
  { label: 'Availability', key: 'slots' },
];

function formatCell(key: string, val: any): string {
  if (key === 'price') return `$${val}/mo`;
  if (key === 'locked') return val ? '🔒 Yes — Forever' : '❌ No';
  return val;
}

export default function ProLnkTierComparisonPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedTier = tiers.find(t => t.name === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 13, color: '#F5E642', letterSpacing: 3 }}>TIER COMPARISON</div>
          <h1 style={{ fontSize: 34, fontWeight: 800, margin: '8px 0′ }}>Charter vs Founding vs L3 vs L4</h1>
          <p style={{ color: '#8899aa' }}>Side-by-side breakdown of every tier. Click any tier for the full picture.</p>
        </div>

        <div style={{ overflowX: 'auto', marginBottom: 32 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 640 }}>
            <thead>
              <tr>
                <td style={{ padding: '12px 16px', color: '#aaa', fontSize: 13 }}>Feature</td>
                {tiers.map(t => (
                  <th key={t.name} style={{ padding: '12px 16px', textAlign: 'center', cursor: 'pointer' }} onClick={() => setSelected(selected === t.name ? null : t.name)}>
                    <div style={{ background: t.color, color: t.textColor, borderRadius: 8, padding: '8px 12px', fontWeight: 700, fontSize: 15 }}>
                      {t.badge} {t.name}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} style={{ background: ri % 2 === 0 ? '#0d1f3c' : 'transparent' }}>
                  <td style={{ padding: '10px 16px', color: '#aaa', fontSize: 13 }}>{row.label}</td>
                  {tiers.map(t => (
                    <td key={t.name} style={{ padding: '10px 16px', textAlign: 'center', fontSize: 13, color: '#fff', fontWeight: row.key === 'price' ? 700 : 400 }}>
                      {formatCell(row.key, (t as any)[row.key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedTier && (
          <div style={{ background: '#0d1f3c', border: `2px solid ${selectedTier.color}`, borderRadius: 12, padding: 28 }}>
            <h2 style={{ margin: '0 0 16px', color: selectedTier.color }}>{selectedTier.badge} {selectedTier.name} Tier — Full Benefits</h2>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {selectedTier.perks.map((p, i) => (
                <li key={i} style={{ padding: '6px 0', color: '#ccc', fontSize: 14 }}>✅ {p}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ background: '#0f2d0f', border: '1px solid #F5E642', borderRadius: 12, padding: 20, marginTop: 28, textAlign: 'center' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 16 }}>🏆 Charter is the only tier that can never increase in price.</div>
          <div style={{ color: '#aaa', marginTop: 8, fontSize: 14 }}>Once 500 Charter spots fill, that tier closes forever. You move to Founding at $199/mo — 34% more expensive.</div>
        </div>
      </div>
    </div>
  );
}
