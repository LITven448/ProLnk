import { useState } from 'react';

const homeAges = ['Built after 2015', 'Built 2000–2015', 'Built 1985–2000', 'Built before 1985'];
const budgets = ['Under $5,000', '$5,000–$15,000', '$15,000–$50,000', '$50,000+'];
const timelines = ['1–2 years', '3–5 years', '5–10 years', '10+ years'];

const plans: Record<string, { items: string[]; roi: string }> = {
  'Under $5,000': { items: ['Install a 240V outlet and conduit rough-in for future EV charger ($800–$1,500)', 'Add smart thermostat with zoning capability for future HVAC upgrade', 'Run ethernet and low-voltage conduit to attic for future smart home wiring', 'Install a whole-home surge protector — DFW lightning storms are frequent'], roi: 'Low upfront, high future leverage — each item creates upgrade optionality for $5–20 later.' },
  '$5,000–$15,000': { items: ['Install Level 2 EV charger with dedicated 50A circuit — DFW EV adoption accelerating fast', 'Add attic spray foam insulation — DFW summer utility bills average $300–$600/mo', 'Install solar conduit, panel, and meter-ready infrastructure for future solar', 'Upgrade electrical panel to 200A+ if currently 150A or less'], roi: 'These upgrades reduce DFW utility costs immediately and future-proof for next owner premium.' },
  '$15,000–$50,000': { items: ['Install rooftop solar (8–12kW system) — DFW averages 225+ sunny days/year, 6.5 peak hours', 'Add a home battery backup system (Powerwall) — ERCOT grid failures are a real DFW risk', 'Complete aging-in-place retrofits: wider doors, walk-in shower, first-floor bedroom', 'Install whole-home water filtration and softening system for DFW hard water'], roi: 'Solar breaks even in 6–9 years in DFW. Battery storage adds insurance against ERCOT outages.' },
  '$50,000+': { items: ['Full solar + battery system with EV integration and smart home hub', 'Add a pool with energy-efficient equipment (DFW pool adds $30–$60K to resale value)', 'Build an ADU or casita for aging-in-place or rental income flexibility', 'Whole-home smart automation: lighting, security, HVAC, irrigation tied to single system'], roi: 'Comprehensive upgrade suite positions home for maximum appeal in 10+ year DFW market evolution.' },
};

export default function DFWHomeForFuture() {
  const [homeAge, setHomeAge] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const result = submitted && budget ? plans[budget] : null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🔮</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>Future-Proofing Your DFW Home</h1>
        <p style={{ color: '#9AABB8', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
          The decisions you make in your DFW home today echo for the next decade. EV adoption, solar, ERCOT grid fragility, rising utility costs, and aging-in-place planning all have DFW-specific angles worth understanding now.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {[{ label: '⚡ EV Infrastructure', value: 'DFW EV registrations doubled in 2024. A 50A outlet today costs $800. In 5 years, it\’s table stakes.' }, { label: '☀️ Solar Opportunity', value: 'DFW gets 225+ sunny days/year. A 10kW system generates $1,800–$2,400 in annual savings.' }, { label: '🔋 Grid Risk', value: 'ERCOT failed in Feb 2021 and again in 2023. Home battery backup is now an ROI conversation.' }, { label: '🏠 Aging in Place', value: 'DFW boomers are staying put — wider doors, first-floor masters, and walk-in showers are smart now.' }].map(card => (
            <div key={card.label} style={{ backgroundColor: '#0F2137', borderRadius: 10, padding: 16, border: '1px solid #1C3352' }}>
              <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: 6 }}>{card.label}</div>
              <div style={{ fontSize: 13, color: '#9AABB8', lineHeight: 1.5 }}>{card.value}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0F2137', borderRadius: 12, padding: 24, border: '1px solid #1C3352', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#F5E642', marginBottom: 20 }}>📅 Get Your Future-Proofing Priority List</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#9AABB8', marginBottom: 6 }}>Home Age</label>
            <select value={homeAge} onChange={e => setHomeAge(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1C3352', borderRadius: 8, color: '#E8EDF5', fontSize: 14 }}>
              <option value="">Select age...</option>
              {homeAges.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#9AABB8', marginBottom: 6 }}>Investment Budget</label>
            <select value={budget} onChange={e => setBudget(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1C3352', borderRadius: 8, color: '#E8EDF5', fontSize: 14 }}>
              <option value="">Select budget...</option>
              {budgets.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#9AABB8', marginBottom: 6 }}>Planning Timeline</label>
            <select value={timeline} onChange={e => setTimeline(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1C3352', borderRadius: 8, color: '#E8EDF5', fontSize: 14 }}>
              <option value="">Select timeline...</option>
              {timelines.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <button onClick={() => setSubmitted(true)} disabled={!homeAge || !budget || !timeline} style={{ width: '100%', padding: '12px', backgroundColor: homeAge && budget && timeline ? '#F5E642' : '#1C3352', color: homeAge && budget && timeline ? '#0A1628' : '#4A6278', fontWeight: 700, border: 'none', borderRadius: 8, cursor: homeAge && budget && timeline ? 'pointer' : 'not-allowed', fontSize: 15 }}>
            Generate My Future-Proofing Plan
          </button>
        </div>

        {result && (
          <div style={{ backgroundColor: '#0F2137', borderRadius: 12, padding: 24, border: '1px solid #F5E642' }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>✅ Your Future-Proofing Priority List ({budget} · {timeline})</h3>
            {result.items.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', backgroundColor: '#F5E642', color: '#0A1628', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                <div style={{ fontSize: 14, color: '#E8EDF5', lineHeight: 1.5 }}>{item}</div>
              </div>
            ))}
            <div style={{ marginTop: 16, padding: '12px 16px', backgroundColor: '#0A1628', borderRadius: 8, fontSize: 13, color: '#9AABB8', lineHeight: 1.5 }}>
              📈 <strong style={{ color: '#F5E642' }}>ROI Context:</strong> {result.roi}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
