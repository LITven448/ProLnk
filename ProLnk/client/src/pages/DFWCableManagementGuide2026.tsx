import { useState } from 'react';

export default function DFWCableManagementGuide2026() {
  const [installType, setInstallType] = useState('surface');

  const getApproach = () => {
    const approaches: Record<string, { method: string; tools: string; cost: string; diy: string; tip: string }> = {
      inwall: { method: 'In-wall cable routing with low-voltage brackets', tools: 'Fish tape, stud finder, drill, low-voltage brackets', cost: '$200–$600 (hire electrician for power cables)', diy: '⚠️ Hire licensed electrician for AC power runs', tip: 'Use conduit in walls for future cable upgrades' },
      surface: { method: 'Surface-mount raceways painted to match walls', tools: 'Adhesive raceways, cable ties, wall anchors', cost: '$30–$120 DIY', diy: '✅ Full DIY — no permit needed', tip: 'White raceways blend into light walls; paint them for exact match' },
      closet: { method: 'Whole-home AV closet with patch panel', tools: 'Patch panel, cable management bars, label maker', cost: '$400–$1,200 installed', diy: '⚠️ Run cables yourself, hire for termination', tip: 'Keep AV closet ventilated — equipment runs hot' },
      desk: { method: 'Under-desk cable tray + velcro ties', tools: 'Cable tray, velcro straps, power strip', cost: '$20–$60 DIY', diy: '✅ Full DIY', tip: 'Group cables by function: power vs data vs AV' },
    };
    return approaches[installType] || approaches.surface;
  };

  const approach = getApproach();

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 24px', fontFamily: 'system-ui, sans-serif', color: '#e2e8f0′ }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔌</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: 0 }}>DFW Cable Management Guide 2026</h1>
          <p style={{ color: '#94a3b8', marginTop: 8 }}>Clean tech installations for DFW homes — no exposed cable chaos</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📋 DFW Cable Management Options</h2>
          {[
            { icon: '🏠', label: 'In-Wall Routing', desc: 'Clean finish, hire electrician for power cables in TX' },
            { icon: '📦', label: 'Surface Raceways', desc: 'Paintable channels that mount to walls, full DIY' },
            { icon: '🗄️', label: 'AV Closet Setup', desc: 'Centralize all equipment for whole-home distribution' },
            { icon: '🔗', label: 'Cable Ties', desc: 'Velcro reusable ties — never use zip ties on power cables' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 14, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 22 }}>{item.icon}</span>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{item.label}</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔧 Choose Your Installation Type</h2>
          <select value={installType} onChange={e => setInstallType(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#e2e8f0', fontSize: 14, marginBottom: 20 }}>
            <option value="surface">Surface Raceways</option>
            <option value="inwall">In-Wall Cable Routing</option>
            <option value="closet">Whole-Home AV Closet</option>
            <option value="desk">Under-Desk / Workstation</option>
          </select>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
            {[
              { label: 'Method', value: approach.method },
              { label: 'Tools', value: approach.tools },
              { label: 'Cost', value: approach.cost },
              { label: 'DIY Status', value: approach.diy },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 3 ? '1px solid #1e3a5f' : 'none' }}>
                <span style={{ color: '#94a3b8', fontSize: 13, minWidth: 90 }}>{row.label}</span>
                <span style={{ color: '#e2e8f0', fontSize: 13, textAlign: 'right', maxWidth: '65%' }}>{row.value}</span>
              </div>
            ))}
            <div style={{ marginTop: 12, padding: '10px 12px', background: '#112240', borderRadius: 6, color: '#F5E642', fontSize: 13 }}>
              💡 {approach.tip}
            </div>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>Need a DFW pro for in-wall cable runs or AV closet setup? <span style={{ color: '#F5E642′ }}>ProLnk connects you with vetted local techs.</span></p>
        </div>
      </div>
    </div>
  );
}
