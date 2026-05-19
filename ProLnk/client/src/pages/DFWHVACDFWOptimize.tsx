import { useState } from 'react';

const situations = [
  { value: 'highbill', label: '💸 My electric bills are high in summer' },
  { value: 'humidity', label: '💧 My home feels humid even when cool' },
  { value: 'hotspots', label: '🌡️ Some rooms are hot, others cold' },
  { value: 'runslong', label: '⏱️ My AC runs constantly in July/August' },
  { value: 'newbuyer', label: '🏡 I just bought a DFW home' },
];

const responses: Record<string, { title: string; tips: string[] }> = {
  highbill: {
    title: 'DFW Bill Optimization',
    tips: [
      '🕐 Run your AC pre-cool strategy: drop to 74°F before noon, let it rise to 78°F by 3pm — avoids peak demand charges',
      '🌡️ 78°F is the DFW sweet spot — each degree lower adds ~8% to your bill in Texas heat',
      '🔄 Switch to MERV 8 filters (not 13+) — high-MERV filters restrict airflow in DFW heat, making systems work harder',
      '🌿 Attic insulation check — DFW attics hit 160°F in summer, undermining any AC efficiency gains',
      '📅 Schedule spring tune-up in March before May heat arrives — DFW contractors book out 3–4 weeks by April',
    ],
  },
  humidity: {
    title: 'DFW Humidity Control',
    tips: [
      '💧 DFW has a bipolar humidity problem: humid spring/fall, dry summer peaks — your system needs to handle both',
      '🌡️ If humidity > 55% RH when AC is running, your unit may be oversized (short-cycling) — oversizing is epidemic in DFW new construction',
      '🔧 Have a tech check your evaporator coil airflow — reducing fan speed 10–15% dramatically improves dehumidification in DFW\’s shoulder seasons',
      '🏠 Whole-home dehumidifier costs $1,200–$2,000 installed and transforms DFW spring comfort',
      '📐 Check ductwork for leaks — DFW attic duct leaks pull humid air in, negating your system\’s dehumidification',
    ],
  },
  hotspots: {
    title: 'DFW Zoning & Airflow',
    tips: [
      '🔧 DFW homes built before 2000 commonly have single-zone systems that can\’t handle the sun load variation — west-facing rooms get brutal afternoon heat',
      '🏠 Zone dampers cost $2,000–$4,000 and solve most hotspot problems in DFW two-story homes',
      '🌬️ Check supply vent sizing in problem rooms — undersized vents are the #1 cheap fix for hotspots',
      '🪟 Window film on west-facing windows reduces cooling load 30–40% in DFW afternoon — cheap fix before HVAC upgrades',
      '🌡️ Attic baffles and ridge venting reduce attic temperature, taking load off upper-floor rooms',
    ],
  },
  runslong: {
    title: 'DFW Constant-Run Causes',
    tips: [
      '🌡️ If it\’s 100°F+ outside and your AC runs 18+ hours, that can be normal for DFW — systems are sized for 95°F design temperature',
      '🔍 First check: is it maintaining temperature? Running long but hitting setpoint = normal DFW operation. Running long but NOT hitting setpoint = problem',
      '🧊 Low refrigerant is the #1 cause of constant-run in DFW — symptoms appear in July because that\’s when demand spikes',
      '🔄 Dirty evaporator coil is #2 — restricts heat transfer, makes system run 20–30% longer',
      '🏠 Duct leaks in DFW attic (160°F) can lose 20–30% of conditioned air — dramatically extends runtime',
    ],
  },
  newbuyer: {
    title: 'New DFW Homeowner Optimization',
    tips: [
      '📅 Book a full HVAC inspection in your first 30 days — DFW sellers frequently defer maintenance before listing',
      '📋 Request contractor service history from the seller — most DFW contractors keep 7–10 year records',
      '🔍 Check refrigerant type: R-22 systems are obsolete in DFW and cost 3–5x more to service',
      '📐 Verify system sizing: DFW standard is 400–500 sq ft per ton — oversized systems are common in new DFW construction',
      '🏦 Add your home to ProLnk\’s Home Health Vault on day one — start your DFW HVAC legacy from the beginning',
    ],
  },
};

export default function DFWHVACDFWOptimize() {
  const [situation, setSituation] = useState('');
  const [result, setResult] = useState<{ title: string; tips: string[] } | null>(null);

  function optimize() {
    if (!situation) { return; }
    setResult(responses[situation] || null);
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: 'white', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8, letterSpacing: 1 }}>PROLNK · DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW HVAC Optimization ⚡</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>
          National HVAC advice doesn't work in DFW. North Texas has a climate profile unlike anywhere else — extreme summer heat, volatile humidity swings, intense attic temperatures, and a construction stock that was optimized for cost, not efficiency. These are the DFW-specific tweaks that actually move the needle.
        </p>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🎯 What's Your DFW Situation?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {situations.map(opt => (
              <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                <input type="radio" name="situation" value={opt.value} onChange={() => setSituation(opt.value)}
                  style={{ accentColor: '#F5E642', width: 18, height: 18 }} />
                <span style={{ color: '#cbd5e1', fontSize: 15 }}>{opt.label}</span>
              </label>
            ))}
          </div>
          <button onClick={optimize}
            style={{ marginTop: 20, background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Get DFW-Specific Strategies →
          </button>
        </div>

        {result && (
          <div style={{ background: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>{result.title}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {result.tips.map((tip, i) => (
                <div key={i} style={{ background: '#1e3a5f', borderRadius: 8, padding: 14, color: '#e2e8f0', lineHeight: 1.6, fontSize: 15 }}>
                  {tip}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>🔧 Need a DFW HVAC Pro?</div>
          <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>ProLnk matches DFW homeowners with vetted local HVAC specialists — contractors who know north Texas conditions, not generic national technicians. Join the waitlist at prolnk.io.</div>
        </div>
      </div>
    </div>
  );
}
