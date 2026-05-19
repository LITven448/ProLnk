import { useState } from 'react';

export default function DFWRoofingNewsBriefing2026() {
  const [situation, setSituation] = useState('');

  const stories = [
    { emoji: '⛈️', title: 'April 2026 Hail Season Was Active — Check Your Roof Now', body: 'Multiple severe hail events hit north and east DFW in April 2026. Hailstones up to 2.5" were reported in Plano, Garland, and Rowlett. If you haven\’t inspected your roof since April, now is the time.', tag: 'hail' },
    { emoji: '🏷️', title: 'Class 4 Insurance Discounts Now 25–30% with Most DFW Carriers', body: 'Impact-resistant Class 4 roofing now qualifies for 25–30% premium discounts with most major Texas carriers — up from 20% in 2024. Upgrading at next replacement pays back within 4–6 years for most DFW homeowners.', tag: 'insurance' },
    { emoji: '🚨', title: 'Storm Chaser Activity High Post-April Storms', body: 'Out-of-state contractors flooded DFW after April storms. Watch for door-knockers asking for insurance assignment of benefits. Always verify license and local references before signing anything.', tag: 'safety' },
    { emoji: '📋', title: 'Supplement Claims Taking Longer with Major Carriers', body: 'State Farm and Allstate DFW adjusters are backed up 4–6 weeks post-storm. A licensed public adjuster or roofing contractor experienced with supplements can significantly speed the process.', tag: 'insurance' },
    { emoji: '✅', title: 'ProLnk Charter Roofers Busy But Available', body: 'Charter roofers on ProLnk are managing high post-storm demand but maintaining priority windows for platform-matched jobs. Get matched now before availability tightens further into summer.', tag: 'all' },
  ];

  const filtered = situation
    ? stories.filter(s => s.tag === situation || s.tag === 'all')
    : stories;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏠</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '12px 0 8px' }}>
            DFW Roofing News Briefing
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>May 2026 — What's happening in the DFW roofing space</p>
        </div>

        <div style={{ backgroundColor: '#ff4d4d22', border: '1px solid #ff4d4d', borderRadius: 12, padding: 16, marginBottom: 24, textAlign: 'center' }}>
          <span style={{ fontSize: 20 }}>⚠️</span>
          <strong style={{ color: '#ff6b6b', marginLeft: 8 }}>April 2026 hail alert — many DFW roofs have unreported damage</strong>
        </div>

        <div style={{ backgroundColor: '#111d35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 15, marginBottom: 14 }}>🎯 Filter by Your Situation</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[['', 'All News'], ['hail', '🌨️ Hail Damage'], ['insurance', '📄 Insurance Claim'], ['safety', '🚨 Contractor Safety']].map(([val, label]) => (
              <button key={val} onClick={() => setSituation(val)}
                style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                  backgroundColor: situation === val ? '#F5E642' : '#1a2d50', color: situation === val ? '#0A1628' : '#94a3b8' }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
          {filtered.map((s, i) => (
            <div key={i} style={{ backgroundColor: '#111d35', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642' }}>
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

        <div style={{ backgroundColor: '#1a2d50', borderRadius: 12, padding: 24, textAlign: 'center', border: '2px solid #F5E642' }}>
          <div style={{ fontSize: 32 }}>🛡️</div>
          <p style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>Get a Verified Charter Roofer — Not a Storm Chaser</p>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 16 }}>
            ProLnk verifies licenses, insurance, and local track record. No out-of-state storm chasers.
          </p>
          <a href='https://prolnk.io' style={{ display: 'inline-block', backgroundColor: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 15 }}>
            Join ProLnk Waitlist →
          </a>
        </div>

        <p style={{ textAlign: 'center', color: '#475569', fontSize: 12, marginTop: 20 }}>
          DFW Roofing News · May 2026 · ProLnk — Verified Pros, Documented Work
        </p>
      </div>
    </div>
  );
}