import { useState } from 'react';

export default function KellerTexasProGuide2026() {
  const [selectedTrade, setSelectedTrade] = useState<string | null>(null);

  const trades = [
    {
      id: 'hvac',
      label: '❄️ HVAC',
      color: '#38BDF8',
      desc: 'Heating, cooling, air quality — Keller's #1 requested trade',
      stats: { avgTicket: '$4,200', monthlyLeads: '85–120', seasonPeak: 'May–Sep & Dec–Feb', competition: 'Medium' },
      tips: [
        '🏆 Keller leads the DFW suburbs in HVAC spend per household — avg $4,200/job',
        '🏘️ 2,800+ sq ft average home size drives full system replacements, not repairs',
        '🌡️ Summer peak (May–Sep) produces 85+ leads/month on ProLnk Keller zone',
        '⭐ 5-star reviews on ProLnk unlock Keller's premium placement — top 3 pros get 70% of leads',
        '💰 Dual-zone systems are standard ask — upsell rate is 60%+ in this market',
        '📱 Keller homeowners respond in <2 hours — fast callback = won job',
      ],
    },
    {
      id: 'foundation',
      label: '🏗️ Foundation',
      color: '#F5E642',
      desc: 'Pier and beam, slab repair — massive Keller market driven by clay soil',
      stats: { avgTicket: '$8,500', monthlyLeads: '40–65', seasonPeak: 'Mar–Jun & Sep–Nov', competition: 'Low' },
      tips: [
        '🌧️ Keller clay soil moves 2–3 inches annually — foundation demand is structural, not optional',
        '💵 Average ticket $8,500 — highest of any trade category in Keller ProLnk data',
        '📉 Only 12 licensed foundation pros serve 45,000+ Keller households — supply gap is huge',
        '🏠 1990s–2000s builds are hitting 25-year movement cycle simultaneously — surge incoming',
        '📋 ProLnk foundation leads in Keller convert at 68% — highest conversion of any trade',
        '🤝 Referral rate after completed job is 40% — one happy customer = 2.4 jobs',
      ],
    },
    {
      id: 'landscaping',
      label: '🌿 Landscaping & Pool',
      color: '#10B981',
      desc: 'Landscape design, pool service, irrigation — Keller affluence drives premium outdoor spend',
      stats: { avgTicket: '$12,000', monthlyLeads: '55–80', seasonPeak: 'Feb–May', competition: 'Medium-High' },
      tips: [
        '🏊 Keller has 1 pool per 4.2 households — among highest pool density in Texas',
        '🌱 Spring landscaping season (Feb–May) generates 80 leads/month — ramp up capacity',
        '💰 Full outdoor living projects average $45K+ — Keller buyers want outdoor kitchens, fire pits',
        '⭐ Pool renovation leads convert faster than new pool — target the 15-year-old pool stock',
        '🌳 Irrigation system upgrades spike after city water restrictions — be ready with smart systems',
        '📸 Before/after photos on ProLnk profile increase Keller lead volume by 3.2x',
      ],
    },
  ];

  const selected = trades.find(t => t.id === selectedTrade);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔨</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>Keller TX Pro Guide — ProLnk 2026</h1>
          <p style={{ color: '#94A3B8', fontSize: 16, margin: 0 }}>Market intelligence for pros serving Keller — select your trade to see opportunity data</p>
        </div>
        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, textAlign: 'center' }}>
            <div><div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642' }}>45K+</div><div style={{ color: '#94A3B8', fontSize: 13 }}>Keller Households</div></div>
            <div><div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642' }}>$135K</div><div style={{ color: '#94A3B8', fontSize: 13 }}>Median HH Income</div></div>
            <div><div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642' }}>94%</div><div style={{ color: '#94A3B8', fontSize: 13 }}>Homeownership Rate</div></div>
          </div>
        </div>
        <h2 style={{ color: '#F5E642', marginBottom: 16 }}>Select Your Trade</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
          {trades.map(t => (
            <button key={t.id} onClick={() => setSelectedTrade(t.id)} style={{ background: selectedTrade === t.id ? t.color : '#0D1F3C', border: `2px solid ${t.color}`, borderRadius: 12, padding: '20px 16px', cursor: 'pointer', color: selectedTrade === t.id ? '#0A1628' : '#fff', textAlign: 'left', transition: 'all 0.2s' }}>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{t.label}</div>
              <div style={{ fontSize: 13, opacity: 0.85 }}>{t.desc}</div>
            </button>
          ))}
        </div>
        {selected && (
          <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: selected.color, marginTop: 0 }}>{selected.label} — Keller Market Opportunity</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 20 }}>
              {Object.entries(selected.stats).map(([k, v]) => (
                <div key={k} style={{ background: '#162035', borderRadius: 8, padding: 14 }}>
                  <div style={{ color: '#94A3B8', fontSize: 12, textTransform: 'uppercase', marginBottom: 4 }}>{k.replace(/([A-Z])/g, ' $1').trim()}</div>
                  <div style={{ color: selected.color, fontWeight: 700, fontSize: 18 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gap: 12 }}>
              {selected.tips.map((tip, i) => (
                <div key={i} style={{ background: '#162035', borderRadius: 8, padding: '14px 18px', borderLeft: `4px solid ${selected.color}`, fontSize: 15 }}>{tip}</div>
              ))}
            </div>
            <div style={{ marginTop: 24, background: '#F5E64220', borderRadius: 8, padding: 16 }}>
              <p style={{ margin: 0, color: '#F5E642', fontWeight: 600 }}>🔗 Join ProLnk as a Keller-area pro and start receiving matched homeowner leads with average project value 40% above DFW baseline.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
