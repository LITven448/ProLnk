import { useState } from 'react';

const WOOD_TYPES = ['Wood frame (standard)', 'Wood frame + exterior masonry', 'All masonry', 'Steel frame'];

function getSprinklerEstimate(sqft: number, woodType: string) {
  const isHighRisk = woodType.startsWith('Wood frame');
  const costPerSqft = isHighRisk ? 2.25 : 1.5;
  const retroCost = Math.round(sqft * costPerSqft / 100) * 100;
  const insuranceSavings = Math.round(retroCost * 0.12 / 100) * 100;
  const paybackYears = Math.round(retroCost / insuranceSavings);
  return { retroCost, insuranceSavings, paybackYears, riskLevel: isHighRisk ? 'Elevated' : 'Standard', required: sqft > 5000 ? 'Required in some DFW cities for new construction' : 'Not required for existing homes under 5,000 sq ft' };
}

export default function DFWFireSprinklerGuide() {
  const [sqft, setSqft] = useState('');
  const [woodType, setWoodType] = useState('');
  const [result, setResult] = useState<ReturnType<typeof getSprinklerEstimate> | null>(null);

  function calculate() {
    const s = parseInt(sqft);
    if (!s || !woodType) return;
    setResult(getSprinklerEstimate(s, woodType));
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '0.85rem', color: '#F5E642', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>🏠 DFW HOME SAFETY</div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 1rem', lineHeight: 1.2 }}>DFW Residential Fire Sprinkler Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.6, margin: 0 }}>
            DFW summers are dry, hot, and windy — conditions that cause fast-spreading house fires. Wood fencing connecting adjacent properties creates a fuel highway.
            Residential fire sprinklers suppress or extinguish 96% of fires before firefighters arrive.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
          {[
            { icon: '🌵', title: 'DFW Fire Risk Factors', body: 'DFW averages 83 days above 90°F. Summer relative humidity drops below 20%. Wood privacy fences connect yard to yard across neighborhoods — a fence fire can reach your home in minutes. Dry years increase wildland-urban interface risk in Frisco, McKinney, and Mansfield.' },
            { icon: '🏗️', title: 'New Construction Requirements', body: 'Some DFW cities require sprinklers for new homes over 5,000 sq ft: Plano (5,000 sq ft), Murphy, and several HOA-controlled master-planned communities. Check with your city\’s fire marshal before building. IRC Section P2904 governs residential sprinkler design.' },
            { icon: '🔄', title: 'Retrofit Cost: $1–$3/sq ft', body: 'Retrofit cost varies by home age and plumbing access. Single-story slab homes: $1.25–$1.75/sq ft. Two-story with attic access: $1.75–$2.50/sq ft. Finished attic or complex layout: up to $3/sq ft. Typical 2,500 sq ft DFW home: $3,100–$6,250.' },
            { icon: '💰', title: 'Insurance Discount: 10–15%', body: 'Most Texas insurers offer 10–15% annual premium discounts for homes with UL-listed sprinkler systems. At $3,000/yr insurance premium, that\’s $300–$450/yr savings. Payback period on a retrofit is typically 7–15 years — but the life-safety value is immediate.' },
            { icon: '🏠', title: 'Home vs. Commercial Systems', body: 'Residential sprinklers use CPVC or PEX pipe (not steel). Each head activates independently — only the head near the fire activates, not the whole house. A typical residential sprinkler uses 13 gallons/minute vs 250 gpm from a fire hose. You\’ll have wet floors, not a flooded house.' },
            { icon: '🔧', title: 'Maintenance Requirements', body: 'Annual inspection by a licensed sprinkler contractor is recommended. Test the flow switch quarterly. Keep sprinkler heads free from paint and obstructions. Replace heads every 50 years or after any activation. Never hang anything from sprinkler pipes or heads.' },
          ].map(card => (
            <div key={card.title} style={{ backgroundColor: '#0f2340', border: '1px solid #1e3a5f', borderRadius: '12px', padding: '1.25rem' }}>
              <div style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>{card.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.4rem', fontSize: '0.95rem' }}>{card.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.55 }}>{card.body}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f2340', border: '2px solid #F5E642', borderRadius: '16px', padding: '2rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.3rem', fontWeight: 800, margin: '0 0 1.5rem' }}>🧮 Sprinkler Retrofit Estimator</h2>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>HOME SIZE (sq ft)</label>
            <input type="number" value={sqft} onChange={e => { setSqft(e.target.value); setResult(null); }} placeholder="e.g. 2500" style={{ backgroundColor: '#0A1628', border: '1.5px solid #1e3a5f', borderRadius: '8px', padding: '0.6rem 1rem', color: '#fff', fontSize: '1rem', width: '200px' }} />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>CONSTRUCTION TYPE</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {WOOD_TYPES.map(t => (
                <button key={t} onClick={() => { setWoodType(t); setResult(null); }} style={{ padding: '0.45rem 1rem', borderRadius: '20px', border: '1.5px solid', borderColor: woodType === t ? '#F5E642' : '#1e3a5f', backgroundColor: woodType === t ? '#F5E642' : 'transparent', color: woodType === t ? '#0A1628' : '#94a3b8', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}>{t}</button>
              ))}
            </div>
          </div>

          <button onClick={calculate} style={{ backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: '1rem', padding: '0.75rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Calculate Retrofit Cost →</button>

          {result && (
            <div style={{ marginTop: '1.5rem', backgroundColor: '#0A1628', borderRadius: '10px', padding: '1.25rem', border: '1px solid #1e3a5f' }}>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: '1.05rem', marginBottom: '0.75rem' }}>✅ Your Sprinkler Estimate</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                {[['Retrofit Cost', `$${result.retroCost.toLocaleString()}–$${(result.retroCost * 1.3).toLocaleString()}`], ['Annual Insurance Savings', `$${result.insuranceSavings}/yr`], ['Payback Period', `~${result.paybackYears} years`], ['Risk Level', result.riskLevel]].map(([label, val]) => (
                  <div key={label as string} style={{ backgroundColor: '#0f2340', borderRadius: '8px', padding: '0.75rem' }}>
                    <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: '0.25rem' }}>{label}</div>
                    <div style={{ color: '#F5E642', fontWeight: 800 }}>{val}</div>
                  </div>
                ))}
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>📋 Code Status: {result.required}</div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#0f2340', borderRadius: '12px', padding: '1.25rem', border: '1px solid #1e3a5f' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>🔗 Get a DFW Fire Sprinkler Quote</div>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.55, margin: 0 }}>ProLnk connects DFW homeowners with NICET-certified fire sprinkler contractors licensed in Texas. Free on-site estimates, permits pulled, city inspections coordinated.</p>
        </div>

      </div>
    </div>
  );
}
