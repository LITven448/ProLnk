import { useState } from 'react';

const roofTypes = ['Asphalt Shingle', 'Metal', 'Clay Tile', 'Flat/TPO'];
const homeStyles = ['Ranch/Single Story', 'Two Story', 'Split Level', 'Contemporary'];

const solarData: Record<string, { roof: string; panels: string; risk: string; recRoof: string; recPanels: string }> = {
  'Asphalt Shingle': { roof: '$45,000–$65,000', panels: '$18,000–$28,000', risk: 'High — tiles crack on hail 1.5"+', recRoof: 'Replace roof first, then add traditional panels', recPanels: 'Traditional panels on new shingles' },
  'Metal':           { roof: '$55,000–$75,000', panels: '$18,000–$28,000', risk: 'Low — metal handles DFW hail well',   recRoof: 'Tesla Solar Roof or metal roof + panels both viable', recPanels: 'Either option — metal roof lasts 50+ years' },
  'Clay Tile':       { roof: '$60,000–$80,000', panels: '$18,000–$28,000', risk: 'Medium — tiles chip but rarely crack',  recRoof: 'Add traditional panels on existing tile',             recPanels: 'Traditional panel rack over tile' },
  'Flat/TPO':        { roof: '$35,000–$50,000', panels: '$18,000–$28,000', risk: 'Medium — flat great for ballast panels', recRoof: 'Ballasted flat-mount panels on TPO',                 recPanels: 'Ballasted racking, no penetrations needed' },
};

export default function DFWSolarRoofingGuide() {
  const [roofType, setRoofType] = useState('');
  const [homeStyle, setHomeStyle] = useState('');
  const [showResult, setShowResult] = useState(false);

  const result = roofType ? solarData[roofType] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>☀️🏠</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>DFW Solar Roofing Guide</h1>
          <p style={{ color: '#94A3B8', fontSize: 16 }}>Tesla Solar Roof vs Traditional Panels — What's Right for Your DFW Home?</p>
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>⚡ DFW Solar Reality Check</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              ['☀️', 'Sun Hours', '5.5 peak sun hours/day — top 20% nationally'],
              ['🌨️', 'Hail Risk', '#1 hail market in the US — choose wisely'],
              ['⚡', 'ERCOT Grid', 'Volatile pricing — solar + storage = savings'],
              ['💰', 'Incentives', '30% federal ITC + TX property tax exemption'],
            ].map(([icon, label, desc]) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 24, marginBottom: 4 }}>{icon}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{label}</div>
                <div style={{ color: '#94A3B8', fontSize: 13, marginTop: 4 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🔍 Solar Roof Advisor</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94A3B8', fontSize: 14, display: 'block', marginBottom: 8 }}>Current Roof Type</label>
            <select value={roofType} onChange={e => { setRoofType(e.target.value); setShowResult(false); }}
              style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', fontSize: 15 }}>
              <option value="">Select roof type...</option>
              {roofTypes.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#94A3B8', fontSize: 14, display: 'block', marginBottom: 8 }}>Home Style</label>
            <select value={homeStyle} onChange={e => setHomeStyle(e.target.value)}
              style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', fontSize: 15 }}>
              <option value="">Select home style...</option>
              {homeStyles.map(h => <option key={h} value={h}>{h}</option>)}
            </select>
          </div>
          <button onClick={() => setShowResult(true)} disabled={!roofType || !homeStyle}
            style={{ width: '100%', background: roofType && homeStyle ? '#F5E642' : '#1E3A5F', color: roofType && homeStyle ? '#0A1628' : '#4A6FA5', border: 'none', borderRadius: 8, padding: '12px 0', fontSize: 16, fontWeight: 700, cursor: roofType && homeStyle ? 'pointer' : 'default' }}>
            Get My DFW Solar Recommendation →
          </button>
        </div>

        {showResult && result && (
          <div style={{ background: '#111D35', borderRadius: 12, padding: 24, border: '2px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', fontSize: 20, marginBottom: 20 }}>🎯 Your DFW Solar Recommendation</h3>
            {[
              ['🏗️', 'Recommended Approach', result.recRoof],
              ['🌩️', 'DFW Hail Risk', result.risk],
              ['💡', 'Panel Strategy', result.recPanels],
              ['💰', 'Solar Roof Cost', result.roof],
              ['⚡', 'Traditional Panels Cost', result.panels],
            ].map(([icon, label, val]) => (
              <div key={label} style={{ display: 'flex', gap: 12, marginBottom: 14, padding: 14, background: '#0A1628', borderRadius: 8 }}>
                <span style={{ fontSize: 20 }}>{icon}</span>
                <div><div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 4 }}>{label}</div><div style={{ fontWeight: 600 }}>{val}</div></div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
