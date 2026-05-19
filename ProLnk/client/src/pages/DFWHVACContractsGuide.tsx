import { useState } from 'react';

const CONTRACT_TYPES = [
  { key: 'basic', label: 'Basic (1 visit/year)' },
  { key: 'biannual', label: 'Biannual (2 visits/year)' },
  { key: 'premium', label: 'Premium (priority + parts)' },
  { key: 'none', label: 'No contract' },
];

const UNIT_COUNTS = ['1', '2', '3+'];

const PRICE_RANGES: Record<string, Record<string, string>> = {
  basic: { '1': '$89–$129/yr', '2': '$150–$220/yr', '3+': '$200–$350/yr' },
  biannual: { '1': '$149–$229/yr', '2': '$250–$380/yr', '3+': '$380–$600/yr' },
  premium: { '1': '$299–$499/yr', '2': '$480–$750/yr', '3+': '$650–$1,100/yr' },
  none: { '1': 'N/A', '2': 'N/A', '3+': 'N/A' },
};

const THE_18 = [
  'Check and replace air filter','Inspect and clean evaporator coil','Inspect and clean condenser coil',
  'Check refrigerant levels (Freon/R-410A)','Inspect electrical connections and tighten','Test capacitors and contactors',
  'Lubricate motors and bearings','Check and clear condensate drain line','Inspect drain pan and float switch',
  'Measure static pressure','Test thermostat calibration','Check blower motor amps',
  'Inspect heat exchanger (heating season)','Test defrost controls (heat pump)','Check reversing valve (heat pump)',
  'Verify gas pressure (gas furnace)','Inspect flue and combustion (gas)','Perform full system safety check',
];

export default function DFWHVACContractsGuide() {
  const [contractType, setContractType] = useState('');
  const [unitCount, setUnitCount] = useState('');
  const [showResult, setShowResult] = useState(false);

  const price = contractType && unitCount ? PRICE_RANGES[contractType]?.[unitCount] : '';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EEF7', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 600, letterSpacing: 1 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>HVAC Maintenance Contracts in DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: 28, fontSize: 15 }}>
          A good HVAC maintenance contract in DFW means two visits per year — spring and fall — timed around DFW's brutal cooling season and mild heating season. Here’s how to evaluate what you’re being sold.
        </p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 14 }}>📋 The 18-Point Standard</div>
          <p style={{ color: '#94A3B8', fontSize: 13, marginBottom: 12 }}>A legitimate DFW HVAC service visit should cover at least these 18 items. Ask for a written checklist — any reputable company will provide one.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {THE_18.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 12, color: '#94A3B8′ }}>
                <span style={{ color: '#F5E642', flexShrink: 0 }}>✓</span>{item}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#2D1515', border: '1.5px solid #EF4444', borderRadius: 12, padding: 16, marginBottom: 20 }}>
          <div style={{ fontWeight: 700, color: '#EF4444', marginBottom: 8 }}>🚩 DFW Contract Red Flags</div>
          {[
            'Only 1 visit per year — DFW needs spring AND fall service',
            'No written checklist provided — vague "inspection" language',
            'No refrigerant check included — adds up fast if they charge per pound',
            'Auto-renews without notification and is hard to cancel',
            'Discount only applies to labor, not parts — read the fine print',
            '"Priority service" with no defined SLA — meaningless in practice',
          ].map((flag, i) => (
            <div key={i} style={{ fontSize: 13, color: '#94A3B8', marginBottom: 6, display: 'flex', gap: 8 }}><span style={{ color: '#EF4444', flexShrink: 0 }}>✗</span>{flag}</div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>💰 What Should I Pay?</div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 8 }}>Contract Type</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {CONTRACT_TYPES.map(({ key, label }) => (
                <button key={key} onClick={() => { setContractType(key); setShowResult(false); }} style={{ padding: '8px 14px', borderRadius: 8, border: '1.5px solid', borderColor: contractType === key ? '#F5E642′ : '#1E3A5F', background: contractType === key ? '#F5E64220' : ’transparent', color: contractType === key ? '#F5E642′ : '#94A3B8', cursor: ’pointer', fontSize: 13, fontWeight: 600 }}>{label}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 8 }}>Number of HVAC Units</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {UNIT_COUNTS.map(u => (
                <button key={u} onClick={() => { setUnitCount(u); setShowResult(false); }} style={{ padding: '8px 20px', borderRadius: 8, border: '1.5px solid', borderColor: unitCount === u ? '#F5E642′ : '#1E3A5F', background: unitCount === u ? '#F5E64220' : ’transparent', color: unitCount === u ? '#F5E642′ : '#94A3B8', cursor: ’pointer', fontSize: 13, fontWeight: 600 }}>{u}</button>
              ))}
            </div>
          </div>
          <button onClick={() => setShowResult(true)} disabled={!contractType || !unitCount} style={{ background: contractType && unitCount ? '#F5E642′ : '#1E3A5F', color: contractType && unitCount ? '#0A1628' : '#4A6080', border: ’none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, fontSize: 14, cursor: contractType && unitCount ? 'pointer' : 'not-allowed', width: '100%' }}>
            Show Fair Price Range
          </button>
        </div>

        {showResult && price && (
          <div style={{ background: '#0D2240', border: '1.5px solid #F5E642', borderRadius: 12, padding: 20, marginBottom: 24 }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: '#F5E642', marginBottom: 8 }}>Fair DFW Market Price</div>
            <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>{price}</div>
            {contractType === 'none' && <p style={{ color: '#94A3B8', fontSize: 14 }}>Without a contract, expect to pay $89–$149 per tune-up visit plus service call fees of $75–$150 on top of any repairs. A biannual contract typically saves you $100–$200/year and gets you priority scheduling in peak season.</p>}
            {contractType !== 'none' && <p style={{ color: '#94A3B8', fontSize: 14 }}>Price should include 2 full tune-up visits, all 18 checklist items, and at minimum a labor discount on any repairs needed. If it does not, negotiate or shop around.</p>}
          </div>
        )}

        <div style={{ background: '#111E35', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>📅 DFW Service Timing</div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: 1, background: '#0A1628', borderRadius: 8, padding: 12 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>🌸 Spring Visit</div>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>March–April. Pre-season cooling check before DFW's heat hits. Most important visit.</div>
            </div>
            <div style={{ flex: 1, background: '#0A1628', borderRadius: 8, padding: 12 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>🍂 Fall Visit</div>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>October–November. Heating system check before DFW's occasional cold snaps.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
