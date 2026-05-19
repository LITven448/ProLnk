import { useState } from 'react';

const VALUABLES_OPTIONS = ['Documents', 'Jewelry', 'Cash', 'Firearms', 'Electronics', 'Collectibles'];
const QTY_OPTIONS = ['1-5 items', '6-20 items', '21-50 items', '50+ items'];

function getRecommendation(valuables: string[], qty: string) {
  const hasFirearms = valuables.includes('Firearms');
  const hasDocuments = valuables.includes('Documents');
  const largeQty = qty === '50+ items' || qty === '21-50 items';
  if (hasFirearms && hasDocuments) {
    return { type: 'Combination Gun + Document Safe', size: largeQty ? '2.5+ cu ft' : '1.5 cu ft', fireRating: 'UL 350°F / 1 hr minimum', waterRating: 'ETL Verified', cost: largeQty ? '$1,800–$3,500′ : '$900–$1,800', anchor: ’Bolt to slab — required in DFW homes on pier-and-beam or slab' };
  }
  if (hasFirearms) {
    return { type: 'Gun Safe', size: largeQty ? '40+ gun capacity' : '12–24 gun capacity', fireRating: 'UL RSC Rated', waterRating: 'Not required unless near flood zone', cost: largeQty ? '$1,200–$3,000′ : '$500–$1,200', anchor: ’Bolt to concrete slab — critical in DFW tornado risk areas' };
  }
  if (hasDocuments) {
    return { type: 'Fireproof Document Safe', size: largeQty ? '1.0 cu ft' : '0.5 cu ft', fireRating: 'UL 350°F / 1 hr — protects paper', waterRating: 'ETL Verified flood-resistant', cost: largeQty ? '$300–$700′ : '$150–$300', anchor: ’Floor-mount or wall-mount recommended' };
  }
  return { type: 'General Home Safe', size: largeQty ? '2.0+ cu ft' : '0.5–1.0 cu ft', fireRating: 'UL 350°F / 30 min minimum', waterRating: 'Sealed lid preferred', cost: largeQty ? '$400–$1,000′ : '$200–$500', anchor: ’Anchor to interior closet floor for concealment' };
}

