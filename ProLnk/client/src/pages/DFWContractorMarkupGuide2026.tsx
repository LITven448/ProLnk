import { useState } from 'react';

export default function DFWContractorMarkupGuide2026() {
  const [trade, setTrade] = useState<string | null>(null);

  const trades = [
    { id: 'hvac', label: 'HVAC', icon: '❄️' },
    { id: 'plumbing', label: 'Plumbing', icon: '🔧' },
    { id: 'electrical', label: 'Electrical', icon: '⚡' },
    { id: 'roofing', label: 'Roofing', icon: '🏠' },
  ];

  const breakdowns: Record<string, { label: string; pct: string; example: string; note: string }[]> = {
    hvac: [
      { label: 'Equipment Cost (wholesale)', pct: '35–45%', example: '$2,500 unit', note: 'Carrier, Trane, Lennox — contractor buys at dealer cost 20–40% below MSRP' },
      { label: 'Material Markup', pct: '20–40%', example: '+$700–1,000', note: 'Standard in DFW; Charter pros show this line item' },
      { label: 'Labor (install)', pct: '25–35%', example: '$900–1,400', note: 'HVAC installs 4–8 hrs; DFW techs $65–95/hr billable' },
      { label: 'Overhead (truck, insurance, tools)', pct: '15–20%', example: '$500–800', note: 'Commercial vehicle, $2M liability, EPA 608 cert, NATE cert all baked in' },
      { label: 'Profit Margin', pct: '10–20%', example: '$350–700', note: 'Healthy business needs margin; 10% is thin, 20%+ is transparent pricing' },
    ],
    plumbing: [
      { label: 'Parts Cost (wholesale)', pct: '20–30%', example: '$150–300', note: 'Ferguson, Hajoca supply at plumber pricing — you pay more at Home Depot' },
      { label: 'Material Markup', pct: '30–50%', example: '+$75–150', note: 'Plumbers mark up parts heavily as fixed overhead absorption' },
      { label: 'Labor (diagnosis + repair)', pct: '40–50%', example: '$200–500', note: 'DFW plumbers $85–125/hr; slab leak detection adds diagnostic fee' },
      { label: 'Overhead', pct: '15–20%', example: '$80–150', note: 'State license, bonding, commercial vehicle, dispatch system' },
      { label: 'Profit Margin', pct: '10–15%', example: '$60–120', note: 'Thin margins are a warning sign — can mean deferred maintenance on their own trucks' },
    ],
    electrical: [
      { label: 'Material Cost', pct: '25–35%', example: '$200–400', note: 'Wire, breakers, fixtures — Graybar or Rexel at contractor pricing' },
      { label: 'Material Markup', pct: '25–40%', example: '+$80–160', note: 'Panel upgrades have higher markup due to specialty parts' },
      { label: 'Labor', pct: '35–45%', example: '$300–600', note: 'Licensed Master Electrician in DFW: $90–140/hr; journeyman: $55–80/hr' },
      { label: 'Permit & Inspection', pct: '5–10%', example: '$75–200', note: 'City of Dallas/Fort Worth permit fees; required for panel upgrades and new circuits' },
      { label: 'Profit Margin', pct: '12–18%', example: '$100–200', note: 'Electrical has high liability — margin funds insurance and callbacks' },
    ],
    roofing: [
      { label: 'Material (shingles, underlayment)', pct: '30–40%', example: '$3,000–5,000', note: 'DFW average 30yr architectural shingles; hail-resistant class 4 add 15–20%' },
      { label: 'Material Markup', pct: '20–35%', example: '+$900–1,750', note: 'Post-hail season markups can reach 40% due to material scarcity' },
      { label: 'Labor (tear-off + install)', pct: '25–35%', example: '$2,500–4,000', note: 'DFW 2,000 sq ft average roof; 1.5–2 days crew of 4′ },
      { label: 'Overhead (insurance, dump fees)', pct: '10–15%', example: '$800–1,200', note: '$2M+ liability required; dumpster + haul-off $300–500 bundled' },
      { label: 'Profit Margin', pct: '10–20%', example: '$900–1,800', note: 'Storm chasers cut margin to win jobs, then cut corners — get 3 quotes' },
    ],
  };

  const selected = trade ? breakdowns[trade] : null;
  const tradeItem = trades.find(t => t.id === trade);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', padding: '32px 24px', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>📋</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '8px 0 4px' }}>DFW Contractor Markup Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Understanding what you're actually paying for — and why the cheapest bid can cost more</p>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 10, padding: 16, marginBottom: 32, borderLeft: '4px solid #ef4444′ }}>
          <p style={{ color: '#cbd5e1', margin: 0, fontSize: 14 }}>
            ⚠️ The lowest bid is often the most expensive: unlicensed contractors save on insurance, licensing, and permits — until something goes wrong and you pay twice.
          </p>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>Select a trade to see DFW pricing structure:</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
          {trades.map(t => (
            <button key={t.id} onClick={() => setTrade(t.id === trade ? null : t.id)}
              style={{ background: trade === t.id ? '#F5E642′ : '#1e2d45', border: '2px solid',
                borderColor: trade === t.id ? '#F5E642′ : '#2d3f5a', borderRadius: 10,
                padding: 20, cursor: 'pointer', textAlign: 'center',
                color: trade === t.id ? '#0A1628′ : '#fff' }}>
              <div style={{ fontSize: 32 }}>{t.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginTop: 8 }}>{t.label}</div>
            </button>
          ))}
        </div>

        {selected && tradeItem && (
          <div style={{ marginBottom: 32 }}>
            <h3 style={{ color: '#F5E642′ }}>{tradeItem.icon} {tradeItem.label} Pricing Breakdown</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {selected.map((row, i) => (
                <div key={i} style={{ background: '#1e2d45', borderRadius: 10, padding: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontWeight: 700, fontSize: 14, color: '#fff' }}>{row.label}</span>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <span style={{ background: '#0A1628', color: '#F5E642', borderRadius: 6, padding: '3px 8px', fontSize: 12, fontWeight: 700 }}>{row.pct}</span>
                      <span style={{ background: '#0A1628', color: '#94a3b8', borderRadius: 6, padding: '3px 8px', fontSize: 12 }}>{row.example}</span>
                    </div>
                  </div>
                  <p style={{ color: '#64748b', fontSize: 12, margin: 0 }}>{row.note}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: 32, background: '#1e2d45', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 32 }}>🔗</div>
          <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>ProLnk Charter pros provide itemized quotes — see every line item before you commit.</p>
          <p style={{ color: '#94a3b8', fontSize: 13 }}>Transparent pricing, licensed, insured, background-checked DFW contractors.</p>
        </div>
      </div>
    </div>
  );
}
