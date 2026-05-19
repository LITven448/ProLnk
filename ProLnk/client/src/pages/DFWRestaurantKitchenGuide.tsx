import { useState } from 'react';

const GREASE_MAP: Record<string, Record<string, { greaseTrap: string; hoodCFM: string; checklist: string[] }>> = {
  fastfood: {
    small: { greaseTrap: '750-gallon interceptor (min DFW code)', hoodCFM: '1,200–1,800 CFM', checklist: ['3-compartment sink required','Hot water heater 140°F min','Floor drains under all equipment','Grease trap pumped every 30–90 days','Type I hood over fryers and griddles'] },
    medium: { greaseTrap: '1,500-gallon interceptor', hoodCFM: '2,000–3,000 CFM', checklist: ['Commercial dishwasher booster heater','Floor sink at prep areas','Grease interceptor pumped monthly','Separate mop sink required','Ansul system annually inspected'] },
    large: { greaseTrap: '3,000-gallon exterior interceptor', hoodCFM: '4,000–6,000 CFM', checklist: ['Multiple grease zones may require separate traps','24-hour health dept inspection readiness','Backflow preventer on water main','Monthly hood cleaning required','Fire suppression semi-annual service'] },
  },
  sitdown: {
    small: { greaseTrap: '1,000-gallon interceptor', hoodCFM: '1,500–2,500 CFM', checklist: ['Grease trap within 5 ft of cooking equipment','Hot water circulator for dishwashing','Prep sink with air gap','Semi-annual grease trap service','Type II hood over warmers'] },
    medium: { greaseTrap: '2,000-gallon interceptor', hoodCFM: '3,000–4,500 CFM', checklist: ['Pass-through dishwasher water treatment','Commercial ice machine drain to floor sink','Monthly Ansul inspection log','Grease trap pumped per service report','Makeup air unit balanced to hood'] },
    large: { greaseTrap: '5,000-gallon exterior interceptor', hoodCFM: '6,000–9,000 CFM', checklist: ['Engineering stamp required on hood design','Daily grease filter cleaning','Quarterly city inspection readiness','Separate hand-wash sinks at each station','Monthly fire suppression check'] },
  },
  bakery: {
    small: { greaseTrap: '500-gallon interceptor', hoodCFM: '800–1,200 CFM', checklist: ['Oven hood may be Type II only','Grease trap quarterly service','3-compartment sink required','Floor drains at all wet zones','Ansul if open flame'] },
    medium: { greaseTrap: '1,000-gallon interceptor', hoodCFM: '1,500–2,500 CFM', checklist: ['Proofer drain to floor sink','Walk-in cooler/freezer drain line','Semi-annual grease trap','Commercial dishwasher required','Ventilation balanced for oven heat'] },
    large: { greaseTrap: '2,000-gallon interceptor', hoodCFM: '3,000–5,000 CFM', checklist: ['Separate production vs retail plumbing zones','Monthly maintenance contract','Engineering-stamped plans for permit','Grease interceptor monthly service','Backflow preventer required'] },
  },
};

const sizeLabel: Record<string, string> = { small: 'Under 1,500 sq ft', medium: '1,500–4,000 sq ft', large: 'Over 4,000 sq ft' };

