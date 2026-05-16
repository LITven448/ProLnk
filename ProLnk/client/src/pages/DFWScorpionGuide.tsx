import { useState } from 'react';

const LOCATIONS = [
  { label: 'North DFW (Plano, Frisco, McKinney, Allen)', value: 'north' },
  { label: 'East DFW (Garland, Rockwall, Mesquite)', value: 'east' },
  { label: 'South DFW (Mansfield, Arlington, Grand Prairie)', value: 'south' },
  { label: 'West DFW (Fort Worth, Weatherford, Keller)', value: 'west' },
  { label: 'Urban core (Dallas, Fort Worth proper)', value: 'urban' },
];

const SEVERITIES = [
  { label: 'Found 1 scorpion (isolated)', value: 'low' },
  { label: 'Found 2–5 scorpions in past month', value: 'medium' },
  { label: 'Finding scorpions regularly / in beds or shoes', value: 'high' },
];

const RECS: Record<string, Record<string, { exclusion: string; treatment: string; pro: string }>> = {
  north: {
    low: {
      exclusion: 'Seal door sweeps and weather stripping. Check attic vents for gaps — North DFW new construction often has soffit gaps.',
      treatment: 'DIY perimeter spray (Cy-Kick CS) at foundation. Diatomaceous earth in attic if entry suspected from above.',
      pro: 'One scorpion in North DFW suburbs may be isolated. DIY is appropriate. Call a pro if you find a second within 30 days.',
    },
    medium: {
      exclusion: 'Full perimeter caulk at foundation level. Seal all door sweeps, window frames, and utility penetrations. Remove rock beds near house.',
      treatment: 'Professional residual spray (Cy-Kick or Demand CS) quarterly recommended. Black light inspection at night to locate harborage.',
      pro: 'Recommend professional inspection. North DFW subdivisions built near native habitat see regular scorpion pressure — pro quarterly service is the best value.',
    },
    high: {
      exclusion: 'Emergency exclusion needed. Seal all gaps immediately. Check wall voids, attic, and any rockscape or mulch beds adjacent to structure.',
      treatment: 'Professional treatment required. Black light inspection, aerosol into voids, residual perimeter. Follow-up in 2 weeks.',
      pro: 'Call a pest professional immediately. Finding scorpions in shoes or beds is a health risk. Do not delay treatment.',
    },
  },
  east: {
    low: {
      exclusion: 'East DFW has older housing stock — inspect foundation cracks and aging weather stripping. Seal with silicone caulk.',
      treatment: 'DIY Cy-Kick CS at perimeter. Diatomaceous earth under appliances and in wall void entry points.',
      pro: 'Isolated find — DIY appropriate for East DFW. Monitor for 30 days before escalating.',
    },
    medium: {
      exclusion: 'Inspect all foundation cracks (common in East DFW clay soil). Seal cracks with hydraulic cement + caulk. Remove wood piles near structure.',
      treatment: 'Quarterly professional perimeter spray. Use black light at night to find scorpions and trace harborage to source.',
      pro: 'Professional quarterly service is recommended. East DFW older neighborhoods near rocky terrain have persistent scorpion populations.',
    },
    high: {
      exclusion: 'Full exclusion audit urgently needed. East DFW clay soil shifting creates foundation gaps — these are prime scorpion entry points.',
      treatment: 'Emergency professional treatment. Residual spray + void treatments. Consider monthly service until infestation resolves.',
      pro: 'Call a licensed DFW pest professional now. High scorpion activity in East DFW homes often indicates wall void harborage — pros have the tools to locate and treat.',
    },
  },
  south: {
    low: {
      exclusion: 'South DFW has significant scorpion habitat near cedar breaks and rocky areas. Seal door sweeps, check garage door gaps.',
      treatment: 'DIY perimeter spray with bifenthrin or Cy-Kick CS. Treat along foundation and in garage.',
      pro: 'One scorpion — monitor for 30 days. South DFW has higher native pressure than North DFW suburbs, so stay vigilant.',
    },
    medium: {
      exclusion: 'Inspect and seal all foundation gaps, door sweeps, and utility penetrations. Remove any rockscaping or wood stacked near house.',
      treatment: 'Professional quarterly perimeter service strongly recommended for South DFW given higher habitat pressure.',
      pro: 'South DFW homes near Fort Worth area cedar and rocky terrain benefit most from professional quarterly service. Worth the investment.',
    },
    high: {
      exclusion: 'Urgent: full exclusion inspection and sealing. South DFW scorpion pressure is among the highest in the metro — wall void harborage is common.',
      treatment: 'Professional treatment required — residual spray, void injection, monthly service until resolved.',
      pro: 'Call a pro immediately. South DFW high-pressure scorpion zones near Mansfield and Arlington can have hundreds in wall voids of affected homes.',
    },
  },
  west: {
    low: {
      exclusion: 'Fort Worth and west DFW has significant scorpion habitat. Seal all door sweeps and inspect garage carefully.',
      treatment: 'DIY Cy-Kick CS perimeter spray. Check under rocks, wood piles, and dense vegetation adjacent to structure.',
      pro: 'West DFW is higher baseline territory. One scorpion warrants more vigilance than in North DFW suburbs. Recheck in 2 weeks.',
    },
    medium: {
      exclusion: 'West DFW: remove all rockscaping within 2 feet of structure. Seal foundation cracks (common in older FW housing). Inspect attic vents.',
      treatment: 'Professional quarterly service is standard for West DFW homes with medium pressure. Residual spray + monitoring.',
      pro: 'West DFW scorpion pressure warrants professional intervention at the medium stage. Quarterly pro service is standard practice here.',
    },
    high: {
      exclusion: 'Emergency exclusion. West DFW / Weatherford area scorpion populations are among densest in Texas. Check every crack, void, and gap.',
      treatment: 'Professional treatment required urgently. Residual + aerosol void treatment. Monthly service.',
      pro: 'Call a licensed pest professional immediately. High scorpion activity in West DFW is a serious health risk, especially for families with young children.',
    },
  },
  urban: {
    low: {
      exclusion: 'Urban DFW scorpion sightings are less common but do occur. Seal gaps in older building structures, especially near ground level.',
      treatment: 'DIY perimeter spray is usually sufficient for one-off urban sightings. Check delivery boxes and outdoor furniture before bringing inside.',
      pro: 'Isolated urban finding — likely a wanderer. DIY appropriate. Call a pro if you find another within 60 days.',
    },
    medium: {
      exclusion: 'Urban medium activity suggests nearby habitat (alley, adjacent lot, construction). Seal all ground-floor entry points.',
      treatment: 'Professional residual spray at perimeter. Inspect adjacent outdoor areas for harborage.',
      pro: 'Medium activity in urban core is unusual — a professional inspection may reveal an unexpected harborage site or entry point.',
    },
    high: {
      exclusion: 'High urban activity requires immediate full building exclusion audit. Check utility entries, HVAC penetrations, and all ground-floor gaps.',
      treatment: 'Professional treatment required. Black light inspection at night to locate population. Treat all harborage sites.',
      pro: 'Call a pest professional. High urban scorpion activity typically indicates a structural gap issue allowing outdoor-to-indoor migration.',
    },
  },
};

