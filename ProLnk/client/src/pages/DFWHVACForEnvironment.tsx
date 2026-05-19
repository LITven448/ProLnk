import { useState } from 'react';

const envPlans: Record<string, Record<string, string[]>> = {
  heatpump: {
    replace: [
      '♻️ Heat Pump: 300% efficient vs. 95% for gas furnace — single best environmental choice in DFW',
      '⚡ DFW climate ideal for heat pumps: mild winters mean less backup heat strip use',
      '🌱 CO2 reduction: heat pump replaces both AC and furnace — ~40% less carbon than separate systems',
      '💰 Federal tax credit: 30% of heat pump cost (up to $2,000) under IRA through 2032',
      '📊 ROI: DFW heat pump typically pays back in 6–9 years vs. 12–15 years in colder climates',
      '🔧 Choose cold-climate heat pump (rated to 0°F) for the rare DFW freeze events',
    ],
    upgrade: [
      '♻️ Heat Pump upgrade: replacing gas furnace + old AC with heat pump is the highest-impact single action',
      '⚡ SEER2 18+ heat pump: DFW electricity cost parity with gas achieved at current energy prices',
      '🌱 Pair with solar: heat pump + solar panels = near-zero carbon home HVAC',
      '💰 Incentives stack: federal IRA credit + Oncor/TXU rebates + possible city incentives',
      '📊 Sizing matters: properly sized heat pump uses 20–30% less energy than oversized unit',
    ],
    tune: [
      '♻️ Heat Pump tuning: maximize efficiency of existing system before replacement',
      '⚡ Refrigerant check: low refrigerant reduces efficiency 15–25% and harms environment',
      '🌱 Duct sealing: leaky ducts waste 25–35% of conditioned air — fix before replacement decisions',
      '💰 Tune-up ROI: $150–300 tune-up often recovers 10–15% efficiency lost to maintenance neglect',
      '📊 SEER2 audit: know your current efficiency rating to understand replacement urgency',
    ],
  },
  seer: {
    replace: [
      '📈 High SEER2: minimum SEER2 15 for new DFW installs (federal standard as of 2023)',
      '⚡ SEER2 18 vs. SEER2 14: 22% less energy — saves $180–350/year in DFW electricity',
      '🌱 Variable-speed compressor: runs at partial load most of the time — better humidity control + less energy',
      '💰 SEER2 21+ systems: higher upfront cost but DFW runtime hours make payback realistic in 7–10 years',
      '📊 Two-stage vs. single-stage: two-stage removes more humidity in DFW humidity season',
      '🔧 Match air handler to SEER2 rating — mismatched systems lose 10–20% of rated efficiency',
    ],
    upgrade: [
      '📈 SEER2 upgrade: if current system is SEER 14 or below, efficiency gains are compelling',
      '⚡ SEER2 16+ threshold: where DFW electricity savings justify upgrade economics',
      '🌱 Proper sizing on upgrade: oversized system short-cycles, wasting energy and increasing humidity',
      '💰 Oncor rebates for high-efficiency: check current rebate program before purchase decision',
      '📊 Load calculation required: Manual J calculation ensures right-sized system for your DFW home',
    ],
    tune: [
      '📈 SEER2 maintenance: dirty systems lose 5–15% of rated efficiency annually',
      '⚡ Coil cleaning: fouled evaporator coil is #1 cause of efficiency loss in DFW dusty environment',
      '🌱 Filter maintenance: MERV-13 at right change interval doesn\’t sacrifice airflow efficiency',
      '💰 Annual tune-up maintains rated SEER2 — worth $200–300 to preserve system efficiency',
    ],
  },
  sizing: {
    replace: [
      '📐 Right-sizing: oversized AC in DFW is environmental waste — bigger is NOT better',
      '⚡ Oversized system short-cycles: uses 30–40% more energy and removes less humidity',
      '🌱 Manual J load calculation: mandatory for environmentally responsible HVAC replacement in DFW',
      '💰 Right-sized system lasts 2–4 years longer — embodied carbon of early replacement is significant',
      '📊 DFW rule of thumb: 400–600 sq ft per ton, adjusted for insulation, windows, and orientation',
      '🔧 Verify with energy audit before sizing — DFW homes with good insulation often over-sized by 0.5–1 ton',
    ],
    upgrade: [
      '📐 Sizing audit: if current system runs very short cycles, it is likely oversized',
      '⚡ Short-cycle detection: system running less than 10 min per cycle signals oversizing problem',
      '🌱 Duct sizing: undersized ducts with larger system wastes energy — fix ducts, not just equipment',
      '💰 Downsizing to correct load: counterintuitive but saves energy, money, and reduces carbon',
    ],
    tune: [
      '📐 Airflow balancing: proper CFM per ton is critical for efficiency and humidity control in DFW',
      '⚡ Static pressure test: high static = restricted airflow = wasted energy',
      '🌱 Blower motor optimization: ECM motors use 60–70% less energy than standard motors',
      '💰 ECM blower upgrade: $300–600 investment with 3–5 year payback in DFW',
    ],
  },
};

