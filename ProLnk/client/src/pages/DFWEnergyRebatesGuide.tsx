import { useState } from 'react';

type Improvement = {
  id: string;
  label: string;
  cost: number;
  oncorRebate: number;
  federalCredit: number;
  creditPct: number;
  category: string;
};

const IMPROVEMENTS: Improvement[] = [
  { id: 'hvac', label: '❄️ High-Efficiency HVAC (16+ SEER)', cost: 8500, oncorRebate: 500, federalCredit: 0, creditPct: 30, category: 'HVAC' },
  { id: 'heatpump', label: '🌡️ Heat Pump (replaces furnace)', cost: 12000, oncorRebate: 750, federalCredit: 0, creditPct: 30, category: 'HVAC' },
  { id: 'solar', label: '☀️ Solar Panels (10kW system)', cost: 28000, oncorRebate: 0, federalCredit: 0, creditPct: 30, category: 'Solar' },
  { id: 'insulation', label: '🧱 Attic Insulation (R-38+)', cost: 3500, oncorRebate: 200, federalCredit: 0, creditPct: 30, category: 'Insulation' },
  { id: 'windows', label: '🪟 Energy-Star Windows (per house)', cost: 12000, oncorRebate: 0, federalCredit: 0, creditPct: 30, category: 'Envelope' },
  { id: 'thermostat', label: '🌡️ Smart Thermostat (Ecobee/Nest)', cost: 250, oncorRebate: 85, federalCredit: 0, creditPct: 0, category: 'Controls' },
  { id: 'waterheater', label: '💧 Heat Pump Water Heater', cost: 1800, oncorRebate: 100, federalCredit: 0, creditPct: 30, category: 'Water Heating' },
  { id: 'evcharger', label: '🔌 EV Charger (Level 2)', cost: 1500, oncorRebate: 250, federalCredit: 0, creditPct: 30, category: 'EV' },
  { id: 'doorsealing', label: '🚪 Air Sealing & Weather Stripping', cost: 800, oncorRebate: 50, federalCredit: 0, creditPct: 30, category: 'Insulation' },
];

const IRA_CAP_BY_CATEGORY: Record<string, number> = {
  HVAC: 600, Insulation: 1200, 'Water Heating': 2000, Envelope: 600, EV: 1000, Solar: 999999, Controls: 0,
};

