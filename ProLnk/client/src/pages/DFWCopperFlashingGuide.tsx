import { useState } from 'react';

const flashingData: Record<string, Record<string, { recommendation: string; cost: string; lifespan: string; notes: string }>> = {
  'Chimney flashing': {
    'Premium / long-term': { recommendation: 'Copper flashing', cost: '$400–800 for full chimney', lifespan: '50–100 years', notes: 'Copper is the gold standard for DFW chimneys. Develops patina that actually seals better over time. DFW thermal expansion is handled naturally by copper\’s flexibility. Compatible with all DFW masonry types.' },
    'Budget / standard': { recommendation: 'Galvanized steel flashing', cost: '$150–300 for full chimney', lifespan: '15–25 years in DFW', notes: 'Galvanized corrodes faster in DFW humidity. Expect rust bleeding onto masonry after 10 years. Repaint with zinc-rich primer every 5 years to extend life. Fine for starter homes or before selling.' },
  },
  'Valley flashing': {
    'Premium / long-term': { recommendation: 'Copper valley flashing', cost: '$8–15 per linear foot installed', lifespan: '50+ years', notes: 'Copper valleys are extremely low-maintenance. DFW high-wind events (hail, 60+ mph gusts) — copper\’s flexibility prevents cracking. Does not stain shingles. Best choice if staying in home 10+ years.' },
    'Budget / standard': { recommendation: 'Aluminum or galvanized valley flashing', cost: '$3–6 per linear foot installed', lifespan: '10–20 years in DFW', notes: 'Aluminum reacts with some DFW concrete tile shingles — verify compatibility. Galvanized is safe with all shingle types but rusts. Adequate for most DFW budget re-roofs.' },
  },
  'Step flashing (siding to roof)': {
    'Premium / long-term': { recommendation: 'Copper step flashing', cost: '$200–500 for typical DFW home', lifespan: '50+ years', notes: 'Copper step flashing eliminates the #1 DFW roof leak source. Each piece is bent and woven with shingles. DFW roofers rarely offer this — request it specifically. Worth every dollar for long-term ownership.' },
    'Budget / standard': { recommendation: 'Galvanized step flashing', cost: '$80–200 for typical DFW home', lifespan: '20–30 years', notes: 'Industry standard in DFW. Inspect annually for rust at overlap points. DFW freeze-thaw (rare but real) can crack improperly seated galvanized flashing. Verify proper installation — step flashing done wrong causes wall rot.' },
  },
  'Drip edge': {
    'Premium / long-term': { recommendation: 'Copper drip edge', cost: '$4–8 per linear foot', lifespan: '50+ years', notes: 'Copper drip edge is unusual but extremely durable. Pairs best with copper gutters. DFW benefit: never rusts, compatible with all fascia materials, expands with DFW heat without cracking paint.' },
    'Budget / standard': { recommendation: 'Aluminum drip edge (standard)', cost: '$1–2 per linear foot', lifespan: '25–40 years', notes: 'Aluminum drip edge is the DFW standard. Lightweight, corrosion-resistant, available at all DFW lumber yards. Paint to match fascia. Adequate for virtually all DFW homes.' },
  },
};

export default function DFWCopperFlashingGuide() {
  const [flashingType, setFlashingType] = useState('');
  const [budget, setBudget] = useState('');
  const result = flashingType && budget ? flashingData[flashingType]?.[budget] : null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🏠 DFW HOME GUIDES</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Copper Flashing Guide — DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>When copper is worth the premium, how DFW weather affects copper vs galvanized, and cost vs lifespan comparisons.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ background: '#0f2030', borderRadius: 12, padding: '1.25rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.75rem' }}>🟤 Copper Advantages</div>
            <ul style={{ color: '#cbd5e1', fontSize: '0.9rem', paddingLeft: '1.25rem', lineHeight: 1.7 }}>
              <li>50–100 year lifespan</li>
              <li>Patina improves sealing over time</li>
              <li>No rust, no staining</li>
              <li>DFW heat: flexes without cracking</li>
              <li>Zero maintenance once installed</li>
            </ul>
          </div>
          <div style={{ background: '#0f2030', borderRadius: 12, padding: '1.25rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.75rem' }}>⚙️ Galvanized Advantages</div>
            <ul style={{ color: '#cbd5e1', fontSize: '0.9rem', paddingLeft: '1.25rem', lineHeight: 1.7 }}>
              <li>60–75% lower upfront cost</li>
              <li>Widely available DFW suppliers</li>
              <li>All DFW roofers experienced with it</li>
              <li>15–30 year lifespan adequate for most</li>
              <li>Paintable to match trim</li>
            </ul>
          </div>
        </div>

        <div style={{ background: '#0f2030', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.75rem' }}>☀️ DFW Climate: Flashing Stress Factors</div>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>
            DFW temperature swings from 18°F winter lows to 110°F summer highs create extreme expansion and contraction in metal flashing. 
            Galvanized steel expands and contracts more rigidly than copper — this causes sealant cracking at edges over 10–15 years. 
            Copper's natural malleability absorbs thermal stress better, which is why copper flashing installed in 1950 still performs in DFW homes today.
          </p>
        </div>

        <div style={{ background: '#0f2030', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', color: '#F5E642′ }}>🎯 DFW Flashing Recommendation</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Flashing Application</label>
              <select value={flashingType} onChange={e => setFlashingType(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '0.6rem' }}>
                <option value="">Select application</option>
                <option value="Chimney flashing">Chimney flashing</option>
                <option value="Valley flashing">Valley flashing</option>
                <option value="Step flashing (siding to roof)">Step flashing</option>
                <option value="Drip edge">Drip edge</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>DFW Budget Priority</label>
              <select value={budget} onChange={e => setBudget(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '0.6rem' }}>
                <option value="">Select priority</option>
                <option value="Premium / long-term">Premium / long-term ownership</option>
                <option value="Budget / standard">Budget / standard</option>
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', borderLeft: '3px solid #F5E642′ }}>
              <div style={{ marginBottom: '0.5rem' }}><span style={{ color: '#F5E642′ }}>Recommendation:</span> <span style={{ color: '#fff', fontWeight: 600 }}>{result.recommendation}</span></div>
              <div style={{ marginBottom: '0.5rem' }}><span style={{ color: '#F5E642′ }}>DFW Cost:</span> <span style={{ color: '#fff' }}>{result.cost}</span></div>
              <div style={{ marginBottom: '0.5rem' }}><span style={{ color: '#F5E642′ }}>Expected Lifespan:</span> <span style={{ color: '#fff' }}>{result.lifespan}</span></div>
              <div><span style={{ color: '#F5E642′ }}>Notes:</span> <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{result.notes}</span></div>
            </div>
          )}
        </div>

        <div style={{ background: '#0f2030', borderRadius: 12, padding: '1.25rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.5rem' }}>⚠️ Copper Compatibility Warning</div>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>
            Never mix copper with aluminum flashing or aluminum gutters. Galvanic corrosion between the two metals 
            causes rapid failure at contact points. Copper pairs with: copper, stainless steel fasteners, 
            and DFW-compatible masonry. Use copper nails (not galvanized) when installing copper flashing. 
            Ask your ProLnk roofer specifically about fastener compatibility.
          </p>
        </div>
      </div>
    </div>
  );
}