export default function DFWHVACForEnvironment() {
  const [priority, setPriority] = useState('');
  const [situation, setSituation] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (priority && situation) setSubmitted(true);
  };

  const plan = submitted && priority && situation && envPlans[priority]?.[situation];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <span style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW HVAC Guide</span>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '12px 0 8px', lineHeight: 1.2 }}>Eco-Friendly HVAC for DFW Homeowners 🌱</h1>
          <p style={{ color: '#94a3b8', fontSize: 17, lineHeight: 1.7 }}>
            Your HVAC system is responsible for 40–50% of your home's energy use in DFW. The right choices can cut your carbon footprint in half — and often pay for themselves through lower energy bills.
          </p>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: '24px', marginBottom: 24, borderLeft: '4px solid #F5E642′ }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 12px' }}>♻️ DFW Climate = Heat Pump Advantage</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>
            Heat pumps are 3x more efficient than gas furnaces because they move heat rather than create it. DFW's mild winters make heat pumps exceptionally effective here — your backup heat strips rarely engage. <strong style={{ color: '#F5E642' }}>Heat pump + solar panels = near-zero carbon HVAC.</strong>
          </p>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: '24px', marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>🌍 Environmental Impact Levers</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              { icon: '♻️', label: 'Heat Pump', desc: '3x more efficient than gas, replaces both AC and furnace — single highest-impact upgrade in DFW' },
              { icon: '📈', label: 'High SEER2 Rating', desc: 'SEER2 18 vs SEER2 14 uses 22% less electricity — significant over 15-year system lifespan in DFW' },
              { icon: '📐', label: 'Proper Sizing', desc: 'Oversized systems waste 30–40% more energy — right-sizing is free and often requires downsizing' },
              { icon: '🧪', label: 'Refrigerant Choice', desc: 'R-410A is being phased out; R-32 and R-454B have 67–78% lower global warming potential' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 2 }}>{item.label}</div>
                  <div style={{ color: '#94a3b8', fontSize: 14 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: '24px', marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>🌱 Get Your Eco-HVAC Recommendation</h2>
          <div style={{ display: 'grid', gap: 12, marginBottom: 16 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>ENVIRONMENTAL PRIORITY</label>
              <select value={priority} onChange={e => { setPriority(e.target.value); setSubmitted(false); }}
                style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, fontSize: 15 }}>
                <option value="">Select your priority...</option>
                <option value="heatpump">Switch to heat pump (eliminate gas)</option>
                <option value="seer">Maximize efficiency (high SEER2)</option>
                <option value="sizing">Right-size my system (reduce waste)</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>YOUR SITUATION</label>
              <select value={situation} onChange={e => { setSituation(e.target.value); setSubmitted(false); }}
                style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, fontSize: 15 }}>
                <option value="">Select situation...</option>
                <option value="replace">Ready to replace existing system</option>
                <option value="upgrade">System is 5–10 years old, considering upgrade</option>
                <option value="tune">Want to optimize current system first</option>
              </select>
            </div>
          </div>
          <button onClick={handleSubmit} style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '12px 24px', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>
            Generate My Eco-HVAC Recommendation →
          </button>
        </div>

        {plan && Array.isArray(plan) && (
          <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: '24px', marginBottom: 24 }}>
            <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>Your Eco-HVAC Recommendation</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
              {plan.map((item: string, i: number) => (
                <li key={i} style={{ color: '#cbd5e1', fontSize: 15, lineHeight: 1.5 }}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: '24px', textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', marginBottom: 16 }}>Get an eco-HVAC assessment from a certified DFW pro</p>
          <button style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '14px 32px', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
            Get Free Eco-HVAC Quote — DFW
          </button>
        </div>
      </div>
    </div>
  );
}
