import { useState } from 'react';

const areas = [
  {
    name: 'Dallas (Oncor territory)',
    tdu: 'Oncor',
    tduDelivery: '$0.038–0.042/kWh',
    tduFixed: '$4.39/mo base',
    retailRate: '$0.11–0.14/kWh (all-in)',
    naturalGas: '$1.10–1.40/therm',
    monthlyHVAC: '$180–320 (summer peak)',
    notes: 'Oncor is the largest TDU in Texas. Retail rates are competitive — shop PowerToChoose.org. Time-of-use plans save $40-80/mo if HVAC runs mostly 9pm-6am.',
  },
  {
    name: 'Fort Worth (Oncor territory)',
    tdu: 'Oncor',
    tduDelivery: '$0.038–0.042/kWh',
    tduFixed: '$4.39/mo base',
    retailRate: '$0.11–0.14/kWh (all-in)',
    naturalGas: '$1.05–1.35/therm',
    monthlyHVAC: '$160–290 (summer peak)',
    notes: 'Same Oncor TDU as Dallas. Fort Worth sees slightly lower temps on average — HVAC runtime 5-10% less than Dallas core, meaningfully lower bills over full summer.',
  },
  {
    name: 'Plano/Frisco/McKinney (Oncor)',
    tdu: 'Oncor',
    tduDelivery: '$0.038–0.042/kWh',
    tduFixed: '$4.39/mo base',
    retailRate: '$0.11–0.14/kWh (all-in)',
    naturalGas: '$1.10–1.40/therm',
    monthlyHVAC: '$200–380 (summer peak)',
    notes: 'North Collin/Denton suburbs have larger homes — 2,800-4,500 sqft average vs 1,800 sqft closer to urban core. Larger sq footage drives higher HVAC bills despite slightly cooler temps.',
  },
  {
    name: 'Garland/Mesquite/Rowlett (Oncor)',
    tdu: 'Oncor',
    tduDelivery: '$0.038–0.042/kWh',
    tduFixed: '$4.39/mo base',
    retailRate: '$0.11–0.14/kWh (all-in)',
    naturalGas: '$1.10–1.45/therm',
    monthlyHVAC: '$175–310 (summer peak)',
    notes: 'Eastern suburbs often have older housing stock (1970s-1990s) with poor insulation — HVAC bills 15-25% higher than comparable newer construction. Insulation upgrades pay back in 3-5 years.',
  },
  {
    name: 'Denton (CoServ or Oncor)',
    tdu: 'CoServ or Oncor',
    tduDelivery: '$0.040–0.048/kWh',
    tduFixed: '$5.00–7.00/mo base',
    retailRate: '$0.11–0.15/kWh (all-in)',
    naturalGas: '$1.05–1.35/therm',
    monthlyHVAC: '$155–275 (summer peak)',
    notes: 'Some Denton areas served by CoServ (electric cooperative) — not deregulated. Fixed rates, no choice of provider. CoServ rates slightly higher delivery but total bills often competitive due to less markup.',
  },
];

export default function DFWHVACDFWUtility2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const area = selected !== null ? areas[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>DFW HVAC GUIDE 2026</div>
        <h1 style={{ color: '#fff', fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>DFW HVAC Utility Cost Guide 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: 15, margin: '0 0 32px' }}>
          Understanding DFW utility rates helps you estimate HVAC operating costs and make smarter equipment and rate-plan decisions. Texas is deregulated — your electricity provider choice matters.
        </p>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: '16px 20px', marginBottom: 24, border: '1px solid #334155' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>How Texas Electricity Rates Work</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { t: 'TDU (Delivery)', d: 'Oncor or CoServ — the poles and wires company. Not your choice. Fixed rate on your bill.' },
              { t: 'Retail Electric Provider', d: 'The company you choose. Shop at PowerToChoose.org for DFW competitive rates.' },
              { t: 'All-In Rate', d: 'TDU delivery + REP energy charge. This is what matters for HVAC cost calculations.' },
              { t: 'Time-of-Use Plans', d: 'Free nights/weekends plans can cut HVAC bills 25-40% if you shift heavy loads.' },
            ].map((r, i) => (
              <div key={i} style={{ background: '#0f172a', borderRadius: 8, padding: '10px 14px' }}>
                <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{r.t}</div>
                <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>{r.d}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>Select your DFW area for relevant utility rates and HVAC cost estimates:</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
            {areas.map((a, i) => (
              <button key={i} onClick={() => setSelected(i === selected ? null : i)}
                style={{ background: selected === i ? '#F5E642' : '#1e293b', color: selected === i ? '#0A1628' : '#cbd5e1', border: '1px solid ' + (selected === i ? '#F5E642' : '#334155'), borderRadius: 8, padding: '12px 14px', cursor: 'pointer', textAlign: 'left', fontSize: 13, fontWeight: 600 }}>
                {a.name}
              </button>
            ))}
          </div>
        </div>

        {area && (
          <div style={{ background: '#1e293b', borderRadius: 12, padding: 24, border: '1px solid #F5E642', marginBottom: 24 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginBottom: 16 }}>{area.name}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
              {[
                { l: 'TDU Provider', v: area.tdu },
                { l: 'TDU Delivery Rate', v: area.tduDelivery },
                { l: 'All-In Retail Rate', v: area.retailRate },
                { l: 'Natural Gas Rate', v: area.naturalGas },
                { l: 'Monthly HVAC Est.', v: area.monthlyHVAC },
                { l: 'TDU Fixed Charge', v: area.tduFixed },
              ].map((r, i) => (
                <div key={i} style={{ background: '#0f172a', borderRadius: 8, padding: '10px 14px' }}>
                  <div style={{ color: '#94a3b8', fontSize: 11 }}>{r.l}</div>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>{r.v}</div>
                </div>
              ))}
            </div>
            <div style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.6 }}>{area.notes}</div>
          </div>
        )}

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 20, border: '1px solid #334155' }}>
          <div style={{ color: '#fff', fontWeight: 700, marginBottom: 8 }}>Reduce HVAC Energy Costs in DFW</div>
          <p style={{ color: '#94a3b8', fontSize: 14, margin: 0, lineHeight: 1.6 }}>
            ProLnk HVAC pros can assess your home efficiency and recommend insulation, equipment upgrades, and smart thermostat strategies specific to your DFW neighborhood and utility plan.
          </p>
        </div>
      </div>
    </div>
  );
}
