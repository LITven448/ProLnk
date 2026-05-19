import { useState } from 'react';

export default function DFWFoundationPostTension2026() {
  const [concern, setConcern] = useState('');
  const [guide, setGuide] = useState('');

  const concerns = [
    { label: 'Planning slab penetration or cutting', key: 'cut' },
    { label: 'Found visible cable end or anchor', key: 'anchor' },
    { label: 'Hearing popping or cable sounds', key: 'pop' },
    { label: 'Contractor mentioned post-tension', key: 'contractor' },
    { label: 'Buying a home built after 1990', key: 'buying' },
  ];

  const guides: Record<string, string> = {
    cut: '🚨 STOP immediately. Cutting a post-tension cable releases ~30,000 lbs of force instantly — catastrophic structural failure is possible. Hire a licensed structural engineer to locate all cables with a detensiometer before ANY slab work proceeds.',
    anchor: '🔍 Anchor ends appear at slab edges, often covered by trim or stucco. Do not disturb or grind anchor pockets. If an anchor appears corroded or failing, call a post-tension specialist immediately for re-anchoring.',
    pop: '⚠️ Popping sounds may indicate cable movement or anchor stress. Have a structural engineer perform a detensiometer scan to verify cable integrity. Do not ignore — early detection prevents major failure.',
    contractor: '📋 Ask your contractor for a post-tension cable map before any work begins. Legitimate DFW foundation contractors always scan for cables. Require written confirmation that no cables will be compromised.',
    buying: '🏠 Request post-tension slab documentation from seller. Most DFW builders 1990+ used post-tension. Ask for the original engineering plan. Budget for periodic anchor inspection every 10-15 years.',
  };

  const handleConcern = (key: string) => {
    setConcern(key);
    setGuide(guides[key]);
  };

  const facts = [
    { icon: '📅', label: 'Adoption Era', value: 'DFW standard since ~1990′ },
    { icon: '⚡', label: 'Cable Tension', value: '33,000 lbs per cable' },
    { icon: '📏', label: 'Cable Spacing', value: 'Typically 4–5 ft apart' },
    { icon: '🔧', label: 'Scan Tool', value: 'Detensiometer (GPR)' },
    { icon: '⚠️', label: 'Cut Risk', value: 'Immediate structural failure' },
    { icon: '💰', label: 'Repair Cost', value: '$3,000–$15,000 per cable' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔩</div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#F5E642', margin: '0 0 8px' }}>DFW Post-Tension Slab Foundation Guide 2026</h1>
          <p style={{ color: '#94A3B8', fontSize: '15px', margin: 0 }}>Most DFW homes built 1990+ use post-tension slabs — know the critical rules before any slab work</p>
        </div>

        <div style={{ background: '#FF4444', borderRadius: '12px', padding: '16px 20px', marginBottom: '28px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <span style={{ fontSize: '24px' }}>🚨</span>
          <div>
            <div style={{ fontWeight: '700', fontSize: '16px', color: '#fff', marginBottom: '4px' }}>Critical Warning</div>
            <div style={{ color: '#FFD0D0', fontSize: '14px' }}>Cutting a post-tension cable releases ~30,000 lbs of force instantly. Always scan with a detensiometer before ANY slab penetration in DFW homes built after 1990.</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '28px' }}>
          {facts.map(f => (
            <div key={f.label} style={{ background: '#0F2240', border: '1px solid #1E3A5F', borderRadius: '10px', padding: '14px', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', marginBottom: '6px' }}>{f.icon}</div>
              <div style={{ color: '#94A3B8', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{f.label}</div>
              <div style={{ color: '#F5E642', fontSize: '13px', fontWeight: '700', marginTop: '4px' }}>{f.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2240', border: '1px solid #1E3A5F', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>⚡ Post-Tension Concern Guide</h2>
          <p style={{ color: '#94A3B8', fontSize: '14px', marginBottom: '16px' }}>Select your situation for immediate guidance:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            {concerns.map(c => (
              <button key={c.key} onClick={() => handleConcern(c.key)}
                style={{ background: concern === c.key ? '#F5E642′ : '#1E3A5F', color: concern === c.key ? '#0A1628' : '#E8EAF0', border: ’none', borderRadius: '8px', padding: '12px 16px', cursor: 'pointer', textAlign: 'left', fontSize: '14px', fontWeight: '600', transition: 'all 0.2s' }}>
                {c.label}
              </button>
            ))}
          </div>
          {guide && (
            <div style={{ background: '#0A1628', border: '1px solid #F5E642', borderRadius: '8px', padding: '16px' }}>
              <p style={{ color: '#E8EAF0', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{guide}</p>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2240', border: '1px solid #1E3A5F', borderRadius: '12px', padding: '20px' }}>
          <h3 style={{ color: '#F5E642', fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>🏗️ How Post-Tension Works in DFW</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { step: '1', text: 'Steel cables (tendons) are placed in slab forms before concrete pour' },
              { step: '2', text: 'Concrete cures for 28 days until reaching design strength' },
              { step: '3', text: 'Hydraulic jack stresses each cable to ~33,000 lbs of tension' },
              { step: '4', text: 'Anchors at slab edge lock in the tension permanently' },
              { step: '5', text: 'Compressed concrete gains strength and resists DFW clay movement' },
            ].map(s => (
              <div key={s.step} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '800', flexShrink: 0 }}>{s.step}</div>
                <p style={{ color: '#94A3B8', fontSize: '14px', margin: 0, lineHeight: '1.5′ }}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}