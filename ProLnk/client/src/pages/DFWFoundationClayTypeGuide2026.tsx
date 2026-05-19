import { useState } from 'react';

const clayTypes = [
  { id: 'blackland', label: 'Blackland Prairie', counties: ['Dallas', 'Collin', 'Tarrant (North)'], pi: '40-60+', expansion: 'Extreme', color: '#EF4444', risk: 'Highest', note: 'Most expansive clay in DFW — black, sticky, shrinks dramatically in drought' },
  { id: 'houston', label: 'Houston Black', counties: ['South Tarrant', 'Johnson'], pi: '30-50', expansion: 'High', color: '#F97316', risk: 'High', note: 'Slightly less expansive than Blackland, still causes significant foundation movement' },
  { id: 'georgetown', label: 'Georgetown (Limestone)', counties: ['Northwest Tarrant', 'Parker'], pi: '15-30', expansion: 'Moderate', color: '#EAB308', risk: 'Moderate', note: 'Limestone base reduces clay depth, less expansion but still active in wet/dry cycles' },
  { id: 'postoak', label: 'Post-Oak Savanna', counties: ['Hood', 'Somervell', 'Kaufman (East)'], pi: '10-20', expansion: 'Lower', color: '#4ADE80', risk: 'Lower', note: 'Sandy clay loam, lower plasticity, more stable under foundations' },
];

const zones = ['Dallas', 'Collin', 'Tarrant (North)', 'South Tarrant', 'Johnson', 'Northwest Tarrant', 'Parker', 'Hood', 'Somervell', 'Kaufman (East)'];

export default function DFWFoundationClayTypeGuide2026() {
  const [zone, setZone] = useState('Dallas');

  const matchedClay = clayTypes.find(c => c.counties.includes(zone)) || clayTypes[0];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW CLAY SOIL GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.2, marginBottom: 8 }}>Not All DFW Clay Is Equal — Know Your Soil Type</h1>
        <p style={{ color: '#9BA3AF', fontSize: 15, marginBottom: 32 }}>DFW sits on 4 distinct clay soil types. Your expansion risk — and foundation repair cost — depends heavily on which one is under your home.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>📍 Select Your DFW Area</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {zones.map(z => (
              <button key={z} onClick={() => setZone(z)} style={{ background: zone === z ? '#F5E642' : '#1A2F50', color: zone === z ? '#0A1628' : '#E8EAF0', border: 'none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>{z}</button>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24, borderLeft: `4px solid ${matchedClay.color}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div>
              <div style={{ color: matchedClay.color, fontWeight: 800, fontSize: 20 }}>{matchedClay.label}</div>
              <div style={{ color: '#9BA3AF', fontSize: 13 }}>{matchedClay.counties.join(', ')}</div>
            </div>
            <div style={{ background: matchedClay.color, color: '#0A1628', borderRadius: 6, padding: '4px 12px', fontWeight: 800, fontSize: 13 }}>{matchedClay.risk} RISK</div>
          </div>
          <div style={{ color: '#CBD5E1', fontSize: 14, marginBottom: 16 }}>{matchedClay.note}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ background: '#1A2F50', borderRadius: 8, padding: 12 }}>
              <div style={{ color: '#9BA3AF', fontSize: 12 }}>Plasticity Index (PI)</div>
              <div style={{ color: matchedClay.color, fontWeight: 800, fontSize: 20 }}>{matchedClay.pi}</div>
            </div>
            <div style={{ background: '#1A2F50', borderRadius: 8, padding: 12 }}>
              <div style={{ color: '#9BA3AF', fontSize: 12 }}>Volume Change</div>
              <div style={{ color: matchedClay.color, fontWeight: 800, fontSize: 20 }}>{matchedClay.expansion}</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {clayTypes.map(c => (
            <div key={c.id} style={{ background: '#0F2040', borderRadius: 10, padding: 16, borderTop: `3px solid ${c.color}` }}>
              <div style={{ color: c.color, fontWeight: 700, fontSize: 14 }}>{c.label}</div>
              <div style={{ color: '#9BA3AF', fontSize: 12, marginTop: 4 }}>PI: {c.pi} | {c.expansion} expansion</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>🏗️ Foundation Maintenance by Clay Type</div>
          {['Water consistently within 18" of foundation perimeter year-round', 'Install soaker hose system before first DFW summer drought', 'Check for gaps at door frames and windows after dry spells', 'Tree roots + clay = high-risk combo — keep trees 15ft+ from slab', 'ProLnk charter pros perform annual foundation moisture assessments'].map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
              <span style={{ color: '#F5E642' }}>✓</span>
              <span style={{ color: '#CBD5E1', fontSize: 14 }}>{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}