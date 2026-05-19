import { useState } from 'react';

export default function DFWInsulationBattVsSpray2026() {
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');

  const recommendations: Record<string, Record<string, { type: string; emoji: string; why: string; cost: string; rValue: string }>> = {
    attic: {
      low: { type: 'Blown-In Fiberglass', emoji: '🪨', why: 'Cost-effective for open attic floors. Add air sealing first for best results in DFW heat.', cost: '$1.50-2.50/sqft', rValue: 'R-38 to R-60′ },
      mid: { type: 'Open-Cell Spray Foam', emoji: '🫧', why: 'Air seals AND insulates. Excellent for DFW mixed climate — eliminates attic bypass leakage.', cost: '$1.50-2.00/sqft', rValue: 'R-13 per inch' },
      high: { type: 'Closed-Cell Spray Foam', emoji: '🧊', why: 'Highest performance, vapor barrier built-in. Best for unvented attic conversion in DFW.', cost: '$3.00-5.00/sqft', rValue: 'R-6 to R-7 per inch' },
    },
    walls: {
      low: { type: 'Fiberglass Batt', emoji: '🪨', why: 'Standard choice for new construction wall cavities. Requires air barrier (house wrap) to perform in DFW.', cost: '$0.50-1.00/sqft', rValue: 'R-13 to R-21′ },
      mid: { type: 'Open-Cell Spray Foam', emoji: '🫧', why: 'Fills irregular cavities completely. Good vapor management for DFW mixed-humid climate.', cost: '$1.50-2.00/sqft', rValue: 'R-3.5 per inch' },
      high: { type: 'Closed-Cell Spray Foam', emoji: '🧊', why: 'Best wall performance. Adds structural strength, acts as vapor retarder — ideal for DFW exterior walls.', cost: '$3.00-5.00/sqft', rValue: 'R-6 to R-7 per inch' },
    },
    crawlspace: {
      low: { type: 'Fiberglass Batt Between Joists', emoji: '🪨', why: 'Low cost but prone to sag and moisture issues. Add vapor barrier on ground for DFW humidity.', cost: '$0.75-1.25/sqft', rValue: 'R-19 to R-30′ },
      mid: { type: 'Open-Cell Spray Foam on Walls', emoji: '🫧', why: 'Encapsulate crawlspace walls instead of floor joists — better DFW strategy for moisture control.', cost: '$1.75-2.50/sqft', rValue: 'R-13 per inch' },
      high: { type: 'Closed-Cell Spray Foam Encapsulation', emoji: '🧊', why: 'Full crawlspace encapsulation — premium DFW solution for moisture, pests, and energy all-in-one.', cost: '$3.50-5.50/sqft', rValue: 'R-6 to R-7 per inch' },
    },
  };

  const result = location && budget ? recommendations[location]?.[budget] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#ffffff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🏗️</div>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#F5E642', marginBottom: '8px' }}>Batt vs Spray Foam: DFW Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '16px' }}>Which insulation type is right for your DFW home and budget?</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '28px' }}>
          {[
            { id: 'batt', emoji: '🪨', title: 'Fiberglass Batt', pros: 'Cheapest upfront', cons: 'Needs air barrier', fit: 'New construction' },
            { id: 'open', emoji: '🫧', title: 'Open-Cell Foam', pros: 'Air seals + insulates', cons: 'Vapor mgmt critical', fit: 'DFW best value' },
            { id: 'closed', emoji: '🧊', title: 'Closed-Cell Foam', pros: 'Max performance', cons: 'Highest cost', fit: 'Premium builds' },
          ].map(opt => (
            <div key={opt.id} style={{ backgroundColor: '#1e3a5f', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>{opt.emoji}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '6px', fontSize: '14px' }}>{opt.title}</div>
              <div style={{ color: '#22c55e', fontSize: '12px', marginBottom: '4px' }}>✅ {opt.pros}</div>
              <div style={{ color: '#f97316', fontSize: '12px', marginBottom: '4px' }}>⚠️ {opt.cons}</div>
              <div style={{ color: '#94a3b8', fontSize: '12px' }}>🎯 {opt.fit}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1e3a5f', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', marginBottom: '16px' }}>🔍 Get My DFW Recommendation</h2>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ color: '#94a3b8', fontSize: '14px', display: 'block', marginBottom: '6px' }}>Where are you insulating?</label>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {['attic', 'walls', 'crawlspace'].map(l => (
                <button key={l} onClick={() => setLocation(l)} style={{ backgroundColor: location === l ? '#F5E642′ : '#0A1628', color: location === l ? '#0A1628' : '#fff', border: '2px solid #F5E642', borderRadius: '8px', padding: '8px 18px', cursor: ’pointer', fontWeight: 600, textTransform: 'capitalize' }}>{l}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ color: '#94a3b8', fontSize: '14px', display: 'block', marginBottom: '6px' }}>Budget level?</label>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {[{ id: 'low', label: '💰 Budget' }, { id: 'mid', label: '💰💰 Mid' }, { id: 'high', label: '💰💰💰 Premium' }].map(b => (
                <button key={b.id} onClick={() => setBudget(b.id)} style={{ backgroundColor: budget === b.id ? '#F5E642′ : '#0A1628', color: budget === b.id ? '#0A1628' : '#fff', border: '2px solid #F5E642', borderRadius: '8px', padding: '8px 18px', cursor: ’pointer', fontWeight: 600 }}>{b.label}</button>
              ))}
            </div>
          </div>
        </div>

        {result && (
          <div style={{ backgroundColor: '#0f2540', borderRadius: '12px', padding: '24px', border: '2px solid #F5E642′ }}>
            <div style={{ fontSize: '40px', textAlign: 'center', marginBottom: '8px' }}>{result.emoji}</div>
            <h3 style={{ color: '#F5E642', fontSize: '22px', textAlign: 'center', marginBottom: '16px' }}>Recommended: {result.type}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
              <div style={{ backgroundColor: '#1e3a5f', borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
                <div style={{ color: '#94a3b8', fontSize: '12px' }}>Installed Cost</div>
                <div style={{ color: '#22c55e', fontWeight: 700, fontSize: '16px' }}>{result.cost}</div>
              </div>
              <div style={{ backgroundColor: '#1e3a5f', borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
                <div style={{ color: '#94a3b8', fontSize: '12px' }}>R-Value</div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '16px' }}>{result.rValue}</div>
              </div>
            </div>
            <p style={{ color: '#cbd5e1', lineHeight: '1.6′ }}>{result.why}</p>
          </div>
        )}
      </div>
    </div>
  );
}