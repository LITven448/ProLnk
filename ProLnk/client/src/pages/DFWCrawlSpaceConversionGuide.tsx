import { useState } from 'react';

const currentSituations = ['Open crawl space, no encapsulation', 'Partial encapsulation already done', 'Pier & beam with moisture issues', 'Crawl space with standing water'];
const projectGoals = ['Eliminate moisture/mold', 'Add HVAC efficiency', 'Convert to full slab', 'Sell home / increase value'];

function getCrawlSpaceOptions(situation: string, goal: string) {
  if (goal === 'Convert to full slab') {
    return {
      recommended: 'Full Crawl Space Fill & Slab Conversion',
      cost: '$15,000–$45,000+',
      permit: 'Yes — structural permit required in all DFW municipalities',
      timeline: '2–4 weeks',
      notes: 'Major structural project. Requires engineering drawings, city permit, and coordination with HVAC/plumbing that may run through crawl space. Common in older DFW homes converting to modern slab.',
      pros: ['Eliminates moisture permanently', 'Increases home value', 'Removes pest entry points', 'Modern slab durability'],
      cons: ['High cost', 'Lengthy permit process', 'Disrupts existing utility runs', 'Requires structural engineering'],
    };
  }
  if (situation === 'Crawl space with standing water' || goal === 'Eliminate moisture/mold') {
    return {
      recommended: 'Full Encapsulation with Drainage System',
      cost: '$5,000–$15,000',
      permit: 'Usually not required, but check local DFW city code',
      timeline: '3–7 days',
      notes: 'Heavy vapor barrier (20-mil minimum) + perimeter drainage channel + sump pump. Most cost-effective solution for DFW crawl spaces with moisture. Addresses mold and structural wood protection.',
      pros: ['Eliminates moisture and mold risk', 'Protects structural wood', 'Improves HVAC efficiency', 'Lower cost than conversion'],
      cons: ['Requires annual inspection', 'Sump pump needs maintenance', 'Does not add square footage'],
    };
  }
  if (goal === 'Add HVAC efficiency') {
    return {
      recommended: 'Encapsulation + Conditioned Crawl Space',
      cost: '$8,000–$18,000',
      permit: 'Mechanical permit may be required for HVAC tie-in',
      timeline: '1–2 weeks',
      notes: 'Convert vented crawl space to conditioned (unvented) by sealing vents, adding vapor barrier, and connecting to HVAC system. Dramatically reduces energy costs in DFW climate.',
      pros: ['15–25% HVAC efficiency gain', 'Eliminates unconditioned air infiltration', 'Protects ductwork from DFW humidity', 'Qualifies for energy tax credits'],
      cons: ['HVAC system must be appropriately sized', 'Higher upfront cost', 'Requires professional HVAC coordination'],
    };
  }
  return {
    recommended: 'Basic Vapor Barrier + Drainage Improvement',
    cost: '$2,500–$6,000',
    permit: 'Not typically required',
    timeline: '2–4 days',
    notes: 'For homes preparing to sell or with minor moisture concerns. 6-mil or 10-mil vapor barrier + improved site drainage addresses most basic DFW crawl space issues cost-effectively.',
    pros: ['Lower cost entry point', 'Improves air quality', 'Protects structural members', 'Fast installation'],
    cons: ['Not as durable as full encapsulation', 'May not address severe moisture', 'Will likely need upgrade within 5–7 years'],
  };
}

export default function DFWCrawlSpaceConversionGuide() {
  const [situation, setSituation] = useState('');
  const [goal, setGoal] = useState('');
  const [showResult, setShowResult] = useState(false);

  const result = situation && goal ? getCrawlSpaceOptions(situation, goal) : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME GUIDE</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 8 }}>Crawl Space Options & Conversion Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.7 }}>Some older DFW homes — especially in historic Fort Worth, East Dallas, and pre-1960 neighborhoods — still have crawl spaces. Here's what your options are, from encapsulation to full slab conversion.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 32 }}>
          {[
            { icon: '🛡️', label: 'Vapor Barrier', cost: '$2,500–$6,000', desc: 'Basic moisture protection' },
            { icon: '📦', label: 'Full Encapsulation', cost: '$5,000–$15,000', desc: 'Sealed barrier + drainage + sump' },
            { icon: '🏗️', label: 'Slab Conversion', cost: '$15,000–$45,000+', desc: 'Fill crawl space, pour new slab' },
          ].map(o => (
            <div key={o.label} style={{ background: '#112240', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{o.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{o.label}</div>
              <div style={{ color: '#F5E642', fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{o.cost}</div>
              <div style={{ fontSize: 12, color: '#94a3b8' }}>{o.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 16 }}>🔍 Find Your Best Crawl Space Solution</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Current Situation</div>
              <select value={situation} onChange={e => { setSituation(e.target.value); setShowResult(false); }} style={{ width: '100%', padding: 10, borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f' }}>
                <option value="">Select...</option>
                {currentSituations.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Project Goal</div>
              <select value={goal} onChange={e => { setGoal(e.target.value); setShowResult(false); }} style={{ width: '100%', padding: 10, borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f' }}>
                <option value="">Select...</option>
                {projectGoals.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => setShowResult(true)} disabled={!situation || !goal} style={{ padding: '12px 24px', background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, cursor: 'pointer', opacity: (!situation || !goal) ? 0.5 : 1 }}>
            See My Options
          </button>
          {showResult && result && (
            <div style={{ marginTop: 16 }}>
              <div style={{ padding: 16, background: '#0A1628', borderRadius: 8, borderLeft: '3px solid #F5E642', marginBottom: 12 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>✅ Recommended: {result.recommended}</div>
                <p style={{ fontSize: 14, lineHeight: 1.6, margin: '8px 0 0 0', color: '#cbd5e1' }}>{result.notes}</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 12 }}>
                {[
                  { label: '💰 Cost Estimate', value: result.cost },
                  { label: '📋 Permit Required', value: result.permit },
                  { label: '⏱️ Timeline', value: result.timeline },
                ].map(({ label, value }) => (
                  <div key={label} style={{ padding: 12, background: '#0A1628', borderRadius: 8, borderTop: '2px solid #F5E642' }}>
                    <div style={{ fontSize: 12, color: '#F5E642', marginBottom: 4 }}>{label}</div>
                    <div style={{ fontSize: 13 }}>{value}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div style={{ padding: 12, background: '#0A1628', borderRadius: 8 }}>
                  <div style={{ fontSize: 12, color: '#22c55e', marginBottom: 6 }}>✅ Pros</div>
                  {result.pros.map(p => <div key={p} style={{ fontSize: 13, marginBottom: 4 }}>• {p}</div>)}
                </div>
                <div style={{ padding: 12, background: '#0A1628', borderRadius: 8 }}>
                  <div style={{ fontSize: 12, color: '#f59e0b', marginBottom: 6 }}>⚠️ Cons</div>
                  {result.cons.map(c => <div key={c} style={{ fontSize: 13, marginBottom: 4 }}>• {c}</div>)}
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 12, color: '#F5E642' }}>📍 DFW Crawl Space Facts</div>
          {['Crawl spaces are rare in DFW — most pre-1960 older neighborhoods', 'DFW clay soil creates hydrostatic pressure on crawl space walls — sealing is critical', 'Encapsulated crawl spaces in DFW can reduce HVAC loads by 15–20%', 'Slab conversion requires structural engineer + city permit in all DFW cities'].map(f => (
            <div key={f} style={{ fontSize: 13, marginBottom: 8, color: '#cbd5e1' }}>• {f}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
