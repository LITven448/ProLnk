import { useState } from 'react';

const homeTypes = [
  { label: 'New construction (2010+)', value: 'new' },
  { label: 'Existing home (1990-2009)', value: 'mid' },
  { label: 'Older home (pre-1990)', value: 'old' },
];

const sunExposures = [
  { label: 'High sun (flat roof or west-facing)', value: 'high' },
  { label: 'Moderate sun (mixed orientation)', value: 'moderate' },
  { label: 'Lower sun (good tree cover or overhang)', value: 'low' },
];

const pcmData: Record<string, Record<string, { suitability: string; apps: string[]; savings: string; cost: string; payback: string; note: string }>> = {
  new: {
    high: { suitability: 'Excellent', apps: ['PCM drywall on west and south walls during construction', 'PCM blown-in insulation in attic -- replaces standard blown fiberglass', 'PCM in roof deck layer to absorb peak solar load', 'Radiant barrier + PCM attic combo for DFW peak load reduction'], savings: '15-25% AC savings', cost: '\,000-\,000 added to build', payback: '4-7 years', note: 'New construction is the best time for PCM -- installed during framing with no retrofit cost. DFW high sun means peak load reduction is significant.' },
    moderate: { suitability: 'Good', apps: ['PCM drywall on south walls and ceiling', 'PCM attic insulation layer', 'Phase change floor underlayment with tile finish'], savings: '10-18% AC savings', cost: '\,000-\,000 added to build', payback: '5-8 years', note: 'Moderate sun still benefits well from PCM at the new construction stage. Target attic and south walls first.' },
    low: { suitability: 'Moderate', apps: ['PCM attic insulation to handle radiant heat still present', 'PCM in interior walls for temperature smoothing', 'Focus budget on air sealing first'], savings: '8-12% AC savings', cost: '\,500-\,000 added to build', payback: '6-10 years', note: 'Lower sun exposure reduces PCM peak-load benefit. Still worthwhile at new construction prices but lower priority than air sealing.' },
  },
  mid: {
    high: { suitability: 'Good', apps: ['Blown-in PCM beads mixed with cellulose in attic (retrofit-friendly)', 'PCM wall panels on west-facing rooms', 'PCM ceiling tiles in hottest rooms'], savings: '10-18% AC savings', cost: '\,500-\,000 retrofit', payback: '6-10 years', note: 'Mid-era homes with high sun exposure see solid PCM returns. Blown-in attic PCM is most cost-effective retrofit approach.' },
    moderate: { suitability: 'Moderate', apps: ['PCM blown-in attic upgrade', 'Phase change window film (emerging product)', 'PCM insulation board on attic hatch'], savings: '8-14% AC savings', cost: '\,800-\,500 retrofit', payback: '7-11 years', note: 'Moderate-sun mid-era homes benefit most from attic PCM. Wall retrofits are costly -- focus on attic.' },
    low: { suitability: 'Limited', apps: ['Standard blown-in cellulose upgrade first', 'PCM only in attic if budget allows after air sealing', 'Air sealing has better ROI here'], savings: '5-10% AC savings', cost: '\,500-\,000 retrofit', payback: '10-14 years', note: 'Lower sun on a mid-era home means air sealing and insulation upgrade will outperform PCM investment. Do those first.' },
  },
  old: {
    high: { suitability: 'Moderate', apps: ['PCM blown-in as part of full attic gut and re-insulate', 'Fix air leaks before any PCM investment', 'PCM in new drywall if doing full renovation'], savings: '8-15% AC savings above baseline upgrade', cost: '\,000-\,000 as part of renovation', payback: '8-13 years', note: 'Old homes with high sun need air sealing and basic insulation first. PCM adds value on top of that base -- do not skip the basics.' },
    moderate: { suitability: 'Low-Moderate', apps: ['Air seal and standard insulate first', 'PCM blown-in attic if doing full attic renovation', 'Consider PCM in drywall only during full gut renovation'], savings: '6-12% above baseline', cost: '\,000-\,000 as add-on', payback: '10-15 years', note: 'Moderate-sun old homes have too many baseline problems for PCM to lead. Fix the envelope first, then add PCM in the attic.' },
    low: { suitability: 'Low', apps: ['Air seal first -- this is your biggest return', 'Upgrade to standard blown-in insulation', 'PCM is not the priority here'], savings: '3-8% above baseline', cost: 'Not recommended as standalone', payback: '15+ years', note: 'Low-sun old homes need air sealing and insulation far more than PCM. Do not invest in PCM until the basics are done.' },
  },
};

