import { useState } from 'react';

const homeAges = ['Pre-1990', '1990–2005', '2006–2015', '2016–present'];
const complaints = ['High energy bills vs similar homes', 'Hot / cold rooms that never balance', 'System runs constantly in summer', 'New HVAC but still not comfortable', 'Dusty rooms or poor air quality'];

const outcomes: Record<string, Record<string, { likelihood: string; recommendation: string; savings: string }>> = {
  'Pre-1990': {
    'High energy bills vs similar homes': { likelihood: '🔴 Very High — Pre-1990 DFW homes average 25–35% duct leakage. Mastic sealing was not standard practice.', recommendation: 'Schedule Duct Blaster test immediately. Pre-1990 DFW homes almost always benefit from sealing. Consider Aeroseal for inaccessible ducts.', savings: 'Expected savings: $400–$700/year on cooling costs after sealing.' },
    'Hot / cold rooms that never balance': { likelihood: '🔴 Very High — Pre-1990 systems frequently have leakage to outside that starves distant rooms.', recommendation: 'Duct Blaster test + room-by-room flow measurement. Sealing upstream leaks often resolves comfort issues without adding equipment.', savings: 'Comfort improvement is primary benefit; $300–$500/year energy savings secondary.' },
    'System runs constantly in summer': { likelihood: '🔴 Very High — Leaky ducts in 150°F DFW attics mean continuous heat gain into supply air. System can never keep up.', recommendation: 'Duct leakage test is essential diagnostic first step before any equipment replacement. Sealing often resolves "system too small" complaints.', savings: 'Expected: 30–40% reduction in runtime after sealing + insulation upgrade.' },
    'New HVAC but still not comfortable': { likelihood: '🔴 High — New equipment with old leaky ducts is a common DFW scenario. Equipment is sized for the load, but leaky ducts change the effective delivered capacity.', recommendation: 'Duct leakage test within 30 days of equipment install. Many DFW contractors replace equipment without addressing duct issues.', savings: 'Protect your equipment investment. Leaky ducts can cost $600–$1,000/year in wasted cooling.' },
    'Dusty rooms or poor air quality': { likelihood: '🔴 High — Return duct leakage in pre-1990 homes pulls attic dust and insulation particles into living space.', recommendation: 'Test return duct leakage specifically. Attic air is not filtered. Sealing return leaks improves both air quality and efficiency.', savings: 'Health benefit + $200–$400/year energy savings from reduced infiltration.' },
  },
  '1990–2005': {
    'High energy bills vs similar homes': { likelihood: '🟡 Moderate-High — 1990–2005 DFW homes average 15–25% duct leakage. Better than pre-1990 but still significant.', recommendation: 'Duct Blaster test recommended. Mastic sealing was inconsistently applied during this era.', savings: 'Expected savings: $250–$500/year if significant leakage confirmed.' },
    'Hot / cold rooms that never balance': { likelihood: '🟡 Moderate — Duct leakage is likely contributing. Check if rooms have been added or renovated since original duct installation.', recommendation: 'Duct test + flow hood measurement at each register. May be combination of leakage and undersized branches.', savings: '$200–$400/year energy savings + improved comfort.' },
    'System runs constantly in summer': { likelihood: '🟡 Moderate — Could be leakage, equipment undersizing, or insulation issues. Test ducts before replacing equipment.', recommendation: 'Duct leakage test + Manual J load calculation before any equipment decision.', savings: 'Testing cost ($250–$400) can prevent $8,000–$15,000 equipment mistake.' },
    'New HVAC but still not comfortable': { likelihood: '🟡 Moderate — Ducts from 1990–2005 may have deteriorated flex liner, reducing effective R-value.', recommendation: 'Test duct leakage and inspect flex duct condition. If flex liner is cracked or degraded, insulation performance is compromised.', savings: '$200–$500/year depending on findings.' },
    'Dusty rooms or poor air quality': { likelihood: '🟡 Moderate — Return leakage in this era is common. Attic and wall cavity infiltration through return gaps.', recommendation: 'Focus Duct Blaster test on return side leakage. Check return grille sizes and connections.', savings: 'Air quality improvement is primary benefit.' },
  },
  '2006–2015': {
    'High energy bills vs similar homes': { likelihood: '🟢 Low-Moderate — Post-2006 DFW homes built to better codes. Average leakage 10–15%. Still worth testing if bills are significantly higher than neighbors.', recommendation: 'Duct leakage test if bills are more than 20% above comparable homes. Check equipment sizing and thermostat settings first.', savings: 'Expected savings modest: $100–$250/year if leakage is found.' },
    'Hot / cold rooms that never balance': { likelihood: '🟡 Moderate — More likely to be airflow balancing or equipment issues than leakage in this era.', recommendation: 'Check register sizing, filter condition, and duct layout before leakage testing. Leakage test as secondary diagnostic.', savings: 'Variable depending on root cause.' },
    'System runs constantly in summer': { likelihood: '🟢 Low — More likely equipment undersizing, thermostat issues, or building envelope. Duct leakage less likely primary cause in this era.', recommendation: 'Check attic insulation and air sealing first. Manual J calculation to verify equipment sizing.', savings: 'Building envelope improvements likely higher ROI than duct work.' },
    'New HVAC but still not comfortable': { likelihood: '🟢 Low — Likely equipment sizing or refrigerant issue. Test duct leakage to rule out before focusing on equipment.', recommendation: 'Duct test to rule out. Then focus on equipment commissioning: refrigerant charge, airflow, thermostat calibration.', savings: 'Small if ducts are cause; significant if equipment is over/under-sized.' },
    'Dusty rooms or poor air quality': { likelihood: '🟡 Moderate — Check filtration first. MERV rating, filter change frequency, and humidity levels affect dust in DFW homes.', recommendation: 'Verify MERV-13 filtration and adequate return air sizing before duct testing.', savings: 'Air quality focused outcome.' },
  },
  '2016–present': {
    'High energy bills vs similar homes': { likelihood: '🟢 Low — Modern DFW homes should meet current code (<4% leakage to outside). If bills are high, check equipment sizing and thermostat schedules.', recommendation: 'Request copy of duct leakage test from builder or HVAC installer. Code requires testing at final inspection.', savings: 'If code-compliant, duct leakage is unlikely cause.' },
    'Hot / cold rooms that never balance': { likelihood: '🟢 Low for leakage — Likely load calculation or zoning issue. New homes may be improperly zoned.', recommendation: 'Check Manual J calculations and equipment zoning. Duct leakage test to rule out construction defect.', savings: 'Zoning solution vs duct fix — different cost structures.' },
    'System runs constantly in summer': { likelihood: '🟢 Low — New homes should be tight. Check thermostat settings, equipment sizing, and attic insulation depth.', recommendation: 'Rule out equipment and thermostat before duct testing. Request builder duct test results.', savings: 'Small expected from duct work on new construction.' },
    'New HVAC but still not comfortable': { likelihood: '🟢 Low for ducts — If system is brand new, focus on commissioning: refrigerant charge, static pressure, airflow measurements.', recommendation: 'Request commissioning report from HVAC installer. Duct leakage should be on that report.', savings: 'Commissioning correction is typically warranty work — $0 cost.' },
    'Dusty rooms or poor air quality': { likelihood: '🟢 Low duct leakage risk — Check filtration (MERV rating) and humidity control. New homes can have off-gassing from materials affecting air quality.', recommendation: 'Test indoor air quality. Verify MERV-13+ filtration. Consider ERV/HRV for fresh air exchange.', savings: 'Air quality improvement through filtration and ventilation.' },
  },
};

