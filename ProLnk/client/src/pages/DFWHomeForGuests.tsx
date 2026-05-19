import { useState } from 'react';

const homeSizes = ['1 Bedroom / Condo', '2–3 Bedrooms', '4+ Bedrooms', 'Guest House / ADU'];
const guestFrequencies = ['Rarely (1–2x/year)', 'Occasionally (3–5x/year)', 'Frequently (6+/year)', 'Extended Stays (weeks)'];

const plans: Record<string, { steps: string[]; cost: string }> = {
  'Rarely (1–2x/year)': { steps: ['Invest in one quality air mattress + frame for flex use', 'Stock a "guest basket": toiletries, phone chargers, local snacks', 'Brief guests on DFW weather — out-of-state visitors are often shocked by summer heat', 'Add a small fan/white noise machine for guest sleeping comfort'], cost: '$150–$600′ },
  'Occasionally (3–5x/year)': { steps: ['Dedicate one bathroom as the "guest bathroom" with fresh towels stored inside', 'Install a keypad lock so guests can self-check-in', 'Create a simple one-page DFW guide: weather, things to do, driving tips', 'Add blackout curtains in guest room — DFW sun rises early and is intense'], cost: '$400–$1,800′ },
  'Frequently (6+/year)': { steps: ['Upgrade to a proper guest bedroom with quality mattress and bedding', 'Add a mini fridge and coffee station in guest room for independence', 'Install a split HVAC or smart thermostat zone for guest room comfort', 'Stock a welcome basket with DFW must-haves: sunscreen, bug spray, local restaurant list'], cost: '$1,200–$5,000′ },
  'Extended Stays (weeks)': { steps: ['Add a dedicated guest suite with private bath if space allows', 'Provide parking pass or designated driveway space — DFW suburban parking is tricky', 'Install a smart TV with streaming accounts for longer stays', 'Create shared storage space and closet area for extended guest luggage'], cost: '$2,500–$15,000′ },
};

export default function DFWHomeForGuests() {
  const [homeSize, setHomeSize] = useState('');
  const [frequency, setFrequency] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const result = submitted && frequency ? plans[frequency] : null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8F9FA', color: '#1A2332', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🛎️</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#0A1628', marginBottom: 8 }}>DFW Guest-Ready Home Guide</h1>
        <p style={{ color: '#5A6878', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
          DFW hospitality runs deep — but preparing for overnight guests requires more than fresh towels. Out-of-state visitors are often blindsided by DFW heat, suburban distances, and driving culture. Here's how to be a great DFW host.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {[{ label: '🌡️ The Weather Shock', value: 'Out-of-state guests arriving in June–September will be unprepared for 100°F heat. Brief them ahead of time.' }, { label: '🚗 Driving Culture', value: 'DFW is not walkable. Guests need a car or a ride plan — walking is not a realistic option.' }, { label: '🛏️ Guest Room Basics', value: 'Blackout curtains and a good mattress matter — DFW sun starts early and summers are long.' }, { label: '🧺 The Welcome Basket', value: 'Sunscreen, bug spray, a restaurant list, and a charging cable kit go a long way in DFW.' }].map(card => (
            <div key={card.label} style={{ backgroundColor: '#FFFFFF', borderRadius: 10, padding: 16, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              <div style={{ fontWeight: 600, color: '#0A1628', marginBottom: 6 }}>{card.label}</div>
              <div style={{ fontSize: 13, color: '#5A6878', lineHeight: 1.5 }}>{card.value}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 24, border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#0A1628', marginBottom: 20 }}>🏠 Get Your Guest Experience Plan</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#5A6878', marginBottom: 6 }}>Home Size</label>
            <select value={homeSize} onChange={e => setHomeSize(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#F8F9FA', border: '1px solid #E2E8F0', borderRadius: 8, color: '#1A2332', fontSize: 14 }}>
              <option value="">Select size...</option>
              {homeSizes.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#5A6878', marginBottom: 6 }}>How Often Do You Host Overnight Guests?</label>
            <select value={frequency} onChange={e => setFrequency(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#F8F9FA', border: '1px solid #E2E8F0', borderRadius: 8, color: '#1A2332', fontSize: 14 }}>
              <option value="">Select frequency...</option>
              {guestFrequencies.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <button onClick={() => setSubmitted(true)} disabled={!homeSize || !frequency} style={{ width: '100%', padding: '12px', backgroundColor: homeSize && frequency ? '#0A1628′ : '#E2E8F0', color: homeSize && frequency ? '#F5E642' : '#9AABB8', fontWeight: 700, border: ’none', borderRadius: 8, cursor: homeSize && frequency ? 'pointer' : 'not-allowed', fontSize: 15 }}>
            Generate My Guest Plan
          </button>
        </div>

        {result && (
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 24, border: '2px solid #0A1628', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0A1628', marginBottom: 16 }}>✅ Your Guest Experience Plan ({frequency})</h3>
            {result.steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', backgroundColor: '#0A1628', color: '#F5E642', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                <div style={{ fontSize: 14, color: '#1A2332', lineHeight: 1.5 }}>{step}</div>
              </div>
            ))}
            <div style={{ marginTop: 16, padding: '12px 16px', backgroundColor: '#F8F9FA', borderRadius: 8, fontSize: 14 }}>
              <span style={{ color: '#5A6878′ }}>Estimated Investment: </span>
              <span style={{ color: '#0A1628', fontWeight: 700 }}>{result.cost}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
