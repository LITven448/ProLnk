import { useState } from 'react';

const sections = [
  {
    emoji: '⚖️',
    title: 'What Is the Balance Point?',
    body: 'The balance point is the outdoor temperature at which your heat pump output exactly meets your home heating load. Above this temperature, the heat pump handles everything alone. Below it, auxiliary electric strips or gas heat must supplement. For most DFW homes, the balance point falls between 30°F and 38°F — a range DFW rarely enters.',
  },
  {
    emoji: '🌡️',
    title: 'Why DFW Makes Balance Point Less Critical',
    body: "Dallas-Fort Worth averages only 6–15 days per year below 30°F. Compare that to Chicago (90+ days) or Denver (75+ days). Because DFW so rarely dips to aux-heat territory, even a suboptimal balance point configuration costs DFW homeowners very little in auxiliary heating expense — maybe $30–80 for an entire winter.",
  },
  {
    emoji: '🏠',
    title: 'Home Factors That Shift Your Balance Point',
    body: '1) Insulation quality — well-insulated homes have lower heating loads, lowering the balance point. 2) Window area and quality — large or leaky windows raise heating load. 3) Home age — older DFW homes (pre-1990) often have higher loads. 4) Heat pump capacity — oversized units have lower effective balance points. 5) Duct leakage — leaky ducts effectively raise the balance point.',
  },
  {
    emoji: '📊',
    title: 'When to Actually Worry About Balance Point',
    body: 'Balance point matters most when: 1) Aux heat is running when outdoor temps are above 40°F (too high balance point — heat pump not keeping up). 2) Utility bills spike dramatically during mild cold (heat pump not engaging). 3) You are replacing an older system and sizing a new one. 4) You are adding a dual-fuel setup (heat pump + gas furnace).',
  },
];

type BalanceResult = { point: number; assessment: string; auxExpected: string; color: string };

function calcBalance(insulation: string, windows: string, homeAge: number): BalanceResult {
  let base = 33;
  if (insulation === 'poor') base += 5;
  if (insulation === 'excellent') base -= 4;
  if (windows === 'large-old') base += 4;
  if (windows === 'modern') base -= 2;
  if (homeAge > 1990) base -= 2;
  base = Math.max(20, Math.min(45, base));
  const color = base > 38 ? '#EF4444′ : base > 33 ? '#F59E0B' : '#10B981';
  const auxExpected = base <= 30 ? 'Aux heat expected fewer than 5 days/year in DFW' : base <= 38 ? 'Aux heat expected 8–15 days/year in DFW' : 'Aux heat may run 20+ days/year — consider system tuning';
  const assessment = base > 38 ? 'High balance point — heat pump efficiency loss. Review insulation and duct sealing.' : base <= 30 ? 'Excellent — heat pump handles nearly all DFW winters alone.' : 'Normal DFW balance point range. System performing as expected.';
  return { point: base, assessment, auxExpected, color };
}

export default function DFWHVACBalancingPointGuide() {
  const [insulation, setInsulation] = useState('average');
  const [windows, setWindows] = useState('average');
  const [homeAge, setHomeAge] = useState(2000);
  const result = calcBalance(insulation, windows, homeAge);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>⚖️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW Heat Pump Balance Point Guide</h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>The temperature that determines when auxiliary heat kicks in — and why DFW homeowners rarely need to worry</p>
        </div>
        {sections.map((s) => (
          <div key={s.title} style={{ background: '#0F2140', borderRadius: 12, padding: 20, marginBottom: 16, borderLeft: '4px solid #F5E642′ }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{s.emoji}</div>
            <h2 style={{ color: '#F5E642', fontSize: 17, fontWeight: 600, margin: '0 0 8px' }}>{s.title}</h2>
            <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{s.body}</p>
          </div>
        ))}
        <div style={{ background: '#0F2140', borderRadius: 12, padding: 24, border: '2px solid #F5E642′ }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 20px' }}>🏠 Balance Point Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Insulation Quality</label>
              <select value={insulation} onChange={e => setInsulation(e.target.value)} style={{ width: '100%', background: '#1E3A5F', color: '#E2E8F0', border: '1px solid #334155', borderRadius: 8, padding: '8px 12px', fontSize: 14 }}>
                <option value="excellent">Excellent (spray foam / new build)</option>
                <option value="average">Average (typical DFW home)</option>
                <option value="poor">Poor (minimal / old fiberglass)</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Windows</label>
              <select value={windows} onChange={e => setWindows(e.target.value)} style={{ width: '100%', background: '#1E3A5F', color: '#E2E8F0', border: '1px solid #334155', borderRadius: 8, padding: '8px 12px', fontSize: 14 }}>
                <option value="modern">Modern double/triple pane</option>
                <option value="average">Average single/double pane</option>
                <option value="large-old">Large or old leaky windows</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Year Built: {homeAge}</label>
              <input type="range" min={1960} max={2024} value={homeAge} onChange={e => setHomeAge(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642′ }} />
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, borderLeft: `4px solid ${result.color}` }}>
            <div style={{ color: result.color, fontWeight: 700, fontSize: 20, marginBottom: 4 }}>Estimated Balance Point: {result.point}°F</div>
            <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 6 }}>{result.auxExpected}</div>
            <div style={{ color: '#CBD5E1', fontSize: 14 }}>{result.assessment}</div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 28, background: '#0F2140', borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 28 }}>🔗</div>
          <p style={{ color: '#94A3B8', fontSize: 14, margin: '8px 0 12px' }}>Want a load calculation and balance point analysis for your DFW home? ProLnk connects you with certified HVAC engineers.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, border: 'none', borderRadius: 8, padding: '12px 28px', cursor: 'pointer' }}>Find a Pro via ProLnk →</button>
        </div>
      </div>
    </div>
  );
}
