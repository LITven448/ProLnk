import { useState } from 'react';

const problemOptions = ['Can\’t keep up with DFW heat (100°F+ days)', 'High humidity indoors even when cool', 'Huge electric bills in summer', 'Short cycling — turns on/off constantly', 'Noise from the outdoor unit', 'Want best long-term efficiency'];
const budgetOptions = ['Under $5,000', '$5,000–$8,000', '$8,000–$12,000', '$12,000+', 'Best value for the money'];

const getCompressorRec = (problem: string, budget: string) => {
  if (!problem || !budget) return null;
  const isHighBudget = budget.includes('12,000') || budget.includes('8,000');
  const isBudgetConscious = budget.includes('Under') || budget.includes('5,000');

  if (problem.includes('humidity') || problem.includes('Short cycling')) return {
    type: 'Variable Speed Compressor',
    brands: 'Carrier Infinity, Lennox XC21, Trane XV20i',
    reason: 'Variable speed runs at low capacity for long cycles — exactly what DFW needs for humidity control. Short cycles can\’t dehumidify; variable speed removes moisture continuously.',
    dfwBenefit: 'Can drop indoor RH from 65% to 45% without overcooling — critical for DFW summers',
    costPremium: '$2,000–$4,000 over two-stage',
    payback: '4–7 years via energy savings + comfort'
  };
  if (problem.includes('bills') && isHighBudget) return {
    type: 'Variable Speed Compressor',
    brands: 'Carrier Infinity, Lennox XC21, Daikin DX20VC',
    reason: 'In DFW\’s 7-month cooling season, variable speed saves 30-40% vs single-stage. The longer the season, the faster the payback.',
    dfwBenefit: '~$600–$900/year savings for a 2,500 sqft DFW home vs. single-stage',
    costPremium: '$3,000–$5,000 more than single-stage',
    payback: '4–6 years then pure savings'
  };
  if (problem.includes('bills') && isBudgetConscious) return {
    type: 'Two-Stage Compressor',
    brands: 'Carrier 24ACC, Lennox XC17, Trane XR17',
    reason: 'Two-stage gives you 60-70% of variable speed savings at 50% of the premium. Best value for DFW homeowners watching the budget.',
    dfwBenefit: 'Runs on low stage ~80% of time in DFW — quieter, more efficient than single-stage',
    costPremium: '$800–$1,500 over single-stage',
    payback: '3–5 years'
  };
  if (problem.includes('keep up') || problem.includes('100°F')) return {
    type: 'Variable Speed or Two-Stage',
    brands: 'Check SEER2 rating + proper sizing first',
    reason: 'If the system can\’t keep up, it may be undersized first. But if sized correctly, variable speed maintains comfort even at 105°F by matching load precisely.',
    dfwBenefit: 'Proper sizing matters — an oversized single-stage unit cools fast but can\’t handle DFW humidity',
    costPremium: '$1,500–$4,000 depending on type chosen',
    payback: '3–7 years'
  };
  return {
    type: 'Two-Stage Compressor',
    brands: 'Carrier 24ACC, Lennox XC17, Rheem RA17',
    reason: 'Two-stage is the DFW sweet spot — significantly better than single-stage for humidity and efficiency, without the full variable speed premium.',
    dfwBenefit: '60-70% low-stage operation in DFW\’s mild shoulder seasons cuts bills and noise',
    costPremium: '$800–$1,500 over single-stage',
    payback: '3–5 years'
  };
};

export default function DFWHVACCompressorTypeFinal() {
  const [problem, setProblem] = useState('');
  const [budget, setBudget] = useState('');
  const rec = getCompressorRec(problem, budget);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>HVAC Compressor Types for DFW: Single, Two-Stage & Variable Speed</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>DFW's extreme heat and humidity make compressor choice more important than almost anywhere. Here’s how each type performs in your conditions.</p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>⚙️ Compressor Types Compared for DFW</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              ['Single-Stage', '❌ DFW Struggles', 'All-or-nothing — 100% or off. Short cycles mean poor humidity control in DFW summers. Lowest upfront cost but highest operating cost.', '$3,500–$5,500'],
              ['Two-Stage', '✅ DFW Good', 'Low (60-65%) and high capacity. Runs on low stage ~80% of DFW season. Better humidity, quieter, 15-20% more efficient.', '$5,000–$8,000'],
              ['Variable Speed', '⭐ DFW Ideal', '40-100% capacity in tiny increments. Long slow cycles = best humidity control. 30-40% more efficient. The right choice if budget allows.', '$8,000–$13,000'],
            ].map(([type, rating, desc, cost]) => (
              <div key={type} style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div style={{ fontWeight: 600 }}>{type}</div>
                  <div style={{ fontSize: 13, color: '#F5E642′ }}>{cost}</div>
                </div>
                <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 4 }}>{rating}</div>
                <div style={{ color: '#94a3b8', fontSize: 14 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🎯 Find Your DFW Compressor Match</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: 8, fontSize: 14 }}>Biggest DFW problem you face</label>
            <select value={problem} onChange={e => setProblem(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
              <option value="">Select your problem...</option>
              {problemOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: 8, fontSize: 14 }}>Budget range</label>
            <select value={budget} onChange={e => setBudget(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
              <option value="">Select budget...</option>
              {budgetOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          {rec && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginBottom: 4 }}>✅ {rec.type}</div>
              <div style={{ color: '#64748b', fontSize: 13, marginBottom: 10 }}>Examples: {rec.brands}</div>
              <div style={{ color: '#94a3b8', marginBottom: 12, lineHeight: 1.6 }}>{rec.reason}</div>
              <div style={{ background: '#0f2040', borderRadius: 8, padding: 12, marginBottom: 10 }}>
                <span style={{ color: '#F5E642′ }}>🌡️ DFW Benefit: </span><span style={{ color: '#e2e8f0', fontSize: 14 }}>{rec.dfwBenefit}</span>
              </div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 14 }}>
                <div><span style={{ color: '#F5E642′ }}>💰 Premium: </span><span style={{ color: '#e2e8f0' }}>{rec.costPremium}</span></div>
                <div><span style={{ color: '#F5E642′ }}>⏱️ Payback: </span><span style={{ color: '#e2e8f0' }}>{rec.payback}</span></div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Get Compressor Quotes from DFW HVAC Pros</div>
          <div style={{ color: '#1a2f4a', fontSize: 14 }}>ProLnk matches you with pros who understand DFW load requirements and can recommend proper sizing</div>
        </div>
      </div>
    </div>
  );
}
