import { useState } from 'react';

const poolTypes = [
  { value: 'inground_gunite', label: 'In-ground (Gunite/Concrete)' },
  { value: 'inground_fiberglass', label: 'In-ground (Fiberglass)' },
  { value: 'inground_vinyl', label: 'In-ground (Vinyl Liner)' },
  { value: 'above_ground', label: 'Above-Ground Pool' },
  { value: 'hot_tub', label: 'Hot Tub / Spa Only' },
];

const coverageLevels = [
  { value: 'standard', label: 'Standard Homeowner\’s ($100K liability)' },
  { value: 'extended', label: 'Extended Liability ($300K)' },
  { value: 'umbrella', label: 'Umbrella Policy ($1M+)' },
];

const riskData: Record<string, Record<string, { risk: string; exposure: string; recommendation: string; costEst: string }>> = {
  inground_gunite: {
    standard: { risk: 'HIGH', exposure: 'A single serious pool accident can easily exceed $100K in medical + legal costs. You are significantly underinsured.', recommendation: 'Add umbrella policy immediately. $1M coverage runs $200–350/yr in DFW.', costEst: '$200–350/yr for $1M umbrella' },
    extended: { risk: 'MEDIUM', exposure: '$300K covers most incidents but leaves you exposed to catastrophic claims or multiple-party events.', recommendation: 'Strongly consider a $1M umbrella. Minimal cost for substantial protection.', costEst: '$150–250/yr to add $1M umbrella' },
    umbrella: { risk: 'LOW', exposure: 'You are well-positioned. Ensure your umbrella carrier is aware of the pool and it\’s listed on the policy.', recommendation: 'Confirm pool is scheduled on umbrella. Review annually as home value rises.', costEst: 'Review existing policy — confirm pool listed' },
  },
  inground_fiberglass: {
    standard: { risk: 'HIGH', exposure: 'Same liability exposure as gunite pools. Coverage is insufficient.', recommendation: 'Add $1M umbrella. Fiberglass pools also face equipment coverage gaps — review endorsements.', costEst: '$200–350/yr for $1M umbrella' },
    extended: { risk: 'MEDIUM', exposure: 'Better than standard, but catastrophic incidents can exceed $300K.', recommendation: 'Add umbrella for full protection. Equipment breakdown endorsement also recommended.', costEst: '$150–250/yr umbrella' },
    umbrella: { risk: 'LOW', exposure: 'Well-covered. Verify equipment breakdown coverage for pump/filter systems.', recommendation: 'Add equipment breakdown endorsement ($25–50/yr) for mechanical coverage.', costEst: '$25–50/yr equipment rider' },
  },
  above_ground: {
    standard: { risk: 'MEDIUM', exposure: 'Above-ground pools carry lower lawsuit risk but still create meaningful liability. Some carriers require notification.', recommendation: 'Notify your insurer — failure to disclose can void claims. Consider umbrella.', costEst: '$150–250/yr umbrella' },
    extended: { risk: 'LOW-MEDIUM', exposure: 'Reasonable coverage for above-ground risk profile.', recommendation: 'Ensure pool is disclosed on policy. Umbrella still recommended for full protection.', costEst: '$100–200/yr umbrella' },
    umbrella: { risk: 'LOW', exposure: 'Excellent protection for your pool type.', recommendation: 'Maintain current coverage. Ensure pool stays on umbrella schedule.', costEst: 'Current coverage appropriate' },
  },
  hot_tub: {
    standard: { risk: 'MEDIUM', exposure: 'Hot tubs create slip/fall and chemical exposure risks often overlooked in standard policies.', recommendation: 'Disclose to insurer. Consider umbrella for full protection.', costEst: '$150–250/yr umbrella' },
    extended: { risk: 'LOW', exposure: 'Good coverage for most hot tub scenarios.', recommendation: 'Confirm hot tub/spa is specifically listed. Review chemical liability.', costEst: 'Review existing policy' },
    umbrella: { risk: 'LOW', exposure: 'Strong protection. Review annually.', recommendation: 'Confirm hot tub listed. Consider equipment breakdown endorsement.', costEst: 'Current coverage appropriate' },
  },
  inground_vinyl: {
    standard: { risk: 'HIGH', exposure: 'Vinyl liner pools face the same liability exposure as other in-ground pools, plus liner replacement is often disputed.', recommendation: 'Add umbrella. Ask about liner replacement coverage specifically.', costEst: '$200–350/yr umbrella' },
    extended: { risk: 'MEDIUM', exposure: 'Better, but still exposed to catastrophic claims.', recommendation: 'Umbrella recommended. Clarify liner replacement terms with insurer.', costEst: '$150–250/yr umbrella' },
    umbrella: { risk: 'LOW', exposure: 'Well-covered for liability. Verify liner replacement language.', recommendation: 'Confirm liner replacement covered or excluded. Add rider if needed.', costEst: 'Review liner coverage terms' },
  },
};

