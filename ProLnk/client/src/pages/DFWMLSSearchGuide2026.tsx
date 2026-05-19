import { useState } from 'react';

const priorities = ['Speed', 'Value Deals', 'School Districts', 'New Construction', 'Investment'];

const guides: Record<string, { platform: string; tip: string; setup: string[] }[]> = {
  Speed: [
    { platform: '🔔 Zillow Alerts', tip: 'Fastest new listing alerts — set to "Instant" for hot areas', setup: ['Go to Saved Searches → Edit → Email Frequency: Instant', 'Enable push notifications on Zillow app', 'Set price range 10% below max budget', 'Save search for each target zip code separately'] },
    { platform: '📱 Realtor.com App', tip: 'Good backup — sometimes shows listings before Zillow', setup: ['Enable "Notify me immediately" for new listings', 'Set up multiple micro-area searches vs one broad search', 'Check "Coming Soon" listings daily', 'Follow your agent to see their new listings first'] },
  ],
  'Value Deals': [
    { platform: '📊 HAR.com', tip: 'Texas-specific MLS direct feed — most accurate DOM data', setup: ['Create free account at har.com (Texas-only MLS access)', 'Filter by Days on Market: 30+ for negotiating leverage', 'Check Price Reduced filter weekly', 'Use Map Search to find underpriced pockets'] },
    { platform: '🏦 Foreclosure.com', tip: 'Pre-foreclosure and bank-owned listings in DFW', setup: ['Search by county: Dallas, Tarrant, Collin, Denton', 'Set up email alert for new pre-foreclosures', 'Cross-reference on HAR.com for market value', 'Note: many require cash or hard money'] },
  ],
  'School Districts': [
    { platform: '🏫 HAR.com School Filter', tip: 'Only platform with reliable DFW school district boundary filter', setup: ['Search → More Filters → School District', 'Select: Frisco ISD, Plano ISD, Carroll ISD, Highland Park', 'CRITICAL: verify attendance zone at district site — HAR can lag', 'Filter by Elementary School for most granular control'] },
    { platform: '📍 GreatSchools.org Map', tip: 'Overlay school ratings on neighborhood map', setup: ['Use map view to find high-rated school zones', 'Check both rating AND review trend (up or down)', 'Cross with Zillow for available homes in zone', 'Budget +10-15% premium for top-rated elementary zones'] },
  ],
  'New Construction': [
    { platform: '🏗️ NewHomeSource.com', tip: 'Best aggregator for DFW builder inventory', setup: ['Filter by DFW metro → then by city/submarket', 'Set move-in date range to find near-completion homes', 'Compare builder incentives (closing costs, upgrades)', 'Register directly with builders for VIP lists'] },
    { platform: '🏢 Builder Websites', tip: 'Direct registration gets early access to new phases', setup: ['Lennar, D.R. Horton, Meritage, Highland Homes all have portals', 'Register interest list for upcoming communities', 'Check builder quick-move-in (QMI) inventory for discounts', 'Ask builder rep about lot premiums before selecting'] },
  ],
  Investment: [
    { platform: '💰 Mashvisor', tip: 'Rental yield and Airbnb data overlaid on MLS listings', setup: ['Filter DFW by cash-on-cash return threshold', 'Compare traditional vs Airbnb rental projections', 'Check occupancy rate trends by neighborhood', 'Export to spreadsheet for deal analysis'] },
    { platform: '📈 PropStream', tip: 'Off-market and distressed property data for DFW', setup: ['Set up absentee owner filter by zip code', 'Stack filters: absentee + equity 40%+ + listed 0 days', 'Export leads for direct mail or skip trace', 'Cross with DCAD for accurate assessed vs market value'] },
  ],
};

export default function DFWMLSSearchGuide2026() {
  const [activePriority, setActivePriority] = useState('Speed');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif', color: '#E8EDF5′ }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>DFW MLS Search Guide 2026</h1>
          <p style={{ fontSize: 16, color: '#94A3B8', margin: 0 }}>Zillow vs Realtor.com vs HAR.com — how to set up searches that win in DFW's fast market.</p>
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 10, padding: '16px 20px', marginBottom: 28, border: '1px solid #2D3F5A' }}>
          <p style={{ margin: 0, fontSize: 14, color: '#CBD5E1', lineHeight: 1.6 }}>
            <span style={{ color: '#F5E642', fontWeight: 700 }}>MLS Status Key:</span> Active = available now | Pending = under contract | Backup = accepting backup offers | Active Option Contract = under option period (inspector phase) | Days on Market (DOM) resets if relisted — always ask for cumulative DOM.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32, justifyContent: 'center' }}>
          {priorities.map(p => (
            <button key={p} onClick={() => setActivePriority(p)} style={{ padding: '10px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14, background: activePriority === p ? '#F5E642′ : '#1E2D45', color: activePriority === p ? '#0A1628' : '#94A3B8', transition: ’all 0.2s' }}>{p}</button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {guides[activePriority].map((g, i) => (
            <div key={i} style={{ background: '#1E2D45', borderRadius: 12, padding: 24, border: '1px solid #2D3F5A' }}>
              <h3 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginTop: 0, marginBottom: 6 }}>{g.platform}</h3>
              <p style={{ color: '#94A3B8', fontSize: 14, margin: '0 0 16px' }}>{g.tip}</p>
              <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {g.setup.map((s, j) => (
                  <li key={j} style={{ fontSize: 14, color: '#CBD5E1', paddingLeft: 20, position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#F5E642′ }}>›</span>{s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}