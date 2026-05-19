import { useState } from 'react';

const drainTypes = [
  { id: 'french', label: '🌿 French Drain', typical: 'Flush every 2–3 years, inspect annually' },
  { id: 'yard', label: '🌧️ Yard / Surface Drain', typical: 'Clean grate quarterly, flush annually' },
  { id: 'channel', label: '🛤️ Channel / Trench Drain', typical: 'Clean monthly in leaf season, flush annually' },
  { id: 'downspout', label: '🏠 Downspout Drain Line', typical: 'Camera inspect every 3 years, flush annually' },
];

const ageOptions = [
  { id: 'new', label: 'Under 3 years', urgency: 'low' },
  { id: 'mid', label: '3–7 years', urgency: 'medium' },
  { id: 'old', label: '7–12 years', urgency: 'high' },
  { id: 'unknown', label: '12+ years or unknown', urgency: 'critical' },
];

const recommendations: Record<string, { action: string; cost: string; note: string }> = {
  'french-new': { action: 'Inspect inlet/outlet. Flush with garden hose. No service needed yet.', cost: '$0–$50 DIY', note: 'New French drains in DFW clay soil should be monitored after first heavy rain season.' },
  'french-mid': { action: 'Hydro-jet flush recommended. Camera inspection optional.', cost: '$200–$450', note: 'Clay fines begin migrating into perforated pipe after 3–5 years. Flushing restores flow.' },
  'french-old': { action: 'Camera inspection + hydro-jet flush. Evaluate for sock filter replacement.', cost: '$350–$700', note: 'High probability of partial clay blockage. Filter sock may need replacement ($800–$2,000 for full excavation).' },
  'french-unknown': { action: 'Full camera inspection required before any flushing.', cost: '$300–$600', note: 'Unknown age systems in DFW clay commonly have complete filter sock saturation.' },
  'yard-new': { action: 'Clear grate, flush annually.', cost: '$50–$150', note: 'Keep grate clear of DFW clay debris after each heavy rain.' },
  'yard-mid': { action: 'Hydro-jet flush + inspect basin.', cost: '$175–$350', note: 'Check basin for clay sediment accumulation — common in DFW after 3+ years.' },
  'yard-old': { action: 'Camera inspect all lines, hydro-jet flush, check basin integrity.', cost: '$300–$600', note: 'Root intrusion from DFW trees (oak, cedar elm) common after 7+ years.' },
  'yard-unknown': { action: 'Full inspection + flush package.', cost: '$350–$650', note: 'Prioritize before next DFW storm season (May–June).' },
  'channel-new': { action: 'Clean grate monthly in fall/spring. Annual flush.', cost: '$50–$100', note: 'Channel drains in DFW pool areas clog fast with leaf debris in November.' },
  'channel-mid': { action: 'Hydro-jet flush + inspect outlet.', cost: '$150–$300', note: 'Grease, clay, and debris combine in channel drains over time.' },
  'channel-old': { action: 'Camera + hydro-jet. Check for root intrusion at outlet.', cost: '$250–$500', note: 'Outlet pipes near DFW landscaping frequently invaded by roots by year 7+.' },
  'channel-unknown': { action: 'Full service: camera, flush, outlet inspection.', cost: '$300–$550', note: 'Unknown channel systems often have complete outlet blockage in DFW.' },
  'downspout-new': { action: 'Flush with hose. Check outlet termination point.', cost: '$0–$75', note: 'Ensure downspout line terminates 6+ ft from foundation on DFW clay lots.' },
  'downspout-mid': { action: 'Hydro-jet flush. Camera inspect if slow drainage noted.', cost: '$150–$350', note: 'Clay migration from DFW soil begins entering downspout lines around year 3–5.' },
  'downspout-old': { action: 'Camera inspection required. Likely partial blockage.', cost: '$275–$550', note: 'Root intrusion from foundation-area plantings very common in this age range.' },
  'downspout-unknown': { action: 'Camera inspect before next storm season.', cost: '$250–$500', note: 'URGENT: Blocked downspout lines in DFW clay lots cause foundation water damage.' },
};