const suitabilityColor: Record<string, { bg: string; text: string }> = {
  'Excellent': { bg: '#065F46', text: '#6EE7B7′ },
  'Good': { bg: '#1E3A5F', text: '#F5E642′ },
  'Moderate': { bg: '#374151', text: '#D1D5DB' },
  'Low-Moderate': { bg: '#374151', text: '#D1D5DB' },
  'Limited': { bg: '#4B1515', text: '#FCA5A5′ },
  'Low': { bg: '#4B1515', text: '#FCA5A5′ },
};

export default function DFWPhaseChangeMaterialGuide() {
  const [homeType, setHomeType] = useState('mid');
  const [sunExposure, setSunExposure] = useState('high');
  const data = pcmData[homeType][sunExposure];
  const colors = suitabilityColor[data.suitability] || { bg: '#374151', text: '#D1D5DB' };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#94A3B8′ }}>🏠 DFW Building Science</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>
          Phase Change Materials for DFW Homes
        </h1>
        <p style={{ color: '#94A3B8', marginBottom: '2rem', lineHeight: 1.7 }}>
          Phase change materials (PCMs) absorb heat as they melt and release it as they solidify -- cutting your peak AC load during DFW summer afternoons. PCM drywall, blown-in beads, and insulation boards all work by the same principle.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '0.75rem', fontSize: '1.1rem' }}>🏗️ Home Type</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
            {homeTypes.map(opt => (
              <button key={opt.value} onClick={() => setHomeType(opt.value)} style={{
                background: homeType === opt.value ? '#F5E642′ : '#1E3A5F',
                color: homeType === opt.value ? '#0A1628′ : '#E2E8F0',
                border: 'none', borderRadius: 8, padding: '0.75rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', textAlign: 'left',
              }}>{opt.label}</button>
            ))}
          </div>
          <h2 style={{ color: '#F5E642', marginBottom: '0.75rem', fontSize: '1.1rem' }}>☀️ DFW Sun Exposure</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
            {sunExposures.map(opt => (
              <button key={opt.value} onClick={() => setSunExposure(opt.value)} style={{
                background: sunExposure === opt.value ? '#F5E642′ : '#1E3A5F',
                color: sunExposure === opt.value ? '#0A1628′ : '#E2E8F0',
                border: 'none', borderRadius: 8, padding: '0.75rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', textAlign: 'left',
              }}>{opt.label}</button>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', border: '1px solid #1E3A5F', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ color: '#F5E642', fontSize: '1.1rem', margin: 0 }}>🧪 PCM Suitability</h2>
            <span style={{ background: colors.bg, color: colors.text, borderRadius: 6, padding: '0.25rem 0.75rem', fontSize: '0.85rem', fontWeight: 700 }}>{data.suitability}</span>
          </div>
          <p style={{ color: '#CBD5E1', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>{data.note}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ background: '#1E3A5F', borderRadius: 8, padding: '0.75rem', textAlign: 'center' }}>
              <div style={{ color: '#94A3B8', fontSize: '0.75rem', marginBottom: '0.25rem' }}>AC Savings</div>
              <div style={{ color: '#F5E642', fontWeight: 700 }}>{data.savings}</div>
            </div>
            <div style={{ background: '#1E3A5F', borderRadius: 8, padding: '0.75rem', textAlign: 'center' }}>
              <div style={{ color: '#94A3B8', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Typical Cost</div>
              <div style={{ color: '#F5E642', fontWeight: 700 }}>{data.cost}</div>
            </div>
            <div style={{ background: '#1E3A5F', borderRadius: 8, padding: '0.75rem', textAlign: 'center' }}>
              <div style={{ color: '#94A3B8', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Payback</div>
              <div style={{ color: '#F5E642', fontWeight: 700 }}>{data.payback}</div>
            </div>
          </div>
          <h3 style={{ color: '#F5E642', fontSize: '0.95rem', marginBottom: '0.75rem' }}>✅ Best PCM Applications</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {data.apps.map((a, i) => (
              <div key={i} style={{ background: '#1E3A5F', borderRadius: 8, padding: '0.75rem', fontSize: '0.9rem', color: '#E2E8F0′ }}>🧊 {a}</div>
            ))}
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: '1.25rem', color: '#0A1628′ }}>
          <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>🌡️ DFW PCM Temperature Target</div>
          <div style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>Choose PCM products rated to melt at 73-76F -- the ideal DFW indoor setpoint. Products melting at 68F are wasted in summer; products at 80F do not activate during occupancy. BioPCM and Micronal are common brands available in DFW through specialty distributors.</div>
        </div>
      </div>
    </div>
  );
}
