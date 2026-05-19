import { useState } from 'react';

export default function DFWVentilationGuide2026() {
  const [area, setArea] = useState('');
  const [result, setResult] = useState<{ solution: string; detail: string; cost: string } | null>(null);

  const solutions: Record<string, { solution: string; detail: string; cost: string }> = {
    kitchen: { solution: 'Exterior Exhaust Range Hood', detail: 'Recirculating hoods just filter and recirculate grease-laden air. Exterior exhaust is the only real solution — 600 CFM minimum for DFW kitchens.', cost: '$400–1,200 installed' },
    bathroom: { solution: '20-Min Timer Exhaust Fan', detail: 'Run exhaust 20 minutes after every shower. DFW humidity averages 60%+ in spring — mold risk is real. Upgrade to 110 CFM fan if existing is under 50 CFM.', cost: '$150–400 installed' },
    whole_home: { solution: 'Energy Recovery Ventilator (ERV)', detail: 'ERV brings in fresh outdoor air while recovering 70–80% of conditioned energy. Better choice than HRV in DFW due to humidity management. ASHRAE 62.2 requires 0.35 ACH.', cost: '$2,500–5,000 installed' },
    attic: { solution: 'Ridge + Soffit Ventilation System', detail: 'DFW attics require 1 sq ft of net free area per 150 sq ft of attic floor. Ridge vent + continuous soffit vent is the gold standard. Power attic ventilators rarely help with insulated floors.', cost: '$800–2,500′ },
    crawl: { solution: 'Encapsulation + Mechanical Ventilation', detail: 'Open foundation vents introduce humid DFW air. Encapsulate with vapor barrier + dehumidifier for sealed crawl. Code allows both vented and sealed approaches in Texas.', cost: '$3,000–8,000′ },
  };

  function recommend() {
    if (!area) return;
    setResult(solutions[area] || null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>💨 DFW VENTILATION GUIDE 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>DFW Home Ventilation Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Proper ventilation in DFW goes beyond cracking a window. Humidity, heat, and air quality need systematic solutions for each area of your home.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '2rem' }}>
          {[
            { icon: '🍳', label: 'Kitchen', fact: 'Cooking releases CO, VOCs, and particulates. Only exterior exhaust removes them.' },
            { icon: '🚿', label: 'Bathroom', fact: 'Moisture from one shower raises whole-home humidity. 20-min fan rule prevents mold.' },
            { icon: '🏠', label: 'Whole Home', fact: 'Modern homes are tight. ERV brings fresh air without energy loss.' },
            { icon: '🔥', label: 'Attic', fact: '140°F attic temps drive up cooling costs. Ridge/soffit ventilation is critical.' },
            { icon: '🕳️', label: 'Crawl Space', fact: 'DFW clay soil releases moisture. Vented crawls introduce humid air all summer.' },
            { icon: '💧', label: 'DFW Humidity', fact: 'Spring RH regularly hits 80%+. Indoor target: 40–50% RH year-round.' },
          ].map((c) => (
            <div key={c.label} style={{ background: '#0f2040', borderRadius: 10, padding: '1rem', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: '1.4rem' }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.9rem', margin: '0.3rem 0′ }}>{c.label}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.78rem' }}>{c.fact}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', border: '1px solid #F5E642', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🧮 Ventilation Solution Finder</h2>
          <select value={area} onChange={e => setArea(e.target.value)} style={{ background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 6, padding: '0.6rem', width: '100%', marginBottom: '1rem' }}>
            <option value="">Select area of concern</option>
            <option value="kitchen">Kitchen — cooking odors and smoke</option>
            <option value="bathroom">Bathroom — moisture and humidity</option>
            <option value="whole_home">Whole home — fresh air and IAQ</option>
            <option value="attic">Attic — extreme heat</option>
            <option value="crawl">Crawl space — moisture and mold</option>
          </select>
          <button onClick={recommend} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '0.6rem 1.5rem', cursor: 'pointer' }}>Get Solution</button>
          {result && (
            <div style={{ marginTop: '1rem', background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>{result.solution}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{result.detail}</div>
              <div style={{ color: '#4ade80', fontSize: '0.85rem', fontWeight: 600 }}>Typical Cost: {result.cost}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 10, padding: '1.25rem', border: '1px solid #1e3a5f' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>🌬️ ERV vs HRV in DFW</div>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>HRV (Heat Recovery Ventilator) works best in cold climates where dehumidification is rarely needed. ERV (Energy Recovery Ventilator) is superior for DFW — it also transfers moisture, preventing the humid outdoor air from spiking indoor humidity during spring and fall when windows are open.</p>
        </div>
      </div>
    </div>
  );
}