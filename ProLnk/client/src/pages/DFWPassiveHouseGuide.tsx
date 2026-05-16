import { useState } from 'react';

const insulationLevels = [
  { label: 'Minimal (R-11 or less)', value: 'minimal' },
  { label: 'Standard (R-19 to R-30)', value: 'standard' },
  { label: 'Good (R-38 to R-49)', value: 'good' },
  { label: 'Excellent (R-60+)', value: 'excellent' },
];

const principles = {
  minimal: [
    { name: 'Super-Insulated Attic', benefit: 'Biggest DFW impact -- attic temps hit 160F in summer', cost: '$2,000-$5,000', roi: 'Very High' },
    { name: 'Air Sealing', benefit: 'Stops infiltration that drives AC costs up 30%', cost: '$500-$2,000', roi: 'Very High' },
    { name: 'Thermal Bridge Elimination', benefit: 'Metal studs bleed heat; continuous insulation helps', cost: '$1,500-$4,000', roi: 'Medium' },
  ],
  standard: [
    { name: 'Heat Recovery Ventilation', benefit: 'Recover 70-80% of conditioned air energy while ventilating', cost: '$3,000-$6,000', roi: 'Medium' },
    { name: 'Attic Upgrade to R-60', benefit: 'Push attic from standard to passive-level -- big DFW gains', cost: '$1,500-$3,000', roi: 'High' },
    { name: 'Low-E Triple Pane Windows', benefit: 'Reduce solar gain in west-facing DFW windows', cost: '$800-$2,000/window', roi: 'Medium' },
  ],
  good: [
    { name: 'Heat Recovery Ventilation', benefit: 'Your insulation is solid -- ventilation is next bottleneck', cost: '$3,000-$6,000', roi: 'High' },
    { name: 'Continuous Exterior Insulation', benefit: 'Eliminate remaining thermal bridges in wall assembly', cost: '$4,000-$10,000', roi: 'Medium' },
    { name: 'Blower Door Test and Seal', benefit: 'Find remaining air leaks with professional test', cost: '$300-$600', roi: 'Very High' },
  ],
  excellent: [
    { name: 'Passive House Certification', benefit: 'You are near passive house threshold -- certification possible', cost: '$2,000-$8,000', roi: 'Prestige' },
    { name: 'Heat Recovery Ventilation', benefit: 'Required for true passive house; pairs with your insulation', cost: '$3,000-$6,000', roi: 'High' },
    { name: 'Solar PV Array', benefit: 'With passive house envelope, solar nearly covers all energy', cost: '$15,000-$25,000', roi: 'High' },
  ],
};

export default function DFWPassiveHouseGuide() {
  const [level, setLevel] = useState('standard');
  const recs = principles[level as keyof typeof principles];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#94A3B8' }}>🏠 DFW Building Science</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>
          Passive House Principles for DFW
        </h1>
        <p style={{ color: '#94A3B8', marginBottom: '2rem', lineHeight: 1.7 }}>
          Full passive house certification is rare in DFW -- our climate demands cooling more than heating, which flips the math.
          But the core principles still slash energy bills when applied correctly for North Texas conditions.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>🔍 Your Current Insulation Level</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {insulationLevels.map(opt => (
              <button key={opt.value} onClick={() => setLevel(opt.value)} style={{
                background: level === opt.value ? '#F5E642' : '#1E3A5F',
                color: level === opt.value ? '#0A1628' : '#E2E8F0',
                border: 'none', borderRadius: 8, padding: '0.75rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', textAlign: 'left',
              }}>{opt.label}</button>
            ))}
          </div>
        </div>

        <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>⚡ Best Passive House Principles for Your Situation</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          {recs.map((r, i) => (
            <div key={i} style={{ background: '#0F2040', borderRadius: 12, padding: '1.25rem', border: '1px solid #1E3A5F' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <div style={{ fontWeight: 700, color: '#E2E8F0' }}>🏗️ {r.name}</div>
                <span style={{ background: r.roi === 'Very High' ? '#065F46' : r.roi === 'High' ? '#1E3A5F' : '#374151', color: r.roi === 'Very High' ? '#6EE7B7' : r.roi === 'High' ? '#F5E642' : '#9CA3AF', borderRadius: 6, padding: '0.2rem 0.6rem', fontSize: '0.75rem', fontWeight: 600 }}>{r.roi} ROI</span>
              </div>
              <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{r.benefit}</p>
              <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 600 }}>💰 Cost: {r.cost}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: '1.25rem', color: '#0A1628' }}>
          <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>🌡️ DFW Reality Check</div>
          <div style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>Passive house targets 4,750 BTU/ft/yr for heating and cooling combined. In DFW, cooling alone can hit 6,000+ BTU/ft/yr without intervention. Focus on the attic first -- it is the single highest-impact upgrade in North Texas.</div>
        </div>
      </div>
    </div>
  );
}
