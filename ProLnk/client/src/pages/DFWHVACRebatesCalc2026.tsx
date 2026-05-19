import { useState } from 'react';

const EQUIPMENT_TYPES = [
  { id: 'heatpump', label: '🌡️ Heat Pump (Air Source)', federal: 2000, oncor: 400, mfr: 200 },
  { id: 'central_ac', label: '❄️ Central AC (High Efficiency)', federal: 600, oncor: 150, mfr: 150 },
  { id: 'furnace', label: '🔥 Gas Furnace (High Efficiency)', federal: 600, oncor: 0, mfr: 100 },
  { id: 'heatpump_wh', label: '💧 Heat Pump Water Heater', federal: 2000, oncor: 200, mfr: 100 },
  { id: 'insulation', label: '🏠 Air Sealing + Insulation', federal: 1200, oncor: 100, mfr: 0 },
];

const COST_RANGES = [
  { label: 'Under $3,000', value: 2500 },
  { label: '$3,000 – $5,000', value: 4000 },
  { label: '$5,000 – $8,000', value: 6500 },
  { label: '$8,000 – $12,000', value: 10000 },
  { label: 'Over $12,000', value: 14000 },
];

export default function DFWHVACRebatesCalc2026() {
  const [equipmentId, setEquipmentId] = useState('');
  const [costValue, setCostValue] = useState(0);
  const [costLabel, setCostLabel] = useState('');

  const equipment = EQUIPMENT_TYPES.find(e => e.id === equipmentId);
  const totalRebate = equipment ? equipment.federal + equipment.oncor + equipment.mfr : 0;
  const netCost = costValue > 0 ? Math.max(0, costValue - totalRebate) : 0;
  const savingsPct = costValue > 0 ? Math.round((totalRebate / costValue) * 100) : 0;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>PROLNK · DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>2026 HVAC Rebates Calculator — DFW</h1>
        <p style={{ color: '#8899AA', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
          DFW homeowners can combine federal IRA tax credits, Oncor utility rebates, and manufacturer incentives. Calculate your total available savings before buying.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6, color: '#F5E642′ }}>📋 Federal IRA 25C Credit — 2026 Amounts</h2>
          <p style={{ color: '#8899AA', fontSize: 13, marginBottom: 0, lineHeight: 1.6 }}>30% of cost, capped per category. Heat pumps get the highest cap at $2,000. Standard efficiency equipment is capped at $600. These are nonrefundable tax credits — you must owe federal taxes to benefit.</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>Step 1: Equipment Type</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {EQUIPMENT_TYPES.map(e => (
              <button key={e.id} onClick={() => setEquipmentId(e.id)} style={{ background: equipmentId === e.id ? '#F5E642′ : '#162030', color: equipmentId === e.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '12px 16px', textAlign: 'left', cursor: 'pointer', fontWeight: equipmentId === e.id ? 700 : 400, fontSize: 14 }}>
                {e.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>Step 2: Project Cost</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {COST_RANGES.map(c => (
              <button key={c.label} onClick={() => { setCostValue(c.value); setCostLabel(c.label); }} style={{ background: costLabel === c.label ? '#F5E642′ : '#162030', color: costLabel === c.label ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '10px 16px', cursor: 'pointer', fontWeight: costLabel === c.label ? 700 : 400, fontSize: 13 }}>
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {equipment && costValue > 0 && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>💰 Your Rebate Breakdown</h2>
            {[
              ['Federal IRA 25C Credit', `$${equipment.federal.toLocaleString()}`, 'Apply when filing federal taxes (Form 5695)'],
              ['Oncor Utility Rebate', `$${equipment.oncor.toLocaleString()}`, 'Submit within 90 days of installation at Oncor.com'],
              ['Manufacturer Rebate (est.)', `$${equipment.mfr.toLocaleString()}`, 'Submit manufacturer rebate form within 30 days'],
            ].map(([label, amount, timing]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '12px 0', borderBottom: '1px solid #1e3050′ }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{label}</div>
                  <div style={{ fontSize: 12, color: '#8899AA', marginTop: 4 }}>{timing}</div>
                </div>
                <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>{amount}</div>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16 }}>
              <div>
                <div style={{ fontSize: 13, color: '#8899AA' }}>Total Savings Available</div>
                <div style={{ fontSize: 12, color: '#6688AA' }}>({savingsPct}% of project cost)</div>
              </div>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 26 }}>${totalRebate.toLocaleString()}</div>
            </div>
            <div style={{ background: '#162030', borderRadius: 10, padding: 16, marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: 14, color: '#8899AA' }}>Estimated Net Cost After Credits</div>
              <div style={{ fontWeight: 800, fontSize: 22 }}>${netCost.toLocaleString()}</div>
            </div>
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 18, marginBottom: 8 }}>ProLnk Techs Know Rebate Requirements</div>
          <div style={{ color: '#0A1628', fontSize: 14 }}>HVAC rebates require specific equipment ratings and installation documentation. ProLnk matches you with techs who install rebate-eligible equipment and provide the paperwork you need.</div>
        </div>
      </div>
    </div>
  );
}