export default function DFWRestaurantKitchenGuide() {
  const [cuisine, setCuisine] = useState('');
  const [size, setSize] = useState('');
  const [result, setResult] = useState<{ greaseTrap: string; hoodCFM: string; checklist: string[] } | null>(null);

  function calculate() {
    if (!cuisine || !size) return;
    const rec = GREASE_MAP[cuisine]?.[size];
    setResult(rec || null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>🍳 DFW Restaurant Kitchen Guide</div>
        <h1 style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.15, marginBottom: 12 }}>Restaurant Plumbing & Kitchen <span style={{ color: '#F5E642′ }}>Compliance in DFW</span></h1>
        <p style={{ color: '#94A3B8', fontSize: 17, marginBottom: 36 }}>Every food service location in DFW cities requires grease interceptors by ordinance. Failing a health inspection costs more than installing it right the first time.</p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, border: '1px solid #F5E642', marginBottom: 32 }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>⚠️ DFW Grease Trap Law</div>
          <p style={{ color: '#94A3B8', lineHeight: 1.7, margin: 0 }}>All DFW municipalities — Dallas, Fort Worth, Plano, Irving, Arlington, Frisco, and others — require grease interceptors for food service establishments. Size is determined by fixture count and peak flow rate. Unpermitted grease traps result in business closure. ProLnk connects you with licensed plumbers who specialize in commercial food service installations and know each city's requirements.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginBottom: 40 }}>
          {[
            { icon: '🚰', title: 'Grease Interceptors', body: 'Required in DFW for all commercial kitchens. Size (gallons) based on sink count + dishwasher flow rate. City inspection required before opening.' },
            { icon: '💨', title: 'Hood Suppression Systems', body: 'Type I hoods required over grills, fryers, ranges. Ansul fire suppression systems must be serviced semi-annually and tagged. City inspectors check these first.' },
            { icon: '🍽️', title: 'Commercial Dishwashers', body: 'High-temp dishwashers require booster heaters. Low-temp units use chemical sanitizers. Water usage: 1–3 gallons per rack. Floor sink drain required.' },
            { icon: '🌡️', title: 'Health Dept Expectations', body: 'Dallas/FW health inspectors check: handwash sinks at each station, hot water temps, 3-compartment sink setup, floor drains, and grease trap service records.' },
            { icon: '🔩', title: 'Backflow Prevention', body: 'Required on all commercial water service connections in DFW. Annual testing by licensed plumber mandatory. Failure closes water service.' },
            { icon: '📋', title: 'Permitting', body: 'New kitchens and renovations require plumbing permits, health dept pre-approval, and fire marshal sign-off. ProLnk pros handle all three agencies.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#111E35', borderRadius: 12, padding: 24, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{card.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, color: '#F5E642′ }}>{card.title}</div>
              <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6 }}>{card.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 16, padding: 32, border: '1px solid #F5E642', marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, color: '#F5E642′ }}>🧮 Kitchen Compliance Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>Restaurant Type</label>
              <select value={cuisine} onChange={e => setCuisine(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EDF5', fontSize: 15 }}>
                <option value="">Select type...</option>
                <option value="fastfood">Fast Food / QSR</option>
                <option value="sitdown">Full-Service / Sit-Down</option>
                <option value="bakery">Bakery / Café</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>Kitchen Size</label>
              <select value={size} onChange={e => setSize(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EDF5', fontSize: 15 }}>
                <option value="">Select size...</option>
                <option value="small">Small (under 1,500 sq ft)</option>
                <option value="medium">Medium (1,500–4,000 sq ft)</option>
                <option value="large">Large (over 4,000 sq ft)</option>
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Generate Checklist →</button>
          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 12, padding: 24, border: '1px solid #2A4A7F' }}>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 17, marginBottom: 16 }}>Requirements: {sizeLabel[size]}</div>
              <div style={{ display: 'grid', gap: 12, marginBottom: 20 }}>
                <div><span style={{ color: '#94A3B8', fontSize: 13 }}>GREASE TRAP SIZE</span><div style={{ color: '#E8EDF5', marginTop: 4 }}>{result.greaseTrap}</div></div>
                <div><span style={{ color: '#94A3B8', fontSize: 13 }}>HOOD EXHAUST CFM</span><div style={{ color: '#E8EDF5', marginTop: 4 }}>{result.hoodCFM}</div></div>
              </div>
              <div><span style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 10 }}>PLUMBING INSPECTION CHECKLIST</span>
                {result.checklist.map((item, i) => <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}><span style={{ color: '#F5E642′ }}>✓</span><span style={{ color: '#E8EDF5', fontSize: 14 }}>{item}</span></div>)}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#111E35', borderRadius: 16, padding: 28, border: '1px solid #1E3A5F', textAlign: 'center' }}>
          <div style={{ fontSize: 26, marginBottom: 12 }}>🍳</div>
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Get Licensed Restaurant Plumbers</h3>
          <p style={{ color: '#94A3B8', marginBottom: 20 }}>ProLnk matches DFW restaurant owners with commercial plumbers who know food service code. Get competitive bids fast.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 32px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Find Kitchen Plumbers →</button>
        </div>
      </div>
    </div>
  );
}
