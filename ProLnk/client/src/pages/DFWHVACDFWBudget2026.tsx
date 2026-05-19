import { useState } from 'react';

const homeTypes = ['Under 1,500 sq ft', '1,500–2,500 sq ft', '2,500–4,000 sq ft', 'Over 4,000 sq ft'];
const systemAges = ['0–5 years', '6–10 years', '11–15 years', '15+ years'];

const budgets: Record<string, Record<string, { low: number; high: number; notes: string[] }>> = {
  'Under 1,500 sq ft': {
    '0–5 years': { low: 250, high: 450, notes: ['Annual tune-up: $120–$180', 'Filter replacements: $60–$80/yr', 'Minor repair buffer: $70–$190'] },
    '6–10 years': { low: 400, high: 700, notes: ['Tune-up: $150–$200', 'Capacitor/contactor risk: $150–$300', 'Filter + maintenance: $100–$200'] },
    '11–15 years': { low: 600, high: 1800, notes: ['Higher repair probability: $300–$1,400', 'Begin replacement savings fund: $200–$400/yr', 'Tune-up + filters: $100–$200'] },
    '15+ years': { low: 800, high: 5500, notes: ['Major component failure likely: $500–$2,500', 'Replacement planning: budget $4,000–$7,000 total', 'Strongly consider replacing before summer 2026'] },
  },
  '1,500–2,500 sq ft': {
    '0–5 years': { low: 300, high: 550, notes: ['Tune-up: $150–$200', 'Filters (2 zones possible): $80–$150', 'Minor repairs buffer: $70–$200'] },
    '6–10 years': { low: 500, high: 900, notes: ['Dual-system risk (if 2 units): doubles exposure', 'Tune-up: $200–$300', 'Part failure buffer: $200–$400'] },
    '11–15 years': { low: 700, high: 2500, notes: ['Compressor risk at 12–15 yrs: $800–$2,000', 'Replacement savings: $300–$500/yr', 'Proactive replacement quote recommended'] },
    '15+ years': { low: 1200, high: 8000, notes: ['Replacement likely: $7,000–$12,000 for mid-range system', 'Emergency repair = wasted money if system >15 yrs', 'Act in spring for best pricing'] },
  },
  '2,500–4,000 sq ft': {
    '0–5 years': { low: 400, high: 700, notes: ['Multi-zone tune-ups: $200–$350', 'Filter program: $100–$200', 'Standard buffer: $100–$150'] },
    '6–10 years': { low: 700, high: 1400, notes: ['2-system maintenance: $300–$500', 'Component repair buffer: $300–$700', 'Consider extended warranty'] },
    '11–15 years': { low: 1000, high: 4000, notes: ['Dual-system replacement exposure: $14,000–$20,000 total', 'Annual savings fund: $500–$800', 'At least one system likely needs replacement by 2027'] },
    '15+ years': { low: 1500, high: 12000, notes: ['Expect $1,000–$3,000/yr in repairs if keeping old systems', 'Replacement per system: $7,000–$10,000', 'Tax credit eligible for heat pump upgrade (up to $2,000)'] },
  },
  'Over 4,000 sq ft': {
    '0–5 years': { low: 600, high: 1000, notes: ['3+ zone tune-ups: $350–$500', 'Premium filter program: $150–$300', 'Smart thermostat calibration: $100–$200'] },
    '6–10 years': { low: 1000, high: 2000, notes: ['Multi-system maintenance: $500–$800', 'Part failure buffer per system: $300–$600', 'HVAC audit recommended at year 8'] },
    '11–15 years': { low: 1500, high: 6000, notes: ['Multiple systems near end-of-life', 'Staged replacement budget: $20,000–$35,000 total', 'Annual replacement savings fund: $1,000–$2,000'] },
    '15+ years': { low: 2500, high: 20000, notes: ['Full replacement highly likely: $20,000–$40,000', 'Emergency failures during peak summer are costly + uncomfortable', 'Get multiple quotes now via ProLnk'] },
  },
};

export default function DFWHVACDFWBudget2026() {
  const [homeType, setHomeType] = useState(homeTypes[1]);
  const [age, setAge] = useState(systemAges[1]);
  const rec = budgets[homeType]?.[age];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 13, color: '#F5E642', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>DFW HVAC 2026</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 16px' }}>How Much to Budget for HVAC in 2026</h1>
          <p style={{ color: '#94A3B8', fontSize: 16, maxWidth: 580, margin: '0 auto' }}>Select your home size and system age for a personalized 2026 budget recommendation.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 36 }}>
          <div style={{ backgroundColor: '#0F2340', borderRadius: 12, padding: 24 }}>
            <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, textTransform: 'uppercase', marginBottom: 14 }}>🏠 Home Size</div>
            {homeTypes.map(h => (
              <button key={h} onClick={() => setHomeType(h)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 14px', marginBottom: 8, borderRadius: 8, border: '2px solid', borderColor: homeType === h ? '#F5E642' : '#1E3A5F', backgroundColor: homeType === h ? '#F5E642' : '#0A1628', color: homeType === h ? '#0A1628' : '#CBD5E1', fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>{h}</button>
            ))}
          </div>
          <div style={{ backgroundColor: '#0F2340', borderRadius: 12, padding: 24 }}>
            <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, textTransform: 'uppercase', marginBottom: 14 }}>⏰ System Age</div>
            {systemAges.map(a => (
              <button key={a} onClick={() => setAge(a)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 14px', marginBottom: 8, borderRadius: 8, border: '2px solid', borderColor: age === a ? '#F5E642' : '#1E3A5F', backgroundColor: age === a ? '#F5E642' : '#0A1628', color: age === a ? '#0A1628' : '#CBD5E1', fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>{a}</button>
            ))}
          </div>
        </div>

        {rec && (
          <div style={{ backgroundColor: '#0F2340', borderRadius: 16, padding: 36, border: '1px solid #1E3A5F' }}>
            <div style={{ fontSize: 13, color: '#94A3B8', textTransform: 'uppercase', marginBottom: 10 }}>2026 HVAC Budget Recommendation</div>
            <div style={{ fontSize: 42, fontWeight: 800, color: '#F5E642', marginBottom: 6 }}>${rec.low.toLocaleString()} – ${rec.high.toLocaleString()}</div>
            <div style={{ color: '#94A3B8', marginBottom: 24 }}>Estimated annual HVAC spend for {homeType} home with {age} system</div>
            {rec.notes.map((n, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                <span style={{ color: '#F5E642' }}>→</span>
                <span style={{ color: '#CBD5E1', fontSize: 15 }}>{n}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 40, textAlign: 'center', backgroundColor: '#0F2340', borderRadius: 12, padding: 28, border: '1px solid #F5E642' }}>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>Get a Real Quote Before You Budget</div>
          <p style={{ color: '#94A3B8', marginBottom: 20 }}>ProLnk matches you with vetted DFW HVAC pros for transparent, competitive pricing.</p>
          <a href="https://prolnk.io" style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '14px 32px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 16 }}>Get My Free Quote Match</a>
        </div>
      </div>
    </div>
  );
}
