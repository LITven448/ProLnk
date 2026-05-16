import { useState } from 'react';

const vintages = ['Pre-1960', '1960–1979', '1980–1999', '2000–2015', '2016–present'];
const submarkets = ['Dallas proper', 'Fort Worth / TCU area', 'Frisco / McKinney / Prosper', 'Plano / Richardson / Allen', 'Irving / Grand Prairie / Arlington', 'South DFW / Mansfield / Cedar Hill', 'East DFW / Garland / Mesquite', 'North DFW / Denton / Lewisville'];

function getPlan(vintage: string, submarket: string) {
  const clayRisk = submarket.includes('Frisco') || submarket.includes('Plano') || submarket.includes('Allen') ? 'High' : submarket.includes('South DFW') || submarket.includes('Fort Worth') ? 'Moderate-High' : 'Moderate';
  const slabType = vintage === 'Pre-1960' ? 'Conventional slab — no post-tension cables. Thinner, more vulnerable.' : vintage === '1960–1979' ? 'Early post-tension or conventional. Inspect cable condition if visible.' : 'Post-tension slab standard. Locate cables before any drilling.';
  const pierType = vintage === 'Pre-1960' || vintage === '1960–1979' ? 'Pressed concrete or steel piers. Older homes often need more piers due to less rigid slab.' : 'Pressed concrete piers standard. Helical if poor load strata detected.';
  const actions = [
    vintage === 'Pre-1960' ? 'Get foundation inspection every 2 years' : 'Annual foundation inspection recommended',
    'Install perimeter soaker hose if not present',
    'Maintain soil moisture within 18 inches of foundation year-round',
    'Document all cracks with photos and measurements',
    submarket.includes('Frisco') || submarket.includes('McKinney') ? 'Fast growth = shifting roads/infrastructure — check drainage annually' : 'Inspect gutters and drainage each spring',
    'Keep trees 15–25ft from foundation depending on species',
  ];
  const warrantyNote = 'Most DFW pier warranties are 10–25 years transferable. Get in writing before signing any repair contract.';
  const engineerNote = vintage === 'Pre-1960' ? 'Structural engineer review strongly recommended before any repair on a pre-1960 home.' : 'Engineer recommended for repairs exceeding 10 piers or any differential movement over 1 inch.';
  return { clayRisk, slabType, pierType, actions, warrantyNote, engineerNote };
}

export default function DFWFoundation2026Summary() {
  const [vintage, setVintage] = useState('');
  const [submarket, setSubmarket] = useState('');
  const result = vintage && submarket ? getPlan(vintage, submarket) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>DFW FOUNDATION GUIDE — 2026 EDITION</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Complete DFW Foundation Knowledge Summary</h1>
        <p style={{ color: '#94A3B8', fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
          Everything you need to know about DFW foundations in one place — clay behavior, watering, piers, warranties, and your personalized action plan.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
          {[['🌍', 'Clay Soil', 'DFW black clay expands 30–40% when wet, shrinks dramatically when dry'], ['💧', 'Watering', 'Consistent moisture year-round prevents 80% of DFW foundation movement'], ['🏗️', 'Piers', 'Pressed concrete piers standard; helical for soft strata or hillside sites']].map(([icon, title, desc]) => (
            <div key={String(title)} style={{ background: '#0D1F3C', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{icon}</div>
              <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 6 }}>{title}</div>
              <div style={{ color: '#94A3B8', fontSize: 12, lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📅 DFW Foundation Maintenance Calendar</h2>
          {[['January–February', 'Check for winter heave; doors/windows sticky = heave signal', '#60A5FA'], ['March–April', 'Start soaker hose schedule; inspect exterior cracks after freeze-thaw', '#34D399'], ['May–June', 'Increase watering as heat builds; inspect drainage before storm season', '#F5E642'], ['July–August', 'Daily watering critical — clay shrinkage peak; watch for new floor slopes', '#FB923C'], ['September–October', 'Taper watering; post-summer crack inspection; photograph any changes', '#F5E642'], ['November–December', 'Annual foundation inspection; check gutters; document pre-winter condition', '#60A5FA']].map(([mo, note, color]) => (
            <div key={mo} style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
              <div style={{ minWidth: 140, color: color, fontSize: 13, fontWeight: 700 }}>{mo}</div>
              <div style={{ color: '#CBD5E1', fontSize: 13, lineHeight: 1.6 }}>{note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🏠 Your Personalized Action Plan</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 12, display: 'block', marginBottom: 6 }}>HOME VINTAGE</label>
              <select value={vintage} onChange={e => setVintage(e.target.value)} style={{ width: '100%', background: '#1A2F50', color: '#E8EDF5', border: '1px solid #2D4A7A', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select vintage</option>
                {vintages.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 12, display: 'block', marginBottom: 6 }}>DFW SUBMARKET</label>
              <select value={submarket} onChange={e => setSubmarket(e.target.value)} style={{ width: '100%', background: '#1A2F50', color: '#E8EDF5', border: '1px solid #2D4A7A', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select submarket</option>
                {submarkets.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {result && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                  <div style={{ color: '#94A3B8', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>CLAY RISK LEVEL</div>
                  <div style={{ color: result.clayRisk === 'High' ? '#F87171' : '#FB923C', fontWeight: 700 }}>{result.clayRisk}</div>
                </div>
                <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                  <div style={{ color: '#94A3B8', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>SLAB TYPE</div>
                  <div style={{ color: '#CBD5E1', fontSize: 12 }}>{result.slabType}</div>
                </div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, marginBottom: 12 }}>
                <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, marginBottom: 10 }}>✅ YOUR 2026 ACTION PLAN</div>
                {result.actions.map((a, i) => <div key={i} style={{ color: '#CBD5E1', fontSize: 14, marginBottom: 8, display: 'flex', gap: 8 }}><span style={{ color: '#F5E642' }}>{i + 1}.</span>{a}</div>)}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                  <div style={{ color: '#F5E642', fontSize: 11, fontWeight: 700, marginBottom: 6 }}>🔒 WARRANTY NOTE</div>
                  <div style={{ color: '#94A3B8', fontSize: 12, lineHeight: 1.6 }}>{result.warrantyNote}</div>
                </div>
                <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                  <div style={{ color: '#F5E642', fontSize: 11, fontWeight: 700, marginBottom: 6 }}>👷 ENGINEER NOTE</div>
                  <div style={{ color: '#94A3B8', fontSize: 12, lineHeight: 1.6 }}>{result.engineerNote}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 15, marginBottom: 10 }}>🔑 Engineer vs. Company — When to Call Who</h2>
          {[['Foundation company', 'Quote for repairs, pier installation, lifting — they do the work'], ['Structural engineer', 'Diagnosis, second opinion, large repairs, additions, litigation support'], ['Both', 'Best practice: engineer diagnoses, company executes, engineer confirms']].map(([who, role]) => (
            <div key={who} style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
              <div style={{ minWidth: 130, color: '#F5E642', fontSize: 13, fontWeight: 700 }}>{who}</div>
              <div style={{ color: '#CBD5E1', fontSize: 13 }}>{role}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
