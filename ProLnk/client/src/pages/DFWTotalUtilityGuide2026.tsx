import { useState } from 'react';

export default function DFWTotalUtilityGuide2026() {
  const [homeSize, setHomeSize] = useState(2000);
  const [hasPool, setHasPool] = useState(false);
  const [hasEV, setHasEV] = useState(false);

  const baseElectric = Math.round(homeSize / 2000 * 187);
  const evExtra = hasEV ? 45 : 0;
  const electricTotal = baseElectric + evExtra;
  const baseWater = Math.round(homeSize / 2000 * 85);
  const poolExtra = hasPool ? 40 : 0;
  const waterTotal = baseWater + poolExtra;
  const gasTotal = 65;
  const trashTotal = 30;
  const internetTotal = 75;
  const grandTotal = electricTotal + waterTotal + gasTotal + trashTotal + internetTotal;

  const utilities = [
    { icon: '⚡', name: 'Electricity', monthly: electricTotal, provider: 'Oncor delivery + retail', tip: 'Switch to TOU plan, raise thermostat to 78°F' },
    { icon: '🔥', name: 'Natural Gas', monthly: gasTotal, provider: 'Atmos Energy', tip: 'Seal attic bypasses, annual furnace tune-up' },
    { icon: '💧', name: 'Water/Sewer', monthly: waterTotal, provider: 'City utility', tip: 'Smart irrigation controller saves 30%' },
    { icon: '🗑️', name: 'Trash/Recycling', monthly: trashTotal, provider: 'City contract', tip: 'Fixed rate — limited reduction options' },
    { icon: '📡', name: 'Internet', monthly: internetTotal, provider: 'AT&T / Spectrum', tip: 'Negotiate annually — 30% discount often available' },
  ];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🏠</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', margin: '0.5rem 0' }}>DFW Total Utility Cost Guide 2026</h1>
          <p style={{ color: '#94A3B8', fontSize: '1.1rem' }}>What DFW homeowners pay total — avg $442/mo across all utilities</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[['$187/mo', 'Avg DFW Electric'], ['$65/mo', 'Avg DFW Gas'], ['$442/mo', 'Total All Utilities']].map(([val, label]) => (
            <div key={label} style={{ backgroundColor: '#1E2D45', borderRadius: 12, padding: '1.5rem', textAlign: 'center', border: '1px solid #2A3F5F' }}>
              <div style={{ color: '#F5E642', fontSize: '1.5rem', fontWeight: 700 }}>{val}</div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1E2D45', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem', border: '1px solid #2A3F5F' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🧮 Your Estimated Utility Costs</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: '0.85rem', display: 'block', marginBottom: 6 }}>Home Size (sq ft)</label>
              <input type="number" value={homeSize} onChange={e => setHomeSize(Number(e.target.value))}
                style={{ width: '100%', backgroundColor: '#0A1628', border: '1px solid #2A3F5F', borderRadius: 8, padding: '0.75rem', color: '#E8EDF5', fontSize: '1rem', boxSizing: 'border-box' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, justifyContent: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input type="checkbox" checked={hasPool} onChange={e => setHasPool(e.target.checked)} style={{ width: 16, height: 16 }} />
                <span style={{ color: '#94A3B8' }}>Has Pool (+$40/mo water)</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input type="checkbox" checked={hasEV} onChange={e => setHasEV(e.target.checked)} style={{ width: 16, height: 16 }} />
                <span style={{ color: '#94A3B8' }}>Has EV (+$45/mo electric)</span>
              </label>
            </div>
          </div>

          {utilities.map(({ icon, name, monthly, provider, tip }) => (
            <div key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: '#0A1628', borderRadius: 8, marginBottom: '0.75rem' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{icon} {name}</div>
                <div style={{ color: '#94A3B8', fontSize: '0.8rem' }}>{provider} — {tip}</div>
              </div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.2rem' }}>${monthly}/mo</div>
            </div>
          ))}

          <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: '1rem', textAlign: 'center', borderTop: '2px solid #F5E642', marginTop: '0.5rem' }}>
            <div style={{ color: '#94A3B8', fontSize: '0.9rem' }}>Your Estimated Monthly Total</div>
            <div style={{ color: '#F5E642', fontSize: '2.5rem', fontWeight: 700 }}>${grandTotal}/mo</div>
            <div style={{ color: '#94A3B8', fontSize: '0.85rem' }}>${(grandTotal * 12).toLocaleString()}/year</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#1E2D45', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem', border: '1px solid #2A3F5F' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🎯 Biggest Reduction Opportunities</h2>
          {[['⚡ HVAC upgrade (15yr+ unit)', 'Replace with 18+ SEER — cuts electric $50-100/mo', '$600-1,200/yr'],
            ['💧 Smart irrigation controller', 'Rachio or Orbit B-hyve — 30% water reduction', '$360-540/yr'],
            ['🔥 Attic air sealing', 'Seal attic bypasses before adding insulation', '$300-600/yr'],
            ['📡 Negotiate internet rate', 'Call annually, reference competitor pricing', '$180-360/yr']
          ].map(([action, detail, save]) => (
            <div key={action} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid #2A3F5F' }}>
              <div><div style={{ fontWeight: 600 }}>{action}</div><div style={{ color: '#94A3B8', fontSize: '0.8rem' }}>{detail}</div></div>
              <div style={{ color: '#00CC66', fontWeight: 700 }}>{save}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', padding: '1.5rem', backgroundColor: '#1E2D45', borderRadius: 12, border: '1px solid #F5E642' }}>
          <div style={{ fontSize: '1.5rem' }}>🏠</div>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>Reduce Your Utilities — Get Free Quotes</div>
          <div style={{ color: '#94A3B8', fontSize: '0.9rem' }}>ProLnk connects you with DFW pros for HVAC, plumbing, insulation, and more</div>
        </div>
      </div>
    </div>
  );
}
