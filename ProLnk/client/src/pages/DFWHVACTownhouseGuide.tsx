import { useState } from 'react';

const layouts = ['2-story narrow', '3-story end unit', '2-story middle unit', 'Single-story attached'];
const issues = ['Top floor overheats', 'Uneven floor-to-floor temps', 'High bills vs neighbors', 'Duct routing problems'];

const advice: Record<string, Record<string, string>> = {
  '2-story narrow': {
    'Top floor overheats': 'Classic DFW townhome problem. Attic in a narrow 2-story absorbs intense west and south sun. Add attic insulation to R-38, then consider a mini-split head upstairs supplementing the central system.',
    'Uneven floor-to-floor temps': 'Install a 2-zone system: one zone per floor. In DFW summers, a single thermostat in a 2-story townhome means one floor is always wrong.',
    'High bills vs neighbors': 'Shared walls reduce your heat gain 30-40% vs detached homes. If bills are high, suspect duct leaks in attic or oversized equipment short-cycling.',
    'Duct routing problems': 'Narrow footprint limits duct paths. Flex duct through interior walls or mini-splits are both valid. Avoid attic duct runs without insulation wrap.',
  },
  '3-story end unit': {
    'Top floor overheats': 'End unit + top floor = maximum DFW sun exposure. Radiant barrier in roof deck plus mini-split on top floor is the most effective solution.',
    'Uneven floor-to-floor temps': '3-zone system is ideal: garage level, main floor, top floor. Each zone in a DFW 3-story can vary by 15-20°F in summer without proper zoning.',
    'High bills vs neighbors': 'End units have 2 exposed walls vs interior units. Expect 20-35% higher bills — verify actual bills against this benchmark before adding HVAC.',
    'Duct routing problems': '3-story duct runs are long and prone to heat gain in DFW attics. Mini-splits eliminate duct losses on upper floors entirely.',
  },
  '2-story middle unit': {
    'Top floor overheats': 'With shared side walls, roof is your primary heat source. R-38 attic insulation + radiant barrier addresses most DFW summer top-floor issues.',
    'Uneven floor-to-floor temps': 'Middle units have best thermal performance. If still uneven, check for supply/return imbalance — add return air on upper floor.',
    'High bills vs neighbors': 'Middle units should have lowest bills. If high, first check thermostat location — if on shaded ground floor, upper floor runs long cycles all summer.',
    'Duct routing problems': 'Middle unit duct routing is typically easiest. Interior wall chases are available on 3 sides. Standard residential duct design applies.',
  },
  'Single-story attached': {
    'Top floor overheats': 'No top floor concern, but DFW flat/low-pitch roofs transfer enormous heat. Attic insulation and radiant barrier are critical before HVAC sizing.',
    'Uneven floor-to-floor temps': 'Single-story townhomes should have even temps. If uneven, check for blocked vents or return air issues near attached-wall sections.',
    'High bills vs neighbors': 'Single-story attached has shared walls reducing load. Verify 1.5-2 ton sizing. Oversized units short-cycle badly in DFW single-story attached.',
    'Duct routing problems': 'Single-story has simplest duct routing. Attic-run ducts need full insulation wrap — DFW attics reach 140°F and duct gains are significant.',
  },
};

export default function DFWHVACTownhouseGuide() {
  const [layout, setLayout] = useState('');
  const [issue, setIssue] = useState('');

  const result = layout && issue ? advice[layout]?.[issue] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Townhomes in DFW</h1>
        <p style={{ color: '#94a3b8', fontSize: 15, marginBottom: 32, lineHeight: 1.7 }}>
          DFW townhomes are one of the fastest-growing housing types in the metroplex. Shared walls, multiple floors, and narrow footprints create HVAC challenges that don't exist in detached homes. The right solution depends on your specific layout and what you’re experiencing.
        </p>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '14px 18px', marginBottom: 28, fontSize: 14, fontWeight: 600 }}>
          🌡️ DFW Reality: A single-thermostat system in a 2-story DFW townhome creates a 15-20°F difference between floors on 105°F days. Zoning is the fix, not a bigger unit.
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🏙️ Get Your Recommendation</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>TOWNHOME LAYOUT</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {layouts.map(l => (
                <button key={l} onClick={() => setLayout(l)} style={{ padding: '8px 16px', borderRadius: 6, border: '2px solid', borderColor: layout === l ? '#F5E642′ : '#1e3a5f', background: layout === l ? '#F5E642' : ’transparent', color: layout === l ? '#0A1628′ : '#fff', cursor: ’pointer', fontWeight: 600, fontSize: 13 }}>{l}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>YOUR ISSUE</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {issues.map(i => (
                <button key={i} onClick={() => setIssue(i)} style={{ padding: '8px 16px', borderRadius: 6, border: '2px solid', borderColor: issue === i ? '#F5E642′ : '#1e3a5f', background: issue === i ? '#F5E642' : ’transparent', color: issue === i ? '#0A1628′ : '#fff', cursor: ’pointer', fontWeight: 600, fontSize: 13 }}>{i}</button>
              ))}
            </div>
          </div>
          {result && (
            <div style={{ background: '#1e3a5f', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>Recommendation</div>
              <div style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.7 }}>{result}</div>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {[['🏠', 'Shared Wall Advantage', "Every shared wall reduces your HVAC load. Middle units can downsize vs end units — don't overpay for capacity you don't need."],['🌬️', 'Zoning Solutions', 'Damper-based zoning or mini-split heads per floor eliminate the top/bottom temp war in DFW summers.'],['🔥', 'Attic Heat Source', 'DFW attics are 130-140°F in summer. Radiant barriers cut attic floor temp 20-30°F before HVAC starts.'],['📐', 'Duct Velocity', 'Narrow townhomes need careful duct sizing. Poor velocity means noise, poor distribution, and high static pressure.']].map(([icon, title, desc]) => (
            <div key={title} style={{ background: '#0f1f3d', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4, fontSize: 14 }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 10, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>📞 Get a ProLnk Quote</div>
          <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12 }}>Find DFW HVAC pros who understand townhome zoning and multi-floor comfort challenges.</div>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 6, padding: '10px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>Get Free Quotes →</button>
        </div>
      </div>
    </div>
  );
}
