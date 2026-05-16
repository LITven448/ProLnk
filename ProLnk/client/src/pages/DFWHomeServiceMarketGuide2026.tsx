import { useState } from 'react';

export default function DFWHomeServiceMarketGuide2026() {
  const [trade, setTrade] = useState('');
  const [marketData, setMarketData] = useState('');

  const tradeBreakdown = [
    { icon: '❄️', name: 'HVAC', share: 28, size: '$2.3B', avgJob: '$4,200', peak: 'Jun–Aug & Dec–Jan', color: '#3b82f6', id: 'hvac' },
    { icon: '🔧', name: 'Plumbing', share: 18, size: '$1.5B', avgJob: '$850', peak: 'Jan (freezes) & May', color: '#06b6d4', id: 'plumbing' },
    { icon: '🏚️', name: 'Foundation', share: 14, size: '$1.1B', avgJob: '$8,500', peak: 'Jul–Sep (drought)', color: '#f97316', id: 'foundation' },
    { icon: '🏠', name: 'Roofing', share: 12, size: '$984M', avgJob: '$12,000', peak: 'Apr–Jun (hail season)', color: '#ef4444', id: 'roofing' },
    { icon: '⚡', name: 'Electrical', share: 10, size: '$820M', avgJob: '$1,100', peak: 'Year-round steady', color: '#F5E642', id: 'electrical' },
    { icon: '🪟', name: 'Windows/Doors', share: 8, size: '$656M', avgJob: '$3,200', peak: 'Mar–May & Sep', color: '#a855f7', id: 'windows' },
    { icon: '🌿', name: 'Landscaping', share: 6, size: '#492M', avgJob: '$2,800', peak: 'Mar–Nov', color: '#22c55e', id: 'landscaping' },
    { icon: '🎨', name: 'Painting', share: 4, size: '$328M', avgJob: '$3,600', peak: 'Apr–Oct', color: '#ec4899', id: 'painting' },
  ];

  const opportunityMap: Record<string, string> = {
    hvac: 'HVAC is ProLnk's #1 category. DFW has 2.8M homes — at 1 tune-up/year, that is a $11.8B addressable market. ProLnk targets 0.5% = $59M/year opportunity.',
    plumbing: 'Plumbing is volume-driven. High frequency, lower ticket but consistent demand. ProLnk captures recurring homeowner relationships across freeze events and remodels.',
    foundation: 'Foundation has the highest average ticket in DFW at $8,500. Clay soil issues affect 40% of DFW homes. ProLnk's match algorithm prioritizes high-value structural leads.',
    roofing: 'Roofing spikes after every hail event — DFW averages 4 hail events/year. ProLnk's verified-only roster eliminates storm chasers and captures homeowner trust.',
    electrical: 'Electrical demand is steady year-round. EV charger installs are driving a new growth wave. ProLnk connects licensed master electricians to this emerging demand.',
    windows: 'Windows and doors trend with home improvement cycles. ProLnk targets renovation-stage homeowners via Home Health Vault data signals.',
    landscaping: 'Landscaping is the most competitive category. ProLnk differentiates by requiring insurance and licensing — filtering out the low-quality providers.',
    painting: 'Painting follows real estate cycles closely. ProLnk captures pre-listing and post-purchase paint jobs via MLS signal integration (roadmap).',
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>📊</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '12px 0 8px' }}>DFW Home Service Market 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>$8.2 billion per year across 7 DFW counties — and ProLnk is capturing it</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 20, flexWrap: 'wrap' }}>
            {[
              { label: 'Total Market', value: '$8.2B' },
              { label: 'DFW Homes', value: '2.8M' },
              { label: 'ProLnk Target', value: '$410M' },
            ].map((stat) => (
              <div key={stat.label} style={{ background: '#111e35', borderRadius: 10, padding: '14px 20px', textAlign: 'center' }}>
                <div style={{ color: '#F5E642', fontSize: 24, fontWeight: 900 }}>{stat.value}</div>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gap: 10, marginBottom: 40 }}>
          {tradeBreakdown.map((t) => (
            <div key={t.id} style={{ background: '#111e35', borderRadius: 10, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: 24, flexShrink: 0 }}>{t.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ color: t.color, fontWeight: 700, fontSize: 14 }}>{t.name}</span>
                  <span style={{ color: '#64748b', fontSize: 12 }}>{t.size} · avg {t.avgJob}</span>
                </div>
                <div style={{ background: '#0A1628', borderRadius: 4, height: 8 }}>
                  <div style={{ background: t.color, borderRadius: 4, height: 8, width: `${t.share * 3}%` }} />
                </div>
                <div style={{ color: '#64748b', fontSize: 11, marginTop: 4 }}>Peak: {t.peak} · {t.share}% of market</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🎯 ProLnk Opportunity by Trade</h2>
          <select value={trade} onChange={(e) => setTrade(e.target.value)}
            style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: 14, marginBottom: 14 }}>
            <option value="">Select a trade...</option>
            {tradeBreakdown.map((t) => <option key={t.id} value={t.id}>{t.icon} {t.name}</option>)}
          </select>
          <button onClick={() => setMarketData(opportunityMap[trade] || '')}
            style={{ padding: '10px 20px', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
            See Opportunity
          </button>
          {marketData && <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 16, color: '#e2e8f0', fontSize: 14 }}>{marketData}</div>}
        </div>

        <div style={{ textAlign: 'center', marginTop: 32, color: '#64748b', fontSize: 13 }}>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>ProLnk</span> — Built for the DFW market. Launching 2026.
        </div>
      </div>
    </div>
  );
}
