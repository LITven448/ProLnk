import { useState } from 'react';

const showerRecs = [
  { yard: 'pool', privacy: 'low', budget: 'low', type: 'Cold-only post-mounted shower', plumbing: 'Single cold line tapped from hose bib — no permit required in most DFW cities', permit: 'Typically no permit needed for cold-only with hose bib connection', cost: '$200–$800 DIY' },
  { yard: 'pool', privacy: 'high', budget: 'mid', type: 'Hot/cold outdoor shower with cedar privacy screen', plumbing: 'Extend hot and cold lines from nearest interior bathroom — requires licensed plumber', permit: 'Plumbing permit required in most DFW cities. Call your city first.', cost: '$2,500–$6,000 installed' },
  { yard: 'pool', privacy: 'high', budget: 'high', type: 'Full outdoor shower room with masonry walls + hot/cold', plumbing: 'Dedicated hot/cold lines, floor drain to sewer or gravel bed per city code', permit: 'Full permit required — plumbing + possibly building permit for structure', cost: '$8,000–$20,000′ },
  { yard: 'no_pool', privacy: 'low', budget: 'low', type: 'Garden rinse station / cold shower at back gate', plumbing: 'Garden hose connection — no plumbing permit needed', permit: 'No permit required', cost: '$100–$400′ },
  { yard: 'no_pool', privacy: 'high', budget: 'mid', type: 'Hot/cold shower in corner of yard with lattice privacy', plumbing: 'Extend lines from house — licensed plumber required', permit: 'Plumbing permit required. Check if HOA approval needed.', cost: '$3,000–$7,000′ },
  { yard: 'spa', privacy: 'high', budget: 'high', type: 'Spa-adjacent shower room with heated floor + rainfall head', plumbing: 'Tied into spa equipment pad — coordinate with pool builder', permit: 'Full permits required — plumbing, possibly structural', cost: '$10,000–$25,000′ },
];

export default function DFWOutdoorShowerGuide() {
  const [yard, setYard] = useState('');
  const [privacy, setPrivacy] = useState('');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState<typeof showerRecs[0] | null>(null);

  function calculate() {
    const match = showerRecs.find(r => r.yard === yard && r.privacy === privacy && r.budget === budget)
      || showerRecs.find(r => r.yard === yard && r.privacy === privacy)
      || showerRecs.find(r => r.yard === yard)
      || showerRecs[1];
    setResult(match);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🚿</div>
        <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Outdoor Shower Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          After swimming in a DFW pool or soaking in a hot tub on a 105°F August afternoon, the last thing you want is
          tracking wet, sunscreen-covered bodies through your house. An outdoor shower solves that — and adds genuine
          value to DFW homes where outdoor living is a year-round lifestyle.
        </p>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16, fontSize: 18 }}>🌡️ DFW-Specific Outdoor Shower Considerations</h2>
          {[
            ['Hot Water Necessity', 'DFW summer — a cold-only shower is refreshing. DFW winter — a cold-only shower is brutal. Most DFW homeowners regret not running hot water within 2 years.'],
            ['Water Pressure', 'Most DFW suburbs (Frisco, Allen, McKinney, Plano) have excellent municipal pressure. A direct hot/cold extension from your home\’s plumbing delivers great pressure without boosters.'],
            ['Freeze Protection', 'February freeze events (2021, 2023) damaged hundreds of outdoor plumbing lines. DFW outdoor shower plumbing MUST have a freeze-proof shutoff valve — no exceptions.'],
            ['HOA Approval', 'Many DFW HOAs (especially Southlake, Westlake, Frisco) require approval for outdoor structures. Get approval before starting — violations can require demolition.'],
            ['Drainage Code', 'Most DFW cities require outdoor shower water to drain to the sanitary sewer — not to the yard. A licensed plumber knows your city\’s specific code.'],
          ].map(([title, desc]) => (
            <div key={title as string} style={{ borderBottom: '1px solid #1e3a5f', paddingBottom: 12, marginBottom: 12 }}>
              <p style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 4px', fontSize: 14 }}>{title as string}</p>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: 13, lineHeight: 1.5 }}>{desc as string}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16, fontSize: 18 }}>🌿 Privacy Screening Options</h2>
          {[
            ['Cedar Privacy Screen', 'Fast, attractive, moderately priced. Weathers beautifully in DFW climate. Last 8–12 years before replacement.', '$400–$1,200'],
            ['Masonry Wall', 'Permanent, premium, matches house architecture. Best for high-end DFW neighborhoods. Requires permit if over 4 ft.', '$2,000–$8,000'],
            ['Lattice + Vines', 'Attractive but slow — Texas vines take 2–3 seasons to fill in. Bougainvillea thrives in DFW.', '$300–$800'],
            ['Outdoor Curtains', 'Cheap and fast but require maintenance — UV-resistant fabric rated for DFW sun lasts 2–3 seasons max.', '$100–$400'],
          ].map(([name, desc, cost]) => (
            <div key={name as string} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, marginBottom: 14, paddingBottom: 14, borderBottom: '1px solid #1e3a5f' }}>
              <div>
                <p style={{ color: '#fff', fontWeight: 700, margin: '0 0 4px', fontSize: 14 }}>{name as string}</p>
                <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>{desc as string}</p>
              </div>
              <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>{cost}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 20, fontSize: 18 }}>🔧 Configure Your Outdoor Shower</h2>
          {[
            { label: 'Your Yard Situation', value: yard, setter: setYard, options: [['pool', 'Have a Pool / Frequent Swimmer'], ['spa', 'Have a Spa / Hot Tub'], ['no_pool', 'No Pool — Garden / General Use']] },
            { label: 'Privacy Need', value: privacy, setter: setPrivacy, options: [['low', 'Low (back corner, no neighbors)'], ['high', 'High (visible from neighbors or HOA area)']] },
            { label: 'Budget', value: budget, setter: setBudget, options: [['low', 'Under $1,500'], ['mid', '$1,500–$8,000'], ['high', '$8,000+']] },
          ].map(({ label, value, setter, options }) => (
            <div key={label} style={{ marginBottom: 18 }}>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 8 }}>{label}</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {options.map(([val, text]) => (
                  <button key={val} onClick={() => setter(val)} style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid', borderColor: value === val ? '#F5E642′ : '#1e3a5f', background: value === val ? '#F5E642' : ’transparent', color: value === val ? '#0A1628′ : '#94a3b8', cursor: ’pointer', fontSize: 13, fontWeight: value === val ? 700 : 400 }}>{text}</button>
                ))}
              </div>
            </div>
          ))}
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer', marginTop: 8 }}>Get My Shower Recommendation →</button>
        </div>

        {result && (
          <div style={{ background: '#0f2a1a', border: '1px solid #22c55e', borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: '#22c55e', marginBottom: 12 }}>✅ Your DFW Outdoor Shower Recommendation</h3>
            <p style={{ color: '#fff', fontWeight: 700, marginBottom: 6 }}>{result.type}</p>
            <p style={{ color: '#94a3b8', marginBottom: 6, fontSize: 14 }}>Plumbing: {result.plumbing}</p>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, marginBottom: 10 }}>
              <p style={{ color: '#fbbf24', fontWeight: 700, margin: '0 0 4px', fontSize: 13 }}>⚠️ Permit Status</p>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: 13 }}>{result.permit}</p>
            </div>
            <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 18 }}>{result.cost}</p>
          </div>
        )}
      </div>
    </div>
  );
}
