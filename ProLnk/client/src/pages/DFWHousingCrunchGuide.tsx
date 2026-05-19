import { useState } from 'react';

const STRATEGY_SECTIONS = [
  { id: 'unlisted', label: '🔍 Finding Unlisted Homes', content: 'Drive target neighborhoods on weekday mornings — for-sale-by-owner signs appear before MLS listings. Knock on doors of homes you love. Send handwritten letters to specific addresses. Estate attorneys and probate court filings surface homes before they hit market in DFW.' },
  { id: 'standout', label: '⭐ Standing Out as a Buyer', content: 'Get a fully underwritten pre-approval (not just pre-qual) from a local DFW lender — sellers prefer buyers whose financing is already verified. Include a personal letter with your offer explaining why you love the home. Limit repair requests to safety items only.' },
  { id: 'offer', label: '📝 Making Your Offer Compelling', content: 'Offer above asking in competitive zip codes. Include an escalation clause up to your true ceiling. Offer a flexible closing timeline — many DFW sellers need 45-60 days to find their next home. Cash reserves proof alongside a financing offer can be as strong as an all-cash offer.' },
  { id: 'areas', label: '🗺️ DFW Areas with Less Competition', content: 'Garland, Mesquite, Lancaster, and Duncanville consistently offer below-median pricing with improving infrastructure. Fate, Royse City, and Kaufman offer DFW commute access at 20-30% below McKinney/Frisco pricing. East Dallas (78214-78218) is the highest-velocity appreciation corridor.' },
  { id: 'timing', label: '⏰ Timing Your DFW Purchase', content: 'November and December have the least buyer competition in DFW — sellers who list then are motivated. January brings new listings for spring market — move fast. July-August competition drops 15-20% as families settle into school routines. Avoid March-May for buyer leverage.' },
];

type BudgetRange = 'under300' | '300to500' | '500to750' | 'over750' | '';
type DFWArea = 'urban' | 'suburban' | 'emerging' | '';
type Situation = 'firsttime' | 'moving' | 'investor' | '';

interface StrategyResult {
  probability: string;
  label: string;
  strategies: string[];
  color: string;
}

function getStrategy(budget: BudgetRange, area: DFWArea, situation: Situation): StrategyResult | null {
  if (!budget || !area || !situation) return null;
  const isLow = budget === 'under300';
  const isMid = budget === '300to500';
  const isUrban = area === 'urban';
  const isEmerging = area === 'emerging';

  if (isLow && isUrban) return { probability: '35-50%', label: '⚠️ Challenging', color: '#E5854A', strategies: ['Expand search radius to Garland, Mesquite, or Grand Prairie immediately', 'Request seller-paid closing costs to preserve down payment', 'Consider FHA 203k loan for distressed properties with renovation potential', 'Set instant MLS alerts — you must view within hours and offer within 24 hours'] };
  if (isMid && isUrban) return { probability: '55-70%', label: '🟡 Competitive', color: '#F5E642', strategies: ['Pre-approval with DFW local lender (avoid national banks in fast markets)', 'Escalation clause $5K-$15K over asking with a firm ceiling', 'Offer 30-45 day close with flexible leaseback option for seller', 'Waive minor repairs — request credit instead of inspection contingency removal'] };
  if (isEmerging) return { probability: '75-90%', label: '✅ Strong Position', color: '#4AE5A0', strategies: ['You have leverage in emerging areas — negotiate seller concessions', 'Request home warranty, pest inspection, and survey paid by seller', 'Look for 2020-2023 builds with no deferred maintenance and rate buydowns', 'Negotiate closing date that aligns with your timeline — less competition means more flexibility'] };
  if (situation === 'investor') return { probability: '60-75%', label: '🟡 Market-Dependent', color: '#F5E642', strategies: ['Target 1970s-1990s brick ranches in Garland, Richardson, and Irving for best cap rates', 'DFW gross rent multiplier averages 14-17x — model at 16x before offers', 'Cash or 20%+ down required to compete on investment properties in DFW', 'Section 8 vacancy rates under 2% in southern DFW — strong cash flow corridor'] };
  return { probability: '65-80%', label: '✅ Good Position', color: '#4AE5A0', strategies: ['Your budget and target area are well-matched for current DFW market conditions', 'Get pre-approved this week and start touring immediately — inventory moves fast', 'Identify your top 3 non-negotiables and be flexible on everything else', 'Build relationship with one buyer\’s agent who specializes in your target zip codes'] };
}

