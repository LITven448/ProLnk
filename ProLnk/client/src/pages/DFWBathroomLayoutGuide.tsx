import { useState } from 'react';

const bathTypes = [
  { id: 'primary_large', label: 'Primary Bath — Large (120+ sq ft)', type: 'primary' },
  { id: 'primary_small', label: 'Primary Bath — Small (60–120 sq ft)', type: 'primary' },
  { id: 'guest_full', label: 'Guest Bath — Full (tub/shower combo)', type: 'guest' },
  { id: 'guest_shower', label: 'Guest Bath — Walk-In Shower Only', type: 'guest' },
  { id: 'powder', label: 'Powder Room / Half Bath', type: 'powder' },
];

const bathAdvice: Record<string, { score: number; priorities: string[]; layout: string; cost: string; dfwNote: string }> = {
  primary_large: {
    score: 90,
    priorities: ['Walk-in shower separate from soaking tub', 'Double vanity minimum 60″ wide', 'Large mirror spanning vanity width', 'Frameless glass shower enclosure', 'Heated floors — DFW luxury baseline in 2026'],
    layout: 'Place double vanity on longest wall. Separate wet area (shower + tub) behind glass partition or in alcove. Toilet in private water closet with door. Large format tile (24x24 or herringbone) with minimal grout lines.',
    cost: '$8,000–$25,000 to optimize or renovate',
    dfwNote: 'Large primary baths are a DFW differentiator — new DFW construction often has 150+ sq ft primaries. A large bath that isn\’t upgraded loses its competitive advantage vs new construction comps.',
  },
  primary_small: {
    score: 65,
    priorities: ['Walk-in shower (remove tub if space constrained)', 'Single vanity with double sinks if width allows', 'Large mirror to open space visually', 'Light color tile throughout — avoid dark small baths', 'Frameless glass shower to maximize visual space'],
    layout: 'Prioritize large walk-in shower over soaking tub in small primary — DFW buyers prefer walk-in shower. Double sinks on 48–54″ vanity. Eliminate any visual clutter. Lighter tile, no busy patterns.',
    cost: '$6,000–$18,000 to optimize for DFW buyers',
    dfwNote: 'Small primary baths are a DFW risk factor — buyers compare to new construction 5 miles away with spa baths. A well-executed small primary needs to look intentionally designed, not like a compromise.',
  },
  guest_full: {
    score: 75,
    priorities: ['Replace tub surround tile if dated', 'Upgrade to single-lever faucets throughout', 'Add frameless glass door to tub/shower combo', 'Floating vanity if space allows — more modern DFW look', 'Quality shower curtain if keeping rod'],
    layout: 'Standard tub-shower combo is fully acceptable in guest baths. Focus on fresh tile, clean grout, and modern fixtures. Tub surround in large format subway (4x16) or tile reads more current than 4x4 squares.',
    cost: '$2,500–$8,000 for cosmetic refresh',
    dfwNote: 'Guest baths with tubs are preferred by DFW buyers with young children — removing tubs in guest baths can reduce buyer pool. Keep tub, upgrade surround.',
  },
  guest_shower: {
    score: 70,
    priorities: ['Ensure shower pan is modern (no old acrylic bases)', 'Frameless glass enclosure — DFW buyers expect this', 'Subway or large format tile on walls', 'Built-in niche for shampoo — remove plastic shower caddy', 'Rainhead or dual shower heads for DFW luxury feel'],
    layout: 'Walk-in shower without tub is acceptable in secondary guest bath if home has tub elsewhere. Size matters — 36x36″ minimum, 36x48″ preferred. Larger shower reads more valuable than small shower with tub.',
    cost: '$3,000–$10,000 for shower upgrade',
    dfwNote: 'DFW buyers with school-age children want at least one tub in the home — ensure primary or another bath retains tub if this guest bath is shower-only.',
  },
  powder: {
    score: 82,
    priorities: ['Statement vanity or vessel sink — powder rooms allow design risk', 'Bold wallpaper or paint — only room in DFW homes buyers expect a statement', 'Floating vanity to maximize floor space visual', 'Dramatic light fixture — powder room is Instagram-worthy in DFW buyer tours', 'Quality hand soap display and accessory set for showings'],
    layout: 'Powder rooms are small but high-impact — DFW buyers and their agents remember a well-designed powder room. Vessel sink on floating vanity. Bold paint or wallpaper on one or all walls. Dramatic pendant or sconce.',
    cost: '$2,000–$6,000 for statement refresh',
    dfwNote: 'Powder rooms in DFW are conversation pieces — buyers often mention them in offers. The only room where bold design is rewarded. Don\’t play it safe here.',
  },
};

