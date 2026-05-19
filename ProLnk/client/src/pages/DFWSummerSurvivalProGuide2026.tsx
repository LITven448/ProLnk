import { useState } from 'react';

const guides: Record<string, { heat: string[]; comms: string[]; schedule: string[]; prolnk: string[] }> = {
  hvac: {
    heat: ['Start outdoor work before 7am — temps hit 95°F+ by 10am', '1 gallon of water per hour outdoors — no exceptions', '15-min shade breaks every 90 min mandatory', 'Never work in attics after noon (130°F+)', 'Know heat stroke signs: no sweating, confusion, hot dry skin'],
    comms: ['Text homeowner if heat delays start time >30 min', 'Set expectation: attic work done before noon only', 'Offer 2-hour scheduling windows, not exact times', 'Proactive update if job runs long due to heat breaks'],
    schedule: ['Book AC calls 5–7am arrival slots in July/Aug', 'Batch attic jobs Mon/Wed/Fri mornings only', 'Leave afternoons for indoor/basement work', 'Pre-sell maintenance before summer — less emergency calls'],
    prolnk: ['ProLnk surge pricing active June–Aug — higher margin per job', 'HVAC pros get priority matching during heat waves', 'Summer referral bonus: $50/new pro referred in Q3'],
  },
  roofing: {
    heat: ['Max 3 hours on roof before mandatory ground break', 'Rubber-soled boots only — asphalt hits 160°F', 'Neck cooling towels + electrolyte drinks on site', 'Two-person crews required for July/Aug roof work', 'Check heat index — not just temp — before starting'],
    comms: ['Roofing delayed by heat is normal — homeowners understand', 'Daily text updates on schedule if multi-day job', 'Offer morning-only scheduling as a premium service', 'Photos of work progress build trust during delays'],
    schedule: ['6am start = finish by noon on hot days', 'Never book afternoon roof slots June–Sept', 'Cluster jobs by zip code to minimize drive time in heat', 'Pre-schedule fall work now while summer slows booking'],
    prolnk: ['Roofing demand spikes after every DFW hailstorm', 'ProLnk storm surge alerts notify you of new leads', 'Top roofers get first-access to storm damage leads'],
  },
  plumbing: {
    heat: ['Outdoor crawlspace work: morning only', 'Under-slab work: same heat rules as outdoor', 'Indoor work all day — your advantage in summer', 'Hydration still critical in non-AC homes', 'Recognize when crawl or attic temps are unsafe'],
    comms: ['Indoor plumbing: no scheduling excuses in summer', 'Outdoor work: communicate morning-only availability clearly', 'Leak emergencies: 24/7 response = premium rate positioning', 'Be the pro who communicates — most don’t'],
    schedule: ['Front-load outdoor jobs 7am–11am', 'Afternoon block: indoor repairs, estimates, follow-ups', 'Emergency overnight slots = 2x rate — position now', 'Water heater replacements: garage work, do by noon'],
    prolnk: ['Summer leak emergency leads = highest intent buyers', 'Response time ranking: faster reply = more jobs', 'ProLnk tracks your response rate — top 10% get bonus leads'],
  },
};

const trades = ['hvac', 'roofing', 'plumbing'];
const tradeLabels: Record<string, string> = { hvac: '❄️ HVAC', roofing: '🏠 Roofing', plumbing: '🚿 Plumbing' };
const sectionLabels = ['🌡️ Heat Safety', '📱 Customer Comms', '📅 Scheduling', '⭐ ProLnk Edge'];

export default function DFWSummerSurvivalProGuide2026() {
  const [trade, setTrade] = useState('hvac');
  const g = guides[trade];
  const sections = [g.heat, g.comms, g.schedule, g.prolnk];
  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2, marginBottom: 8 }}>PROLNK · DFW 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>☀️ DFW Summer Pro Survival Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>Select your trade for a heat-specific survival playbook — stay safe, keep customers happy, and grow revenue in DFW's brutal summer.</p>
        <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
          {trades.map(t => (
            <button key={t} onClick={() => setTrade(t)}
              style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
                background: trade === t ? '#F5E642' : '#1e2d45', color: trade === t ? '#0A1628' : '#94a3b8' }}>
              {tradeLabels[t]}
            </button>
          ))}
        </div>
        {sections.map((items, si) => (
          <div key={si} style={{ background: '#132035', borderRadius: 14, padding: '20px', marginBottom: 16 }}>
            <h3 style={{ color: '#F5E642', fontSize: 15, fontWeight: 700, marginBottom: 12 }}>{sectionLabels[si]}</h3>
            {items.map((item, i) => (
              <div key={i} style={{ padding: '8px 0', borderBottom: i < items.length - 1 ? '1px solid #1e2d45' : 'none', color: '#e2e8f0', fontSize: 14 }}>
                • {item}
              </div>
            ))}
          </div>
        ))}
        <div style={{ background: '#F5E642', borderRadius: 12, padding: '16px 20px', color: '#0A1628', marginTop: 8 }}>
          <strong>🚀 Join ProLnk before summer peaks.</strong> Charter pros lock in lowest rates and get summer surge lead priority.
        </div>
      </div>
    </div>
  );
}