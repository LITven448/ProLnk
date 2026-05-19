import { useState } from 'react';

const rustSituations = [
  { id: 'drain', label: 'Drain pan has rust stains', part: 'Drain Pan', cost: '$150–$350', action: 'Replace pan + treat condensate line before water damage spreads' },
  { id: 'cabinet', label: 'Air handler cabinet shows rust', part: 'Air Handler Cabinet', cost: '$200–$600', action: 'Sand, prime, repaint or replace cabinet; check refrigerant lines for leaks' },
  { id: 'outdoor', label: 'Outdoor unit has surface corrosion', part: 'Outdoor Condenser', cost: '$75–$250', action: 'Clean coils, apply coil guard coating, check fins for blockage' },
  { id: 'none', label: 'No rust yet — want to prevent', part: 'All Components', cost: '$0 DIY / $150 Pro', action: 'Annual protective coating + monthly drain check is all you need' },
];

const urgencyMap: Record<string, string> = {
  drain: '🔴 Act within 1–2 weeks — drain pan rust leads to ceiling leaks',
  cabinet: '🟡 Act within 30 days — cabinet rust is cosmetic until it isn\’t',
  outdoor: '🟡 Act before summer — corrosion reduces efficiency by 10–20%',
  none: '🟢 Annual maintenance keeps rust off indefinitely',
};

export default function DFWHVACRustPrevention() {
  const [selected, setSelected] = useState('');
  const [result, setResult] = useState<null | typeof rustSituations[0]>(null);

  const assess = () => {
    const sit = rustSituations.find(s => s.id === selected);
    if (sit) setResult(sit);
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EEF4', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '2rem' }}>🦺</span>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW HVAC Rust Prevention</h1>
        </div>
        <p style={{ color: '#94A3B8', marginBottom: '2rem' }}>DFW's humidity doesn't just breed mold — it corrodes your HVAC system from the inside out. Knowing where rust starts and how to stop it early saves thousands.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { icon: '💧', title: 'Drain Pan Rust', desc: 'Constant condensate contact causes rust that leads to leaks' },
            { icon: '🏠', title: 'Cabinet Rust', desc: 'Humid attics and closets corrode the air handler shell' },
            { icon: '☀️', title: 'Outdoor Corrosion', desc: 'DFW rain + heat cycle eats condenser coils and fins' },
          ].map(item => (
            <div key={item.title} style={{ background: '#0F2040', borderRadius: 10, padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.icon}</div>
              <div style={{ fontWeight: 600, color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.35rem' }}>{item.title}</div>
              <div style={{ color: '#94A3B8', fontSize: '0.78rem' }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '0.5rem' }}>🔍 What's Your DFW Rust Situation?</h2>
          <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '1rem' }}>Select what you're dealing with and get a targeted prevention + repair plan.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
            {rustSituations.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)}
                style={{ padding: '0.75rem 1rem', borderRadius: 8, border: '2px solid', borderColor: selected === s.id ? '#F5E642' : '#1E3A5F', background: selected === s.id ? '#1a2f50' : 'transparent', color: '#E8EEF4', cursor: 'pointer', textAlign: 'left', fontSize: '0.9rem' }}>
                {s.label}
              </button>
            ))}
          </div>
          <button onClick={assess} disabled={!selected}
            style={{ width: '100%', padding: '0.85rem', borderRadius: 10, background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: '1rem', border: 'none', cursor: selected ? 'pointer' : 'not-allowed', opacity: selected ? 1 : 0.5 }}>
            Get My Rust Prevention + Cost Assessment
          </button>
        </div>

        {result && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', borderLeft: '4px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', margin: '0 0 0.75rem' }}>Assessment: {result.part}</h3>
            <p style={{ fontSize: '0.9rem', color: '#94A3B8', marginBottom: '0.5rem' }}>{urgencyMap[result.id]}</p>
            <p style={{ color: '#E8EEF4', marginBottom: '0.5rem' }}>✅ <strong>Recommended action:</strong> {result.action}</p>
            <p style={{ color: '#E8EEF4', marginBottom: '1rem' }}>💰 <strong>Estimated cost:</strong> {result.cost}</p>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
              <p style={{ color: '#F5E642', fontWeight: 600, margin: '0 0 0.5rem' }}>🛡️ Annual Prevention Checklist</p>
              <ul style={{ color: '#94A3B8', fontSize: '0.85rem', paddingLeft: '1.25rem', lineHeight: 1.8, margin: 0 }}>
                <li>Apply coil guard coating to outdoor condenser every spring</li>
                <li>Drop condensate tablets in drain pan monthly during summer</li>
                <li>Check drain pan visually every 3 months — wipe any rust spots</li>
                <li>Ensure attic has adequate ventilation to reduce humidity around air handler</li>
              </ul>
            </div>
            <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#1a2f50', borderRadius: 8 }}>
              <p style={{ margin: 0, color: '#94A3B8', fontSize: '0.85rem' }}>🔧 ProLnk matches you with DFW HVAC pros who do coil guard treatment and drain pan replacement — free quotes.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
