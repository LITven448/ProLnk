import { useState } from 'react';

const homeSizes = ['Under 1,500 sqft', '1,500–2,500 sqft', '2,500–4,000 sqft', '4,000+ sqft'];
const workStyles = ['Deep Focus / Solo', 'Video Calls Heavy', 'Creative / Mixed', 'Hybrid / Office Part-Time'];

const plans: Record<string, { steps: string[]; cost: string }> = {
  'Deep Focus / Solo': { steps: ['Dedicate a separate room — DFW homes average 2,500+ sqft, space exists', 'Add solid-core door to minimize open-floor-plan noise bleed', 'Install blackout shades — DFW sun causes monitor glare year-round', 'Program thermostat for 68–70°F during work hours for peak focus'], cost: '$400–$2,800' },
  'Video Calls Heavy': { steps: ['Install ring light + acoustic panels behind you — DFW open plans echo badly', 'Run dedicated ethernet drop to office (avoid WiFi drops during calls)', 'Add window film to south/west-facing windows — DFW sun blows out camera exposure', 'Upgrade HVAC zoning so fan noise doesn\’t bleed into calls'], cost: '$600–$3,500' },
  'Creative / Mixed': { steps: ['Build L-shaped desk station with dual monitor arms', 'Install 3500K lighting (neutral white) — better for creative work than warm DFW lamps', 'Add whiteboard wall with magnetic primer for brainstorming', 'Soundproof shared wall if adjacent to family room'], cost: '$800–$4,000' },
  'Hybrid / Office Part-Time': { steps: ['Create a clean, packable desk setup for video calls on home days', 'Install a lockable cabinet for work equipment security', 'Add a standing desk converter — DFW commute days mean more sitting total', 'Program smart thermostat for home-office days vs. commute days'], cost: '$300–$1,800' },
};

export default function DFWProductivityHomeGuide() {
  const [homeSize, setHomeSize] = useState('');
  const [workStyle, setWorkStyle] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const result = submitted && workStyle ? plans[workStyle] : null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>💼</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>DFW Productivity Home Guide</h1>
        <p style={{ color: '#9AABB8', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
          DFW homes are large but often designed for entertaining, not working. Open floor plans, south-facing windows, and HVAC noise are real productivity killers. Here's how to fix them.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {[{ label: '🏠 Space Advantage', value: 'DFW homes average 2,500 sqft — most have room for a dedicated office.' }, { label: '🔊 Acoustic Problem', value: 'Open floor plans and tile floors create echo chambers that wreck focus.' }, { label: '☀️ Glare Issue', value: 'South/west windows create year-round monitor glare and camera overexposure.' }, { label: '🌡️ Temperature Control', value: 'DFW HVAC runs hard — fan noise and temp swings interrupt deep work.' }].map(card => (
            <div key={card.label} style={{ backgroundColor: '#0F2137', borderRadius: 10, padding: 16, border: '1px solid #1C3352' }}>
              <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: 6 }}>{card.label}</div>
              <div style={{ fontSize: 13, color: '#9AABB8', lineHeight: 1.5 }}>{card.value}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0F2137', borderRadius: 12, padding: 24, border: '1px solid #1C3352', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#F5E642', marginBottom: 20 }}>🖥️ Get Your Productivity Optimization Plan</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#9AABB8', marginBottom: 6 }}>Home Size</label>
            <select value={homeSize} onChange={e => setHomeSize(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1C3352', borderRadius: 8, color: '#E8EDF5', fontSize: 14 }}>
              <option value="">Select size...</option>
              {homeSizes.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#9AABB8', marginBottom: 6 }}>Work Style</label>
            <select value={workStyle} onChange={e => setWorkStyle(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1C3352', borderRadius: 8, color: '#E8EDF5', fontSize: 14 }}>
              <option value="">Select work style...</option>
              {workStyles.map(w => <option key={w} value={w}>{w}</option>)}
            </select>
          </div>
          <button onClick={() => setSubmitted(true)} disabled={!homeSize || !workStyle} style={{ width: '100%', padding: '12px', backgroundColor: homeSize && workStyle ? '#F5E642' : '#1C3352', color: homeSize && workStyle ? '#0A1628' : '#4A6278', fontWeight: 700, border: 'none', borderRadius: 8, cursor: homeSize && workStyle ? 'pointer' : 'not-allowed', fontSize: 15 }}>
            Generate My Plan
          </button>
        </div>

        {result && (
          <div style={{ backgroundColor: '#0F2137', borderRadius: 12, padding: 24, border: '1px solid #F5E642' }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>✅ Your {workStyle} Optimization Plan ({homeSize})</h3>
            {result.steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', backgroundColor: '#F5E642', color: '#0A1628', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                <div style={{ fontSize: 14, color: '#E8EDF5', lineHeight: 1.5 }}>{step}</div>
              </div>
            ))}
            <div style={{ marginTop: 16, padding: '12px 16px', backgroundColor: '#0A1628', borderRadius: 8, fontSize: 14 }}>
              <span style={{ color: '#9AABB8' }}>Estimated Investment: </span>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>{result.cost}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