export default function DFWDuctLeakageTesting() {
  const [homeAge, setHomeAge] = useState('');
  const [complaint, setComplaint] = useState('');
  const result = homeAge && complaint ? outcomes[homeAge]?.[complaint] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>📊 Duct Leakage Testing Guide for DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24, lineHeight: 1.6 }}>
          DFW homes average 15–30% duct leakage. A Duct Blaster test measures exactly how much conditioned air you are losing — and where it is going. Use this guide to assess whether testing makes sense for your home.
        </p>

        <div style={{ background: '#132035', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🧪 How Duct Blaster Testing Works</h2>
          <div style={{ color: '#cbd5e1', lineHeight: 1.9 }}>
            <div>1. Technician seals all supply and return registers temporarily</div>
            <div>2. A calibrated fan pressurizes the duct system to 25 Pascals</div>
            <div>3. Fan airflow measured = total leakage in the duct system</div>
            <div>4. Two key numbers: <strong>leakage to outside</strong> (most important) and <strong>total leakage</strong></div>
            <div>5. DFW code target: less than 4% leakage to outside for new construction</div>
            <div style={{ marginTop: 8 }}>💰 <strong>Test cost: $250–$400</strong> | <strong>Aeroseal sealing: $1,500–$3,500</strong> | <strong>Manual sealing: $800–$2,000</strong></div>
          </div>
        </div>

        <div style={{ background: '#132035', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🔍 Should You Test?</h2>
          <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Home age</label>
          <select value={homeAge} onChange={e => setHomeAge(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', marginBottom: 16, fontSize: 15 }}>
            <option value=''>Select home age...</option>
            {homeAges.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
          <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Primary HVAC complaint</label>
          <select value={complaint} onChange={e => setComplaint(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
            <option value=''>Select complaint...</option>
            {complaints.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {result && (
          <div style={{ background: '#132035', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642' }}>
            <div style={{ marginBottom: 12 }}><strong>Leakage Likelihood:</strong> {result.likelihood}</div>
            <div style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: 12 }}><strong>Recommendation:</strong> {result.recommendation}</div>
            <div style={{ color: '#4ade80', fontWeight: 600 }}>📈 {result.savings}</div>
          </div>
        )}

        <div style={{ marginTop: 32, padding: '16px 20px', background: '#132035', borderRadius: 12 }}>
          <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>⚡ Find a ProLnk-verified DFW HVAC contractor who performs Duct Blaster testing. Compare quotes and get a free assessment.</p>
        </div>
      </div>
    </div>
  );
}
