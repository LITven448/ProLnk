import { useState } from 'react';

type SituationKey = 'vacant' | 'occupied-dated' | 'occupied-fine' | 'new-construction';
type BudgetKey = 'minimal' | 'moderate' | 'full';

interface StagingRec {
  recommendation: string;
  rationale: string;
  approach: string[];
  services: { name: string; cost: string; dfwRating: string }[];
  disclosure: string;
  roi: string;
}

const recommendations: Record<SituationKey, Record<BudgetKey, StagingRec>> = {
  vacant: {
    minimal: {
      recommendation: '✅ Virtual Staging — Best choice for vacant + tight budget',
      rationale: 'Vacant homes are hardest for DFW buyers to visualize. Virtual staging solves this at 10–15% of physical staging cost.',
      approach: ['Order virtual staging for all main living areas + primary bedroom', 'Use photos with virtual furniture for MLS and Zillow', 'Disclose in listing: "Photos show virtual staging"', 'Keep exterior and detail shots unfurnished'],
      services: [
        { name: 'BoxBrownie', cost: '$32/room', dfwRating: '⭐⭐⭐⭐⭐ — Most used in DFW market' },
        { name: 'Stuccco', cost: '$29/room', dfwRating: '⭐⭐⭐⭐ — Fast turnaround, good DFW style options' },
        { name: 'VHT Studios', cost: '$50–75/room', dfwRating: '⭐⭐⭐⭐⭐ — Premium quality, used by top DFW agents' },
        { name: 'Redfin Virtual Staging', cost: '$50/room', dfwRating: '⭐⭐⭐⭐ — Good for Redfin-listed homes' },
      ],
      disclosure: 'Texas law requires disclosure. Standard MLS language: "Photos may include virtual staging for illustrative purposes."',
      roi: 'Virtual staging increases online click-through by 40–60% and time-on-market decreases by avg 9 days in DFW.',
    },
    moderate: {
      recommendation: '✅ Virtual Staging + Key Accessory Pieces',
      rationale: 'Virtual furniture + a few real items (rug, mirror, plants) creates best of both worlds for moderate budgets.',
      approach: ['Virtual staging for MLS photos ($150–300 for full home)', 'Purchase 3–5 real accessories: large mirror, area rug, 2 plants', 'Real accessories show during in-person showings and complement virtual photos', 'Buyers see continuity between photos and showing'],
      services: [
        { name: 'BoxBrownie', cost: '$32/room', dfwRating: '⭐⭐⭐⭐⭐' },
        { name: 'Stuccco', cost: '$29/room', dfwRating: '⭐⭐⭐⭐' },
        { name: 'Apply Design', cost: '$39/room', dfwRating: '⭐⭐⭐⭐ — Good DFW contemporary style library' },
      ],
      disclosure: 'Disclose virtual staging in MLS remarks. Real accessories are present for showings — no furniture disclosure needed.',
      roi: 'Budget $300–600 total. Expected return: $3,000–8,000 in sale price premium in DFW market.',
    },
    full: {
      recommendation: '⚖️ Consider Physical Staging — Budget allows it, ROI may be higher',
      rationale: 'With full budget available, physical staging for a vacant DFW home typically outperforms virtual. DFW buyers do more in-person tours than national average.',
      approach: ['Get physical staging quotes from 2–3 DFW stagers', 'Compare: physical staging ($2,000–5,000) vs virtual ($300–500)', 'For homes over $500K in DFW, physical staging almost always wins on ROI', 'Under $400K: virtual staging is often sufficient and better ROI'],
      services: [
        { name: 'At Home Staging (DFW)', cost: '$2,200–4,500', dfwRating: '⭐⭐⭐⭐⭐ — Top rated in DFW' },
        { name: 'Staged by Cindy (Plano/Frisco)', cost: '$1,800–3,500', dfwRating: '⭐⭐⭐⭐⭐' },
        { name: 'Refresh Staging (Dallas)', cost: '$2,500–5,000', dfwRating: '⭐⭐⭐⭐' },
      ],
      disclosure: 'Physical staging requires no disclosure — it\’s actual furniture.',
      roi: 'Physical staging ROI in DFW: avg $4 return per $1 spent for homes over $450K.',
    },
  },
  'occupied-dated': {
    minimal: {
      recommendation: '✅ Virtual Staging — Overlay dated rooms with updated virtual furniture',
      rationale: 'Virtual staging can digitally remove dated furniture and replace it — showing buyers what the space could look like updated without expensive physical changes.',
      approach: ['Request "virtual renovation" option — some services digitally update finishes', 'Stage empty-looking photos from rooms you\’ve decluttered heavily', 'Combine with real minor updates: paint, hardware, light fixtures'],
      services: [
        { name: 'BoxBrownie Virtual Renovation', cost: '$68/photo', dfwRating: '⭐⭐⭐⭐⭐ — Can digitally update counters, flooring, walls' },
        { name: 'Stuccco', cost: '$29/room', dfwRating: '⭐⭐⭐⭐' },
      ],
      disclosure: 'Disclose virtual staging AND virtual renovation: "Photos show virtual staging and digitally enhanced finishes not present in home."',
      roi: 'Virtual renovation photos increase online engagement 55% for dated homes in DFW.',
    },
    moderate: {
      recommendation: '⚖️ Physical Staging Consultation + Selected Virtual',
      rationale: 'A professional stager will tell you exactly what to do — worth $200–300 for their consultation alone.',
      approach: ['Book a $200–300 staging consultation first', 'Make the 3–5 highest ROI physical changes they recommend', 'Use virtual staging for any rooms that can\’t be physically updated'],
      services: [
        { name: 'Staging consultation (Dallas)', cost: '$200–350', dfwRating: '⭐⭐⭐⭐⭐ — Any top DFW stager offers this' },
        { name: 'BoxBrownie for remaining rooms', cost: '$32/room', dfwRating: '⭐⭐⭐⭐⭐' },
      ],
      disclosure: 'Disclose any virtual staged rooms individually.',
      roi: 'Physical consultation + targeted updates + virtual for remainder = best ROI for dated occupied homes.',
    },
    full: {
      recommendation: '🏆 Full Physical Staging — Move out or work with stager to replace furniture',
      rationale: 'Dated occupied homes need physical transformation for top-dollar DFW results. Full staging is the answer.',
      approach: ['Move dated furniture to storage', 'Bring in stager\’s inventory furniture', 'Professional photography after staging complete'],
      services: [
        { name: 'At Home Staging (DFW)', cost: '$2,200–4,500', dfwRating: '⭐⭐⭐⭐⭐' },
        { name: 'Staged by Cindy', cost: '$1,800–3,500', dfwRating: '⭐⭐⭐⭐⭐' },
      ],
      disclosure: 'No disclosure required for physical staging.',
      roi: 'Physical staging for dated homes: avg 15–25 days faster sale and 3–7% higher sale price in DFW.',
    },
  },
  'occupied-fine': {
    minimal: { recommendation: '✅ No Staging Needed — Focus budget on photography quality', rationale: 'Well-furnished occupied homes in good condition don\’t need staging investment — invest in professional photography instead.', approach: ['Hire top DFW real estate photographer ($200–400)', 'Deep declutter and style existing furniture', 'Professional photos will carry the listing'], services: [{ name: 'Professional Photography', cost: '$200–400', dfwRating: '⭐⭐⭐⭐⭐ — Best ROI for your situation' }], disclosure: 'No staging to disclose.', roi: 'Great photography on an already well-furnished home = full market value, no staging spend needed.' },
    moderate: { recommendation: '✅ Light Accessory Refresh + Professional Photography', rationale: 'Small investments in accessories can refresh a well-furnished home without full staging cost.', approach: ['Buy 5–8 new accessories: throw pillows, vase, candles, artwork', 'Replace any dated or mismatched smaller items', 'Professional photography to capture the updated look'], services: [{ name: 'Accessories budget', cost: '$200–400', dfwRating: '⭐⭐⭐⭐⭐ — TJ Maxx, HomeGoods are best value in DFW' }, { name: 'Professional Photography', cost: '$200–400', dfwRating: '⭐⭐⭐⭐⭐' }], disclosure: 'No staging to disclose.', roi: '$400–800 investment, $2,000–5,000 return in DFW.' },
    full: { recommendation: '⚖️ Optional: Staging Consultation for Refinement', rationale: 'Even great homes can be refined by a pro eye. With full budget, a consultation is worth it.', approach: ['Book staging consultation ($200–300)', 'Implement their recommendations', 'Consider adding one or two furniture pieces they suggest'], services: [{ name: 'Staging Consultation', cost: '$200–350', dfwRating: '⭐⭐⭐⭐⭐' }], disclosure: 'No disclosure required.', roi: 'Marginal improvements on already great homes — set realistic expectations.' },
  },
  'new-construction': {
    minimal: { recommendation: '✅ Virtual Staging — New construction without furniture needs virtual', rationale: 'New construction in DFW is nearly always vacant. Virtual staging is the fastest and cheapest way to show the space\’s potential.', approach: ['Order virtual staging for all main rooms + primary', 'Builder-grade finishes photograph well — virtual furniture elevates the look', 'Include with MLS from day one'], services: [{ name: 'BoxBrownie', cost: '$32/room', dfwRating: '⭐⭐⭐⭐⭐' }, { name: 'VHT Studios', cost: '$50–75/room', dfwRating: '⭐⭐⭐⭐⭐ — Premium option for luxury new construction' }], disclosure: 'Disclose: "Photos include virtual staging."', roi: 'Virtual staging on new construction increases buyer appointments by 35–50% in DFW communities.' },
    moderate: { recommendation: '🏆 Model Home Staging — If community allows, fully stage the unit', rationale: 'DFW new construction communities that stage model units sell faster across the entire community.', approach: ['Full physical staging of key spaces', 'Professional photography and video tour', 'Coordinate with builder\’s preferred stager if available'], services: [{ name: 'Model home staging (DFW builders)', cost: '$3,500–8,000', dfwRating: '⭐⭐⭐⭐⭐ — Standard in DFW communities' }], disclosure: 'No disclosure needed for physical staging.', roi: 'Model staged DFW communities sell 40% faster than unstaged.' },
    full: { recommendation: '🏆 Full Physical Model Staging + Virtual for Pre-Sales', rationale: 'For builders selling pre-construction, virtual staging of architectural renderings drives reservations.', approach: ['Physical staging for completed units', 'Virtual staging on architectural renderings for pre-sales', 'Professional photography + video + 3D tour'], services: [{ name: 'Full staging package', cost: '$5,000–12,000', dfwRating: '⭐⭐⭐⭐⭐' }], disclosure: 'Disclose "rendering" vs "photo" clearly in all marketing.', roi: 'Full model programs in DFW: 60–80% faster sell-through for communities.' },
  },
};

