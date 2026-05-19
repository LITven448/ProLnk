import { useState } from 'react';

type MistingPlan = { system: string; nozzles: number; cost: string; water: string; psi: string; tip: string };

const plans: Record<string, MistingPlan> = {
  'small-light': { system: 'Low-pressure DIY kit', nozzles: 6, cost: '$150–$350', water: '1–2 gallons/hr', psi: '40–60 PSI (standard hose bib)', tip: 'Great for casual use. Low-pressure produces larger droplets — you may get slightly wet.' },
  'small-medium': { system: 'Mid-pressure portable system', nozzles: 8, cost: '$300–$600', water: '2–3 gallons/hr', psi: '60–160 PSI (pump included)', tip: 'Removes 10–15°F. Pump unit sits near hose bib, runs quietly.' },
  'small-high': { system: 'High-pressure professional system', nozzles: 6, cost: '$800–$1,500 installed', water: '1–2 gallons/hr', psi: '1000+ PSI (professional pump)', tip: 'Flash evaporation — no wet feeling. Most popular for DFW outdoor dining.' },
  'medium-light': { system: 'Low-pressure kit (extended)', nozzles: 12, cost: '$250–$500', water: '2–4 gallons/hr', psi: '40–60 PSI', tip: 'Budget-friendly for covered patios. Install under pergola for best coverage.' },
  'medium-medium': { system: 'Mid-pressure system', nozzles: 14, cost: '$500–$900', water: '3–5 gallons/hr', psi: '60–160 PSI', tip: 'Best value for most DFW homeowners. Cools 15–20°F effectively.' },
  'medium-high': { system: 'High-pressure system (recommended)', nozzles: 12, cost: '$1,500–$2,800 installed', water: '2–4 gallons/hr', psi: '1000+ PSI', tip: 'The gold standard for DFW summers. Set on timer for automated cooling all afternoon.' },
  'large-light': { system: 'Multiple low-pressure zones', nozzles: 20, cost: '$400–$700', water: '4–6 gallons/hr', psi: '40–60 PSI', tip: 'Multiple hose bibs needed for large areas. Pressure drops across long runs.' },
  'large-medium': { system: 'Multi-zone mid-pressure', nozzles: 22, cost: '$900–$1,800', water: '5–8 gallons/hr', psi: '60–160 PSI', tip: 'Zone control allows different areas to run independently.' },
  'large-high': { system: 'Commercial-grade high-pressure', nozzles: 20, cost: '$2,800–$6,000 installed', water: '4–7 gallons/hr', psi: '1000+ PSI', tip: 'Professional design and installation required. Ties into dedicated water line.' },
};

export default function DFWMistingSystemGuide() {
  const [size, setSize] = useState('medium');
  const [cooling, setCooling] = useState('high');
  const [showPlan, setShowPlan] = useState(false);

  const key = `${size}-${cooling}` as keyof typeof plans;
  const plan = plans[key];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '4px 14px', borderRadius: 4, fontSize: 13, fontWeight: 700, marginBottom: 16 }}>
          💧 DFW MISTING SYSTEM GUIDE
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Outdoor Misting Systems for DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>
          DFW summers regularly hit 105°F+. A quality misting system drops perceived temperature by 15–25°F — making outdoor living possible June through September.
        </p>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: '1.5rem', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>⚙️ System Types Compared</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {[
              { icon: '💧', type: 'Low Pressure', psi: '40–60 PSI', cooling: '5–10°F', cost: '$150–$500', pro: 'DIY, low cost', con: 'Slight wet feeling on skin' },
              { icon: '💦', type: 'Mid Pressure', psi: '60–160 PSI', cooling: '10–18°F', cost: '$300–$1,000', pro: 'Pump included, no wet feeling', con: 'Pump maintenance needed' },
              { icon: '🌬️', type: 'High Pressure', psi: '1,000+ PSI', cooling: '15–25°F', cost: '$1,200–$6,000', pro: 'Flash evaporation, best cooling', con: 'Professional install required' },
            ].map(s => (
              <div key={s.type} style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
                <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{s.type}</div>
                <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 4 }}>{s.cooling} cooling</div>
                <div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 4 }}>{s.psi} · {s.cost}</div>
                <div style={{ fontSize: 12, marginBottom: 2, color: '#4ADE80′ }}>✓ {s.pro}</div>
                <div style={{ fontSize: 12, color: '#F87171′ }}>✗ {s.con}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: '1.5rem', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#F5E642′ }}>🔧 Installation & Winterization</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>Installation Tips</div>
              {['Nozzle spacing: 18–24 inches apart', 'Install under pergola/overhang for best coverage', 'Connect to standard ¾" hose bib', 'Run tubing before pergola finishing', 'Stainless brass nozzles outlast plastic'].map(t => <div key={t} style={{ color: '#94A3B8', fontSize: 13, marginBottom: 4 }}>• {t}</div>)}
            </div>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>DFW Winterization (Nov)</div>
              {['Blow out lines with compressor', 'Remove and store nozzles inside', 'Drain pump completely', 'DFW rarely freezes hard, but protect pump', 'Reconnect in March for spring use'].map(t => <div key={t} style={{ color: '#94A3B8', fontSize: 13, marginBottom: 4 }}>• {t}</div>)}
            </div>
          </div>
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: '1.5rem', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🔍 System Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6 }}>Patio Size</label>
              <select value={size} onChange={e => { setSize(e.target.value); setShowPlan(false); }} style={{ width: '100%', background: '#0A1628', border: '1px solid #2D3F5C', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 14 }}>
                <option value="small">Small (under 200 sq ft)</option>
                <option value="medium">Medium (200–500 sq ft)</option>
                <option value="large">Large (500+ sq ft)</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6 }}>Cooling Priority</label>
              <select value={cooling} onChange={e => { setCooling(e.target.value); setShowPlan(false); }} style={{ width: '100%', background: '#0A1628', border: '1px solid #2D3F5C', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 14 }}>
                <option value="light">Budget (some cooling, OK if slightly wet)</option>
                <option value="medium">Mid-range (good cooling, dry feeling)</option>
                <option value="high">Maximum (best possible, flash evaporation)</option>
              </select>
            </div>
          </div>
          <button onClick={() => setShowPlan(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
            Calculate My System 💧
          </button>
          {showPlan && plan && (
            <div style={{ marginTop: 20 }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', marginBottom: 12, borderLeft: '4px solid #F5E642′ }}>
                <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>Recommended: {plan.system}</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 8 }}>
                  {[{ label: 'Nozzles', val: plan.nozzles }, { label: 'Cost', val: plan.cost }, { label: 'Water/hr', val: plan.water }].map(m => (
                    <div key={m.label} style={{ background: '#162032', borderRadius: 6, padding: '0.5rem', textAlign: 'center' }}>
                      <div style={{ color: '#94A3B8', fontSize: 11 }}>{m.label}</div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{m.val}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: '#162032', borderRadius: 8, padding: '0.75rem 1rem', color: '#94A3B8', fontSize: 14 }}>💡 {plan.tip}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#162032', borderRadius: 10, padding: '1rem 1.5rem', textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>Need a misting system installed?</div>
          <div style={{ color: '#94A3B8', fontSize: 14 }}>ProLnk connects you with DFW outdoor living specialists who install and service misting systems.</div>
        </div>
      </div>
    </div>
  );
}
