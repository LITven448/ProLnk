import { useState } from 'react';

type RebateResult = { total: string; breakdown: { source: string; amount: string; details: string }[]; howTo: string[]; notes: string };

const rebateResults: Record<string, RebateResult> = {
  'heatpump-replace-own': { total: 'Up to $3,200+', breakdown: [{ source: 'IRA 25C Tax Credit', amount: 'Up to $2,000', details: 'Heat pumps qualify for 30% of installed cost, capped at $2,000 per year' }, { source: 'Oncor Residential Rebate', amount: '$200–$800', details: 'Oncor rebates for qualifying heat pump installations in DFW — varies by SEER2 rating' }, { source: 'Equipment Manufacturer', amount: '$200–$600', details: 'Carrier, Lennox, Trane often offer seasonal heat pump rebates — ask your contractor' }], howTo: ['File IRS Form 5695 with your federal return for the 25C credit', 'Pre-register with Oncor before installation at oncor.com/rebates', 'Request manufacturer rebate documentation from your HVAC contractor at time of quote', 'Keep all receipts and equipment model documentation for tax filing'], notes: 'Oncor pre-approval is required before installation begins — do not skip this step or you will forfeit the rebate.' },
  'heatpump-replace-rent': { total: 'Up to $2,000 (owner benefit)', breakdown: [{ source: 'IRA 25C Tax Credit', amount: 'Up to $2,000', details: 'Tax credit applies to the property owner who pays for the installation' }, { source: 'Oncor Rebate', amount: '$200–$800', details: 'Rebate goes to the account holder — typically the property owner' }], howTo: ['Property owner must file for credits — renters do not qualify for 25C directly', 'Negotiate with landlord to share equipment cost savings through lower rent or lease terms', 'Document lease agreement terms regarding HVAC ownership for future reference'], notes: 'As a renter, you cannot claim 25C directly. Engage your landlord and frame it as a property value improvement.' },
  'ac-replace-own': { total: 'Up to $1,200', breakdown: [{ source: 'IRA 25C Tax Credit', amount: 'Up to $600', details: '30% of cost for qualifying central AC units capped at $600 per year. Must be 16+ SEER2.' }, { source: 'Oncor Residential Rebate', amount: '$150–$400', details: 'Standard efficiency tier rebates for central AC meeting minimum efficiency thresholds' }, { source: 'Manufacturer Rebate', amount: '$100–$250', details: 'Brand-specific seasonal rebates — Lennox, Carrier, Trane, American Standard all participate' }], howTo: ['Verify equipment meets 16 SEER2 minimum for 25C credit eligibility', 'Register with Oncor before installation at oncor.com/rebates', 'File IRS Form 5695 for the 25C credit at tax time', 'Submit manufacturer rebate form within 60 days of installation (deadlines are strict)'], notes: 'The 25C AC credit is capped at $600 vs $2,000 for heat pumps — if your climate allows, a heat pump upgrade yields 3x the credit.' },
  'ac-replace-rent': { total: 'Limited options', breakdown: [{ source: 'Oncor Rebate', amount: '$150–$400', details: 'Applies to property owner / account holder — not the renter' }], howTo: ['Discuss replacement timing with landlord to align with rebate deadlines', 'No direct federal credit pathway for renters on standard AC replacements', 'Document your request in writing for landlord record'], notes: 'Renters have minimal direct rebate access for standard AC. Focus on negotiating lease terms that reflect energy savings.' },
  'addons-own': { total: 'Up to $1,200', breakdown: [{ source: 'IRA 25C — Insulation / Air Sealing', amount: 'Up to $1,200', details: '30% of cost for qualifying insulation and air sealing up to $1,200 per year' }, { source: 'IRA 25C — Smart Thermostat', amount: 'Up to $150', details: '30% of cost for qualifying smart thermostats like Nest or Ecobee' }, { source: 'Oncor Smart Thermostat Rebate', amount: '$25–$75', details: 'Oncor offers rebates for connected smart thermostat enrollment in demand response programs' }], howTo: ['Smart thermostat credit: keep receipt and model number, file on Form 5695', 'Insulation credit: requires qualified contractor and R-value documentation', 'Oncor smart thermostat: enroll device in Oncor smart savers program for rebate check', 'Stack smart thermostat Oncor rebate with 25C credit — both are claimable on same project'], notes: 'Insulation + air sealing + smart thermostat stacked with HVAC replacement can push total incentives past $3,500 in a single tax year.' },
  'addons-rent': { total: 'Up to $75 (limited)', breakdown: [{ source: 'Oncor Smart Thermostat', amount: '$25–$75', details: 'If you pay your own Oncor bill and own the thermostat, you may qualify for enrollment rebate' }], howTo: ['Verify your Oncor account is in your name', 'Purchase a qualifying smart thermostat and enroll in Oncor Smart Savers', 'Consult with landlord before modifying thermostat wiring'], notes: 'Most add-on credits require property ownership. Smart thermostat rebate is the primary renter-accessible incentive.' },
};

