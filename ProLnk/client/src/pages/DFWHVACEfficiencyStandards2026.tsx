import { useState } from 'react';

type EfficiencyResult = { seer2Equiv: string; compliant: boolean; color: string; summary: string[]; options: string[] };

const efficiencyData: Record<string, EfficiencyResult> = {
  'under13-any': { seer2Equiv: 'Below 12 SEER2', compliant: false, color: '#ef4444', summary: ['Systems below 13 SEER cannot be replaced with equivalent efficiency — DFW minimum is 15 SEER2 for split systems', 'This system operates at roughly 60% efficiency of current minimum code', 'Annual cooling costs are approximately –,400 more than a 15 SEER2 system in DFW'], options: ['Replacement required to meet DFW / Zone 3 minimum 15 SEER2', 'Qualify for 25C tax credit: 30% of cost up to  for standard AC', 'Heat pump replacement qualifies for up to ,000 25C tax credit', 'Oncor commercial and residential rebates available for qualifying systems'] },
  '13-14-any': { seer2Equiv: '12–13 SEER2', compliant: false, color: '#ef4444', summary: ['13–14 SEER systems fall below new DFW minimum of 15 SEER2 for replacement', 'These systems cannot be replaced with like-for-like equipment in Zone 3 anymore', 'Efficiency gap costs approximately – per year in DFW vs minimum code unit'], options: ['Any replacement must meet 15 SEER2 minimum for split systems in DFW', 'Package units have different SEER2 minimums — verify with your contractor', 'Tax credits and Oncor rebates can offset –,600 of replacement cost', 'Request SEER2-rated equipment documentation before any installation'] },
  '15-16-any': { seer2Equiv: '13.4–14.3 SEER2', compliant: true, color: '#22c55e', summary: ['15–16 SEER systems convert to approximately 13.4–14.3 SEER2 under new test conditions', 'These systems are at or just above the DFW replacement minimum for most configurations', 'Replacement with equivalent efficiency is code-compliant in Zone 3'], options: ['Can replace with minimum-compliant 15 SEER2 system', 'Upgrading to 16–18 SEER2 reduces annual DFW cooling costs by – vs minimum', 'Heat pump option unlocks ,000 25C tax credit and Oncor efficiency rebates', 'Variable-speed 18+ SEER2 systems provide humidity control benefit in DFW'] },
  '17-18-any': { seer2Equiv: '15.2–16.1 SEER2', compliant: true, color: '#22c55e', summary: ['17–18 SEER systems convert to approximately 15.2–16.1 SEER2', 'These systems comfortably exceed minimum Zone 3 requirements', 'Replacement in kind is fully code-compliant in all DFW cities'], options: ['Maintain current efficiency level or upgrade to 18–21 SEER2 for premium savings', 'Variable-speed compressors at 18+ SEER2 are specifically effective in DFW humidity control', 'Heat pump replacement at 18+ SEER2 qualifies for maximum 25C credits', 'Oncor may offer tiered rebates for systems above minimum threshold'] },
  '19plus-any': { seer2Equiv: '17+ SEER2', compliant: true, color: '#22c55e', summary: ['19+ SEER systems are high-efficiency and convert to 17+ SEER2', 'These systems represent the top 10% of efficiency for DFW residential equipment', 'Full code compliance with significant margin above Zone 3 minimum'], options: ['Like-for-like replacement is fully compliant — request matched SEER2 rating', 'Variable-speed inverter compressors at this tier are the gold standard for DFW comfort', 'Qualify for maximum 25C tax credits and highest Oncor rebate tiers', 'Document equipment efficiency rating for appraisal and resale value purposes'] },
};

const seerToSeer2: Record<string, string> = {
  'under13': 'under13', '13-14': '13-14', '15-16': '15-16', '17-18': '17-18', '19plus': '19plus'
};

