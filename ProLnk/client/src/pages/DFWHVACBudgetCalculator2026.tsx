import { useState } from 'react';

type SeerTier = '14′ | '16' | '18' | '20+';
type SizeTier = 'small' | 'medium' | 'large';

const EQUIPMENT_COST: Record<SeerTier, Record<SizeTier, number>> = {
  '14': { small: 3200, medium: 4000, large: 5200 },
  '16': { small: 3900, medium: 4800, large: 6100 },
  '18': { small: 4600, medium: 5700, large: 7200 },
  '20+': { small: 5500, medium: 6800, large: 8500 },
};
const LABOR_COST: Record<SizeTier, number> = { small: 1400, medium: 1700, large: 2100 };
const MATERIALS_COST = 650;
const PERMIT_COST = 175;
const DISPOSAL_COST = 200;
const TAX_CREDIT_RATE = 0.30;
const TAX_CREDIT_MAX = 2000;
const FINANCING_RATE = 0.0699;
const FINANCING_MONTHS = 60;

export default function DFWHVACBudgetCalculator2026() {
  const [seerTier, setSeerTier] = useState<SeerTier>('16');
  const [sizeTier, setSizeTier] = useState<SizeTier>('medium');
  const [result, setResult] = useState<null | {
    equipment: number;
    labor: number;
    materials: number;
    permit: number;
    disposal: number;
    subtotal: number;
    taxCredit: number;
    netTotal: number;
    monthlyPayment: number;
  }>(null);

  function calculate() {
    const equipment = EQUIPMENT_COST[seerTier][sizeTier];
    const labor = LABOR_COST[sizeTier];
    const subtotal = equipment + labor + MATERIALS_COST + PERMIT_COST + DISPOSAL_COST;
    const taxCredit = Math.min(equipment * TAX_CREDIT_RATE, TAX_CREDIT_MAX);
    const netTotal = subtotal - taxCredit;
    const monthlyRate = FINANCING_RATE / 12;
    const monthlyPayment = Math.round(netTotal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -FINANCING_MONTHS)));
    setResult({ equipment, labor, materials: MATERIALS_COST, permit: PERMIT_COST, disposal: DISPOSAL_COST, subtotal, taxCredit: Math.round(taxCredit), netTotal: Math.round(netTotal), monthlyPayment });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🏗️</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>DFW HVAC Budget Calculator 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Full DFW replacement cost breakdown — equipment, labor, permits, disposal, and tax credits.</p>
        </div>
        <div style={{ background: '#0f2039', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <label style={{ display: 'block', marginBottom: 16 }}>
            <span style={{ color: '#F5E642', fontSize: 13 }}>⚡ Target SEER2 Rating</span>
            <select value={seerTier} onChange={e => setSeerTier(e.target.value as SeerTier)}
              style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px 14px', borderRadius: 8, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: 15 }}>
              <option value="14″>14 SEER2 (Minimum Code)</option>
              <option value="16″>16 SEER2 (Standard Efficient)</option>
              <option value="18″>18 SEER2 (High Efficiency)</option>
              <option value="20+">20+ SEER2 (Premium / Tax Credit Max)</option>
            </select>
          </label>
          <label style={{ display: 'block', marginBottom: 20 }}>
            <span style={{ color: '#F5E642', fontSize: 13 }}>🏠 DFW Home Size</span>
            <select value={sizeTier} onChange={e => setSizeTier(e.target.value as SizeTier)}
              style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px 14px', borderRadius: 8, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: 15 }}>
              <option value="small">Small (under 1,500 sq ft / 2 ton)</option>
              <option value="medium">Medium (1,500–2,500 sq ft / 3 ton)</option>
              <option value="large">Large (2,500+ sq ft / 4–5 ton)</option>
            </select>
          </label>
          <button onClick={calculate}
            style={{ width: '100%', padding: '13px 0', background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 16, border: 'none', borderRadius: 8, cursor: 'pointer' }}>
            Generate DFW Cost Breakdown
          </button>
        </div>
        {result && (
          <div style={{ background: '#0f2039', borderRadius: 12, padding: 24 }}>
            <h2 style={{ color: '#F5E642', marginBottom: 18, fontSize: 18 }}>📋 Complete DFW Replacement Budget</h2>
            {[
              ['🛒 Equipment', `$${result.equipment.toLocaleString()}`],
              ['👷 Labor (DFW Rate)', `$${result.labor.toLocaleString()}`],
              ['🔧 Materials (lineset, pad, disconnect)', `$${result.materials.toLocaleString()}`],
              ['📄 DFW Permit', `$${result.permit.toLocaleString()}`],
              ['🗑️ Old Unit Disposal', `$${result.disposal.toLocaleString()}`],
              ['➕ Subtotal Before Credits', `$${result.subtotal.toLocaleString()}`],
              ['🇺🇸 Federal Tax Credit (30%)', `-$${result.taxCredit.toLocaleString()}`],
              ['✅ Net Out-of-Pocket', `$${result.netTotal.toLocaleString()}`],
              ['💳 60-Month Financing (~6.99%)', `$${result.monthlyPayment}/mo`],
            ].map(([label, value]) => (
              <div key={label as string} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid #1e3a5f' }}>
                <span style={{ color: '#94a3b8', fontSize: 14 }}>{label}</span>
                <span style={{ color: label?.toString().includes('Net') || label?.toString().includes('Subtotal') ? '#F5E642′ : '#fff', fontWeight: 600, fontSize: 14 }}>{value}</span>
              </div>
            ))}
            <p style={{ color: '#64748b', fontSize: 12, marginTop: 16 }}>All figures are DFW market estimates. Actual quotes may vary. Tax credit subject to IRS eligibility.</p>
          </div>
        )}
      </div>
    </div>
  );
}
