import { useState } from 'react';

const improvements = [
  { rank: 1, name: 'Garage Door Replacement', roi: 94, cost: '$1,200–$2,000', recovered: '$1,130–$1,880', why: 'Highest ROI in DFW due to climate — garages face extreme heat stress. New insulated door improves curb appeal and energy efficiency simultaneously. Buyers notice instantly.' },
  { rank: 2, name: 'Attic Insulation Upgrade', roi: 92, cost: '$1,500–$3,000', recovered: '$1,380–$2,760', why: 'DFW attics hit 140°F+ in summer. Upgrading from R-19 to R-38+ pays back in 3-4 years through electricity savings and commands premium at appraisal. Green features matter here.' },
  { rank: 3, name: 'Minor Kitchen Remodel', roi: 81, cost: '$15,000–$25,000', recovered: '$12,150–$20,250', why: 'Reskin not gut: paint cabinets, replace hardware, new countertops, updated fixtures. DFW buyers expect modern kitchens but overimproving kills ROI.' },
  { rank: 4, name: 'Fresh Exterior Paint', roi: 78, cost: '$3,000–$5,500', recovered: '$2,340–$4,290', why: 'DFW sun fades paint fast — 7-10 years max. Fresh exterior paint is the single highest-impact curb appeal improvement and protects wood siding from UV damage.' },
  { rank: 5, name: 'Landscape Refresh', roi: 75, cost: '$3,000–$8,000', recovered: '$2,250–$6,000', why: 'DFW curb appeal is enormous. Native plants (drought-tolerant) lower water bills and survive heat. Tree-lined lots sell faster. First impressions set price anchors.' },
  { rank: 6, name: 'HVAC Replacement', roi: 71, cost: '$8,000–$14,000', recovered: '$5,680–$9,940', why: 'Pre-emptive HVAC replacement is a massive negotiating chip. Buyers expect to negotiate $5-10K off for aging HVAC — replacing it removes that card from their hand.' },
  { rank: 7, name: 'Bathroom Remodel (Minor)', roi: 68, cost: '$8,000–$15,000', recovered: '$5,440–$10,200', why: 'Updated bathrooms are table stakes in DFW buyer expectations. Focus on fixtures, lighting, and tile — not moving plumbing. Keep it minor, ROI collapses on full gut jobs.' },
  { rank: 8, name: 'Deck Addition', roi: 65, cost: '$15,000–$28,000', recovered: '$9,750–$18,200', why: 'DFW outdoor living obsession is real. A well-designed deck extends living space and is heavily valued in spring/summer markets. Composite materials hold up better in DFW heat.' },
  { rank: 9, name: 'Window Replacement', roi: 62, cost: '$10,000–$18,000', recovered: '$6,200–$11,160', why: 'DFW energy bills are brutal with single-pane windows. Low-E double-pane windows cut cooling costs 15-25%, qualify for federal tax credits, and are required by savvy buyers.' },
  { rank: 10, name: 'Foundation Drainage System', roi: 58, cost: '$2,000–$5,000', recovered: '$1,160–$2,900', why: 'Every DFW buyer\’s inspector checks drainage. Poor drainage causes foundation issues — the #1 DFW buyer walkaway. Fixing it proactively eliminates the biggest inspection red flag.' },
];

export default function DFWTop10Improvements() {
  const [homeValue, setHomeValue] = useState(350);
  const [budget, setBudget] = useState(25);
  const [showPicks, setShowPicks] = useState(false);

  const affordable = improvements.filter(imp => {
    const minCost = parseInt(imp.cost.replace(/[^0-9]/g, '').slice(0, 5));
    return minCost <= budget * 1000;
  });

  const top3 = affordable
    .sort((a, b) => b.roi - a.roi)
    .slice(0, 3);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>ProLnk DFW Series</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>🏆 Top 10 DFW Home Improvements by ROI</h1>
        <p style={{ color: '#8899AA', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
          Not all improvements are equal in DFW. These rankings are based on DFW resale data, Remodeling Magazine's Cost vs Value Report, and local appraisal patterns in Collin, Dallas, Tarrant, and Denton counties.
        </p>

        <div style={{ background: '#0D1F38', border: '1px solid #1E3A5F', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <div style={{ fontWeight: 700, marginBottom: 16, fontSize: 15 }}>🎯 Find Your Top 3 Improvements</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ fontSize: 13, color: '#8899AA', display: 'block', marginBottom: 6 }}>Home Value (estimated)</label>
              <input type="range" min={150} max={1000} step={25} value={homeValue} onChange={e => setHomeValue(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642' }} />
              <div style={{ color: '#F5E642', fontWeight: 700 }}>${homeValue}K</div>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#8899AA', display: 'block', marginBottom: 6 }}>Budget Available</label>
              <input type="range" min={2} max={100} step={2} value={budget} onChange={e => setBudget(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642' }} />
              <div style={{ color: '#F5E642', fontWeight: 700 }}>${budget}K</div>
            </div>
          </div>
          <button
            onClick={() => setShowPicks(true)}
            style={{ marginTop: 16, background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}
          >
            Show My Top 3 DFW Improvements →
          </button>
        </div>

        {showPicks && (
          <div style={{ background: '#F5E64212', border: '1px solid #F5E64240', borderRadius: 12, padding: 20, marginBottom: 28 }}>
            <div style={{ fontWeight: 700, marginBottom: 14, fontSize: 16, color: '#F5E642' }}>Your Top 3 for ${budget}K Budget on a ${homeValue}K DFW Home</div>
            {top3.map((imp, i) => (
              <div key={imp.rank} style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px', marginBottom: 10 }}>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>#{i + 1} {imp.name} — {imp.roi}% ROI</div>
                <div style={{ color: '#8899AA', fontSize: 13, lineHeight: 1.6 }}>{imp.why}</div>
                <div style={{ marginTop: 8, fontSize: 13 }}>
                  <span style={{ color: '#AABBCC' }}>Cost: </span><span style={{ color: '#fff', fontWeight: 700 }}>{imp.cost}</span>
                  <span style={{ color: '#AABBCC', marginLeft: 16 }}>Recovered: </span><span style={{ color: '#4CAF50', fontWeight: 700 }}>{imp.recovered}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>All 10 Improvements Ranked</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {improvements.map(imp => (
            <div key={imp.rank} style={{ background: '#0D1F38', border: '1px solid #1E3A5F', borderRadius: 10, padding: '14px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>#{imp.rank} {imp.name}</div>
                <div style={{ display: 'flex', gap: 16, fontSize: 13 }}>
                  <span style={{ color: '#F5E642', fontWeight: 700 }}>{imp.roi}% ROI</span>
                  <span style={{ color: '#8899AA' }}>{imp.cost}</span>
                </div>
              </div>
              <div style={{ marginTop: 6, fontSize: 13, color: '#7A8B9C', lineHeight: 1.5 }}>{imp.why.slice(0, 100)}…</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 36, textAlign: 'center', background: '#0D1F38', border: '1px solid #1E3A5F', borderRadius: 12, padding: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Get vetted DFW contractors for your top improvement.</div>
          <div style={{ color: '#8899AA', fontSize: 14 }}>ProLnk pre-qualifies contractors by trade and zip — no cold calls, no emergency markups.</div>
        </div>
      </div>
    </div>
  );
}