export default function DFWHVACEfficiencyStandards2026() {
  const [seer, setSeer] = useState('');
  const [systemType, setSystemType] = useState('');
  const key = seer ? seer + '-any' : '';
  const result = key && efficiencyData[key] ? efficiencyData[key] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui, sans-serif', color: '#e2e8f0′ }}>
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ background: '#F5E642', color: '#0A1628', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700 }}>DFW HVAC GUIDE</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '1rem', color: '#fff' }}>📊 HVAC Efficiency Standards 2026 — DFW Guide</h1>
          <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
            New SEER2 efficiency standards took effect January 1, 2023 for all HVAC equipment sold in the South/Southwest region.
            DFW falls in Climate Zone 3, which requires a minimum 15 SEER2 (about 17 SEER under old testing) for central air conditioner replacements.
            Old SEER ratings and new SEER2 ratings are NOT directly comparable — understand how your system stacks up.
          </p>
        </div>

        <div style={{ background: '#0f1e35', borderRadius: '12px', padding: '1.25rem', marginBottom: '2rem', border: '1px solid #F5E642′ }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem', fontSize: '0.95rem' }}>⚡ What Changed with SEER2</div>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
            SEER2 uses a more realistic test condition (0.5 inches external static pressure vs 0.1 for SEER).
            A 15 SEER system tested under SEER2 conditions is typically rated about 13.4 SEER2.
            The new DFW Zone 3 minimum of 15 SEER2 is approximately equivalent to an old 17 SEER system — meaning equipment standards increased significantly.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'DFW Zone', value: 'Zone 3', desc: 'Southeast / South-Central region' },
            { label: 'Split System Min', value: '15 SEER2', desc: 'Central AC and heat pump minimums' },
            { label: 'Package Unit Min', value: '14 SEER2', desc: 'All-in-one rooftop and garage units' },
          ].map((s, i) => (
            <div key={i} style={{ background: '#0f1e35', borderRadius: '12px', padding: '1.25rem', border: '1px solid #1e3a5f', textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.78rem', marginBottom: '0.3rem' }}>{s.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: '1.4rem' }}>{s.value}</div>
              <div style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '0.3rem' }}>{s.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1e35', borderRadius: '16px', padding: '1.75rem', marginBottom: '2rem', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1.25rem', fontSize: '1.1rem' }}>🔢 SEER to SEER2 Converter + Compliance Check</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.35rem' }}>Current SEER Rating (on equipment label)</label>
              <select value={seer} onChange={e => setSeer(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: '8px', color: '#e2e8f0', padding: '0.6rem' }}>
                <option value=''>Select SEER...</option>
                <option value='under13'>Under 13 SEER</option>
                <option value='13-14'>13–14 SEER</option>
                <option value='15-16'>15–16 SEER</option>
                <option value='17-18'>17–18 SEER</option>
                <option value='19plus'>19+ SEER</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.35rem' }}>System Configuration</label>
              <select value={systemType} onChange={e => setSystemType(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: '8px', color: '#e2e8f0', padding: '0.6rem' }}>
                <option value=''>Select type...</option>
                <option value='split'>Split System (separate indoor/outdoor unit)</option>
                <option value='package'>Package Unit (all-in-one rooftop or garage)</option>
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: '12px', padding: '1.25rem', border: `2px solid ${result.color}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div>
                  <div style={{ color: '#94a3b8', fontSize: '0.78rem' }}>Estimated SEER2 Equivalent</div>
                  <div style={{ color: '#F5E642', fontWeight: 800, fontSize: '1.5rem' }}>{result.seer2Equiv}</div>
                </div>
                <div style={{ background: result.compliant ? '#16a34a22′ : '#dc262622', border: `1px solid ${result.color}`, borderRadius: '8px', padding: '0.5rem 1rem', color: result.color, fontWeight: 700, fontSize: '0.85rem' }}>
                  {result.compliant ? '✅ Zone 3 Compliant' : '❌ Below DFW Minimum'}
                </div>
              </div>
              <div style={{ marginBottom: '0.75rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.4rem' }}>What This Means</div>
                <ul style={{ margin: 0, padding: '0 0 0 1.2rem' }}>{result.summary.map((s, i) => <li key={i} style={{ color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.3rem' }}>{s}</li>)}</ul>
              </div>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.4rem' }}>Replacement Options</div>
                <ul style={{ margin: 0, padding: '0 0 0 1.2rem' }}>{result.options.map((o, i) => <li key={i} style={{ color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.3rem' }}>{o}</li>)}</ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
