import { useState } from 'react';

const homeSizes = ['Under 2,000 sqft', '2,000–3,500 sqft', '3,500–5,000 sqft', '5,000+ sqft'];
const guestCounts = ['Under 15', '15–30', '30–60', '60+'];
const hostingStyles = ['Casual / Relaxed', 'Traditional Sit-Down', 'Outdoor / Patio Focused', 'Large Buffet Style'];

const checklists: Record<string, string[]> = {
  'Casual / Relaxed': ['Deep-clean kitchen 3 days out — DFW dust accumulates fast', 'Set up bar cart in living room for easy self-serve drinks', 'Create a parking plan — suburban DFW homes may have 4+ cars', 'Open windows for pre-event airing (if November — DFW weather is perfect)'],
  'Traditional Sit-Down': ['Rent folding tables and chairs — seats 12+ at your dining footprint', 'Map kitchen workflow: oven timing, warming drawer use, counter space', 'Set a formal tablescape 2 days before to avoid day-of stress', 'Assign a coat/bag zone — DFW November means light jackets only'],
  'Outdoor / Patio Focused': ['DFW November–December outdoor temps average 50–65°F — ideal for patio hosting', 'Rent outdoor heaters for evenings (temps drop to 40s by 8pm)', 'String lights + citronella candles — mosquitoes linger into November', 'Set up a covered area in case of rare DFW cold front'],
  'Large Buffet Style': ['Plan serving stations to avoid kitchen choke points', 'Rent chafing dishes for hot items — keeps food at temp for 2+ hours', 'Create a designated kid food area — DFW families run large', 'Pre-label dishes with ingredients for allergy transparency'],
};

export default function DFWHolidayHomeGuide() {
  const [homeSize, setHomeSize] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [hostingStyle, setHostingStyle] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const checklist = submitted && hostingStyle ? checklists[hostingStyle] : null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8F9FA', color: '#1A2332', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🦃</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#0A1628', marginBottom: 8 }}>DFW Holiday Home Hosting Guide</h1>
        <p style={{ color: '#5A6878', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
          Thanksgiving and Christmas are serious events in DFW culture — big families, big tables, and big kitchens. The good news: November and December in DFW are perfect for outdoor entertaining. Here's how to host well.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {[{ label: '🌤️ Perfect Weather Window', value: 'Nov–Dec DFW averages 55–68°F daytime — outdoor space is your secret weapon for large gatherings.' }, { label: '🍽️ Texas Meals Run Big', value: 'DFW holiday spreads often feed 20–40 people. Kitchen capacity planning is essential.' }, { label: '🚗 Parking Is Real', value: 'Suburban DFW driveways fill fast. Plan street parking, neighbor coordination, or shuttle spots.' }, { label: '❄️ Cold Front Watch', value: 'A Texas blue norther can drop temps 30°F in an hour. Always have an indoor backup plan.' }].map(card => (
            <div key={card.label} style={{ backgroundColor: '#FFFFFF', borderRadius: 10, padding: 16, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              <div style={{ fontWeight: 600, color: '#0A1628', marginBottom: 6 }}>{card.label}</div>
              <div style={{ fontSize: 13, color: '#5A6878', lineHeight: 1.5 }}>{card.value}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 24, border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#0A1628', marginBottom: 20 }}>🎄 Build Your Holiday Hosting Checklist</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#5A6878', marginBottom: 6 }}>Home Size</label>
            <select value={homeSize} onChange={e => setHomeSize(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#F8F9FA', border: '1px solid #E2E8F0', borderRadius: 8, color: '#1A2332', fontSize: 14 }}>
              <option value="">Select size...</option>
              {homeSizes.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#5A6878', marginBottom: 6 }}>Expected Guest Count</label>
            <select value={guestCount} onChange={e => setGuestCount(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#F8F9FA', border: '1px solid #E2E8F0', borderRadius: 8, color: '#1A2332', fontSize: 14 }}>
              <option value="">Select count...</option>
              {guestCounts.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#5A6878', marginBottom: 6 }}>Hosting Style</label>
            <select value={hostingStyle} onChange={e => setHostingStyle(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#F8F9FA', border: '1px solid #E2E8F0', borderRadius: 8, color: '#1A2332', fontSize: 14 }}>
              <option value="">Select style...</option>
              {hostingStyles.map(h => <option key={h} value={h}>{h}</option>)}
            </select>
          </div>
          <button onClick={() => setSubmitted(true)} disabled={!homeSize || !guestCount || !hostingStyle} style={{ width: '100%', padding: '12px', backgroundColor: homeSize && guestCount && hostingStyle ? '#0A1628' : '#E2E8F0', color: homeSize && guestCount && hostingStyle ? '#F5E642' : '#9AABB8', fontWeight: 700, border: 'none', borderRadius: 8, cursor: homeSize && guestCount && hostingStyle ? 'pointer' : 'not-allowed', fontSize: 15 }}>
            Generate My Hosting Checklist
          </button>
        </div>

        {checklist && (
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 24, border: '2px solid #0A1628', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0A1628', marginBottom: 16 }}>✅ Your {hostingStyle} Hosting Checklist ({guestCount} guests)</h3>
            {checklist.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', backgroundColor: '#0A1628', color: '#F5E642', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                <div style={{ fontSize: 14, color: '#1A2332', lineHeight: 1.5 }}>{item}</div>
              </div>
            ))}
            <div style={{ marginTop: 16, padding: '12px 16px', backgroundColor: '#FFF8DC', borderRadius: 8, fontSize: 13, color: '#5A6878', lineHeight: 1.5 }}>
              💡 <strong>DFW Pro Tip:</strong> Check the 10-day forecast before finalizing indoor vs. outdoor setup. Blue northers move fast — plan for both scenarios.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