export default function DFWHousingCrunchGuide() {
  const [active, setActive] = useState<string | null>(null);
  const [budget, setBudget] = useState<BudgetRange>('');
  const [area, setArea] = useState<DFWArea>('');
  const [situation, setSituation] = useState<Situation>('');

  const result = getStrategy(budget, area, situation);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🏘️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>
            DFW Housing Crunch Survival Guide
          </h1>
          <p style={{ color: '#8A9BB5', fontSize: 15, margin: 0 }}>
            How to compete and win as a buyer in DFW's tight real estate market
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
          {STRATEGY_SECTIONS.map(s => (
            <div key={s.id}>
              <button
                onClick={() => setActive(active === s.id ? null : s.id)}
                style={{ width: '100%', textAlign: 'left', background: active === s.id ? '#1E3A5F' : '#0F2340', border: '1px solid', borderColor: active === s.id ? '#F5E642' : '#1E3A5F', borderRadius: 10, padding: '14px 18px', color: '#E8EDF5', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}
              >
                {s.label}
              </button>
              {active === s.id && (
                <div style={{ background: '#0F2340', border: '1px solid #1E3A5F', borderTop: 'none', borderRadius: '0 0 10px 10px', padding: '16px 18px', fontSize: 14, color: '#B8C8DC', lineHeight: 1.6 }}>
                  {s.content}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2340', border: '1px solid #1E3A5F', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, fontWeight: 700, margin: '0 0 20px' }}>
            🎯 Your DFW Buyer Assessment
          </h2>

          <div style={{ marginBottom: 16 }}>
            <p style={{ color: '#8A9BB5', fontSize: 13, margin: '0 0 10px' }}>Budget:</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {([['under300', 'Under $300K'], ['300to500', '$300K-$500K'], ['500to750', '$500K-$750K'], ['over750', '$750K+']] as const).map(([key, label]) => (
                <button key={key} onClick={() => setBudget(key)} style={{ padding: '10px 8px', background: budget === key ? '#F5E642' : '#1E3A5F', color: budget === key ? '#0A1628' : '#E8EDF5', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <p style={{ color: '#8A9BB5', fontSize: 13, margin: '0 0 10px' }}>Target DFW Area:</p>
            <div style={{ display: 'flex', gap: 8 }}>
              {([['urban', '🏙️ Urban Core'], ['suburban', '🏡 Suburbs'], ['emerging', '🌱 Emerging']] as const).map(([key, label]) => (
                <button key={key} onClick={() => setArea(key)} style={{ flex: 1, padding: '10px 4px', background: area === key ? '#F5E642' : '#1E3A5F', color: area === key ? '#0A1628' : '#E8EDF5', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <p style={{ color: '#8A9BB5', fontSize: 13, margin: '0 0 10px' }}>Buyer Situation:</p>
            <div style={{ display: 'flex', gap: 8 }}>
              {([['firsttime', '🌟 First-Time'], ['moving', '🔄 Moving Up'], ['investor', '💼 Investor']] as const).map(([key, label]) => (
                <button key={key} onClick={() => setSituation(key)} style={{ flex: 1, padding: '10px 4px', background: situation === key ? '#F5E642' : '#1E3A5F', color: situation === key ? '#0A1628' : '#E8EDF5', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {result && (
            <div style={{ background: '#1E3A5F', borderRadius: 10, padding: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ background: '#0A1628', borderRadius: 8, padding: '8px 16px' }}>
                  <div style={{ color: '#8A9BB5', fontSize: 11, marginBottom: 2 }}>Offer Success Probability</div>
                  <div style={{ color: result.color, fontWeight: 800, fontSize: 22 }}>{result.probability}</div>
                </div>
                <div style={{ fontWeight: 700, fontSize: 16, color: result.color }}>{result.label}</div>
              </div>
              <ul style={{ margin: 0, padding: '0 0 0 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {result.strategies.map((s, i) => (
                  <li key={i} style={{ color: '#B8C8DC', fontSize: 14, lineHeight: 1.6 }}>{s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <p style={{ textAlign: 'center', color: '#3A5070', fontSize: 12, marginTop: 32 }}>
          ProLnk — DFW Home Intelligence
        </p>
      </div>
    </div>
  );
}