export default function DFWDrainageCleaningGuide() {
  const [drainType, setDrainType] = useState('');
  const [age, setAge] = useState('');

  const recKey = drainType && age ? `${drainType}-${age}` : '';
  const rec = recommendations[recKey];
  const selectedDrain = drainTypes.find(d => d.id === drainType);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0D1F3C 0%, #0A1628 100%)', borderBottom: '2px solid #F5E642', padding: '48px 24px 36px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 36 }}>🌊</span>
            <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Home Services Guide</span>
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 800, margin: '0 0 12px', lineHeight: 1.2 }}>
            Drainage System Maintenance for DFW
          </h1>
          <p style={{ color: '#94A3B8', fontSize: 16, margin: 0, maxWidth: 600, lineHeight: 1.6 }}>
            DFW's clay soil is the enemy of every drain system. It migrates, compacts, and eventually blocks French drains and downspout lines — leading to foundation flooding. Here’s how to stay ahead of it.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>🧱 The Clay Problem</h2>
          <div style={{ background: '#111E33', borderRadius: 12, padding: 24, marginBottom: 32, border: '1px solid #1E3054′ }}>
            <p style={{ color: '#94A3B8', lineHeight: 1.7, margin: '0 0 12px' }}>
              DFW Blackland Prairie clay has a 10–30% volumetric change between wet and dry states. When water moves through a French drain system, clay particles follow — gradually clogging the perforated pipe and filter sock from the inside. Signs of failure: standing water 24+ hours after rain, soggy patches in lawn, foundation damp spots.
            </p>
            <p style={{ color: '#94A3B8', lineHeight: 1.7, margin: 0 }}>
              <strong style={{ color: '#F5E642′ }}>Pro tip:</strong> DFW pros recommend hydro-jetting (high-pressure water flushing) rather than mechanical snaking for clay-affected drain lines. Snaking can push clay further into the system.
            </p>
          </div>

          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🔍 Warning Signs by System</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 40 }}>
            {[
              { icon: '💧', issue: 'Standing water 24+ hrs after rain', means: 'Drain inlet or main line clogged' },
              { icon: '🌿', issue: 'Soggy lawn patches', means: 'French drain outlet blocked' },
              { icon: '🏠', issue: 'Foundation damp spots', means: 'Downspout line not diverting water' },
              { icon: '💨', issue: 'Slow drain in channel', means: 'Clay/debris accumulation at outlet' },
            ].map(s => (
              <div key={s.issue} style={{ background: '#111E33', border: '1px solid #1E3054', borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 13, color: '#E8EDF5', marginBottom: 6 }}>{s.issue}</div>
                <div style={{ color: '#94A3B8', fontSize: 12 }}>→ {s.means}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E33', borderRadius: 14, padding: 28, border: '1px solid #F5E642', marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>🧮 Maintenance Needs Estimator</h2>
          <p style={{ color: '#94A3B8', fontSize: 14, margin: '0 0 20px' }}>Select your drain type and installation age for a DFW-specific maintenance recommendation.</p>

          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 10, fontWeight: 600 }}>Drainage Type</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {drainTypes.map(d => (
                <button key={d.id} onClick={() => setDrainType(d.id)} style={{
                  textAlign: 'left', padding: '10px 16px', borderRadius: 8, border: '2px solid',
                  borderColor: drainType === d.id ? '#F5E642′ : '#1E3054',
                  background: drainType === d.id ? 'rgba(245,230,66,0.1)' : 'transparent',
                  color: drainType === d.id ? '#F5E642′ : '#94A3B8', fontWeight: 600, fontSize: 14, cursor: ’pointer'
                }}>
                  <div>{d.label}</div>
                  {drainType === d.id && <div style={{ fontSize: 12, color: '#94A3B8', fontWeight: 400, marginTop: 4 }}>{d.typical}</div>}
                </button>
              ))}
            </div>
          </div>

          {drainType && (
            <div style={{ marginBottom: 24 }}>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 10, fontWeight: 600 }}>Years Since Installation</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {ageOptions.map(a => (
                  <button key={a.id} onClick={() => setAge(a.id)} style={{
                    padding: '9px 16px', borderRadius: 20, border: '2px solid',
                    borderColor: age === a.id ? '#F5E642′ : '#1E3054',
                    background: age === a.id ? '#F5E642′ : ’transparent',
                    color: age === a.id ? '#0A1628′ : '#94A3B8',
                    fontWeight: 600, fontSize: 13, cursor: 'pointer'
                  }}>{a.label}</button>
                ))}
              </div>
            </div>
          )}

          {rec && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, border: '1px solid #1E3054′ }}>
              <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 4 }}>Recommended Action</div>
              <div style={{ color: '#E8EDF5', fontWeight: 600, fontSize: 15, marginBottom: 12, lineHeight: 1.5 }}>{rec.action}</div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 2 }}>Estimated Cost</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#F5E642′ }}>{rec.cost}</div>
                </div>
              </div>
              <div style={{ borderTop: '1px solid #1E3054', paddingTop: 12, color: '#94A3B8', fontSize: 13, lineHeight: 1.6 }}>
                💡 {rec.note}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
