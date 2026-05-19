import { useState } from 'react';

export default function DFWMasterBedroomRemodelGuide2026() {
  const [budget, setBudget] = useState(20000);

  const getScope = (b: number) => {
    if (b < 10000) return {
      label: 'Refresh Package',
      items: ['LVP flooring replacement', 'Ceiling fan upgrade (DFW summer essential)', 'Fresh paint + trim', 'Lighting fixtures'],
      est: '$7K-$10K'
    };
    if (b < 25000) return {
      label: 'Suite Expansion',
      items: ['Walk-in closet conversion', 'LVP flooring throughout', 'Reading nook addition', 'Ceiling fan + smart lighting', 'Ensuite bath prep'],
      est: '$12K-$20K'
    };
    return {
      label: 'Full Master Suite',
      items: ['Ensuite bath addition ($18K-$35K)', 'Walk-in closet custom build', 'LVP flooring + baseboards', 'Reading nook with built-ins', 'Ceiling fan upgrade', 'Smart home integration'],
      est: '$25K-$50K+'
    };
  };

  const scope = getScope(budget);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600 }}>🏠 PROLNK DFW GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Master Bedroom Remodel Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Expand your master suite in the DFW market — costs, permits, and smart upgrades.</p>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🔨 Key Project Areas</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { icon: '🛁', label: 'Ensuite Bath Addition', cost: '$18K-$35K' },
              { icon: '👗', label: 'Walk-In Closet Conversion', cost: '$3K-$8K' },
              { icon: '🪵', label: 'LVP Flooring (DFW Preferred)', cost: '$3K-$7K' },
              { icon: '💨', label: 'Ceiling Fan Upgrade', cost: '$300-$900' },
              { icon: '📚', label: 'Reading Nook Addition', cost: '$1K-$4K' },
              { icon: '💡', label: 'Smart Lighting System', cost: '$800-$2K' },
            ].map((item) => (
              <div key={item.label} style={{ background: '#0f172a', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 20, marginBottom: 4 }}>{item.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{item.label}</div>
                <div style={{ color: '#F5E642', fontSize: 12 }}>{item.cost}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 4 }}>🧮 Budget Planner</h2>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 16 }}>Move the slider to see your DFW master bedroom upgrade scope.</p>
          <input type="range" min={5000} max={60000} step={1000} value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            style={{ width: '100%', marginBottom: 12, accentColor: '#F5E642' }} />
          <div style={{ textAlign: 'center', color: '#F5E642', fontWeight: 700, fontSize: 20, marginBottom: 16 }}>${budget.toLocaleString()} Budget</div>
          <div style={{ background: '#0f172a', borderRadius: 8, padding: 16 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>{scope.label}</div>
            <div style={{ color: '#64748b', fontSize: 12, marginBottom: 8 }}>Estimated range: {scope.est}</div>
            {scope.items.map((item) => (
              <div key={item} style={{ fontSize: 13, marginBottom: 4 }}>✅ {item}</div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>⚠️ DFW-Specific Considerations</h2>
          {[
            'DFW summers demand quality ceiling fans — budget accordingly.',
            'Ensuite bath additions require City of Dallas/Fort Worth permits.',
            'LVP flooring handles Texas humidity better than hardwood.',
            'Walk-in closet conversions may need structural assessment.',
            'Reading nooks near exterior walls benefit from extra insulation in DFW heat.',
          ].map((tip) => (
            <div key={tip} style={{ fontSize: 13, color: '#cbd5e1', marginBottom: 8, paddingLeft: 12, borderLeft: '2px solid #F5E642' }}>{tip}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
