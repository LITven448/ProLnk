import { useState } from 'react';

const ADDRESS_TYPES = [
  'Near Globe Life Field (Rangers)',
  'Near AT&T Stadium (Cowboys)',
  'Near American Airlines Center (Mavs/Stars)',
  'Near DFW Airport',
  'Near Love Field Airport',
  'Downtown Dallas/Fort Worth',
  'Near Toyota Music Factory',
  'Suburban - no nearby venue',
];

const APPS = [
  { name: 'SpotHero', focus: 'Airport & stadium parking', fee: '20-25%', strength: 'Highest DFW volume' },
  { name: 'Parkwhiz', focus: 'Events & daily commuters', fee: '20%', strength: 'Good event coverage' },
  { name: 'Neighbor.com', focus: 'Monthly parking rental', fee: '4.9%', strength: 'Best for monthly income' },
  { name: 'Craigslist/FB Marketplace', focus: 'Direct monthly rental', fee: '0%', strength: 'No vetting — use contracts' },
];

interface ParkingResult {
  eventIncome: number;
  monthlyIncome: number;
  bestApp: string;
  rate: string;
  legalNote: string;
}

const VENUE_DATA: Record<string, { eventRate: number; monthlyRate: number; app: string; rate: string; legal: string }> = {
  'Near Globe Life Field (Rangers)': {
    eventRate: 35, monthlyRate: 180, app: 'SpotHero',
    rate: '$25-45/event', legal: 'Arlington has no permit requirement for private driveway parking during events.',
  },
  'Near AT&T Stadium (Cowboys)': {
    eventRate: 60, monthlyRate: 200, app: 'SpotHero',
    rate: '$40-80/event', legal: 'Arlington allows private parking sales. No city permit required.',
  },
  'Near American Airlines Center (Mavs/Stars)': {
    eventRate: 45, monthlyRate: 250, app: 'SpotHero',
    rate: '$30-60/event', legal: 'Dallas allows private parking. Some HOAs prohibit commercial use — check yours.',
  },
  'Near DFW Airport': {
    eventRate: 0, monthlyRate: 320, app: 'SpotHero',
    rate: '$8-15/day', legal: 'DFW airport area has high monthly demand. Long-term daily rates are the model here.',
  },
  'Near Love Field Airport': {
    eventRate: 0, monthlyRate: 280, app: 'SpotHero',
    rate: '$8-14/day', legal: 'Love Field proximity means daily travelers — list for daily/weekly, not just events.',
  },
  'Downtown Dallas/Fort Worth': {
    eventRate: 30, monthlyRate: 300, app: 'Neighbor.com',
    rate: '$20-40/day', legal: 'Strong daily commuter demand. Monthly parking in downtown cores: $200-350/mo.',
  },
  'Near Toyota Music Factory': {
    eventRate: 28, monthlyRate: 160, app: 'Parkwhiz',
    rate: '$20-38/event', legal: 'Irving allows private parking sales. Concerts and comedy shows drive consistent demand.',
  },
  'Suburban - no nearby venue': {
    eventRate: 0, monthlyRate: 80, app: 'Neighbor.com',
    rate: '$60-100/month', legal: 'Best strategy: list for monthly car storage or overflow parking on Neighbor.com.',
  },
};

export default function DFWDrivewayParkingIncomeGuide() {
  const [addressType, setAddressType] = useState('');
  const [spaces, setSpaces] = useState('');
  const [result, setResult] = useState<ParkingResult | null>(null);

  function calculate() {
    if (!addressType || !spaces) return;
    const data = VENUE_DATA[addressType];
    if (!data) return;
    const n = parseInt(spaces) || 1;
    setResult({
      eventIncome: data.eventRate * n,
      monthlyIncome: data.monthlyRate * n,
      bestApp: data.app,
      rate: data.rate,
      legalNote: data.legal,
    });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🅿️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px', color: '#F5E642′ }}>DFW Driveway & Parking Income Guide</h1>
          <p style={{ margin: 0, opacity: 0.8, lineHeight: 1.6 }}>DFW homeowners near stadiums, airports, and downtown earn $80–$320/month per space with zero effort. Apps like SpotHero and Neighbor.com handle everything.</p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🏟️ DFW Venues That Drive Parking Demand</h2>
          <div style={{ display: 'grid', gap: 8 }}>
            {[
              { venue: 'Globe Life Field', team: 'Texas Rangers', events: '81+ home games/yr' },
              { venue: 'AT&T Stadium', team: 'Dallas Cowboys', events: '10+ events/yr, avg 80K fans' },
              { venue: 'American Airlines Center', team: 'Mavs & Stars', events: '100+ events/yr' },
              { venue: 'DFW Airport', team: 'World\’s 2nd busiest airport', events: '75M passengers/yr' },
              { venue: 'Toyota Music Factory', team: 'Irving concert venue', events: '200+ shows/yr' },
            ].map(v => (
              <div key={v.venue} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(255,255,255,0.05)', borderRadius: 8 }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{v.venue}</div>
                  <div style={{ fontSize: 13, opacity: 0.7 }}>{v.team}</div>
                </div>
                <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 600, alignSelf: 'center' }}>{v.events}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>💰 Income Calculator</h2>
          <div style={{ display: 'grid', gap: 14, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>My Address Is...</label>
              <select value={addressType} onChange={e => setAddressType(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid rgba(255,255,255,0.2)', background: '#0A1628', color: '#fff', fontSize: 15 }}>
                <option value="">Select your location type</option>
                {ADDRESS_TYPES.map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Parking Spaces Available</label>
              <input type="number" min={1} max={10} value={spaces} onChange={e => setSpaces(e.target.value)} placeholder="e.g. 2″ style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid rgba(255,255,255,0.2)', background: '#0A1628', color: '#fff', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 16, cursor: 'pointer', width: '100%' }}>Calculate Parking Income</button>
          {result && (
            <div style={{ marginTop: 20, background: 'rgba(245,230,66,0.1)', border: '1.5px solid #F5E642', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>${result.monthlyIncome.toLocaleString()}/month</div>
              {result.eventIncome > 0 && <div style={{ marginBottom: 4, opacity: 0.9 }}>+ ~${result.eventIncome}/event during games/concerts</div>}
              <div style={{ marginBottom: 4, opacity: 0.85 }}>Rate: {result.rate} · Best platform: {result.bestApp}</div>
              <div style={{ fontSize: 13, opacity: 0.7, fontStyle: 'italic', marginTop: 8 }}>⚖️ {result.legalNote}</div>
            </div>
          )}
        </div>

        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>📱 Best Apps for DFW Parking Income</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {APPS.map(a => (
              <div key={a.name} style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.05)', borderRadius: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <div style={{ fontWeight: 700 }}>{a.name}</div>
                  <div style={{ color: '#F5E642', fontWeight: 600 }}>{a.fee} fee</div>
                </div>
                <div style={{ fontSize: 13, opacity: 0.7 }}>{a.focus} · {a.strength}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
