import { useState } from 'react';

export default function DFWHVACNewsBriefing2026() {
  const [situation, setSituation] = useState('');

  const stories = [
    { emoji: '🧪', title: 'R-410A Fully Phased Out — R-32 and R-454B Now Standard', body: 'As of January 1, 2026, new HVAC equipment can no longer be manufactured with R-410A refrigerant. All new systems now ship with lower-GWP R-32 or R-454B. If your system needs refrigerant, ensure your tech carries the correct type.', tag: 'refrigerant' },
    { emoji: '📐', title: 'SEER2 15 Minimum Now Enforced for DFW', body: 'The DOE\’s SEER2 15 efficiency minimum took effect for Texas in 2023 but enforcement is now consistent across distributors. Systems under SEER2 15 are no longer available for new installations in DFW — this raises baseline efficiency and long-term operating costs for all new replacements.', tag: 'efficiency' },
    { emoji: '📅', title: 'Get Tune-Up Now Before Summer Rush', body: 'Charter HVAC pros on ProLnk report good availability through May 2026. By mid-June, DFW booking windows typically extend 2–3 weeks. A pre-season tune-up now costs $80–150 and can prevent a $3,000+ emergency call in July.', tag: 'maintenance' },
    { emoji: '📈', title: 'Variable Speed Systems Seeing 40% Higher Demand', body: 'DFW contractors report variable speed (inverter-driven) system sales up 40% YoY in Q1 2026. Energy savings of 20–30% vs single-stage, combined with improved dehumidification in DFW summers, are driving the shift. Lead times on premium brands running 3–4 weeks.', tag: 'efficiency' },
    { emoji: '💰', title: 'Federal Tax Credit Still Available Through 2032', body: 'The Inflation Reduction Act Section 25C credit allows 30% of HVAC upgrade cost (up to $600) for qualifying equipment. Heat pumps qualify for up to $2,000. Consult your installer to confirm eligibility before purchase.', tag: 'rebates' },
  ];

  const filtered = situation
    ? stories.filter(s => s.tag === situation)
    : stories;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>❄️</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '12px 0 8px' }}>
            DFW HVAC News Briefing
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>May 2026 — What's happening in the DFW HVAC space</p>
        </div>

        <div style={{ backgroundColor: '#111d35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 15, marginBottom: 14 }}>🎯 Filter by Your Situation</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[['', 'All News'], ['maintenance', '🔧 Maintenance'], ['efficiency', '📊 Efficiency'], ['refrigerant', '🧪 Refrigerant'], ['rebates', '💰 Rebates']].map(([val, label]) => (
              <button key={val} onClick={() => setSituation(val)}
                style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                  backgroundColor: situation === val ? '#F5E642′ : '#1a2d50', color: situation === val ? '#0A1628' : '#94a3b8' }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
          {filtered.map((s, i) => (
            <div key={i} style={{ backgroundColor: '#111d35', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 28 }}>{s.emoji}</span>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{s.title}</h3>
                  <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{s.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1a2d50', borderRadius: 12, padding: 24, textAlign: 'center', border: '2px solid #F5E642′ }}>
          <div style={{ fontSize: 32 }}>🌡️</div>
          <p style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>Book a Charter HVAC Pro Before Summer Rush</p>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 16 }}>
            ProLnk Charter HVAC pros are verified, R-32/R-454B certified, and available now.
          </p>
          <a href='https://prolnk.io' style={{ display: 'inline-block', backgroundColor: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 15 }}>
            Join ProLnk Waitlist →
          </a>
        </div>

        <p style={{ textAlign: 'center', color: '#475569', fontSize: 12, marginTop: 20 }}>
          DFW HVAC News · May 2026 · ProLnk — Verified Pros, Documented Work
        </p>
      </div>
    </div>
  );
}