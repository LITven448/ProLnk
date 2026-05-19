import { useState } from 'react';

const symptoms = [
  { id: 'cracks_interior', label: 'Interior sheetrock cracks (diagonal from corners)', weight: 4 },
  { id: 'cracks_exterior', label: 'Exterior brick or mortar cracks', weight: 3 },
  { id: 'doors_stick', label: 'Doors or windows sticking or not latching', weight: 4 },
  { id: 'floors_slope', label: 'Sloped or uneven floors', weight: 5 },
  { id: 'gaps_trim', label: 'Gaps between trim, baseboards, or crown molding', weight: 3 },
  { id: 'pier_history', label: 'Seller discloses prior foundation repairs', weight: 3 },
  { id: 'old_home', label: 'Home built before 1985', weight: 2 },
  { id: 'company_bid', label: 'Foundation company already gave a pier bid', weight: 5 },
];

export default function DFWFoundationEngineerGuide() {
  const [selected, setSelected] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const toggle = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const score = selected.reduce((acc, id) => {
    const f = symptoms.find(r => r.id === id);
    return acc + (f ? f.weight : 0);
  }, 0);

  const pierBid = selected.includes('company_bid');

  const getResult = () => {
    if (pierBid || score >= 8) return {
      label: 'Structural Engineer Required',
      color: '#FF6B6B',
      rec: 'Do not rely on a foundation company\’s own assessment. A PE provides an independent structural opinion that protects your negotiation and is required by most lenders for foundation work.',
      cost: '$500 – $1,500',
      expect: 'Written report with elevation survey, cause analysis, and repair scope. Can be used to bid multiple contractors.',
    };
    if (score >= 5) return {
      label: 'Engineer Strongly Recommended',
      color: '#FFB347',
      rec: 'Multiple movement indicators present. A structural engineer can quantify movement, identify cause (drainage vs soil vs age), and give you an independent repair cost estimate.',
      cost: '$500 – $1,000',
      expect: 'Elevation readings, crack pattern analysis, drainage assessment, and written report.',
    };
    if (score >= 3) return {
      label: 'Enhanced General Inspection May Suffice',
      color: '#F5E642',
      rec: 'Some indicators present. Ask your TREC inspector for a detailed foundation section. If they note movement, upgrade to a PE evaluation before closing.',
      cost: '$0 additional if standard inspector is thorough',
      expect: 'TREC inspectors assess foundation visually but cannot issue structural opinions.',
    };
    return {
      label: 'Standard Inspection Likely Adequate',
      color: '#4CAF50',
      rec: 'No significant movement indicators. TREC inspector will assess visually. If they flag concerns, escalate to a PE.',
      cost: 'Included in standard inspection fee',
      expect: 'Visual check only — no elevation survey without PE engagement.',
    };
  };

  const result = getResult();

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF6', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ backgroundColor: '#0D1F3C', borderBottom: '3px solid #F5E642', padding: '32px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>DFW Inspection Series</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#fff', margin: '0 0 12px' }}>🏗️ Foundation Engineer Inspection Guide</h1>
          <p style={{ color: '#94A3B8', fontSize: 16, margin: 0 }}>When to hire a licensed structural engineer vs. rely on your general inspector — and how to use the PE report in negotiations.</p>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px' }}>

        <div style={{ backgroundColor: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>🌍 DFW Foundation Context</h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7, margin: '0 0 12px' }}>Dallas-Fort Worth sits on some of the most expansive clay soil in North America. These soils shrink dramatically in drought and swell with rain — creating constant movement beneath slab foundations. The vast majority of DFW homes show some foundation movement during their lifetime.</p>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7, margin: 0 }}>The critical question is not <em>whether</em> a foundation has moved, but <em>how much</em>, <em>why</em>, and <em>whether it needs repair</em>. That determination requires a licensed structural engineer (PE) — not a foundation repair company with a financial interest in selling piers.</p>
        </div>

        <div style={{ backgroundColor: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>⚖️ PE vs. General Inspector vs. Foundation Company</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              { icon: '🎓', title: 'Licensed Structural Engineer (PE)', desc: 'Issues legally binding structural opinion. Performs elevation survey with transit level. Can testify in court. Required by lenders for major foundation work. Independent — no financial interest in repair outcome.' },
              { icon: '🔍', title: 'TREC Home Inspector', desc: 'Visual assessment only. Can note crack patterns and flag concerns. Cannot issue structural opinion or perform elevation survey. Required report on all TREC inspections.' },
              { icon: '🔨', title: 'Foundation Repair Company', desc: 'Free bids often inflate scope. Incentivized to recommend maximum piers. Not independent. Never use a foundation company\’s report as your sole assessment.' },
            ].map(item => (
              <div key={item.title} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', backgroundColor: '#132240', borderRadius: 8, padding: 16 }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ color: '#fff', fontWeight: 700, marginBottom: 4 }}>{item.title}</div>
                  <div style={{ color: '#94A3B8', fontSize: 14 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>📋 What a PE Report Includes</h2>
          <div style={{ display: 'grid', gap: 8 }}>
            {[
              'Elevation survey — precise measurements at 5–10 ft intervals to map slab deflection',
              'Cause determination — poor drainage, tree roots, plumbing leaks, or natural soil movement',
              'Current vs. acceptable movement thresholds (L/360 rule)',
              'Repair recommendation — none needed, monitoring, drainage improvements, or pier installation',
              'Pier count and placement specification if recommended',
              'Estimated repair cost range — useful for negotiation and contractor bidding',
            ].map((line, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, backgroundColor: '#132240', borderRadius: 8, padding: 12 }}>
                <span style={{ color: '#F5E642', fontWeight: 700, flexShrink: 0 }}>→</span>
                <span style={{ color: '#CBD5E1', fontSize: 14 }}>{line}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 4px' }}>💰 Typical DFW Cost</h2>
          <div style={{ color: '#4CAF50', fontSize: 28, fontWeight: 800, margin: '8px 0 4px' }}>$500 – $1,500</div>
          <p style={{ color: '#94A3B8', fontSize: 14, margin: 0 }}>If repair is needed: steel pier installation typically $300–$500 per pier. Most DFW repairs run 8–20 piers = $3,000–$10,000. Drainage correction alone sometimes resolves the issue for $1,000–$3,000.</p>
        </div>

        <div style={{ backgroundColor: '#0D1F3C', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 4px' }}>🎯 Engineer or Inspector?</h2>
          <p style={{ color: '#94A3B8', fontSize: 14, margin: '0 0 20px' }}>Select all symptoms or conditions observed at this property:</p>
          <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
            {symptoms.map(f => (
              <label key={f.id} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', backgroundColor: selected.includes(f.id) ? '#1E3A5F' : '#132240', borderRadius: 8, padding: '12px 16px', border: `2px solid ${selected.includes(f.id) ? '#F5E642' : 'transparent'}`, transition: 'all 0.2s' }}>
                <input type="checkbox" checked={selected.includes(f.id)} onChange={() => toggle(f.id)} style={{ display: 'none' }} />
                <span style={{ width: 20, height: 20, borderRadius: 4, border: `2px solid ${selected.includes(f.id) ? '#F5E642' : '#4A5568'}`, backgroundColor: selected.includes(f.id) ? '#F5E642' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#0A1628', fontWeight: 900, fontSize: 14 }}>{selected.includes(f.id) ? '✓' : ''}</span>
                <span style={{ color: selected.includes(f.id) ? '#fff' : '#CBD5E1', fontSize: 15 }}>{f.label}</span>
              </label>
            ))}
          </div>
          <button onClick={() => setShowResult(true)} style={{ width: '100%', padding: '14px', backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: 16, borderRadius: 8, border: 'none', cursor: 'pointer' }}>Get Recommendation →</button>
          {showResult && (
            <div style={{ marginTop: 20, padding: 20, backgroundColor: '#132240', borderRadius: 10, borderLeft: `4px solid ${result.color}` }}>
              <div style={{ color: result.color, fontWeight: 800, fontSize: 20, marginBottom: 8 }}>{result.label}</div>
              <p style={{ color: '#CBD5E1', margin: '0 0 12px' }}>{result.rec}</p>
              <div style={{ display: 'grid', gap: 6 }}>
                <div style={{ color: '#94A3B8', fontSize: 13 }}><strong style={{ color: '#F5E642' }}>Estimated Cost:</strong> {result.cost}</div>
                <div style={{ color: '#94A3B8', fontSize: 13 }}><strong style={{ color: '#F5E642' }}>What to Expect:</strong> {result.expect}</div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