export default function DFWPoolInsuranceGuide() {
  const [poolType, setPoolType] = useState('');
  const [coverage, setCoverage] = useState('');
  const [result, setResult] = useState<{ risk: string; exposure: string; recommendation: string; costEst: string } | null>(null);

  function analyze() {
    if (poolType && coverage && riskData[poolType]?.[coverage]) {
      setResult(riskData[poolType][coverage]);
    }
  }

  const riskColor = (r: string) => r.startsWith('HIGH') ? '#EF4444' : r.startsWith('MEDIUM') ? '#F59E0B' : '#10B981';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>🏊 DFW Homeowner Series</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Pool Insurance Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>Pools are the #1 source of preventable homeowner liability claims in Texas. The right coverage protects your finances as much as a fence protects your family.</p>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 10, padding: '16px 20px', marginBottom: 32, fontWeight: 700 }}>
          ⚖️ A single pool accident lawsuit in DFW can reach $500K–$2M. Standard $100K homeowner liability covers less than 10% of that exposure.
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>What Pools Change About Your Policy</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {[['📋', 'Disclosure required — failure to report your pool can void claims'],['⚠️', 'Liability limits of $100–300K are typically insufficient for pool owners'],['🌩️', 'Storm damage to pool equipment IS usually covered (pump, heater, filter)'],['🔧', 'Maintenance issues (algae damage, liner wear) are NOT covered'],['🏃', 'Guest injuries — you can be liable even if they ignored posted rules']].map(([icon, text]) => (
            <div key={text} style={{ background: '#132035', borderRadius: 8, padding: '12px 16px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 18 }}>{icon}</span><span style={{ fontSize: 14 }}>{text}</span>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>DFW Umbrella Policy: The Pool Owner Standard</h2>
        <p style={{ color: '#94A3B8', marginBottom: 20, fontSize: 14 }}>A $1M personal umbrella policy in DFW typically costs $200–400/year — less than one month of pool maintenance. It kicks in when your homeowner liability limit is exhausted and covers legal defense costs, medical judgments, and settlements.</p>

        <div style={{ background: '#132035', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 20 }}>🔢 Liability Exposure Assessment</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6 }}>Pool Type</label>
              <select value={poolType} onChange={e => setPoolType(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #2A3F5F', borderRadius: 6, padding: '10px 12px', color: '#E8EDF5', fontSize: 15 }}>
                <option value="">Select pool type...</option>
                {poolTypes.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6 }}>Current Liability Coverage</label>
              <select value={coverage} onChange={e => setCoverage(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #2A3F5F', borderRadius: 6, padding: '10px 12px', color: '#E8EDF5', fontSize: 15 }}>
                <option value="">Select current coverage...</option>
                {coverageLevels.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <button onClick={analyze} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, padding: '12px 0', borderRadius: 8, border: 'none', cursor: 'pointer' }}>Assess My Exposure</button>
          </div>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 8, padding: 18 }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: riskColor(result.risk), marginBottom: 10 }}>Risk Level: {result.risk}</div>
              <div style={{ fontSize: 14, color: '#94A3B8', marginBottom: 10 }}>{result.exposure}</div>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#F5E642', marginBottom: 4 }}>Recommendation:</div>
              <div style={{ fontSize: 14, color: '#E8EDF5', marginBottom: 10 }}>{result.recommendation}</div>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#F5E642', marginBottom: 4 }}>Estimated Cost:</div>
              <div style={{ fontSize: 14, color: '#10B981', fontWeight: 600 }}>{result.costEst}</div>
            </div>
          )}
        </div>
        <div style={{ color: '#64748B', fontSize: 12, textAlign: 'center' }}>General guidance only — consult your insurance agent for policy-specific advice.</div>
      </div>
    </div>
  );
}
