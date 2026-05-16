import { useState } from 'react';

const MAINTENANCE_ITEMS = [
  { id: 'hvac_tune', label: 'HVAC Annual Tune-Up', cost: 150, avoidedCost: 8500, description: 'Prevents full system replacement' },
  { id: 'foundation_water', label: 'Foundation Watering System', cost: 360, avoidedCost: 12000, description: 'Prevents pier & beam failure' },
  { id: 'roof_inspect', label: 'Annual Roof Inspection', cost: 200, avoidedCost: 15000, description: 'Catches leaks before structural damage' },
  { id: 'gutter_clean', label: 'Gutter Cleaning (2x/year)', cost: 300, avoidedCost: 3500, description: 'Prevents fascia rot & foundation erosion' },
  { id: 'plumbing_check', label: 'Plumbing Annual Check', cost: 120, avoidedCost: 4200, description: 'Catches slow leaks early' },
  { id: 'pest_control', label: 'Annual Pest Control', cost: 480, avoidedCost: 6000, description: 'Prevents termite structural damage' },
  { id: 'ac_filter', label: 'Monthly AC Filter Change', cost: 96, avoidedCost: 1800, description: 'Extends compressor life 3-5 years' },
  { id: 'caulk_seal', label: 'Exterior Caulking & Sealing', cost: 200, avoidedCost: 2500, description: 'Prevents water intrusion' },
];

export default function DFWHomeMaintenanceROI() {
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [calculated, setCalculated] = useState(false);

  const toggle = (id: string) => setSelected(prev => ({ ...prev, [id]: !prev[id] }));

  const totalInvested = MAINTENANCE_ITEMS.filter(i => selected[i.id]).reduce((s, i) => s + i.cost, 0);
  const totalAvoided = MAINTENANCE_ITEMS.filter(i => selected[i.id]).reduce((s, i) => s + i.avoidedCost, 0);
  const netSavings = totalAvoided - totalInvested;
  const roi = totalInvested > 0 ? Math.round((netSavings / totalInvested) * 100) : 0;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>💰</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Maintenance ROI Tracker</h1>
          <p style={{ color: '#94a3b8', marginTop: 8 }}>See how DFW preventive maintenance stops catastrophic repair bills</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <p style={{ color: '#94a3b8', margin: '0 0 16px', fontSize: 14 }}>
            ✅ Select the maintenance tasks you perform each year:
          </p>
          <div style={{ display: 'grid', gap: 10 }}>
            {MAINTENANCE_ITEMS.map(item => (
              <div
                key={item.id}
                onClick={() => toggle(item.id)}
                style={{
                  background: selected[item.id] ? '#1a3a1a' : '#1a2f4e',
                  border: `2px solid ${selected[item.id] ? '#34d399' : '#1e3a5f'}`,
                  borderRadius: 10,
                  padding: '14px 16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, color: selected[item.id] ? '#34d399' : '#fff', fontSize: 15 }}>
                      {selected[item.id] ? '✅' : '⬜'} {item.label}
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 2 }}>{item.description}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 12 }}>
                    <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15 }}>${item.cost.toLocaleString()}/yr</div>
                    <div style={{ color: '#94a3b8', fontSize: 12 }}>avoids ${item.avoidedCost.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setCalculated(true)}
          disabled={Object.values(selected).every(v => !v)}
          style={{
            background: Object.values(selected).some(v => v) ? '#F5E642' : '#1e3a5f',
            color: '#0A1628',
            fontWeight: 700,
            fontSize: 16,
            border: 'none',
            borderRadius: 10,
            padding: '14px 32px',
            width: '100%',
            cursor: Object.values(selected).some(v => v) ? 'pointer' : 'not-allowed',
            marginBottom: 24,
          }}
        >
          Calculate My Maintenance ROI
        </button>

        {calculated && Object.values(selected).some(v => v) && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, borderLeft: '4px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', margin: '0 0 20px' }}>📈 Your DFW Maintenance ROI</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div style={{ background: '#1a2f4e', borderRadius: 8, padding: 16, textAlign: 'center' }}>
                <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>Annual Investment</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>${totalInvested.toLocaleString()}</div>
              </div>
              <div style={{ background: '#1a2f4e', borderRadius: 8, padding: 16, textAlign: 'center' }}>
                <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>Costs Avoided</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#34d399' }}>${totalAvoided.toLocaleString()}</div>
              </div>
              <div style={{ background: '#1a2f4e', borderRadius: 8, padding: 16, textAlign: 'center' }}>
                <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>ROI</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#F5E642' }}>{roi.toLocaleString()}%</div>
              </div>
            </div>
            <div style={{ background: '#0d2d1a', borderRadius: 8, padding: 14 }}>
              <span style={{ color: '#34d399', fontWeight: 700 }}>
                ✅ Net savings: ${netSavings.toLocaleString()} — every $1 spent saves ${Math.round(totalAvoided / totalInvested)} in DFW repair costs
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
