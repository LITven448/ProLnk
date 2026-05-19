import { useState } from 'react';

const CONCERN_MAP: Record<string, { benefit: string; limitations: string; cost: string; alternatives: string }> = {
  'Reducing airborne pathogens': {
    benefit: 'Bipolar ionization clusters particles and pathogens, making them easier to capture by filters. Some studies show 70–99% reduction in lab conditions.',
    limitations: 'Real-world results vary widely. Effectiveness depends heavily on air circulation and room volume. Some units produce trace ozone.',
    cost: '$500–$1,500 installed (in-duct)',
    alternatives: 'HEPA filtration (proven) + UV coil lamp (proven for coil mold) is a more evidence-backed combination.',
  },
  'Odor and VOC control': {
    benefit: 'Ions can neutralize some VOCs and reduce odors by oxidizing organic compounds.',
    limitations: 'Inconsistent performance on VOCs. PCO systems generally outperform ionization for chemical neutralization.',
    cost: '$500–$1,200 installed',
    alternatives: 'Activated carbon filtration or PCO system for VOC-specific concerns.',
  },
  'Dust and particle reduction': {
    benefit: 'Ions cause particles to clump and fall or get caught by filters — can improve particulate capture.',
    limitations: 'Charged particles also deposit on walls and surfaces (plate-out). MERV-13+ filter upgrade often more effective.',
    cost: '$400–$1,000 installed',
    alternatives: 'Upgrade to MERV-13 filter and ensure proper airflow — lower cost, proven results.',
  },
  'General DFW air quality': {
    benefit: 'Adds a layer of active air treatment on top of passive filtration.',
    limitations: 'DFW’s outdoor ozone levels are already elevated (non-attainment area) — avoid units that produce additional ozone.',
    cost: '$500–$1,500 installed',
    alternatives: 'UV + MERV-13 + dehumidification is a more proven DFW IAQ stack.',
  },
};

export default function DFWHVACIonizationGuide() {
  const [concern, setConcern] = useState('');
  const [result, setResult] = useState<null | { benefit: string; limitations: string; cost: string; alternatives: string }>(null);

  function evaluate() {
    setResult(CONCERN_MAP[concern] ?? null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>⚡ DFW HVAC RESOURCE</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.75rem' }}>Ionization & Bipolar Ionization for DFW HVAC</h1>
        <p style={{ color: '#9BA8BB', marginBottom: '2rem', lineHeight: 1.7 }}>
          Ionization systems release positive and negative ions into your airstream, claiming to kill pathogens, reduce dust, and neutralize
          odors. Here's what the research actually says — and how it applies to DFW homeowners.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🔬 What Does Research Actually Show?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              { label: '✅ Supported', items: ['Particle agglomeration (clumping)', 'Some reduction in airborne bacteria in lab settings', 'Odor reduction in controlled studies'] },
              { label: '⚠️ Contested', items: ['Virus inactivation in real-world settings', 'Long-term effectiveness claims from manufacturers', 'Performance without sufficient air circulation'] },
            ].map(col => (
              <div key={col.label}>
                <div style={{ color: col.label.startsWith('✅') ? '#4ADE80' : '#FBBF24', fontWeight: 700, marginBottom: '0.5rem' }}>{col.label}</div>
                <ul style={{ color: '#9BA8BB', paddingLeft: '1.25rem', lineHeight: 1.9, fontSize: '0.9rem' }}>
                  {col.items.map(i => <li key={i}>{i}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🌆 DFW-Specific Considerations</h2>
          <ul style={{ color: '#9BA8BB', lineHeight: 2, paddingLeft: '1.25rem' }}>
            <li>DFW is a designated ozone non-attainment area — avoid ionizers that produce ozone byproduct</li>
            <li>Look for UL 2998 certified units (zero ozone emission standard)</li>
            <li>High humidity in DFW can reduce ion travel distance in ductwork</li>
            <li>Best DFW applications: schools, medical offices, large open-plan homes</li>
          </ul>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🌡️ DFW Ionization Advisor</h2>
          <label style={{ display: 'block', color: '#9BA8BB', marginBottom: '0.4rem', fontSize: '0.9rem' }}>Your DFW Concern</label>
          <select
            value={concern}
            onChange={e => setConcern(e.target.value)}
            style={{ background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EDF5', padding: '0.6rem 1rem', width: '100%', marginBottom: '1rem', fontSize: '0.95rem' }}
          >
            <option value="">Select your concern...</option>
            {Object.keys(CONCERN_MAP).map(k => <option key={k}>{k}</option>)}
          </select>
          <button
            onClick={evaluate}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}
          >
            Evaluate Ionization for My Need
          </button>
          {result && (
            <div style={{ marginTop: '1.25rem', background: '#0A1628', borderRadius: 10, padding: '1.25rem', borderLeft: '3px solid #F5E642' }}>
              <div style={{ marginBottom: '0.5rem' }}>⚡ <strong>Potential Benefit:</strong> {result.benefit}</div>
              <div style={{ marginBottom: '0.5rem' }}>⚠️ <strong>Limitations:</strong> {result.limitations}</div>
              <div style={{ marginBottom: '0.5rem' }}>💰 <strong>Cost:</strong> {result.cost}</div>
              <div>🔄 <strong>Proven Alternatives:</strong> {result.alternatives}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.25rem' }}>
          <p style={{ color: '#9BA8BB', fontSize: '0.9rem', margin: 0 }}>
            🏠 <strong style={{ color: '#F5E642' }}>ProLnk Tip:</strong> Demand third-party test data from any ionization vendor — manufacturer marketing claims are not a substitute for independent lab results.
          </p>
        </div>
      </div>
    </div>
  );
}
