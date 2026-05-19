import { useState } from 'react';

type RebateEntry = { rebate: string; provider: string; process: string; amount: string };
type RebateMap = Record<string, Record<string, RebateEntry>>;

const rebateData: RebateMap = {
  'Smart Thermostat': {
    'Oncor': { rebate: 'Oncor Smart Thermostat Rebate', provider: 'Oncor', process: 'Submit receipt at oncor.com/rebates within 90 days of purchase', amount: '$75 prepaid card' },
    'TXU Energy': { rebate: 'TXU Free Nights + Smart Control', provider: 'TXU Energy', process: 'Enroll in TXU Smart Hours — rebate applied as bill credit', amount: '$85 bill credit + free plan nights' },
    'Reliant': { rebate: 'Reliant Efficiency Rebate', provider: 'Reliant', process: 'Online application at reliant.com/rebates', amount: '$50–100 depending on device' },
  },
  'High-Efficiency AC/Heat Pump': {
    'Oncor': { rebate: 'Oncor HVAC Efficiency Rebate', provider: 'Oncor', process: 'Contractor submits Form 4014; homeowner co-signs', amount: '$200–$1,200 based on efficiency rating' },
    'Dallas Water Utilities': { rebate: 'N/A — contact Oncor', provider: 'Oncor', process: 'See Oncor rebate program', amount: 'See Oncor above' },
    'Reliant': { rebate: 'Reliant Home Upgrade Rebate', provider: 'Reliant', process: 'Submit AHRI certificate + invoice at reliant.com', amount: '$150–$500′ },
  },
  'Irrigation Controller (Weather-Based)': {
    'Dallas Water Utilities': { rebate: 'DWU WaterSense Controller Rebate', provider: 'Dallas Water Utilities', process: 'Apply at dallaswatersupply.com — requires WaterSense label', amount: '$100 per controller' },
    'Fort Worth Water': { rebate: 'FW Water-Wise Rebate', provider: 'Fort Worth Water Dept.', process: 'Submit form at fortworthtexas.gov/water', amount: '$75 per controller' },
    'Oncor': { rebate: 'No Oncor rebate for irrigation', provider: 'N/A', process: 'Apply to your water utility instead', amount: 'N/A' },
  },
  'LED Lighting Upgrade': {
    'Oncor': { rebate: 'Oncor LED Rebate Program', provider: 'Oncor', process: 'Purchase qualifying LEDs at participating retailers; rebate auto-applied or mail-in', amount: '$0.50–$3 per bulb' },
    'TXU Energy': { rebate: 'TXU LED Buyback', provider: 'TXU Energy', process: 'Trade in old bulbs at TXU events or mail-in program', amount: '$1–2 per qualifying bulb' },
    'Reliant': { rebate: 'Reliant Energy Efficiency Rebate', provider: 'Reliant', process: 'Online at reliant.com — upload purchase receipts', amount: 'Up to $50/household' },
  },
  'Insulation Upgrade': {
    'Oncor': { rebate: 'Oncor Home Performance Rebate', provider: 'Oncor', process: 'Must use Oncor-approved contractor; pre-approval required before work starts', amount: '$0.10 per sq ft — avg $300–$600′ },
    'Dallas Water Utilities': { rebate: 'Not applicable', provider: 'N/A', process: 'See energy utility rebates', amount: 'N/A' },
    'TXU Energy': { rebate: 'TXU Home Weatherization', provider: 'TXU Energy', process: 'Schedule a home energy audit at txu.com — rebates follow audit completion', amount: '$200–$800 based on work completed' },
  },
  'Low-Flow Plumbing Fixtures': {
    'Dallas Water Utilities': { rebate: 'DWU WaterSense Fixture Rebate', provider: 'Dallas Water Utilities', process: 'Apply online; must show WaterSense label on packaging', amount: '$50–$100 per fixture' },
    'Fort Worth Water': { rebate: 'Fort Worth Water Conservation Rebate', provider: 'Fort Worth Water', process: 'Submit at fortworthtexas.gov/water with receipt', amount: '$25–$75 per qualifying fixture' },
    'Oncor': { rebate: 'No Oncor rebate — water utility only', provider: 'N/A', process: 'Apply to DWU or Fort Worth Water', amount: 'N/A' },
  },
};

const improvementTypes = Object.keys(rebateData);
const providers = ['Oncor', 'TXU Energy', 'Reliant', 'Dallas Water Utilities', 'Fort Worth Water'];

export default function DFWConservationRebates() {
  const [improvement, setImprovement] = useState('');
  const [provider, setProvider] = useState('');
  const [result, setResult] = useState<RebateEntry | null>(null);

  function lookup() {
    const match = rebateData[improvement]?.[provider];
    setResult(match || null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💰 DFW Conservation Rebates 2026</div>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
          DFW homeowners can stack rebates from Oncor, Dallas Water Utilities, Fort Worth Water, TXU, Reliant, and federal IRA credits.
          Most rebates require action within 90 days of purchase — apply early.
        </p>

        <div style={{ background: '#132140', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem', fontSize: '1.1rem' }}>🔎 Rebate Finder</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', color: '#94a3b8', fontSize: '0.9rem' }}>Improvement type</label>
              <select value={improvement} onChange={e => { setImprovement(e.target.value); setResult(null); }}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', fontSize: '0.95rem' }}>
                <option value="">-- Select improvement --</option>
                {improvementTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', color: '#94a3b8', fontSize: '0.9rem' }}>Your DFW utility provider</label>
              <select value={provider} onChange={e => { setProvider(e.target.value); setResult(null); }}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', fontSize: '0.95rem' }}>
                <option value="">-- Select provider --</option>
                {providers.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
          <button onClick={lookup}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>
            Find Rebates
          </button>

          {result && (
            <div style={{ marginTop: '1.5rem', background: '#0A1628', borderRadius: 8, padding: '1.25rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.75rem' }}>{result.rebate}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div><div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Rebate amount</div><div style={{ fontWeight: 700, color: '#4ade80′ }}>{result.amount}</div></div>
                <div><div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Administered by</div><div style={{ fontWeight: 700 }}>{result.provider}</div></div>
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Application process</div>
              <div style={{ color: '#cbd5e1', lineHeight: 1.6 }}>{result.process}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#132140', borderRadius: 12, padding: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>📋 Pro Tips — DFW Rebate Stacking</div>
          {[
            ['🏛️', 'Stack IRA + utility rebates', 'Federal credits (up to $3,200/yr) do NOT reduce utility rebates — claim both'],
            ['⏰', 'Apply within 90 days', 'Most Oncor and Dallas Water rebates expire 90 days after purchase date'],
            ['📄', 'Keep packaging', 'WaterSense and ENERGY STAR labels must be submitted with applications'],
            ['👷', 'Use approved contractors', 'Oncor HVAC rebates require licensed contractors registered in their program'],
            ['📞', 'TWDB programs', 'Texas Water Development Board offers additional low-interest loans for water conservation improvements'],
          ].map(([icon, label, desc]) => (
            <div key={label} style={{ display: 'flex', gap: '1rem', padding: '0.75rem 0', borderBottom: '1px solid #1e3a5f' }}>
              <span style={{ fontSize: '1.4rem' }}>{icon}</span>
              <div><div style={{ fontWeight: 700, marginBottom: '0.2rem' }}>{label}</div><div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{desc}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
