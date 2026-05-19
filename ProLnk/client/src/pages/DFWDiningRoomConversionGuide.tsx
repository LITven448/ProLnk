import { useState } from 'react';

const ROOM_SIZES = ['Small (under 120 sqft)', 'Medium (120–180 sqft)', 'Large (180–250 sqft)', 'Extra large (250+ sqft)'];
const TARGET_USES = ['Home office', 'Playroom / kids space', 'Library / reading room', 'Butler’s pantry / prep kitchen', 'Home bar / wine room', 'Mudroom / drop zone'];
const ADJACENT_SPACES = ['Open to kitchen', 'Separated by doorway only', 'Separated by wall', 'Open to living room', 'Corner room — two walls shared'];

const FEASIBILITY_MAP: Record<string, Record<string, string>> = {
  'Home office': {
    'Open to kitchen': 'Moderate — noise from kitchen. Add barn door or partition for separation.',
    'Separated by doorway only': 'High — easy door upgrade for privacy. Ethernet + circuit work only.',
    'Separated by wall': 'High — best scenario for office privacy.',
    'Open to living room': 'Low — acoustics challenging. Consider partial wall with pocket door.',
    'Corner room — two walls shared': 'High — natural acoustic buffer. Great natural light potential.',
  },
  'Butler’s pantry / prep kitchen': {
    'Open to kitchen': 'Very High — ideal location. Plumbing tie-in straightforward.',
    'Separated by doorway only': 'High — door removal easy, plumbing run from adjacent kitchen.',
    'Separated by wall': 'Moderate — plumbing run adds cost depending on distance.',
    'Open to living room': 'Low — far from kitchen plumbing, odd traffic pattern.',
    'Corner room — two walls shared': 'Moderate — depends on proximity to kitchen plumbing stack.',
  },
};

const COST_BY_USE: Record<string, Record<string, string>> = {
  'Home office': { 'Small (under 120 sqft)': '$5K–$12K', 'Medium (120–180 sqft)': '$8K–$18K', 'Large (180–250 sqft)': '$10K–$22K', 'Extra large (250+ sqft)': '$12K–$28K' },
  'Playroom / kids space': { 'Small (under 120 sqft)': '$4K–$10K', 'Medium (120–180 sqft)': '$6K–$14K', 'Large (180–250 sqft)': '$8K–$18K', 'Extra large (250+ sqft)': '$10K–$22K' },
  'Library / reading room': { 'Small (under 120 sqft)': '$8K–$18K', 'Medium (120–180 sqft)': '$12K–$25K', 'Large (180–250 sqft)': '$16K–$32K', 'Extra large (250+ sqft)': '$20K–$40K' },
  'Butler’s pantry / prep kitchen': { 'Small (under 120 sqft)': '$18K–$35K', 'Medium (120–180 sqft)': '$25K–$50K', 'Large (180–250 sqft)': '$32K–$65K', 'Extra large (250+ sqft)': '$40K–$80K' },
  'Home bar / wine room': { 'Small (under 120 sqft)': '$15K–$30K', 'Medium (120–180 sqft)': '$22K–$45K', 'Large (180–250 sqft)': '$30K–$60K', 'Extra large (250+ sqft)': '$38K–$75K' },
  'Mudroom / drop zone': { 'Small (under 120 sqft)': '$6K–$14K', 'Medium (120–180 sqft)': '$8K–$18K', 'Large (180–250 sqft)': '$10K–$22K', 'Extra large (250+ sqft)': '$12K–$26K' },
};

const PERMIT_NEEDED: Record<string, string> = {
  'Home office': 'Electrical permit if adding circuits. No structural permit if no walls moved.',
  'Playroom / kids space': 'No permit typically needed for cosmetic conversion.',
  'Library / reading room': 'No permit for built-in shelving in most DFW cities. Electrical if adding sconces.',
  'Butler’s pantry / prep kitchen': 'Plumbing + electrical permit required. May require mechanical if adding ventilation.',
  'Home bar / wine room': 'Electrical permit. Plumbing permit if adding sink. No structural if no walls moved.',
  'Mudroom / drop zone': 'No permit for built-ins and flooring. Electrical if adding circuits.',
};

