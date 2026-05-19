import { useState } from 'react';

const diyChecklist = [
  { id: 'declutter', label: 'Declutter every room', note: 'Critical — affects perceived square footage. Remove 30–40% of your stuff.' },
  { id: 'clean', label: 'Deep clean including baseboards and windows', note: 'Buyers notice grime. Professional clean runs $200–500 and is worth every penny.' },
  { id: 'paint', label: 'Neutral paint touch-up', note: 'Cover bold accent walls. Agreeable Gray (SW 7029) or White Dove (BM OC-17) are safe choices.' },
  { id: 'photos', label: 'Remove personal photos and collections', note: "Buyers need to visualize their life in the home, not yours." },
  { id: 'listing-photos', label: 'Hire a professional for listing photos', note: 'Amateur photos kill listings. Pro real estate photography runs $150–400 and is non-negotiable.' },
  { id: 'curb', label: 'Curb appeal: fresh mulch, trimmed bushes, power wash', note: 'First impression is formed before buyers leave the car. DFW summers are brutal — keep landscaping alive.' },
  { id: 'fixes', label: 'Fix squeaky doors and dripping faucets', note: 'Small deferred maintenance signals bigger neglect to buyers.' },
  { id: 'bulbs', label: 'Replace all light bulbs with warm LED', note: 'Consistent warm lighting (2700K–3000K) makes spaces feel inviting in listing photos.' },
];

const proOptions = [
  {
    scenario: 'Empty Home',
    cost: '$1,500 – $4,500',
    duration: '2–3 month rental',
    desc: 'Always stage a vacant home. Empty rooms photograph terribly and look smaller. Stagers bring furniture, art, and accessories.',
    roi: 'Staged vacant homes sell 87% faster than empty ones in DFW.',
    recommended: true,
  },
  {
    scenario: 'Occupied Home',
    cost: '$500 – $1,500',
    duration: 'Consultation + edit',
    desc: 'Stager walks the home, edits existing furniture, rearranges, recommends what to remove/add. You keep living there.',
    roi: 'Avg $3,000–8,000 increase in sale price for occupied stagings.',
    recommended: false,
  },
];

export default function HomeStagingGuide() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  const completedCount = Object.values(checked).filter(Boolean).length;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '0 0 80px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 20px' }}>
        <div style={{ paddingTop: 60, paddingBottom: 40, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ color: '#F5C842', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>DFW Seller Guide</div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 800, margin: '0 0 16px', lineHeight: 1.2 }}>Home Staging Guide</h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 17, margin: 0 }}>Sell faster and for more in the DFW market. Staged homes sell 73% faster and for an average of 6% more.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, margin: '48px 0 40px' }}>
          {[['73%', 'faster to sell'], ['6%', 'higher sale price'], ['$1 = $3', 'staging ROI']].map(([stat, label], i) => (
            <div key={i} style={{ background: 'rgba(245,200,66,0.08)', border: '1px solid rgba(245,200,66,0.2)', borderRadius: 12, padding: 24, textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#F5C842′ }}>{stat}</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>DIY Staging Checklist</h2>
            <div style={{ background: 'rgba(245,200,66,0.15)', border: '1px solid rgba(245,200,66,0.3)', borderRadius: 20, padding: '6px 16px', fontSize: 13, color: '#F5C842', fontWeight: 700 }}>
              {completedCount}/{diyChecklist.length} complete
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
            {diyChecklist.map((item, i) => (
              <div
                key={item.id}
                onClick={() => toggle(item.id)}
                style={{
                  display: 'flex', gap: 16, padding: '20px 24px', cursor: 'pointer',
                  borderBottom: i < diyChecklist.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  background: checked[item.id] ? 'rgba(245,200,66,0.06)' : 'transparent',
                  transition: 'background 0.2s',
                }}
              >
                <div style={{
                  width: 24, height: 24, borderRadius: 6, border: checked[item.id] ? 'none' : '2px solid rgba(255,255,255,0.2)',
                  background: checked[item.id] ? '#F5C842′ : ’transparent', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, marginTop: 2, transition: 'all 0.2s',
                }}>
                  {checked[item.id] && <span style={{ color: '#0A1628', fontSize: 14, fontWeight: 800 }}>✓</span>}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15, color: checked[item.id] ? 'rgba(255,255,255,0.4)' : '#fff', textDecoration: checked[item.id] ? 'line-through' : 'none' }}>{item.label}</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, marginTop: 4, lineHeight: 1.5 }}>{item.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24 }}>Professional Staging Options</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {proOptions.map((opt, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: opt.recommended ? '1px solid rgba(245,200,66,0.4)' : '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 28 }}>
                {opt.recommended && <div style={{ background: '#F5C842', color: '#0A1628', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20, display: 'inline-block', marginBottom: 12, letterSpacing: 1 }}>RECOMMENDED</div>}
                <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>{opt.scenario}</div>
                <div style={{ color: '#F5C842', fontWeight: 700, fontSize: 18, marginBottom: 4 }}>{opt.cost}</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, marginBottom: 16 }}>{opt.duration}</div>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, lineHeight: 1.7, margin: '0 0 16px' }}>{opt.desc}</p>
                <div style={{ background: 'rgba(245,200,66,0.08)', borderRadius: 8, padding: 12 }}>
                  <div style={{ color: '#F5C842', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>ROI Data</div>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>{opt.roi}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, rgba(245,200,66,0.1), rgba(245,200,66,0.03))', border: '1px solid rgba(245,200,66,0.25)', borderRadius: 16, padding: 32 }}>
          <div style={{ fontSize: 24 }}>🔨</div>
          <h3 style={{ fontSize: 20, fontWeight: 800, margin: '12px 0 8px' }}>Get Your Home Stage-Ready Fast</h3>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, lineHeight: 1.7, margin: '0 0 20px' }}>
            Need painters, cleaners, handymen, or landscapers before your listing goes live? ProLnk connects you with vetted local contractors — usually same-week availability. No guessing, no Yelp lottery.
          </p>
          <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: '#F5C842', color: '#0A1628', fontWeight: 700, padding: '12px 24px', borderRadius: 8, textDecoration: 'none', fontSize: 15 }}>Find Pre-Listing Contractors →</a>
        </div>
      </div>
    </div>
  );
}
