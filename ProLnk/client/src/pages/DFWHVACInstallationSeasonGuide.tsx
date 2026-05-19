import { useState } from 'react';

const seasons = [
  {
    id: 'spring',
    label: '🌸 Spring (March–April)',
    rating: 'BEST',
    color: '#4ADE80',
    headline: 'The Golden Window for DFW HVAC Installation',
    why: [
      '✅ Temps 55–75°F — contractors can work efficiently without heat fatigue',
      '✅ Maximum tech availability before summer rush',
      '✅ Oncor and CoServ rebates ($300–$600) still active',
      '✅ Manufacturers\’ pre-season inventory is at its peak',
      '✅ You have 6–8 weeks to schedule without urgency',
      '✅ Negotiate hard — techs want to fill their spring calendar',
    ],
    timing: 'Target completion by May 15 to beat summer demand spike.',
    savings: 'Estimated savings vs. summer emergency: $1,500–$3,500',
  },
  {
    id: 'fall',
    label: '🍂 Fall (October–November)',
    rating: 'GOOD',
    color: '#F5E642',
    headline: 'Second-Best Window — Great for Strategic Planners',
    why: [
      '✅ Techs are post-summer and actively seeking work',
      '✅ Competitive pricing — contractors will negotiate',
      '✅ R-454B inventory likely improved vs. spring 2026',
      '✅ No urgency — you have months before next DFW summer',
      '⚠️ Fewer active rebate programs vs. spring',
      '⚠️ Some top contractors book into December quickly in October',
    ],
    timing: 'Book by mid-October for best selection and availability.',
    savings: 'Estimated savings vs. summer emergency: $800–$2,500',
  },
  {
    id: 'winter',
    label: '❄️ Winter (December–February)',
    rating: 'OKAY',
    color: '#94A3B8',
    headline: 'Viable But Limited — Watch the Weather',
    why: [
      '✅ Lowest demand period — maximum tech availability',
      '✅ Some contractors offer year-end closeout pricing',
      '⚠️ DFW freeze events can disrupt installation scheduling',
      '⚠️ Equipment shipping delays increase in winter months',
      '⚠️ Testing cooling performance is difficult in cold weather',
      '⚠️ Fewer rebate programs active Jan–Feb',
    ],
    timing: 'Avoid during freeze events — installation needs stable temps.',
    savings: 'Estimated savings vs. summer emergency: $500–$1,500',
  },
  {
    id: 'summer',
    label: '☀️ Summer (June–September)',
    rating: 'AVOID',
    color: '#F87171',
    headline: 'Emergency Only — Expect to Pay a Premium',
    why: [
      '🚨 Emergency premium: 20–40% above normal pricing',
      '🚨 Lead times: 2–7 days minimum for non-emergency installs',
      '🚨 Availability shortage — popular units may be on backorder',
      '🚨 Techs working 12-hour days — installation quality risks rise',
      '🚨 R-410A/R-454B stock depleted at peak demand',
      '🚨 You have zero negotiating leverage',
    ],
    timing: 'If your system fails in summer, move fast — every day without AC in DFW is a health risk.',
    savings: 'Cost premium vs. spring: $1,500–$4,000 more for same system',
  },
];

const situations: { id: string; label: string; seasonId: string; advice: string }[] = [
  {
    id: 'planning',
    label: '📋 My system is aging but still works — planning ahead',
    seasonId: 'spring',
    advice: 'Schedule a spring 2026 replacement now. If your system is 12+ years old, a spring install locks in the best pricing, best availability, and full rebate eligibility before summer stress reveals a failure.',
  },
  {
    id: 'new_home',
    label: '🏠 I just bought a DFW home with an older HVAC',
    seasonId: 'spring',
    advice: 'Get a professional assessment immediately. If the system is 10+ years old or uses R-22, prioritize a spring replacement. The cost of emergency replacement in July after a first-summer failure is dramatically higher.',
  },
  {
    id: 'post_summer',
    label: '😮‍💨 My system barely survived last summer — it\’s fall now',
    seasonId: 'fall',
    advice: 'This fall is ideal. Your system has already shown signs of stress. Don\’t risk another DFW summer on a failing unit. Fall pricing is excellent and techs are hungry for work after the summer rush.',
  },
  {
    id: 'emergency',
    label: '🚨 My system failed during a heat event',
    seasonId: 'summer',
    advice: 'Move fast. Call ProLnk to reach available DFW techs immediately. In a summer emergency, getting a working system within 48 hours outweighs optimal pricing. Get 2 quotes if possible but don\’t delay over 24 hours in extreme heat.',
  },
];

export default function DFWHVACInstallationSeasonGuide() {
  const [situation, setSituation] = useState<string | null>(null);
  const selected = situations.find((s) => s.id === situation);
  const recSeason = selected ? seasons.find((s) => s.id === selected.seasonId) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>PROLNK • DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>HVAC Installation Season<br />Guide for DFW</h1>
        <p style={{ color: '#94A3B8', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
          Timing your HVAC installation in DFW can save $2,000–$4,000 and weeks of stress. Spring is the clear winner. Summer is the emergency zone. Here's exactly why — and what to do in your situation.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 36 }}>
          {seasons.map((s) => (
            <div key={s.id} style={{ background: '#112240', borderRadius: 12, padding: '20px', borderLeft: `4px solid ${s.color}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div style={{ fontWeight: 800, fontSize: 16 }}>{s.label}</div>
                <div style={{ background: s.color, color: '#0A1628', fontSize: 11, fontWeight: 800, padding: '3px 10px', borderRadius: 20 }}>{s.rating}</div>
              </div>
              <div style={{ fontWeight: 600, color: '#CBD5E1', fontSize: 14, marginBottom: 10 }}>{s.headline}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 10 }}>
                {s.why.map((w, i) => <div key={i} style={{ fontSize: 13, color: '#94A3B8', lineHeight: 1.5 }}>{w}</div>)}
              </div>
              <div style={{ fontSize: 12, color: s.color, fontWeight: 700 }}>{s.savings}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>🎯 What's Your Situation?</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
          {situations.map((s) => (
            <button key={s.id} onClick={() => setSituation(s.id)} style={{
              background: situation === s.id ? '#F5E642′ : '#1E3A5F', color: situation === s.id ? '#0A1628' : '#fff',
              border: 'none', borderRadius: 8, padding: '14px 18px', textAlign: 'left', cursor: 'pointer', fontSize: 14, fontWeight: 600,
            }}>{s.label}</button>
          ))}
        </div>

        {selected && recSeason && (
          <div style={{ background: '#112240', borderRadius: 12, padding: '24px', marginBottom: 32, borderLeft: `4px solid ${recSeason.color}` }}>
            <div style={{ color: recSeason.color, fontWeight: 700, marginBottom: 6 }}>Recommended: {recSeason.label}</div>
            <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{selected.advice}</p>
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: 12, padding: '24px', textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 18, marginBottom: 8 }}>Get DFW HVAC Quotes This Week</div>
          <div style={{ color: '#0A1628', fontSize: 14 }}>ProLnk connects you with vetted DFW installation pros — free quotes, no pressure.</div>
        </div>
      </div>
    </div>
  );
}