export default function DFWDiningRoomConversionGuide() {
  const [roomSize, setRoomSize] = useState('');
  const [target, setTarget] = useState('');
  const [adjacent, setAdjacent] = useState('');
  const [showPlan, setShowPlan] = useState(false);

  const canGenerate = roomSize && target && adjacent;

  const facts = [
    { icon: '📉', text: 'Formal dining rooms are used less than 3x/month in 78% of DFW households' },
    { icon: '🏠', text: 'DFW buyers overwhelmingly prefer open kitchen-to-living layouts over formal dining' },
    { icon: '💼', text: 'Home office conversions saw 240% demand surge post-2020 and remain top request' },
    { icon: '📐', text: 'Load-bearing walls in DFW dining rooms are uncommon but must be assessed before removal' },
    { icon: '🏗️', text: 'Most dining rooms are non-structural — conversion is primarily cosmetic + electrical' },
    { icon: '💰', text: 'Resale: converted dining rooms can add 3–8% to list price when done for DFW buyer preferences' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2 }}>DFW REMODEL GUIDES</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Dining Room Conversion Guide 🍽️</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>DFW families rarely use formal dining rooms. Converting to functional space is one of the lowest-cost, highest-impact remodels available.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {facts.map(f => (
            <div key={f.text} style={{ background: '#132035', borderRadius: 10, padding: '1rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '1.3rem', flexShrink: 0 }}>{f.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.84rem', lineHeight: 1.5 }}>{f.text}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132035', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔧 Plan Your Conversion</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[{ label: 'Dining Room Size', val: roomSize, set: setRoomSize, opts: ROOM_SIZES },
              { label: 'Target Use', val: target, set: setTarget, opts: TARGET_USES },
              { label: 'Adjacent Spaces', val: adjacent, set: setAdjacent, opts: ADJACENT_SPACES }].map(({ label, val, set, opts }) => (
              <div key={label}>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>{label}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {opts.map(o => (
                    <button key={o} onClick={() => { set(o); setShowPlan(false); }}
                      style={{ padding: '0.4rem 0.9rem', borderRadius: 6, border: `1px solid ${val === o ? '#F5E642' : '#2a3a55'}`, background: val === o ? '#F5E642' : 'transparent', color: val === o ? '#0A1628' : '#fff', cursor: 'pointer', fontSize: '0.82rem', fontWeight: val === o ? 700 : 400 }}>
                      {o}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setShowPlan(true)} disabled={!canGenerate}
            style={{ marginTop: '1.5rem', padding: '0.75rem 2rem', background: canGenerate ? '#F5E642' : '#2a3a55', color: canGenerate ? '#0A1628' : '#64748b', borderRadius: 8, border: 'none', fontWeight: 800, cursor: canGenerate ? 'pointer' : 'not-allowed', fontSize: '1rem' }}>
            Generate My Conversion Plan →
          </button>
        </div>

        {showPlan && roomSize && target && adjacent && (
          <div style={{ background: '#132035', borderRadius: 12, padding: '1.5rem', border: '1px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>📋 Your Dining Room Conversion Plan</h3>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div style={{ background: '#0A1628', padding: '1rem', borderRadius: 8 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.3rem' }}>Feasibility Check</div>
                <div style={{ color: '#94a3b8', lineHeight: 1.6 }}>{FEASIBILITY_MAP[target]?.[adjacent] ?? 'Good feasibility — assess load-bearing walls before removing any. Hire structural engineer if walls are shared with floors above ($500–$1,500 for assessment).'}</div>
              </div>
              <div style={{ background: '#0A1628', padding: '1rem', borderRadius: 8 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.3rem' }}>Estimated Cost</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{COST_BY_USE[target]?.[roomSize] ?? 'Request contractor quote'}</div>
              </div>
              <div style={{ background: '#0A1628', padding: '1rem', borderRadius: 8 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.3rem' }}>Permit Requirements</div>
                <div style={{ color: '#94a3b8' }}>{PERMIT_NEEDED[target]}</div>
              </div>
              <div style={{ background: '#0A1628', padding: '1rem', borderRadius: 8 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.3rem' }}>DFW Market Notes</div>
                <div style={{ color: '#94a3b8', lineHeight: 1.6 }}>Buyers in Plano, Frisco, McKinney, and Allen specifically request home offices. Butler's pantry adds strong appeal in $500K+ DFW homes. Playroom conversion best for family-focused neighborhoods in Flower Mound, Southlake, Coppell.</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