export default function DFWVirtualStagingGuide() {
  const [situation, setSituation] = useState<SituationKey | ''>('');
  const [budget, setBudget] = useState<BudgetKey | ''>('');
  const result = situation && budget ? recommendations[situation]?.[budget] : null;

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: '32px', marginBottom: 24 }}>
          <div style={{ fontSize: 36 }}>🖥️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW Virtual Staging Guide</h1>
          <p style={{ color: '#CBD5E1', fontSize: 15, margin: 0 }}>Physical staging costs $2,000–5,000. Virtual staging costs $50–300. DFW buyers respond well to both — here's how to choose for your situation.</p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, marginBottom: 20, border: '1px solid #E2E8F0' }}>
          <h2 style={{ color: '#0A1628', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📊 Virtual vs Physical: DFW Comparison</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[['Virtual: $50–300 total', 'Physical: $2,000–5,000+', '#EFF6FF'], ['Virtual: 24–48hr turnaround', 'Physical: 1–2 weeks scheduling', '#F0FDF4'], ['Virtual: photos only (disclose)', 'Physical: in-person + photos', '#FEFCE8'], ['Both increase sale price in DFW — situation determines which wins', '', '#F8FAFC']].map(([a, b, bg], i) => (
              <div key={i} style={{ backgroundColor: bg, borderRadius: 8, padding: 12, border: '1px solid #E2E8F0' }}>
                <div style={{ color: '#374151', fontSize: 13, fontWeight: 600 }}>{a}</div>
                {b && <div style={{ color: '#64748B', fontSize: 12, marginTop: 4 }}>{b}</div>}
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, marginBottom: 20, border: '1px solid #E2E8F0' }}>
          <h2 style={{ color: '#0A1628', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔍 Get Your Recommendation</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#374151', fontSize: 14, fontWeight: 600, display: 'block', marginBottom: 6 }}>Home Situation</label>
              <select value={situation} onChange={e => setSituation(e.target.value as SituationKey)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #D1D5DB', fontSize: 14 }}>
                <option value="">Select...</option>
                <option value="vacant">Vacant home</option>
                <option value="occupied-dated">Occupied — dated furniture</option>
                <option value="occupied-fine">Occupied — furniture is fine</option>
                <option value="new-construction">New construction</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#374151', fontSize: 14, fontWeight: 600, display: 'block', marginBottom: 6 }}>Staging Budget</label>
              <select value={budget} onChange={e => setBudget(e.target.value as BudgetKey)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #D1D5DB', fontSize: 14 }}>
                <option value="">Select...</option>
                <option value="minimal">Minimal (under $500)</option>
                <option value="moderate">Moderate ($500–2,000)</option>
                <option value="full">Full budget ($2,000+)</option>
              </select>
            </div>
          </div>

          {result && (
            <div style={{ display: 'grid', gap: 12 }}>
              <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 16 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{result.recommendation}</div>
                <div style={{ color: '#CBD5E1', fontSize: 13 }}>{result.rationale}</div>
              </div>
              <div style={{ backgroundColor: '#EFF6FF', borderRadius: 8, padding: 16 }}>
                <div style={{ color: '#1D4ED8', fontWeight: 700, marginBottom: 10 }}>📋 Approach</div>
                {result.approach.map((a, i) => <div key={i} style={{ color: '#374151', fontSize: 13, marginBottom: 6 }}>• {a}</div>)}
              </div>
              <div style={{ backgroundColor: '#F8FAFC', borderRadius: 8, padding: 16 }}>
                <div style={{ color: '#0A1628', fontWeight: 700, marginBottom: 10 }}>🏢 Recommended Services for DFW</div>
                {result.services.map((s, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10, paddingBottom: 10, borderBottom: i < result.services.length - 1 ? '1px solid #E2E8F0' : 'none' }}>
                    <div>
                      <div style={{ color: '#0A1628', fontWeight: 600, fontSize: 13 }}>{s.name}</div>
                      <div style={{ color: '#64748B', fontSize: 12 }}>{s.dfwRating}</div>
                    </div>
                    <div style={{ backgroundColor: '#F5E642', borderRadius: 6, padding: '4px 10px', fontSize: 12, fontWeight: 700, color: '#0A1628', whiteSpace: 'nowrap' }}>{s.cost}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ backgroundColor: '#FEF2F2', borderRadius: 8, padding: 14 }}>
                  <div style={{ color: '#DC2626', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>⚖️ Texas Disclosure</div>
                  <div style={{ color: '#374151', fontSize: 12 }}>{result.disclosure}</div>
                </div>
                <div style={{ backgroundColor: '#F0FDF4', borderRadius: 8, padding: 14 }}>
                  <div style={{ color: '#15803D', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>💰 Expected ROI</div>
                  <div style={{ color: '#374151', fontSize: 12 }}>{result.roi}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, margin: '0 0 4px' }}>📜 Texas Disclosure Rule</p>
          <p style={{ color: '#CBD5E1', fontSize: 13, margin: 0 }}>Always disclose virtual staging in MLS and listing description. Top DFW agents put it in photo captions too. Buyers appreciate transparency and it builds trust.</p>
        </div>
      </div>
    </div>
  );
}
