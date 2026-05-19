import { useState } from 'react';

const homeTypes = ['Single Story', 'Two Story', 'Townhome', 'Condo'];
const priorities = ['Beat the DFW Heat', 'Reduce Noise', 'Improve Air Quality', 'Lower Energy Bills', 'Add Smart Controls'];

const improvements: Record<string, { label: string; cost: string; impact: string; priority: number }[]> = {
  'Beat the DFW Heat': [
    { label: 'Attic Insulation Upgrade', cost: '$2,500–$5,000', impact: 'Reduces cooling load 20-30%', priority: 1 },
    { label: 'HVAC Zoning System', cost: '$3,000–$6,000', impact: 'Each floor at ideal temp', priority: 2 },
    { label: 'Smart Programmable Thermostat', cost: '$200–$400', impact: 'Auto-adjusts for DFW peak hours', priority: 3 },
    { label: 'Radiant Barrier in Attic', cost: '$1,200–$2,400', impact: 'Blocks 95% of radiant heat', priority: 4 },
  ],
  'Reduce Noise': [
    { label: 'Acoustic Insulation (walls)', cost: '$2,000–$4,500', impact: 'Reduces traffic/neighbor noise', priority: 1 },
    { label: 'Double-Pane Window Replacement', cost: '$5,000–$15,000', impact: 'Major noise reduction + efficiency', priority: 2 },
    { label: 'Solid-Core Interior Doors', cost: '$800–$2,000', impact: 'Room-to-room sound control', priority: 3 },
  ],
  'Improve Air Quality': [
    { label: 'Whole-Home Air Purifier', cost: '$800–$2,500', impact: 'Filters allergens, DFW pollen', priority: 1 },
    { label: 'ERV/HRV Ventilation System', cost: '$2,000–$4,000', impact: 'Fresh air without energy loss', priority: 2 },
    { label: 'UV HVAC Air Scrubber', cost: '$600–$1,200', impact: 'Kills bacteria + mold in ducts', priority: 3 },
    { label: 'Dehumidifier (whole-home)', cost: '$1,500–$3,000', impact: 'Controls DFW humidity', priority: 4 },
  ],
  'Lower Energy Bills': [
    { label: 'HVAC Replacement (16+ SEER)', cost: '$6,000–$14,000', impact: 'Up to 40% energy savings', priority: 1 },
    { label: 'LED Lighting Conversion', cost: '$400–$1,200', impact: '75% lighting energy reduction', priority: 2 },
    { label: 'Smart Power Strips', cost: '$150–$300', impact: 'Eliminates phantom loads', priority: 3 },
  ],
  'Add Smart Controls': [
    { label: 'Smart Thermostat System', cost: '$200–$600', impact: 'Remote control + auto-scheduling', priority: 1 },
    { label: 'Smart Lighting (whole-home)', cost: '$800–$2,500', impact: 'Voice + app control', priority: 2 },
    { label: 'Smart Locks + Security', cost: '$600–$1,800', impact: 'Remote access + monitoring', priority: 3 },
  ],
};

const twoStoryNote: Record<string, string> = {
  'Beat the DFW Heat': 'Two-story homes: budget 40% more — upper floor is hardest to cool in DFW summers.',
  'Reduce Noise': 'Focus on street-facing windows first.',
  'Improve Air Quality': 'Zoned purification recommended for two-story.',
  'Lower Energy Bills': 'Two zones minimum for HVAC efficiency.',
  'Add Smart Controls': 'Multi-zone smart thermostat essential for two stories.',
};

export default function DFWHomeComfortBudget() {
  const [homeType, setHomeType] = useState('');
  const [priority, setPriority] = useState('');

  const items = priority ? improvements[priority] ?? [] : [];
  const totalLow = items.reduce((s, i) => s + parseInt(i.cost.replace(/[^0-9]/g, '').substring(0, i.cost.indexOf('–') - 1 > 0 ? i.cost.indexOf('–') - 1 : 4)), 0);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK DFW</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Home Comfort Budget Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>DFW homeowners spend smart on comfort. Know what to budget for your priorities — before you talk to a contractor.</p>

        <div style={{ marginBottom: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>Home type</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {homeTypes.map(h => (
              <button key={h} onClick={() => setHomeType(h)} style={{ background: homeType === h ? '#F5E642' : '#111d30', color: homeType === h ? '#0A1628' : '#fff', border: '1px solid #1e3a5f', borderRadius: 6, padding: '0.5rem 1.25rem', cursor: 'pointer', fontWeight: 600 }}>{h}</button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 28 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>Comfort priority</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {priorities.map(p => (
              <button key={p} onClick={() => setPriority(p)} style={{ background: priority === p ? '#F5E642' : '#111d30', color: priority === p ? '#0A1628' : '#fff', border: '1px solid #1e3a5f', borderRadius: 6, padding: '0.5rem 1.25rem', cursor: 'pointer', fontWeight: 600 }}>{p}</button>
            ))}
          </div>
        </div>

        {homeType === 'Two Story' && priority && twoStoryNote[priority] && (
          <div style={{ background: '#1a1a00', border: '1px solid #F5E642', borderRadius: 8, padding: '0.75rem 1rem', marginBottom: 20, color: '#F5E642', fontSize: 13 }}>
            ⚠️ {twoStoryNote[priority]}
          </div>
        )}

        {items.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {items.map((item, i) => (
              <div key={i} style={{ background: '#111d30', borderRadius: 10, padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: 14, borderLeft: '4px solid #F5E642' }}>
                <div style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: 13, width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>#{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700 }}>{item.label}</div>
                  <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 2 }}>{item.impact}</div>
                </div>
                <div style={{ fontWeight: 800, color: '#F5E642', fontSize: 14, textAlign: 'right' }}>{item.cost}</div>
              </div>
            ))}
          </div>
        )}

        {!priority && <div style={{ color: '#334155', textAlign: 'center', marginTop: 40 }}>Select your home type and comfort priority above</div>}

        {items.length > 0 && (
          <div style={{ marginTop: 24, background: '#111d30', borderRadius: 10, padding: '1rem', color: '#64748b', fontSize: 13 }}>
            💡 <strong style={{ color: '#F5E642' }}>ProLnk tip:</strong> Get 3 quotes from TrustyPro-verified DFW HVAC and insulation specialists before committing to any comfort upgrade.
          </div>
        )}
      </div>
    </div>
  );
}