export default function DFWBathroomLayoutGuide() {
  const [selected, setSelected] = useState('');
  const adv = selected ? bathAdvice[selected] : null;
  const bath = bathTypes.find(b => b.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>🛁 DFW Home Seller Guide</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Bathroom Layout Guide<br />for DFW Buyers</h1>
        <p style={{ color: '#8B9DC3', marginBottom: 40, fontSize: 16, lineHeight: 1.7 }}>
          Bathrooms close deals or kill them. DFW buyers are conditioned by new construction spa bathrooms with frameless glass, walk-in showers, and double vanities. Understanding what each bathroom type demands helps prioritize renovation ROI.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 40 }}>
          {[
            { icon: '🚿', title: 'Separate Shower Priority', note: 'DFW buyers rank walk-in shower above soaking tub in primary — tubs are secondary' },
            { icon: '🪞', title: 'Double Vanity', note: 'Two sinks in primary is expected in DFW 2026 — single sink raises red flags for couples' },
            { icon: '🪟', title: 'Frameless Glass', note: 'Frameless shower enclosures vs framed: $800 upgrade that increases perceived value by $5,000+' },
            { icon: '💡', title: 'Statement Powder', note: 'Powder rooms are the one space buyers expect drama — bold design is rewarded in DFW' },
          ].map(tip => (
            <div key={tip.title} style={{ background: '#0F2040', borderRadius: 10, padding: 20, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 24, marginBottom: 10 }}>{tip.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 6, color: '#F5E642′ }}>{tip.title}</div>
              <div style={{ fontSize: 13, color: '#8B9DC3', lineHeight: 1.5 }}>{tip.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 28, marginBottom: 32, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>🔍 Bathroom Optimization Advisor</h2>
          <p style={{ color: '#8B9DC3', marginBottom: 16, fontSize: 14 }}>Select your bathroom type:</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 10, marginBottom: 24 }}>
            {bathTypes.map(b => (
              <button key={b.id} onClick={() => setSelected(b.id)} style={{ background: selected === b.id ? '#F5E642′ : '#0A1628', color: selected === b.id ? '#0A1628' : '#E8EAF0', border: '2px solid', borderColor: selected === b.id ? '#F5E642' : '#1E3A5F', borderRadius: 8, padding: '12px 16px', cursor: ’pointer', textAlign: 'left', fontWeight: 600, fontSize: 13 }}>
                {b.label}
              </button>
            ))}
          </div>
          {adv && bath && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 24, border: '1px solid #F5E642′ }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 4, color: '#F5E642′ }}>{bath.label}</div>
                  <div style={{ color: '#8B9DC3', fontSize: 13 }}>DFW Buyer Appeal Score</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 44, fontWeight: 800, color: adv.score >= 80 ? '#4CAF50′ : adv.score >= 65 ? '#F5E642' : '#FF6B6B' }}>{adv.score}</div>
                  <div style={{ fontSize: 11, color: '#8B9DC3', letterSpacing: 1, textTransform: 'uppercase' }}>out of 100</div>
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10, color: '#F5E642′ }}>⭐ DFW Buyer Priority Features</div>
                {adv.priorities.map((p, i) => (
                  <div key={i} style={{ fontSize: 13, color: '#8B9DC3', marginBottom: 7, paddingLeft: 16, position: 'relative', lineHeight: 1.5 }}>
                    <span style={{ position: 'absolute', left: 0, color: '#F5E642′ }}>→</span>{p}
                  </div>
                ))}
              </div>
              <div style={{ background: '#0F2040', borderRadius: 8, padding: 14, marginBottom: 14 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8, color: '#E8EAF0′ }}>📐 Layout Recommendation</div>
                <div style={{ fontSize: 13, color: '#8B9DC3', lineHeight: 1.6 }}>{adv.layout}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ background: '#0F2040', borderRadius: 8, padding: 14 }}>
                  <div style={{ fontSize: 11, color: '#8B9DC3', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Cost Estimate</div>
                  <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 15 }}>{adv.cost}</div>
                </div>
                <div style={{ background: '#0F2040', borderRadius: 8, padding: 14 }}>
                  <div style={{ fontSize: 11, color: '#8B9DC3', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>DFW Market Context</div>
                  <div style={{ fontSize: 12, color: '#E8EAF0', lineHeight: 1.5 }}>{adv.dfwNote}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
