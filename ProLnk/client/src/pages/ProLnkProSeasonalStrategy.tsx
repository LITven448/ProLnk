import { useState } from 'react';

type SeasonKey = 'summer' | 'fall' | 'winter' | 'spring';

interface SeasonData {
  icon: string;
  label: string;
  peak: boolean;
  tips: string[];
}

type TradeSeasons = Record<SeasonKey, SeasonData>;

export default function ProLnkProSeasonalStrategy() {
  const [trade, setTrade] = useState('HVAC');
  const [activeSeason, setActiveSeason] = useState<SeasonKey>('summer');

  const trades = ['HVAC', 'Plumbing', 'Electrical', 'Roofing', 'Painting', 'Landscaping'];

  const strategies: Record<string, TradeSeasons> = {
    HVAC: {
      summer: { icon: '🌞', label: 'PEAK SEASON', peak: true, tips: ['Emergency AC response wins premium pricing ($150-250/hr)', 'Respond within 15 min — homeowners are desperate in DFW summer', 'Offer same-day tune-ups on neighbor referrals while on-site'] },
      fall: { icon: '🍂', label: 'Transition Season', peak: false, tips: ['Sell fall tune-ups proactively — "get heat ready before first freeze"', 'Upsell from AC service to whole-system inspection', 'Recruit other HVAC techs before your busiest season returns'] },
      winter: { icon: '❄️', label: 'Emergency Season', peak: true, tips: ['Freeze night = 10x normal volume on ProLnk — be available', 'Emergency heat call-outs: charge $95+ trip fee at market rate', 'Stock common parts to avoid costly return trips'] },
      spring: { icon: '🌸', label: 'Prep Season', peak: false, tips: ['AC tune-up season begins April — promote via ProLnk profile', 'Run spring specials to build Vault homeowner relationships', 'Hire a helper now before the summer surge hits'] },
    },
    Plumbing: {
      summer: { icon: '🌞', label: 'Steady Season', peak: false, tips: ['Outdoor irrigation and hose bib work peaks in summer', 'Bathroom remodels peak — market full rough-in services', 'Slower for emergency = good time to build your network'] },
      fall: { icon: '🍂', label: 'Prep Season', peak: false, tips: ['Winterize irrigation systems (September-October window)', 'Market outdoor faucet insulation service proactively', 'Inspect water heaters before winter demand spike'] },
      winter: { icon: '❄️', label: 'PEAK SEASON', peak: true, tips: ['Burst pipe response is the highest-margin plumbing call', 'DFW winter 2021 killed 1 in 3 water heaters — always be ready', 'Offer 24-hr emergency line and charge accordingly'] },
      spring: { icon: '🌸', label: 'Growth Season', peak: false, tips: ['Spring remodel season = kitchen and bath rough-in demand', 'Market water heater replacements — winter exposed weak units', 'Best time to earn 5-star reviews from new customers'] },
    },
    Electrical: {
      summer: { icon: '🌞', label: 'Steady Season', peak: false, tips: ['EV charger installs peak as summer driving increases', 'AC circuit upgrades needed for new and upgraded units', 'Panel upgrades for pool equipment are common in DFW'] },
      fall: { icon: '🍂', label: 'Prep Season', peak: false, tips: ['Holiday light outlet demand starts in October', 'GFCI upgrades before holiday entertaining season', 'Smoke detector replacements — Daylight Saving Time reminder'] },
      winter: { icon: '❄️', label: 'Surge Season', peak: true, tips: ['Space heater overload = urgent panel and outlet calls', 'Holiday light circuit issues flood the feed December-January', 'Generator installs spike after every DFW freeze event'] },
      spring: { icon: '🌸', label: 'Remodel Season', peak: true, tips: ['Spring remodel = highest electrical rough-in volume all year', 'Outdoor living spaces: outlet, fan, lighting runs', 'Best season to recruit other electricians to your network'] },
    },
    Roofing: {
      summer: { icon: '🌞', label: 'Storm Season', peak: true, tips: ['Hail events = same-day lead surge — respond immediately', 'Set ProLnk notifications to instant — storms move fast in DFW', 'Carry tarp material for emergency roof covering'] },
      fall: { icon: '🍂', label: 'PEAK SEASON', peak: true, tips: ['Best install weather: October-November in DFW', 'Market pre-winter roof inspections aggressively', 'Complete all storm work before holiday slowdown'] },
      winter: { icon: '❄️', label: 'Slow Season', peak: false, tips: ['Use slow time to build your ProLnk network', 'Offer discounted inspections to build Vault relationships', 'Get certifications or manufacturer training'] },
      spring: { icon: '🌸', label: 'Storm Prep Season', peak: false, tips: ['April-May hail season approaches — stock materials now', 'Market spring inspection: "check after winter for hidden damage"', 'Best time for large commercial jobs before summer heat'] },
    },
    Painting: {
      summer: { icon: '🌞', label: 'PEAK SEASON', peak: true, tips: ['Exterior painting peaks May-September in DFW', 'Long days = more production per crew per week', 'Hire labor now — temp painters available in summer'] },
      fall: { icon: '🍂', label: 'Strong Season', peak: true, tips: ['Interior projects shift up as temperatures drop', 'Holiday prep drives interior repaint demand', 'Exterior deadlines before November — market urgency'] },
      winter: { icon: '❄️', label: 'Interior Season', peak: false, tips: ['Full interior repaint season when exterior work stops', 'Holiday gift projects: accent walls, nursery painting', 'Use downtime to build your network for spring push'] },
      spring: { icon: '🌸', label: 'Ramp-Up Season', peak: false, tips: ['Spring cleaning drives repaint decisions March-April', 'Exterior season begins — pre-sell summer slots now', 'Best season for deck and fence staining projects'] },
    },
    Landscaping: {
      summer: { icon: '🌞', label: 'Maintenance Peak', peak: true, tips: ['Weekly mowing contracts are highest-volume in summer', 'DFW heat = irrigation issues every single week', 'Hire helpers — student labor available summer'] },
      fall: { icon: '🍂', label: 'Clean-Up Season', peak: false, tips: ['Fall clean-up and leaf removal is high-ticket work', 'Winterization: irrigation blow-out, plant wrapping', 'Best time to sign annual maintenance contracts'] },
      winter: { icon: '❄️', label: 'Slow Season', peak: false, tips: ['Use slow season to cold-call commercial properties', 'Market spring projects now while clients plan ahead', 'Build your ProLnk network with extra time'] },
      spring: { icon: '🌸', label: 'PEAK SEASON', peak: true, tips: ['Spring install season: sod, beds, trees, hardscape', 'ProLnk leads surge March-May — be fully staffed', 'Landscape lighting and irrigation startup in high demand'] },
    },
  };

  const seasons: SeasonKey[] = ['summer', 'fall', 'winter', 'spring'];
  const tradeData = strategies[trade] || strategies['HVAC'];
  const seasonData = tradeData[activeSeason];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>📅</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: '8px 0 4px' }}>Seasonal Income Strategy</h1>
          <p style={{ color: '#8899AA', fontSize: 14 }}>DFW Market · Maximize Every Season</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <label style={{ color: '#8899AA', fontSize: 12, display: 'block', marginBottom: 8 }}>YOUR TRADE</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {trades.map(t => (
              <button key={t} onClick={() => setTrade(t)}
                style={{ padding: '7px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
                  background: trade === t ? '#F5E642' : '#1A2E4A', color: trade === t ? '#0A1628' : '#fff',
                  fontWeight: trade === t ? 700 : 400, fontSize: 13 }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8, marginBottom: 20 }}>
          {seasons.map(s => {
            const sd = tradeData[s];
            return (
              <button key={s} onClick={() => setActiveSeason(s)}
                style={{ padding: '10px 4px', borderRadius: 10,
                  border: `2px solid ${activeSeason === s ? '#F5E642' : 'transparent'}`,
                  background: activeSeason === s ? '#1A2E4A' : '#0F2040', cursor: 'pointer', textAlign: 'center' }}>
                <div style={{ fontSize: 20 }}>{sd.icon}</div>
                <div style={{ color: activeSeason === s ? '#F5E642' : '#8899AA', fontSize: 11, marginTop: 4, textTransform: 'capitalize' }}>{s}</div>
                {sd.peak && (
                  <div style={{ background: '#F5E642', color: '#0A1628', fontSize: 9, fontWeight: 700,
                    borderRadius: 4, padding: '1px 4px', marginTop: 3 }}>PEAK</div>
                )}
              </button>
            );
          })}
        </div>

        <div style={{ background: '#1A2E4A', borderRadius: 12, padding: 24,
          border: `2px solid ${seasonData.peak ? '#F5E642' : '#2A3E5A'}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 32 }}>{seasonData.icon}</span>
            <div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, textTransform: 'capitalize' }}>
                {activeSeason} Strategy
              </div>
              <div style={{ background: seasonData.peak ? '#F5E642' : '#2A3E5A',
                color: seasonData.peak ? '#0A1628' : '#8899AA', fontSize: 11, fontWeight: 700,
                borderRadius: 4, padding: '2px 8px', display: 'inline-block', marginTop: 2 }}>
                {seasonData.label}
              </div>
            </div>
          </div>
          {seasonData.tips.map((tip, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
              <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 20 }}>{i + 1}.</span>
              <span style={{ color: '#ccc', fontSize: 14, lineHeight: 1.5 }}>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