export default function DFWHomeSafeGuide() {
  const [selectedValuables, setSelectedValuables] = useState<string[]>([]);
  const [qty, setQty] = useState('');
  const [result, setResult] = useState<ReturnType<typeof getRecommendation> | null>(null);

  function toggleValuable(v: string) {
    setSelectedValuables(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v]);
    setResult(null);
  }

  function calculate() {
    if (selectedValuables.length === 0 || !qty) return;
    setResult(getRecommendation(selectedValuables, qty));
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '0.85rem', color: '#F5E642', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>🏠 DFW HOME SECURITY</div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 1rem', lineHeight: 1.2 }}>DFW Home Safe Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.6, margin: 0 }}>
            DFW homeowners face a unique combination of threats: violent thunderstorms, flash floods, tornadoes, and a burglary rate above the national average.
            Choosing the right safe means matching fire rating, water resistance, and anchoring method to your specific risks and valuables.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
          {[
            { icon: '🌪️', title: 'Tornado & Storm Risk', body: 'DFW averages 30+ tornadoes annually. A safe anchored to your slab can survive structural collapse and protect documents that insurance adjusters require post-disaster.' },
            { icon: '🔥', title: 'Fire Ratings Explained', body: 'UL 350°F/1 hr means the interior stays below 350°F for one hour in a 1,700°F fire. Paper chars at 451°F — this rating protects documents. For digital media, you need UL 125°F.' },
            { icon: '💧', title: 'Flood Resistance', body: 'DFW sits in Flash Flood Alley. ETL-verified water-resistant safes survive brief submersion. Standard fireproof safes are NOT waterproof — fire retardant materials absorb water.' },
            { icon: '🔩', title: 'Anchoring to DFW Slab', body: '85% of DFW homes are slab-on-grade — ideal for concrete anchor bolts. Use 3/8″ x 3″ concrete anchors minimum. An unanchored 500-lb safe can be removed by two people in under 4 minutes.' },
            { icon: '🔫', title: 'Gun Safes vs Document Safes', body: 'Gun safes prioritize pry resistance (steel gauge, locking bolts). Document safes prioritize fire insulation (thicker walls, drywall composite). Combined units sacrifice some of each — budget accordingly.' },
            { icon: '💰', title: 'Cost Tiers', body: '$200–$500: Basic fireproof box. $500–$1,200: Solid gun or document safe. $1,200–$3,000: Premium RSC-rated gun safe. $3,000–$5,000+: TL-15 rated high-security vault.' },
          ].map(card => (
            <div key={card.title} style={{ backgroundColor: '#0f2340', border: '1px solid #1e3a5f', borderRadius: '12px', padding: '1.25rem' }}>
              <div style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>{card.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.4rem', fontSize: '0.95rem' }}>{card.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.55 }}>{card.body}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f2340', border: '2px solid #F5E642', borderRadius: '16px', padding: '2rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.3rem', fontWeight: 800, margin: '0 0 1.5rem' }}>🔧 Safe Recommender</h2>

          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.6rem', fontWeight: 600 }}>WHAT ARE YOU PROTECTING? (select all that apply)</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {VALUABLES_OPTIONS.map(v => (
                <button key={v} onClick={() => toggleValuable(v)} style={{ padding: '0.45rem 1rem', borderRadius: '20px', border: '1.5px solid', borderColor: selectedValuables.includes(v) ? '#F5E642′ : '#1e3a5f', backgroundColor: selectedValuables.includes(v) ? '#F5E642' : ’transparent', color: selectedValuables.includes(v) ? '#0A1628′ : '#94a3b8', fontWeight: 600, fontSize: '0.85rem', cursor: ’pointer' }}>{v}</button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.6rem', fontWeight: 600 }}>APPROXIMATE QUANTITY</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {QTY_OPTIONS.map(q => (
                <button key={q} onClick={() => { setQty(q); setResult(null); }} style={{ padding: '0.45rem 1rem', borderRadius: '20px', border: '1.5px solid', borderColor: qty === q ? '#F5E642′ : '#1e3a5f', backgroundColor: qty === q ? '#F5E642' : ’transparent', color: qty === q ? '#0A1628′ : '#94a3b8', fontWeight: 600, fontSize: '0.85rem', cursor: ’pointer' }}>{q}</button>
              ))}
            </div>
          </div>

          <button onClick={calculate} style={{ backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: '1rem', padding: '0.75rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Get My Recommendation →</button>

          {result && (
            <div style={{ marginTop: '1.5rem', backgroundColor: '#0A1628', borderRadius: '10px', padding: '1.25rem', border: '1px solid #1e3a5f' }}>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: '1.05rem', marginBottom: '0.75rem' }}>✅ Recommended: {result.type}</div>
              {[['📦 Size', result.size], ['🔥 Fire Rating', result.fireRating], ['💧 Water Rating', result.waterRating], ['💰 Cost Range', result.cost], ['🔩 Anchoring', result.anchor]].map(([label, val]) => (
                <div key={label as string} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.5rem', fontSize: '0.88rem' }}>
                  <span style={{ color: '#94a3b8', minWidth: '120px' }}>{label}</span>
                  <span style={{ color: '#e2e8f0′ }}>{val}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#0f2340', borderRadius: '12px', padding: '1.25rem', border: '1px solid #1e3a5f' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>🔗 Get a DFW Safe Installation Quote</div>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.55, margin: 0 }}>ProLnk connects you with licensed DFW locksmiths and safe installers who can deliver, anchor, and certify your safe installation. Quotes in 24 hours, fully insured.</p>
        </div>

      </div>
    </div>
  );
}