export default function DFWHVACRebates2026() {
  const [systemType, setSystemType] = useState('');
  const [projectType, setProjectType] = useState('');
  const [ownership, setOwnership] = useState('');
  const key = systemType && projectType && ownership ? systemType + '-' + projectType + '-' + ownership : '';
  const result = key && rebateResults[key] ? rebateResults[key] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui, sans-serif', color: '#e2e8f0' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ background: '#F5E642', color: '#0A1628', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700 }}>DFW HVAC GUIDE</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '1rem', color: '#fff' }}>💰 HVAC Rebates &amp; Tax Credits 2026 — DFW Guide</h1>
          <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
            DFW homeowners can stack federal tax credits under the Inflation Reduction Act with Oncor utility rebates and manufacturer promotions.
            A heat pump replacement can yield over $3,200 in combined incentives. Here is exactly what is available and how to claim it.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '🏛️', source: 'Federal IRA 25C', key: 'Heat pump: up to $2,000 | AC: up to $600', note: 'File IRS Form 5695 at tax time' },
            { icon: '⚡', source: 'Oncor Rebates', key: '$150–$800 depending on equipment', note: 'Pre-approve BEFORE installation' },
            { icon: '🏭', source: 'Manufacturer', key: '$100–$600 seasonal offers', note: 'Submit within 60 days of install' },
          ].map((r, i) => (
            <div key={i} style={{ background: '#0f1e35', borderRadius: '12px', padding: '1.25rem', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.35rem' }}>{r.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: '0.88rem', marginBottom: '0.25rem' }}>{r.source}</div>
              <div style={{ color: '#e2e8f0', fontSize: '0.82rem', marginBottom: '0.4rem' }}>{r.key}</div>
              <div style={{ color: '#64748b', fontSize: '0.75rem', fontStyle: 'italic' }}>{r.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1e35', borderRadius: '16px', padding: '1.75rem', marginBottom: '2rem', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1.25rem', fontSize: '1.1rem' }}>🧮 Rebate Calculator for DFW</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.35rem' }}>Equipment Type</label>
              <select value={systemType} onChange={e => setSystemType(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: '8px', color: '#e2e8f0', padding: '0.55rem', fontSize: '0.85rem' }}>
                <option value=''>Select...</option>
                <option value='heatpump'>Heat Pump</option>
                <option value='ac'>Central AC</option>
                <option value='addons'>Add-ons (thermostat / insulation)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.35rem' }}>Project Type</label>
              <select value={projectType} onChange={e => setProjectType(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: '8px', color: '#e2e8f0', padding: '0.55rem', fontSize: '0.85rem' }}>
                <option value=''>Select...</option>
                <option value='replace'>Full Replacement</option>
                <option value='own'>Same as replace</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.35rem' }}>Ownership Status</label>
              <select value={ownership} onChange={e => setOwnership(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: '8px', color: '#e2e8f0', padding: '0.55rem', fontSize: '0.85rem' }}>
                <option value=''>Select...</option>
                <option value='own'>Homeowner</option>
                <option value='rent'>Renter</option>
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: '12px', padding: '1.25rem', border: '2px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: '1.4rem', marginBottom: '1rem' }}>Total Available: {result.total}</div>
              <div style={{ marginBottom: '1rem' }}>
                {result.breakdown.map((b, i) => (
                  <div key={i} style={{ background: '#0f1e35', borderRadius: '8px', padding: '0.75rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                    <div>
                      <div style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.85rem' }}>{b.source}</div>
                      <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.2rem' }}>{b.details}</div>
                    </div>
                    <div style={{ color: '#22c55e', fontWeight: 700, fontSize: '0.95rem', whiteSpace: 'nowrap' }}>{b.amount}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: '0.75rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.4rem' }}>How to Claim</div>
                <ol style={{ margin: 0, padding: '0 0 0 1.2rem' }}>{result.howTo.map((h, i) => <li key={i} style={{ color: '#cbd5e1', fontSize: '0.84rem', marginBottom: '0.3rem' }}>{h}</li>)}</ol>
              </div>
              <div style={{ padding: '0.75rem', background: '#0f1e35', borderRadius: '8px', color: '#94a3b8', fontSize: '0.82rem' }}>
                ⚠️ <strong style={{ color: '#F5E642' }}>Important:</strong> {result.notes}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
