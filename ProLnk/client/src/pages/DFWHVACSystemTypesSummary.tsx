import { useState } from 'react';

const systems = [
  {
    id: 'split',
    name: 'Split System',
    icon: '🏠',
    cost: '$3,500–$7,500',
    seer2: '14–24',
    bestFor: 'Most DFW homes with ductwork',
    dfwPerf: 5,
    notes: 'Most common in DFW. Separate indoor/outdoor units. Excellent for extreme heat.',
    applications: ['Single-family homes', 'Homes with existing ducts', 'Full home cooling'],
  },
  {
    id: 'package',
    name: 'Package Unit',
    icon: '🏢',
    cost: '$4,000–$8,000',
    seer2: '14–18',
    bestFor: 'Homes without attic space, commercial',
    dfwPerf: 4,
    notes: 'All-in-one outdoor unit. Good for slab foundations common in DFW suburbs.',
    applications: ['Slab foundation homes', 'Light commercial', 'No attic space'],
  },
  {
    id: 'minisplit',
    name: 'Mini-Split',
    icon: '🌬️',
    cost: '$2,000–$5,000 per zone',
    seer2: '16–30+',
    bestFor: 'Additions, garages, no-duct zones',
    dfwPerf: 4,
    notes: 'Ductless system growing fast in DFW. Ideal for room additions and older homes.',
    applications: ['Room additions', 'Garage conversions', 'Historic homes', 'Zoned cooling'],
  },
  {
    id: 'geo',
    name: 'Geothermal',
    icon: '🌍',
    cost: '$10,000–$30,000',
    seer2: '20–40+',
    bestFor: 'Premium efficiency, large DFW properties',
    dfwPerf: 5,
    notes: 'Highest efficiency available. DFW clay soil needs expert assessment. 30% federal tax credit.',
    applications: ['Large properties', 'Net-zero goals', 'Long-term ownership'],
  },
];

const priorities = ['DFW Heat Performance', 'Upfront Cost', 'Long-term Savings', 'Installation Speed', 'Zoning Flexibility'];

const recommendations: Record<string, string> = {
  'DFW Heat Performance': 'split',
  'Upfront Cost': 'split',
  'Long-term Savings': 'geo',
  'Installation Speed': 'package',
  'Zoning Flexibility': 'minisplit',
};

export default function DFWHVACSystemTypesSummary() {
  const [homeType, setHomeType] = useState('');
  const [priority, setPriority] = useState('');
  const recommended = priority ? recommendations[priority] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>❄️</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, margin: '0.5rem 0' }}>DFW HVAC System Types</h1>
          <p style={{ color: '#8899AA', fontSize: '1rem' }}>Final comparison of all system options for the Dallas-Fort Worth climate</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {systems.map(s => (
            <div key={s.id} style={{ background: recommended === s.id ? '#1a2f1a' : '#0D1F35', border: `2px solid ${recommended === s.id ? '#F5E642' : '#1E3A5F'}`, borderRadius: 12, padding: '1.25rem' }}>
              <div style={{ fontSize: '1.8rem' }}>{s.icon}</div>
              <h3 style={{ color: recommended === s.id ? '#F5E642' : '#fff', margin: '0.5rem 0 0.25rem' }}>{s.name}</h3>
              {recommended === s.id && <span style={{ background: '#F5E642', color: '#0A1628', fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>RECOMMENDED</span>}
              <p style={{ color: '#F5E642', fontSize: '0.85rem', margin: '0.5rem 0 0.25rem' }}>{s.cost}</p>
              <p style={{ color: '#8899AA', fontSize: '0.8rem', margin: 0 }}>SEER2: {s.seer2}</p>
              <p style={{ color: '#AAB8C2', fontSize: '0.8rem', margin: '0.5rem 0' }}>{s.notes}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#0D1F35', border: '1px solid #1E3A5F', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🎯 Get Your DFW Recommendation</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ color: '#8899AA', fontSize: '0.85rem', display: 'block', marginBottom: 6 }}>Home Type</label>
              <select value={homeType} onChange={e => setHomeType(e.target.value)} style={{ width: '100%', padding: '0.6rem', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: '0.9rem' }}>
                <option value="">Select home type</option>
                <option>Single-family with ducts</option>
                <option>Slab foundation</option>
                <option>Older home / no ducts</option>
                <option>Large property (3000+ sqft)</option>
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ color: '#8899AA', fontSize: '0.85rem', display: 'block', marginBottom: 6 }}>Top Priority</label>
              <select value={priority} onChange={e => setPriority(e.target.value)} style={{ width: '100%', padding: '0.6rem', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: '0.9rem' }}>
                <option value="">Select priority</option>
                {priorities.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
          </div>
          {recommended && (
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#0A1628', borderRadius: 8, borderLeft: '4px solid #F5E642' }}>
              <p style={{ color: '#F5E642', fontWeight: 700, margin: 0 }}>Recommended: {systems.find(s => s.id === recommended)?.name}</p>
              <p style={{ color: '#AAB8C2', fontSize: '0.85rem', margin: '0.25rem 0 0' }}>{systems.find(s => s.id === recommended)?.bestFor}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
