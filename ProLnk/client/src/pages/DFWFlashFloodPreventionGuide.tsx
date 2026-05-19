import { useState } from 'react';

const locations = ['Low-lying area / near creek', 'Flat lot in subdivision', 'Elevated lot / hillside', 'Near storm drain or culvert', 'Urban infill area', 'Properties along Trinity River corridor'];
const drainageIssues = ['Standing water after 30min rain', 'Water enters garage', 'Yard floods neighbor yard', 'Basement or crawl space moisture', 'Foundation erosion visible', 'No visible drainage issues'];

const floodPlans: Record<string, { measures: string[]; cost: string; urgency: string }> = {
  'Low-lying area / near creek|Water enters garage': {
    measures: ['Install garage door flood barrier (rubber seal or removable barrier)', 'Add flood vents to garage (auto-equalize water pressure)', 'French drain along garage perimeter', 'Raise electrical panel and HVAC above flood line', 'Install sump pump with battery backup'],
    cost: '$3,500–$12,000',
    urgency: '🔴 Act Before Next Rain Season',
  },
  'Low-lying area / near creek|Standing water after 30min rain': {
    measures: ['Regrade yard — minimum 6-inch drop over 10 feet from foundation', 'Install French drain system along property perimeter', 'Extend all downspouts 6–10 feet from foundation', 'Add catch basin at lowest point', 'Consider permeable paver driveway to reduce runoff'],
    cost: '$4,000–$14,000',
    urgency: '🔴 Act Before Next Rain Season',
  },
  'Urban infill area|Standing water after 30min rain': {
    measures: ['Verify storm drain connection is clear — call city if blocked', 'Install backflow preventer on sewer line', 'Add sump pump system to collect interior moisture', 'Rain garden or bioswale in front yard to absorb runoff', 'Check neighbor grading — may need drainage agreement'],
    cost: '$2,500–$8,000',
    urgency: '🟡 Address Within 6 Months',
  },
  'Flat lot in subdivision|No visible drainage issues': {
    measures: ['Confirm lot grading still directs water away from foundation', 'Clean gutters twice yearly (spring and fall)', 'Extend downspouts — most only discharge 18 inches from house', 'Add window well covers if any below-grade windows', 'Confirm sump pump is functional before storm season'],
    cost: '$500–$2,000',
    urgency: '🟢 Routine Maintenance',
  },
};

function getPlan(location: string, drainage: string) {
  const key = `${location}|${drainage}`;
  return floodPlans[key] || {
    measures: ['Regrade low spots adjacent to foundation', 'French drain along property perimeter', 'Extend all downspouts 6ft minimum from house', 'Install sump pump with battery backup', 'Seal any foundation cracks — both interior and exterior'],
    cost: '$2,000–$10,000',
    urgency: '🟡 Address Within 6 Months',
  };
}

export default function DFWFlashFloodPreventionGuide() {
  const [location, setLocation] = useState('');
  const [drainage, setDrainage] = useState('');
  const [result, setResult] = useState<{ measures: string[]; cost: string; urgency: string } | null>(null);

  function handleSubmit() {
    if (!location || !drainage) return;
    setResult(getPlan(location, drainage));
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>🌊 DFW Flash Flood Prevention Guide</div>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>
          DFW flash floods are uniquely dangerous — flat terrain and impervious surface cover means 2 inches of rain in 30 minutes can overwhelm drainage systems. Water moves faster than you expect.
        </p>

        <div style={{ background: '#0f2040', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '1rem' }}>💡 DFW Flash Flood Facts</div>
          {[['🌧️', 'Speed', 'DFW can get 2–4" of rain in under 1 hour during severe storms'],
            ['🏠', 'Foundation first', 'Any water against your foundation for 6+ hours causes cumulative damage'],
            ['🚗', 'Turn around', '"Turn around, don\’t drown" — 12 inches of moving water can float a car'],
            ['💧', 'Backflow risk', 'Heavy rain can push sewage backwards into homes without a backflow preventer'],
            ['🌲', 'Neighbor effect', 'Uphill neighbors with poor drainage send their runoff to your property'],
          ].map(([emoji, label, desc]) => (
            <div key={label} style={{ marginBottom: '0.85rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <span>{emoji}</span>
              <div>
                <span style={{ color: '#F5E642', fontWeight: 600 }}>{label}: </span>
                <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{desc}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '1rem' }}>🔍 Get Your Flood Prevention Plan</div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', color: '#94a3b8', fontSize: '0.9rem' }}>Property Location Type</label>
            <select value={location} onChange={e => setLocation(e.target.value)}
              style={{ width: '100%', padding: '0.6rem', borderRadius: 6, background: '#1e3a5f', border: '1px solid #334155', color: '#fff' }}>
              <option value=''>Select location...</option>
              {locations.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', color: '#94a3b8', fontSize: '0.9rem' }}>Current Drainage Issues</label>
            <select value={drainage} onChange={e => setDrainage(e.target.value)}
              style={{ width: '100%', padding: '0.6rem', borderRadius: 6, background: '#1e3a5f', border: '1px solid #334155', color: '#fff' }}>
              <option value=''>Select issue...</option>
              {drainageIssues.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <button onClick={handleSubmit}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 6, padding: '0.75rem 1.5rem', cursor: 'pointer', width: '100%' }}>
            Get Flood Prevention Measures →
          </button>
        </div>

        {result && (
          <div style={{ background: '#0f2040', borderRadius: 8, padding: '1.5rem', border: '1px solid #F5E642' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ fontWeight: 700, color: '#F5E642' }}>🛡️ Flood Prevention Measures</div>
              <div style={{ fontWeight: 700 }}>{result.urgency}</div>
            </div>
            {result.measures.map((m, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ color: '#F5E642' }}>▸</span>
                <span style={{ color: '#e2e8f0' }}>{m}</span>
              </div>
            ))}
            <div style={{ marginTop: '1rem', background: '#1e3a5f', borderRadius: 6, padding: '0.75rem', color: '#F5E642', fontWeight: 600 }}>
              💰 Estimated Cost Range: {result.cost}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
