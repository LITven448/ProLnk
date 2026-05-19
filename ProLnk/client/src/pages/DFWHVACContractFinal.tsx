import { useState } from 'react';

const stages = [
  { stage: 'Pre-Signing', items: ['Equipment brand and model number specified', 'SEER2/EER2 rating confirmed for DFW climate', 'Scope of work — what is and is not included', 'Permit responsibility (who pulls, who pays)', 'Old equipment disposal included?', 'Start and completion dates'] },
  { stage: 'During Install', items: ['Permit posted at DFW job site', 'City inspection scheduled', 'Load calc (Manual J) provided', 'Duct testing or sealing if required', 'Refrigerant type and charge documented', 'Line set replacement or reuse — in writing'] },
  { stage: 'Post-Install', items: ['Manufacturer warranty registered by installer', 'Labor warranty in writing (1–2 years typical DFW)', 'Final inspection passed and paperwork received', 'Thermostat operation walkthrough completed', 'Filter size and replacement schedule provided', 'Emergency contact number for callbacks'] },
];

const redFlags = [
  '❌ No permit mentioned — DFW requires permits on all new equipment installs',
  '❌ Verbal-only quote — always get itemized written contract',
  '❌ Payment in full upfront — standard DFW practice is 50% down, 50% on completion',
  '❌ No equipment brand/model specified — leaves room for cheaper substitution',
  '❌ No warranty terms in writing — verbal warranties are unenforceable in Texas',
  '❌ Price significantly below 3 market quotes — DFW low-ball bids often cut corners',
];

const stageChecks: Record<string, string[]> = {
  'Pre-signing review': stages[0].items,
  'During installation': stages[1].items,
  'Post-installation': stages[2].items,
};

export default function DFWHVACContractFinal() {
  const [contractStage, setContractStage] = useState('');
  const [checklist, setChecklist] = useState<string[]>([]);

  function evaluate() {
    const items = stageChecks[contractStage] || [];
    setChecklist(items);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>📝 HVAC Contract Final Guide — DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 40 }}>What every DFW HVAC contract must include — scope, equipment specs, permits, warranty, and payment schedule — plus red flags to avoid.</p>

        <div style={{ background: '#0f2035', borderRadius: 16, padding: 32, marginBottom: 32, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', marginBottom: 24 }}>📋 Contract Stage Checklist</h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#94a3b8', fontSize: 14, display: 'block', marginBottom: 8 }}>Select your contract stage</label>
            <select value={contractStage} onChange={e => setContractStage(e.target.value)} style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 15 }}>
              <option value=''>Select stage…</option>
              {Object.keys(stageChecks).map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <button onClick={evaluate} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '14px 32px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 16 }}>Get Checklist →</button>
          {checklist.length > 0 && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 12, padding: 20, border: '1px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>✅ {contractStage} Checklist</div>
              {checklist.map(item => (
                <div key={item} style={{ color: '#cbd5e1', fontSize: 14, padding: '6px 0', borderBottom: '1px solid #1e3a5f', display: 'flex', gap: 8 }}>
                  <span style={{ color: '#F5E642′ }}>□</span> {item}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#0f2035', borderRadius: 16, padding: 32, border: '1px solid #7f1d1d' }}>
          <h2 style={{ color: '#f87171', marginBottom: 16 }}>🚩 DFW Contract Red Flags</h2>
          {redFlags.map(flag => (
            <div key={flag} style={{ color: '#fca5a5', fontSize: 14, padding: '8px 0', borderBottom: '1px solid #2d1111′ }}>{flag}</div>
          ))}
          <div style={{ color: '#60a5fa', fontSize: 13, marginTop: 16 }}>ProLnk-matched DFW contractors sign a standard ProLnk contract addendum covering all required terms before any job starts.</div>
        </div>
      </div>
    </div>
  );
}
