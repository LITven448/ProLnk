import { useState } from 'react';

const SPACE_TYPES = ['Storm shelter / safe room', 'Sunken living room', 'Below-grade utility room', 'Partial crawl space', 'Below-grade bonus room'];
const SIZE_OPTS = ['Under 100 sqft', '100–250 sqft', '250–500 sqft', '500+ sqft'];
const CONVERSION_GOALS = ['Wine cellar / storage', 'Media / storm room combo', 'Workshop / hobby space', 'Expanded living area', 'Guest room (if code allows)'];

const OPTIONS_BY_TYPE: Record<string, string[]> = {
  'Storm shelter / safe room': ['Wine cellar with climate control', 'Cigar room / humidor', 'Gun safe room', 'Media panic room', 'Storm + storage hybrid'],
  'Sunken living room': ['Raise floor to match grade', 'Embrace the sunken aesthetic — remodel in place', 'Add wet bar at lower level', 'Convert to dedicated home theater pit'],
  'Below-grade utility room': ['Add shelving + organization system', 'Climate-controlled wine storage', 'Workshop with ventilation upgrade', 'Mechanical + storage combo'],
  'Partial crawl space': ['Encapsulation only (moisture control)', 'Convert to conditioned storage if height allows', 'HVAC accessible storage'],
  'Below-grade bonus room': ['Home theater', 'Game room', 'Home gym (ventilation critical)', 'Home office (egress window required for habitable)'],
};

const WATERPROOFING: Record<string, string> = {
  'Under 100 sqft': 'Interior drain tile + sump pump: ~$3K–$6K. Vapor barrier: ~$1K–$2K.',
  '100–250 sqft': 'Full perimeter drain system: ~$6K–$12K. Dehumidifier unit: ~$1.5K–$3K.',
  '250–500 sqft': 'Commercial-grade waterproofing system: ~$10K–$20K. Sump + backup: ~$2K–$4K.',
  '500+ sqft': 'Full system with redundancy: ~$18K–$35K. Annual maintenance contract recommended.',
};

const COST_BY_GOAL: Record<string, string> = {
  'Wine cellar / storage': '$8K–$25K depending on climate control and racking system',
  'Media / storm room combo': '$15K–$40K for soundproofing, AV rough-in, HVAC',
  'Workshop / hobby space': '$6K–$18K for electrical, lighting, ventilation',
  'Expanded living area': '$20K–$55K — egress and HVAC compliance adds cost in DFW',
  'Guest room (if code allows)': '$25K–$60K — egress window required, HVAC, fire separation',
};

export default function DFWBasementRemodelGuide() {
  const [spaceType, setSpaceType] = useState('');
  const [size, setSize] = useState('');
  const [goal, setGoal] = useState('');
  const [showPlan, setShowPlan] = useState(false);

  const canGenerate = spaceType && size && goal;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2 }}>DFW REMODEL GUIDES</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Below-Grade Space Guide 🏠</h1>
        <p style={{ color: '#94a3b8', marginBottom: '0.5rem' }}>DFW has no traditional basements — but many homes have below-grade spaces worth converting.</p>
        <div style={{ background: '#1a2e1a', border: '1px solid #4ade80', borderRadius: 8, padding: '0.75rem 1rem', marginBottom: '2rem', fontSize: '0.88rem', color: '#86efac' }}>
          🌪️ <strong>DFW Fact:</strong> Storm shelters are required in many new DFW builds. These below-grade rooms are prime candidates for dual-use conversions.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[{ icon: '🍷', title: 'Storm Shelter → Wine Cellar', desc: 'Most popular below-grade conversion in DFW. Climate control + racking installed inside existing concrete shell.' },
            { icon: '🎬', title: 'Shelter → Media Room', desc: 'Soundproofing already partially handled by concrete. Add AV, seating, HVAC and you have a true storm-safe theater.' },
            { icon: '🔒', title: 'Safe Room Upgrade', desc: 'Reinforce door, add ventilation, power outlet, and communication system. FEMA-compliant upgrades available.' },
            { icon: '💧', title: 'Moisture Control First', desc: 'Any DFW below-grade project requires waterproofing assessment. Clay soil expands and contracts — hydrostatic pressure is real.' }].map(c => (
            <div key={c.title} style={{ background: '#132035', borderRadius: 10, padding: '1rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>{c.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: '0.2rem' }}>{c.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.82rem' }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132035', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔧 Plan Your Conversion</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[{ label: 'Current Space Type', val: spaceType, set: setSpaceType, opts: SPACE_TYPES },
              { label: 'Approximate Size', val: size, set: setSize, opts: SIZE_OPTS },
              { label: 'Conversion Goal', val: goal, set: setGoal, opts: CONVERSION_GOALS }].map(({ label, val, set, opts }) => (
              <div key={label}>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>{label}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {opts.map(o => (
                    <button key={o} onClick={() => { set(o); setShowPlan(false); }}
                      style={{ padding: '0.4rem 0.9rem', borderRadius: 6, border: `1px solid ${val === o ? '#F5E642' : '#2a3a55'}`, background: val === o ? '#F5E642′ : ’transparent', color: val === o ? '#0A1628′ : '#fff', cursor: ’pointer', fontSize: '0.82rem', fontWeight: val === o ? 700 : 400 }}>
                      {o}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setShowPlan(true)} disabled={!canGenerate}
            style={{ marginTop: '1.5rem', padding: '0.75rem 2rem', background: canGenerate ? '#F5E642′ : '#2a3a55', color: canGenerate ? '#0A1628' : '#64748b', borderRadius: 8, border: ’none', fontWeight: 800, cursor: canGenerate ? 'pointer' : 'not-allowed', fontSize: '1rem' }}>
            Generate My Conversion Plan →
          </button>
        </div>

        {showPlan && spaceType && size && goal && (
          <div style={{ background: '#132035', borderRadius: 12, padding: '1.5rem', border: '1px solid #F5E642′ }}>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>📋 Your Below-Grade Conversion Plan</h3>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div style={{ background: '#0A1628', padding: '1rem', borderRadius: 8 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>Conversion Options for {spaceType}</div>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#94a3b8', lineHeight: 1.8 }}>
                  {OPTIONS_BY_TYPE[spaceType]?.map(o => <li key={o}>{o}</li>)}
                </ul>
              </div>
              <div style={{ background: '#0A1628', padding: '1rem', borderRadius: 8 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.3rem' }}>💧 Waterproofing Requirements</div>
                <div style={{ color: '#94a3b8′ }}>{WATERPROOFING[size]}</div>
              </div>
              <div style={{ background: '#0A1628', padding: '1rem', borderRadius: 8 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.3rem' }}>Estimated Project Cost</div>
                <div>{COST_BY_GOAL[goal]}</div>
              </div>
              <div style={{ background: '#0A1628', padding: '1rem', borderRadius: 8 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.3rem' }}>DFW Permit Note</div>
                <div style={{ color: '#94a3b8′ }}>Any habitability conversion (bedroom, living space) requires egress and mechanical permits. Wine cellars and storage conversions typically permit-free if no structural or plumbing changes.</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