export default function DFWEnergyRebatesGuide() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const selectedItems = IMPROVEMENTS.filter(i => selected.includes(i.id));
  const totalCost = selectedItems.reduce((s, i) => s + i.cost, 0);
  const totalOncor = selectedItems.reduce((s, i) => s + i.oncorRebate, 0);

  const federalByCategory: Record<string, number> = {};
  selectedItems.forEach(item => {
    if (item.creditPct > 0) {
      const credit = item.cost * (item.creditPct / 100);
      const cap = IRA_CAP_BY_CATEGORY[item.category] ?? 0;
      const prev = federalByCategory[item.category] ?? 0;
      federalByCategory[item.category] = Math.min(prev + credit, cap === 999999 ? credit : cap);
    }
  });
  const totalFederal = Object.values(federalByCategory).reduce((s, v) => s + v, 0);
  const netCost = totalCost - totalOncor - totalFederal;

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#0A1628' }}>
      <div style={{ background: '#0A1628', color: '#fff', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>⚡</div>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700 }}>DFW Energy Rebates & Tax Credits 2026</h1>
        <p style={{ margin: '8px 0 0', color: '#CBD5E1', fontSize: 15 }}>
          Stack Oncor rebates + federal IRA credits — save 30-50% on efficiency upgrades
        </p>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 16px' }}>
        <div style={{ background: '#F5E642', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <h2 style={{ margin: '0 0 12px', fontSize: 18, color: '#0A1628' }}>💡 Program Overview</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 12 }}>
            {[
              { label: 'Oncor Smart Usage Rebates', value: 'Up to $750/item', note: 'Texas utility rebates' },
              { label: 'Federal IRA Tax Credits', value: 'Up to 30%', note: 'Inflation Reduction Act 2022-2032' },
              { label: 'Solar Tax Credit', value: '30% (no cap)', note: 'Full install + storage' },
              { label: 'TCEQ LoanStar', value: '3% financing', note: 'TX state low-interest loan' },
            ].map(s => (
              <div key={s.label} style={{ background: '#fff', borderRadius: 8, padding: '12px 14px' }}>
                <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: 1 }}>{s.label}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#0A1628', marginTop: 4 }}>{s.value}</div>
                <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>{s.note}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, background: '#fff', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#0A1628' }}>
            <strong>⚡ Stacking Rule:</strong> You can claim Oncor rebates AND federal tax credits on the same project. They are not mutually exclusive. Federal credits apply to the full installed cost before any rebates.
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: '24px', marginBottom: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
          <h2 style={{ margin: '0 0 8px', fontSize: 20 }}>🏗️ Select Your Planned Improvements</h2>
          <p style={{ margin: '0 0 16px', color: '#64748B', fontSize: 14 }}>Select all upgrades you're considering — we'll calculate your total available incentives.</p>
          <div style={{ display: 'grid', gap: 10 }}>
            {IMPROVEMENTS.map(item => {
              const isSelected = selected.includes(item.id);
              const iraCap = IRA_CAP_BY_CATEGORY[item.category] ?? 0;
              const fedEstimate = item.creditPct > 0 ? Math.min(item.cost * item.creditPct / 100, iraCap === 999999 ? item.cost * 0.3 : iraCap) : 0;
              return (
                <div key={item.id} onClick={() => toggle(item.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px', borderRadius: 10, cursor: 'pointer',
                    background: isSelected ? '#F0F9FF' : '#F8FAFC',
                    border: `2px solid ${isSelected ? '#0A1628' : '#E2E8F0'}` }}>
                  <div style={{ width: 22, height: 22, borderRadius: 4, background: isSelected ? '#0A1628' : '#fff', border: '2px solid #0A1628', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {isSelected && <span style={{ color: '#F5E642', fontSize: 14, fontWeight: 700 }}>✓</span>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{item.label}</div>
                    <div style={{ display: 'flex', gap: 12, marginTop: 4, flexWrap: 'wrap', fontSize: 12, color: '#64748B' }}>
                      <span>Cost: ${item.cost.toLocaleString()}</span>
                      {item.oncorRebate > 0 && <span style={{ color: '#16A34A' }}>Oncor: -${item.oncorRebate}</span>}
                      {item.creditPct > 0 && <span style={{ color: '#2563EB' }}>IRA {item.creditPct}%: -${fedEstimate.toFixed(0)}</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {selected.length > 0 && (
          <div style={{ background: '#fff', borderRadius: 12, padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
            <h2 style={{ margin: '0 0 16px', fontSize: 20 }}>💰 Your Total Incentives Summary</h2>
            {[
              { label: 'Total Project Cost', value: `$${totalCost.toLocaleString()}`, color: '#0A1628' },
              { label: 'Oncor Rebates (immediate check)', value: `-$${totalOncor.toLocaleString()}`, color: '#16A34A' },
              { label: 'Federal IRA Tax Credits (file with taxes)', value: `-$${totalFederal.toFixed(0)}`, color: '#2563EB' },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F1F5F9', fontSize: 15 }}>
                <span style={{ color: '#475569' }}>{row.label}</span>
                <span style={{ fontWeight: 700, color: row.color }}>{row.value}</span>
              </div>
            ))}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 20 }}>
              <div style={{ background: '#F5E642', borderRadius: 10, padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: '#64748B', marginBottom: 4 }}>NET COST AFTER INCENTIVES</div>
                <div style={{ fontSize: 26, fontWeight: 700 }}>${netCost.toLocaleString()}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 10, padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 4 }}>TOTAL SAVINGS</div>
                <div style={{ fontSize: 26, fontWeight: 700, color: '#F5E642' }}>${(totalOncor + totalFederal).toFixed(0)}</div>
              </div>
            </div>
            <div style={{ marginTop: 16, background: '#F0F9FF', borderRadius: 8, padding: '12px 16px', fontSize: 13, color: '#1E40AF' }}>
              <strong>📋 IRA Annual Limits:</strong> HVAC credits cap at $600/yr, insulation at $1,200/yr, heat pump water heaters at $2,000/yr. Solar has no dollar cap. These reset each tax year, so consider phasing large projects.
            </div>
          </div>
        )}

        <p style={{ textAlign: 'center', color: '#94A3B8', fontSize: 12, marginTop: 24 }}>
          Rebate amounts change periodically. Verify current Oncor rebates at oncor.com/rebates and federal credits at energystar.gov/taxcredits.
        </p>
      </div>
    </div>
  );
}
