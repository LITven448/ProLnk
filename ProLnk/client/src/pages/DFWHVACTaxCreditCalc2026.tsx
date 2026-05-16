import { useState } from 'react';

export default function DFWHVACTaxCreditCalc2026() {
  const [heatPump, setHeatPump] = useState(false);
  const [heatPumpWH, setHeatPumpWH] = useState(false);
  const [insulation, setInsulation] = useState(false);

  const heatPumpCredit = heatPump ? 2000 : 0;
  const heatPumpWHCredit = heatPumpWH ? 2000 : 0;
  const insulationCredit = insulation ? 1200 : 0;
  const totalCredit = Math.min(heatPumpCredit + heatPumpWHCredit + insulationCredit, 3200);

  const upgrades = [
    {
      id: 'heatPump',
      label: '🌡️ Heat Pump (HVAC)',
      credit: '30% up to $2,000',
      maxCredit: 2000,
      description: 'Qualifies if SEER2 ≥ 15.2 and EER2 ≥ 11.7 (most modern units qualify)',
      enabled: heatPump,
      toggle: () => setHeatPump(!heatPump),
    },
    {
      id: 'heatPumpWH',
      label: '🚿 Heat Pump Water Heater',
      credit: '30% up to $2,000',
      maxCredit: 2000,
      description: 'Must be UEF ≥ 2.2. Rheem ProTerra and AO Smith models qualify easily.',
      enabled: heatPumpWH,
      toggle: () => setHeatPumpWH(!heatPumpWH),
    },
    {
      id: 'insulation',
      label: '🏠 Insulation & Air Sealing',
      credit: '30% up to $1,200/yr',
      maxCredit: 1200,
      description: 'Attic insulation, air sealing, weatherstripping all qualify. Big win in DFW heat.',
      enabled: insulation,
      toggle: () => setInsulation(!insulation),
    },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 24px', fontFamily: 'sans-serif', color: '#E8EAF0' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>DFW Home Cost Guide 2026</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, color: '#FFFFFF', margin: '0 0 8px' }}>🧮 HVAC Tax Credit Calculator</h1>
        <p style={{ color: '#8892A4', fontSize: 15, marginBottom: 8 }}>The Inflation Reduction Act (IRA) offers up to $3,200/yr in HVAC & efficiency credits. Select your planned upgrades.</p>
        <div style={{ background: '#1E2D45', borderRadius: 8, padding: '10px 14px', fontSize: 12, color: '#8892A4', marginBottom: 28 }}>⚠️ Annual cap: $3,200/yr total. Heat pump HVAC and water heater share a $2,000 sub-cap each. Consult a tax professional.</div>

        {upgrades.map((u) => (
          <div key={u.id} style={{ background: '#111D33', borderRadius: 12, padding: 20, marginBottom: 12, border: u.enabled ? '1px solid #F5E642' : '1px solid #1E2D45' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#FFFFFF', marginBottom: 4 }}>{u.label}</div>
                <div style={{ fontSize: 12, color: '#F5E642', marginBottom: 8 }}>{u.credit} — max ${u.maxCredit.toLocaleString()}</div>
                <div style={{ fontSize: 13, color: '#8892A4' }}>{u.description}</div>
              </div>
              <button onClick={u.toggle} style={{ marginLeft: 16, padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13, background: u.enabled ? '#F5E642' : '#1E2D45', color: u.enabled ? '#0A1628' : '#8892A4' }}>
                {u.enabled ? '✓ Added' : '+ Add'}
              </button>
            </div>
          </div>
        ))}

        <div style={{ background: '#111D33', borderRadius: 12, padding: 24, marginBottom: 20, border: '1px solid #F5E642' }}>
          <div style={{ fontSize: 13, color: '#8892A4', marginBottom: 4 }}>Estimated IRA Tax Credit (Year 1)</div>
          <div style={{ fontSize: 40, fontWeight: 800, color: '#F5E642' }}>${totalCredit.toLocaleString()}</div>
          {totalCredit === 0 && <div style={{ fontSize: 13, color: '#8892A4', marginTop: 4 }}>Select upgrades above to calculate your credit</div>}
        </div>

        <div style={{ background: '#111D33', borderRadius: 12, padding: 20, border: '1px solid #1E2D45' }}>
          <p style={{ fontSize: 13, color: '#8892A4', margin: 0 }}>💡 <strong style={{ color: '#FFFFFF' }}>ProLnk Tip:</strong> DFW HVAC installs average $6,000–$12,000. With IRA credits, your net cost drops significantly. Get competing quotes from ProLnk's verified HVAC pros.</p>
        </div>
      </div>
    </div>
  );
}
