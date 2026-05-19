import { useState } from 'react';

const ZIP_DATA: Record<string, { city: string; demandScore: number; growth: string; trade: string[] }> = {
  '75009': { city: 'Celina', demandScore: 96, growth: 'explosive', trade: ['roofing', 'hvac', 'landscaping'] },
  '75078': { city: 'Prosper', demandScore: 94, growth: 'explosive', trade: ['hvac', 'landscaping', 'electrical'] },
  '75409': { city: 'Anna', demandScore: 88, growth: 'fast', trade: ['roofing', 'foundation', 'hvac'] },
  '75034': { city: 'Frisco', demandScore: 91, growth: 'fast', trade: ['hvac', 'electrical', 'landscaping'] },
  '75035': { city: 'Frisco N', demandScore: 89, growth: 'fast', trade: ['hvac', 'roofing', 'landscaping'] },
  '75069': { city: 'McKinney', demandScore: 85, growth: 'steady', trade: ['hvac', 'electrical', 'foundation'] },
  '75002': { city: 'Allen', demandScore: 83, growth: 'steady', trade: ['roofing', 'hvac', 'electrical'] },
  '75023': { city: 'Plano', demandScore: 80, growth: 'steady', trade: ['foundation', 'electrical', 'hvac'] },
};

const TRADE_RECS: Record<string, string> = {
  hvac: 'Expand to all DFW suburbs — universal demand, massive seasonal peaks in summer/winter.',
  roofing: 'Prioritize hail corridor: I-35 north through Allen, Plano, and Frisco. Follow storm events.',
  foundation: 'Focus on clay soil areas across most of DFW. Avoid sandy South Dallas corridors.',
  electrical: 'Target older housing stock in Garland, Mesquite, Irving, and Richardson.',
  landscaping: 'Follow growth corridors: Celina, Prosper, McKinney outskirts are highest-demand.',
};

export default function PartnerTerritoryGuide() {
  const [selectedZips, setSelectedZips] = useState<string[]>([]);
  const [trade, setTrade] = useState('hvac');

  function toggleZip(zip: string) {
    setSelectedZips(prev => prev.includes(zip) ? prev.filter(z => z !== zip) : [...prev, zip]);
  }

  const recommendations = Object.entries(ZIP_DATA)
    .filter(([zip, data]) => !selectedZips.includes(zip) && data.trade.includes(trade))
    .sort((a, b) => b[1].demandScore - a[1].demandScore)
    .slice(0, 4);

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', color: '#0f172a', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 8, fontSize: 13, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 }}>
          📍 Partner Resources
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12, lineHeight: 1.2, color: '#0f172a' }}>
          ProLnk Service Territory Guide
        </h1>
        <p style={{ fontSize: 20, color: '#0369a1', fontWeight: 600, marginBottom: 12 }}>
          Expand Strategically — Grow Lead Volume by 2.4x
        </p>
        <p style={{ fontSize: 16, color: '#475569', marginBottom: 40, maxWidth: 680, lineHeight: 1.7 }}>
          Partners with 10+ active ZIPs receive <strong>2.4x more leads</strong> than those with 3 or fewer. Expanding your territory is the fastest lever to grow lead volume without spending more on ads.
        </p>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, marginBottom: 32, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#0f172a' }}>🗺️ Territory Strategy Principles</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { icon: '1️⃣', title: 'Start with your core trade area', desc: 'Anchor on your primary ZIP + 3-5 adjacent ZIPs where you already have relationships.' },
              { icon: '2️⃣', title: 'Add high-demand, low-coverage ZIPs', desc: 'Coverage gaps show where demand exceeds partner supply — these convert faster.' },
              { icon: '3️⃣', title: 'Target growth corridors', desc: 'Celina, Prosper, and Anna are exploding — new homes, high incomes, immediate service needs.' },
              { icon: '4️⃣', title: 'Storm expansion', desc: 'After major hail or wind events, temporarily expand to adjacent affected ZIPs for 30-60 days.' },
            ].map((item, i) => (
              <div key={i} style={{ backgroundColor: '#f0f9ff', borderRadius: 8, padding: 16, border: '1px solid #bae6fd' }}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
                <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: 4, fontSize: 14 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, marginBottom: 32, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#0f172a' }}>⚡ DFW Expansion Recommendations by Trade</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {Object.entries(TRADE_RECS).map(([t, desc]) => (
              <div key={t} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: 14, backgroundColor: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: 700, color: '#0369a1', minWidth: 110, textTransform: 'capitalize', fontSize: 14 }}>{t}</div>
                <div style={{ color: '#475569', fontSize: 14, lineHeight: 1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: '#0f172a' }}>🧭 Interactive Territory Planner</h2>
          <p style={{ fontSize: 14, color: '#64748b', marginBottom: 20 }}>Select your current ZIPs and your primary trade to see expansion recommendations ranked by demand score.</p>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#64748b', marginBottom: 6 }}>Your Primary Trade</label>
            <select
              value={trade}
              onChange={e => setTrade(e.target.value)}
              style={{ padding: '10px 14px', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 8, color: '#0f172a', fontSize: 15 }}
            >
              {Object.keys(TRADE_RECS).map(t => (
                <option key={t} value={t} style={{ textTransform: 'capitalize' }}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: '#64748b', marginBottom: 10 }}>Select your current coverage ZIPs:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {Object.entries(ZIP_DATA).map(([zip, data]) => (
                <button
                  key={zip}
                  onClick={() => toggleZip(zip)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 20,
                    border: '1px solid',
                    fontSize: 13,
                    cursor: 'pointer',
                    backgroundColor: selectedZips.includes(zip) ? '#0369a1' : '#f0f9ff',
                    color: selectedZips.includes(zip) ? '#fff' : '#0369a1',
                    borderColor: selectedZips.includes(zip) ? '#0369a1' : '#bae6fd',
                    fontWeight: 600,
                  }}
                >
                  {zip} · {data.city}
                </button>
              ))}
            </div>
          </div>

          {selectedZips.length > 0 && (
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>
                📈 Top Expansion Recommendations for {trade.charAt(0).toUpperCase() + trade.slice(1)}:
              </div>
              {recommendations.length === 0 ? (
                <div style={{ color: '#64748b', fontSize: 14 }}>You're already covering the top ZIPs for your trade!</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {recommendations.map(([zip, data]) => (
                    <div key={zip} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 16px', backgroundColor: '#f0f9ff', borderRadius: 8, border: '1px solid #bae6fd' }}>
                      <div style={{ fontWeight: 800, color: '#0369a1', fontSize: 15, minWidth: 60 }}>{zip}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, color: '#0f172a', fontSize: 14 }}>{data.city}</div>
                        <div style={{ fontSize: 12, color: '#64748b', textTransform: 'capitalize' }}>Growth: {data.growth}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 22, fontWeight: 800, color: data.demandScore > 90 ? '#16a34a' : '#0369a1' }}>{data.demandScore}</div>
                        <div style={{ fontSize: 11, color: '#64748b' }}>demand score</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div style={{ marginTop: 24, padding: 16, backgroundColor: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <div style={{ fontSize: 13, color: '#166534', fontWeight: 600 }}>
              🛠️ To add ZIPs: Go to <strong>Service Area Manager</strong> in your dashboard → Add ZIP → Save coverage
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