export default function DFWScorpionGuide() {
  const [location, setLocation] = useState('');
  const [severity, setSeverity] = useState('');

  const rec = location && severity ? RECS[location]?.[severity] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8F0FE', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🦂</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Scorpion Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32, lineHeight: 1.6 }}>
          DFW has one scorpion species of concern: the striped bark scorpion. Found throughout the metro, they hide in wall voids,
          attics, under stones, and in wood piles. They enter homes seeking cool shelter in summer and warmth in winter.
          Most stings are painful but not life-threatening — however, small children and allergic individuals face higher risk.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>⚠️ Where They Hide in DFW Homes</h2>
          <ul style={{ color: '#94A3B8', lineHeight: 2, paddingLeft: 20 }}>
            <li>Wall voids (especially near exterior walls and attic access)</li>
            <li>Attic spaces — bark scorpions climb vertical surfaces easily</li>
            <li>Under and inside outdoor furniture, shoes left outside, BBQ covers</li>
            <li>Rock or flagstone landscaping adjacent to the home</li>
            <li>Stacked wood, construction materials, cardboard boxes in garage</li>
          </ul>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🔦 Get Your DFW Action Plan</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94A3B8', display: 'block', marginBottom: 8 }}>DFW Location</label>
            <select value={location} onChange={e => setLocation(e.target.value)}
              style={{ width: '100%', background: '#0A1628', color: '#E8F0FE', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
              <option value="">Select area…</option>
              {LOCATIONS.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94A3B8', display: 'block', marginBottom: 8 }}>Severity</label>
            <select value={severity} onChange={e => setSeverity(e.target.value)}
              style={{ width: '100%', background: '#0A1628', color: '#E8F0FE', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
              <option value="">Select severity…</option>
              {SEVERITIES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
          {rec && (
            <div style={{ background: '#F5E642', borderRadius: 8, padding: 16 }}>
              <div style={{ color: '#0A1628', fontWeight: 700, marginBottom: 6 }}>🚪 Exclusion</div>
              <div style={{ color: '#0A1628', lineHeight: 1.6, marginBottom: 10 }}>{rec.exclusion}</div>
              <div style={{ color: '#0A1628', fontWeight: 700, marginBottom: 6 }}>🧪 Treatment</div>
              <div style={{ color: '#0A1628', lineHeight: 1.6, marginBottom: 10 }}>{rec.treatment}</div>
              <div style={{ color: '#0A1628', fontWeight: 700, marginBottom: 6 }}>👤 Professional Guidance</div>
              <div style={{ color: '#0A1628', lineHeight: 1.6 }}>{rec.pro}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🛡️ Daily Prevention Habits</h2>
          <ul style={{ color: '#94A3B8', lineHeight: 2, paddingLeft: 20 }}>
            <li>Shake out shoes before putting them on — scorpions love dark enclosed spaces</li>
            <li>Use a UV black light to scan floors at night (scorpions glow bright green)</li>
            <li>Keep beds away from walls and use bed leg scorpion traps</li>
            <li>Seal door sweeps — a scorpion can enter a gap the width of a credit card</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
